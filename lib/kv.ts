/**
 * Tiny key-value store for OTPs and rate limits.
 *
 * Production (Vercel): uses Upstash Redis over its REST API, so every serverless
 * instance shares the same state. Picks up either the Vercel/Upstash integration
 * variables (KV_REST_API_URL / KV_REST_API_TOKEN) or UPSTASH_REDIS_REST_URL / _TOKEN.
 *
 * Local dev: falls back to an in-process Map.
 */

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN
export const kvShared = Boolean(url && token)

let warned = false
function warnIfUnshared() {
  if (!kvShared && process.env.NODE_ENV === 'production' && !warned) {
    warned = true
    console.error('[kv] No Upstash Redis configured (KV_REST_API_URL / KV_REST_API_TOKEN). OTPs and rate limits are per-instance and will be unreliable on Vercel.')
  }
}

type Cmd = (string | number)[]

async function redis<T = unknown>(command: Cmd): Promise<T> {
  const res = await fetch(url as string, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  const data = (await res.json()) as { result?: T; error?: string }
  if (!res.ok || data.error) throw new Error(`[kv] ${data.error ?? res.statusText}`)
  return data.result as T
}

const mem = new Map<string, { value: string; expiresAt: number }>()
function memGet(key: string) {
  const row = mem.get(key)
  if (!row) return null
  if (Date.now() > row.expiresAt) {
    mem.delete(key)
    return null
  }
  return row
}

export async function kvGet(key: string): Promise<string | null> {
  warnIfUnshared()
  if (kvShared) return redis<string | null>(['GET', key])
  return memGet(key)?.value ?? null
}

export async function kvSet(key: string, value: string, ttlSec: number): Promise<void> {
  warnIfUnshared()
  if (kvShared) {
    await redis(['SET', key, value, 'EX', ttlSec])
    return
  }
  mem.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 })
}

export async function kvDel(key: string): Promise<void> {
  if (kvShared) {
    await redis(['DEL', key])
    return
  }
  mem.delete(key)
}

/** Increments a counter that expires `ttlSec` after its first hit. Returns the new count and seconds left. */
export async function kvIncr(key: string, ttlSec: number): Promise<{ count: number; ttl: number }> {
  warnIfUnshared()
  if (kvShared) {
    const count = await redis<number>(['INCR', key])
    if (count === 1) await redis(['EXPIRE', key, ttlSec])
    const ttl = await redis<number>(['TTL', key])
    return { count, ttl: ttl > 0 ? ttl : ttlSec }
  }
  const row = memGet(key)
  if (!row) {
    mem.set(key, { value: '1', expiresAt: Date.now() + ttlSec * 1000 })
    return { count: 1, ttl: ttlSec }
  }
  const count = Number(row.value) + 1
  row.value = String(count)
  return { count, ttl: Math.ceil((row.expiresAt - Date.now()) / 1000) }
}

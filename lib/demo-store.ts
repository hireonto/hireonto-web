import { createHash, randomInt } from 'crypto'
import { kvDel, kvGet, kvSet } from './kv'

type Pending = { codeHash: string; attempts: number; expiresAt: number }

const OTP_TTL_SEC = 10 * 60
const VERIFIED_TTL_SEC = 30 * 60
const MAX_ATTEMPTS = 5

function secret(): string {
  const s = process.env.DEMO_OTP_SECRET
  if (s) return s
  if (process.env.NODE_ENV === 'production') throw new Error('DEMO_OTP_SECRET is not set')
  return 'dev-only-change-me'
}

function hashCode(email: string, code: string): string {
  return createHash('sha256').update(`${secret()}:${email}:${code}`).digest('hex')
}

const pendingKey = (email: string) => `demo:otp:${email}`
const verifiedKey = (email: string) => `demo:verified:${email}`

export async function issueOtp(email: string): Promise<string> {
  const code = String(randomInt(100_000, 999_999))
  const row: Pending = { codeHash: hashCode(email, code), attempts: 0, expiresAt: Date.now() + OTP_TTL_SEC * 1000 }
  await kvSet(pendingKey(email), JSON.stringify(row), OTP_TTL_SEC)
  return code
}

export async function verifyOtp(email: string, code: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  const raw = await kvGet(pendingKey(email))
  if (!raw) return { ok: false, reason: 'No verification in progress, or the code expired. Request a new code.' }
  const row = JSON.parse(raw) as Pending
  if (Date.now() > row.expiresAt) {
    await kvDel(pendingKey(email))
    return { ok: false, reason: 'Code expired. Request a new one.' }
  }
  if (row.attempts >= MAX_ATTEMPTS) {
    await kvDel(pendingKey(email))
    return { ok: false, reason: 'Too many attempts. Request a new code.' }
  }
  if (hashCode(email, code.trim()) !== row.codeHash) {
    row.attempts += 1
    await kvSet(pendingKey(email), JSON.stringify(row), Math.max(1, Math.ceil((row.expiresAt - Date.now()) / 1000)))
    return { ok: false, reason: 'Incorrect code.' }
  }
  await kvDel(pendingKey(email))
  await kvSet(verifiedKey(email), '1', VERIFIED_TTL_SEC)
  return { ok: true }
}

export async function isEmailVerified(email: string): Promise<boolean> {
  return (await kvGet(verifiedKey(email))) !== null
}

export async function consumeVerification(email: string): Promise<void> {
  await kvDel(verifiedKey(email))
}

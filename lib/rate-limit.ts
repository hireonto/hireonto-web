import { kvIncr } from './kv'

/** Fixed-window rate limit, shared across serverless instances when Upstash is configured. */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<{ allowed: boolean; retryAfterSec?: number }> {
  const { count, ttl } = await kvIncr(`rl:${key}`, Math.ceil(windowMs / 1000))
  if (count > limit) return { allowed: false, retryAfterSec: ttl }
  return { allowed: true }
}

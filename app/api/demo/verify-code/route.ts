import { NextResponse } from 'next/server'
import { z } from 'zod'
import { parseBusinessEmail } from '@/lib/business-email'
import { verifyOtp } from '@/lib/demo-store'
import { rateLimit } from '@/lib/rate-limit'

const bodySchema = z.object({
  email: z.string().min(5).max(320),
  code: z.string().regex(/^\d{6}$/),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Enter the 6-digit code from your inbox.' }, { status: 400 })
    }

    const emailCheck = parseBusinessEmail(parsed.data.email)
    if (!emailCheck.ok) {
      return NextResponse.json({ error: emailCheck.reason }, { status: 400 })
    }

    const rl = await rateLimit(`demo:verify:${emailCheck.email}`, 10, 15 * 60_000)
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many attempts. Wait and try again.' }, { status: 429 })
    }

    const result = await verifyOtp(emailCheck.email, parsed.data.code)
    if (!result.ok) {
      return NextResponse.json({ error: result.reason }, { status: 400 })
    }

    return NextResponse.json({ ok: true, verified: true })
  } catch (e) {
    console.error('[demo/verify-code]', e)
    return NextResponse.json({ error: 'Verification failed.' }, { status: 500 })
  }
}

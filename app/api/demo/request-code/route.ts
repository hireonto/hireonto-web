import { NextResponse } from 'next/server'
import { z } from 'zod'
import { parseBusinessEmail } from '@/lib/business-email'
import { issueOtp } from '@/lib/demo-store'
import { sendOtpEmail } from '@/lib/mail'
import { rateLimit } from '@/lib/rate-limit'

const bodySchema = z.object({
  email: z.string().min(5).max(320),
  website: z.string().max(0).optional(),
})

function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }
    if (parsed.data.website) {
      return NextResponse.json({ ok: true })
    }

    const emailCheck = parseBusinessEmail(parsed.data.email)
    if (!emailCheck.ok) {
      return NextResponse.json({ error: emailCheck.reason }, { status: 400 })
    }

    const ip = clientIp(req)
    const byEmail = await rateLimit(`demo:email:${emailCheck.email}`, 3, 60 * 60_000)
    const byIp = await rateLimit(`demo:ip:${ip}`, 12, 60 * 60_000)
    if (!byEmail.allowed || !byIp.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Try again later.' },
        { status: 429 },
      )
    }

    const code = await issueOtp(emailCheck.email)
    await sendOtpEmail(emailCheck.email, code)

    return NextResponse.json({ ok: true, message: 'Verification code sent.' })
  } catch (e) {
    console.error('[demo/request-code]', e)
    return NextResponse.json({ error: 'Could not send verification email.' }, { status: 500 })
  }
}

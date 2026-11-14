import { NextResponse } from 'next/server'
import { z } from 'zod'
import { parseBusinessEmail } from '@/lib/business-email'
import { consumeVerification, isEmailVerified } from '@/lib/demo-store'
import { sendDemoLeadEmail } from '@/lib/mail'
import { rateLimit } from '@/lib/rate-limit'

const bodySchema = z.object({
  email: z.string().min(5).max(320),
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(160),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }
    if (parsed.data.website) {
      return NextResponse.json({ ok: true })
    }

    const emailCheck = parseBusinessEmail(parsed.data.email)
    if (!emailCheck.ok) {
      return NextResponse.json({ error: emailCheck.reason }, { status: 400 })
    }

    if (!(await isEmailVerified(emailCheck.email))) {
      return NextResponse.json({ error: 'Verify your work email before submitting.' }, { status: 403 })
    }

    const rl = await rateLimit(`demo:submit:${emailCheck.email}`, 2, 24 * 60 * 60_000)
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Demo already requested recently.' }, { status: 429 })
    }

    await sendDemoLeadEmail({
      email: emailCheck.email,
      name: parsed.data.name.trim(),
      company: parsed.data.company.trim(),
      message: parsed.data.message?.trim(),
    })
    await consumeVerification(emailCheck.email)

    return NextResponse.json({ ok: true, message: 'We will reach out shortly at your verified email.' })
  } catch (e) {
    console.error('[demo/submit]', e)
    return NextResponse.json({ error: 'Could not submit demo request.' }, { status: 500 })
  }
}

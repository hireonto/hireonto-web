import nodemailer from 'nodemailer'
import { site } from './site'

const isProd = process.env.NODE_ENV === 'production'

function required(name: string, devFallback: string): string {
  const v = process.env[name]
  if (v) return v
  if (isProd) throw new Error(`${name} is not set`)
  return devFallback
}

function transport() {
  const host = required('SMTP_HOST', 'localhost')
  const port = Number(process.env.SMTP_PORT ?? 1025)
  const secure = process.env.SMTP_SECURE === 'true'
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  })
}

export async function sendOtpEmail(to: string, code: string) {
  const from = required('EMAIL_FROM', `${site.name} <no-reply@localhost>`)
  await transport().sendMail({
    from,
    to,
    subject: `${site.name} — verify your work email`,
    text: `Your verification code is ${code}. It expires in 10 minutes.\n\nIf you did not request a demo, ignore this email.`,
    html: `<p>Your verification code is <strong style="font-size:1.25em;letter-spacing:0.15em">${code}</strong>.</p><p>Expires in 10 minutes.</p><p>If you did not request a demo, ignore this email.</p>`,
  })
}

export async function sendDemoLeadEmail(payload: {
  email: string
  name: string
  company: string
  message?: string
}) {
  const from = required('EMAIL_FROM', `${site.name} <no-reply@localhost>`)
  const to = required('SALES_EMAIL', site.contactEmail || 'sales@localhost')
  const body = [
    `New verified demo request`,
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    payload.message ? `Message: ${payload.message}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  await transport().sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `[Demo] ${payload.company} — ${payload.name}`,
    text: body,
  })
}

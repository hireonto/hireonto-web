import nodemailer, { type Transporter } from 'nodemailer'
import { site } from './site'

/**
 * Mailer with two providers, picked by EMAIL_PROVIDER ("resend" | "smtp").
 * If EMAIL_PROVIDER is unset: Resend when RESEND_API_KEY is set, else SMTP when SMTP_HOST is set.
 *
 * Resend (recommended on Vercel, plain HTTPS, no SMTP connection):
 *   RESEND_API_KEY, EMAIL_FROM (sender on a domain verified in Resend)
 * SMTP:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, optional SMTP_SECURE
 *   (defaults to true on port 465, false otherwise / STARTTLS)
 * Both:
 *   SALES_EMAIL  where demo leads go (falls back to NEXT_PUBLIC_CONTACT_EMAIL).
 *
 * Local dev with no provider configured: emails are not sent; their content is printed to the
 * server console so you can still read the OTP.
 */

const isProd = process.env.NODE_ENV === 'production'

export class MailConfigError extends Error {
  constructor(missing: string[]) {
    super(`Mail is not configured. Missing env: ${missing.join(', ')}`)
    this.name = 'MailConfigError'
  }
}

type MailConfig = {
  kind: 'smtp'
  host: string
  port: number
  secure: boolean
  user?: string
  pass?: string
  from: string
}

type ResendConfig = { kind: 'resend'; apiKey: string; from: string }

function provider(): 'resend' | 'smtp' | null {
  const p = process.env.EMAIL_PROVIDER?.trim().toLowerCase()
  if (p === 'resend' || p === 'smtp') return p
  if (process.env.RESEND_API_KEY?.trim()) return 'resend'
  if (process.env.SMTP_HOST?.trim()) return 'smtp'
  return null
}

function readConfig(): MailConfig | ResendConfig | null {
  const kind = provider()
  if (!kind && !isProd) return null // dev: console mode
  if (kind === 'resend') return readResendConfig()
  return readSmtpConfig()
}

function readResendConfig(): ResendConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? ''
  const from = process.env.EMAIL_FROM?.trim() ?? ''
  const missing: string[] = []
  if (!apiKey) missing.push('RESEND_API_KEY')
  if (!from) missing.push('EMAIL_FROM')
  if (missing.length) throw new MailConfigError(missing)
  return { kind: 'resend', apiKey, from }
}

function readSmtpConfig(): MailConfig {
  const host = process.env.SMTP_HOST?.trim()

  const port = Number(process.env.SMTP_PORT?.trim() || 587)
  const user = process.env.SMTP_USER?.trim() || undefined
  // App passwords are often copied with spaces (e.g. Gmail "abcd efgh ..."), strip them.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '') || undefined
  const from = process.env.EMAIL_FROM?.trim() || (user ? `${site.name} <${user}>` : '')

  const missing: string[] = []
  if (!host) missing.push('SMTP_HOST')
  if (!Number.isInteger(port) || port <= 0) missing.push('SMTP_PORT (invalid)')
  if (isProd && !user) missing.push('SMTP_USER')
  if (isProd && !pass) missing.push('SMTP_PASS')
  if (!from) missing.push('EMAIL_FROM')
  if (missing.length) throw new MailConfigError(missing)

  const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase()
  const secure = secureEnv ? secureEnv === 'true' : port === 465

  return { kind: 'smtp', host: host!, port, secure, user, pass, from }
}

// Reused across invocations on a warm serverless instance.
let cached: { key: string; transporter: Transporter } | null = null

function getTransporter(cfg: MailConfig): Transporter {
  const key = `${cfg.host}:${cfg.port}:${cfg.secure}:${cfg.user ?? ''}`
  if (cached?.key === key) return cached.transporter
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    requireTLS: !cfg.secure && isProd, // never send creds in plaintext in prod
    auth: cfg.user && cfg.pass ? { user: cfg.user, pass: cfg.pass } : undefined,
    // Fail fast instead of hanging until the serverless function times out.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })
  cached = { key, transporter }
  return transporter
}

type Message = { to: string; subject: string; text: string; html?: string; replyTo?: string }

async function sendViaResend(cfg: ResendConfig, msg: Message): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: cfg.from,
      to: [msg.to],
      subject: msg.subject,
      text: msg.text,
      html: msg.html,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { name?: string; message?: string }
    console.error('[mail] resend failed', { status: res.status, name: body.name, message: body.message, from: cfg.from })
    throw new Error(`Resend ${res.status}: ${body.message ?? res.statusText}`)
  }
}

async function send(msg: Message): Promise<void> {
  const cfg = readConfig()
  if (!cfg) {
    console.info(`[mail:dev] No email provider configured, email NOT sent.\n  to: ${msg.to}\n  subject: ${msg.subject}\n  ${msg.text.replace(/\n/g, '\n  ')}`)
    return
  }
  if (cfg.kind === 'resend') return sendViaResend(cfg, msg)
  try {
    await getTransporter(cfg).sendMail({ from: cfg.from, ...msg })
  } catch (e) {
    cached = null // drop a possibly broken connection/config
    const err = e as { code?: string; responseCode?: number; command?: string; message?: string }
    // Log the useful SMTP details (never the password).
    console.error('[mail] send failed', {
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      user: cfg.user,
      code: err.code,
      responseCode: err.responseCode,
      command: err.command,
      message: err.message,
    })
    throw e
  }
}

export async function sendOtpEmail(to: string, code: string) {
  await send({
    to,
    subject: `${site.name}: verify your work email`,
    text: `Your verification code is ${code}. It expires in 10 minutes.\n\nIf you did not request a demo, ignore this email.`,
    html: `<p>Your verification code is <strong style="font-size:1.25em;letter-spacing:0.15em">${code}</strong>.</p><p>Expires in 10 minutes.</p><p>If you did not request a demo, ignore this email.</p>`,
  })
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function sendDemoLeadEmail(payload: {
  email: string
  name: string
  company: string
  message?: string
}) {
  const to = process.env.SALES_EMAIL?.trim() || site.contactEmail
  if (!to) {
    if (isProd) throw new MailConfigError(['SALES_EMAIL'])
  }
  const lines = [
    `New verified demo request`,
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    payload.message ? `Message: ${payload.message}` : '',
  ].filter(Boolean)

  await send({
    to: to || 'sales@localhost',
    replyTo: payload.email,
    subject: `[Demo] ${payload.company} (${payload.name})`,
    text: lines.join('\n'),
    html: lines.map((l) => `<p>${escapeHtml(l)}</p>`).join(''),
  })
}

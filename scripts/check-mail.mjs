// Checks the email provider config from .env.local and optionally sends a test mail.
//   npm run check:mail                 -> config/credentials check only (nothing sent)
//   npm run check:mail -- you@work.com -> also sends a test email
const to = process.argv[2]
const from = process.env.EMAIL_FROM
const provider =
  process.env.EMAIL_PROVIDER?.toLowerCase() || (process.env.RESEND_API_KEY ? 'resend' : process.env.SMTP_HOST ? 'smtp' : '')

function fail(msg, extra) {
  console.error(`✗ ${msg}`, extra ?? '')
  process.exit(1)
}
if (!from) fail('EMAIL_FROM missing in .env.local')

if (provider === 'resend') {
  const key = process.env.RESEND_API_KEY
  if (!key) fail('RESEND_API_KEY missing in .env.local')
  const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  const fromDomain = from.match(/@([^>\s]+)/)?.[1]?.toLowerCase()

  const r = await fetch('https://api.resend.com/domains', { headers })
  const body = await r.json()
  if (r.ok) {
    const d = body.data?.find((x) => x.name.toLowerCase() === fromDomain)
    if (!d) fail(`EMAIL_FROM domain "${fromDomain}" is not in this Resend account`)
    if (d.status !== 'verified') fail(`Domain ${d.name} status is "${d.status}", verify DNS in Resend`)
    console.log(`✓ Resend key OK, ${d.name} verified`)
  } else if (body.name === 'restricted_api_key') {
    console.log('✓ Resend key OK (sending-only key, domain check skipped)')
  } else fail('Resend key rejected', body)

  if (to) {
    const s = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers,
      body: JSON.stringify({ from, to: [to], subject: 'HireOnto email test', text: 'Email sending is working.' }),
    })
    const sb = await s.json()
    if (!s.ok) fail('Send failed', sb)
    console.log(`✓ Test email sent to ${to} (${sb.id})`)
  }
} else if (provider === 'smtp') {
  const { default: nodemailer } = await import('nodemailer')
  const port = Number(process.env.SMTP_PORT || 587)
  const secureEnv = process.env.SMTP_SECURE?.toLowerCase()
  const secure = secureEnv ? secureEnv === 'true' : port === 465
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port, secure, requireTLS: !secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS?.replace(/\s+/g, '') },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
  })
  try {
    await t.verify()
    console.log(`✓ SMTP login OK @ ${process.env.SMTP_HOST}:${port}`)
    if (to) console.log(`✓ Test email sent (${(await t.sendMail({ from, to, subject: 'HireOnto email test', text: 'Email sending is working.' })).messageId})`)
  } catch (e) {
    fail('SMTP failed', { code: e.code, responseCode: e.responseCode, message: e.message })
  }
} else fail('No provider: set RESEND_API_KEY (or EMAIL_PROVIDER=smtp + SMTP_*) in .env.local')

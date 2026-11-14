/** Consumer / free-mail domains — demo requests require a company domain (e.g. you@google.com). */
const BLOCKED_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'yahoo.com',
  'yahoo.co.in',
  'ymail.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'pm.me',
  'zoho.com',
  'mail.com',
  'gmx.com',
  'gmx.net',
  'yandex.com',
  'yandex.ru',
  'mail.ru',
  'inbox.ru',
  'list.ru',
  'bk.ru',
  'rediffmail.com',
  'fastmail.com',
  'tutanota.com',
  'hey.com',
  'qq.com',
  '163.com',
  '126.com',
  'foxmail.com',
  'naver.com',
  'daum.net',
  'hanmail.net',
  'web.de',
  'orange.fr',
  'free.fr',
  'laposte.net',
])

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

export function parseBusinessEmail(raw: string): { ok: true; email: string; domain: string } | { ok: false; reason: string } {
  const email = normalizeEmail(raw)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, reason: 'Enter a valid email address.' }
  }
  const [, domain] = email.split('@')
  if (!domain || domain.length < 3 || !domain.includes('.')) {
    return { ok: false, reason: 'Use your company email domain.' }
  }
  if (BLOCKED_DOMAINS.has(domain)) {
    return {
      ok: false,
      reason: 'Use your work email on your company domain (not Gmail, Outlook, Yahoo, etc.).',
    }
  }
  if (domain.endsWith('.edu') && process.env.ALLOW_EDU_DEMO !== 'true') {
    return { ok: false, reason: 'Student/edu addresses are not accepted for demos. Use your corporate email.' }
  }
  return { ok: true, email, domain }
}

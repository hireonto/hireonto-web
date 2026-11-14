import { products } from './products'
import { solutions } from './solutions'

export const site = {
  name: 'HireOnto',
  tagline: 'AI hiring platform — screen, interview and decide with confidence',
  description:
    'HireOnto is an end-to-end AI hiring platform: resume screening, AI voice interviews, coding rounds, proctoring, explainable evaluations and scheduling — with your recruiters in control.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3002'),
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  /** Public contact address shown on legal pages. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  copyrightYear: 2026,
} as const

export const nav = [
  { href: '/features', label: 'Platform' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/security', label: 'Security' },
  { href: '/faq', label: 'FAQ' },
  { href: '/demo', label: 'Book demo' },
] as const

export const footerLegal = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/about', label: 'About' },
] as const


/** Header dropdowns + footer columns. */
export const menus = [
  {
    label: 'Product',
    items: [
      { href: '/agents', label: 'AI agents', desc: 'Meet Onric & Tovia', icon: 'ai-hiring-agent' as const },
      { href: '/features', label: 'Platform overview', desc: 'Every screen, from job setup to decision' },
      ...products.map((p) => ({ href: `/product/${p.slug}`, label: p.name, desc: p.eyebrow, icon: p.icon })),
    ],
  },
  {
    label: 'Solutions',
    items: solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.name, desc: s.title, icon: s.icon })),
  },
  {
    label: 'Resources',
    items: [
      { href: '/how-it-works', label: 'How it works', desc: 'The hiring flow in 6 steps' },
      { href: '/security', label: 'Security', desc: 'Tenant isolation, audit logs, retention' },
      { href: '/faq', label: 'FAQ', desc: 'Answers to common questions' },
      { href: '/about', label: 'About', desc: 'Why we built HireOnto' },
    ],
  },
] as const

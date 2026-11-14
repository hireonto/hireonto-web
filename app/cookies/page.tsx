import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Cookie Policy',
  description: 'How HireOnto uses cookies and similar technologies on the marketing website.',
  path: '/cookies',
})

export default function CookiesPage() {
  return (
    <article className="prose-legal mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1>Cookie Policy</h1>
      <p>Last updated: November 1, 2026</p>
      <p>
        Our marketing site uses minimal cookies. The HireOnto application may use session and security cookies when you
        sign in at the app URL.
      </p>
      <h2>Marketing site</h2>
      <ul>
        <li>Essential cookies for load balancing or security (if enabled by your host).</li>
        <li>We do not use third-party advertising cookies on this marketing site by default.</li>
      </ul>
      <h2>Analytics</h2>
      <p>
        If we enable analytics, we will update this page and, where required, request consent before non-essential
        tracking.
      </p>
    </article>
  )
}

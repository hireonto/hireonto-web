import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'HireOnto privacy policy — how we handle candidate, recruiter, and website demo data.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <article className="prose-legal mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1>Privacy Policy</h1>
      <p>Last updated: November 1, 2026</p>
      <p>
        {site.name} (&quot;we&quot;, &quot;us&quot;) provides AI-assisted hiring software. This policy describes how we
        process personal data on our marketing site and product.
      </p>
      <h2>Data we collect</h2>
      <ul>
        <li>Account and profile data for recruiters and staff users of the product.</li>
        <li>Candidate application materials, interview recordings, transcripts, and assessment submissions.</li>
        <li>Demo request data: verified work email, name, company, and optional message.</li>
        <li>Technical logs (IP, user agent) for security and rate limiting on public forms.</li>
      </ul>
      <h2>How we use data</h2>
      <ul>
        <li>Operate the hiring pipeline, including AI features configured by your organization.</li>
        <li>Verify demo requests and respond to sales inquiries.</li>
        <li>Maintain security, prevent abuse, and meet legal obligations.</li>
      </ul>
      <h2>Retention</h2>
      <p>
        Product retention is configurable per tenant (including candidate export and deletion tools). Marketing demo data
        is retained as needed for sales follow-up unless you request deletion.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy questions: {site.contactEmail ? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> : <a href="/demo">our contact form</a>}
      </p>
    </article>
  )
}

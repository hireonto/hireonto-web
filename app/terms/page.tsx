import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service',
  description: 'HireOnto terms of service for use of the marketing website and hiring platform.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <article className="prose-legal mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1>Terms of Service</h1>
      <p>Last updated: November 1, 2026</p>
      <p>
        By accessing {site.url} or using the {site.name} product, you agree to these terms. If you use the product on
        behalf of a company, you represent that you have authority to bind that company.
      </p>
      <h2>Service</h2>
      <p>
        We provide software for recruiting workflows, including AI-assisted features. Features vary by plan and
        configuration. We may update the service with reasonable notice where required by contract.
      </p>
      <h2>Acceptable use</h2>
      <ul>
        <li>No unlawful discrimination in hiring decisions — you remain the employer of record for hiring choices.</li>
        <li>No scraping, spam, or attempts to bypass demo verification or rate limits.</li>
        <li>No misuse of candidate data outside your stated hiring purposes.</li>
      </ul>
      <h2>Disclaimer</h2>
      <p>
        AI outputs are assistive. You are responsible for final hiring decisions and compliance with applicable labor
        and privacy laws.
      </p>
      <h2>Contact</h2>
      <p>
        Legal inquiries: {site.contactEmail ? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> : <a href="/demo">our contact form</a>}
      </p>
    </article>
  )
}

import type { Metadata } from 'next'
import { FadeIn } from '@/components/motion'
import { LinkButton, Section } from '@/components/ui'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Security & trust',
  description:
    'HireOnto security: tenant isolation, JWT auth, interview proctoring, audit logs, retention controls, and verified demo requests.',
  path: '/security',
})

const items = [
  {
    title: 'Multi-tenant isolation',
    body: 'Company-scoped data in PostgreSQL with role-based access for admin, recruiter, and interviewer personas.',
  },
  {
    title: 'Auth & session hygiene',
    body: 'Short-lived access tokens, refresh rotation for staff, and separate candidate interview tokens.',
  },
  {
    title: 'Interview integrity',
    body: 'Proctoring events, media chunk uploads with presigned URLs, and reviewer timelines for defensible decisions.',
  },
  {
    title: 'AI guardrails',
    body: 'Structured interview plans, internal service auth between API and AI workers, and human override paths.',
  },
  {
    title: 'Demo & lead protection',
    body: 'Business-email-only forms with OTP verification, rate limits, and honeypots to reduce spam and scraping.',
  },
  {
    title: 'Data lifecycle',
    body: 'Retention jobs, candidate export/delete endpoints, and audit trails for compliance reviews.',
  },
]

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-4xl font-semibold text-ink md:text-5xl">Security built for hiring data</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Candidates share resumes, video, and code — treat that like sensitive PII. HireOnto combines AI automation
            with controls enterprise teams expect.
          </p>
        </div>
      </section>
      <Section eyebrow="Controls" title="What we implement today">
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <FadeIn key={item.title}>
              <article className="rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
        <LinkButton href="/demo" className="mt-10">
          Request security walkthrough
        </LinkButton>
      </Section>
    </>
  )
}

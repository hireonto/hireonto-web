import type { Metadata } from 'next'
import { FadeIn } from '@/components/motion'
import { LinkButton, Section } from '@/components/ui'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'About',
  description: 'About HireOnto — AI hiring pipeline software for shortlisting, interviews, scheduling, and secure decisions.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-4xl font-semibold text-ink">About HireOnto</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            We build hiring infrastructure where AI does the heavy lifting — parsing, screening, interviewing, and
            scheduling — while recruiters keep authority, auditability, and manual steps when the role demands it.
          </p>
        </div>
      </section>
      <Section eyebrow="Mission" title="Better pipelines, not black boxes">
        <FadeIn>
          <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
            <p>
              Most “AI recruiting” tools optimize for volume alone. HireOnto optimizes for{' '}
              <strong className="text-white">defensible decisions</strong>: explainable shortlists, recorded interview
              context, coding evidence, and integrity signals your team can review.
            </p>
            <p>
              We serve startups and enterprises that need a single funnel — whether the next round is an AI voice
              interview, a live coding session, or a human panel — without re-entering data or losing history.
            </p>
          </div>
        </FadeIn>
        <LinkButton href="/demo" className="mt-10">
          Meet the team on a demo
        </LinkButton>
      </Section>
    </>
  )
}

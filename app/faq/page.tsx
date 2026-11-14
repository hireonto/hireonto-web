import type { Metadata } from 'next'
import { FaqJsonLd } from '@/components/json-ld'
import { FadeIn } from '@/components/motion'
import { LinkButton, Section } from '@/components/ui'
import { faqItems } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'FAQ',
  description: 'Frequently asked questions about HireOnto AI hiring pipeline, demos, security, and manual workflows.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <section className="border-b border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-4xl font-semibold text-ink">FAQ</h1>
          <p className="mt-4 text-lg text-muted">Quick answers for recruiting, IT, and leadership stakeholders.</p>
        </div>
      </section>
      <Section eyebrow="Answers" title="Common questions">
        <dl className="space-y-6">
          {faqItems.map((item) => (
            <FadeIn key={item.q}>
              <div className="rounded-2xl border border-white/10 p-6">
                <dt className="text-lg font-semibold text-ink">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
              </div>
            </FadeIn>
          ))}
        </dl>
        <LinkButton href="/demo" className="mt-10">
          Still have questions? Book a demo
        </LinkButton>
      </Section>
    </>
  )
}

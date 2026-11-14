import type { Metadata } from 'next'
import { FadeIn } from '@/components/motion'
import { LinkButton, Section } from '@/components/ui'
import { IconBadge } from '@/components/icon-badge'
import { FeatureStories } from '@/components/feature-stories'
import { TourVideoButton } from '@/components/product-tour'
import { features, pipelineSteps } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Platform & features',
  description:
    'AI resume shortlist, voice and video interviews, AI coding assessments, call scheduling, proctoring, and manual recruiter workflows in one hiring pipeline.',
  path: '/features',
  keywords: ['AI hiring', 'interview platform', 'resume shortlist', 'AI coding interview', 'proctoring'],
})

export default function FeaturesPage() {
  return (
    <>
      <section className="border-b border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">The HireOnto platform</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            A proper AI pipeline for hiring teams: automate screening and interviews without giving up control, security,
            or manual steps where they matter.
          </p>
        </div>
      </section>

      <section id="walkthrough" className="relative overflow-hidden bg-[#07070d] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_50%_0%,rgba(37,99,235,0.28),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a78bfa]">Product walkthrough</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
              What HireOnto actually does, <span className="brand-text-gradient">screen by screen</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Follow one role from job setup to final decision — every area your recruiters and candidates will use.
            </p>
            <TourVideoButton className="mt-8" />
          </div>
          <div className="mt-20">
            <FeatureStories />
          </div>
        </div>
      </section>

      <Section eyebrow="Flow" title="Pipeline stages" subtitle="Every stage connects to the same candidate record and audit log.">
        <ol className="grid gap-4 md:grid-cols-2">
          {pipelineSteps.map((s, i) => (
            <FadeIn key={s.title}>
              <li className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 list-none">
                <span className="relative shrink-0">
                  <IconBadge brand={s.brand} />
                  <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-[#6d28d9] font-mono text-[10px] text-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.desc}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Capabilities" title="Built for modern hiring ops">
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <FadeIn key={f.title}>
              <article className="rounded-2xl border border-white/10 p-6">
                <IconBadge brand={f.brand} />
                <h2 className="mt-4 text-xl font-semibold text-ink">{f.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
        <LinkButton href="/demo" className="mt-10">
          Book a demo
        </LinkButton>
      </Section>
    </>
  )
}

import type { Metadata } from 'next'
import { ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { FaqList } from '@/components/faq-list'
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/json-ld'
import { FadeIn } from '@/components/motion'
import { PageHero } from '@/components/page-hero'
import { ShotStack } from '@/components/product-tour'
import { BrandIcon, LinkButton } from '@/components/ui'
import { productStories } from '@/lib/product-tour'
import { products } from '@/lib/products'
import { pageMeta } from '@/lib/seo'
import { solutionDetails } from '@/lib/solution-details'
import { getSolution, solutions } from '@/lib/solutions'

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) return {}
  return pageMeta({ title: s.metaTitle, description: s.description, path: `/solutions/${s.slug}`, keywords: s.keywords })
}

export default function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <SolutionPageContent params={params} />
    </Suspense>
  )
}

async function SolutionPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) notFound()

  const story = productStories.find((x) => x.id === s.storyId)
  const used = products.filter((p) => s.productSlugs.includes(p.slug))
  const d = solutionDetails[s.slug]
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'Solutions', path: `/solutions/${solutions[0].slug}` },
    { name: s.name, path: `/solutions/${s.slug}` },
  ]

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={s.faqs} />
      <PageHero crumbs={crumbs} icon={s.icon} eyebrow={`Solutions · ${s.name}`} title={s.title} description={s.description} />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">The problem</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink">Sound familiar?</h2>
            <ul className="mt-8 space-y-4">
              {s.challenges.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border border-stripe-border bg-white p-4 text-[15px] text-ink/80">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-rose-500/10 text-rose-600">
                    <X className="size-3" strokeWidth={3} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">With HireOnto</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink">How teams solve it</h2>
            <div className="mt-8 space-y-6">
              {s.how.map((h, i) => (
                <div key={h.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#9333ea] font-mono text-xs text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{h.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {story && (
        <section className="bg-[#07070d] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a78bfa]">{story.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{story.title}</h2>
            <p className="mt-4 max-w-2xl text-white/60">{story.body}</p>
            <div className="mt-12">
              <ShotStack story={story} />
            </div>
          </div>
        </section>
      )}

      {d && (
        <section className="border-b border-stripe-border py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">A typical cycle</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink">What a hiring cycle looks like</h2>
              <ol className="mt-10 space-y-0">
                {d.timeline.map((t, i) => (
                  <li key={t.when} className="relative flex list-none gap-5 pb-8 last:pb-0">
                    {i < d.timeline.length - 1 && <span className="absolute top-8 bottom-0 left-[15px] w-px bg-stripe-border" />}
                    <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-stripe-border bg-white font-mono text-xs text-ink">{i + 1}</span>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#6d28d9]">{t.when}</div>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink/80">{t.what}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink">Roles teams hire with it</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {d.roles.map((r) => (
                  <li key={r} className="rounded-full border border-stripe-border bg-white px-3.5 py-1.5 text-sm text-ink/80">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Products used for {s.name.toLowerCase()}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {used.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.05}>
                <Link href={`/product/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-stripe-border bg-white p-6 transition hover:shadow-md">
                  <BrandIcon name={p.icon} size={26} />
                  <span className="mt-4 font-semibold text-ink">{p.name}</span>
                  <span className="mt-1 text-sm leading-relaxed text-muted">{p.description}</span>
                  <span className="mt-auto pt-5 text-sm font-semibold text-[#6d28d9]">
                    Learn more <ArrowRight className="inline size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Questions</h2>
            <FaqList items={s.faqs} />
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#07070d] p-8 md:p-10">
            <p className="max-w-xl text-xl font-semibold text-white">See HireOnto on your {s.name.toLowerCase()} roles.</p>
            <LinkButton href="/demo">Book a demo</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}

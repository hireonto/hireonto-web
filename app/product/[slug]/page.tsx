import type { Metadata } from 'next'
import { ArrowRight, Check, X } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { FaqList } from '@/components/faq-list'
import { FeatureStories } from '@/components/feature-stories'
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/json-ld'
import { FadeIn } from '@/components/motion'
import { PageHero } from '@/components/page-hero'
import { ShotStack } from '@/components/product-tour'
import { BrandIcon, LinkButton } from '@/components/ui'
import { productStories } from '@/lib/product-tour'
import { productDetails } from '@/lib/product-details'
import { getProduct, products } from '@/lib/products'
import { pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) return {}
  return pageMeta({ title: p.metaTitle, description: p.description, path: `/product/${p.slug}`, keywords: p.keywords })
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <ProductPageContent params={params} />
    </Suspense>
  )
}

async function ProductPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) notFound()

  const lead = productStories.find((s) => s.id === p.storyIds[0])
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'Product', path: '/features' },
    { name: p.name, path: `/product/${p.slug}` },
  ]
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3)
  const d = productDetails[p.slug]

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={p.faqs} />
      <PageHero crumbs={crumbs} icon={p.icon} agent={p.agent} eyebrow={p.eyebrow} title={p.title} description={p.description}>
        {lead && (
          <div className="mt-14">
            <ShotStack story={lead} />
          </div>
        )}
      </PageHero>

      {d && (
        <section className="border-b border-stripe-border py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">How it works</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">Three steps, no extra tools</h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {d.steps.map((st, i) => (
                <li key={st.title} className="relative list-none rounded-2xl border border-stripe-border bg-white p-6">
                  <span className="font-mono text-xs text-muted">STEP {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{st.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{st.body}</p>
                  <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#6d28d9]/50 to-transparent" />
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">What you get with {p.name.toLowerCase()}</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-stripe-border bg-stripe-border sm:grid-cols-2 lg:grid-cols-3">
            {p.highlights.map((h) => (
              <div key={h.title} className="bg-white p-7">
                <h3 className="font-semibold text-ink">{h.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {d && (
        <section className="border-t border-stripe-border bg-stripe-surface py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Before and after HireOnto</h2>
              <div className="mt-8 overflow-hidden rounded-2xl border border-stripe-border bg-white">
                <div className="grid grid-cols-2 border-b border-stripe-border bg-stripe-surface px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span>Without</span>
                  <span>With HireOnto</span>
                </div>
                {d.compare.map((c) => (
                  <div key={c.before} className="grid grid-cols-2 gap-6 border-b border-stripe-border px-5 py-4 text-sm last:border-0">
                    <span className="flex gap-2 text-muted">
                      <X className="mt-0.5 size-4 shrink-0 text-rose-500" />
                      {c.before}
                    </span>
                    <span className="flex gap-2 text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      {c.after}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">At a glance</h2>
              <dl className="mt-8 divide-y divide-stripe-border rounded-2xl border border-stripe-border bg-white">
                {d.specs.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 px-5 py-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
                    <dd className="text-sm font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {p.storyIds.length > 1 && (
        <section className="bg-[#07070d] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a78bfa]">In the product</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">How it fits into the workflow</h2>
            <div className="mt-16">
              <FeatureStories ids={p.storyIds.slice(1)} numbered={false} />
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Frequently asked questions</h2>
            <p className="mt-3 text-muted">
              More answers on the <Link href="/faq" className="font-semibold text-[#6d28d9] hover:underline">FAQ page</Link>.
            </p>
          </div>
          <FaqList items={p.faqs} />
        </div>
      </section>

      <section className="border-t border-stripe-border bg-stripe-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Works together with</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r, i) => (
              <FadeIn key={r.slug} delay={i * 0.05}>
                <Link href={`/product/${r.slug}`} className="group flex h-full items-start gap-4 rounded-2xl border border-stripe-border bg-white p-5 transition hover:shadow-md">
                  <BrandIcon name={r.icon} size={24} className="mt-0.5" />
                  <span>
                    <span className="block font-semibold text-ink">{r.name}</span>
                    <span className="mt-1 block text-sm text-muted">{r.title}</span>
                  </span>
                  <ArrowRight className="mt-1 ml-auto size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-[#6d28d9]" />
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#07070d] p-8 md:p-10">
            <p className="max-w-xl text-xl font-semibold text-white">Try {p.name.toLowerCase()} on one of your open roles.</p>
            <LinkButton href="/demo">Book a demo</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}

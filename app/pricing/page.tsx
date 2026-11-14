'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/motion'
import { LinkButton, Section } from '@/components/ui'
import { pricingPlans } from '@/lib/content'

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-indigo-100/80 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">Pricing that scales with hiring</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Transparent tiers for growing teams. Enterprise includes custom guardrails and manual pipeline design.
          </p>
        </div>
      </section>

      <Section eyebrow="Plans" title="Choose your starting point">
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <FadeIn key={plan.name}>
              <motion.div
                whileHover={{ y: -6 }}
                className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                  plan.highlighted
                    ? 'glass-card border-indigo-300/50 shadow-xl shadow-indigo-500/15'
                    : 'glass-card'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h2 className="text-xl font-semibold text-ink">{plan.name}</h2>
                <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
                <p className="mt-6 text-4xl font-semibold text-ink">
                  {plan.price}
                  <span className="text-base font-normal text-muted">{plan.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-violet-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <LinkButton href="/demo" className="mt-8 w-full" variant={plan.highlighted ? 'primary' : 'outline'}>
                  {plan.cta}
                </LinkButton>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          All plans include tenant isolation, verified demo onboarding, and hybrid AI + manual workflows.
        </p>
      </Section>
    </>
  )
}

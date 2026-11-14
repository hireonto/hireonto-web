'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { solutions } from '@/lib/solutions'
import { Mock } from '../mocks/mocks'
import { BrandIcon, LinkButton } from '../ui'

const MOCK: Record<string, string> = {
  'tech-hiring': 'evaluation',
  'high-volume-hiring': 'pipeline',
  'campus-hiring': 'live',
  'staffing-agencies': 'interviews',
}
const MS = 7000

/** Auto-rotating solution tabs with a sliding product mock (Stripe "Powering businesses of all sizes" style). */
export function SolutionsTabs() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const s = solutions[i]

  useEffect(() => {
    if (paused || reduce) return
    const t = setTimeout(() => setI((x) => (x + 1) % solutions.length), MS)
    return () => clearTimeout(t)
  }, [i, paused, reduce])

  return (
    <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div role="tablist" aria-label="Solutions" className="flex flex-col">
        {solutions.map((x, k) => {
          const on = k === i
          return (
            <button
              key={x.slug}
              role="tab"
              aria-selected={on}
              onClick={() => setI(k)}
              className={`relative border-l-2 py-4 pl-5 text-left transition ${on ? 'border-transparent' : 'border-stripe-border hover:border-ink/30'}`}
            >
              {on && (
                <span className="absolute top-0 -left-[2px] h-full w-[2px] overflow-hidden bg-stripe-border">
                  <span
                    key={`${i}-${paused}`}
                    className="block h-full w-full origin-top bg-[#635bff]"
                    style={{ animation: reduce || paused ? 'none' : `tab-progress ${MS}ms linear both`, transform: reduce || paused ? 'none' : undefined }}
                  />
                </span>
              )}
              <span className="flex items-center gap-2.5">
                <BrandIcon name={x.icon} size={18} />
                <span className={`text-[15px] font-semibold ${on ? 'text-ink' : 'text-muted'}`}>{x.name}</span>
              </span>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden text-sm leading-relaxed text-muted"
                  >
                    <span className="block pt-2">{x.description}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          )
        })}
        <LinkButton href={`/solutions/${s.slug}`} variant="outline" arrow className="mt-6 self-start">
          Explore {s.name.toLowerCase()}
        </LinkButton>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#635bff_0%,#a855f7_45%,#f472b6_75%,#fb923c_100%)] p-5 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgba(255,255,255,0.35),transparent)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Mock id={MOCK[s.slug] ?? 'dashboard'} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

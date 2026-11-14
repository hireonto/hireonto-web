'use client'

import { Code2, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { IconBadge } from './icon-badge'
import type { BrandIconName } from './ui'

const cards: {
  tag: string
  title: string
  metric: string
  sub: string
  icon?: LucideIcon
  brand?: BrandIconName
  tone: 'violet' | 'sky' | 'emerald' | 'indigo'
}[] = [
  { tag: 'Shortlist', title: '94% fit explained', metric: '12 sec', sub: 'avg. parse time', brand: 'resume-matching', tone: 'violet' },
  { tag: 'Voice AI', title: 'Live interview', metric: '24/7', sub: 'scheduling windows', brand: 'ai-voice-interview', tone: 'sky' },
  { tag: 'Coding', title: 'Sandbox runs', metric: 'Judge0', sub: 'isolated execution', icon: Code2, tone: 'indigo' },
  { tag: 'Security', title: 'Proctoring timeline', metric: '100+', sub: 'integrity signals', icon: Shield, tone: 'emerald' },
  { tag: 'Hybrid', title: 'Manual round', metric: '1-click', sub: 'insert human stage', brand: 'ats-pipeline', tone: 'violet' },
]

export function FeatureCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-38%'])

  return (
    <section ref={ref} className="overflow-hidden py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600/80">In motion</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">Widgets that move as you scroll</h2>
      </div>
      <motion.div style={{ x }} className="flex w-max gap-5 px-4 sm:px-6">
        {cards.map((card, i) => (
          <motion.article
            key={card.title}
            whileHover={{ y: -8, rotate: i % 2 ? -1 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="glass-card shimmer-hover w-[280px] shrink-0 rounded-3xl p-6 md:w-[320px]"
          >
            <IconBadge icon={card.icon} brand={card.brand} tone={card.tone} size="sm" />
            <span className="mt-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-700">
              {card.tag}
            </span>
            <p className="mt-3 text-lg font-semibold text-ink">{card.title}</p>
            <p className="mt-6 text-3xl font-semibold tabular-nums text-gradient-hero">{card.metric}</p>
            <p className="mt-1 text-xs text-muted">{card.sub}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

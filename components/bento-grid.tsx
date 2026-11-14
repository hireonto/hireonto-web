'use client'

import { Code2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { IconBadge } from './icon-badge'
import type { BrandIconName } from './ui'
import { FadeIn } from './motion'

const bento: {
  title: string
  body: string
  className: string
  icon?: LucideIcon
  brand?: BrandIconName
  tone: 'violet' | 'sky' | 'emerald' | 'indigo'
}[] = [
  {
    title: 'AI voice & video interviews',
    body: 'Structured plans, transcripts, and integrity signals — with recruiter override at every step.',
    className: 'md:col-span-2 md:row-span-2',
    brand: 'ai-voice-interview',
    tone: 'violet',
  },
  {
    title: 'Live coding',
    body: 'Isolated sandbox runs with full submission history.',
    className: 'md:col-span-1',
    icon: Code2,
    tone: 'sky',
  },
  {
    title: 'Scheduling & calls',
    body: 'Calendar sync and outbound candidate outreach.',
    className: 'md:col-span-1',
    brand: 'interview-scheduling',
    tone: 'emerald',
  },
  {
    title: 'Manual + AI hybrid',
    body: 'Insert human-led rounds without breaking the funnel.',
    className: 'md:col-span-2',
    brand: 'ai-hiring-agent',
    tone: 'indigo',
  },
]

export function BentoGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:auto-rows-[minmax(160px,auto)]">
      {bento.map((item, i) => (
        <FadeIn key={item.title} delay={i * 0.05} className={item.className}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="stripe-panel shimmer-hover h-full rounded-2xl p-6 md:p-8"
          >
            <IconBadge icon={item.icon} brand={item.brand} tone={item.tone} size={i === 0 ? 'lg' : 'md'} />
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink md:text-xl">{item.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{item.body}</p>
          </motion.article>
        </FadeIn>
      ))}
    </div>
  )
}

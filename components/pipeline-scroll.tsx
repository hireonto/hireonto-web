'use client'

import type { BrandIconName } from './ui'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { IconBadge } from './icon-badge'

const steps: { title: string; desc: string; icon: BrandIconName; tone: 'violet' | 'sky' | 'emerald' | 'indigo' }[] = [
  { title: 'Ingest resumes', desc: 'Parse & score fit automatically', icon: 'resume-parsing', tone: 'sky' },
  { title: 'AI shortlist', desc: 'Threshold + recruiter override', icon: 'ai-screening', tone: 'violet' },
  { title: 'Interview', desc: 'Voice, video & coding rounds', icon: 'ai-video-interview', tone: 'indigo' },
  { title: 'Schedule calls', desc: 'Calendar + outbound campaigns', icon: 'interview-scheduling', tone: 'emerald' },
  { title: 'Decide', desc: 'Rubrics, integrity & audit trail', icon: 'candidate-selection', tone: 'violet' },
]

export function PipelineScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.75], [0.05, 1])

  return (
    <section ref={ref} className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500/90"
        >
          Productivity flow
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-3 max-w-2xl text-3xl font-semibold text-ink md:text-4xl"
        >
          Scroll the pipeline — each stage animates in sync
        </motion.h2>

        <div className="relative mt-14 hidden md:block">
          <div className="absolute left-[5%] right-[5%] top-[30px] h-1 overflow-hidden rounded-full bg-indigo-100">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
              style={{ scaleX: lineScale }}
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative pt-16 text-center"
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <IconBadge brand={step.icon} size="lg" />
                </div>
                <p className="font-medium text-ink">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 md:hidden snap-x snap-mandatory">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card w-[78vw] shrink-0 snap-center rounded-3xl p-6"
            >
              <IconBadge brand={step.icon} />
              <p className="mt-3 text-sm font-semibold text-indigo-600">Step {i + 1}</p>
              <p className="mt-2 text-lg font-medium text-ink">{step.title}</p>
              <p className="mt-2 text-sm text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

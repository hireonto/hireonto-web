'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PipelineGraphic } from './vectors/pipeline-graphic'

const rows = [
  { name: 'Chloe S.', role: 'Backend Engineer', score: 94, stage: 'Voice interview' },
  { name: 'Daniel M.', role: 'Backend Engineer', score: 88, stage: 'Coding' },
  { name: 'Hannah B.', role: 'Backend Engineer', score: 91, stage: 'Shortlisted' },
]

export function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <div ref={ref} className="relative">
      <div className="pointer-events-none absolute -inset-8 opacity-90">
        <PipelineGraphic className="h-full w-full" />
      </div>

      <motion.div
        style={{ y }}
        className="stripe-panel relative overflow-hidden rounded-2xl md:rounded-3xl"
      >
        <div className="border-b border-stripe-border bg-stripe-surface px-5 py-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Pipeline</p>
              <p className="text-lg font-semibold text-ink">Backend Engineer · Q1</p>
            </div>
            <span className="rounded-full bg-[#635bff]/10 px-3 py-1 text-xs font-semibold text-[#635bff]">
              AI + manual
            </span>
          </div>
        </div>
        <div className="bg-white p-4 md:p-5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                <th className="pb-3 font-semibold">Candidate</th>
                <th className="pb-3 font-semibold">Fit</th>
                <th className="pb-3 font-semibold">Stage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                  className="border-t border-stripe-border"
                >
                  <td className="py-3.5">
                    <p className="font-medium text-ink">{r.name}</p>
                    <p className="text-xs text-muted">{r.role}</p>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-stripe-border">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#635bff] to-[#00d4ff]"
                          initial={{ width: 0 }}
                          animate={{ width: `${r.score}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-xs font-medium tabular-nums text-ink">{r.score}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-muted">{r.stage}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <motion.div
          className="absolute -right-6 top-16 hidden w-44 rounded-xl border border-stripe-border bg-white/95 p-3 shadow-stripe lg:block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#635bff]">Live</p>
          <p className="mt-1 text-sm font-medium text-ink">AI interview</p>
          <p className="text-xs text-muted">Proctoring on</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

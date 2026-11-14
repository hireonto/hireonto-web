'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function AnimatedStat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(value / 40)
    const id = window.setInterval(() => {
      start += step
      if (start >= value) {
        setN(value)
        window.clearInterval(id)
      } else setN(start)
    }, 24)
    return () => window.clearInterval(id)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="text-3xl font-semibold tabular-nums tracking-[-0.03em] text-ink md:text-4xl">
        {n}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  )
}

export function StatsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-8 md:grid-cols-4"
    >
      <AnimatedStat value={68} suffix="%" label="Faster shortlist" />
      <AnimatedStat value={24} suffix="/7" label="Interview coverage" />
      <AnimatedStat value={99} suffix=".9%" label="Uptime target" />
      <AnimatedStat value={100} suffix="+" label="Integrity checks" />
    </motion.div>
  )
}

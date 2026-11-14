'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Slide-in on scroll. `from` sets the direction the element slides in from. */
export function Reveal({
  children,
  from = 'bottom',
  delay = 0,
  className,
}: {
  children: ReactNode
  from?: 'bottom' | 'left' | 'right' | 'scale'
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const initial =
    from === 'left' ? { opacity: 0, x: -48 } : from === 'right' ? { opacity: 0, x: 48 } : from === 'scale' ? { opacity: 0, scale: 0.94 } : { opacity: 0, y: 40 }
  return (
    <motion.div
      className={className}
      initial={reduce ? false : initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Counts up to `to` once visible. Keeps prefix/suffix text around the number. */
export function CountUp({ to, decimals = 0, prefix = '', suffix = '', className }: { to: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      const id = requestAnimationFrame(() => setValue(to))
      return () => cancelAnimationFrame(id)
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400)
      setValue(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

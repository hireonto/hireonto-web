'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Rotating conic gradient — Zorea-style SaaS card chrome. */
export function AnimatedBorder({
  children,
  className,
  innerClassName,
  radius = '28px',
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
  radius?: string
}) {
  return (
    <div className={`relative overflow-hidden p-[1.5px] ${className ?? ''}`} style={{ borderRadius: radius }}>
      <motion.div
        className="pointer-events-none absolute inset-[-120%] opacity-90"
        style={{
          background:
            'conic-gradient(from 0deg, #6366f1, #38bdf8, #a78bfa, #34d399, #6366f1)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />
      <div
        className={`relative h-full bg-slate-950/95 ${innerClassName ?? ''}`}
        style={{ borderRadius: `calc(${radius} - 2px)` }}
      >
        {children}
      </div>
    </div>
  )
}

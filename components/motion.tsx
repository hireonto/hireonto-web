'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function GlowOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ''}`}
      animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    />
  )
}

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-[#635bff] via-[#0073e6] to-[#00d4ff] bg-clip-text text-transparent ${className ?? ''}`}>
      {children}
    </span>
  )
}

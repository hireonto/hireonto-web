'use client'

import { motion } from 'framer-motion'
import { BrandIcon, type BrandIconName } from './ui'

const items: { name: BrandIconName; x: string; y: string; size: number; delay: number }[] = [
  { name: 'ai-job-description', x: '8%', y: '12%', size: 28, delay: 0 },
  { name: 'candidate-sourcing', x: '88%', y: '18%', size: 32, delay: 0.5 },
  { name: 'ai-hiring-agent', x: '78%', y: '62%', size: 36, delay: 1 },
  { name: 'resume-parsing', x: '12%', y: '55%', size: 30, delay: 0.3 },
  { name: 'recruitment-analytics', x: '92%', y: '78%', size: 26, delay: 0.8 },
  { name: 'ai-voice-interview', x: '22%', y: '82%', size: 24, delay: 1.2 },
  { name: 'interview-scheduling', x: '65%', y: '8%', size: 22, delay: 0.6 },
  { name: 'ai-evaluation-scoring', x: '48%', y: '88%', size: 28, delay: 0.2 },
]

export function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map(({ name, x, y, size, delay }) => (
        <motion.div
          key={name}
          className="absolute"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 8, -6, 4, 0],
            rotate: [0, 6, -4, 0],
          }}
          transition={{
            duration: 14 + delay * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <div className="icon-float-ring flex items-center justify-center rounded-2xl p-3">
            <BrandIcon name={name} size={size} className="opacity-45" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

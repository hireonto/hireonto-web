'use client'

import { motion } from 'framer-motion'

const nodes = [
  { cx: 80, cy: 380, label: 'Resumes' },
  { cx: 220, cy: 280, label: 'Shortlist' },
  { cx: 400, cy: 320, label: 'Interview' },
  { cx: 560, cy: 220, label: 'Schedule' },
  { cx: 700, cy: 280, label: 'Hire' },
]

export function PipelineGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 780 440"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hm-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#635BFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <filter id="hm-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d="M80 380 C 140 340, 180 300, 220 280 C 300 240, 350 300, 400 320 C 480 350, 520 260, 560 220 C 620 170, 660 240, 700 280"
        stroke="url(#hm-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {nodes.map((n, i) => (
        <g key={n.label}>
          <motion.circle
            cx={n.cx}
            cy={n.cy}
            r={i === 2 ? 14 : 10}
            fill="#fff"
            stroke="url(#hm-stroke)"
            strokeWidth="2"
            filter="url(#hm-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 260, damping: 20 }}
          />
          <motion.text
            x={n.cx}
            y={n.cy + 32}
            textAnchor="middle"
            className="fill-[#425466] text-[11px] font-medium"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + i * 0.12 }}
          >
            {n.label}
          </motion.text>
        </g>
      ))}

    </svg>
  )
}

'use client'

import { motion } from 'framer-motion'

/** Stripe-inspired: white canvas, soft gradient corners, diagonal mesh. */
export function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white" aria-hidden>
      <div className="stripe-hero-gradient absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.4]" preserveAspectRatio="none">
        <defs>
          <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
            <path d="M0 40 V0 H40" stroke="#E6EBF1" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" opacity="0.5" />
      </svg>
      <motion.div
        className="absolute -right-[20%] top-[-30%] h-[70vmin] w-[70vmin] rounded-full bg-[#635bff]/[0.07] blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-[15%] bottom-[-20%] h-[55vmin] w-[55vmin] rounded-full bg-[#00d4ff]/[0.08] blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

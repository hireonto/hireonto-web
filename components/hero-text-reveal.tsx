'use client'

import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1] as const

export function HeroTextReveal() {
  const line1 = 'AI hiring infrastructure'
  const line2 = 'for modern teams'
  return (
    <h1 className="mt-6 max-w-xl text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.04em] text-ink md:text-[3.5rem]">
      {[line1, line2].map((line, li) => (
        <span key={line} className="block overflow-hidden">
          {line.split(' ').map((word, wi) => {
            const i = li * 10 + wi
            const accent = word === 'AI' || word === 'infrastructure'
            return (
              <motion.span
                key={`${line}-${word}`}
                className={`mr-[0.25em] inline-block ${accent ? 'text-gradient-hero' : ''}`}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.04, ease }}
              >
                {word}
              </motion.span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

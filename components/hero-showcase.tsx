'use client'

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatedBorder } from './animated-border'

const float = (delay: number, y = 12) => ({
  animate: { y: [0, -y, 0], rotate: [0, delay % 2 ? 1 : -1, 0] },
  transition: { duration: 4.5 + delay, repeat: Infinity, ease: 'easeInOut' as const, delay },
})

function MiniCard({
  className,
  children,
  delay = 0,
}: {
  className?: string
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      {...float(delay, 14)}
      className={`glass-card-dark z-20 rounded-2xl p-4 shadow-xl shadow-indigo-500/15 ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}

const pipelineSteps = [
  { label: 'Resume parse', status: 'done' as const },
  { label: 'AI shortlist', status: 'done' as const },
  { label: 'Voice interview', status: 'live' as const },
  { label: 'Coding round', status: 'next' as const },
]

export function HeroShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(2)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 100, damping: 18 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveStep((s) => (s + 1) % pipelineSteps.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      style={{ y: parallaxY, scale: parallaxScale }}
      className="relative mx-auto aspect-[4/5] max-h-[540px] w-full max-w-md lg:max-w-none lg:aspect-auto lg:h-[540px]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <MiniCard className="absolute left-0 top-6 w-[58%]" delay={0}>
        <p className="text-[10px] font-medium uppercase tracking-wider text-sky-200/80">Shortlist</p>
        <p className="mt-1 text-2xl font-semibold text-white">94%</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400"
            animate={{ width: ['20%', '94%', '94%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </MiniCard>

      <MiniCard className="absolute right-0 top-0 w-[52%]" delay={0.35}>
        <div className="flex items-center gap-2">
          <motion.span
            className="size-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
          <p className="text-xs font-medium text-white/90">Live AI interview</p>
        </div>
        <motion.p
          key={activeStep}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-white/60"
        >
          {pipelineSteps[activeStep].label}…
        </motion.p>
      </MiniCard>

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        className="absolute inset-x-2 bottom-0 top-[5.5rem] z-10"
      >
        <AnimatedBorder radius="32px" innerClassName="h-full overflow-hidden" className="h-full shadow-2xl">
          <div className="relative h-full overflow-hidden p-5">
            <div className="shimmer-sweep pointer-events-none absolute inset-0 opacity-30" aria-hidden />
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs text-white/45">Pipeline</p>
                <p className="font-semibold text-white">Backend Engineer</p>
              </div>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="rounded-full bg-violet-500/25 px-3 py-1 text-xs font-medium text-violet-100"
              >
                5 stages
              </motion.span>
            </div>
            <ul className="mt-4 space-y-2.5">
              <AnimatePresence mode="popLayout">
                {pipelineSteps.map((step, i) => {
                  const highlighted = i === activeStep
                  return (
                    <motion.li
                      key={step.label}
                      layout
                      animate={{
                        scale: highlighted ? 1.02 : 1,
                        backgroundColor: highlighted ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.04)',
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                    >
                      <motion.span
                        className="size-2 shrink-0 rounded-full"
                        animate={{
                          backgroundColor:
                            highlighted ? '#38bdf8' : step.status === 'done' ? '#34d399' : 'rgba(255,255,255,0.25)',
                          boxShadow: highlighted ? '0 0 14px rgba(56,189,248,0.9)' : '0 0 0 transparent',
                        }}
                      />
                      <span className="flex-1 text-sm text-white/85">{step.label}</span>
                      {highlighted && (
                        <motion.span
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[10px] font-bold uppercase tracking-wide text-sky-300"
                        >
                          Active
                        </motion.span>
                      )}
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
          </div>
        </AnimatedBorder>
      </motion.div>

      <MiniCard className="absolute bottom-4 right-0 w-[50%]" delay={0.7}>
        <p className="text-xs text-white/50">Productivity</p>
        <motion.p
          className="text-lg font-semibold text-white"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Guardrails on
        </motion.p>
      </MiniCard>
    </motion.div>
  )
}

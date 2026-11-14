'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FileText, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AgentBot } from '../agents/agent-bot'

type Who = 'candidate' | 'onric' | 'tovia' | 'you'

const STAGES: { who: Who; title: string; detail: string }[] = [
  { who: 'candidate', title: 'Resume received', detail: 'ethan-carter-resume.pdf' },
  { who: 'onric', title: 'Onric scores it', detail: 'Fit 94% · Node.js, Postgres' },
  { who: 'onric', title: 'Shortlisted', detail: 'Above the 70% threshold' },
  { who: 'onric', title: 'Invite sent', detail: 'Private link · 72h window' },
  { who: 'tovia', title: 'Tovia interviews', detail: '31-min voice interview' },
  { who: 'tovia', title: 'Evaluation ready', detail: 'Score 84 · Recommend hire' },
  { who: 'you', title: 'You decide', detail: 'Advance to panel round' },
]
const STEP_MS = 1700

function Avatar({ who, active }: { who: Who; active: boolean }) {
  if (who === 'onric' || who === 'tovia') return <AgentBot agent={who} className="size-12" animate={active} />
  return (
    <span className={`grid size-12 place-items-center rounded-2xl ${who === 'you' ? 'bg-white text-[#0a2540]' : 'bg-white/10 text-white'}`}>
      {who === 'you' ? <UserRound className="size-5" /> : <FileText className="size-5" />}
    </span>
  )
}

/** Animated candidate journey: one sample candidate moves through every stage in a loop. */
export function CandidateJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-80px' })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const t = setTimeout(() => setStep((s) => (s + 1) % (STAGES.length + 2)), STEP_MS)
    return () => clearTimeout(t)
  }, [step, inView, reduce])

  const current = reduce ? STAGES.length - 1 : Math.min(step, STAGES.length - 1)
  const pct = (current / (STAGES.length - 1)) * 100

  return (
    <div ref={ref} className="relative">
      {/* candidate chip */}
      <div className="mb-8 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-semibold text-white">EC</span>
        <div>
          <div className="text-sm font-semibold text-white">Ethan Carter</div>
          <div className="text-xs text-white/50">Backend Engineer · sample candidate</div>
        </div>
        <span className="ml-auto rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/70">
          Stage {current + 1} / {STAGES.length}
        </span>
      </div>

      {/* track (desktop) */}
      <div className="relative hidden lg:block">
        <div className="absolute top-6 right-[7%] left-[7%] h-px bg-white/10" />
        <motion.div
          className="absolute top-6 left-[7%] h-px origin-left bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#f0abfc]"
          animate={{ width: `${pct * 0.86}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <ol className="relative grid grid-cols-7 gap-3">
          {STAGES.map((s, i) => {
            const done = i < current
            const active = i === current
            return (
              <li key={s.title} className="flex list-none flex-col items-center text-center">
                <motion.div animate={{ scale: active ? 1.12 : 1, opacity: i <= current ? 1 : 0.4 }} transition={{ duration: 0.35 }} className="relative">
                  {active && <span className="absolute -inset-2 rounded-3xl bg-violet-500/25 blur-md" />}
                  <div className="relative">
                    <Avatar who={s.who} active={active} />
                  </div>
                </motion.div>
                <div
                  className={`mt-5 w-full rounded-xl border p-3 transition duration-300 ${
                    active ? 'border-violet-300/50 bg-white/10 shadow-[0_10px_30px_-10px_rgba(167,139,250,0.6)]' : done ? 'border-white/10 bg-white/[0.04]' : 'border-white/5 bg-transparent'
                  }`}
                >
                  <div className={`text-[13px] font-semibold ${i <= current ? 'text-white' : 'text-white/45'}`}>{s.title}</div>
                  <div className={`mt-1 text-[11px] leading-snug ${i <= current ? 'text-white/60' : 'text-white/30'}`}>{s.detail}</div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* vertical (mobile / tablet) */}
      <ol className="relative space-y-3 border-l border-white/10 pl-6 lg:hidden">
        {STAGES.map((s, i) => {
          const active = i === current
          return (
            <li key={s.title} className={`relative flex list-none items-center gap-3 rounded-xl p-2.5 transition ${active ? 'bg-white/10' : ''} ${i <= current ? '' : 'opacity-45'}`}>
              <span className={`absolute top-1/2 -left-[29px] size-2.5 -translate-y-1/2 rounded-full ${i <= current ? 'bg-violet-300' : 'bg-white/20'}`} />
              <Avatar who={s.who} active={active} />
              <div>
                <div className="text-sm font-semibold text-white">{s.title}</div>
                <div className="text-xs text-white/55">{s.detail}</div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

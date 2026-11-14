'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export const MOCK_W = 960
export const MOCK_H = 600

/**
 * Renders a fixed 960×600 design canvas and scales it to the container width,
 * so the illustration keeps its exact layout on every screen size.
 */
export function Scaled({ children, label, h = MOCK_H }: { children: ReactNode; label: string; h?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / MOCK_W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="relative w-full"
      style={{ aspectRatio: `${MOCK_W} / ${h}`, overflow: scale === null ? 'hidden' : undefined }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left transition-opacity duration-300"
        style={{ width: MOCK_W, height: h, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  )
}

/** Dark app window with traffic lights, path and optional mini sidebar. */
export function AppWindow({ path, children, sidebar = true, active }: { path: string; children: ReactNode; sidebar?: boolean; active?: string }) {
  const nav = ['Dashboard', 'Jobs', 'Interviews', 'Analytics']
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c11] text-white shadow-[0_40px_100px_-30px_rgba(37,99,235,0.45),0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-[#111219] px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-white/40">{path}</div>
        <span className="w-10" />
      </div>
      <div className="flex min-h-0 flex-1">
        {sidebar && (
          <div className="flex w-[168px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0d0e14] p-3">
            <div className="flex items-center gap-2 px-1.5 pb-4">
              <div className="grid size-7 place-items-center rounded-md bg-white text-[11px] font-bold text-black">A</div>
              <div>
                <div className="text-[12px] font-semibold">Acme Inc.</div>
                <div className="font-mono text-[8px] tracking-[0.18em] text-white/35 uppercase">Hiring studio</div>
              </div>
            </div>
            {nav.map((n) => (
              <div key={n} className={`mb-0.5 rounded-md px-2.5 py-1.5 text-[12px] ${n === active ? 'bg-white/[0.08] text-white' : 'text-white/45'}`}>
                {n}
              </div>
            ))}
            <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/[0.06] p-2">
              <div className="grid size-6 place-items-center rounded-md bg-white/10 text-[9px]">MR</div>
              <div className="text-[10px] text-white/60">Megan R. · Recruiter</div>
            </div>
          </div>
        )}
        <div className="min-w-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

export function Avatar({ name, tone = 0 }: { name: string; tone?: number }) {
  const tones = ['from-sky-500 to-indigo-500', 'from-violet-500 to-fuchsia-500', 'from-emerald-500 to-teal-500', 'from-amber-500 to-orange-500', 'from-rose-500 to-pink-500']
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
  return <div className={`grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ${tones[tone % tones.length]}`}>{initials}</div>
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'amber' | 'violet' | 'red' | 'blue' }) {
  const tones = {
    neutral: 'border-white/15 text-white/70',
    green: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    amber: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    violet: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
    red: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    blue: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  }
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${tones[tone]}`}>{children}</span>
}

export function Bar({ value, delay = 0, className = 'from-[#3b82f6] to-[#a855f7]' }: { value: number; delay?: number; className?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
      <div className={`mock-bar h-full rounded-full bg-gradient-to-r ${className}`} style={{ width: `${value}%`, animationDelay: `${delay}s` }} />
    </div>
  )
}

export function Ring({ value, size = 120, stroke = 9, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="mock-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="url(#mock-ring)" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${(c * value) / 100} ${c}`} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-[30px] leading-none font-semibold">{value}</div>
          {label && <div className="mt-1 font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">{label}</div>}
        </div>
      </div>
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-white/[0.07] bg-white/[0.025] ${className}`}>{children}</div>
}

export function Label({ children }: { children: ReactNode }) {
  return <div className="font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase">{children}</div>
}

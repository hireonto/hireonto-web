'use client'

import { AgentBot } from '../agents/agent-bot'

const people = [
  { n: 'Ethan Carter', fit: 94, c: 'from-sky-500 to-indigo-500' },
  { n: 'Olivia Bennett', fit: 91, c: 'from-violet-500 to-fuchsia-500' },
  { n: 'Jacob Miller', fit: 88, c: 'from-emerald-500 to-teal-500' },
  { n: 'Sophia Turner', fit: 82, c: 'from-amber-500 to-orange-500' },
]

function Dot({ name, c }: { name: string; c: string }) {
  return (
    <span className={`grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[9px] font-semibold text-white ${c}`}>
      {name
        .split(' ')
        .map((p) => p[0])
        .join('')}
    </span>
  )
}

const card = 'rounded-xl border border-[#e3e8ee] bg-white shadow-[0_15px_35px_-15px_rgba(50,50,93,0.25),0_5px_15px_-8px_rgba(0,0,0,0.08)]'

/** Phone-style screening card + floating shortlist toast. */
export function ScreeningWidget() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[380px]">
      <div className={`absolute top-2 left-0 w-[210px] overflow-hidden rounded-[26px] border-[6px] border-[#0a2540] bg-white ${card}`}>
        <div className="bg-[#f6f9fc] px-3 py-2.5">
          <div className="text-[9px] font-semibold tracking-wider text-[#425466] uppercase">Backend Engineer</div>
          <div className="text-[13px] font-semibold text-[#0a2540]">124 resumes ranked</div>
        </div>
        <div className="space-y-2 p-3">
          {people.map((p, i) => (
            <div key={p.n} className="flex items-center gap-2">
              <Dot name={p.n} c={p.c} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] font-medium text-[#0a2540]">{p.n}</div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#e3e8ee]">
                  <div className="mock-bar h-full rounded-full bg-gradient-to-r from-[#635bff] to-[#a855f7]" style={{ width: `${p.fit}%`, animationDelay: `${i * 0.1}s` }} />
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#0a2540]">{p.fit}%</span>
            </div>
          ))}
          <div className="mt-2 rounded-lg bg-[#635bff] py-1.5 text-center text-[10px] font-semibold text-white">Auto-shortlist ≥ 70%</div>
        </div>
      </div>
      <div className={`mock-float absolute top-44 right-0 w-[190px] sm:top-24 p-3 ${card}`}>
        <div className="flex items-center gap-2">
          <AgentBot agent="onric" className="size-8" animate={false} />
          <div>
            <div className="text-[11px] font-semibold text-[#0a2540]">Onric</div>
            <div className="text-[9px] text-[#425466]">just now</div>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-[#425466]">
          Shortlisted <b className="text-[#0a2540]">41</b> candidates and merged <b className="text-[#0a2540]">3</b> duplicates.
        </p>
      </div>
    </div>
  )
}

/** Dark call card with Tovia, waveform and live caption. */
export function ToviaCallWidget() {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="overflow-hidden rounded-2xl bg-[#0b0c11] p-4 text-white shadow-[0_30px_60px_-20px_rgba(76,29,149,0.6)]">
        <div className="flex items-center justify-between text-[10px] text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Live · 14:32 left
          </span>
          <span className="rounded-full border border-white/15 px-2 py-0.5">Secure</span>
        </div>
        <div className="mt-3 flex flex-col items-center rounded-xl bg-[radial-gradient(60%_60%_at_50%_40%,rgba(147,51,234,0.35),transparent)] py-5">
          <AgentBot agent="tovia" className="size-24" />
          <div className="mock-wave mt-2 flex h-6 items-center gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="block h-6 w-1 rounded-full bg-gradient-to-t from-sky-400 to-fuchsia-400" style={{ animationDelay: `${(i % 5) * 0.12}s` }} />
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-white/[0.06] p-2.5 text-[11px] leading-relaxed text-white/80">
          <span className="text-fuchsia-300">Tovia ·</span> How did you verify the index would not slow down writes?
        </div>
      </div>
    </div>
  )
}

/** Score ring + rubric, light. */
export function EvalWidget() {
  const rubric = [
    ['Role fit', 84],
    ['Technical depth', 86],
    ['Communication', 80],
    ['Problem solving', 90],
  ] as const
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className={`mx-auto w-full max-w-[340px] p-4 ${card}`}>
      <div className="flex items-center gap-4">
        <div className="relative size-[84px]">
          <svg viewBox="0 0 84 84" className="size-full -rotate-90">
            <defs>
              <linearGradient id="evalw" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#635bff" />
                <stop offset="1" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <circle cx="42" cy="42" r={r} stroke="#e3e8ee" strokeWidth="7" fill="none" />
            <circle cx="42" cy="42" r={r} stroke="url(#evalw)" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray={`${c * 0.84} ${c}`} />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-xl font-semibold text-[#0a2540]">84</div>
        </div>
        <div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Recommend: Hire</span>
          <div className="mt-1.5 text-[13px] font-semibold text-[#0a2540]">Ethan Carter</div>
          <div className="text-[10px] text-[#425466]">Backend Engineer</div>
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        {rubric.map(([k, v], i) => (
          <div key={k}>
            <div className="mb-1 flex justify-between text-[10px] text-[#425466]">
              {k}
              <span className="font-semibold text-[#0a2540]">{v}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#e3e8ee]">
              <div className="mock-bar h-full rounded-full bg-gradient-to-r from-[#635bff] to-[#d946ef]" style={{ width: `${v}%`, animationDelay: `${i * 0.1}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Integrity timeline, light. */
export function ProctorWidget() {
  const ev = [
    ['00:00', 'Checks passed', 'bg-emerald-500'],
    ['06:12', 'Tab switched · 2s', 'bg-amber-400'],
    ['14:02', 'Second face detected', 'bg-rose-500'],
    ['31:10', 'Session completed', 'bg-emerald-500'],
  ]
  return (
    <div className={`mx-auto w-full max-w-[300px] p-4 ${card}`}>
      <div className="text-[12px] font-semibold text-[#0a2540]">Integrity timeline</div>
      <div className="mt-3 space-y-3 border-l border-[#e3e8ee] pl-4">
        {ev.map(([t, e, c]) => (
          <div key={t} className="relative">
            <span className={`absolute top-1 -left-[21px] size-2.5 rounded-full ring-4 ring-white ${c}`} />
            <div className="font-mono text-[9px] text-[#8792a2]">{t}</div>
            <div className="text-[11px] text-[#0a2540]">{e}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1">
        {[1, 0, 0].map((on, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${on ? 'bg-rose-500' : 'bg-[#e3e8ee]'}`} />
        ))}
      </div>
      <div className="mt-1 text-[9px] text-[#8792a2]">Strike 1 of 3</div>
    </div>
  )
}

/** Week calendar with booked rounds. */
export function CalendarWidget() {
  const days = ['M', 'T', 'W', 'T', 'F']
  const ev = [
    [0, 20, 30, 'L2 · Ethan', 'bg-[#635bff]'],
    [1, 50, 28, 'Director · Sophia', 'bg-fuchsia-500'],
    [2, 8, 30, 'L2 · Olivia', 'bg-sky-500'],
    [3, 58, 34, 'Panel · Jacob', 'bg-emerald-500'],
    [4, 34, 26, 'Coding · Ryan', 'bg-amber-500'],
  ] as const
  return (
    <div className={`mx-auto w-full max-w-[340px] p-4 ${card}`}>
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-[#0a2540]">This week</div>
        <span className="rounded-full bg-[#f6f9fc] px-2 py-0.5 text-[9px] text-[#425466]">Meet · Teams</span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <div key={i} className="text-center text-[9px] text-[#8792a2]">
            {d}
          </div>
        ))}
        {days.map((d, col) => (
          <div key={col} className="relative h-[150px] rounded-md bg-[#f6f9fc]">
            {ev
              .filter((e) => e[0] === col)
              .map(([, top, hgt, label, bg]) => (
                <div key={label} className={`absolute inset-x-0.5 rounded px-1 py-0.5 text-[8px] leading-tight text-white ${bg}`} style={{ top: `${top}%`, height: `${hgt}%` }}>
                  {label}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Funnel + spark area chart. */
export function AnalyticsWidget() {
  const pts = [12, 18, 15, 26, 22, 34, 30, 42, 39, 52, 48, 60]
  const max = 64
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * 260},${80 - (v / max) * 80}`).join(' L')
  return (
    <div className={`mx-auto w-full max-w-[320px] p-4 ${card}`}>
      <div className="text-[10px] text-[#425466]">Interviews completed</div>
      <div className="text-[22px] font-semibold text-[#0a2540]">
        426 <span className="text-[11px] font-medium text-emerald-600">+18%</span>
      </div>
      <svg viewBox="0 0 260 90" className="mt-2 w-full">
        <defs>
          <linearGradient id="aw" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#635bff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#635bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M${path} L260,90 L0,90 Z`} fill="url(#aw)" />
        <path d={`M${path}`} fill="none" stroke="#635bff" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
        {[
          ['248', 'Parsed'],
          ['154', 'Shortlist'],
          ['119', 'Invited'],
          ['89', 'Done'],
        ].map(([v, k]) => (
          <div key={k} className="rounded-md bg-[#f6f9fc] py-1.5">
            <div className="text-[12px] font-semibold text-[#0a2540]">{v}</div>
            <div className="text-[8px] text-[#8792a2]">{k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

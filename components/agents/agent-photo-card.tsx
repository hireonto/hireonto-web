import { existsSync } from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { AgentBot, type AgentName } from './agent-bot'

const META: Record<AgentName, { name: string; role: string; dot: string; glow: string }> = {
  onric: { name: 'Onric', role: 'AI hiring agent', dot: 'bg-sky-400', glow: 'bg-[radial-gradient(55%_55%_at_45%_45%,rgba(129,140,248,0.75),transparent),radial-gradient(45%_50%_at_70%_60%,rgba(56,189,248,0.55),transparent)]' },
  tovia: { name: 'Tovia', role: 'AI interviewer', dot: 'bg-fuchsia-400', glow: 'bg-[radial-gradient(55%_55%_at_40%_45%,rgba(192,132,252,0.8),transparent),radial-gradient(45%_50%_at_70%_55%,rgba(244,114,182,0.7),transparent)]' },
}

/**
 * Agent "profile" card in a soft studio style: glowing backdrop, portrait, and a glass
 * name bar. Uses a real portrait from /public/brand/agents/<agent>.webp|.jpg|.png when
 * one exists; otherwise falls back to the illustrated avatar.
 */
export function AgentPhotoCard({ agent, className, priority }: { agent: AgentName; className?: string; priority?: boolean }) {
  const m = META[agent]
  const photo = ['webp', 'jpg', 'png']
    .map((ext) => `/brand/agents/${agent}.${ext}`)
    .find((p) => existsSync(path.join(process.cwd(), 'public', p)))

  return (
    <div className={`relative ${className ?? ''}`}>
      {/* window */}
      <div className="relative rounded-[22px] bg-[linear-gradient(180deg,#f1edf9,#d9d2ea)] p-2 shadow-[0_30px_70px_-25px_rgba(76,29,149,0.6)] ring-1 ring-white/60">
        <div className="flex items-center justify-end gap-1.5 px-2 pt-0.5 pb-2" aria-hidden>
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <span className="size-2.5 rounded-full bg-violet-400" />
          <span className="size-2.5 rounded-full bg-rose-400" />
        </div>
        <div className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,#e6dcfb,#cfc0f2)]">
          <div className={`absolute inset-0 -z-10 opacity-70 blur-2xl ${m.glow}`} aria-hidden />
          {photo ? (
            <Image src={photo} alt={`${m.name}, HireOnto ${m.role}`} fill priority={priority} sizes="(min-width: 1024px) 420px, 80vw" className="object-cover object-top" />
          ) : (
            <AgentBot agent={agent} className="absolute -left-[14%] bottom-[-4%] w-[128%] max-w-none" />
          )}
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-full bg-[#1b1530]/55 px-4 py-2.5 text-white ring-1 ring-white/25 backdrop-blur-md">
            <span className="relative flex size-2.5">
              <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${m.dot}`} />
              <span className={`relative inline-flex size-2.5 rounded-full ${m.dot}`} />
            </span>
            <span className="text-[15px] font-semibold">{m.name}</span>
            <span className="ml-auto font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">{m.role}</span>
          </div>
        </div>
      </div>
      {/* glass speech bubble */}
      <div className="mock-float absolute -top-6 -right-4 grid h-14 w-20 place-items-center rounded-2xl bg-[#6d28d9]/45 text-white shadow-[0_10px_30px_-10px_rgba(76,29,149,0.6)] ring-1 ring-white/50 backdrop-blur-md sm:-right-8 sm:h-16 sm:w-24" aria-hidden>
        {agent === 'tovia' ? (
          <span className="flex gap-1.5">
            <span className="mock-blink size-2.5 rounded-full bg-white" />
            <span className="mock-blink size-2.5 rounded-full bg-white" style={{ animationDelay: '0.2s' }} />
            <span className="mock-blink size-2.5 rounded-full bg-white" style={{ animationDelay: '0.4s' }} />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        )}
        <span className="absolute -bottom-2 left-6 size-4 rotate-45 rounded-sm bg-[#6d28d9]/45 ring-1 ring-white/50 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      </div>
    </div>
  )
}

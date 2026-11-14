import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Agent } from '@/lib/agents'
import { AgentBot } from './agent-bot'

/** Large intro card for one agent: mascot on a tinted stage + role, tagline and skills. */
export function AgentCard({ agent, href = '/agents' }: { agent: Agent; href?: string }) {
  const isT = agent.id === 'tovia'
  return (
    <Link
      href={`${href}#${agent.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-stripe-border bg-white transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,16,32,0.35)]"
    >
      <div
        className={`relative grid h-64 place-items-center overflow-hidden ${
          isT ? 'bg-[radial-gradient(70%_80%_at_50%_100%,#e9d5ff,transparent),linear-gradient(180deg,#faf5ff,#f3e8ff)]' : 'bg-[radial-gradient(70%_80%_at_50%_100%,#c7d2fe,transparent),linear-gradient(180deg,#f5f8ff,#e0e7ff)]'
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(11,16,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,16,32,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(60%_60%_at_50%_60%,black,transparent)]" />
        <AgentBot agent={agent.id} className="relative h-52 w-52" />
        <span className={`absolute top-4 left-4 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-white ${isT ? 'bg-[#9333ea]' : 'bg-[#2563eb]'}`}>
          {agent.role}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{agent.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{agent.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {agent.handles.map((h) => (
            <li key={h} className="rounded-full border border-stripe-border bg-stripe-surface px-3 py-1 text-xs font-medium text-ink/75">
              {h}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-ink">
          Meet {agent.name} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

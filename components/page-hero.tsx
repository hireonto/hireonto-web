import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { AgentBot, type AgentName } from './agents/agent-bot'
import { BrandIcon, LinkButton, type BrandIconName } from './ui'

/** Shared hero for product / solution / resource pages, with visible breadcrumbs. */
export function PageHero({
  crumbs,
  icon,
  agent,
  eyebrow,
  title,
  description,
  children,
}: {
  crumbs: { name: string; path: string }[]
  icon?: BrandIconName
  agent?: AgentName
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-stripe-border pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(45%_60%_at_20%_0%,rgba(37,99,235,0.10),transparent),radial-gradient(40%_60%_at_80%_0%,rgba(147,51,234,0.10),transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted">
          {crumbs.map((c, i) => (
            <span key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3" />}
              {i < crumbs.length - 1 ? (
                <Link href={c.path || '/'} className="hover:text-ink">
                  {c.name}
                </Link>
              ) : (
                <span className="text-ink" aria-current="page">
                  {c.name}
                </span>
              )}
            </span>
          ))}
        </nav>
        <div className="mt-8 flex items-center gap-3">
          {agent ? (
            <span className="grid size-14 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-stripe-border">
              <AgentBot agent={agent} className="size-12" />
            </span>
          ) : icon && (
            <BrandIcon name={icon} size={32} />
          )}
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">{eyebrow}</span>
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-ink md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/demo" className="px-5 py-3">
            Book a demo
          </LinkButton>
          <LinkButton href="/pricing" variant="outline" className="px-5 py-3">
            See plans & pricing
          </LinkButton>
        </div>
        {children}
      </div>
    </section>
  )
}

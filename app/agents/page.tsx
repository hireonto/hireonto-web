import type { Metadata } from 'next'
import { ArrowRight, UserRound } from 'lucide-react'
import Link from 'next/link'
import { AgentBot } from '@/components/agents/agent-bot'
import { AgentPhotoCard } from '@/components/agents/agent-photo-card'
import { FaqList } from '@/components/faq-list'
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/json-ld'
import { Mock } from '@/components/mocks/mocks'
import { FadeIn } from '@/components/motion'
import { LinkButton } from '@/components/ui'
import { agentFaqs, agentHandoff, agents } from '@/lib/agents'
import { products } from '@/lib/products'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Meet Onric & Tovia — AI hiring agents',
  description:
    'Onric screens resumes, shortlists and schedules. Tovia runs live AI voice interviews and writes explainable evaluations. Meet the two HireOnto agents that automate hiring while your team decides.',
  path: '/agents',
  keywords: ['AI hiring agent', 'AI recruiter', 'AI interviewer', 'recruiting automation agent', 'Onric', 'Tovia'],
})

export default function AgentsPage() {
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'AI agents', path: '/agents' },
  ]
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={agentFaqs} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stripe-border pt-16 pb-10 md:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_25%_70%,rgba(37,99,235,0.14),transparent),radial-gradient(40%_50%_at_75%_70%,rgba(147,51,234,0.14),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">HireOnto AI agents</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-ink sm:text-6xl md:text-7xl">
            Meet <span className="text-[#2563eb]">Onric</span> &amp; <span className="text-[#9333ea]">Tovia</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            Two AI agents that run the busy half of hiring — screening, interviewing, scheduling and follow-ups — and hand your team the evidence to decide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/demo" className="px-6 py-3 text-[15px]">
              Put them to work
            </LinkButton>
            <LinkButton href="#together" variant="outline" className="px-6 py-3 text-[15px]">
              How they work together
            </LinkButton>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:gap-8">
            {agents.map((a, i) => (
              <a key={a.id} href={`#${a.id}`} className={`group block transition duration-300 hover:-translate-y-1 ${i === 1 ? 'sm:mt-12' : ''}`}>
                <AgentPhotoCard agent={a.id} priority />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Each agent */}
      {agents.map((a, i) => {
        const flip = i % 2 === 1
        const isT = a.id === 'tovia'
        const related = products.filter((p) => a.productSlugs.includes(p.slug))
        return (
          <section key={a.id} id={a.id} className={`scroll-mt-20 py-20 md:py-28 ${isT ? 'bg-[#07070d] text-white' : ''}`}>
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
              <FadeIn className={flip ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4">
                  <AgentBot agent={a.id} className="h-20 w-20" />
                  <div>
                    <h2 className={`text-3xl font-semibold tracking-[-0.03em] md:text-4xl ${isT ? 'text-white' : 'text-ink'}`}>{a.name}</h2>
                    <p className={`font-mono text-xs tracking-[0.14em] uppercase ${isT ? 'text-[#c084fc]' : 'text-[#2563eb]'}`}>{a.role}</p>
                  </div>
                </div>
                <p className={`mt-6 text-lg leading-relaxed ${isT ? 'text-white/70' : 'text-muted'}`}>{a.intro}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {a.skills.map((s) => (
                    <div key={s.title} className={`rounded-2xl border p-5 ${isT ? 'border-white/10 bg-white/[0.03]' : 'border-stripe-border bg-white'}`}>
                      <h3 className={`font-semibold ${isT ? 'text-white' : 'text-ink'}`}>{s.title}</h3>
                      <p className={`mt-1.5 text-sm leading-relaxed ${isT ? 'text-white/55' : 'text-muted'}`}>{s.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/product/${p.slug}`} className={`inline-flex items-center gap-1 ${isT ? 'text-white/85 hover:text-white' : 'text-ink hover:text-[#2563eb]'}`}>
                      {p.name} <ArrowRight className="size-3.5" />
                    </Link>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.08} className={flip ? 'lg:order-1' : ''}>
                <Mock id={a.mock} />
              </FadeIn>
            </div>
          </section>
        )
      })}

      {/* Together */}
      <section id="together" className="scroll-mt-20 border-t border-stripe-border bg-stripe-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">Working together</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">One hand-off, from resume to next round</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">Onric and Tovia pass every candidate between them — and always stop at your team for the decision.</p>
          </FadeIn>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agentHandoff.map((h, i) => (
              <FadeIn key={h.title} delay={i * 0.05}>
                <li
                  className={`flex h-full list-none gap-4 rounded-2xl border bg-white p-5 ${
                    h.who === 'you' ? 'border-ink/80 shadow-[0_20px_40px_-24px_rgba(11,16,32,0.5)]' : 'border-stripe-border'
                  }`}
                >
                  {h.who === 'you' ? (
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-white">
                      <UserRound className="size-6" />
                    </span>
                  ) : (
                    <AgentBot agent={h.who} className="size-14 shrink-0" animate={false} />
                  )}
                  <div>
                    <span className="font-mono text-[11px] text-muted">STEP {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-1 font-semibold text-ink">{h.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{h.body}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Questions about the agents</h2>
            <p className="mt-3 text-muted">AI does the legwork. People make the call.</p>
          </div>
          <FaqList items={agentFaqs} />
        </div>
        <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-3xl bg-[#07070d] p-8 md:p-10">
            <div className="flex items-center gap-2">
              <AgentBot agent="onric" className="size-20" />
              <AgentBot agent="tovia" className="size-20" />
              <p className="ml-3 max-w-md text-xl font-semibold text-white">Let Onric and Tovia take your next open role.</p>
            </div>
            <LinkButton href="/demo" variant="outline">
              Book a demo
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}

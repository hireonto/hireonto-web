import type { Metadata } from 'next'
import { ArrowUpRight, Laptop, ShieldCheck, Tag, UserCheck, Users } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { AgentBot } from '@/components/agents/agent-bot'
import { AgentPhotoCard } from '@/components/agents/agent-photo-card'
import { HeroVideo } from '@/components/home/hero-video'
import { TourVideoButton } from '@/components/product-tour'
import { HeroGradient } from '@/components/stripe/hero-gradient'
import { FlowDiagram } from '@/components/stripe/integrations'
import { CandidateJourney } from '@/components/stripe/journey'
import { CountUp, Reveal } from '@/components/stripe/reveal'
import { SolutionsTabs } from '@/components/stripe/solutions-tabs'
import { AnalyticsWidget, CalendarWidget, EvalWidget, ProctorWidget, ScreeningWidget, ToviaCallWidget } from '@/components/stripe/widgets'
import { LinkButton } from '@/components/ui'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  ...pageMeta({
    title: 'AI hiring platform — screening, AI interviews & evaluation',
    description: site.description,
    path: '',
    keywords: ['AI hiring platform', 'AI interview software', 'AI resume screening', 'recruitment automation', 'AI recruiter agent'],
  }),
  title: { absolute: `${site.name} — Hiring infrastructure with AI agents for screening, interviews and evaluation` },
}

const integrations = ['Google Calendar', 'Google Meet', 'Microsoft Teams', 'Email invites', 'Phone calls', 'Voice & video', 'Any web browser']

function SectionTitle({ strong, rest, light, className }: { strong: string; rest: string; light?: boolean; className?: string }) {
  return (
    <h2 className={`max-w-3xl text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.02em] md:text-[2.4rem] ${className ?? ''}`}>
      <span className={light ? 'text-white' : 'text-ink'}>{strong}</span> <span className={light ? 'text-white/55' : 'text-muted/80'}>{rest}</span>
    </h2>
  )
}

function BentoCard({ title, href, children, className, tone = 'gray' }: { title: string; href: string; children: ReactNode; className?: string; tone?: 'gray' | 'violet' }) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(50,50,93,0.35)] ${
        tone === 'violet' ? 'bg-[linear-gradient(160deg,#f5f3ff,#fae8ff)]' : 'bg-stripe-surface'
      } ${className ?? ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="max-w-[17rem] text-[17px] leading-snug font-semibold text-ink">{title}</h3>
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-ink shadow-sm transition group-hover:bg-[#635bff] group-hover:text-white">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
      <div className="mt-6 flex flex-1 items-center justify-center">{children}</div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[640px] origin-top-left -skew-y-[8deg] overflow-hidden md:h-[720px]" aria-hidden>
          <HeroGradient className="absolute inset-0 h-full w-full opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.55)_42%,rgba(255,255,255,0)_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
          <Reveal>
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 rounded-full bg-white/70 py-1 pr-3 pl-1 text-xs font-semibold text-ink shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
            >
              <span className="rounded-full bg-[#0a2540] px-2 py-0.5 text-[11px] text-white">New</span>
              Meet Onric &amp; Tovia, your AI hiring agents
              <ArrowUpRight className="size-3.5" />
            </Link>
            <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-bold tracking-[-0.04em] text-ink sm:text-[3.4rem] lg:text-[4rem]">
              AI hiring agents that screen, interview and shortlist for you.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl">
              Onric reads every resume and shortlists the best fits. Tovia interviews them by voice, 24/7. You get a ranked shortlist with explainable reports — and make the final call.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href="/demo" arrow className="px-5 py-2.5 text-[15px]">
                Book a demo
              </LinkButton>
              <LinkButton href="/how-it-works" variant="ghost" arrow className="px-4 py-2.5 text-[15px]">
                See how it works
              </LinkButton>
            </div>
          </Reveal>
          <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[480px]">
            <Reveal from="right" className="absolute top-0 right-0 w-[78%]">
              <ToviaCallWidget />
            </Reveal>
            <Reveal from="left" delay={0.15} className="absolute bottom-0 left-0 w-[70%]">
              <EvalWidget />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Works with ───────── */}
      <section aria-label="Integrations" className="border-y border-stripe-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-7 sm:px-6 lg:justify-between">
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Works with</span>
          {integrations.map((n) => (
            <span key={n} className="text-[15px] font-semibold tracking-tight text-ink/45">
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* ───────── Bento ───────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle
              strong="Flexible tools for every hiring model."
              rest="Screen, interview, evaluate and schedule with modular agents and workflows — use them on their own or together."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <BentoCard title="Screen and shortlist thousands of resumes" href="/product/resume-screening" className="h-full min-h-[400px]">
                <ScreeningWidget />
              </BentoCard>
            </Reveal>
            <Reveal delay={0.08}>
              <BentoCard title="Interview every candidate 24/7 with Tovia" href="/product/ai-interviews" tone="violet" className="h-full min-h-[400px]">
                <ToviaCallWidget />
              </BentoCard>
            </Reveal>
            <Reveal>
              <BentoCard title="Get an explainable report for every interview" href="/product/evaluation" className="h-full min-h-[380px]">
                <EvalWidget />
              </BentoCard>
            </Reveal>
            <Reveal delay={0.08}>
              <BentoCard title="Keep every result trustworthy with proctoring" href="/product/proctoring" className="h-full min-h-[380px]">
                <ProctorWidget />
              </BentoCard>
            </Reveal>
            <Reveal delay={0.16}>
              <BentoCard title="Book human rounds without email ping-pong" href="/product/scheduling" className="h-full min-h-[380px]">
                <CalendarWidget />
              </BentoCard>
            </Reveal>
            <Reveal className="lg:col-span-2">
              <BentoCard title="See what is working across every role" href="/product/analytics" className="h-full min-h-[340px]">
                <AnalyticsWidget />
              </BentoCard>
            </Reveal>
            <Reveal delay={0.08}>
              <Link
                href="/agents"
                className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#2563eb,#6d28d9_55%,#c026d3)] p-6 text-white transition hover:-translate-y-1"
              >
                <h3 className="max-w-[15rem] text-[17px] leading-snug font-semibold">Put two AI agents on your hiring team</h3>
                <div className="flex items-end justify-center gap-2">
                  <AgentBot agent="onric" className="size-28" />
                  <AgentBot agent="tovia" className="size-28" />
                </div>
                <span className="text-sm font-semibold">Meet Onric &amp; Tovia →</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Agents band ───────── */}
      <section className="px-4 sm:px-6">
        <Reveal from="scale" className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#0a0b1e] px-6 py-14 md:px-14 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_85%_50%,rgba(147,51,234,0.55),transparent),radial-gradient(40%_70%_at_60%_100%,rgba(37,99,235,0.45),transparent)]" />
            <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="font-mono text-xs tracking-[0.16em] text-[#c4b5fd] uppercase">HireOnto agents</p>
                <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.02em] text-white md:text-5xl">Building the hiring team of the future</h2>
                <p className="mt-4 max-w-lg text-white/65">
                  Onric screens, shortlists and schedules. Tovia interviews and evaluates. Watch them take one role from resume to decision.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <TourVideoButton />
                  <LinkButton href="/agents" variant="outline" arrow className="border-white/20 bg-white/5 py-2.5 text-white hover:bg-white/10">
                    Meet the agents
                  </LinkButton>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {(['onric', 'tovia'] as const).map((id, i) => (
                  <Link key={id} href={`/agents#${id}`} className={`group block transition duration-300 hover:-translate-y-1 ${i === 1 ? 'md:mt-10' : ''}`}>
                    <div className={i === 0 ? 'bot-roam-a' : 'bot-roam-b'}>
                      <AgentPhotoCard agent={id} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────── Stats ───────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
              The backbone of
              <br />
              modern hiring
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {[
              { to: 100, suffix: '', label: 'point explainable fit score on every resume' },
              { to: 72, suffix: 'h', label: 'self-paced window for every AI interview' },
              { to: 5, suffix: '', label: 'rubric dimensions in every evaluation' },
              { to: 100, suffix: '%', label: 'of final decisions made by your team' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="border-l border-stripe-border pl-6">
                <CountUp to={s.to} suffix={s.suffix} className="block text-4xl font-semibold tracking-tight text-ink tabular-nums md:text-5xl" />
                <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Solutions tabs ───────── */}
      <section className="border-t border-stripe-border py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle strong="Powering hiring teams of all sizes." rest="Run tech, high-volume, campus and agency hiring on one platform that adapts to how you hire." />
          </Reveal>
          <Reveal className="mt-14">
            <SolutionsTabs />
          </Reveal>
        </div>
      </section>

      {/* ───────── Video ───────── */}
      <section className="bg-stripe-surface py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionTitle strong="See the whole flow in 50 seconds." rest="Dashboard, shortlist, invite, AI interview, evaluation and analytics." className="mx-auto text-center" />
          </Reveal>
          <Reveal from="scale" className="mt-12">
            <HeroVideo />
          </Reveal>
        </div>
      </section>

      {/* ───────── Candidate journey (navy) ───────── */}
      <section className="relative overflow-hidden bg-[#0a2540] py-24 text-white md:py-32">
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[700px] bg-[radial-gradient(closest-side,rgba(99,91,255,0.35),transparent)]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[600px] bg-[radial-gradient(closest-side,rgba(192,38,211,0.22),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle light strong="One candidate journey, fully automated." rest="Watch Onric and Tovia move a candidate from resume to decision — then hand the final call to your team." />
          </Reveal>
          <Reveal className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-10">
            <CandidateJourney />
          </Reveal>
          <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <Reveal from="left">
              <p className="font-mono text-xs tracking-[0.16em] text-[#a5b4fc] uppercase">Connected</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">Plugs into the calendar, inbox and phone your team already uses.</h3>
              <p className="mt-4 max-w-md text-white/60">
                Interview links land in Google Meet or Teams, invites go out by email, Onric calls candidates to book slots, and every file is stored securely — no new tools for anyone.
              </p>
            </Reveal>
            <Reveal from="right">
              <FlowDiagram />
            </Reveal>
          </div>
          <div className="mt-16 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-3">
            {[
              { icon: UserCheck, t: 'Humans make the call', d: 'Agents recommend; your team selects, holds or rejects — and every override is logged.' },
              { icon: Laptop, t: 'Easy for candidates', d: 'Self-paced interviews in the browser. No app to install, no scheduling back-and-forth.' },
              { icon: ShieldCheck, t: 'Private by design', d: 'Each company’s workspace is isolated, with an audit trail of every decision.' },
            ].map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Icon className="size-5 text-[#a5b4fc]" />
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr]">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">Ready to get started?</h2>
            <p className="mt-4 max-w-md text-muted">Book a demo and see Onric and Tovia working on one of your own open roles. Or explore the platform at your own pace.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/demo" arrow className="py-2.5">
                Book a demo
              </LinkButton>
              <LinkButton href="/features" variant="ghost" arrow className="py-2.5">
                Explore the platform
              </LinkButton>
            </div>
          </Reveal>
          {[
            { icon: Tag, t: 'Plans that grow with you', d: 'Start with one role and scale to every team. See what each plan includes.', href: '/pricing', cta: 'Pricing details' },
            { icon: Users, t: 'Meet your AI hiring team', d: 'See exactly what Onric and Tovia do — and where your team stays in control.', href: '/agents', cta: 'Meet the agents' },
          ].map(({ icon: Icon, t, d, href, cta }, i) => (
            <Reveal key={t} delay={0.08 * (i + 1)}>
              <span className="grid size-10 place-items-center rounded-xl bg-stripe-surface">
                <Icon className="size-5 text-[#635bff]" />
              </span>
              <h3 className="mt-5 font-semibold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              <LinkButton href={href} variant="ghost" arrow className="mt-3 -ml-4 text-[#635bff]">
                {cta}
              </LinkButton>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

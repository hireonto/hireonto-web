import type { Metadata } from 'next'
import { BreadcrumbJsonLd, HowToJsonLd } from '@/components/json-ld'
import { FadeIn } from '@/components/motion'
import { PageHero } from '@/components/page-hero'
import { ShotStack, TourVideoButton } from '@/components/product-tour'
import { BrandIcon, LinkButton } from '@/components/ui'
import { productStories } from '@/lib/product-tour'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'How HireOnto works — AI hiring in 6 steps',
  description:
    'Create a job, upload resumes, let AI shortlist, send one-click AI interviews, review explainable evaluations and decide. See the full HireOnto hiring flow step by step.',
  path: '/how-it-works',
  keywords: ['how AI hiring works', 'AI interview process', 'automated hiring workflow', 'recruitment process automation'],
})

const steps = [
  { story: 'jobs', name: 'Create a job', text: 'Add the role and job description, set the auto-shortlist threshold and configure the AI interview: length, number of questions, coding round and proctoring.' },
  { story: 'pipeline', name: 'Upload resumes — AI shortlists', text: 'Drop in resumes in bulk. HireOnto parses each one, scores it 0–100 against the job description and shortlists everyone above your threshold.' },
  { story: 'invite', name: 'Invite in one click', text: 'Select shortlisted candidates and send AI interview invites. Each person gets a private link, a temporary password and a self-paced window.' },
  { story: 'live', name: 'Candidates interview with Tovia', text: 'After a camera and mic check, Tovia runs a live voice interview with adaptive follow-ups while the integrity monitor records any signals.' },
  { story: 'evaluation', name: 'Review the evaluation', text: 'Read the scored rubric, written reasoning, strengths, concerns and integrity timeline. Invite guest reviewers if you want a second opinion.' },
  { story: 'analytics', name: 'Decide and improve', text: 'Select, hold or reject with automatic emails, advance candidates to human rounds, and track funnel health across every role.' },
]

export default function HowItWorksPage() {
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'How it works', path: '/how-it-works' },
  ]
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <HowToJsonLd name="How to hire with HireOnto" steps={steps.map(({ name, text }) => ({ name, text }))} />
      <PageHero
        crumbs={crumbs}
        icon="ai-hiring-agent"
        eyebrow="How it works"
        title="From job post to decision in six steps"
        description="HireOnto automates the slow first half of hiring — screening and first-round interviews — and gives your team the evidence to decide."
      >
        <div className="mt-8">
          <TourVideoButton className="ring-1 ring-stripe-border" />
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <ol className="mx-auto max-w-6xl space-y-24 px-4 sm:px-6 md:space-y-32">
          {steps.map((step, i) => {
            const story = productStories.find((s) => s.id === step.story)!
            const flip = i % 2 === 1
            return (
              <li key={step.name} className="list-none">
                <FadeIn>
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className={`lg:col-span-4 ${flip ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#9333ea] font-mono text-sm font-semibold text-white">{i + 1}</span>
                        <BrandIcon name={story.icon} size={22} />
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-ink md:text-3xl">{step.name}</h2>
                      <p className="mt-4 text-[15px] leading-relaxed text-muted">{step.text}</p>
                      <ul className="mt-5 space-y-2">
                        {story.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-sm text-ink/75">
                            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#6d28d9]" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`lg:col-span-8 ${flip ? 'lg:order-1' : ''}`}>
                      <ShotStack story={story} />
                    </div>
                  </div>
                </FadeIn>
              </li>
            )
          })}
        </ol>
        <div className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#07070d] p-8 md:p-10">
            <p className="max-w-xl text-xl font-semibold text-white">Ready to see these six steps on your own roles?</p>
            <LinkButton href="/demo">Book a demo</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}

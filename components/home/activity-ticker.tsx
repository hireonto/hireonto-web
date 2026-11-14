import { BrandIcon, type BrandIconName } from '../ui'

const events: { icon: BrandIconName; who: string; what: string; where: string }[] = [
  { icon: 'resume-parsing', who: 'Onric', what: 'parsed and scored 42 resumes', where: 'Backend Engineer' },
  { icon: 'ai-screening', who: 'Onric', what: 'auto-shortlisted 9 candidates at ≥ 70% fit', where: 'Backend Engineer' },
  { icon: 'automated-followups', who: 'Onric', what: 'sent AI interview invites to the shortlist', where: 'Product Designer' },
  { icon: 'ai-voice-interview', who: 'Chloe S.', what: 'finished a voice interview with Tovia', where: 'SEO Analyst' },
  { icon: 'ai-evaluation-scoring', who: 'Tovia', what: 'filed an evaluation · score 72 · hold', where: 'Backend Engineer' },
  { icon: 'candidate-selection', who: 'Daniel M.', what: 'moved to director round', where: 'Data Engineer' },
  { icon: 'interview-scheduling', who: 'Onric', what: 'booked a panel interview on Google Meet', where: 'Frontend Engineer' },
]

/** Scrolling strip of example workspace activity. */
export function ActivityTicker() {
  const row = [...events, ...events]
  return (
    <section aria-label="Example activity in a HireOnto workspace" className="border-y border-stripe-border bg-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="hidden shrink-0 flex-col justify-center border-r border-stripe-border px-6 py-5 sm:flex">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Example workspace</span>
          <span className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Hiring in motion
          </span>
        </div>
        <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
          <div className="animate-marquee flex w-max">
            {row.map((e, i) => (
              <div key={i} className="flex items-center gap-3 border-r border-stripe-border px-6 py-5">
                <BrandIcon name={e.icon} size={18} />
                <span className="text-sm whitespace-nowrap">
                  <span className="font-semibold text-ink">{e.who}</span> <span className="text-muted">{e.what}</span>
                  <span className="ml-2 font-mono text-xs text-muted/70">{e.where}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

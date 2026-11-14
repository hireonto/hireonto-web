import { productStories } from '@/lib/product-tour'
import { FadeIn } from './motion'
import { ShotStack } from './product-tour'
import { BrandIcon } from './ui'

/** GitHub-style alternating feature walkthrough with real product screens. */
export function FeatureStories({ ids, numbered = true }: { ids?: string[]; numbered?: boolean }) {
  const list = ids ? productStories.filter((s) => ids.includes(s.id)) : productStories
  return (
    <div className="space-y-24 md:space-y-32">
      {list.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <FadeIn key={s.id}>
            <article id={s.id} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={`lg:col-span-4 ${flip ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                    <BrandIcon name={s.icon} size={20} />
                  </span>
                  {numbered && <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, '0')}</span>}
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a78bfa]">{s.eyebrow}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl md:leading-tight">{s.title}</h3>
                <p className="mt-4 leading-relaxed text-white/60">{s.body}</p>
                <ul className="mt-6 space-y-3 border-l border-white/10 pl-5">
                  {s.points.map((p) => (
                    <li key={p} className="relative text-sm text-white/75">
                      <span className="absolute top-[7px] -left-[23px] size-[5px] rounded-full bg-gradient-to-br from-[#2563eb] to-[#9333ea]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`lg:col-span-8 ${flip ? 'lg:order-1' : ''}`}>
                <ShotStack story={s} />
              </div>
            </article>
          </FadeIn>
        )
      })}
    </div>
  )
}

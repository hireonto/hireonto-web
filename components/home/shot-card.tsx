import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Mock } from '../mocks/mocks'
import { BrandIcon, type BrandIconName } from '../ui'

/** Feature card: HTML product mockup on a soft gradient stage, title and link. */
export function ShotCard({
  mock,
  icon,
  title,
  body,
  href,
  cta,
  size = 'md',
}: {
  mock: string
  icon: BrandIconName
  title: string
  body: string
  href: string
  cta: string
  size?: 'md' | 'lg'
}) {
  return (
    <Link href={href} className="group flex flex-col">
      <div
        className={`relative overflow-hidden rounded-2xl border border-stripe-border bg-[radial-gradient(80%_70%_at_20%_0%,#e0e7ff,transparent),radial-gradient(70%_70%_at_100%_100%,#f3e8ff,transparent)] bg-[#fafaff] ${size === 'lg' ? 'aspect-[16/11]' : 'aspect-[16/11]'}`}
      >
        <div className="absolute inset-x-[6%] top-[8%] transition duration-500 ease-out group-hover:-translate-y-1.5">
          <Mock id={mock} />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2.5">
        <BrandIcon name={icon} size={20} />
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">
        {cta} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

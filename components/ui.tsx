import Image from 'next/image'
import { Sticker, type StickerName } from './stickers'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2 ${className ?? ''}`} aria-label="HireOnto home">
      <Image
        src="/brand/symbol.svg"
        alt=""
        width={34}
        height={34}
        className="size-[34px] transition group-hover:scale-[1.04]"
        priority
      />
      <span className="text-[1.2rem] font-bold tracking-[-0.03em] text-[#101936]">
        Hire<span className="brand-text-gradient">Onto</span>
      </span>
    </Link>
  )
}

const STICKER_FOR: Record<BrandIconName, StickerName> = {
  'ai-job-description': 'screening',
  'candidate-sourcing': 'team',
  'resume-parsing': 'screening',
  'resume-matching': 'shortlist',
  'ai-screening': 'shortlist',
  'ai-voice-interview': 'interview',
  'ai-video-interview': 'proctoring',
  'ai-evaluation-scoring': 'evaluation',
  'ats-pipeline': 'pipeline',
  'interview-scheduling': 'schedule',
  'candidate-selection': 'team',
  'offer-management': 'invite',
  onboarding: 'team',
  'recruitment-analytics': 'analytics',
  'ai-hiring-agent': 'onric',
  'automated-followups': 'chat',
}

/** Feature icon, rendered as a HireOnto sticker (white die-cut outline, bright flat colours). */
export function BrandIcon({ name, size = 20, className }: { name: BrandIconName; size?: number; className?: string }) {
  return <Sticker name={STICKER_FOR[name]} size={Math.round(size * 2)} className={className} />
}

export type BrandIconName =
  | 'ai-job-description'
  | 'candidate-sourcing'
  | 'resume-parsing'
  | 'resume-matching'
  | 'ai-screening'
  | 'ai-voice-interview'
  | 'ai-video-interview'
  | 'ai-evaluation-scoring'
  | 'ats-pipeline'
  | 'interview-scheduling'
  | 'candidate-selection'
  | 'offer-management'
  | 'onboarding'
  | 'recruitment-analytics'
  | 'ai-hiring-agent'
  | 'automated-followups'

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'outline' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d28d9] disabled:opacity-50'
  const styles = {
    primary:
      'rounded-full bg-[#635bff] text-white hover:bg-[#0a2540]',
    ghost: 'text-muted hover:bg-stripe-surface hover:text-ink',
    outline: 'border border-stripe-border bg-white text-ink hover:border-ink/25 hover:shadow-sm',
  }
  return (
    <button type="button" className={`${base} ${styles[variant]} ${className ?? ''}`} {...props}>
      {children}
    </button>
  )
}

export function LinkButton({
  href,
  children,
  variant = 'primary',
  className,
  arrow = false,
  newTab = false,
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline' | 'dark'
  className?: string
  arrow?: boolean
  /** Open the link in a new browser tab. */
  newTab?: boolean
}) {
  const base =
    'btn-arrow inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d28d9]'
  const styles = {
    primary: 'bg-[#635bff] text-white shadow-[0_6px_16px_-6px_rgba(99,91,255,0.7)] hover:bg-[#0a2540]',
    dark: 'bg-[#0a2540] text-white hover:bg-[#1a3a5c]',
    ghost: 'text-ink hover:bg-stripe-surface',
    outline: 'border border-stripe-border bg-white text-ink hover:border-ink/30',
  }
  return (
    <Link
      href={href}
      className={`${base} ${styles[variant]} ${className ?? ''}`}
      {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}

/** Stripe-style hover arrow: the shaft appears and the head nudges right. */
export function Arrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="ml-0.5">
      <path className="arrow-line" d="M0 5h7" stroke="currentColor" strokeWidth="1.5" />
      <path className="arrow-head" d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className ?? ''}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">{eyebrow}</p>
        )}
        <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.5rem] md:leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

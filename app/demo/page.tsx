import type { Metadata } from 'next'
import { DemoForm } from '@/components/demo-form'
import { FadeIn } from '@/components/motion'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Book a demo',
  description:
    'Request a HireOnto demo with verified work email only. OTP verification stops spam and form abuse.',
  path: '/demo',
})

export default function DemoPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <h1 className="text-4xl font-semibold tracking-tight text-ink">Book a live demo</h1>
          <p className="mt-4 text-lg text-muted">
            Tell us about your hiring stack. We only accept <strong className="text-ink">business email</strong>{' '}
            addresses (e.g. <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">you@yourcompany.com</code> or{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">name@google.com</code>). Personal inboxes like
            Gmail or Outlook are blocked.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li>• 6-digit email verification before submit</li>
            <li>• Rate limits and honeypot fields anti-automation</li>
            <li>• We reply only to your verified work address</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="stripe-panel rounded-2xl">
            <DemoForm />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

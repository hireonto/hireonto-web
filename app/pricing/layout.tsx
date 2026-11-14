import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Pricing',
  description: 'HireOnto pricing for AI hiring: shortlist, interviews, coding assessments, and enterprise guardrails.',
  path: '/pricing',
  keywords: ['AI hiring pricing', 'interview software cost', 'recruiting automation'],
})

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children
}

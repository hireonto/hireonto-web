import type { BrandIconName } from '@/components/ui'

export const pipelineSteps: { brand: BrandIconName; title: string; desc: string }[] = [
  { brand: 'resume-parsing', title: 'Ingest & parse', desc: 'Resumes from upload or sourcing — structured profiles with fit scores.' },
  { brand: 'ai-screening', title: 'AI shortlist', desc: 'Threshold-based auto-shortlist with explanations recruiters can override.' },
  { brand: 'ats-pipeline', title: 'Multi-round pipeline', desc: 'Voice, video, AI coding, and human-led rounds in one workflow.' },
  { brand: 'interview-scheduling', title: 'Schedule & call', desc: 'Calendar sync and outbound call campaigns for hard-to-reach candidates.' },
  { brand: 'candidate-selection', title: 'Evaluate & decide', desc: 'Rubrics, integrity timeline, guest reviews, and audit-ready decisions.' },
]

export const features: { brand: BrandIconName; title: string; body: string }[] = [
  {
    brand: 'ai-video-interview',
    title: 'AI interviews that stay on-rails',
    body: 'Voice and video sessions with proctoring signals, structured plans, and transcripts your team can trust.',
  },
  {
    brand: 'ai-evaluation-scoring',
    title: 'Live AI coding assessments',
    body: 'Sandboxed runs via Judge0, submission history, and human review when you need a second opinion.',
  },
  {
    brand: 'resume-matching',
    title: 'Shortlist with guardrails',
    body: 'Fit scoring plus recruiter overrides — never a black-box hire. Manual steps plug into the same pipeline.',
  },
  {
    brand: 'interview-scheduling',
    title: 'Call scheduling & outreach',
    body: 'PSTN campaigns and calendar integrations so candidates move forward without inbox ping-pong.',
  },
  {
    brand: 'candidate-selection',
    title: 'Security & compliance posture',
    body: 'Tenant isolation, JWT-scoped APIs, retention controls, and audit logs for enterprise buyers.',
  },
  {
    brand: 'ats-pipeline',
    title: 'Manual process, same pipeline',
    body: 'Run hybrid workflows: AI for scale, humans for final calls — one funnel, one source of truth.',
  },
]

export const pricingPlans = [
  {
    name: 'Growth',
    price: '$499',
    period: '/mo',
    blurb: 'For teams hiring their first AI-assisted roles.',
    features: [
      '2 active jobs',
      '500 AI interview minutes',
      'Resume parse + shortlist',
      'Standard proctoring',
      'Email support',
    ],
    cta: 'Book demo',
    highlighted: false,
  },
  {
    name: 'Scale',
    price: '$1,499',
    period: '/mo',
    blurb: 'Multi-recruiter hiring with voice, coding, and scheduling.',
    features: [
      'Unlimited jobs',
      '3,000 AI interview minutes',
      'Multi-round pipelines',
      'AI coding + integrity timeline',
      'Calendar & call campaigns',
      'Priority support',
    ],
    cta: 'Book demo',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    blurb: 'SSO, custom retention, dedicated guardrails, and manual pipeline design.',
    features: [
      'Volume pricing',
      'Custom AI policies & rubrics',
      'VPC / data residency options',
      'SLA & security review',
      'Solutions engineering for manual workflows',
    ],
    cta: 'Talk to sales',
    highlighted: false,
  },
]

export const faqItems = [
  {
    q: 'Do you replace recruiters?',
    a: 'No. HireOnto automates repetitive screening and interview logistics. Recruiters stay in control with overrides, manual rounds, and final decisions.',
  },
  {
    q: 'Which emails can request a demo?',
    a: 'Only verified work emails on a company domain. Personal providers (Gmail, Outlook, Yahoo, etc.) are blocked to reduce spam and form abuse.',
  },
  {
    q: 'How does interview proctoring work?',
    a: 'We capture integrity signals during sessions (focus changes, timeline events) alongside recordings where enabled — surfaced in recruiter review.',
  },
  {
    q: 'Can we run fully manual hiring?',
    a: 'Yes. You can configure pipelines with human-only rounds while still using the same job, candidate, and audit model.',
  },
  {
    q: 'Is AI coding secure?',
    a: 'Code runs in isolated sandboxes. Submissions are tied to interview sessions with access controlled by short-lived tokens.',
  },
]

import type { BrandIconName } from '@/components/ui'
import type { Faq, Highlight } from './products'

export type SolutionPage = {
  slug: string
  name: string
  icon: BrandIconName
  title: string
  description: string
  metaTitle: string
  keywords: string[]
  challenges: string[]
  how: Highlight[]
  productSlugs: string[]
  storyId: string
  faqs: Faq[]
}

export const solutions: SolutionPage[] = [
  {
    slug: 'tech-hiring',
    name: 'Tech hiring',
    icon: 'ai-job-description',
    title: 'Hire engineers on evidence, not resumes alone',
    description:
      'Screen developer resumes against the stack you need, run AI voice and live coding rounds, and give your engineering panel an explainable report before they spend an hour on a call.',
    metaTitle: 'AI technical interviews for engineering hiring',
    keywords: ['technical interview platform', 'AI coding interview', 'developer hiring', 'engineering recruitment software'],
    challenges: [
      'Engineers lose hours to first-round interviews that end in a no.',
      'Resumes list technologies, but not depth or problem-solving.',
      'Take-home tests are slow and easy to outsource.',
    ],
    how: [
      { title: 'Stack-aware screening', body: 'Fit scores weigh the exact skills in your job description, so a Python resume does not outrank a Node.js role by accident.' },
      { title: 'AI voice + coding round', body: 'Tovia probes past projects and trade-offs, then a sandboxed coding round checks hands-on ability.' },
      { title: 'Technical depth scoring', body: 'Reports break out technical depth, ownership and problem solving with written reasoning.' },
      { title: 'Panel-ready handoff', body: 'Send a guest review link to the engineering manager so they only meet candidates who passed.' },
    ],
    productSlugs: ['ai-interviews', 'resume-screening', 'evaluation'],
    storyId: 'evaluation',
    faqs: [{ q: 'Does HireOnto support live coding?', a: 'Yes. Jobs can include a coding round with sandboxed execution and full submission history.' }],
  },
  {
    slug: 'high-volume-hiring',
    name: 'High-volume hiring',
    icon: 'ats-pipeline',
    title: 'Screen thousands without adding recruiters',
    description:
      'Bulk-upload resumes, auto-shortlist by fit, and let every qualified candidate take a self-paced AI interview the same day — your team only reviews the best.',
    metaTitle: 'High-volume hiring automation',
    keywords: ['high volume hiring', 'bulk hiring software', 'mass recruitment', 'automated candidate screening'],
    challenges: [
      'Hundreds of applicants per role and too few recruiters to call them.',
      'Good candidates drop out while waiting for a phone screen.',
      'Every recruiter screens a little differently.',
    ],
    how: [
      { title: 'Bulk resume intake', body: 'Upload large batches; parsing and scoring run in the background.' },
      { title: 'Threshold auto-shortlist', body: 'Everyone above your fit threshold is shortlisted automatically.' },
      { title: 'Same-day AI interviews', body: 'Invite the whole shortlist at once; candidates finish on their own schedule.' },
      { title: 'Consistent rubric', body: 'Every candidate is evaluated against the same rubric, so comparisons are fair.' },
    ],
    productSlugs: ['resume-screening', 'scheduling', 'analytics'],
    storyId: 'pipeline',
    faqs: [{ q: 'Can I invite many candidates at once?', a: 'Yes. Select candidates in the pipeline and send AI interview invites in bulk.' }],
  },
  {
    slug: 'campus-hiring',
    name: 'Campus hiring',
    icon: 'candidate-sourcing',
    title: 'Interview an entire graduating class — fairly',
    description:
      'Give every student the same structured AI interview, on their schedule, with proctoring that keeps results trustworthy — then shortlist for final rounds in hours, not weeks.',
    metaTitle: 'Campus recruitment with AI interviews',
    keywords: ['campus hiring software', 'campus recruitment', 'fresher hiring', 'graduate recruitment'],
    challenges: [
      'Campus drives compress hundreds of interviews into a few days.',
      'Freshers have thin resumes, so screening on paper is unreliable.',
      'Remote assessments raise integrity concerns.',
    ],
    how: [
      { title: 'Structured AI interviews', body: 'Every student answers questions built from the role, scored on the same rubric.' },
      { title: 'Self-paced window', body: 'Students take the interview between classes within the window you set.' },
      { title: 'Proctoring built in', body: 'Face presence, tab changes and mic events are captured on an integrity timeline.' },
      { title: 'Fast final-round shortlist', body: 'Sort by evaluation score and invite the top candidates to human rounds.' },
    ],
    productSlugs: ['ai-interviews', 'proctoring', 'evaluation'],
    storyId: 'live',
    faqs: [{ q: 'Do students need to install anything?', a: 'No. The interview runs in the browser after a quick camera, microphone and connection check.' }],
  },
  {
    slug: 'staffing-agencies',
    name: 'Staffing & agencies',
    icon: 'candidate-selection',
    title: 'Send clients pre-interviewed candidates',
    description:
      'Run branded AI interviews for every requisition, share evaluation reports with clients through secure guest links, and fill roles faster than the competition.',
    metaTitle: 'AI interviews for staffing agencies and recruiters',
    keywords: ['staffing agency software', 'recruitment agency AI', 'candidate submission', 'agency recruiting'],
    challenges: [
      'Clients want vetted candidates, not a stack of resumes.',
      'Recruiters spend most of the day on first-round calls.',
      'Sharing feedback with clients is slow and scattered across email.',
    ],
    how: [
      { title: 'Branded candidate experience', body: 'Candidates see your company name and branding on the interview page.' },
      { title: 'AI first round for every req', body: 'Each job gets its own AI interview built from the client’s job description.' },
      { title: 'Guest review links', body: 'Share evidence and evaluations with client hiring managers — no account needed.' },
      { title: 'Decision emails', body: 'Select, hold or reject and notify candidates and hiring managers automatically.' },
    ],
    productSlugs: ['ai-interviews', 'evaluation', 'scheduling'],
    storyId: 'candidate',
    faqs: [{ q: 'Can clients review candidates without logging in?', a: 'Yes. Guest review links let client hiring managers view the evaluation and submit their assessment securely.' }],
  },
]

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)

import type { BrandIconName } from '@/components/ui'

export type Highlight = { title: string; body: string }
export type Faq = { q: string; a: string }

export type ProductPage = {
  slug: string
  name: string
  icon: BrandIconName
  agent?: 'onric' | 'tovia'
  eyebrow: string
  title: string
  description: string
  metaTitle: string
  keywords: string[]
  highlights: Highlight[]
  storyIds: string[]
  faqs: Faq[]
}

export const products: ProductPage[] = [
  {
    slug: 'ai-interviews',
    name: 'AI interviews',
    icon: 'ai-voice-interview',
    agent: 'tovia',
    eyebrow: 'Tovia · AI interviewer',
    title: 'First-round interviews that run themselves',
    description:
      'Tovia, the HireOnto AI interviewer, runs live voice or chat interviews 24/7, adapts follow-up questions to each answer, and hands your team a full transcript and evaluation.',
    metaTitle: 'AI voice interviews with Tovia',
    keywords: ['AI interview', 'AI voice interview', 'automated first round interview', 'AI interviewer', 'async video interview'],
    highlights: [
      { title: 'Natural voice conversation', body: 'Candidates speak with Tovia over a low-latency WebRTC call. If voice is off, the same interview continues in chat.' },
      { title: 'Adaptive follow-ups', body: 'Tovia listens to each answer and asks the next question based on what the candidate actually said — not a fixed script.' },
      { title: 'Built from your job', body: 'Questions come from the job description and your knowledge base, with the duration and question count you set per role.' },
      { title: 'Coding rounds included', body: 'Add a live coding round with sandboxed execution and full submission history for technical roles.' },
      { title: 'Live transcript', body: 'Every question and answer is transcribed as it happens, so reviewers can read the interview in minutes.' },
      { title: 'Self-paced window', body: 'Candidates get a private link and temporary password and can take the interview any time within the window you set.' },
    ],
    storyIds: ['live', 'candidate'],
    faqs: [
      { q: 'Can candidates take the interview in chat instead of voice?', a: 'Yes. If the microphone is unavailable or turned off, the interview continues in chat with the same questions and evaluation.' },
      { q: 'How are interview questions decided?', a: 'Tovia builds the interview from the job description, the round settings (duration, number of questions, coding) and any knowledge-base content you add to the job.' },
      { q: 'Does the AI make the hiring decision?', a: 'No. Tovia interviews and produces an evaluation; your recruiters and hiring managers always make the final select, hold or reject decision.' },
    ],
  },
  {
    slug: 'resume-screening',
    name: 'Resume screening',
    icon: 'resume-matching',
    agent: 'onric',
    eyebrow: 'Onric · resume screening',
    title: 'From a pile of resumes to a ranked shortlist',
    description:
      'Upload resumes in bulk and HireOnto parses each one, scores it 0–100 against the job description, explains the score, and auto-shortlists everyone above your threshold.',
    metaTitle: 'AI resume screening and shortlisting',
    keywords: ['AI resume screening', 'resume parser', 'candidate shortlisting software', 'ATS score', 'resume ranking'],
    highlights: [
      { title: 'Bulk upload & async parsing', body: 'Drop in a batch of PDFs. Parsing runs in the background and each candidate becomes a structured profile.' },
      { title: 'Explainable fit score', body: 'Every candidate gets a 0–100 fit score against the job description with the reasoning behind it.' },
      { title: 'Auto-shortlist threshold', body: 'Set a threshold per job (for example 70%) and qualifying candidates are shortlisted automatically.' },
      { title: 'Recruiter override', body: 'Shortlist or remove anyone manually. The AI suggests; your team stays in control.' },
      { title: 'Duplicate detection', body: 'Repeat applicants are detected so the same person is not screened twice.' },
      { title: 'Sourcing agent', body: 'On supported plans, pull candidates from job boards straight into the pipeline with ATS-style filters.' },
    ],
    storyIds: ['pipeline', 'jobs'],
    faqs: [
      { q: 'Which resume formats are supported?', a: 'Upload resumes as PDF files, individually or in bulk. Parsing happens asynchronously so large batches do not block your team.' },
      { q: 'Can I change the auto-shortlist threshold?', a: 'Yes. Each job has its own auto-shortlist threshold, and recruiters can always shortlist or reject manually.' },
      { q: 'Is the fit score explained?', a: 'Yes. Each score comes with a written rationale so recruiters can see why a candidate ranked where they did.' },
    ],
  },
  {
    slug: 'proctoring',
    name: 'Proctoring & integrity',
    icon: 'ai-video-interview',
    agent: 'tovia',
    eyebrow: 'Tovia · integrity',
    title: 'Trust every interview result',
    description:
      'HireOnto watches for integrity signals during AI interviews — face presence, tab and focus changes, muted microphones — and turns them into a clear timeline and strike policy.',
    metaTitle: 'Interview proctoring and integrity monitoring',
    keywords: ['interview proctoring', 'online interview cheating detection', 'remote proctoring software', 'interview integrity'],
    highlights: [
      { title: 'Face detection', body: 'The candidate camera is checked throughout the session; missing or extra faces are logged as events.' },
      { title: 'Tab & focus events', body: 'Leaving the interview tab or window is captured with a timestamp.' },
      { title: 'Microphone monitoring', body: 'Muted microphones and audio issues are recorded so reviewers have context.' },
      { title: 'Strike policy', body: 'Configure how many strikes end an interview. Candidates see warnings before a strike is applied.' },
      { title: 'Integrity timeline', body: 'Every event sits on a timeline next to the evaluation, so reviewers see the full picture in one place.' },
      { title: 'Pre-flight checks', body: 'Camera, microphone, connection and fullscreen are verified before the interview starts.' },
    ],
    storyIds: ['proctoring', 'candidate'],
    faqs: [
      { q: 'Does proctoring automatically reject candidates?', a: 'Only if you configure a strike policy that ends the interview. Otherwise events are shown to reviewers as context for a human decision.' },
      { q: 'What do candidates see?', a: 'Candidates see a secure-session indicator and get warnings before a strike is applied, so the process is transparent.' },
    ],
  },
  {
    slug: 'evaluation',
    name: 'Evaluation reports',
    icon: 'ai-evaluation-scoring',
    agent: 'tovia',
    eyebrow: 'Tovia · evaluation',
    title: 'An explainable report for every candidate',
    description:
      'When an interview ends, HireOnto produces a scored evaluation with rubric breakdown, written reasoning, strengths and concerns — then your team reviews, invites guest reviewers and decides.',
    metaTitle: 'AI interview evaluation and scorecards',
    keywords: ['interview scorecard', 'AI candidate evaluation', 'interview feedback software', 'hiring decision'],
    highlights: [
      { title: 'Overall score + rubric', body: 'Role fit, communication, technical depth, ownership and problem solving — each scored and visible at a glance.' },
      { title: 'Written reasoning', body: 'A plain-language summary explains the score so it can be discussed and challenged.' },
      { title: 'Strengths & concerns', body: 'Clear lists of what went well and what needs a closer look in the next round.' },
      { title: 'Guest reviewers', body: 'Share a secure link with a hiring manager or panelist to collect their assessment without an account.' },
      { title: 'Select, hold or reject', body: 'Decide in one click. Candidates and hiring managers are notified by email.' },
      { title: 'Human override', body: 'Recruiters can override the AI recommendation and the change is recorded in the audit log.' },
    ],
    storyIds: ['evaluation', 'interviews'],
    faqs: [
      { q: 'Can a hiring manager review without a HireOnto account?', a: 'Yes. Send a guest review link and they can watch the evidence and submit their assessment securely.' },
      { q: 'Is every decision logged?', a: 'Yes. Decisions and overrides are written to the audit log for compliance and review.' },
    ],
  },
  {
    slug: 'scheduling',
    name: 'Invites & scheduling',
    icon: 'interview-scheduling',
    agent: 'onric',
    eyebrow: 'Onric · scheduling',
    title: 'No more scheduling back-and-forth',
    description:
      'Send AI interview invites in one click, let candidates finish on their own time, and book human rounds with calendar sync and an outbound call-to-schedule bot.',
    metaTitle: 'Interview scheduling and candidate invites',
    keywords: ['interview scheduling software', 'candidate invite', 'Google Calendar interview scheduling', 'Microsoft Teams interview'],
    highlights: [
      { title: 'One-click invites', body: 'Invite one or many shortlisted candidates. Each gets a private link and temporary password by email.' },
      { title: 'Self-paced window', body: 'Candidates complete the AI round any time within the window — no calendar slots needed.' },
      { title: 'Calendar sync', body: 'Connect Google Calendar or Microsoft Teams to create meeting links for human rounds.' },
      { title: 'Call to schedule', body: 'An outbound phone bot calls shortlisted candidates and books a slot straight into the calendar.' },
      { title: 'Extend & resend', body: 'Extend a deadline or resend an invite from the interview page in one click.' },
      { title: 'Multi-round jobs', body: 'Run an AI first round, then human, director or coding rounds — candidates advance automatically.' },
    ],
    storyIds: ['scheduling', 'invite'],
    faqs: [
      { q: 'Which calendars are supported?', a: 'Google Calendar (with Google Meet) and Microsoft Teams, connected with OAuth in Settings.' },
      { q: 'How long do candidates have to complete the AI interview?', a: 'You set the window when inviting. A typical setup is 72 hours, and you can extend it per candidate.' },
    ],
  },
  {
    slug: 'analytics',
    name: 'Hiring analytics',
    icon: 'recruitment-analytics',
    eyebrow: 'Analytics',
    title: 'See what is working across every role',
    description:
      'Funnel health, completion rates, per-job performance, integrity risk and recruiter activity — the hiring metrics leaders ask for, live and without spreadsheets.',
    metaTitle: 'Recruitment analytics and hiring funnel reports',
    keywords: ['recruitment analytics', 'hiring funnel', 'recruiting metrics', 'interview completion rate'],
    highlights: [
      { title: 'Pipeline funnel', body: 'Parsed, shortlisted, invited, interviewing, interviewed and hired — per job or across all jobs.' },
      { title: 'Completion rate', body: 'Track how many invited candidates actually finish the AI interview.' },
      { title: 'Per-job performance', body: 'Average fit, interviews sent and completed for every open role.' },
      { title: 'Integrity risk', body: 'Average integrity risk and terminations so you can spot problems early.' },
      { title: 'Recruiter activity', body: 'See which team members are creating jobs and moving candidates forward.' },
      { title: 'Live dashboard', body: 'The home dashboard shows active jobs, candidates and interviews the moment they change.' },
    ],
    storyIds: ['analytics', 'dashboard'],
    faqs: [{ q: 'Can I filter analytics by job?', a: 'Yes. The funnel and performance views can be filtered to a single job or shown across all jobs.' }],
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

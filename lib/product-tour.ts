import type { BrandIconName } from '@/components/ui'

export type ProductStory = {
  id: string
  tab: string
  eyebrow: string
  title: string
  body: string
  points: string[]
  url: string
  icon: BrandIconName
}

export const tourVideo = { src: '/product/hireonto-tour.mp4', poster: '/product/tour-poster.jpg' }

/** HireOnto product areas, in the order a hiring team uses them (rendered as HTML mockups). */
export const productStories: ProductStory[] = [
  {
    id: 'dashboard',
    tab: 'Dashboard',
    eyebrow: 'Command center',
    title: 'Your whole hiring pipeline at a glance',
    body: 'Open HireOnto and see exactly where every role stands — active jobs, candidates, interviews and integrity risk, updated live.',
    points: ['Live counts for jobs, candidates and interviews', 'Funnel from parsed resume to hire', 'Guided 5-step setup for new teams'],
    url: '/dashboard',
    icon: 'recruitment-analytics',
  },
  {
    id: 'jobs',
    tab: 'Jobs',
    eyebrow: 'Job setup',
    title: 'Every role comes with its own AI interview',
    body: 'Create a job once and HireOnto builds the interview around it — duration, question count, coding round and proctoring are set per role.',
    points: ['Interview length, questions, coding and proctoring per job', 'Average fit and interview progress on every card', 'Active / archived views for the whole team'],
    url: '/jobs',
    icon: 'ai-job-description',
  },
  {
    id: 'pipeline',
    tab: 'AI shortlist',
    eyebrow: 'Resume intelligence',
    title: 'Drop in resumes. Get a ranked shortlist.',
    body: 'Upload PDFs in bulk — AI parses each resume, scores it against the job description and auto-shortlists everyone above your threshold.',
    points: ['Fit score 0–100% against the JD', 'Auto-shortlist above your threshold (e.g. 70%)', 'Filter by stage: shortlisted, invited, interviewing, interviewed'],
    url: '/jobs/backend-engineer',
    icon: 'resume-matching',
  },
  {
    id: 'invite',
    tab: 'Invite',
    eyebrow: 'One-click invites',
    title: 'Send AI interviews in one click',
    body: 'Pick shortlisted candidates and send invites. Each person gets a private link and a temporary password, with 72 hours to finish at their own pace.',
    points: ['Private link + temporary password per candidate', 'Self-paced window — no scheduling back-and-forth', 'Bulk invite straight from the pipeline'],
    url: '/jobs/backend-engineer',
    icon: 'automated-followups',
  },
  {
    id: 'candidate',
    tab: 'Candidate view',
    eyebrow: 'Candidate experience',
    title: 'A secure, branded start for every candidate',
    body: 'Candidates land on your company-branded page, enter their access code and run a quick camera, mic and network check before the interview begins.',
    points: ['Your company name and branding, not ours', 'Access code + deadline shown up front', 'Camera, microphone, connection and fullscreen checks'],
    url: '/candidate/interview',
    icon: 'onboarding',
  },
  {
    id: 'live',
    tab: 'AI interview',
    eyebrow: 'Tovia, the AI interviewer',
    title: 'A real voice interview — run by AI, watched for integrity',
    body: 'Tovia speaks with the candidate live, adapts follow-up questions to their answers and writes the transcript as they talk, while the integrity monitor logs anything unusual.',
    points: ['Natural voice conversation over WebRTC', 'Live transcript of every question and answer', 'Face detection, mic and tab monitoring in real time'],
    url: '/candidate/interview/live',
    icon: 'ai-voice-interview',
  },
  {
    id: 'interviews',
    tab: 'Tracking',
    eyebrow: 'Interview tracking',
    title: 'Track every interview from invite to evaluation',
    body: 'One list for every AI interview across all jobs — awaiting, live, completed or expired — with deadlines and integrity strikes beside each name.',
    points: ['Status tabs: awaiting, live, completed, closed', 'Deadline and strike count per candidate', 'Search and filter by job'],
    url: '/interviews',
    icon: 'interview-scheduling',
  },
  {
    id: 'evaluation',
    tab: 'Evaluation',
    eyebrow: 'AI evaluation',
    title: 'A clear, explainable report for every candidate',
    body: 'When the interview ends, HireOnto scores the candidate, explains why, lists strengths and concerns, and shows the full integrity timeline — then your team decides.',
    points: ['Overall score with role fit, communication, ownership and more', 'Written reasoning, strengths and concerns', 'Integrity timeline next to the score · human makes the final call'],
    url: '/interviews/report',
    icon: 'ai-evaluation-scoring',
  },
  {
    id: 'analytics',
    tab: 'Analytics',
    eyebrow: 'Analytics',
    title: 'Know what is working across every role',
    body: 'Funnel health, completion rate, per-job performance and recruiter activity — the numbers hiring leaders ask for, without a spreadsheet.',
    points: ['Pipeline funnel per job or across all jobs', 'Completion rate and average integrity risk', 'Per-job fit and recruiter activity'],
    url: '/analytics',
    icon: 'recruitment-analytics',
  },
  {
    id: 'proctoring',
    tab: 'Proctoring',
    eyebrow: 'Integrity',
    title: 'Every signal on one timeline',
    body: 'Face presence, tab switches, microphone and fullscreen events are captured with timestamps, warned to the candidate, and counted against a strike policy you control.',
    points: ['Face, multiple-face, tab, mic and fullscreen signals', 'Candidates are warned before a strike', 'Configurable strike limit ends the session'],
    url: '/interviews/integrity',
    icon: 'ai-video-interview',
  },
  {
    id: 'scheduling',
    tab: 'Scheduling',
    eyebrow: 'Scheduling',
    title: 'Human rounds, booked without email ping-pong',
    body: 'Connect Google Calendar or Microsoft Teams, let the call-to-schedule bot phone shortlisted candidates, and see every booked round in one week view.',
    points: ['Google Meet and Teams links created automatically', 'Outbound phone bot books slots for you', 'L2, panel, director and coding rounds in one place'],
    url: '/settings/calendar',
    icon: 'interview-scheduling',
  },
]


export const heroVideo = { src: '/product/hero-loop.mp4', poster: '/product/tour-poster.jpg' }

/** Chapter start times (seconds) in hireonto-tour.mp4 / hero-loop.mp4. */
export const tourChapters = [
  { label: 'Dashboard', start: 0 },
  { label: 'AI shortlist', start: 6 },
  { label: 'Invite', start: 14 },
  { label: 'Candidate joins', start: 20 },
  { label: 'AI interview', start: 28 },
  { label: 'Evaluation', start: 36 },
  { label: 'Analytics', start: 44 },
]

import type { AgentName } from '@/components/agents/agent-bot'
import type { Faq, Highlight } from './products'

export type Agent = {
  id: AgentName
  name: string
  role: string
  tagline: string
  intro: string
  skills: Highlight[]
  handles: string[]
  mock: string
  productSlugs: string[]
}

export const agents: Agent[] = [
  {
    id: 'onric',
    name: 'Onric',
    role: 'AI hiring agent',
    tagline: 'Screens, shortlists and schedules — so your pipeline never stalls.',
    intro:
      'Onric runs the operational side of hiring. He reads every resume against the job, ranks candidates with an explainable fit score, invites the shortlist, books human rounds and follows up with anyone who goes quiet.',
    skills: [
      { title: 'Resume screening', body: 'Parses every resume and scores it 0–100 against the job description, with the reasoning written out.' },
      { title: 'Auto-shortlisting', body: 'Shortlists everyone above your threshold and flags duplicates — you can override any call.' },
      { title: 'Invites & reminders', body: 'Sends private interview links and temporary passwords, and resends or extends when needed.' },
      { title: 'Call-to-schedule', body: 'Phones shortlisted candidates, finds a slot and books it into Google Calendar or Teams.' },
    ],
    handles: ['Resume parsing', 'Fit scoring', 'Shortlists', 'Invites', 'Phone scheduling', 'Follow-ups'],
    mock: 'pipeline',
    productSlugs: ['resume-screening', 'scheduling', 'analytics'],
  },
  {
    id: 'tovia',
    name: 'Tovia',
    role: 'AI interviewer',
    tagline: 'Interviews every candidate by voice — fairly, 24/7.',
    intro:
      'Tovia runs first-round interviews. She speaks with candidates in real time, adapts follow-up questions to their answers, watches for integrity signals, and writes an explainable evaluation the moment the interview ends.',
    skills: [
      { title: 'Live voice interviews', body: 'Natural, low-latency voice conversation with a chat fallback when the microphone is off.' },
      { title: 'Adaptive follow-ups', body: 'Builds questions from the job and your knowledge base, then probes deeper based on each answer.' },
      { title: 'Integrity monitoring', body: 'Face presence, tab switches and mic events on a timeline, with warnings before any strike.' },
      { title: 'Explainable evaluation', body: 'Rubric scores, written reasoning, strengths and concerns — ready for your team to decide.' },
    ],
    handles: ['Voice interviews', 'Chat interviews', 'Coding rounds', 'Proctoring', 'Transcripts', 'Evaluations'],
    mock: 'live',
    productSlugs: ['ai-interviews', 'proctoring', 'evaluation'],
  },
]

export const agentHandoff = [
  { who: 'onric' as const, title: 'Onric screens', body: 'Resumes are parsed, scored and the best candidates shortlisted.' },
  { who: 'onric' as const, title: 'Onric invites', body: 'The shortlist gets private interview links within minutes.' },
  { who: 'tovia' as const, title: 'Tovia interviews', body: 'Candidates talk with Tovia by voice, on their own schedule.' },
  { who: 'tovia' as const, title: 'Tovia evaluates', body: 'A scored, explainable report lands on the candidate’s page.' },
  { who: 'you' as const, title: 'You decide', body: 'Your team reviews the evidence and makes the final call.' },
  { who: 'onric' as const, title: 'Onric books next rounds', body: 'Human interviews are scheduled and candidates notified.' },
]

export const agentFaqs: Faq[] = [
  { q: 'Are Onric and Tovia real people?', a: 'No. They are HireOnto’s AI agents. Candidates are told they are speaking with an AI interviewer, and Tovia never claims to be human.' },
  { q: 'Do the agents make hiring decisions?', a: 'No. Onric and Tovia screen, interview and recommend. Your recruiters and hiring managers always make the final select, hold or reject decision, and every override is logged.' },
  { q: 'Can I control what the agents do?', a: 'Yes. You set the shortlist threshold, interview length, number of questions, coding round, proctoring and strike policy per job.' },
  { q: 'Which languages and channels do they support?', a: 'Tovia interviews by voice or chat in the browser; Onric works by email invites and outbound phone calls for scheduling.' },
]

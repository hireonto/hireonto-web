import type { Highlight } from './products'

export type ProductDetail = {
  steps: Highlight[]
  compare: { before: string; after: string }[]
  specs: [string, string][]
}

/** Extra depth for product pages: workflow, before/after and key specs. */
export const productDetails: Record<string, ProductDetail> = {
  'ai-interviews': {
    steps: [
      { title: 'Configure the round', body: 'Pick duration, number of questions, optional coding round and proctoring for the job. Add knowledge-base notes Tovia should probe.' },
      { title: 'Candidates interview on their time', body: 'They open a private link, pass a quick device check and talk with Tovia by voice — or chat if they prefer.' },
      { title: 'Read the transcript and report', body: 'The full transcript, scores and reasoning land on the interview page minutes after the candidate finishes.' },
    ],
    compare: [
      { before: 'Recruiters spend 30–45 minutes per phone screen', after: 'Tovia runs every first round; recruiters read a 2-minute report' },
      { before: 'Questions vary by interviewer and mood', after: 'Every candidate gets a structured, role-specific interview' },
      { before: 'Candidates wait days for a slot', after: 'Candidates interview the same day, any time in their window' },
    ],
    specs: [
      ['Modes', 'Voice (WebRTC) · chat fallback'],
      ['Round length', 'Configurable per job'],
      ['Coding', 'Sandboxed execution, submission history'],
      ['Output', 'Transcript · score · rubric · reasoning'],
    ],
  },
  'resume-screening': {
    steps: [
      { title: 'Upload resumes', body: 'Drag in PDFs one at a time or as a batch. Parsing runs in the background.' },
      { title: 'AI scores every candidate', body: 'Each profile is compared with the job description and gets a 0–100 fit score with a written rationale.' },
      { title: 'Shortlist above your threshold', body: 'Candidates at or above your threshold are shortlisted automatically; you can override any of them.' },
    ],
    compare: [
      { before: 'Hours skimming resumes for every role', after: 'A ranked list with reasons, minutes after upload' },
      { before: 'Keyword filters reject good candidates', after: 'Scores weigh skills and experience in context' },
      { before: 'Duplicate applicants screened twice', after: 'Duplicates detected and merged automatically' },
    ],
    specs: [
      ['Input', 'PDF resumes · bulk upload'],
      ['Score', '0–100 fit with rationale'],
      ['Shortlist', 'Per-job threshold + manual override'],
      ['Sourcing', 'Job-board intake on supported plans'],
    ],
  },
  proctoring: {
    steps: [
      { title: 'Pre-flight checks', body: 'Camera, microphone, connection and fullscreen are verified before the interview can start.' },
      { title: 'Signals during the session', body: 'Face presence, extra faces, tab switches and mic events are captured with timestamps; candidates see a warning first.' },
      { title: 'Review on the timeline', body: 'Reviewers see every event next to the evaluation and decide with full context.' },
    ],
    compare: [
      { before: 'No idea if someone was helping off-screen', after: 'Face and multi-face detection throughout the session' },
      { before: 'A single opaque “cheating score”', after: 'A readable timeline of exactly what happened and when' },
      { before: 'Auto-rejections candidates cannot understand', after: 'Warnings first, then a strike policy you configure' },
    ],
    specs: [
      ['Signals', 'Face · multiple faces · tab · mic · fullscreen'],
      ['Policy', 'Configurable strike limit'],
      ['Candidate view', 'Secure-session indicator + warnings'],
      ['Output', 'Integrity timeline + risk level'],
    ],
  },
  evaluation: {
    steps: [
      { title: 'Report generated', body: 'When an interview ends, HireOnto scores the candidate and writes the reasoning, strengths and concerns.' },
      { title: 'Collect opinions', body: 'Share a guest review link with hiring managers or panelists — no account needed.' },
      { title: 'Decide and notify', body: 'Select, hold or reject. Candidates and hiring managers are emailed and the decision is audit-logged.' },
    ],
    compare: [
      { before: 'Interview notes scattered across docs and chats', after: 'One report with transcript, scores and integrity' },
      { before: '“Good vibe” decisions that are hard to defend', after: 'Rubric scores with written reasoning' },
      { before: 'Chasing hiring managers for feedback', after: 'Guest review links collect it in one place' },
    ],
    specs: [
      ['Rubric', 'Role fit · communication · depth · ownership · problem solving'],
      ['Decisions', 'Select · hold · reject with emails'],
      ['Collaboration', 'Guest reviewer links'],
      ['Compliance', 'Overrides and decisions in audit log'],
    ],
  },
  scheduling: {
    steps: [
      { title: 'Invite the shortlist', body: 'Select candidates and send AI interview invites with private links and a self-paced window.' },
      { title: 'Book human rounds', body: 'Connect Google Calendar or Teams; the call-to-schedule bot can phone candidates and book slots.' },
      { title: 'Keep things moving', body: 'Extend deadlines or resend invites in one click, and advance candidates between rounds automatically.' },
    ],
    compare: [
      { before: 'Ten emails to find one interview slot', after: 'Self-paced AI rounds, auto-booked human rounds' },
      { before: 'Meeting links created by hand', after: 'Meet / Teams links generated with every booking' },
      { before: 'Candidates go quiet after a missed call', after: 'An outbound bot follows up and books for you' },
    ],
    specs: [
      ['Calendars', 'Google Calendar (Meet) · Microsoft Teams'],
      ['Phone', 'Outbound call-to-schedule bot'],
      ['Invites', 'Private link + temporary password'],
      ['Rounds', 'AI · human · director · coding'],
    ],
  },
  analytics: {
    steps: [
      { title: 'Everything is tracked', body: 'Every upload, invite, interview and decision updates your numbers automatically.' },
      { title: 'Drill into a job', body: 'Filter the funnel and performance views to a single role or look across all jobs.' },
      { title: 'Fix the bottleneck', body: 'See where candidates drop off — and which roles need a different threshold or interview.' },
    ],
    compare: [
      { before: 'Weekly spreadsheet built by hand', after: 'Live dashboard, always up to date' },
      { before: 'No idea where candidates drop out', after: 'Stage-by-stage funnel per job' },
      { before: 'Integrity problems noticed too late', after: 'Average risk and terminations tracked' },
    ],
    specs: [
      ['Funnel', 'Parsed → shortlisted → invited → interviewed → hired'],
      ['Rates', 'Interview completion · integrity risk'],
      ['Per job', 'Average fit · interviews sent and completed'],
      ['Team', 'Recruiter activity'],
    ],
  },
}

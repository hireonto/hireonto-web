export type SolutionDetail = {
  timeline: { when: string; what: string }[]
  roles: string[]
}

/** Extra depth for solution pages: a typical hiring cycle and example roles. */
export const solutionDetails: Record<string, SolutionDetail> = {
  'tech-hiring': {
    timeline: [
      { when: 'Day 1', what: 'Post the role, upload resumes — AI ranks candidates against your stack.' },
      { when: 'Day 1–3', what: 'Shortlist takes the AI voice interview and coding round on their own time.' },
      { when: 'Day 4', what: 'Engineering manager reviews reports via guest link and picks who to meet.' },
      { when: 'Day 5+', what: 'Human system-design and panel rounds booked through calendar sync.' },
    ],
    roles: ['Backend engineers', 'Frontend engineers', 'Full-stack developers', 'Data engineers', 'DevOps / SRE', 'QA automation'],
  },
  'high-volume-hiring': {
    timeline: [
      { when: 'Hour 0', what: 'Bulk-upload hundreds of resumes; parsing and scoring run in the background.' },
      { when: 'Hour 1', what: 'Everyone above the threshold is auto-shortlisted and invited in one click.' },
      { when: 'Day 1–3', what: 'Candidates complete self-paced AI interviews around their schedules.' },
      { when: 'Day 3', what: 'Recruiters sort by evaluation score and move the best to final rounds.' },
    ],
    roles: ['Customer support', 'Sales development', 'Operations', 'Retail & store staff', 'BPO / contact centre', 'Field executives'],
  },
  'campus-hiring': {
    timeline: [
      { when: 'Before the drive', what: 'Create the role and AI interview; share invite links with the placement cell.' },
      { when: 'Drive week', what: 'Students interview between classes, with proctoring on every session.' },
      { when: 'Drive +1 day', what: 'Rank by evaluation score and integrity; shortlist for final rounds.' },
      { when: 'Drive +3 days', what: 'Final human interviews booked and offers decided.' },
    ],
    roles: ['Graduate engineers', 'Management trainees', 'Analysts', 'Interns', 'Associate consultants', 'Design trainees'],
  },
  'staffing-agencies': {
    timeline: [
      { when: 'Req received', what: 'Create the job from the client JD; Tovia’s interview is built from it.' },
      { when: 'Same day', what: 'Source and screen candidates; the shortlist takes the branded AI interview.' },
      { when: 'Next day', what: 'Send the client guest review links with reports and integrity timelines.' },
      { when: 'Client decides', what: 'Select, hold or reject with automatic candidate emails.' },
    ],
    roles: ['IT staffing', 'Contract-to-hire', 'Executive search first rounds', 'RPO programmes', 'Volume staffing', 'Niche tech roles'],
  },
}

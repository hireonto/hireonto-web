'use client'

import { AgentBot } from '../agents/agent-bot'
import { AppWindow, Avatar, Bar, Card, Label, Pill, Ring, Scaled } from './kit'

const candidates = [
  { name: 'Ethan Carter', role: '6 yrs · Node.js, Postgres', fit: 94, stage: 'Interviewed', tone: 'green' as const },
  { name: 'Olivia Bennett', role: '5 yrs · NestJS, Redis', fit: 91, stage: 'Interviewing', tone: 'violet' as const },
  { name: 'Jacob Miller', role: '4 yrs · Node.js, AWS', fit: 88, stage: 'Invited', tone: 'blue' as const },
  { name: 'Sophia Turner', role: '7 yrs · Go, Kafka', fit: 82, stage: 'Shortlisted', tone: 'neutral' as const },
  { name: 'Ryan Brooks', role: '3 yrs · Express, Mongo', fit: 74, stage: 'Shortlisted', tone: 'neutral' as const },
  { name: 'Emily Parker', role: '2 yrs · PHP, MySQL', fit: 48, stage: 'Parsed', tone: 'neutral' as const },
]

/* ───────── Dashboard ───────── */
export function DashboardMock() {
  const stats = [
    ['Active jobs', '6', '+2 this week'],
    ['Candidates', '248', '41 shortlisted'],
    ['AI interviews', '96', '71 completed'],
    ['Avg integrity risk', '3%', '1 flagged'],
  ]
  const funnel = [
    ['Parsed', 100],
    ['Shortlisted', 62],
    ['Invited', 48],
    ['Interviewed', 36],
    ['Offer', 9],
  ] as const
  return (
    <Scaled label="HireOnto dashboard with hiring stats and pipeline funnel">
      <AppWindow path="/dashboard" active="Dashboard">
        <div className="p-6">
          <Label>Live · Acme Inc.</Label>
          <div className="mt-2 text-[26px] font-semibold tracking-tight">Good morning, Megan.</div>
          <div className="mt-5 grid grid-cols-4 gap-3">
            {stats.map(([k, v, s]) => (
              <Card key={k} className="p-4">
                <Label>{k}</Label>
                <div className="mt-2 text-[28px] font-semibold">{v}</div>
                <div className="text-[11px] text-white/40">{s}</div>
              </Card>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[1.4fr_1fr] gap-3">
            <Card className="p-4">
              <div className="text-[13px] font-semibold">Pipeline funnel</div>
              <div className="mt-4 space-y-3">
                {funnel.map(([k, v], i) => (
                  <div key={k} className="grid grid-cols-[80px_1fr_32px] items-center gap-3 text-[11px] text-white/50">
                    {k}
                    <Bar value={v} delay={i * 0.08} />
                    <span className="text-right text-white/70">{Math.round(v * 2.48)}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-[13px] font-semibold">Needs your review</div>
              <div className="mt-3 space-y-2.5">
                {candidates.slice(0, 3).map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] p-2">
                    <Avatar name={c.name} tone={i} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px]">{c.name}</div>
                      <div className="text-[10px] text-white/40">Evaluation ready</div>
                    </div>
                    <span className="text-[12px] font-semibold text-violet-300">{c.fit - 12}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Pipeline / AI shortlist ───────── */
export function PipelineMock() {
  return (
    <Scaled label="Candidate pipeline ranked by AI fit score with auto-shortlist">
      <AppWindow path="/jobs/backend-engineer" active="Jobs">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-[22px] font-semibold tracking-tight">
                Backend Engineer <Pill tone="green">● Active</Pill>
              </div>
              <div className="mt-1 text-[11px] text-white/40">Remote · Auto-shortlist ≥ 70% · 124 applicants</div>
            </div>
            <div className="flex gap-2">
              <div className="rounded-lg border border-white/15 px-3 py-1.5 text-[11px]">✦ Auto-shortlist</div>
              <div className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-black">↑ Upload resumes</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-sky-400/20 bg-sky-400/[0.06] px-3 py-1.5 text-[11px] text-sky-200">
            <AgentBot agent="onric" className="size-6" animate={false} />
            Onric parsed 124 resumes and shortlisted 41 at ≥ 70% fit · 3 duplicates merged
          </div>
          <div className="mt-3 flex gap-1.5">
            {['All 124', 'Shortlisted 41', 'Invited 18', 'Interviewing 9', 'Interviewed 12'].map((t, i) => (
              <span key={t} className={`rounded-full border px-2.5 py-1 text-[10px] ${i === 0 ? 'border-white/30 bg-white/10' : 'border-white/10 text-white/50'}`}>
                {t}
              </span>
            ))}
          </div>
          <Card className="mt-4 overflow-hidden">
            <div className="grid grid-cols-[1.6fr_1.2fr_0.9fr] border-b border-white/[0.06] px-4 py-2.5">
              <Label>Candidate</Label>
              <Label>AI fit</Label>
              <Label>Stage</Label>
            </div>
            {candidates.map((c, i) => (
              <div key={c.name} className={`grid grid-cols-[1.6fr_1.2fr_0.9fr] items-center border-b border-white/[0.04] px-4 py-2.5 ${c.fit < 70 ? 'opacity-45' : ''}`}>
                <div className="flex items-center gap-2.5">
                  <Avatar name={c.name} tone={i} />
                  <div>
                    <div className="text-[12px]">{c.name}</div>
                    <div className="text-[10px] text-white/40">{c.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pr-6">
                  <Bar value={c.fit} delay={i * 0.07} className={c.fit >= 70 ? 'from-[#3b82f6] to-[#a855f7]' : 'from-white/30 to-white/30'} />
                  <span className="w-8 text-[11px] text-white/70">{c.fit}%</span>
                </div>
                <div>
                  <Pill tone={c.tone}>{c.stage}</Pill>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Jobs ───────── */
export function JobsMock() {
  const jobs = [
    ['Backend Engineer', 'Remote', '45m · 6 Q', ['Coding', 'Proctored'], 124, 79, '43/50'],
    ['Product Designer', 'Austin', '30m · 5 Q', ['Portfolio', 'Proctored'], 86, 72, '18/22'],
    ['Data Analyst', 'Chicago', '30m · 6 Q', ['SQL', 'Proctored'], 152, 68, '31/40'],
    ['SEO Specialist', 'New York', '25m · 6 Q', ['Proctored'], 61, 64, '9/14'],
  ] as const
  return (
    <Scaled label="Jobs list where every role has its own AI interview setup">
      <AppWindow path="/jobs" active="Jobs">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-[24px] font-semibold tracking-tight">Jobs</div>
            <div className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-black">+ New job</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {jobs.map(([t, loc, len, tags, cand, fit, iv]) => (
              <Card key={t} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="grid size-8 place-items-center rounded-lg bg-white/10 text-[13px]">◫</div>
                  <Pill tone="green">● Active</Pill>
                </div>
                <div className="mt-3 text-[15px] font-semibold">{t}</div>
                <div className="text-[10px] text-white/40">{loc}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Pill>{len}</Pill>
                  {tags.map((g) => (
                    <Pill key={g}>{g}</Pill>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 border-t border-white/[0.06] pt-3 text-center">
                  {[
                    [cand, 'Candidates'],
                    [`${fit}%`, 'Avg fit'],
                    [iv, 'Interviews'],
                  ].map(([v, k]) => (
                    <div key={String(k)}>
                      <div className="text-[14px] font-semibold">{v}</div>
                      <Label>{k}</Label>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Invite ───────── */
export function InviteMock() {
  return (
    <Scaled label="Send AI interview invites with private link and temporary password">
      <AppWindow path="/jobs/backend-engineer" active="Jobs">
        <div className="relative h-full p-6">
          <div className="space-y-2 opacity-30 blur-[1px]">
            {candidates.slice(0, 5).map((c, i) => (
              <div key={c.name} className="flex items-center gap-3 rounded-lg bg-white/[0.04] p-2.5">
                <Avatar name={c.name} tone={i} />
                <div className="text-[12px]">{c.name}</div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 grid place-items-center bg-black/40">
            <div className="mock-float w-[470px] rounded-2xl border border-white/10 bg-[#14151d] p-5 shadow-2xl">
              <div className="text-[16px] font-semibold">Send 3 AI interview invites</div>
              <div className="mt-1 text-[11px] text-white/45">Each candidate gets a private link and a temporary password. Window: 72 hours.</div>
              <div className="mt-4 space-y-2">
                {candidates.slice(0, 3).map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-lg border border-white/[0.07] p-2.5">
                    <Avatar name={c.name} tone={i} />
                    <div className="flex-1 text-[12px]">{c.name}</div>
                    <div className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[10px] text-white/55">{c.name.split(' ')[0].toLowerCase()}@mail.com</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ['72h', 'Window'],
                  ['45 min', 'Interview'],
                  ['On', 'Proctoring'],
                ].map(([v, k]) => (
                  <div key={k} className="rounded-lg bg-white/[0.04] py-2">
                    <div className="text-[13px] font-semibold">{v}</div>
                    <Label>{k}</Label>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <div className="px-3 py-1.5 text-[11px] text-white/50">Cancel</div>
                <div className="rounded-lg bg-white px-3.5 py-1.5 text-[11px] font-semibold text-black">➤ Send invites</div>
              </div>
            </div>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Candidate entry + device check ───────── */
export function CandidateMock() {
  const checks = [
    ['Camera', 'Working'],
    ['Microphone', 'Level OK'],
    ['Connection', '42 Mbps'],
    ['Fullscreen', 'Ready'],
  ]
  return (
    <Scaled label="Candidate enters access code and passes camera and microphone checks">
      <AppWindow path="/candidate/interview" sidebar={false}>
        <div className="flex h-full items-center justify-center gap-6 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(109,40,217,0.18),transparent)] p-8">
          <Card className="w-[330px] bg-[#111219] p-5">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-md bg-white text-[11px] font-bold text-black">A</div>
              <div className="text-[11px] text-white/60">Acme Inc. · Backend Engineer</div>
            </div>
            <div className="mt-5 text-[20px] font-semibold">Your AI interview</div>
            <div className="mt-1 text-[11px] leading-relaxed text-white/45">Answer at your own pace — by speaking or typing. Complete by Fri, 6:00 PM.</div>
            <div className="mt-5">
              <Label>Access code</Label>
              <div className="mt-1.5 flex gap-1.5">
                {'3FA9C2'.split('').map((ch, i) => (
                  <div key={i} className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/[0.04] font-mono text-[16px]">
                    {ch}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-white py-2 text-center text-[12px] font-semibold text-black">Continue →</div>
          </Card>
          <Card className="w-[330px] bg-[#111219] p-5">
            <div className="flex items-center justify-between">
              <div className="text-[14px] font-semibold">Pre-flight check</div>
              <Pill tone="green">4/4 ready</Pill>
            </div>
            <div className="relative mt-4 grid h-[120px] place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1b1d2a] to-[#0d0e14]">
              <div className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-sky-500/40 to-violet-500/40 text-[20px]">◕‿◕</div>
              <div className="absolute top-2 left-2">
                <Pill tone="green">● Face detected</Pill>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {checks.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg border border-white/[0.06] px-3 py-2 text-[11px]">
                  <span className="flex items-center gap-2">
                    <span className="grid size-4 place-items-center rounded-full bg-emerald-400/20 text-[9px] text-emerald-300">✓</span>
                    {k}
                  </span>
                  <span className="text-white/40">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Live AI interview ───────── */
export function InterviewMock() {
  return (
    <Scaled label="Live AI voice interview with Tovia, live transcript and integrity monitor">
      <AppWindow path="/candidate/interview/live" sidebar={false}>
        <div className="grid h-full grid-cols-[1fr_300px] gap-3 p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.07] px-4 py-2.5">
              <div className="text-[12px] font-semibold">AI interview with Tovia</div>
              <div className="flex gap-1.5">
                <Pill tone="green">● Face detected</Pill>
                <Pill>Secure</Pill>
                <Pill>14:32 left</Pill>
              </div>
            </div>
            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-[radial-gradient(50%_50%_at_50%_45%,rgba(124,58,237,0.25),transparent)]">
              <div className="relative">
                <span className="mock-pulse absolute inset-0 rounded-full bg-violet-500/40" />
                <span className="mock-pulse absolute inset-0 rounded-full bg-sky-500/30" style={{ animationDelay: '1.1s' }} />
                <div className="relative grid size-28 place-items-center rounded-full bg-gradient-to-br from-[#1e1b4b] to-[#3b0764] shadow-[0_0_60px_rgba(124,58,237,0.6)] ring-1 ring-violet-400/40">
                  <AgentBot agent="tovia" className="size-24" />
                </div>
              </div>
              <div className="mt-5 text-[15px] font-semibold">Tovia</div>
              <div className="mock-wave mt-3 flex h-8 items-center gap-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} className="block h-8 w-1 rounded-full bg-gradient-to-t from-sky-400 to-violet-400" style={{ animationDelay: `${(i % 6) * 0.12}s` }} />
                ))}
              </div>
              <div className="mt-2 text-[11px] text-white/45">Listening…</div>
              <div className="absolute right-3 bottom-3 grid h-[84px] w-[120px] place-items-center rounded-lg border border-white/10 bg-gradient-to-br from-[#1f2130] to-[#11121a]">
                <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber-400/50 to-rose-400/50 text-[12px]">You</div>
                <span className="absolute top-1.5 left-1.5">
                  <Pill tone="red">● REC</Pill>
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <div className="rounded-full bg-white/10 px-4 py-1.5 text-[11px]">🎙 Mute</div>
              <div className="rounded-full border border-white/15 px-4 py-1.5 text-[11px] text-white/60">End interview</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Card className="flex-1 p-3">
              <div className="text-[12px] font-semibold">Live transcript</div>
              <div className="mt-3 space-y-2.5 text-[11px] leading-relaxed">
                <div className="rounded-lg bg-white/[0.05] p-2.5 text-white/80">
                  <span className="text-violet-300">Tovia ·</span> Walk me through the hardest performance problem you solved.
                </div>
                <div className="ml-6 rounded-lg bg-sky-500/10 p-2.5 text-white/80">
                  <span className="text-sky-300">Ethan ·</span> Our search API took 9 seconds. I profiled the queries and added a composite index…
                </div>
                <div className="rounded-lg bg-white/[0.05] p-2.5 text-white/80">
                  <span className="text-violet-300">Tovia ·</span> How did you verify it would not slow down writes?
                </div>
                <div className="ml-6 flex gap-1 rounded-lg bg-sky-500/10 p-2.5">
                  <span className="mock-blink size-1.5 rounded-full bg-sky-300" />
                  <span className="mock-blink size-1.5 rounded-full bg-sky-300" style={{ animationDelay: '0.2s' }} />
                  <span className="mock-blink size-1.5 rounded-full bg-sky-300" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                Integrity monitor <span className="font-normal text-white/40">1 event</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-white/50">
                <span>Tab focus lost (2s)</span>
                <Pill tone="amber">warning</Pill>
              </div>
            </Card>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Interview tracking ───────── */
export function TrackingMock() {
  const rows = [
    ['Ethan Carter', 'Backend Engineer', 'Completed', 'green', 0],
    ['Olivia Bennett', 'Backend Engineer', 'Live', 'violet', 0],
    ['Jacob Miller', 'Data Analyst', 'Awaiting', 'blue', 0],
    ['Sophia Turner', 'Product Designer', 'Completed', 'green', 1],
    ['Ryan Brooks', 'Backend Engineer', 'Expired', 'neutral', 0],
    ['Emily Parker', 'SEO Specialist', 'Completed', 'green', 2],
  ] as const
  return (
    <Scaled label="Interview tracking list with status, deadlines and integrity strikes">
      <AppWindow path="/interviews" active="Interviews">
        <div className="p-6">
          <div className="text-[24px] font-semibold tracking-tight">Interviews</div>
          <div className="mt-4 flex gap-1.5">
            {['All 96', 'Awaiting 14', 'Live 2', 'Completed 71', 'Closed 9'].map((t, i) => (
              <span key={t} className={`rounded-full border px-2.5 py-1 text-[10px] ${i === 0 ? 'border-white/30 bg-white/10' : 'border-white/10 text-white/50'}`}>
                {t}
              </span>
            ))}
          </div>
          <Card className="mt-4 overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1.1fr_0.9fr_0.8fr] border-b border-white/[0.06] px-4 py-2.5">
              <Label>Candidate</Label>
              <Label>Job</Label>
              <Label>Status</Label>
              <Label>Strikes</Label>
            </div>
            {rows.map(([n, j, s, tone, strikes], i) => (
              <div key={n} className="grid grid-cols-[1.4fr_1.1fr_0.9fr_0.8fr] items-center border-b border-white/[0.04] px-4 py-2.5 text-[12px]">
                <div className="flex items-center gap-2.5">
                  <Avatar name={n} tone={i} />
                  {n}
                </div>
                <div className="text-white/55">{j}</div>
                <div>
                  <Pill tone={tone}>{s}</Pill>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className={`h-1 w-4 rounded-full ${k < strikes ? 'bg-amber-400' : 'bg-white/15'}`} />
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Evaluation ───────── */
export function EvaluationMock() {
  const rubric = [
    ['Role fit', 84],
    ['Communication', 80],
    ['Technical depth', 86],
    ['Ownership', 78],
    ['Problem solving', 90],
  ] as const
  return (
    <Scaled label="AI evaluation report with score, rubric breakdown, strengths, concerns and integrity timeline">
      <AppWindow path="/interviews/ethan-carter" active="Interviews">
        <div className="grid h-full grid-cols-[1fr_230px] gap-3 p-5">
          <div className="flex flex-col gap-3">
            <Card className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar name="Ethan Carter" />
                <div>
                  <div className="text-[15px] font-semibold">Ethan Carter</div>
                  <div className="text-[10px] text-white/40">Backend Engineer · completed 2h ago</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="rounded-lg border border-white/15 px-3 py-1.5 text-[11px]">Guest review</div>
                <div className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-black">Decide</div>
              </div>
            </Card>
            <Card className="flex gap-5 p-4">
              <Ring value={84} label="Overall" />
              <div className="flex-1">
                <Pill tone="green">AI recommendation: Hire</Pill>
                <p className="mt-2 text-[11px] leading-relaxed text-white/60">
                  Strong backend fundamentals: cut API latency from 9s to 400ms with indexing and caching. Clear communicator who owns outcomes. Limited exposure to event-driven systems.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2">
                  {rubric.map(([k, v], i) => (
                    <div key={k}>
                      <div className="mb-1 flex justify-between text-[10px] text-white/55">
                        {k}
                        <span>{v}%</span>
                      </div>
                      <Bar value={v} delay={i * 0.08} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <div className="grid flex-1 grid-cols-2 gap-3">
              <Card className="p-3.5">
                <Label>Strengths</Label>
                <ul className="mt-2 space-y-1.5 text-[11px] text-white/70">
                  <li>✓ Measurable performance wins</li>
                  <li>✓ Solid SQL and indexing</li>
                  <li>✓ Clear, structured answers</li>
                  <li>✓ Owned the rollout end to end</li>
                </ul>
              </Card>
              <Card className="p-3.5">
                <Label>Concerns</Label>
                <ul className="mt-2 space-y-1.5 text-[11px] text-white/70">
                  <li>△ Little Kafka / queue experience</li>
                  <li>△ Probe system design in L2</li>
                  <li>△ Confirm Redis caching depth</li>
                </ul>
              </Card>
            </div>
          </div>
          <Card className="p-3.5">
            <div className="text-[12px] font-semibold">Integrity timeline</div>
            <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
              {[
                ['3', 'Events'],
                ['1', 'Warn'],
                ['0', 'Strikes'],
              ].map(([v, k]) => (
                <div key={k} className="rounded-lg bg-white/[0.04] py-2">
                  <div className="text-[15px] font-semibold">{v}</div>
                  <Label>{k}</Label>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3 border-l border-white/10 pl-3">
              {[
                ['00:00', 'Session started', 'neutral'],
                ['06:12', 'Tab focus lost · 2s', 'amber'],
                ['18:40', 'Coding round submitted', 'blue'],
                ['31:05', 'Session completed', 'green'],
              ].map(([t, e, tone]) => (
                <div key={t} className="relative">
                  <span className="absolute top-1 -left-[16px] size-2 rounded-full bg-white/40" />
                  <div className="font-mono text-[9px] text-white/35">{t}</div>
                  <div className="mt-0.5 text-[11px]">
                    <Pill tone={tone as 'neutral'}>{e}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Analytics ───────── */
export function AnalyticsMock() {
  const bars = [
    ['Backend', 124, 50, 43],
    ['Design', 86, 22, 18],
    ['Data', 152, 40, 31],
    ['SEO', 61, 14, 9],
  ] as const
  return (
    <Scaled label="Hiring analytics: funnel, completion rate and per-job performance">
      <AppWindow path="/analytics" active="Analytics">
        <div className="p-6">
          <div className="text-[24px] font-semibold tracking-tight">Analytics</div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[
              ['Candidates', '423'],
              ['Interviews sent', '126'],
              ['Completion', '78%'],
              ['Time to shortlist', '1.2d'],
            ].map(([k, v]) => (
              <Card key={k} className="p-3.5">
                <Label>{k}</Label>
                <div className="mt-1.5 text-[24px] font-semibold">{v}</div>
              </Card>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1.25fr_1fr] gap-3">
            <Card className="p-4">
              <div className="text-[13px] font-semibold">Jobs at a glance</div>
              <div className="mt-4 flex h-[190px] items-end gap-6 border-b border-white/10 px-2">
                {bars.map(([k, a, b, c]) => (
                  <div key={k} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-[170px] items-end gap-1">
                      <div className="w-4 rounded-t bg-white/80" style={{ height: `${(a / 152) * 100}%` }} />
                      <div className="w-4 rounded-t bg-violet-400" style={{ height: `${(b / 152) * 100}%` }} />
                      <div className="w-4 rounded-t bg-sky-400" style={{ height: `${(c / 152) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around text-[10px] text-white/45">
                {bars.map(([k]) => (
                  <span key={k}>{k}</span>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-[13px] font-semibold">Per-job performance</div>
              <div className="mt-3 space-y-3">
                {bars.map(([k, a], i) => (
                  <div key={k}>
                    <div className="mb-1 flex justify-between text-[11px] text-white/60">
                      {k}
                      <span>{[79, 72, 68, 64][i]}% avg fit</span>
                    </div>
                    <Bar value={[79, 72, 68, 64][i]} delay={i * 0.08} />
                    <div className="mt-1 text-[9px] text-white/35">{a} candidates</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Scheduling ───────── */
export function SchedulingMock() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const events = [
    [0, 1, 2, 'L2 · Ethan Carter', 'from-sky-500/60 to-indigo-500/60'],
    [1, 3, 2, 'Director · Sophia Turner', 'from-violet-500/60 to-fuchsia-500/60'],
    [2, 0, 2, 'L2 · Olivia Bennett', 'from-sky-500/60 to-indigo-500/60'],
    [3, 4, 3, 'Panel · Jacob Miller', 'from-emerald-500/60 to-teal-500/60'],
    [4, 2, 2, 'Coding · Ryan Brooks', 'from-amber-500/60 to-orange-500/60'],
  ] as const
  return (
    <Scaled label="Interview scheduling calendar with Google Meet and Teams rounds">
      <AppWindow path="/settings/calendar" active="Interviews">
        <div className="grid h-full grid-cols-[1fr_230px] gap-3 p-5">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-[14px] font-semibold">This week · human rounds</div>
              <div className="flex gap-1.5">
                <Pill tone="blue">Google Meet</Pill>
                <Pill tone="violet">Teams</Pill>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {days.map((d) => (
                <div key={d} className="text-center font-mono text-[10px] text-white/40">
                  {d}
                </div>
              ))}
              {days.map((d, col) => (
                <div key={d} className="relative h-[360px] rounded-lg bg-white/[0.025]">
                  {[0, 1, 2, 3, 4, 5].map((r) => (
                    <div key={r} className="absolute inset-x-0 border-t border-white/[0.04]" style={{ top: `${(r / 6) * 100}%` }} />
                  ))}
                  {events
                    .filter((e) => e[0] === col)
                    .map(([, row, span, label, grad]) => (
                      <div
                        key={label}
                        className={`absolute inset-x-1 rounded-md bg-gradient-to-br ${grad} p-1.5 text-[10px] leading-tight`}
                        style={{ top: `${(row / 6) * 100 + 1}%`, height: `${(span / 6) * 100 - 2}%` }}
                      >
                        {label}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </Card>
          <div className="flex flex-col gap-3">
            <Card className="p-3.5">
              <div className="flex items-center gap-2 text-[12px] font-semibold"><AgentBot agent="onric" className="size-7" animate={false} />Onric · call-to-schedule</div>
              <div className="mt-2 text-[10px] leading-relaxed text-white/45">Calling shortlisted candidates to book a slot…</div>
              <div className="mt-3 space-y-2">
                {candidates.slice(0, 3).map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2 text-[11px]">
                    <Avatar name={c.name} tone={i} />
                    <span className="flex-1">{c.name.split(' ')[0]}</span>
                    <Pill tone={i === 2 ? 'amber' : 'green'}>{i === 2 ? 'Calling…' : 'Booked'}</Pill>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-3.5">
              <div className="text-[12px] font-semibold">Integrations</div>
              {['Google Calendar', 'Microsoft Teams', 'Phone (PSTN)'].map((n) => (
                <div key={n} className="mt-2 flex items-center justify-between text-[11px] text-white/60">
                  {n}
                  <Pill tone="green">Connected</Pill>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  )
}

/* ───────── Proctoring ───────── */
export function ProctoringMock() {
  const events = [
    ['00:00', 'Pre-flight checks passed', 'green', 'Camera, mic, network, fullscreen'],
    ['04:21', 'Face not visible · 3s', 'amber', 'Warning shown to candidate'],
    ['09:47', 'Tab switched · 5s', 'amber', 'Warning shown to candidate'],
    ['14:02', 'Second face detected', 'red', 'Strike 1 of 3'],
    ['31:10', 'Session completed', 'green', 'Report attached to evaluation'],
  ] as const
  return (
    <Scaled label="Proctoring integrity timeline with face, tab and microphone events and strike policy">
      <AppWindow path="/interviews/integrity" active="Interviews">
        <div className="grid h-full grid-cols-[1fr_250px] gap-3 p-5">
          <Card className="p-4">
            <div className="text-[14px] font-semibold">Integrity timeline</div>
            <div className="text-[10px] text-white/40">Signals captured during the session</div>
            <div className="mt-5 space-y-4 border-l border-white/10 pl-5">
              {events.map(([t, e, tone, d]) => (
                <div key={t} className="relative">
                  <span
                    className={`absolute top-1 -left-[25px] size-2.5 rounded-full ring-4 ring-[#0b0c11] ${tone === 'green' ? 'bg-emerald-400' : tone === 'amber' ? 'bg-amber-400' : 'bg-rose-400'}`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/35">{t}</span>
                    <Pill tone={tone}>{e}</Pill>
                  </div>
                  <div className="mt-1 text-[11px] text-white/45">{d}</div>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex flex-col gap-3">
            <Card className="p-3.5">
              <div className="text-[12px] font-semibold">Strike policy</div>
              <div className="mt-3 flex gap-1.5">
                {[1, 0, 0].map((on, i) => (
                  <span key={i} className={`h-2 flex-1 rounded-full ${on ? 'bg-rose-400' : 'bg-white/15'}`} />
                ))}
              </div>
              <div className="mt-2 text-[10px] text-white/45">1 of 3 strikes · interview ends at 3</div>
            </Card>
            <Card className="p-3.5">
              <div className="text-[12px] font-semibold">Monitored signals</div>
              {['Face presence', 'Multiple faces', 'Tab & focus', 'Microphone', 'Fullscreen exit'].map((n) => (
                <div key={n} className="mt-2 flex items-center justify-between text-[11px] text-white/60">
                  {n}
                  <span className="grid size-4 place-items-center rounded-full bg-emerald-400/20 text-[9px] text-emerald-300">✓</span>
                </div>
              ))}
            </Card>
            <Card className="flex-1 p-3.5">
              <Label>Integrity risk</Label>
              <div className="mt-1.5 text-[28px] font-semibold text-amber-300">Low</div>
              <div className="text-[10px] text-white/40">Shown to reviewers next to the score</div>
            </Card>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  )
}

export const mockById = {
  dashboard: DashboardMock,
  jobs: JobsMock,
  pipeline: PipelineMock,
  invite: InviteMock,
  candidate: CandidateMock,
  live: InterviewMock,
  interviews: TrackingMock,
  evaluation: EvaluationMock,
  analytics: AnalyticsMock,
  scheduling: SchedulingMock,
  proctoring: ProctoringMock,
} as const

export type MockId = keyof typeof mockById

export function Mock({ id }: { id: string }) {
  const C = mockById[id as MockId] ?? DashboardMock
  return <C />
}

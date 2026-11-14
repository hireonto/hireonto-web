'use client'

const NODES = [
  { label: 'Google Calendar', x: 90, y: 60 },
  { label: 'Google Meet', x: 90, y: 160 },
  { label: 'Microsoft Teams', x: 90, y: 260 },
  { label: 'Email invites', x: 510, y: 60 },
  { label: 'Phone calls', x: 510, y: 160 },
  { label: 'Voice & video', x: 510, y: 260 },
  { label: 'Secure storage', x: 300, y: 300 },
]

/** Animated hub-and-spoke diagram: HireOnto in the middle, integrations around it. */
export function FlowDiagram() {
  const cx = 300
  const cy = 160
  return (
    <svg viewBox="0 0 600 330" className="w-full" role="img" aria-label="HireOnto connects to Google Calendar, Google Meet, Microsoft Teams, email, phone, voice and video, and secure storage">
      <defs>
        <linearGradient id="hub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="0.55" stopColor="#6d28d9" />
          <stop offset="1" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      {NODES.map((n, i) => {
        const mx = n.x < cx ? cx - 110 : n.x > cx ? cx + 110 : cx
        const d = n.y === 300 ? `M${cx} ${cy + 28} L${n.x} ${n.y - 16}` : `M${cx} ${cy} C ${mx} ${cy}, ${mx} ${n.y}, ${n.x} ${n.y}`
        return (
          <g key={n.label}>
            <path d={d} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
            <path d={d} stroke="#a5b4fc" strokeWidth="1.5" fill="none" className="flow-dash" style={{ animationDelay: `${i * 0.15}s` }} />
            <circle r="3" fill="#c4b5fd">
              <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} keyPoints={n.x < cx ? '1;0' : '0;1'} keyTimes="0;1" calcMode="linear" />
            </circle>
          </g>
        )
      })}
      {NODES.map((n) => (
        <g key={`${n.label}-box`} transform={`translate(${n.x - 68} ${n.y - 16})`}>
          <rect width="136" height="32" rx="8" fill="#0d1b2e" stroke="rgba(255,255,255,0.14)" />
          <text x="68" y="20.5" textAnchor="middle" fontSize="11.5" fill="#e2e8f0" fontFamily="var(--font-geist-sans)">
            {n.label}
          </text>
        </g>
      ))}
      <g transform={`translate(${cx - 60} ${cy - 28})`}>
        <rect width="120" height="56" rx="14" fill="url(#hub)" />
        <text x="60" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="var(--font-geist-sans)">
          HireOnto
        </text>
      </g>
    </svg>
  )
}

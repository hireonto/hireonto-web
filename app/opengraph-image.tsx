import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const alt = `${site.name} — AI hiring platform`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Default social share card for every page. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(70% 90% at 85% 0%, rgba(109,40,217,0.55), transparent), #07070d',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 240 240">
            <defs>
              <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="52%" stopColor="#6D28D9" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
            </defs>
            <path d="M55 35h48L78 190H30L55 35Z" fill="url(#b)" />
            <path d="M137 35h48l-25 155h-48l25-155Z" fill="url(#b)" />
            <path d="M24 139c47-41 105-19 151-65 12-12 23-25 34-41-3 40-20 73-48 97-43 37-97 23-137 66-10 11-18 22-26 35 1-36 9-67 26-92Z" fill="#A78BFA" />
          </svg>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, letterSpacing: -1.5 }}>
            Hire<span style={{ color: '#a78bfa' }}>Onto</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, maxWidth: 950 }}>
            Screen, interview and decide — with AI that shows its work.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: 'rgba(255,255,255,0.6)' }}>
            Resume screening · AI voice interviews · Proctoring · Explainable evaluations
          </div>
        </div>
      </div>
    ),
    size,
  )
}

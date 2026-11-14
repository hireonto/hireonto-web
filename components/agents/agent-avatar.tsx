'use client'

import { useId } from 'react'
import type { AgentName } from './agent-bot'

/**
 * Friendly talent-acquisition avatar for each agent — a professional recruiter look
 * with a subtle AI touch. Onric: navy blazer, tie, glowing earpiece. Tovia: plum blazer,
 * shoulder-length hair, interviewer headset with a glowing mic. Both wear a HireOnto badge.
 */
export function AgentAvatar({ agent, className, title, animate = true }: { agent: AgentName; className?: string; title?: string; animate?: boolean }) {
  const uid = useId().replace(/[:]/g, '')
  const id = (k: string) => `av-${agent}-${k}-${uid}`
  const isT = agent === 'tovia'
  const c = isT
    ? { blazer1: '#6b2a74', blazer2: '#3b0f44', lapel: '#2c0a33', skin1: '#f3cfb3', skin2: '#dca783', hair1: '#5a2e1f', hair2: '#2e140c', accent: '#c084fc', glow: '#f0abfc', halo: '#e9d5ff' }
    : { blazer1: '#1e3a6e', blazer2: '#0f1f3d', lapel: '#0a1630', skin1: '#f1c9a5', skin2: '#d9a37c', hair1: '#3b2a20', hair2: '#1c120c', accent: '#60a5fa', glow: '#67e8f9', halo: '#dbeafe' }

  return (
    <svg viewBox="0 0 400 480" className={className} role="img" aria-label={title ?? (isT ? 'Tovia, HireOnto AI interviewer' : 'Onric, HireOnto AI hiring agent')}>
      <defs>
        <radialGradient id={id('halo')} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor={c.halo} stopOpacity="0.9" />
          <stop offset="1" stopColor={c.halo} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('blazer')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.blazer1} />
          <stop offset="1" stopColor={c.blazer2} />
        </linearGradient>
        <radialGradient id={id('skin')} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor={c.skin1} />
          <stop offset="1" stopColor={c.skin2} />
        </radialGradient>
        <linearGradient id={id('hair')} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={c.hair1} />
          <stop offset="1" stopColor={c.hair2} />
        </linearGradient>
        <linearGradient id={id('brand')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="0.55" stopColor="#6d28d9" />
          <stop offset="1" stopColor="#9333ea" />
        </linearGradient>
        <filter id={id('glow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="200" cy="230" r="175" fill={`url(#${id('halo')})`} />

      <g className={animate ? 'avatar-breathe' : undefined}>
        {/* back hair (Tovia) */}
        {isT && (
          <path
            d="M114 236 C100 156 140 102 200 102 C262 102 302 156 288 240 C298 292 296 336 280 360 C266 342 262 304 266 272 L134 272 C138 304 134 342 120 360 C104 336 102 292 114 236 Z"
            fill={`url(#${id('hair')})`}
          />
        )}

        {/* blazer + shirt */}
        <path d="M46 480 C52 410 108 372 200 366 C292 372 348 410 354 480 Z" fill={`url(#${id('blazer')})`} />
        <path d="M166 370 L200 440 L234 370 C222 365 178 365 166 370 Z" fill="#f8fafc" />
        <path d="M166 370 L186 406 L200 392 Z" fill="#e2e8f0" />
        <path d="M234 370 L214 406 L200 392 Z" fill="#e2e8f0" />
        {isT ? (
          <circle cx="200" cy="418" r="4" fill={c.accent} filter={`url(#${id('glow')})`} />
        ) : (
          <path d="M194 400 L206 400 L211 456 L200 470 L189 456 Z" fill={`url(#${id('brand')})`} />
        )}
        <path d="M148 380 L196 480 L172 480 L132 398 Z" fill={c.lapel} />
        <path d="M252 380 L204 480 L228 480 L268 398 Z" fill={c.lapel} />
        {/* badge */}
        <g transform="translate(256 422)">
          <rect width="58" height="30" rx="7" fill="#ffffff" />
          <rect x="6" y="8" width="14" height="14" rx="4" fill={`url(#${id('brand')})`} />
          <rect x="24" y="10" width="26" height="4" rx="2" fill="#0a2540" />
          <rect x="24" y="17" width="18" height="3" rx="1.5" fill="#94a3b8" />
        </g>

        {/* neck */}
        <path d="M178 312 L222 312 L227 370 C214 382 186 382 173 370 Z" fill={c.skin2} />

        {/* ears */}
        <ellipse cx="129" cy="236" rx="12" ry="18" fill={c.skin2} />
        <ellipse cx="271" cy="236" rx="12" ry="18" fill={c.skin2} />

        {/* head */}
        <path d="M128 220 C128 160 160 132 200 132 C240 132 272 160 272 220 C272 286 244 322 200 326 C156 322 128 286 128 220 Z" fill={`url(#${id('skin')})`} />

        {/* hair (front) */}
        {isT ? (
          <path d="M126 222 C126 156 162 116 206 116 C250 116 276 152 276 212 C262 182 238 162 212 158 C192 182 160 198 126 222 Z" fill={`url(#${id('hair')})`} />
        ) : (
          <>
            <path d="M124 218 C116 150 152 108 206 108 C258 108 288 144 278 212 C274 194 266 178 254 168 C232 178 192 178 166 160 C152 176 138 192 130 220 Z" fill={`url(#${id('hair')})`} />
            <path d="M170 150 C196 162 228 162 252 152" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* brows */}
        <g stroke={c.hair2} strokeWidth="4" strokeLinecap="round" fill="none">
          <path d={isT ? 'M160 196 Q172 189 184 194' : 'M158 196 Q171 188 185 193'} />
          <path d={isT ? 'M216 194 Q228 189 240 196' : 'M215 193 Q229 188 242 196'} />
        </g>

        {/* eyes */}
        <g className={animate ? 'bot-blink' : undefined}>
          <ellipse cx="172" cy="215" rx="7" ry="8.5" fill="#1f2937" />
          <ellipse cx="228" cy="215" rx="7" ry="8.5" fill="#1f2937" />
          <circle cx="174.5" cy="212" r="2.3" fill="#ffffff" />
          <circle cx="230.5" cy="212" r="2.3" fill="#ffffff" />
        </g>
        {isT && (
          <g stroke="#1f2937" strokeWidth="2" strokeLinecap="round">
            <path d="M164 208 l-4 -3" />
            <path d="M236 208 l4 -3" />
          </g>
        )}

        {/* nose, cheeks, smile */}
        <path d="M200 224 C197 240 194 249 199 253 C203 255 207 253 208 250" stroke="#b07a58" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="158" cy="252" rx="13" ry="7" fill="#f472b6" opacity="0.22" />
        <ellipse cx="242" cy="252" rx="13" ry="7" fill="#f472b6" opacity="0.22" />
        <path d="M176 272 Q200 298 224 272 Q200 284 176 272 Z" fill={isT ? '#9d174d' : '#7c2d12'} />
        <path d="M182 274 Q200 285 218 274 Q200 279 182 274 Z" fill="#ffffff" />

        {/* AI gear */}
        {isT ? (
          <>
            <path d="M126 230 C122 142 158 98 200 98 C242 98 278 142 274 230" stroke="#1e1b4b" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="127" cy="238" r="17" fill="#1e1b4b" />
            <circle cx="273" cy="238" r="17" fill="#1e1b4b" />
            <circle cx="273" cy="238" r="9" fill={c.accent} opacity="0.85" />
            <circle cx="127" cy="238" r="9" fill={c.accent} opacity="0.85" />
            <path d="M276 254 C282 286 256 298 228 292" stroke="#1e1b4b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="225" cy="292" r="5.5" fill={c.glow} filter={`url(#${id('glow')})`} className={animate ? 'bot-glow' : undefined} />
          </>
        ) : (
          <>
            <rect x="266" y="226" width="12" height="24" rx="6" fill="#0b1020" />
            <circle cx="272" cy="234" r="3.5" fill={c.glow} filter={`url(#${id('glow')})`} className={animate ? 'bot-glow' : undefined} />
          </>
        )}
      </g>
    </svg>
  )
}

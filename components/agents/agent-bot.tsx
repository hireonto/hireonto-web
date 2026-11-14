'use client'

import { useId } from 'react'

export type AgentName = 'onric' | 'tovia'

/**
 * HireOnto agents as professional, semi-realistic vector portraits (chest-up).
 * Onric: short side-parted hair, light stubble, navy blazer, open white collar, earpiece.
 * Tovia: long straight light-brown hair, black blazer, fine necklace, slim interview mic.
 */
export function AgentBot({ agent, className, animate = true, title }: { agent: AgentName; className?: string; animate?: boolean; title?: string }) {
  const uid = useId().replaceAll(':', '')
  const id = (k: string) => `pp-${agent}-${k}-${uid}`
  const isT = agent === 'tovia'
  const a = (cls: string) => (animate ? cls : undefined)

  const eye = (cx: number, flip: boolean) => {
    const l = cx - 8
    const r = cx + 8
    const s = flip ? -1 : 1
    return (
      <g key={cx}>
        <path d={`M${l} 85 C${l + 4} 81 ${r - 4} 81 ${r} 85 C${r - 4} 88.4 ${l + 4} 88.4 ${l} 85 Z`} fill="#fbf8f6" />
        <circle cx={cx + 0.4 * s} cy="84.7" r="3.7" fill={`url(#${id('iris')})`} />
        <circle cx={cx + 0.4 * s} cy="84.7" r="1.7" fill="#120b08" />
        <circle cx={cx + 1.6 * s} cy="83.5" r="0.9" fill="#ffffff" />
        <path d={`M${l - 0.6} 85.2 C${l + 4} 80.4 ${r - 4} 80.4 ${r + 0.6} 85.2`} stroke="#2e1f18" strokeWidth={isT ? 1.9 : 1.5} fill="none" strokeLinecap="round" />
        <path d={`M${l + 1.4} 81.4 C${l + 5} 78.8 ${r - 5} 78.8 ${r - 1.4} 81.4`} stroke="#b9826a" strokeWidth="0.8" fill="none" opacity="0.7" />
        <path d={`M${l + 1.5} 87.6 C${l + 5} 89.2 ${r - 5} 89.2 ${r - 1.5} 87.6`} stroke="#c99a84" strokeWidth="0.6" fill="none" opacity="0.6" />
        {isT && <path d={`M${flip ? l - 0.4 : r + 0.4} 84.8 l${2.2 * (flip ? -1 : 1)} -1.6`} stroke="#2e1f18" strokeWidth="1.1" strokeLinecap="round" />}
      </g>
    )
  }

  return (
    <svg viewBox="0 0 200 222" className={className} role="img" aria-label={title ?? (isT ? 'Tovia, the HireOnto AI interviewer' : 'Onric, the HireOnto AI hiring agent')}>
      <defs>
        <radialGradient id={id('skin')} cx="0.45" cy="0.42" r="0.68">
          <stop offset="0" stopColor="#f8dccb" />
          <stop offset="0.65" stopColor="#efc3a8" />
          <stop offset="1" stopColor="#dca286" />
        </radialGradient>
        <linearGradient id={id('neck')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c98a6e" />
          <stop offset="0.35" stopColor="#e3ac90" />
          <stop offset="1" stopColor="#efc0a5" />
        </linearGradient>
        <linearGradient id={id('hair')} x1="0.3" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={isT ? '#caa077' : '#4a3424'} />
          <stop offset="0.5" stopColor={isT ? '#a97c52' : '#35231a'} />
          <stop offset="1" stopColor={isT ? '#7d5634' : '#24170f'} />
        </linearGradient>
        <linearGradient id={id('suit')} x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={isT ? '#2a2a33' : '#2a3a63'} />
          <stop offset="1" stopColor={isT ? '#0f0f14' : '#141d36'} />
        </linearGradient>
        <linearGradient id={id('lapel')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={isT ? '#34343f' : '#33467a'} />
          <stop offset="1" stopColor={isT ? '#18181f' : '#1a2647'} />
        </linearGradient>
        <radialGradient id={id('iris')} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor={isT ? '#8b5e3c' : '#6f8ca6'} />
          <stop offset="1" stopColor={isT ? '#3b2213' : '#2b3c50'} />
        </radialGradient>
        <filter id={id('blur')}>
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={id('shadow')} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#2a1420" floodOpacity="0.22" />
        </filter>
        <filter id={id('glow')} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className={a('avatar-breathe')}>
        {/* back hair */}
        {isT && <path d="M62 82 C60 50 78 34 100 34 C124 34 141 50 139 82 C142 122 145 168 150 206 L50 206 C55 168 58 122 62 82 Z" fill={`url(#${id('hair')})`} />}

        {/* suit */}
        <g filter={`url(#${id('shadow')})`} transform="translate(0 -20)">
          <path d="M14 240 C18 204 46 186 82 180 L118 180 C154 186 182 204 186 240 Z" fill={`url(#${id('suit')})`} />
          {isT ? (
            <>
              <path d="M86 180 L100 212 L114 180 Z" fill="#e9b89c" />
              <path d="M88 184 Q100 204 112 184" stroke="#e8d7ad" strokeWidth="1.3" fill="none" />
              <circle cx="100" cy="199" r="1.8" fill="#f3e6c4" />
            </>
          ) : (
            <>
              <path d="M84 180 L100 222 L116 180 C110 176 90 176 84 180 Z" fill="#f4f6fb" />
              <path d="M84 180 L94 204 L100 192 Z M116 180 L106 204 L100 192 Z" fill="#dfe4ee" />
              <path d="M100 192 L100 240" stroke="#d3d9e6" strokeWidth="1" />
            </>
          )}
          <path d="M82 180 L100 222 L90 240 L62 240 C66 214 72 194 82 180 Z" fill={`url(#${id('lapel')})`} />
          <path d="M118 180 L100 222 L110 240 L138 240 C134 214 128 194 118 180 Z" fill={`url(#${id('lapel')})`} />
          <path d="M82 180 L100 222" stroke="#000" strokeOpacity="0.25" strokeWidth="1" />
          <path d="M118 180 L100 222" stroke="#000" strokeOpacity="0.25" strokeWidth="1" />
        </g>

        {/* neck */}
        <path d="M88 122 L112 122 L114.5 164 C107 171 93 171 85.5 164 Z" fill={`url(#${id('neck')})`} />

        {/* ears */}
        {!isT && (
          <>
            <ellipse cx="69.5" cy="90" rx="5" ry="9" fill="#e2a98c" />
            <ellipse cx="130.5" cy="90" rx="5" ry="9" fill="#e2a98c" />
          </>
        )}

        {/* face */}
        <path
          d={isT ? 'M72 84 C72 60 84 46 100 46 C116 46 128 60 128 84 C128 104 122 118 112 126 C106 131 94 131 88 126 C78 118 72 104 72 84 Z' : 'M70 84 C70 58 84 44 100 44 C116 44 130 58 130 84 C130 106 124 120 112 128 C106 132 94 132 88 128 C76 120 70 106 70 84 Z'}
          fill={`url(#${id('skin')})`}
        />
        {/* jaw + side shading */}
        <path d="M72 92 C74 110 82 122 92 128 C84 126 76 116 72 100 Z" fill="#b97a5e" opacity="0.18" />
        <path d="M128 92 C126 110 118 122 108 128 C116 126 124 116 128 100 Z" fill="#b97a5e" opacity="0.18" />
        {!isT && <path d="M78 104 C80 120 90 130 100 131 C110 130 120 120 122 104 C116 116 108 122 100 122 C92 122 84 116 78 104 Z M90 111 C95 109 105 109 110 111 C106 113 94 113 90 111 Z" fill="#6b4a38" opacity="0.16" />}

        {/* cheeks */}
        <ellipse cx="84" cy="101" rx="7" ry="4" fill="#ee9a8f" opacity={isT ? 0.28 : 0.14} filter={`url(#${id('blur')})`} />
        <ellipse cx="116" cy="101" rx="7" ry="4" fill="#ee9a8f" opacity={isT ? 0.28 : 0.14} filter={`url(#${id('blur')})`} />

        {/* brows */}
        <g fill={isT ? '#6e4a30' : '#2c1d14'}>
          <path d={isT ? 'M80 77 C85 72.6 92 72.4 96 74.4 C92 74.6 86 75.6 81.2 78.6 Z' : 'M79 77 C84 72 92 71.6 97 73.6 C92 74.6 86 75.6 80 79.4 Z'} />
          <path d={isT ? 'M120 77 C115 72.6 108 72.4 104 74.4 C108 74.6 114 75.6 118.8 78.6 Z' : 'M121 77 C116 72 108 71.6 103 73.6 C108 74.6 114 75.6 120 79.4 Z'} />
        </g>

        {/* eyes */}
        <g className={a('bot-blink')}>
          {eye(88, true)}
          {eye(112, false)}
        </g>

        {/* nose */}
        <path d="M98.5 88 C97.6 95 96.6 101 95.4 105" stroke="#c48a6e" strokeWidth="0.9" fill="none" opacity="0.6" />
        <path d="M94.2 107.6 C96 110.6 104 110.6 105.8 107.6" stroke="#ad7058" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M95.8 107.8 q1.4 1 2.4 0.2 M104.2 107.8 q-1.4 1 -2.4 0.2" stroke="#9a5f49" strokeWidth="1" fill="none" strokeLinecap="round" />
        <ellipse cx="100.6" cy="103.6" rx="2.6" ry="1.8" fill="#ffffff" opacity="0.25" />

        {/* lips */}
        <path d="M90.6 116 C93.8 113.4 97.2 113.4 100 114.6 C102.8 113.4 106.2 113.4 109.4 116 C105 117.2 95 117.2 90.6 116 Z" fill={isT ? '#c2616a' : '#a8645d'} />
        <path d="M91.6 116.4 C95.6 121.6 104.4 121.6 108.4 116.4 C104 117.6 96 117.6 91.6 116.4 Z" fill={isT ? '#d47a80' : '#bd7a70'} />
        <path d="M96 118.6 C98.6 119.6 101.4 119.6 104 118.6" stroke="#ffffff" strokeWidth="0.9" opacity="0.35" fill="none" strokeLinecap="round" />
        <path d="M89.6 115.4 q-1 0.2 -1.6 -0.8 M110.4 115.4 q1 0.2 1.6 -0.8" stroke="#a35a56" strokeWidth="0.9" fill="none" strokeLinecap="round" />

        {/* front hair */}
        {isT ? (
          <>
            <path d="M70 94 C66 58 82 40 102 40 C122 40 136 56 132 94 C128 76 120 62 108 56 C103 62 97 64 91 62 C83 66 75 78 70 94 Z" fill={`url(#${id('hair')})`} />
            <path d="M70 88 C67 116 64 150 62 214 L76 210 C73 170 73 128 76 96 Z" fill={`url(#${id('hair')})`} />
            <path d="M130 88 C133 116 136 150 138 214 L124 210 C127 170 127 128 124 96 Z" fill={`url(#${id('hair')})`} />
            <g stroke="#e6c294" strokeLinecap="round" fill="none" opacity="0.55">
              <path d="M84 50 C92 44 108 44 116 48" strokeWidth="2.2" />
              <path d="M70 110 C68 140 66 170 66 200" strokeWidth="1.2" />
              <path d="M131 110 C133 140 134 170 134 200" strokeWidth="1.2" />
            </g>
            <circle cx="128.6" cy="97" r="1.6" fill="#f3e6c4" />
            {/* slim interview mic */}
            <path d="M129 100 C132 109 128 114 120 116" stroke="#26262e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="119" cy="116.4" r="2" fill="#a855f7" filter={`url(#${id('glow')})`} className={a('bot-glow')} />
          </>
        ) : (
          <>
            <path d="M68 86 C63 52 82 33 102 33 C124 33 139 50 133 86 C130 70 126 60 118 54 C106 58 88 58 77 51 C71 60 68 72 68 86 Z" fill={`url(#${id('hair')})`} />
            <path d="M80 42 C92 30 116 30 128 42 C116 38 98 38 84 46 Z" fill={`url(#${id('hair')})`} />
            <path d="M88 38 C96 33 110 33 118 37" stroke="#7a5a42" strokeWidth="1.6" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M84 49 L82 42" stroke="#1a110b" strokeWidth="1" opacity="0.6" />
            {/* earpiece */}
            <rect x="129.5" y="85" width="5" height="9" rx="2.5" fill="#111827" />
            <circle cx="132" cy="88" r="1.4" fill="#67e8f9" filter={`url(#${id('glow')})`} className={a('bot-glow')} />
          </>
        )}
      </g>
    </svg>
  )
}

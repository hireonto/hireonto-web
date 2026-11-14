import { useId, type ReactNode } from 'react'

/** Sticker palette: bright flat fills, black details, thick white sticker outline. */
export const STICKER = { blue: '#0ea5ff', green: '#13f095', orange: '#ff6a00', purple: '#8b80ff', ink: '#0b0b0f', white: '#ffffff' } as const

export type StickerName =
  | 'screening'
  | 'shortlist'
  | 'interview'
  | 'onric'
  | 'evaluation'
  | 'schedule'
  | 'proctoring'
  | 'analytics'
  | 'invite'
  | 'team'
  | 'chat'
  | 'pipeline'

const { blue, green, orange, purple, ink, white } = STICKER
const line = { stroke: ink, strokeWidth: 3.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }

/* ── face parts ── */
const Eyes = ({ x, y, gap = 13 }: { x: number; y: number; gap?: number }) => (
  <g fill={ink}>
    <circle cx={x} cy={y} r="3.4" />
    <circle cx={x + gap} cy={y} r="3.4" />
  </g>
)
const HappyEyes = ({ x, y, gap = 13 }: { x: number; y: number; gap?: number }) => (
  <g {...line}>
    <path d={`M${x - 4} ${y + 1} q4 -5 8 0`} />
    <path d={`M${x + gap - 4} ${y + 1} q4 -5 8 0`} />
  </g>
)
const Smile = ({ x, y, w = 16 }: { x: number; y: number; w?: number }) => <path {...line} d={`M${x} ${y} q${w / 2} ${w * 0.55} ${w} 0`} />
const Shades = ({ x, y, w = 22 }: { x: number; y: number; w?: number }) => <rect x={x} y={y} width={w} height="7" rx="3.5" fill={ink} />
const Sparkle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path d={`M${x} ${y - 9 * s} C${x + 1.5 * s} ${y - 2 * s} ${x + 2 * s} ${y - 1.5 * s} ${x + 9 * s} ${y} C${x + 2 * s} ${y + 1.5 * s} ${x + 1.5 * s} ${y + 2 * s} ${x} ${y + 9 * s} C${x - 1.5 * s} ${y + 2 * s} ${x - 2 * s} ${y + 1.5 * s} ${x - 9 * s} ${y} C${x - 2 * s} ${y - 1.5 * s} ${x - 1.5 * s} ${y - 2 * s} ${x} ${y - 9 * s} Z`} fill={ink} />
)
/** Blob character: rounded head, flat base, one sloped side. */
const blob = (x: number, y: number, w: number, h: number, slope = 0.35) =>
  `M${x} ${y + h} L${x} ${y + w * 0.5} C${x} ${y + w * 0.12} ${x + w * 0.22} ${y} ${x + w * 0.45} ${y} C${x + w * 0.66} ${y} ${x + w * 0.8} ${y + w * 0.14} ${x + w * 0.86} ${y + w * 0.32} L${x + w * (1 + slope * 0.4)} ${y + h} Z`

const ART: Record<StickerName, ReactNode> = {
  screening: (
    <>
      <rect x="54" y="14" width="46" height="58" rx="9" fill={purple} transform="rotate(8 77 43)" />
      <g stroke={white} strokeWidth="4" strokeLinecap="round" transform="rotate(8 77 43)">
        <path d="M64 30h26" />
        <path d="M64 41h20" />
        <path d="M64 52h24" />
      </g>
      <path d={blob(12, 34, 56, 72)} fill={blue} />
      <Eyes x={28} y={58} />
      <Smile x={27} y={68} w={17} />
      <circle cx="94" cy="78" r="15" fill={green} />
      <path {...line} d="M87 78l5 5 9-10" />
    </>
  ),
  shortlist: (
    <>
      <path d="M58 16h36a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12H76l-12 10 2-10h-8a12 12 0 0 1-12-12V28a12 12 0 0 1 12-12Z" fill={green} />
      <path {...line} d="M66 39l8 8 14-15" />
      <path d={blob(12, 42, 58, 64)} fill={orange} />
      <HappyEyes x={30} y={66} />
      <Smile x={28} y={75} w={17} />
      <Sparkle x={86} y={88} s={1.1} />
      <circle cx="102" cy="74" r="3.5" fill={ink} />
    </>
  ),
  interview: (
    <>
      <path d="M66 22h34a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10h-6l2 12-14-12H66a10 10 0 0 1-10-10V32a10 10 0 0 1 10-10Z" fill={green} />
      <g fill={ink}>
        <circle cx="72" cy="42" r="3.6" />
        <circle cx="83" cy="42" r="3.6" />
        <circle cx="94" cy="42" r="3.6" />
      </g>
      <path d={blob(10, 36, 62, 70)} fill={purple} />
      <path d="M14 70 C12 44 26 32 42 32 C58 32 70 44 68 66" stroke={ink} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="8" y="62" width="10" height="18" rx="5" fill={ink} />
      <path {...line} d="M15 80 C16 92 26 96 36 94" />
      <circle cx="38" cy="94" r="3.5" fill={ink} />
      <Eyes x={30} y={64} />
      <Smile x={29} y={74} w={16} />
    </>
  ),
  onric: (
    <>
      <rect x="62" y="30" width="44" height="52" rx="10" fill={green} transform="rotate(-8 84 56)" />
      <g {...line} transform="rotate(-8 84 56)">
        <path d="M70 44l3 3 6-6" />
        <path d="M84 44h14" />
        <path d="M70 60l3 3 6-6" />
        <path d="M84 60h12" />
      </g>
      <path d="M40 30 L40 14" stroke={ink} strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="40" cy="12" r="5" fill={orange} />
      <path d={blob(12, 30, 60, 76)} fill={blue} />
      <Shades x={24} y={54} w={26} />
      <Smile x={28} y={70} w={17} />
    </>
  ),
  evaluation: (
    <>
      <circle cx="84" cy="38" r="24" fill={orange} />
      <path d="M84 24l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3L84 47.6l-9.3 4.9 1.8-10.3L69 34.9l10.4-1.5Z" fill={ink} />
      <path d={blob(12, 44, 60, 62)} fill={green} />
      <g {...line}>
        <path d="M27 69 q4 -5 8 0" />
      </g>
      <circle cx="44" cy="68" r="3.4" fill={ink} />
      <Smile x={27} y={78} w={18} />
      <Sparkle x={100} y={84} s={0.9} />
    </>
  ),
  schedule: (
    <>
      <rect x="48" y="16" width="60" height="58" rx="11" fill={purple} />
      <rect x="48" y="16" width="60" height="16" rx="8" fill={ink} />
      <g fill={white}>
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={58 + c * 16} y={40 + r * 11} width="8" height="6" rx="2" opacity={r === 1 && c === 1 ? 1 : 0.55} />))}
      </g>
      <rect x="74" y="51" width="8" height="6" rx="2" fill={green} />
      <path d={blob(12, 52, 52, 54)} fill={orange} />
      <Eyes x={26} y={72} gap={12} />
      <Smile x={25} y={81} w={15} />
    </>
  ),
  proctoring: (
    <>
      <path d="M80 14 L104 22 V44 C104 60 94 70 80 76 C66 70 56 60 56 44 V22 Z" fill={purple} />
      <ellipse cx="80" cy="44" rx="13" ry="8" fill={white} />
      <circle cx="80" cy="44" r="5" fill={ink} />
      <path d={blob(10, 40, 62, 66)} fill={orange} />
      <Shades x={24} y={64} w={28} />
      <Smile x={30} y={80} w={14} />
    </>
  ),
  analytics: (
    <>
      <rect x="44" y="18" width="64" height="56" rx="11" fill={blue} />
      <g fill={white}>
        <rect x="56" y="48" width="9" height="16" rx="3" />
        <rect x="71" y="38" width="9" height="26" rx="3" />
        <rect x="86" y="28" width="9" height="36" rx="3" />
      </g>
      <path d={blob(12, 54, 54, 52)} fill={green} />
      <HappyEyes x={27} y={74} gap={12} />
      <Smile x={26} y={83} w={15} />
    </>
  ),
  invite: (
    <>
      <g transform="rotate(-10 78 44)">
        <rect x="50" y="22" width="58" height="42" rx="9" fill={green} />
        <path {...line} d="M54 28 L79 46 L104 28" />
      </g>
      <path d={blob(12, 42, 58, 64)} fill={blue} />
      <Eyes x={28} y={66} />
      <Smile x={27} y={76} w={17} />
      <Sparkle x={98} y={84} s={1} />
      <circle cx="84" cy="94" r="3.5" fill={ink} />
    </>
  ),
  team: (
    <>
      <path d={blob(10, 26, 60, 80)} fill={orange} />
      <Eyes x={26} y={52} />
      <Smile x={25} y={62} w={17} />
      <path d={blob(54, 46, 46, 60, 0.2)} fill={blue} />
      <Shades x={64} y={66} w={22} />
      <Sparkle x={66} y={26} s={1.1} />
      <circle cx="80" cy="34" r="3.5" fill={ink} />
    </>
  ),
  chat: (
    <>
      <path d="M18 18h50a10 10 0 0 1 10 10v30a10 10 0 0 1-10 10H40l-14 12 3-12h-11a10 10 0 0 1-10-10V28a10 10 0 0 1 10-10Z" fill={purple} />
      <HappyEyes x={32} y={38} gap={16} />
      <Smile x={33} y={48} w={18} />
      <path d="M66 58h32a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8h-4l2 9-11-9H66a8 8 0 0 1-8-8V66a8 8 0 0 1 8-8Z" fill={orange} />
      <Smile x={74} y={74} w={14} />
      <ellipse cx="60" cy="110" rx="34" ry="5" fill={ink} />
    </>
  ),
  pipeline: (
    <>
      <path d={blob(8, 66, 34, 40)} fill={green} />
      <Smile x={16} y={88} w={12} />
      <path d={blob(40, 44, 36, 62)} fill={blue} />
      <Eyes x={50} y={66} gap={11} />
      <path d={blob(74, 22, 36, 84, 0.1)} fill={purple} />
      <HappyEyes x={84} y={44} gap={11} />
      <Smile x={84} y={54} w={12} />
    </>
  ),
}

/** Hiring-themed sticker icon with a white die-cut outline and soft shadow. */
export function Sticker({ name, size = 48, className, title }: { name: StickerName; size?: number; className?: string; title?: string }) {
  const fid = `st-${useId().replace(/[:]/g, '')}`
  return (
    <svg viewBox="-6 -6 132 132" width={size} height={size} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <filter id={fid} x="-25%" y="-25%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d" />
          <feFlood floodColor="#ffffff" />
          <feComposite in2="d" operator="in" result="outline" />
          <feGaussianBlur in="d" stdDeviation="3" result="b" />
          <feOffset in="b" dy="3" result="o" />
          <feFlood floodColor="#0b1020" floodOpacity="0.16" />
          <feComposite in2="o" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${fid})`}>{ART[name]}</g>
    </svg>
  )
}

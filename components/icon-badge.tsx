import type { LucideIcon } from 'lucide-react'
import { BrandIcon, type BrandIconName } from './ui'

const tones = {
  violet: 'bg-[#635bff]/10 text-[#635bff]',
  sky: 'bg-[#00d4ff]/15 text-[#0073e6]',
  emerald: 'bg-emerald-500/10 text-emerald-700',
  indigo: 'bg-indigo-500/10 text-indigo-700',
} as const

/** Pass `brand` for a HireOnto brand-kit icon, or `icon` for a Lucide fallback. */
export function IconBadge({
  icon: Icon,
  brand,
  tone = 'violet',
  size = 'md',
}: {
  icon?: LucideIcon
  brand?: BrandIconName
  tone?: keyof typeof tones
  size?: 'sm' | 'md' | 'lg'
}) {
  const dim = size === 'sm' ? 'size-9' : size === 'lg' ? 'size-12' : 'size-10'
  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 24 : 20
  if (brand) {
    return (
      <span className={`inline-flex ${dim} items-center justify-center`}>
        <BrandIcon name={brand} size={iconSize} />
      </span>
    )
  }
  return (
    <span className={`inline-flex ${dim} items-center justify-center rounded-lg ${tones[tone]}`}>
      {Icon && <Icon size={iconSize} strokeWidth={1.75} aria-hidden />}
    </span>
  )
}

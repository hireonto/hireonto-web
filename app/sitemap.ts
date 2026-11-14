import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'
import { site } from '@/lib/site'
import { solutions } from '@/lib/solutions'

const core: { path: string; priority: number; freq: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1, freq: 'weekly' },
  { path: '/agents', priority: 0.9, freq: 'monthly' },
  { path: '/features', priority: 0.9, freq: 'monthly' },
  { path: '/how-it-works', priority: 0.9, freq: 'monthly' },
  { path: '/pricing', priority: 0.9, freq: 'monthly' },
  { path: '/demo', priority: 0.8, freq: 'monthly' },
  { path: '/security', priority: 0.7, freq: 'monthly' },
  { path: '/faq', priority: 0.7, freq: 'monthly' },
  { path: '/about', priority: 0.6, freq: 'monthly' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
  { path: '/cookies', priority: 0.3, freq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-11-14'
  const pages = [
    ...core,
    ...products.map((p) => ({ path: `/product/${p.slug}`, priority: 0.8, freq: 'monthly' as const })),
    ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.8, freq: 'monthly' as const })),
  ]
  return pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified, changeFrequency: p.freq, priority: p.priority }))
}

import type { Metadata } from 'next'
import { site } from './site'

export function pageMeta(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  // Root layout's title template appends "| HireOnto"; social titles carry it explicitly.
  const title = `${opts.title} | ${site.name}`
  const url = `${site.url}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: opts.description,
    },
    robots: { index: true, follow: true },
  }
}

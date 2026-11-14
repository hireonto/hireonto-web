import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { PageBackdrop } from '@/components/page-backdrop'
import { OrganizationJsonLd, SoftwareJsonLd } from '@/components/json-ld'
import { site } from '@/lib/site'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI hiring pipeline with guardrails`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/brand/app-icon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <PageBackdrop />
        <OrganizationJsonLd />
        <SoftwareJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

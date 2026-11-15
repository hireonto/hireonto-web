'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { menus, site } from '@/lib/site'
import { BrandIcon, BrandMark, LinkButton, type BrandIconName } from './ui'

type MenuItem = { href: string; label: string; desc: string; icon?: BrandIconName }

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(null)
    setMobile(false)
  }

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-stripe-border/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-8">
          <BrandMark />
          <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {menus.map((menu) => {
              const isOpen = open === menu.label
              const items = menu.items as readonly MenuItem[]
              return (
                <div key={menu.label} className="relative" onMouseEnter={() => setOpen(menu.label)} onMouseLeave={() => setOpen(null)}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : menu.label)}
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition ${isOpen ? 'text-ink' : 'text-muted hover:text-ink'}`}
                  >
                    {menu.label}
                    <ChevronDown className={`size-3.5 transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className={`grid gap-1 rounded-2xl border border-stripe-border bg-white p-2 shadow-[0_20px_50px_-12px_rgba(16,25,54,0.25)] ${items.length > 5 ? 'w-[560px] grid-cols-2' : 'w-[320px]'}`}>
                        {items.map((item) => (
                          <Link key={item.href} href={item.href} className="group flex gap-3 rounded-xl p-3 transition hover:bg-stripe-surface">
                            <span className="grid size-9 shrink-0 place-items-center">
                              <BrandIcon name={item.icon ?? 'ai-hiring-agent'} size={18} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink">{item.label}</span>
                              <span className="mt-0.5 block text-xs leading-snug text-muted">{item.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            <Link
              href="/pricing"
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${pathname === '/pricing' ? 'text-ink' : 'text-muted hover:text-ink'}`}
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <LinkButton href={site.loginUrl} newTab variant="ghost" className="text-sm">
            Sign in
          </LinkButton>
          <LinkButton href="/demo" className="text-sm">
            Book a demo
          </LinkButton>
        </div>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-stripe-border text-ink lg:hidden"
          aria-expanded={mobile}
          aria-label={mobile ? 'Close menu' : 'Open menu'}
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobile && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-stripe-border bg-white px-4 py-3 lg:hidden">
          {menus.map((menu) => {
            const isOpen = mobileSection === menu.label
            return (
              <div key={menu.label} className="border-b border-stripe-border/70">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setMobileSection(isOpen ? null : menu.label)}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold text-ink"
                >
                  {menu.label}
                  <ChevronDown className={`size-4 text-muted transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="space-y-0.5 pb-3">
                    {(menu.items as readonly MenuItem[]).map((item) => (
                      <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-ink hover:bg-stripe-surface">
                        <BrandIcon name={item.icon ?? 'ai-hiring-agent'} size={16} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <Link href="/pricing" className="block border-b border-stripe-border/70 py-3.5 text-[15px] font-semibold text-ink">
            Pricing
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-2 pb-2">
            <LinkButton href={site.loginUrl} newTab variant="outline" className="w-full">
              Sign in
            </LinkButton>
            <LinkButton href="/demo" className="w-full">
              Book a demo
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  )
}

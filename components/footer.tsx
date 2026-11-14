import Link from 'next/link'
import { footerLegal, menus, site } from '@/lib/site'
import { BrandMark, LinkButton } from './ui'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stripe-border bg-stripe-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <LinkButton href="/demo" className="text-sm">
                Book a demo
              </LinkButton>
              <LinkButton href="/how-it-works" variant="outline" className="text-sm">
                How it works
              </LinkButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {menus.map((menu) => (
              <div key={menu.label}>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{menu.label}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {menu.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-ink/80 transition hover:text-[#6d28d9]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[{ href: '/pricing', label: 'Pricing' }, { href: '/demo', label: 'Contact sales' }, { href: site.appUrl, label: 'Sign in' }].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-ink/80 transition hover:text-[#6d28d9]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-stripe-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:px-6">
          <span>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegal.map((item) => (
              <Link key={item.href} href={item.href} className="uppercase tracking-wider hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

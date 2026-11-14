import type { Faq } from '@/lib/products'

/** Accessible FAQ using native <details>. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-stripe-border rounded-2xl border border-stripe-border bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-5 md:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
            {f.q}
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-stripe-border text-muted transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

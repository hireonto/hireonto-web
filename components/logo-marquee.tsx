'use client'

const logos = ['Acme Corp', 'Northwind', 'Globex', 'Initech', 'Umbrella', 'Stark Industries', 'Wayne Ent.']

export function LogoMarquee() {
  const row = [...logos, ...logos]
  return (
    <div className="marquee-mask overflow-hidden border-y border-stripe-border bg-white py-10">
      <div className="animate-marquee flex w-max gap-14">
        {row.map((name, i) => (
          <span key={`${name}-${i}`} className="whitespace-nowrap text-sm font-medium text-muted/70">
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

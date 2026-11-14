'use client'

import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { heroVideo, tourChapters } from '@/lib/product-tour'

/** Autoplaying product video with clickable chapter chips. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const onTime = () => {
    const t = ref.current?.currentTime ?? 0
    let i = 0
    tourChapters.forEach((c, idx) => {
      if (t >= c.start) i = idx
    })
    if (i !== active) setActive(i)
  }

  const seek = (i: number) => {
    const v = ref.current
    if (!v) return
    v.currentTime = tourChapters[i].start + 0.05
    setActive(i)
    if (v.paused) void v.play().catch(() => {})
  }

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) void v.play().catch(() => {})
    else v.pause()
  }

  return (
    <div>
      <div className="relative rounded-2xl bg-gradient-to-br from-[#2563eb] via-[#6d28d9] to-[#9333ea] p-px shadow-[0_40px_120px_-30px_rgba(109,40,217,0.55)]">
        <div className="overflow-hidden rounded-[15px] bg-[#07070d]">
          <video
            ref={ref}
            className="block aspect-[16/10] w-full"
            src={heroVideo.src}
            poster={heroVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={onTime}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            aria-label="HireOnto product walkthrough: dashboard, AI shortlist, invites, candidate experience, AI interview, evaluation and analytics"
          />
        </div>
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          aria-label={paused ? 'Play video' : 'Pause video'}
        >
          {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>
      </div>

      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0" role="tablist" aria-label="Video chapters">
        {tourChapters.map((c, i) => (
          <button
            key={c.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => seek(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              i === active ? 'border-ink bg-ink text-white' : 'border-stripe-border bg-white text-muted hover:border-ink/30 hover:text-ink'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}

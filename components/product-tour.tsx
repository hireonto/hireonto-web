'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { PlayCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { tourVideo, type ProductStory } from '@/lib/product-tour'
import { Mock } from './mocks/mocks'

/** HTML/CSS product illustration for a story (no screenshots). */
export function ShotStack({ story }: { story: ProductStory; priority?: boolean }) {
  return <Mock id={story.id} />
}

/** "Watch the tour" button + modal with the MP4 walkthrough. */
export function TourVideoButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#0a2540] shadow-[0_8px_30px_-8px_rgba(147,51,234,0.6)] transition hover:bg-white/90 ${className ?? ''}`}
      >
        <PlayCircle className="size-[18px] text-[#6d28d9]" /> Watch the product tour
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="HireOnto product tour video"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-11 right-0 grid size-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>
              <video
                ref={videoRef}
                src={tourVideo.src}
                poster={tourVideo.poster}
                className="aspect-[16/10] w-full rounded-xl border border-white/10 bg-black"
                controls
                autoPlay
                playsInline
                muted
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

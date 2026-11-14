'use client'

import { useEffect, useRef } from 'react'

const RIBBONS = [
  { colors: ['#2563eb', '#7c3aed'], amp: 70, freq: 0.0032, speed: 0.00022, offset: 0.0, width: 210, alpha: 0.95 },
  { colors: ['#9333ea', '#ec4899'], amp: 90, freq: 0.0026, speed: 0.00018, offset: 1.7, width: 190, alpha: 0.9 },
  { colors: ['#f472b6', '#fb923c'], amp: 60, freq: 0.0038, speed: 0.00026, offset: 3.1, width: 150, alpha: 0.85 },
  { colors: ['#38bdf8', '#6366f1'], amp: 80, freq: 0.0022, speed: 0.00015, offset: 4.4, width: 170, alpha: 0.75 },
  { colors: ['#fbbf24', '#f472b6'], amp: 50, freq: 0.0042, speed: 0.0003, offset: 5.6, width: 110, alpha: 0.7 },
]

/** Animated flowing-ribbon gradient (canvas). Static frame when reduced motion is on. */
export function HeroGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'
      for (const r of RIBBONS) {
        const grad = ctx.createLinearGradient(0, 0, w, h)
        grad.addColorStop(0, r.colors[0])
        grad.addColorStop(1, r.colors[1])
        ctx.beginPath()
        const steps = 48
        const base = h * 0.5
        const top: [number, number][] = []
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * (w + 200) - 100
          const y = base + Math.sin(x * r.freq + t * r.speed * 6 + r.offset) * r.amp + Math.sin(x * r.freq * 0.5 + t * r.speed * 3) * r.amp * 0.6 - (x / w) * h * 0.35
          top.push([x, y])
        }
        ctx.moveTo(top[0][0], top[0][1])
        for (const [x, y] of top) ctx.lineTo(x, y)
        for (let i = top.length - 1; i >= 0; i--) {
          const [x, y] = top[i]
          ctx.lineTo(x, y + r.width * (0.6 + 0.4 * Math.sin(x * 0.004 + t * r.speed * 4 + r.offset)))
        }
        ctx.closePath()
        ctx.globalAlpha = r.alpha
        ctx.fillStyle = grad
        ctx.filter = 'blur(18px)'
        ctx.fill()
      }
      ctx.filter = 'none'
      ctx.globalAlpha = 1
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw(4000)
    })
    ro.observe(canvas)
    if (reduce) draw(4000)
    else raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden />
}

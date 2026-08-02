'use client'

import { useEffect, useRef } from 'react'

type Mote = {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  sway: number
  swaySpeed: number
  twinkle: number
  twinkleSpeed: number
  baseOpacity: number
  hue: number
}

/**
 * Lightweight canvas layer of drifting golden dust sparkles.
 * Fine motes float gently and twinkle with an additive glow.
 * Fixed, non-interactive, DPR-aware and paused when the tab is hidden.
 */
export function Petals({ count = 90 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let motes: Mote[] = []

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function makeMote(initial = false): Mote {
      return {
        x: Math.random() * width,
        // dust drifts upward, so spawn below the fold when recycled
        y: initial ? Math.random() * height : height + 20 + Math.random() * height * 0.3,
        size: 0.6 + Math.random() * 2.2,
        speedY: 0.1 + Math.random() * 0.45, // upward drift
        speedX: -0.15 + Math.random() * 0.3,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.005 + Math.random() * 0.015,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.06,
        baseOpacity: 0.25 + Math.random() * 0.55,
        hue: 38 + Math.random() * 14, // warm gold range
      }
    }

    resize()
    motes = Array.from({ length: count }, () => makeMote(true))

    function drawMote(m: Mote) {
      const flicker = 0.55 + Math.sin(m.twinkle) * 0.45
      const alpha = m.baseOpacity * flicker
      const glow = m.size * 3.5
      ctx.globalAlpha = alpha
      const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glow)
      grad.addColorStop(0, `hsla(${m.hue + 6}, 95%, 72%, 1)`)
      grad.addColorStop(0.35, `hsla(${m.hue}, 90%, 58%, 0.55)`)
      grad.addColorStop(1, `hsla(${m.hue}, 85%, 50%, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(m.x, m.y, glow, 0, Math.PI * 2)
      ctx.fill()
    }

    let rafId = 0
    let running = true

    function frame() {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      for (const m of motes) {
        m.sway += m.swaySpeed
        m.twinkle += m.twinkleSpeed
        m.y -= m.speedY
        m.x += m.speedX + Math.sin(m.sway) * 0.25
        if (m.y < -30) {
          Object.assign(m, makeMote(false))
        }
        drawMote(m)
      }
      ctx.globalCompositeOperation = 'source-over'
      rafId = requestAnimationFrame(frame)
    }

    if (!prefersReduced) {
      rafId = requestAnimationFrame(frame)
    } else {
      ctx.globalCompositeOperation = 'lighter'
      for (const m of motes) drawMote(m)
      ctx.globalCompositeOperation = 'source-over'
    }

    function onVisibility() {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(rafId)
      } else if (!prefersReduced) {
        running = true
        rafId = requestAnimationFrame(frame)
      }
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
    />
  )
}

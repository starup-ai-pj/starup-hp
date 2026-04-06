'use client'

import { useEffect, useRef } from 'react'

const COLS = 16
const ROWS = 16
const SPEED = 2500 // ms

export default function CultureMissionVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startTime = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = window.devicePixelRatio || 1
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    startTime.current = performance.now()

    const centerRow = Math.ceil(ROWS / 2)
    const centerCol = Math.ceil(COLS / 2)

    // easing: smooth in-out
    const ease = (t: number) => {
      if (t < 0.35) return 0
      if (t > 0.65) return 1
      const p = (t - 0.35) / 0.3
      return p * p * (3 - 2 * p)
    }

    const loop = (now: number) => {
      ctx.clearRect(0, 0, w, h)

      const cellW = w / COLS
      const cellH = h / ROWS
      const dotSize = Math.min(cellW, cellH) * 0.15
      const lineWeight = 0.8
      const gutter = Math.min(cellW, cellH) * 0.3

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const cx = col * cellW + cellW / 2
          const cy = row * cellH + cellH / 2

          // distance-based opacity & delay
          const centerColPower = (centerCol - Math.abs(centerCol - (col + 1))) / 4
          const centerRowPower = (centerRow - Math.abs(centerRow - row)) / 4
          const baseOpacity = (centerColPower + centerRowPower) * 0.5
          const delay = (centerColPower + centerRowPower) * -500

          // animation progress (ping-pong)
          const elapsed = (now - startTime.current + delay) % (SPEED * 2)
          const normalizedTime = elapsed < SPEED
            ? elapsed / SPEED
            : 2 - elapsed / SPEED
          const t = ease(normalizedTime)

          const opacity = Math.max(0, Math.min(1, baseOpacity))
          if (opacity < 0.02) continue

          const color = `rgba(170, 178, 195, ${opacity * 0.35})`
          const colorLight = `rgba(185, 192, 205, ${opacity * 0.25})`

          // Main dot: scale 0→1
          const mainRadius = dotSize * t
          if (mainRadius > 0.1) {
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.arc(cx, cy, mainRadius, 0, Math.PI * 2)
            ctx.fill()
          }

          // Secondary dot (center, inverse animation, smaller)
          const secRadius = dotSize * 0.5 * (1 - t)
          if (secRadius > 0.1) {
            ctx.beginPath()
            ctx.fillStyle = colorLight
            ctx.arc(cx, cy, secRadius, 0, Math.PI * 2)
            ctx.fill()
          }

          // Horizontal line (rotates 0→90deg)
          const lineLen = cellW - dotSize * 2 - gutter
          if (lineLen > 0) {
            const angle = t * Math.PI / 2
            ctx.save()
            ctx.translate(cx, cy - cellH / 2)
            ctx.rotate(angle)
            ctx.fillStyle = color
            ctx.fillRect(-lineLen / 2, -lineWeight / 2, lineLen, lineWeight)
            ctx.restore()
          }

          // Vertical line (rotates 0→90deg)
          const vLineLen = cellH - dotSize * 2 - gutter
          if (vLineLen > 0) {
            const angle = t * Math.PI / 2
            ctx.save()
            ctx.translate(cx - cellW / 2, cy)
            ctx.rotate(angle)
            ctx.fillStyle = color
            ctx.fillRect(-lineWeight / 2, -vLineLen / 2, lineWeight, vLineLen)
            ctx.restore()
          }
        }
      }

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: '#ffffff' }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

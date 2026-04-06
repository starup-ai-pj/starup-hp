"use client"

import { useEffect, useRef } from "react"

interface WaveCanvasProps {
  className?: string
  hue?: number
}

export default function WaveCanvas({ className = "", hue = 220 }: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const t = tRef.current

      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 0.8

      for (let i = -60; i < 60; i += 1) {
        ctx.strokeStyle = `hsla(${hue}, 70%, 70%, 0.35)`
        ctx.beginPath()
        ctx.moveTo(0, h / 2)

        for (let j = 0; j < w; j += 10) {
          ctx.lineTo(
            10 * Math.sin(i / 10) + j + 0.008 * j * j,
            Math.floor(
              h / 2 +
                (j / 2) * Math.sin(j / 50 - t / 50 - i / 118) +
                i * 0.9 * Math.sin(j / 25 - (i + t) / 65)
            )
          )
        }

        ctx.stroke()
      }

      tRef.current += 1
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [hue])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  )
}

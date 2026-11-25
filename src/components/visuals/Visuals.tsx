"use client"

// 背景ビジュアルの React 側の受け皿
// - three.js などの本体は useEffect の中で dynamic import する（最初の JS に含めない・1 回だけ読む）
// - active=false で描画を止める（画面外・タブ非表示は各 scene が自分で止める）

import { useEffect, useRef, type CSSProperties } from "react"
import { Roboto_Mono } from "next/font/google"
import type { VisualController } from "./core"
import type { LayeredNetworkController } from "./layeredNetworkScene"
import "./scan-line.css"

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-roboto-mono" })

function useVisual<C extends VisualController>(
  load: () => Promise<(el: HTMLElement) => C>,
  active: boolean,
  onReady?: (c: C) => void,
) {
  const ref = useRef<HTMLDivElement>(null)
  const ctrl = useRef<C | null>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    let disposed = false
    load().then((mount) => {
      if (disposed || !ref.current) return
      const c = mount(ref.current)
      c.setActive(activeRef.current)
      ctrl.current = c
      onReady?.(c)
    })
    return () => {
      disposed = true
      ctrl.current?.dispose()
      ctrl.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ctrl.current?.setActive(active)
  }, [active])

  return ref
}

interface BaseProps {
  className?: string
  style?: CSSProperties
  /** false の間は描画を止める */
  active?: boolean
}

/** トップのヒーロー背景 */
export function NetworkBackground({ className, style, active = true }: BaseProps) {
  const ref = useVisual(() => import("./networkScene").then((m) => m.mountNetworkScene), active)
  return <div ref={ref} className={className} style={style} aria-hidden="true" />
}

/** トップのサービス紹介背景（3 層） */
export function LayeredNetworkBackground({
  className,
  style,
  active = true,
  focusLayer,
}: BaseProps & { focusLayer: number }) {
  const ctrl = useRef<LayeredNetworkController | null>(null)
  const focusRef = useRef(focusLayer)
  focusRef.current = focusLayer
  const ref = useVisual(
    () => import("./layeredNetworkScene").then((m) => m.mountLayeredNetworkScene),
    active,
    (c) => {
      ctrl.current = c
      c.setFocusLayer(focusRef.current)
    },
  )
  useEffect(() => {
    ctrl.current?.setFocusLayer(focusLayer)
  }, [focusLayer])
  return <div ref={ref} className={className} style={style} aria-hidden="true" />
}

/** カードが流れてスキャンされる演出 */
export function ScanLine({ className, style, active = true }: BaseProps) {
  const ref = useVisual(() => import("./scanLineScene").then((m) => m.mountScanLine), active)
  return (
    <div
      ref={ref}
      className={`${robotoMono.variable} ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    />
  )
}

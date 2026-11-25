// 背景ビジュアル（3D・canvas）共通の土台
//
// - 画質: devicePixelRatio の上限を 1.5 に抑える。スマホ相当（狭い画面 or タッチ端末）では
//   ブルーム・フィルムなどの後処理を切る。
// - 描画ループ: 見えていない間（画面外・タブ非表示・親から止められた）は rAF を回さない。

export const MAX_PIXEL_RATIO = 1.5

export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false
  const narrow = window.matchMedia("(max-width: 1023px)").matches
  const coarse = window.matchMedia("(pointer: coarse)").matches
  return narrow || coarse
}

export function pixelRatio(): number {
  return Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
}

export interface VisualController {
  /** 親から描画を止める/再開する（例: スクロールで隠した時） */
  setActive(active: boolean): void
  dispose(): void
}

/**
 * 「描いてよいか」を 3 つの条件の AND で管理し、全部 true の間だけ frame を回す。
 *   - inView:  container が画面に入っている（IntersectionObserver）
 *   - visible: タブが表示されている（visibilitychange）
 *   - active:  親コンポーネントが止めていない（setActive）
 */
export function createRenderLoop(
  container: HTMLElement,
  frame: (timeSec: number, deltaSec: number) => void,
) {
  let inView = false
  let visible = !document.hidden
  let active = true
  let raf = 0
  let last = 0
  let elapsed = 0 // 止めていた時間は進めない（再開時に動きが飛ばないように）

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick)
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0
    last = now
    elapsed += dt
    frame(elapsed, dt)
  }
  const sync = () => {
    const shouldRun = inView && visible && active
    if (shouldRun && !raf) {
      last = 0
      raf = requestAnimationFrame(tick)
    } else if (!shouldRun && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting)
      sync()
    },
    { rootMargin: "100px" },
  )
  io.observe(container)
  const onVisibility = () => {
    visible = !document.hidden
    sync()
  }
  document.addEventListener("visibilitychange", onVisibility)

  return {
    setActive(v: boolean) {
      active = v
      sync()
    },
    /** 一時停止中でも 1 フレームだけ描く（リサイズ直後など） */
    renderOnce() {
      frame(elapsed, 0)
    },
    get running() {
      return raf !== 0
    },
    dispose() {
      cancelAnimationFrame(raf)
      raf = 0
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    },
  }
}

/** container のサイズ変化を見張る。初回も 1 度呼ぶ。 */
export function observeSize(container: HTMLElement, onResize: (w: number, h: number) => void) {
  const fire = () => {
    const w = Math.max(container.clientWidth, 1)
    const h = Math.max(container.clientHeight, 1)
    onResize(w, h)
  }
  const ro = new ResizeObserver(fire)
  ro.observe(container)
  fire()
  return () => ro.disconnect()
}

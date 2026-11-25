// カードが流れてスキャンラインで ASCII に変わる演出（トップの Mission / About の Vision）
// 元: public/html/scan-line.html
//
// 元からの変更点
// - クリップ計算が rAF 2 本で毎フレーム 2 回走り、30 枚全部に getBoundingClientRect していた
//   → 1 フレーム 1 回、位置は計算で出す（レイアウトを読まない）
// - ASCII の書き換え（200ms ごと）を画面に入っているカードだけにする
// - 見えていない間は全部止める
// - カード画像を 800x500 の WebP に縮小（元は 1 枚 1.6〜9.9MB の JPG）

import { createRenderLoop, observeSize, type VisualController } from "./core"

const CARD_W = 400
const CARD_H = 250
const CARD_GAP = 60
const CARD_PITCH = CARD_W + CARD_GAP
const CARD_COUNT = 30
const CARD_IMAGES = [1, 2, 3, 4, 5].map((n) => `/images/tech-cards/tech-0${n}.webp`)

const CODE_LIBRARY = [
  "// Redesigning the structures of industry and culture",
  "/* Redesigning structures of industry and culture */",
  "const VISION = { power: Infinity, scope: 'universal' };",
  "const TRANSFORMATION_ENGINE = 'neural_synthesis';",
  "const CULTURAL_MATRIX = new Map();",
  "const INDUSTRY_PROTOCOLS = [];",
  "function transformThought(idea) { return technology.compile(idea); }",
  "function redesignStructure(legacy) { return innovation.rebuild(legacy); }",
  "const imagination = () => breakthrough.potential();",
  "function culturalShift(tradition, vision) { return synthesis(tradition, vision); }",
  "class ThoughtProcessor {",
  "  constructor(creativity, logic, intuition) {",
  "    this.creativity = creativity;",
  "    this.logic = logic;",
  "    this.intuition = intuition;",
  "  }",
  "  synthesize() { return this.creativity * this.logic * this.intuition; }",
  "}",
  "const paradigm = {",
  "  shift: () => evolution.next(),",
  "  break: () => revolution.begin(),",
  "  create: () => genesis.initialize(),",
  "};",
  "function innovate(concept, technology) {",
  "  return concept.transform().merge(technology).evolve();",
  "}",
  "const future = {",
  "  design: (vision) => architecture.build(vision),",
  "  implement: (idea) => reality.manifest(idea),",
  "}",
  "function bridgeWorlds(human, digital) {",
  "  return harmony.create(human.wisdom, digital.power);",
  "}",
  "const consciousness = { level: 'expanding', depth: 'infinite' };",
  "const technology = { purpose: 'human_flourishing' };",
  "function reimagine(system) { return system.deconstruct().rebuild(); }",
  "const synergy = (thought, tech) => thought.amplify(tech);",
  "// Where ideas become reality",
  "const transformation = { input: 'vision', output: 'revolution' };",
  "function cultivateChange() { return seeds.of.innovation.grow(); }",
  "const ecosystem = { thoughts: [], technologies: [], cultures: [] };",
]
const CODE_COLS = Math.floor(CARD_W / 6)
const CODE_ROWS = Math.floor(CARD_H / 13)

function generateCode() {
  let flow = CODE_LIBRARY.join(" ").replace(/\s+/g, " ").trim()
  const total = CODE_COLS * CODE_ROWS
  while (flow.length < total + CODE_COLS) {
    flow += " " + CODE_LIBRARY[Math.floor(Math.random() * CODE_LIBRARY.length)].replace(/\s+/g, " ").trim()
  }
  const rows: string[] = []
  for (let r = 0; r < CODE_ROWS; r++) rows.push(flow.slice(r * CODE_COLS, (r + 1) * CODE_COLS).padEnd(CODE_COLS, " "))
  return rows.join("\n")
}

interface Card {
  wrapper: HTMLDivElement
  normal: HTMLDivElement
  ascii: HTMLDivElement
  code: HTMLDivElement
  state: "left" | "right" | "scan" | ""
  scanned: boolean
}

// ── カードの流れ ─────────────────────────────────────────
function createCardStream(root: HTMLElement) {
  const stream = document.createElement("div")
  stream.className = "sl-stream"
  const line = document.createElement("div")
  line.className = "sl-line"
  stream.appendChild(line)
  root.appendChild(stream)

  const cards: Card[] = []
  for (let i = 0; i < CARD_COUNT; i++) {
    const wrapper = document.createElement("div")
    wrapper.className = "sl-card-wrapper"
    const normal = document.createElement("div")
    normal.className = "sl-card sl-card-normal"
    const img = document.createElement("img")
    img.className = "sl-card-image"
    img.src = CARD_IMAGES[i % CARD_IMAGES.length]
    img.alt = ""
    img.decoding = "async"
    img.loading = "lazy"
    img.width = CARD_W
    img.height = CARD_H
    normal.appendChild(img)
    const ascii = document.createElement("div")
    ascii.className = "sl-card sl-card-ascii"
    const code = document.createElement("div")
    code.className = "sl-ascii-content"
    code.textContent = generateCode()
    ascii.appendChild(code)
    wrapper.append(normal, ascii)
    line.appendChild(wrapper)
    cards.push({ wrapper, normal, ascii, code, state: "", scanned: false })
  }

  const lineWidth = CARD_PITCH * CARD_COUNT
  let containerWidth = 1
  let position = 0
  let velocity = 120
  let direction = -1
  let dragging = false
  let lastX = 0
  let mouseVelocity = 0
  const FRICTION = 0.95
  const MIN_VELOCITY = 30

  const applyPosition = () => {
    if (position < -lineWidth) position = containerWidth
    else if (position > containerWidth) position = -lineWidth
    line.style.transform = `translateX(${position}px)`
  }

  // スキャンライン（container の中央、幅 8px）との重なりからクリップを決める
  const updateClipping = () => {
    const scanL = containerWidth / 2 - 4
    const scanR = containerWidth / 2 + 4
    let any = false
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i]
      const left = position + i * CARD_PITCH
      const right = left + CARD_W
      if (left < scanR && right > scanL) {
        any = true
        const il = Math.max(scanL - left, 0)
        const ir = Math.min(scanR - left, CARD_W)
        c.normal.style.setProperty("--clip-right", `${(il / CARD_W) * 100}%`)
        c.ascii.style.setProperty("--clip-left", `${(ir / CARD_W) * 100}%`)
        c.state = "scan"
        if (!c.scanned && il > 0) {
          c.scanned = true
          const fx = document.createElement("div")
          fx.className = "sl-scan-effect"
          c.wrapper.appendChild(fx)
          setTimeout(() => fx.remove(), 600)
        }
      } else {
        const next = right < scanL ? "left" : left > scanR ? "right" : c.state
        if (next !== c.state) {
          c.normal.style.setProperty("--clip-right", next === "left" ? "100%" : "0%")
          c.ascii.style.setProperty("--clip-left", next === "left" ? "100%" : "0%")
          c.state = next
        }
        c.scanned = false
      }
    }
    return any
  }

  const updateAscii = () => {
    for (let i = 0; i < cards.length; i++) {
      const left = position + i * CARD_PITCH
      if (left > containerWidth || left + CARD_W < 0) continue // 画面外は書き換えない
      if (Math.random() < 0.15) cards[i].code.textContent = generateCode()
    }
  }

  const startDrag = (x: number) => {
    dragging = true
    lastX = x
    mouseVelocity = 0
    line.classList.add("is-dragging")
  }
  const onDrag = (x: number) => {
    if (!dragging) return
    const dx = x - lastX
    position += dx
    mouseVelocity = dx * 60
    lastX = x
    applyPosition()
  }
  const endDrag = () => {
    if (!dragging) return
    dragging = false
    line.classList.remove("is-dragging")
    if (Math.abs(mouseVelocity) > MIN_VELOCITY) {
      velocity = Math.abs(mouseVelocity)
      direction = mouseVelocity > 0 ? 1 : -1
    } else {
      velocity = 120
    }
  }
  const onMouseDown = (e: MouseEvent) => { e.preventDefault(); startDrag(e.clientX) }
  const onMouseMove = (e: MouseEvent) => onDrag(e.clientX)
  const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX)
  const onTouchMove = (e: TouchEvent) => { if (dragging) onDrag(e.touches[0].clientX) }
  line.addEventListener("mousedown", onMouseDown)
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", endDrag)
  line.addEventListener("touchstart", onTouchStart, { passive: true })
  document.addEventListener("touchmove", onTouchMove, { passive: true })
  document.addEventListener("touchend", endDrag)

  let asciiTimer = 0
  return {
    setWidth(w: number) { containerWidth = w },
    frame(dt: number) {
      if (!dragging) {
        if (velocity > MIN_VELOCITY) velocity *= FRICTION
        else velocity = Math.max(MIN_VELOCITY, velocity)
        position += velocity * direction * dt
        applyPosition()
      }
      asciiTimer += dt
      if (asciiTimer >= 0.2) { asciiTimer = 0; updateAscii() }
      return updateClipping()
    },
    dispose() {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", endDrag)
      document.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("touchend", endDrag)
      stream.remove()
    },
  }
}

// ── スキャンラインの光と粒子（2D canvas）─────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; alpha: number; originalAlpha: number
  decay: number; life: number; time: number; twinkleSpeed: number; twinkleAmount: number
}

function createParticleScanner(root: HTMLElement) {
  const canvas = document.createElement("canvas")
  canvas.className = "sl-scanner"
  root.appendChild(canvas)
  const ctx = canvas.getContext("2d")!
  const H = 300
  let w = 1
  let barX = 0
  const BAR_W = 3
  const BASE = { intensity: 0.8, max: 800, fade: 60 }
  const SCAN = { intensity: 1.8, max: 2500, fade: 35 }
  let intensity = BASE.intensity
  let maxParticles = BASE.max
  let fadeZone = BASE.fade
  let curIntensity = BASE.intensity
  let curMax = BASE.max
  let curFade = BASE.fade
  let glow = 1
  let scanning = false
  const T = 0.05
  const particles: Particle[] = []

  const sprite = document.createElement("canvas")
  sprite.width = sprite.height = 16
  {
    const g = sprite.getContext("2d")!
    const grad = g.createRadialGradient(8, 8, 0, 8, 8, 8)
    grad.addColorStop(0, "rgba(255, 255, 255, 1)")
    grad.addColorStop(0.3, "rgba(147, 197, 253, 0.8)")
    grad.addColorStop(0.7, "rgba(59, 130, 246, 0.4)")
    grad.addColorStop(1, "transparent")
    g.fillStyle = grad
    g.beginPath()
    g.arc(8, 8, 8, 0, Math.PI * 2)
    g.fill()
  }

  const rand = (a: number, b: number) => Math.random() * (b - a) + a
  const create = (): Particle => {
    const ratio = intensity / BASE.intensity
    const speed = 1 + (ratio - 1) * 1.2
    const size = 1 + (ratio - 1) * 0.7
    const alpha = rand(0.6, 1)
    return {
      x: barX + rand(-BAR_W / 2, BAR_W / 2), y: rand(0, H),
      vx: rand(0.2, 1.0) * speed, vy: rand(-0.15, 0.15) * speed,
      radius: rand(0.4, 1) * size, alpha, originalAlpha: alpha,
      decay: rand(0.005, 0.025) * (2 - ratio * 0.5), life: 1, time: 0,
      twinkleSpeed: rand(0.02, 0.08) * speed, twinkleAmount: rand(0.1, 0.25),
    }
  }
  const reset = (p: Particle) => {
    p.x = barX + rand(-BAR_W / 2, BAR_W / 2)
    p.y = rand(0, H)
    p.vx = rand(0.2, 1.0)
    p.vy = rand(-0.15, 0.15)
    p.alpha = p.originalAlpha = rand(0.6, 1)
    p.life = 1
    p.time = 0
  }
  for (let i = 0; i < BASE.max; i++) particles.push(create())

  const drawLightBar = () => {
    const v = ctx.createLinearGradient(0, 0, 0, H)
    v.addColorStop(0, "rgba(255, 255, 255, 0)")
    v.addColorStop(fadeZone / H, "rgba(255, 255, 255, 1)")
    v.addColorStop(1 - fadeZone / H, "rgba(255, 255, 255, 1)")
    v.addColorStop(1, "rgba(255, 255, 255, 0)")
    ctx.globalCompositeOperation = "lighter"
    glow += ((scanning ? 3.5 : 1) - glow) * T
    const bar = (half: number, width: number, radius: number, alpha: number, stops: [number, string][]) => {
      const g = ctx.createLinearGradient(barX - half, 0, barX + half, 0)
      for (const [o, c] of stops) g.addColorStop(o, c)
      ctx.globalAlpha = alpha
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.roundRect(barX - half, 0, width, H, radius)
      ctx.fill()
    }
    bar(BAR_W / 2, BAR_W, 15, 1, [
      [0, "rgba(255, 255, 255, 0)"],
      [0.3, `rgba(255, 255, 255, ${0.9 * glow})`],
      [0.5, `rgba(255, 255, 255, ${1 * glow})`],
      [0.7, `rgba(255, 255, 255, ${0.9 * glow})`],
      [1, "rgba(255, 255, 255, 0)"],
    ])
    bar(BAR_W * 2, BAR_W * 4, 25, scanning ? 1.0 : 0.8, [
      [0, "rgba(59, 130, 246, 0)"], [0.5, `rgba(147, 197, 253, ${0.8 * glow})`], [1, "rgba(59, 130, 246, 0)"],
    ])
    bar(BAR_W * 4, BAR_W * 8, 35, scanning ? 0.8 : 0.6, [
      [0, "rgba(59, 130, 246, 0)"], [0.5, `rgba(59, 130, 246, ${0.4 * glow})`], [1, "rgba(59, 130, 246, 0)"],
    ])
    if (scanning) {
      bar(BAR_W * 8, BAR_W * 16, 45, 0.6, [
        [0, "rgba(59, 130, 246, 0)"], [0.5, "rgba(59, 130, 246, 0.2)"], [1, "rgba(59, 130, 246, 0)"],
      ])
    }
    ctx.globalCompositeOperation = "destination-in"
    ctx.globalAlpha = 1
    ctx.fillStyle = v
    ctx.fillRect(0, 0, w, H)
  }

  return {
    setWidth(nw: number) {
      w = nw
      barX = w / 2
      canvas.width = w
      canvas.height = H
    },
    frame(isScanning: boolean) {
      scanning = isScanning
      const target = scanning ? SCAN : BASE
      curIntensity += (target.intensity - curIntensity) * T
      curMax += (target.max - curMax) * T
      curFade += (target.fade - curFade) * T
      intensity = curIntensity
      maxParticles = Math.floor(curMax)
      fadeZone = curFade

      ctx.globalCompositeOperation = "source-over"
      ctx.clearRect(0, 0, w, H)
      drawLightBar()
      ctx.globalCompositeOperation = "lighter"
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.time++
        p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount
        p.life -= p.decay
        if (p.x > w + 10 || p.life <= 0) reset(p)
        if (p.life <= 0) continue
        let fade = 1
        if (p.y < fadeZone) fade = p.y / fadeZone
        else if (p.y > H - fadeZone) fade = (H - p.y) / fadeZone
        ctx.globalAlpha = p.alpha * Math.max(0, Math.min(1, fade))
        ctx.drawImage(sprite, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2)
      }
      // 粒子の追加・削除（元コードの確率ロジックそのまま）
      const ratio = intensity / BASE.intensity
      if (Math.random() < intensity && particles.length < maxParticles) particles.push(create())
      if (ratio > 1.1 && Math.random() < (ratio - 1.0) * 1.2) particles.push(create())
      if (ratio > 1.3 && Math.random() < (ratio - 1.3) * 1.4) particles.push(create())
      if (ratio > 1.5 && Math.random() < (ratio - 1.5) * 1.8) particles.push(create())
      if (ratio > 2.0 && Math.random() < (ratio - 2.0) * 2.0) particles.push(create())
      if (particles.length > maxParticles + 200) {
        particles.length -= Math.min(15, particles.length - maxParticles)
      }
    },
    dispose() { canvas.remove() },
  }
}

export function mountScanLine(container: HTMLElement): VisualController {
  const root = document.createElement("div")
  root.className = "sl-root"
  container.appendChild(root)
  const scanner = createParticleScanner(root)
  const stream = createCardStream(root)

  const loop = createRenderLoop(container, (_t, dt) => {
    const scanning = stream.frame(dt)
    scanner.frame(scanning)
  })
  const stopResize = observeSize(container, (w) => {
    stream.setWidth(w)
    scanner.setWidth(w)
    if (!loop.running) loop.renderOnce()
  })

  return {
    setActive: loop.setActive,
    dispose() {
      loop.dispose()
      stopResize()
      stream.dispose()
      scanner.dispose()
      root.remove()
    },
  }
}

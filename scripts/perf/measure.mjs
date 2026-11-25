#!/usr/bin/env node
// パフォーマンス計測スクリプト
//
// 使い方:
//   npm run build && npm run start -- -p 3100   (別ターミナル)
//   npm run perf -- --label before
//   npm run perf -- --label after --base http://localhost:3100
//   npm run perf:compare -- before after
//
// 2 種類を測る:
//   1. Lighthouse … 読み込みの速さ（スコア・LCP・TBT・CLS・転送量・JS 量）
//   2. Runtime    … 開いた後の重さ（ページ表示中/スクロール中/下までスクロールした後の CPU 使用量と FPS）
//      背景 3D のように「表示後もずっと動き続けるもの」は Lighthouse では見えないので、こちらで測る。
//
// 結果は docs/perf/<label>/ に JSON で保存する。

import fs from "node:fs/promises"
import path from "node:path"
import lighthouse from "lighthouse"
import * as chromeLauncher from "chrome-launcher"
import puppeteer from "puppeteer-core"

const args = parseArgs(process.argv.slice(2))
const BASE = args.base ?? "http://localhost:3100"
const LABEL = args.label ?? new Date().toISOString().slice(0, 10)
const RUNS = Number(args.runs ?? 3)
const PAGES = (args.pages ?? "/,/about,/service,/recruit").split(",")
const ONLY = args.only // "lighthouse" | "runtime" | undefined
const OUT_DIR = path.resolve("docs/perf", LABEL)

const CHROME_FLAGS = [
  "--headless=new",
  // ヘッドレスでも WebGL を動かす（ソフトウェア描画 = 非力な端末に近い条件）
  "--enable-unsafe-swiftshader",
  "--no-first-run",
  "--no-default-browser-check",
]

const FORM_FACTORS = {
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
}

await fs.mkdir(OUT_DIR, { recursive: true })
console.log(`base=${BASE} label=${LABEL} runs=${RUNS} pages=${PAGES.join(" ")}`)

if (ONLY !== "runtime") {
  const lh = await runLighthouse()
  await fs.writeFile(path.join(OUT_DIR, "lighthouse.json"), JSON.stringify(lh, null, 2))
}
if (ONLY !== "lighthouse") {
  const rt = await runRuntime()
  await fs.writeFile(path.join(OUT_DIR, "runtime.json"), JSON.stringify(rt, null, 2))
}
console.log(`saved -> ${path.relative(process.cwd(), OUT_DIR)}`)

// ─────────────────────────────────────────────────────────────
// 1. Lighthouse
// ─────────────────────────────────────────────────────────────
async function runLighthouse() {
  const results = {}
  for (const page of PAGES) {
    for (const ff of ["mobile", "desktop"]) {
      const runs = []
      for (let i = 0; i < RUNS; i++) {
        const chrome = await chromeLauncher.launch({ chromeFlags: CHROME_FLAGS })
        try {
          const config = ff === "desktop"
            ? (await import("lighthouse/core/config/desktop-config.js")).default
            : undefined
          const r = await lighthouse(
            BASE + page,
            { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"] },
            config,
          )
          runs.push(pickLighthouse(r.lhr))
        } finally {
          await chrome.kill()
        }
        process.stdout.write(".")
      }
      results[`${page} ${ff}`] = { median: medianOf(runs), runs }
      console.log(` lighthouse ${page} ${ff} score=${results[`${page} ${ff}`].median.score}`)
    }
  }
  return results
}

function pickLighthouse(lhr) {
  const a = lhr.audits
  const items = a["network-requests"]?.details?.items ?? []
  const jsBytes = items
    .filter((it) => it.resourceType === "Script")
    .reduce((s, it) => s + (it.transferSize ?? 0), 0)
  return {
    score: Math.round((lhr.categories.performance.score ?? 0) * 100),
    fcpMs: a["first-contentful-paint"].numericValue,
    lcpMs: a["largest-contentful-paint"].numericValue,
    tbtMs: a["total-blocking-time"].numericValue,
    cls: a["cumulative-layout-shift"].numericValue,
    speedIndexMs: a["speed-index"].numericValue,
    totalBytes: a["total-byte-weight"].numericValue,
    jsBytes,
    requests: items.length,
    mainThreadMs: a["mainthread-work-breakdown"]?.numericValue,
  }
}

// ─────────────────────────────────────────────────────────────
// 2. Runtime（開いた後の CPU と FPS）
// ─────────────────────────────────────────────────────────────
async function runRuntime() {
  const chrome = await chromeLauncher.launch({ chromeFlags: CHROME_FLAGS })
  const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.port}` })
  const browserCdp = await browser.target().createCDPSession()
  const results = {}
  try {
    for (const page of PAGES) {
      for (const [ff, viewport] of Object.entries(FORM_FACTORS)) {
        const runs = []
        for (let i = 0; i < RUNS; i++) {
          runs.push(await measureRuntime(browser, browserCdp, BASE + page, viewport))
          process.stdout.write(".")
        }
        results[`${page} ${ff}`] = { median: medianOf(runs), runs }
        const m = results[`${page} ${ff}`].median
        console.log(` runtime ${page} ${ff} idleTop=${m.idleTopCpu}% scroll=${m.scrollCpu}% idleBottom=${m.idleBottomCpu}% fps=${m.scrollFps}`)
      }
    }
  } finally {
    await browser.disconnect()
    await chrome.kill()
  }
  return results
}

async function measureRuntime(browser, browserCdp, url, viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  if (viewport.mobile) {
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
    )
  }
  // 計測用: メインフレームの rAF を数えて FPS を出す
  await page.evaluateOnNewDocument(() => {
    window.__frames = 0
    const tick = () => { window.__frames++; requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  })
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 })
  await sleep(3000) // 3D の初期化が終わるのを待つ

  const sample = async (fn, ms) => {
    const cpu0 = await totalCpu(browserCdp)
    const f0 = await page.evaluate(() => window.__frames)
    const t0 = Date.now()
    await fn()
    const rest = ms - (Date.now() - t0)
    if (rest > 0) await sleep(rest)
    const dt = (Date.now() - t0) / 1000
    const cpu1 = await totalCpu(browserCdp)
    const f1 = await page.evaluate(() => window.__frames)
    return {
      // 全プロセス（レンダラ・GPU など）合計の CPU 使用率。100% = 1 コア使い切り
      cpu: round(((cpu1 - cpu0) / dt) * 100),
      fps: round((f1 - f0) / dt),
    }
  }

  // a) 一番上で 5 秒放置
  const idleTop = await sample(async () => {}, 5000)
  // b) 一番下まで 8 秒かけてスクロール
  const scroll = await sample(async () => {
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const steps = 160
      for (let i = 1; i <= steps; i++) {
        window.scrollTo(0, (total * i) / steps)
        await new Promise((r) => setTimeout(r, 50))
      }
    })
  }, 8000)
  // c) 一番下で 5 秒放置（上の方の 3D が止まっているかどうか）
  const idleBottom = await sample(async () => {}, 5000)

  await page.close()
  return {
    idleTopCpu: idleTop.cpu,
    idleTopFps: idleTop.fps,
    scrollCpu: scroll.cpu,
    scrollFps: scroll.fps,
    idleBottomCpu: idleBottom.cpu,
    idleBottomFps: idleBottom.fps,
  }
}

async function totalCpu(cdp) {
  const { processInfo } = await cdp.send("SystemInfo.getProcessInfo")
  return processInfo.reduce((s, p) => s + p.cpuTime, 0)
}

// ─────────────────────────────────────────────────────────────
function medianOf(runs) {
  const out = {}
  for (const k of Object.keys(runs[0])) {
    const vs = runs.map((r) => r[k]).filter((v) => typeof v === "number").sort((a, b) => a - b)
    out[k] = vs.length ? round(vs[Math.floor(vs.length / 2)]) : null
  }
  return out
}
function round(v) { return Math.round(v * 100) / 100 }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }
function parseArgs(argv) {
  const o = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) o[argv[i].slice(2)] = argv[i + 1]?.startsWith("--") ? true : argv[++i]
  }
  return o
}

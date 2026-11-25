#!/usr/bin/env node
// 見た目の確認用スクリーンショット: node scripts/perf/screenshots.mjs <outDir> [base]
import fs from "node:fs/promises"
import path from "node:path"
import * as chromeLauncher from "chrome-launcher"
import puppeteer from "puppeteer-core"

const out = path.resolve(process.argv[2] ?? "screens")
const BASE = process.argv[3] ?? "http://localhost:3100"
await fs.mkdir(out, { recursive: true })
const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--enable-unsafe-swiftshader"] })
const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.port}` })

const shots = [
  // [name, path, viewport, selector to scroll to (or null = top)]
  ["top-hero-desktop", "/", { width: 1440, height: 900 }, null],
  ["top-hero-mobile", "/", { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, null],
  ["top-mission-desktop", "/", { width: 1440, height: 900 }, "section:nth-of-type(2)"],
  ["top-services-desktop", "/", { width: 1440, height: 900 }, "section.bg-black"],
  ["top-services-mobile", "/", { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, "section.bg-black article"],
  ["service-diorama-desktop", "/service", { width: 1440, height: 900 }, "article#archaive [data-a='img']"],
  ["service-diorama-mobile", "/service", { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, "article#archaive [data-a='img']"],
]
for (const [name, p, vp, sel] of shots) {
  const page = await browser.newPage()
  await page.setViewport(vp)
  await page.goto(BASE + p, { waitUntil: "networkidle2", timeout: 60000 })
  if (sel) {
    await page.evaluate((s) => {
      const el = document.querySelector(s)
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40)
    }, sel)
  }
  await new Promise((r) => setTimeout(r, 4000))
  await page.screenshot({ path: path.join(out, `${name}.png`) })
  await page.close()
  console.log(name)
}
await browser.disconnect()
await chrome.kill()

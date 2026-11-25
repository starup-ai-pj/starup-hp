#!/usr/bin/env node
// 2 回分の計測結果を比べて Markdown の表にする
//   npm run perf:compare -- before after
// 結果は標準出力と docs/perf/compare-<before>-vs-<after>.md に出す。

import fs from "node:fs/promises"
import path from "node:path"

const [a, b] = process.argv.slice(2)
if (!a || !b) {
  console.error("usage: npm run perf:compare -- <before-label> <after-label>")
  process.exit(1)
}

const load = async (label, file) => {
  try {
    return JSON.parse(await fs.readFile(path.resolve("docs/perf", label, file), "utf8"))
  } catch {
    return null
  }
}

const LH_COLS = [
  ["score", "スコア", (v) => v, "up"],
  ["lcpMs", "LCP", ms, "down"],
  ["tbtMs", "TBT", ms, "down"],
  ["cls", "CLS", (v) => v.toFixed(3), "down"],
  ["totalBytes", "転送量", kb, "down"],
  ["jsBytes", "JS", kb, "down"],
  ["requests", "リクエスト数", (v) => v, "down"],
]
const RT_COLS = [
  ["idleTopCpu", "表示中 CPU", pct, "down"],
  ["scrollCpu", "スクロール中 CPU", pct, "down"],
  ["scrollFps", "スクロール中 FPS", (v) => v, "up"],
  ["idleBottomCpu", "下までスクロール後 CPU", pct, "down"],
]

let md = `# パフォーマンス比較: ${a} → ${b}\n\n`
for (const [file, title, cols] of [
  ["lighthouse.json", "読み込み（Lighthouse, 中央値）", LH_COLS],
  ["runtime.json", "開いた後の重さ（CPU は全プロセス合計、100% = 1 コア）", RT_COLS],
]) {
  const A = await load(a, file)
  const B = await load(b, file)
  if (!A || !B) continue
  md += `## ${title}\n\n| ページ | ${cols.map((c) => c[1]).join(" | ")} |\n|---|${cols.map(() => "---").join("|")}|\n`
  for (const key of Object.keys(A)) {
    if (!B[key]) continue
    const ra = A[key].median
    const rb = B[key].median
    md += `| ${key} | ${cols.map(([k, , fmt, better]) => cell(ra[k], rb[k], fmt, better)).join(" | ")} |\n`
  }
  md += "\n"
}

console.log(md)
await fs.writeFile(path.resolve("docs/perf", `compare-${a}-vs-${b}.md`), md)

function cell(x, y, fmt, better) {
  if (x == null || y == null) return "-"
  const diff = y - x
  const pctDiff = x !== 0 ? Math.round((diff / Math.abs(x)) * 100) : 0
  const good = better === "down" ? diff < 0 : diff > 0
  // 3% 未満の差は計測のぶれの範囲として印を付けない
  const mark = Math.abs(pctDiff) < 3 ? "" : good ? " ✅" : " ⚠️"
  return `${fmt(x)} → ${fmt(y)} (${pctDiff > 0 ? "+" : ""}${pctDiff}%)${mark}`
}
function ms(v) { return v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms` }
function kb(v) { return v >= 1024 * 1024 ? `${(v / 1024 / 1024).toFixed(2)}MB` : `${Math.round(v / 1024)}KB` }
function pct(v) { return `${Math.round(v)}%` }

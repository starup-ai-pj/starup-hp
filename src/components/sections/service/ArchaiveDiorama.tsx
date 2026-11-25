"use client"

// ARCHAIVE の画面を立体的に見せるジオラマ（/service）
// 元: public/html/archaive-diorama.html
//   元は React 開発版 + @babel/standalone を CDN から読み、ブラウザで JSX を変換していた。
//   ここではサイトの React コンポーネントとして普通にビルドする。見た目と動きは元のまま。
//
// 親とのやり取り（元は postMessage）
//   requestedIndex … 親が表示したい画面（null の間は 2.5 秒ごとに自動で切り替え）
//   onScreenChange … 表示中の画面が変わったら呼ぶ

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"
import "./archaive-diorama.css"

// Noto Sans JP は next/font で読むと @font-face が数百行（約 370KB）の CSS になり、
// ページ全体の表示を止めてしまう。元の iframe と同じく、ジオラマを出す時に Google Fonts から読む。
const NOTO_SANS_JP_HREF = "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
function loadNotoSansJp() {
  if (document.querySelector(`link[href="${NOTO_SANS_JP_HREF}"]`)) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = NOTO_SANS_JP_HREF
  document.head.appendChild(link)
}
const spaceGrotesk = Space_Grotesk({ weight: ["600"], subsets: ["latin"], variable: "--font-space-grotesk" })
const jetbrainsMono = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-jetbrains-mono" })

// ===== Reusable bits =====
const LogoMark = ({ color = "#fff" }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="6" fill={color} />
  </svg>
)

const SidebarIcon = ({ d, on = false }: { d: string; on?: boolean }) => (
  <div className={"ico " + (on ? "on" : "")}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  </div>
)

const Sidebar = ({ activeIcon }: { activeIcon: string }) => (
  <div className="sidebar">
    <div className="logo"><LogoMark /></div>
    <SidebarIcon on={activeIcon === "draw"} d="M4 6h10l-3 3 4 4 6-6V3H8L4 7z M4 6l8 8 M14 4l5 5" />
    <SidebarIcon on={activeIcon === "product"} d="M4 7l8-4 8 4-8 4z M4 7v10l8 4 M20 7v10l-8 4 M12 11v10" />
    <SidebarIcon on={activeIcon === "kanban"} d="M3 7h6v13H3z M11 4h6v16h-6z M19 9h2v11h-2z" />
    <SidebarIcon d="M5 4h11l3 3v13H5z M14 4v4h5" />
    <SidebarIcon d="M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 21c0-2 2-5 4-5h0c2 0 4 3 4 5 M17 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M13 21c0-1.5 2-3.5 4-3.5h0c2 0 4 2 4 3.5" />
    <div className="spacer"></div>
    <SidebarIcon d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M19 12l2 1-1 2-2-1 M5 11l-2 1 1 2 2-1 M11 5l1-2 2 1-1 2 M11 19l1 2 2-1-1-2" />
    <SidebarIcon d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 17v.01 M12 8v5" />
    <div style={{ height: 6 }}></div>
    <SidebarIcon d="M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 21c0-3 3-6 6-6h0c3 0 6 3 6 6" />
  </div>
)

// Stylized technical drawing
const DrawingSVG = ({ mini }: { mini?: boolean; compact?: boolean }) => (
  <svg viewBox="0 0 200 110" preserveAspectRatio="xMidYMid meet">
    <g stroke="#15140f" strokeWidth={mini ? "0.6" : "0.8"} fill="none">
      <path d="M40 35 L40 80 L150 80 L150 70 L130 70 L130 35 Z" />
      <line x1="40" y1="55" x2="130" y2="55" strokeDasharray="2 1.5" opacity=".7" />
      <circle cx="85" cy="60" r="11" />
      <circle cx="55" cy="73" r="2.5" />
      <circle cx="120" cy="73" r="2.5" />
      <line x1="80" y1="60" x2="90" y2="60" strokeWidth="0.4" />
      <line x1="85" y1="55" x2="85" y2="65" strokeWidth="0.4" />
      <g transform="translate(155,30)">
        <path d="M0 12 L20 4 L40 12 L40 32 L20 40 L0 32 Z" />
        <path d="M0 12 L20 20 L40 12 M20 20 L20 40" />
        <circle cx="22" cy="22" r="6" />
      </g>
      {!mini && (
        <g fontSize="3.5" fontFamily="var(--font-jetbrains-mono), JetBrains Mono" fill="#15140f" stroke="none">
          <text x="42" y="30">44.00</text>
          <text x="42" y="40">22.00</text>
          <text x="42" y="50">14.00</text>
          <text x="22" y="60">18.00</text>
          <text x="100" y="92">34.00</text>
        </g>
      )}
      {!mini && (
        <g stroke="#15140f" strokeWidth="0.3">
          <line x1="40" y1="26" x2="130" y2="26" />
          <line x1="40" y1="24" x2="40" y2="28" />
          <line x1="130" y1="24" x2="130" y2="28" />
          <line x1="40" y1="86" x2="150" y2="86" />
          <line x1="40" y1="84" x2="40" y2="88" />
          <line x1="150" y1="84" x2="150" y2="88" />
        </g>
      )}
    </g>
  </svg>
)

// ===== Drawing Search =====
const SIMILAR = [
  { n: "1-02101", co: "株式会社オメガ・クラフト", s: "高" },
  { n: "9122120", co: "株式会社オメガ・クラフト", s: "高" },
  { n: "890_松尾金属工業所 (1)", co: "大門機械製作所", s: "高" },
  { n: "890_松尾金属工業所 (1)", co: "トライデント技研株式会社", s: "高" },
]

const DrawingSearchScreen = () => (
  <div className="app">
    <Sidebar activeIcon="product" />
    <div className="content">
      <div className="ds-top">
        <div className="crumb">
          <span>📐 製品一覧</span>
          <span className="sep">›</span>
          <span style={{ color: "var(--ink)", fontWeight: 500 }}>筐体パーツ</span>
        </div>
        <div className="tabs">
          <span className="t">① 製品基本情報</span>
          <span className="t on">▦ 製品図面</span>
          <span className="t">📄 製品関連書類</span>
          <span className="t">⬢ 3Dモデル</span>
        </div>
        <span className="right">この製品の案件へ ›</span>
      </div>
      <div className="ds-body">
        <div className="ds-left">
          <div className="add-btn">+ 図面を追加</div>
          <div className="ds-thumb-row">
            <div className="ds-thumb">
              <div className="label">本図面</div>
              <DrawingSVG mini />
            </div>
            <div className="name">892_松尾金属工業所</div>
            <div className="sub">ab47892</div>
          </div>
        </div>
        <div className="ds-center">
          <div className="ds-toolbar">
            <span className="tb">⬇</span>
            <span className="tb">⎙</span>
            <span className="tb">↗</span>
            <span className="tb danger">🗑</span>
            <span className="tb write">✎ 書き込み</span>
            <span className="tb" style={{ marginLeft: "auto" }}>⤢</span>
          </div>
          <div className="ds-drawing">
            <span className="corner">A1  B1</span>
            <div className="top-strip"></div>
            <DrawingSVG />
            <div className="titleblock">
              <div>製図</div><div>T.Tsuji</div><div>検図</div><div>T.hurukawa</div>
              <div>製造番号</div><div>ab47892</div><div>筐体パーツ</div><div>4/9/2023</div>
            </div>
          </div>
        </div>
        <div className="ds-right">
          <div className="tabs2">
            <span className="t2">ⓘ 図面情報</span>
            <span className="t2 on">🔍 類似図面</span>
            <span className="t2">▤ 見積もり</span>
          </div>
          <div className="head">
            <span>32件の類似図面</span>
            <span className="link">類似図面詳細へ ↗</span>
          </div>
          <div className="ds-grid-similar">
            {SIMILAR.map((s, i) => (
              <div className="ds-sim" key={i}>
                <span className={"score " + (s.s === "低" ? "low" : "")}>{s.s}</span>
                <div className="thumb">
                  <div className="strip"></div>
                  <DrawingSVG mini compact />
                </div>
                <div className="name">{s.n}</div>
                <div className="co">{s.co}</div>
                <div className="tag">形状</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ===== Chat =====
const ChatScreen = () => (
  <div className="app">
    <Sidebar activeIcon="product" />
    <div className="content">
      <div className="ch-top">
        <span className="stat"></span>
        <span className="ttl">ベーシックAI Assistant</span>
        <span className="right">
          <span className="iconbtn on">⚡</span>
          <span className="iconbtn">▤</span>
          <span className="iconbtn">⤢</span>
          <span className="iconbtn">✕</span>
        </span>
      </div>
      <div className="ch-tabs">
        <div className="ch-tab"><span className="star">★</span><span className="lbl">過去トラブルにつ…</span><span className="x">✕</span></div>
        <div className="ch-tab"><span className="star">★</span><span className="lbl">C工場・溶接エリア…</span><span className="x">✕</span></div>
        <div className="ch-tab on"><span className="star">★</span><span className="lbl">C工場・溶接エリア…</span><span className="x">✕</span></div>
        <div className="ch-tab"><span className="star">★</span><span className="lbl">レーザー加工につ…</span><span className="x">✕</span></div>
        <div className="ch-plus">+</div>
      </div>
      <div className="ch-body">
        <div className="ch-user">C工場・溶接エリアの過去トラブルについて教えてください</div>
        <div className="ch-meta">01/29 15:49</div>
        <div className="ch-ai">
          <span className="icn"></span>
          <div className="intro">C工場・溶接エリアにおける過去のトラブルについて、以下の情報をまとめました。</div>
          <span className="ch-h">トラブルの概要</span>
          <ul>
            <li><b>発生日</b>: 2026年2月19日</li>
            <li><b>場所</b>: C工場 溶接・組立エリア</li>
          </ul>
          <span className="ch-h">問題の詳細</span>
          <ul>
            <li><b>内容</b>: メインサポートフレームの溶接後に熱影響による歪み、寸法公差を外れた</li>
            <li><b>状況</b>: ロット 20台中 2台が不適合（不適合率 10.0%）</li>
          </ul>
        </div>
      </div>
      <div className="ch-input">
        <span className="plus">+</span>
        <span className="input-flex">メッセージを入力...</span>
        <span className="mic">🎤</span>
        <span className="send">⇗</span>
      </div>
    </div>
  </div>
)

// ===== Kanban =====
const KANBAN_COLS = [
  { title: "受注", c: "#1db77c", cards: [
    { t: "検索用図面", co: "株式会社STAR UP", d: "2/1" },
    { t: "トライデント技研超精密機…", co: "トライデント技研株式会社", d: "1/16" },
    { t: "八雲紡績繊維製品加工", co: "八雲紡績株式会社", d: "1/16" },
    { t: "案件3G6170-921", co: "雷電機製作所", d: "11/20" },
    { t: "案件1STAR UPパンチ金型…", co: "八雲紡績株式会社", d: "11/20" },
  ] },
  { title: "入荷", c: "#7a6bff", cards: [
    { t: "剛田鉄工所大型フレーム製造", co: "株式会社 剛田鉄工所", d: "1/16" },
    { t: "オメガクラフト鋳造型製造", co: "株式会社オメガ・クラフト", d: "1/16" },
    { t: "バンダイ高性能フィルム加工", co: "万代マテリアル株式会社", d: "1/16" },
    { t: "案件3B7890-Y789", co: "トライデント技研株式会社", d: "11/25" },
    { t: "案件2松尾金属タンク製造…", co: "株式会社オメガ・クラフト", d: "11/20" },
  ] },
  { title: "失注", c: "#15140f", cards: [
    { t: "ゼロメカニクス自動化組立…", co: "株式会社ゼロ・メカニクス", d: "1/17" },
    { t: "ギガファクトリー精密射出…", co: "株式会社ギガ・ファクトリー", d: "1/17" },
    { t: "雲海化学工業高機能樹脂部品", co: "雲海化学工業株式会社", d: "1/17" },
    { t: "中型プレス金型設計・製造", co: "株式会社田中製作所", d: "12/15" },
  ] },
  { title: "見積中", c: "#9fd96b", cards: [
    { t: "鬼瓦金属高精度パーツ製造", co: "鬼瓦金属株式会社", d: "1/16" },
    { t: "アルミ製パネル枠組立", co: "金剛プレス工業株式会社", d: "12/15" },
    { t: "案件2A5083-H321", co: "大門機械製作所", d: "11/25" },
    { t: "田中製作所", co: "株式会社田中製作所", d: "9/18" },
  ] },
]

const KanbanScreen = () => (
  <div className="app">
    <Sidebar activeIcon="kanban" />
    <div className="content">
      <div className="kb-top">
        <h3>案件一覧</h3>
        <div className="kb-search"><span className="filter">⛀</span><span style={{ color: "var(--ink-mute)" }}>⌕</span>案件を検索…</div>
        <div className="kb-new">+ 新規案件</div>
      </div>
      <div className="kb-tools">
        <div className="seg">
          <div className="b">▦</div>
          <div className="b on">▥</div>
        </div>
        <div className="pill"><span className="ic">↕</span>並べ替え設定 <span className="ic">▾</span></div>
        <div className="pill"><span className="ic">⚙</span>テーブル設定</div>
        <div className="pill csv"><span className="ic">⬇</span>CSV出力</div>
      </div>
      <div className="kb-board">
        {KANBAN_COLS.map((col, i) => (
          <div className="kb-col" key={i} style={{ "--kb-col-c": col.c } as CSSProperties}>
            <div className="kb-colhead">
              <span><span className="dot"></span>{col.title}</span>
              <span className="count">{col.cards.length}</span>
            </div>
            {col.cards.map((card, j) => (
              <div className="kb-card" key={j}>
                <div className="row1">
                  <span className="chk"></span>
                  <span className="t">{card.t}</span>
                </div>
                <div className="co">{card.co}</div>
                <div className="dt">作成日: {card.d}</div>
              </div>
            ))}
          </div>
        ))}
        <div className="kb-col" style={{ "--kb-col-c": "#22b3d4", opacity: 0.5 } as CSSProperties}>
          <div className="kb-colhead"><span><span className="dot"></span>加工中</span></div>
        </div>
      </div>
    </div>
  </div>
)

// ===== Diorama =====
interface FloatItem { kind: string; x: number; y: number; z: number; node: ReactNode }
interface Screen { label: string; tilt: { rx: number; ry: number }; render: () => ReactNode; floats: FloatItem[] }

const SCREENS: Screen[] = [
  {
    label: "AI類似図面検索",
    tilt: { rx: -10, ry: 14 },
    render: () => <DrawingSearchScreen />,
    floats: [
      { kind: "badge", x: 580, y: 0, z: 99, node: (<><span className="l">類似度</span><span className="v">98<em>%</em></span></>) },
      { kind: "chip", x: -20, y: 60, z: 81, node: (<><span className="dot"></span>32 件の類似図面</>) },
      { kind: "note", x: 560, y: 320, z: 90, node: (<><div className="h">Auto-Match</div>24,108件をAIインデックス済</>) },
      { kind: "pill", x: -10, y: 460, z: 86, node: (<><i>↗</i> 類似図面詳細へ</>) },
    ],
  },
  {
    label: "AIチャット型データ検索",
    tilt: { rx: -4, ry: -18 },
    render: () => <ChatScreen />,
    floats: [
      { kind: "avatar", x: -28, y: 26, z: 108, node: "AI" },
      { kind: "note", x: 580, y: 10, z: 99, node: (<><div className="h">Auto-cite</div>過去事例 3件から回答を生成</>) },
      { kind: "chip", x: -20, y: 320, z: 77, node: (<><span className="dot"></span>話し言葉で検索可能</>) },
      { kind: "btn", x: 540, y: 440, z: 113, node: (<><span className="ico">↵</span>参考図面を開く</>) },
    ],
  },
  {
    label: "案件管理機能",
    tilt: { rx: -14, ry: 6 },
    render: () => <KanbanScreen />,
    floats: [
      { kind: "pill", x: -24, y: 30, z: 95, node: (<><i>●</i>進行中 23 件</>) },
      { kind: "badge", x: 580, y: 0, z: 104, node: (<><span className="l">This Month</span><span className="v">42 件</span></>) },
      { kind: "btn", x: -10, y: 460, z: 108, node: (<><span className="ico">+</span>新規案件</>) },
      { kind: "chip", x: 570, y: 330, z: 81, node: (<><span className="dot"></span>図面に紐づけ済</>) },
    ],
  },
]

export default function ArchaiveDiorama({
  requestedIndex,
  onScreenChange,
  className,
}: {
  requestedIndex: number | null
  onScreenChange?: (index: number) => void
  className?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [tilt, setTilt] = useState(SCREENS[0].tilt)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [inView, setInView] = useState(false)
  // 元の iframe は loading="lazy" だった。同じく画面に近づくまで中身を描かない
  // （読み込み中にジオラマと日本語フォントを取りに行って、ページの表示を遅らせないため）
  const [mounted, setMounted] = useState(false)
  const paused = hoverPaused || requestedIndex !== null

  // 元の iframe と同じ縮尺: min(1.5, 幅/900, 高さ/580)
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const s = Math.min(1.5, el.clientWidth / 900, el.clientHeight / 580)
      el.style.setProperty("--s", String(s))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // 画面外では自動切り替えを止める
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    // 見出しのアニメーションなど、ページ本体の表示が落ち着いてから組み立てる
    let idleId = 0
    const mountWhenIdle = () => {
      if (idleId) return
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
      idleId = ric(() => setMounted(true), { timeout: 1500 })
    }
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.some((e) => e.isIntersecting)
        setInView(v)
        if (v) mountWhenIdle()
      },
      { rootMargin: "200px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (requestedIndex !== null && requestedIndex >= 0 && requestedIndex < SCREENS.length) setActive(requestedIndex)
  }, [requestedIndex])

  useEffect(() => {
    setTilt(SCREENS[active].tilt)
  }, [active])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 2
      const bt = SCREENS[active].tilt
      setTilt({ rx: bt.rx - dy * 6, ry: bt.ry + dx * 8 })
    }
    const onLeave = () => setTilt(SCREENS[active].tilt)
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [active])

  useEffect(() => {
    if (paused || !inView) return undefined
    const id = setInterval(() => setActive((a) => (a + 1) % SCREENS.length), 2500)
    return () => clearInterval(id)
  }, [paused, inView])

  const onScreenChangeRef = useRef(onScreenChange)
  onScreenChangeRef.current = onScreenChange
  useEffect(() => {
    onScreenChangeRef.current?.(active)
  }, [active])

  useEffect(() => {
    if (mounted) loadNotoSansJp()
  }, [mounted])

  const screen = SCREENS[active]

  return (
    <div
      ref={rootRef}
      className={`adio ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${className ?? ""}`}
    >
      {mounted && (
      <div className="wrap">
        <div
          ref={stageRef}
          className="stage"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          <div
            className="deck"
            style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transition: "transform .9s cubic-bezier(.2,.7,.2,1)" }}
          >
            <div className="layer-card" key={`card-${active}`}>
              {screen.render()}
            </div>
            {screen.floats.map((f, i) => (
              <div
                key={`f-${active}-${i}`}
                className={`float ${f.kind}`}
                style={{ left: f.x, top: f.y, transform: `translate3d(0,0,${f.z}px)`, animationDelay: `${i * 80}ms` }}
              >
                {f.node}
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

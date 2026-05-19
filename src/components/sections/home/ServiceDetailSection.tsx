"use client"

import { useEffect, useRef } from "react"
import TransitionLink from "@/components/ui/TransitionLink"

type FeatureGroup = { label: string; items: string[] }
type Service = {
  index: string
  subtitle: string
  title: string
  description: string
  features: FeatureGroup[]
  href: string
}

const SERVICES: Service[] = [
  {
    index: "01",
    subtitle: "AIデータ活用プラットフォーム",
    title: "ARCHAIVE",
    description:
      "社内に点在した図面データを一元管理し、AIによる類似図面検索とチャット型データ検索で業務効率を革新する。",
    features: [
      { label: "コア機能", items: ["AI類似図面検索", "チャット型データ検索", "案件管理"] },
      { label: "対象", items: ["製造業", "建設・設計業"] },
    ],
    href: "/service#archaive",
  },
  {
    index: "02",
    subtitle: "サプライチェーン支援AI",
    title: "SEND AI",
    description:
      "散在するデータを統合・可視化し、AIが最適なアクションを提案。在庫・販売管理から発注・配分まで一気通貫で支援する。",
    features: [
      { label: "予測・発注", items: ["需要予測AI", "発注最適化", "在庫管理"] },
      { label: "分析・可視化", items: ["売上分析", "BI機能"] },
    ],
    href: "/service#send-ai",
  },
  {
    index: "03",
    subtitle: "オントロジー基盤の業務AIシステム",
    title: "Flowerium",
    description:
      "業務データを”意味”で統合するオントロジーを中心に、業務UIとAIエージェントの実行基盤までを一体で提供。AIの成長に合わせて形を変え続ける適応型システム。",
    features: [
      { label: "データ基盤", items: ["オントロジー統合"] },
      { label: "業務UI", items: ["カスタムアプリ"] },
      { label: "AIエージェント", items: ["アクション実行"] },
    ],
    href: "/service#flowerium",
  },
]

export default function ServiceDetailSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const articlesRef = useRef<(HTMLElement | null)[]>([])
  const focusRef = useRef<number>(-1) // 最後に送った layer idx

  // 表示中の service を検出 → 対応する slab を iframe にフォーカス指示
  useEffect(() => {
    const visibility = articlesRef.current.map(() => 0)

    const sendFocus = (layer: number) => {
      if (layer === focusRef.current) return
      focusRef.current = layer
      iframeRef.current?.contentWindow?.postMessage(
        { type: "focusLayer", layer },
        "*"
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = articlesRef.current.findIndex((el) => el === entry.target)
          if (idx >= 0) visibility[idx] = entry.intersectionRatio
        })

        // 最も多く見えている service を採用 (30% 以上で初めて focus 切替)
        let maxIdx = -1
        let maxVis = 0.3
        visibility.forEach((v, i) => {
          if (v > maxVis) {
            maxIdx = i
            maxVis = v
          }
        })

        // service index → 3D layer index (service 01 = 一番上の層 = l=LAYER-1)
        const layer = maxIdx === -1 ? -1 : SERVICES.length - 1 - maxIdx
        sendFocus(layer)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    articlesRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // iframe ロード完了時に最後の focus 状態を再送（マウント直後に決まっていた場合の保険）
  const handleIframeLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "focusLayer", layer: focusRef.current },
      "*"
    )
  }

  return (
    <section className="relative bg-black text-white">
      <div className="flex">
        {/* ━━━ 左: sticky な iframe (PCのみ表示) ━━━ */}
        <div className="hidden lg:block w-[58%] xl:w-[60%] shrink-0">
          <div className="sticky top-0 h-screen w-full">
            {/* iframe は内側で自分のサイズを viewport として 3D を描画するので、
                親に overflow を被せず、フル幅を渡してやればスラブ周囲のドットも収まる */}
            <iframe
              ref={iframeRef}
              src="/network-background-4layer.html"
              title="Network Visualization"
              loading="lazy"
              scrolling="no"
              onLoad={handleIframeLoad}
              className="block w-full h-full border-0 bg-black"
            />
          </div>
        </div>

        {/* ━━━ 右: スクロールするコンテンツ ━━━ */}
        <div className="flex-1 min-w-0 relative z-10">
          <div className="max-w-[600px] mx-auto lg:mx-0 lg:ml-0 lg:mr-auto px-6 md:px-10 lg:pr-16 xl:pr-24 py-20 lg:py-0">
            {/* セクションヘッダー: 最初の画面に被せる */}
            <div className="lg:min-h-screen flex flex-col justify-center py-16 lg:py-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
                Services / {String(SERVICES.length).padStart(2, "0")}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight mb-6">
                AIで、現場の<br />意思決定を変える。
              </h2>
              <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md">
                3つのプロダクトで、企業の中で散らばっていたデータを意味あるネットワークに繋ぎ直す。
              </p>
              <div className="mt-10 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                <span className="block w-10 h-px bg-white/30" />
                Scroll
              </div>
            </div>

            {/* 各サービス: 1画面分づつ縦に積む */}
            {SERVICES.map((service, idx) => (
              <article
                key={service.index}
                ref={(el) => {
                  articlesRef.current[idx] = el
                }}
                className="lg:min-h-screen flex flex-col justify-center py-20 lg:py-24 border-t border-white/10"
              >
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {service.index} / {String(SERVICES.length).padStart(2, "0")}
                  </span>
                  <span className="block w-8 h-px bg-white/20" />
                </div>

                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/50 mb-3">
                  {service.subtitle}
                </p>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[0.95]">
                  {service.title}
                </h3>

                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-md">
                  {service.description}
                </p>

                {/* features */}
                <div className="space-y-5 mb-10">
                  {service.features.map((group, j) => (
                    <div key={j} className="grid grid-cols-12 gap-4 items-baseline">
                      <p className="col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 pt-1">
                        {group.label}
                      </p>
                      <ul className="col-span-9 space-y-1.5">
                        {group.items.map((item, k) => (
                          <li
                            key={k}
                            className="text-sm md:text-base text-white/85 leading-snug"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <TransitionLink
                  href={service.href}
                  className="group inline-flex items-center gap-3 text-sm border-b border-white/80 pb-1.5 hover:gap-5 transition-all duration-300 self-start"
                >
                  詳細を見る
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </TransitionLink>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ モバイル用 iframe (下に1枚) ━━━ */}
      <div className="lg:hidden relative w-full h-[60vh] bg-black border-t border-white/10">
        <iframe
          src="/network-background-4layer.html"
          title="Network Visualization"
          loading="lazy"
          scrolling="no"
          className="block w-full h-full border-0"
        />
      </div>
    </section>
  )
}

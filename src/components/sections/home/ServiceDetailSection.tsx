"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import TransitionLink from "@/components/ui/TransitionLink"
import { homeServiceSummaryAssets } from "@/data/services"
import { LayeredNetworkBackground } from "@/components/visuals/Visuals"

// layeredNetworkScene.ts の LAYER_COUNT と一致させること
const NETWORK_LAYER_COUNT = 3

// PC(lg 以上)とスマホで 3D の置き場所が違う。両方置くと 3D が 2 つ動くので、
// 画面幅に合う方だけを描画する。
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return isDesktop
}

export default function ServiceDetailSection() {
  const t = useTranslations("data.services.homeServiceSummaries")
  const tSection = useTranslations("sections.service")
  const articlesRef = useRef<(HTMLElement | null)[]>([])
  const [focusLayer, setFocusLayer] = useState(-1)
  const isDesktop = useIsDesktop()

  // 表示中の service を検出 → 対応する slab をフォーカス
  useEffect(() => {
    const visibility = articlesRef.current.map(() => 0)

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
        setFocusLayer(maxIdx === -1 ? -1 : NETWORK_LAYER_COUNT - 1 - maxIdx)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    articlesRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative bg-black text-white">
      {/* ━━━ モバイル用: 背景に常駐する sticky な 3D ━━━ */}
      <div className="lg:hidden absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full">
          {isDesktop === false && (
            <LayeredNetworkBackground
              focusLayer={focusLayer}
              className="block w-full h-full bg-black"
            />
          )}
          {/* テキスト可読性のための黒オーバーレイ */}
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        </div>
      </div>

      <div className="flex relative z-10">
        {/* ━━━ 左: sticky な 3D (PCのみ表示) ━━━ */}
        <div className="hidden lg:block w-[58%] xl:w-[60%] shrink-0">
          <div className="sticky top-0 h-screen w-full bg-black">
            {/* 3D は置き場所いっぱいに描画するので、高さを少し短くして上に寄せると
                スラブの中心が画面の上の方に来る。下の余白はbg-blackで馴染ませる */}
            {isDesktop === true && (
              <LayeredNetworkBackground
                focusLayer={focusLayer}
                className="block w-full h-[90vh] bg-black"
              />
            )}
          </div>
        </div>

        {/* ━━━ 右: スクロールするコンテンツ ━━━ */}
        <div className="flex-1 min-w-0 relative z-10">
          <div className="max-w-[600px] mx-auto lg:mx-0 lg:ml-0 lg:mr-auto px-6 md:px-10 lg:pr-16 xl:pr-24 py-20 lg:py-0">
            {/* セクションヘッダー: 最初の画面に被せる */}
            <div className="lg:min-h-screen flex flex-col justify-center py-16 lg:py-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
                Services / {String(homeServiceSummaryAssets.length).padStart(2, "0")}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight mb-6">
                {tSection.rich("home.headline", { br: () => <br /> })}
              </h2>
              <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md">
                {tSection("home.lead")}
              </p>
              <div className="mt-10 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                <span className="block w-10 h-px bg-white/30" />
                Scroll
              </div>
            </div>

            {/* 各サービス: 1画面分づつ縦に積む */}
            {homeServiceSummaryAssets.map((service, idx) => (
              <article
                key={service.index}
                ref={(el) => {
                  articlesRef.current[idx] = el
                }}
                className="lg:min-h-screen flex flex-col justify-center py-20 lg:py-24 border-t border-white/10"
              >
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {service.index} / {String(homeServiceSummaryAssets.length).padStart(2, "0")}
                  </span>
                  <span className="block w-8 h-px bg-white/20" />
                </div>

                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/50 mb-3">
                  {t(`${service.id}.subtitle`)}
                </p>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[0.95]">
                  {t(`${service.id}.title`)}
                </h3>

                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-md">
                  {t(`${service.id}.description`)}
                </p>

                {/* features */}
                <div className="space-y-5 mb-10">
                  {Array.from({ length: service.featureGroupCount }, (_, j) => (
                    <div key={j} className="grid grid-cols-12 gap-4 items-baseline">
                      <p className="col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 pt-1">
                        {t(`${service.id}.features.${j}.label`)}
                      </p>
                      <ul className="col-span-9 space-y-1.5">
                        {Array.from({ length: service.featureItemCounts[j] }, (_, k) => (
                          <li
                            key={k}
                            className="text-sm md:text-base text-white/85 leading-snug"
                          >
                            {t(`${service.id}.features.${j}.items.${k}`)}
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
                  {tSection("viewDetails")}
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

    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TransitionLink from "@/components/ui/TransitionLink"

gsap.registerPlugin(ScrollTrigger)

type Tile = { src: string; aspect: string }

// 4列 × 5枚 = 20枠。10枚を順序を変えて2周。各列の総高さがセクションの2.5倍以上になり、
// パララックス中も常に写真が画面を埋めるよう設計。
const COLUMNS: Tile[][] = [
  [
    { src: "/images/gallery/01.jpg", aspect: "3 / 4" },
    { src: "/images/gallery/05.jpg", aspect: "4 / 5" },
    { src: "/images/gallery/09.jpg", aspect: "4 / 3" },
    { src: "/images/gallery/03.jpg", aspect: "3 / 4" },
    { src: "/images/gallery/07.jpg", aspect: "4 / 5" },
  ],
  [
    { src: "/images/gallery/02.jpg", aspect: "4 / 3" },
    { src: "/images/gallery/06.jpg", aspect: "3 / 4" },
    { src: "/images/gallery/10.jpg", aspect: "4 / 5" },
    { src: "/images/gallery/04.jpg", aspect: "4 / 3" },
    { src: "/images/gallery/08.jpg", aspect: "3 / 4" },
  ],
  [
    { src: "/images/gallery/03.jpg", aspect: "4 / 5" },
    { src: "/images/gallery/07.jpg", aspect: "4 / 3" },
    { src: "/images/gallery/01.jpg", aspect: "3 / 4" },
    { src: "/images/gallery/05.jpg", aspect: "4 / 3" },
    { src: "/images/gallery/09.jpg", aspect: "3 / 4" },
  ],
  [
    { src: "/images/gallery/04.jpg", aspect: "3 / 4" },
    { src: "/images/gallery/08.jpg", aspect: "4 / 3" },
    { src: "/images/gallery/02.jpg", aspect: "4 / 5" },
    { src: "/images/gallery/06.jpg", aspect: "4 / 3" },
    { src: "/images/gallery/10.jpg", aspect: "3 / 4" },
  ],
]

// ピン中のスクロール進行に応じて各列のyPercentが [from, to] へ遷移。
// 列ごとの差分が「列ごとにスピードが違う」感覚を生む。
const COL_RANGE: [number, number][] = [
  [0, -30],
  [-5, -55],
  [-2, -25],
  [-8, -48],
]

export default function JoinUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const colRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const triggers: ScrollTrigger[] = []

    // セクションをピン留めし、その間に列をスクロールさせる
    const pinST = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
    })
    triggers.push(pinST)

    colRefs.current.forEach((col, i) => {
      if (!col) return
      const [from, to] = COL_RANGE[i] ?? [0, 0]
      const tween = gsap.fromTo(
        col,
        { yPercent: from },
        {
          yPercent: to,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: 1,
          },
        }
      )
      const st = tween.scrollTrigger
      if (st) triggers.push(st)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-zinc-950 overflow-hidden"
      data-bg="dark"
    >
      {/* ━━━ フォトグリッド (背面) ━━━ */}
      <div className="absolute inset-0 w-[120vw] -ml-[10vw] grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {COLUMNS.map((col, i) => (
          <div
            key={i}
            ref={(el) => {
              colRefs.current[i] = el
            }}
            className="flex flex-col gap-2 md:gap-3 will-change-transform"
          >
            {col.map((img, j) => (
              <div
                key={j}
                className="relative w-full overflow-hidden bg-zinc-900"
                style={{ aspectRatio: img.aspect }}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ━━━ 上下のグラデーション (テキスト可読性確保) ━━━ */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] z-10 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* ━━━ 前面コンテンツ: タイトル(上) と CTA(下) ━━━ */}
      <div className="relative z-20 h-full flex flex-col justify-between pt-[14vh] md:pt-[16vh] pb-[8vh] md:pb-[10vh]">
        {/* Title */}
        <div className="max-w-[1500px] mx-auto w-full px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-2">
              <span className="text-xs text-white/60 uppercase tracking-[0.3em]">Careers</span>
            </div>
            <div className="md:col-span-10">
              <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-bold text-white leading-[0.95] tracking-tight">
                Join Us
              </h2>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 max-w-xl">
                日本発のNo.1AIメーカーを作る仲間を探しています。
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1500px] mx-auto w-full px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-white/20 pt-6 md:pt-8">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-[0.3em] mb-2">採用情報</p>
              <p className="text-xl md:text-2xl text-white">
                一緒に未来をつくる仲間を募集中。
              </p>
            </div>
            <TransitionLink
              href="/recruit"
              className="group inline-flex items-center gap-3 text-base md:text-lg text-white border-b border-white pb-1.5 hover:gap-5 transition-all duration-300 self-start md:self-auto"
            >
              募集中のポジションを見る
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  )
}

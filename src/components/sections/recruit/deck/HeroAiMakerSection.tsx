'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Tile = { src: string; aspect: string }

// 18枚の画像を3列×12タイル(計36スロット)に2回ずつ均等配置。
// 各画像のペアは「別の列」かつ「6行差」になるよう設計してあり、
// 画面に同時表示される範囲(≒15タイル)では重複が出ないようになっている。
// 配置: Col1 = [1..12], Col2 = [13..18, 1..6], Col3 = [7..12, 13..18]
// 各行で3列が常に異なる画像 / アスペクト比は3パターンを散らしてPinterest的リズムを作る。
const GALLERY_COLUMNS: Tile[][] = [
  // Col 1: images 1-12
  [
    { src: '/images/join-us/01.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/02.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/03.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/04.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/05.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/06.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/07.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/08.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/09.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/10.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/11.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/12.jpg', aspect: '4 / 3' },
  ],
  // Col 2: images 13-18 + 1-6 (1-6 と Col1 の同画像は 6行ズレ)
  [
    { src: '/images/join-us/13.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/14.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/15.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/16.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/17.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/18.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/01.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/02.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/03.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/04.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/05.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/06.jpg', aspect: '3 / 4' },
  ],
  // Col 3: images 7-12 + 13-18 (7-12 と Col1 / 13-18 と Col2 はそれぞれ 6行ズレ)
  [
    { src: '/images/join-us/07.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/08.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/09.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/10.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/11.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/12.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/13.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/14.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/15.jpg', aspect: '4 / 3' },
    { src: '/images/join-us/16.jpg', aspect: '3 / 4' },
    { src: '/images/join-us/17.jpg', aspect: '4 / 5' },
    { src: '/images/join-us/18.jpg', aspect: '4 / 3' },
  ],
]

// 各列のスクロール量(yPercent)。スピードを少しずつズラして「列ごとに違う動き」を作る。
// from > to なら上向き(↑)、from < to なら下向き(↓)に動く。
const COL_RANGE: [number, number][] = [
  [0, -22],     // 列1: 上向き(↑)
  [-30, -4],    // 列2: 下向き(↓) — 逆方向
  [-2, -26],    // 列3: 上向き(↑)
]

const MANUFACTURING_LINE = [
  {
    tag: 'Platform / 開発基盤',
    name: 'Flowerium',
    body: 'AIソリューションを生み出す土台。データ整備〜AIエージェント実行までを一体で提供する開発基盤。',
  },
  {
    tag: 'Product / 業界特化',
    name: 'ARCHAIVE',
    body: '製造業・建設・設計業の図面データをAIで一元化。類似検索からチャット型データ抽出まで。',
  },
  {
    tag: 'Product / 業界特化',
    name: 'SEND AI',
    body: 'サプライチェーンの分断データを統合し、需要予測・発注最適化・在庫管理を一気通貫で支援。',
  },
]

export default function HeroAiMakerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const colRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const triggers: ScrollTrigger[] = []

    colRefs.current.forEach((col, i) => {
      if (!col) return
      const [from, to] = COL_RANGE[i] ?? [0, 0]
      const tween = gsap.fromTo(
        col,
        { yPercent: from },
        {
          yPercent: to,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      )
      const st = tween.scrollTrigger
      if (st) triggers.push(st)
    })

    // 画像のlazy読み込み完了後にレイアウトを再計測
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      window.clearTimeout(refreshTimer)
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white" data-bg="light">
      <div className="flex flex-col lg:flex-row-reverse">
        {/* ━━━━━ LEFT: Hero + AiMaker (普通にスクロール) ━━━━━ */}
        <div className="w-full lg:w-[58%]">
          {/* ─── Hero: Photo + Code the Culture ─── */}
          <div className="relative h-[80vh] lg:h-screen lg:min-h-[720px] overflow-hidden">
            <Image
              src="/images/recruit/recruit-hero.jpg"
              alt="STARUPからの眺め"
              fill
              priority
              unoptimized
              className="object-cover object-center"
            />
            {/* 可読性のための白フェード(下を強めに) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.92) 100%)',
              }}
            />
            <div className="relative h-full max-w-[820px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col justify-between py-10 lg:py-16">
              <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.3em]">
                <span>Recruit</span>
                <span className="w-6 h-px bg-gray-400" />
                <span>Company Deck</span>
              </div>

              <div>
                <h1 className="text-[5.5rem] md:text-[7.5rem] lg:text-[7.5rem] xl:text-[9rem] font-medium text-gray-900 leading-[0.9] tracking-tight">
                  Code<br />the<br />Culture
                </h1>
                <p className="mt-6 md:mt-10 text-sm md:text-base text-gray-700 italic max-w-md leading-relaxed">
                  STARUPは、文化からつくる<br />AIメーカーである。
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
                <span className="w-10 h-px bg-gray-400" />
                <span>Scroll</span>
              </div>
            </div>
          </div>

          {/* ─── AiMaker content ─── */}
          <div className="py-20 md:py-28 lg:py-32 border-t border-gray-200">
            <div className="max-w-[820px] mx-auto px-6 md:px-10 lg:px-14">
              {/* Header */}
              <div className="mb-14 md:mb-20">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-2">Prologue</p>
                <p className="text-sm text-gray-500 mb-8">STARUP = AIメーカー</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-[1.15] tracking-tight">
                  AI業界の、<br />
                  No.1 AIメーカーへ。
                </h2>
              </div>

              {/* Manifesto */}
              <div className="mb-20 md:mb-28">
                <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 leading-[1.5] tracking-tight max-w-[34ch] mb-10 md:mb-14">
                  産業に眠るデータを、<br />
                  <span className="text-gray-400">人間の意思決定を変える</span>AIへ。
                </p>
                <div className="space-y-6 max-w-[60ch]">
                  <p className="text-sm md:text-base text-gray-800 leading-[2]">
                    私たちはAIカンパニーとして、AI業界の
                    <span className="border-b border-gray-900 pb-0.5 mx-0.5">No.1 AIメーカー</span>
                    を目指します。各企業・各業界に眠るデータをAI Readyな形に基盤化し、人間の意思決定に関与するところまで品質と顧客体験を仕上げ、届ける会社です。
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-[2]">
                    作る製品が「当たり前に使える」ことは前提として、顧客に
                    <span className="border-b border-gray-900 pb-0.5 mx-0.5">ワクワクという顧客体験</span>
                    までを届けます。
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-[2]">
                    その手段として、AIソリューション開発基盤「Flowerium」を中核に、ARCHAIVE・SEND AIのような業界特化AIプロダクトを連続的に生み出し、産業の意思決定を最適化していきます。
                  </p>
                </div>
              </div>

              {/* Manufacturing line */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-2">Manufacturing Line</p>
                <p className="text-sm text-gray-500 mb-8">STARUPの製品ライン</p>
                <div className="border-t border-gray-300">
                  {MANUFACTURING_LINE.map((line) => (
                    <div
                      key={line.name}
                      className="relative border-b border-gray-200 py-7 md:py-8 px-3 -mx-3 grid grid-cols-12 gap-y-2 gap-x-3 md:gap-x-5 items-baseline rounded-sm bg-white transition-all duration-300 ease-out hover:shadow-[0_0_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:z-10 hover:border-transparent"
                    >
                      <span className="col-span-12 text-[10px] text-gray-400 uppercase tracking-widest">
                        {line.tag}
                      </span>
                      <h3 className="col-span-12 md:col-span-4 text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                        {line.name}
                      </h3>
                      <p className="col-span-12 md:col-span-8 text-sm text-gray-500 leading-relaxed">
                        {line.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━ RIGHT: Sticky Pinterest-style gallery (lg+のみ) ━━━━━ */}
        <aside className="hidden lg:block w-[42%] relative">
          <div className="sticky top-0 h-screen overflow-hidden bg-white">
            <div className="absolute inset-x-0 top-0 grid grid-cols-3 gap-2 px-2 pt-2">
              {GALLERY_COLUMNS.map((col, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    colRefs.current[i] = el
                  }}
                  className="flex flex-col gap-2 will-change-transform"
                >
                  {col.map((img, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="relative w-full overflow-hidden bg-gray-100 rounded-sm"
                      style={{ aspectRatio: img.aspect }}
                    >
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 16vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* 上下端を白でフェードしてテキスト側との繋ぎを馴染ませる */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-white to-transparent" />
          </div>
        </aside>
      </div>
    </section>
  )
}

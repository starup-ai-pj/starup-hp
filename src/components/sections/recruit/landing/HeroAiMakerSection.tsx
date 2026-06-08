'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TransitionLink from '@/components/ui/TransitionLink'

gsap.registerPlugin(ScrollTrigger)

type Tile = { src: string; aspect: string; focus?: string }

// 画像ごとに「写真の中身を見て決めた」最適なクロップを定義する。
// 同じ画像はどの列でも同じアスペクトで表示する(=二重人格を回避)。
// focus は object-position 用。デフォルトは center で問題ない画像のみ省略。
const TILES: Record<number, Pick<Tile, 'aspect' | 'focus'>> = {
  1: { aspect: '3 / 2' },                            // 横長: オフィス+山並み (空気感そのまま)
  2: { aspect: '3 / 4', focus: '30% center' },       // 縦長: 横顔タイピング - あえて右側を切って横顔に寄せる
  3: { aspect: '4 / 5' },                            // 縦長ソフト: 3人で画面を見る瞬間
  4: { aspect: '2 / 3' },                            // 縦長 native: 廊下の遠近感
  5: { aspect: '3 / 2' },                            // 横長: 2人+逆光ドア
  6: { aspect: '2 / 1', focus: 'center 60%' },       // シネマ横: 横断歩道 (車道の広がりを残す)
  7: { aspect: '3 / 2' },                            // 横長: 木漏れ日の中の群像
  8: { aspect: '4 / 5', focus: '50% 40%' },          // 縦長ソフト: 中央の笑顔フォーカス
  9: { aspect: '3 / 2' },                            // 横長: ベンチ+芝生
  10: { aspect: '2 / 1', focus: 'center 65%' },      // シネマ横: 土塀沿いの行列 (建物のリズム)
  11: { aspect: '1 / 1', focus: '55% center' },      // スクエア: モニター対称構図
  12: { aspect: '3 / 2' },                           // 横長: 3人横顔の流れ
  13: { aspect: '2 / 3', focus: '50% 40%' },         // 縦長 (ドラマチック): 中央フォーカス+両端ブラー
  14: { aspect: '3 / 2' },                           // 横長: 屋外を歩く群像
  15: { aspect: '4 / 5', focus: '50% 45%' },         // 縦長ソフト: 笑顔の会話
  16: { aspect: '2 / 3' },                           // 縦長 native: 木々のキャノピー
  17: { aspect: '3 / 4', focus: '60% center' },     // 縦長: 会話の表情 (右の人物に寄せる)
  18: { aspect: '2 / 1', focus: 'center 70%' },      // シネマ横: 壁沿いの行列
}

const tile = (n: number): Tile => ({
  src: `/images/gallery/${String(n).padStart(2, '0')}.jpg`,
  ...TILES[n],
})

// 18枚を3列に6枚ずつ排他的に割り当て、列内では2回ループして12タイル。
// 列ごとに専用の画像セットなので、列をまたぐ重複は物理的に発生しない (= 同一画面ダブり0)。
// 同じ列内の繰り返しは6行差なので、ビューポート(≒3-4行)内では同時表示されない。
// 緑(屋外)もアスペクトも各列にバランス良く分散。
const COL_1_SEQ = [7, 2, 6, 14, 11, 13] // 緑×2, 室内×2, 街×2
const COL_2_SEQ = [8, 12, 15, 18, 17, 5] // 緑×3, 室内×2, 街×1
const COL_3_SEQ = [9, 1, 16, 3, 10, 4]  // 緑×2, 室内×3, 街×1

const GALLERY_COLUMNS: Tile[][] = [
  [...COL_1_SEQ, ...COL_1_SEQ].map(tile),
  [...COL_2_SEQ, ...COL_2_SEQ].map(tile),
  [...COL_3_SEQ, ...COL_3_SEQ].map(tile),
]

// 各列のスクロール量(yPercent)。スピードを少しずつズラして「列ごとに違う動き」を作る。
// from > to なら上向き(↑)、from < to なら下向き(↓)に動く。
const COL_RANGE: [number, number][] = [
  [0, -22],     // 列1: 上向き(↑)
  [-30, -4],    // 列2: 下向き(↓) — 逆方向
  [-2, -26],    // 列3: 上向き(↑)
]

// 製品ラインの順序（テキストは sections.recruit.landing.aiMaker.lines に置く）
const MANUFACTURING_LINE_IDS = ['flowerium', 'archaive', 'sendAi'] as const

export default function HeroAiMakerSection() {
  const t = useTranslations('sections.recruit.landing')
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
              src="/images/recruit/hero.jpg"
              alt={t('hero.heroImageAlt')}
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
                <span>{t('hero.eyebrow')}</span>
                <span className="w-6 h-px bg-gray-400" />
                <span>{t('hero.deck')}</span>
              </div>

              <div>
                <h1 className="text-[5.5rem] md:text-[7.5rem] lg:text-[7.5rem] xl:text-[9rem] font-medium text-gray-900 leading-[0.9] tracking-tight">
                  {t('hero.titleLine1')}<br />{t('hero.titleLine2')}<br />{t('hero.titleLine3')}
                </h1>
                <p className="mt-6 md:mt-10 text-sm md:text-base text-gray-700 italic max-w-md leading-relaxed">
                  {t.rich('hero.tagline', { br: () => <br /> })}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
                <span className="w-10 h-px bg-gray-400" />
                <span>{t('hero.scroll')}</span>
              </div>
            </div>
          </div>

          {/* ─── AiMaker content ─── */}
          <div className="py-20 md:py-28 lg:py-32 border-t border-gray-200">
            <div className="max-w-[820px] mx-auto px-6 md:px-10 lg:px-14">
              {/* Header */}
              <div className="mb-14 md:mb-20">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-2">{t('aiMaker.prologueLabel')}</p>
                <p className="text-sm text-gray-500 mb-8">{t('aiMaker.prologueLead')}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-[1.15] tracking-tight">
                  {t.rich('aiMaker.heading', { br: () => <br /> })}
                </h2>
              </div>

              {/* Manifesto */}
              <div className="mb-20 md:mb-28">
                <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 leading-[1.5] tracking-tight max-w-[34ch] mb-10 md:mb-14">
                  {t.rich('aiMaker.manifestoTitle', {
                    br: () => <br />,
                    span: (chunks) => <span className="text-gray-400">{chunks}</span>,
                  })}
                </p>
                <div className="space-y-6 max-w-[60ch]">
                  <p className="text-sm md:text-base text-gray-800 leading-[2]">
                    {t.rich('aiMaker.manifestoBody1', {
                      span: (chunks) => <span className="border-b border-gray-900 pb-0.5 mx-0.5">{chunks}</span>,
                    })}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-[2]">
                    {t.rich('aiMaker.manifestoBody2', {
                      span: (chunks) => <span className="border-b border-gray-900 pb-0.5 mx-0.5">{chunks}</span>,
                    })}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-[2]">
                    {t('aiMaker.manifestoBody3')}
                  </p>
                </div>
              </div>

              {/* Manufacturing line */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-2">{t('aiMaker.lineLabel')}</p>
                <p className="text-sm text-gray-500 mb-8">{t('aiMaker.lineLead')}</p>
                <div className="border-t border-gray-300">
                  {MANUFACTURING_LINE_IDS.map((id) => (
                    <div
                      key={id}
                      className="relative border-b border-gray-200 py-7 md:py-8 px-3 -mx-3 grid grid-cols-12 gap-y-2 gap-x-3 md:gap-x-5 items-baseline rounded-sm bg-white transition-all duration-300 ease-out hover:shadow-[0_0_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:z-10 hover:border-transparent"
                    >
                      <span className="col-span-12 text-[10px] text-gray-400 uppercase tracking-widest">
                        {t(`aiMaker.lines.${id}.tag`)}
                      </span>
                      <h3 className="col-span-12 md:col-span-4 text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                        {t(`aiMaker.lines.${id}.name`)}
                      </h3>
                      <p className="col-span-12 md:col-span-8 text-sm text-gray-500 leading-relaxed">
                        {t(`aiMaker.lines.${id}.body`)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 md:mt-14 flex justify-end">
                  <TransitionLink
                    href="/service"
                    className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all duration-300"
                  >
                    {t('aiMaker.serviceLink')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </TransitionLink>
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
                        style={img.focus ? { objectPosition: img.focus } : undefined}
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

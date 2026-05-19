'use client'

import Image from 'next/image'
import TransitionLink from '@/components/ui/TransitionLink'
import { PhotoGalleryWall } from '@/components/animation/photo-wall/PhotoGalleryWall'
import CultureMissionVisual from '@/components/animation/culture/CultureMissionVisual'
import CultureVisionVisual from '@/components/animation/culture/CultureVisionVisual'

const VALUES = [
  {
    num: '01',
    title: 'Ownership',
    subtitle: '当事者意識を持つ',
    body: '顧客・プロダクト・事業・会社の成長を自分ごととして捉え、評論ではなく実装で最後まで前に進める。',
  },
  {
    num: '02',
    title: 'not cynical',
    subtitle: '斜に構えない',
    body: 'できない理由ではなく実現する方法を考え、顧客・現場・仲間・外部の声に素直に向き合う。',
  },
  {
    num: '03',
    title: 'stay curious, stay grounded',
    subtitle: 'ワクワクと現場を大切に',
    body: 'ワクワクと現場への深い理解を行き来し、顧客が本当に使える価値に変える。',
  },
  {
    num: '04',
    title: 'Be a multiplier',
    subtitle: '三人寄れば文殊の知恵',
    body: 'チームで知恵を出し合い、最善の答えを出すことを意識する。',
  },
]

export default function CulturePage() {
  return (
    <div className="bg-white">

      {/* ━━━ Hero: フルブリード画像 + オーバーレイタイトル ━━━ */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <Image
          src="/images/culture/culture-hero.jpg"
          alt="Culture"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-[28%] md:top-[30%] left-0 w-full px-4">
          <div className="max-w-[1500px] mx-auto">
            <p className="text-sm text-white/70 uppercase tracking-widest mb-4">Culture</p>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-medium text-white leading-[0.95]">
              What We<br />Believe In
            </h1>
          </div>
        </div>
      </section>

      {/* ━━━ Mission: 雑誌風レイアウト ━━━ */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* ビジュアル: 左寄せ、セクション全体の背景として */}
        <div className="absolute top-[15%] bottom-[-5%] left-0 w-[55%] lg:w-[50%]">
          <CultureMissionVisual />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-4">
          {/* ラベル */}
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-12 md:mb-20">Mission</p>

          {/* 巨大タイポ */}
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium text-gray-900 leading-[1.15] max-w-[1200px] mb-6 md:mb-8">
            思想をテクノロジーに変え、<br />
            産業と文化の構造を<br className="hidden md:inline" />再構築する。
          </h2>
          <p className="text-base md:text-xl text-gray-400 italic mb-20 md:mb-32">
            Transform thought into technology,<br className="md:hidden" /> redesigning the structures of industry and culture.
          </p>

          {/* 解説文: 右下に配置 */}
          <div className="ml-auto w-full lg:w-[40%]">
            <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
              <p>
                「SaaSやSIerが蔓延る業界自体を徹底的に変える」という破壊的な意味と、「提供する産業の構造をプロダクトで変える」という創造的目的を意図しています。
              </p>
              <p>
                既存の業界慣習や非合理な構造を壊し、独自の思想とテクノロジーを融合させて、社会・産業・文化の仕組みを根本から再設計する存在であり続けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Vision: 雑誌風レイアウト（左右逆） ━━━ */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* ビジュアル: 右寄せ、セクション全体の背景として */}
        <div className="absolute top-[15%] bottom-[-5%] right-0 w-[80%] lg:w-[75%]">
          <CultureVisionVisual />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-4">
          {/* ラベル */}
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-12 md:mb-20">Vision</p>

          {/* 巨大タイポ */}
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium text-gray-900 leading-[1.15] max-w-[1200px] mb-6 md:mb-8">
            テクノロジーで文化を創り、<br />
            時代を超えて価値を残す。
          </h2>
          <p className="text-base md:text-xl text-gray-400 italic mb-20 md:mb-32">
            Create culture through technology,<br className="md:hidden" /> leaving timeless value.
          </p>

          {/* 解説文: ビジュアルと重なるよう右寄せ */}
          <div className="w-full lg:w-[40%] lg:ml-[25%]">
            <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
              <p>
                テクノロジーを通じて、人々の生活や思考に新しい文化を生み出し、時代を重ねるごとに価値が上がり続ける企業を目指します。
              </p>
              <p>
                SaaSのような流行的なサービスではなく、人間生活の社会基盤に根付き、100年後も通用するブランドを築く。既存の概念を自分たちの思想と哲学でテクノロジーに変え、文化を創り、時代を超えて価値を残します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Value: 2列コンパクト ━━━ */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-[1500px] mx-auto px-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Value</p>
          <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-12 md:mb-16">
            4 Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {VALUES.map((value) => (
              <div key={value.num} className="border-t border-gray-200 py-8 md:py-10">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-2xl md:text-3xl font-medium text-gray-300">{value.num}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-gray-900">{value.title}</h3>
                    <p className="text-xs text-gray-500">{value.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed pl-12 md:pl-14">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Work Style: 横3分割、ミニマル ━━━ */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1500px] mx-auto px-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Work Style</p>
          <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-16 md:mb-24 max-w-2xl">
            少数精鋭で、速く、本質的に。
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="border-t border-gray-200 pt-8 pb-12 md:pr-12">
              <span className="text-xs text-gray-400 uppercase tracking-widest">01</span>
              <h3 className="text-xl font-medium text-gray-900 mt-4 mb-4">少数精鋭</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                一人ひとりの裁量が大きく、意思決定に直接関わることができます。大企業では味わえないスピード感と手触り感のある仕事が待っています。
              </p>
            </div>
            <div className="border-t border-gray-200 pt-8 pb-12 md:px-12 md:border-l">
              <span className="text-xs text-gray-400 uppercase tracking-widest">02</span>
              <h3 className="text-xl font-medium text-gray-900 mt-4 mb-4">意思決定スピード</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                承認フローは最小限。良いアイデアは即実行。スピードこそが私たちの最大の武器です。
              </p>
            </div>
            <div className="border-t border-gray-200 pt-8 pb-12 md:pl-12 md:border-l">
              <span className="text-xs text-gray-400 uppercase tracking-widest">03</span>
              <h3 className="text-xl font-medium text-gray-900 mt-4 mb-4">京都拠点 × リモート</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                京都御所オフィスを拠点に、リモートワークも柔軟に取り入れています。集中とコラボレーションのバランスを大切にしています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ フォトギャラリー ━━━ */}
      <PhotoGalleryWall />

      {/* ━━━ CTA ━━━ */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TransitionLink
              href="/member"
              className="group block border border-gray-200 p-10 md:p-14 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Member</p>
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                メンバーを見る
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                一緒に働くチームメンバーをご紹介します。
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                View more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>
            <TransitionLink
              href="/recruit/jobs"
              className="group block border border-gray-200 p-10 md:p-14 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Jobs</p>
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                募集職種を見る
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                現在募集中のポジションをご覧ください。
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                View more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>
          </div>
        </div>
      </section>
    </div>
  )
}

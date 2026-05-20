'use client'

import TransitionLink from '@/components/ui/TransitionLink'

const MISSION_BODY = [
  '「SaaSやSIerが蔓延る業界自体を徹底的に変える」という破壊的な意味と、「提供する産業の構造をプロダクトで変える」という創造的目的を意図しています。',
  '人工知能により、既存の業界慣習や非合理な構造を壊し、独自の思想とテクノロジーを融合させて、社会・産業・文化の「仕組み」を根本から再設計する存在であり続けます。',
  '人間の意思決定の最適化に大きく寄与することを目指します。',
  '製造業に始まり、行政、建設、小売、物流業など様々な業界の当たり前に、既存の創り上げられてきた価値あるものを残しつつ、AIというエッセンスを加え、新しい「当たり前」を創ります。',
]

const VALUES = [
  { num: '01', title: 'Ownership' },
  { num: '02', title: 'not cynical' },
  { num: '03', title: 'stay curious,\nstay grounded' },
  { num: '04', title: 'Be a multiplier' },
]

export default function MissionSection() {
  return (
    <section className="py-24 md:py-40" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* ━━━ Mission ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">Mission</p>
            <p className="text-sm text-gray-500">わたしたちの使命</p>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-medium text-gray-900 leading-[1.12] tracking-tight max-w-[1200px]">
              産業と文化の構造を、<br />
              再構築する。
            </h2>
            <p className="mt-6 md:mt-8 text-base md:text-xl text-gray-400 italic mb-16 md:mb-24">
              Redesigning the structures of industry and culture.
            </p>

            <div className="border-t border-gray-200 pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8">
              {MISSION_BODY.map((p, i) => (
                <p key={i} className="text-sm md:text-base text-gray-700 leading-[2]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━ Values ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-32 md:mt-48">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">Values</p>
            <p className="text-sm text-gray-500">4つの行動指針</p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-10">
              {VALUES.map((v) => (
                <div key={v.num} className="border-t border-gray-300 pt-6 md:pt-8">
                  <p className="text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-medium text-gray-900 leading-[0.9] tracking-tighter mb-8 md:mb-12">
                    {v.num}
                  </p>
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 tracking-tight whitespace-pre-line">
                    {v.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-20 flex justify-end">
              <TransitionLink
                href="/recruit/culture"
                className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all duration-300"
              >
                Cultureページで詳しく見る
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
    </section>
  )
}

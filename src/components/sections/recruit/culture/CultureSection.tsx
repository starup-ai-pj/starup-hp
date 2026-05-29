import TransitionLink from '@/components/ui/TransitionLink'

const PHILOSOPHY_BODY = [
  'STARUPフィロソフィーとは、私たちがどこに向かい、何をしたいか、どうありたいか、どんな価値を提供したいかを示すものです。',
  'AIを単なる効率化ツールではなく、産業の意思決定を変えるためのインフラとして捉えます。現場に眠るデータをAIが活用できる形に整え、業界ごとの意思決定OSをつくっていきます。',
  '経営陣やメンバーが迷ったとき、何を優先すべきか、どの顧客課題に向き合うべきか、どのプロダクトをどう進化させるべきかを判断するための軸として、日々の意思決定に活用しています。',
  'プロダクトもAI開発も顧客への向き合い方も、すべて企業文化のアウトプットだと考えます。だからこそ、技術だけでなく、思想・行動指針・組織文化にも投資していきます。',
]

const VALUES = [
  {
    num: '01',
    title: 'Ownership',
    subtitle: '当事者意識を持つ',
    body: '顧客・プロダクト・事業・会社の成長を自分ごととして捉え、評論ではなく実装で最後まで前に進める。誰かに任せるのではなく、自分が動かす姿勢。',
  },
  {
    num: '02',
    title: 'Not cynical',
    subtitle: '斜に構えない',
    body: 'できない理由ではなく実現する方法を考え、顧客・現場・仲間・外部の声に素直に向き合う。冷笑よりも、素直に試す方が答えに近い。',
  },
  {
    num: '03',
    title: 'Stay curious, stay grounded',
    subtitle: 'ワクワクと現場を大切に',
    body: 'ワクワクと現場への深い理解を行き来し、顧客が本当に使える価値に変える。最先端の好奇心と、地に足のついた実装の両方を持つ。',
  },
  {
    num: '04',
    title: 'Be a multiplier',
    subtitle: '三人寄れば文殊の知恵',
    body: 'チームで知恵を出し合い、最善の答えを出すことを意識する。一人の最大値ではなく、チームとしての出力を最大化する。',
  },
]

const WORK_STYLES = [
  {
    num: '01',
    title: '少数精鋭で、速く。',
    body: '一人ひとりの裁量が大きく、意思決定に直接関わる。承認フローは最小限、良いアイデアは即実行。',
  },
  {
    num: '02',
    title: '現場 → プロダクト直結。',
    body: '現場に入り込んで得た知見が、そのままプロダクトと基盤に還元される。隔たりのない現場と開発の往復。',
  },
  {
    num: '03',
    title: '京都拠点 × リモート可。',
    body: '京都御所近くのオフィスを拠点に、リモートワークも柔軟に。集中とコラボレーションのバランスを大切に。',
  },
]

export default function CultureSection() {
  return (
    <div className="bg-white">
      {/* ━━━ Opening (hero-as-text) ━━━ */}
      <section className="pt-40 pb-32 md:pt-56 md:pb-40 lg:pt-64 lg:pb-56" data-bg="light">
        <SplitLayout
          left={<Marker label="Culture" jaLabel="カルチャー" />}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-gray-900 leading-[0.95] tracking-tight">
            What we<br />believe in.
          </h1>
          <p className="mt-10 md:mt-14 text-base md:text-lg text-gray-500 italic max-w-md leading-relaxed">
            STARUPの文化、思想、判断軸。<br />
            私たちがどう動き、何を選び、何を残していくか。
          </p>
        </SplitLayout>
      </section>

      {/* ━━━ Philosophy ━━━ */}
      <section className="py-32 md:py-48 lg:py-56" data-bg="light">
        <SplitLayout
          left={<Marker num="01" label="Philosophy" jaLabel="わたしたちの思想" />}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.15] tracking-tight mb-12 md:mb-16 max-w-[18ch]">
            産業の意思決定を変えるための、<br />
            <span className="text-gray-400">インフラとして。</span>
          </h2>
          <div className="space-y-5 text-sm md:text-base text-gray-700 leading-[2] max-w-2xl">
            {PHILOSOPHY_BODY.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </SplitLayout>
      </section>

      {/* ━━━ Values (4 deep) ━━━ */}
      <section className="py-32 md:py-48 lg:py-56" data-bg="light">
        <SplitLayout
          left={<Marker num="02" label="Values" jaLabel="4つの行動指針" />}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.15] tracking-tight mb-20 md:mb-32">
            4 Values.
          </h2>
          <div className="space-y-24 md:space-y-32">
            {VALUES.map((v) => (
              <article key={v.num}>
                <p className="text-5xl md:text-6xl lg:text-7xl text-gray-200 font-medium leading-none tracking-tighter mb-8 md:mb-12">
                  {v.num}
                </p>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight leading-[1.1] mb-4 md:mb-5">
                  {v.title}
                </h3>
                <p className="text-base md:text-lg text-gray-500 mb-8 md:mb-10">
                  {v.subtitle}
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-[1.95] max-w-xl">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </SplitLayout>
      </section>

      {/* ━━━ Work Style ━━━ */}
      <section className="py-32 md:py-48 lg:py-56" data-bg="light">
        <SplitLayout
          left={<Marker num="03" label="Work Style" jaLabel="わたしたちの働き方" />}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.15] tracking-tight mb-16 md:mb-24">
            少数精鋭で、<br />
            <span className="text-gray-400">本質的に。</span>
          </h2>
          <div className="space-y-14 md:space-y-20">
            {WORK_STYLES.map((w) => (
              <div key={w.num}>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{w.num}</p>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 tracking-tight mb-4">
                  {w.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-[1.95] max-w-xl">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </SplitLayout>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 md:py-32" data-bg="light">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <TransitionLink
              href="/member"
              className="group block border border-gray-200 p-8 md:p-12 hover:border-gray-400 transition-colors"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-12 md:mb-16">Member</p>
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                メンバーを見る
              </h3>
              <p className="text-sm text-gray-500 mb-8">一緒に働くチームメンバーを紹介します。</p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                View more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>

            <TransitionLink
              href="/recruit/jobs"
              className="group block border border-gray-200 p-8 md:p-12 hover:border-gray-400 transition-colors"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-12 md:mb-16">Jobs</p>
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                募集中のポジション
              </h3>
              <p className="text-sm text-gray-500 mb-8">現在募集中のポジションをご覧ください。</p>
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

// ━━━ Layout: 左にセクションマーカー(sticky)、右にコンテンツ（lg+）━━━
function SplitLayout({
  left,
  children,
}: {
  left: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="max-w-[1500px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-32">{left}</div>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </div>
  )
}

// ━━━ 左カラムのセクションマーカー ━━━
function Marker({
  num,
  label,
  jaLabel,
}: {
  num?: string
  label: string
  jaLabel?: string
}) {
  return (
    <div>
      {num ? (
        <p className="text-[5rem] md:text-[6.5rem] lg:text-[8rem] text-gray-200 font-medium leading-[0.85] tracking-tighter mb-6 md:mb-8">
          {num}
        </p>
      ) : (
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-10 h-px bg-gray-300" />
        </div>
      )}
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.35em] mb-2">— {label}</p>
      {jaLabel && <p className="text-sm text-gray-500">{jaLabel}</p>}
    </div>
  )
}


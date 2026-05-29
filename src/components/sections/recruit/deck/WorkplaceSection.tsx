import Image from 'next/image'

const ROLES = [
  {
    num: '01',
    name: 'Product',
    subtitle: 'ARCHAIVE / SEND AI',
    body: '業界の意思決定を変える、業界特化AIプロダクトをつくる。図面・サプライチェーンなど、業界のコアデータをAIで再設計していく仕事。',
    roleNames: 'PdM / Engineer / Designer',
  },
  {
    num: '02',
    name: 'AI Solution',
    subtitle: 'Flowerium / 現場とAIをつなぐ',
    body: '現場に入り、顧客のデータと業務を解きほぐしてAIにする。Flowerium基盤を使い、コンサルティングと開発の境目で動く仕事。',
    roleNames: 'AI Engineer / Solution Architect',
  },
  {
    num: '03',
    name: 'BizDev',
    subtitle: '新しい業界・顧客を切り開く',
    body: 'AIで変えるべき産業の最前線を、顧客と一緒に見つけていく。経営層と対話しながら、新しい市場をつくる仕事。',
    roleNames: 'BizDev / Sales / Partnership',
  },
]

const PILLARS = [
  {
    num: '01',
    title: '少数精鋭で、速く。',
    body: '一人ひとりの裁量が大きく、意思決定に直接関わる。大企業では味わえないスピード感と手触り感のある仕事。',
  },
  {
    num: '02',
    title: '現場 → プロダクト直結。',
    body: '現場に入り込んで得た知見が、そのままプロダクトと基盤に還元される。隔たりのない現場と開発の往復。',
  },
  {
    num: '03',
    title: '思想と行動指針が、判断軸。',
    body: '評価も意思決定も、STARUPのValueとフィロソフィーがベース。何を優先すべきか、迷ったときに立ち返る場所がある。',
  },
]

export default function WorkplaceSection() {
  return (
    <section className="py-24 md:py-40" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* ━━━ Section header ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">Workplace</p>
            <p className="text-sm text-gray-500">ここで働くということ</p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-medium text-gray-900 leading-[1.12] tracking-tight">
              ここで、一緒に<br />
              <span className="text-gray-400">つくるもの。</span>
            </h2>
          </div>
        </div>

        {/* ━━━ Roles map ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">Roles</p>
            <p className="text-sm text-gray-500">仕事の3つの軸</p>
          </div>
          <div className="lg:col-span-9">
            <div className="border-t border-gray-300">
              {ROLES.map((r) => (
                <div
                  key={r.num}
                  className="border-b border-gray-200 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-y-4 gap-x-8"
                >
                  <div className="lg:col-span-3">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                      {r.num}
                    </span>
                    <h3 className="mt-3 text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                      {r.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{r.subtitle}</p>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-sm md:text-base text-gray-700 leading-[1.95]">
                      {r.body}
                    </p>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                      Roles
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.roleNames}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━ How we work ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">How we work</p>
            <p className="text-sm text-gray-500">チームの動き方</p>
          </div>
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {PILLARS.map((p) => (
                <div key={p.num} className="border-t border-gray-300 pt-6 md:pt-8">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                    {p.num}
                  </span>
                  <h3 className="mt-4 mb-4 text-xl md:text-2xl font-medium text-gray-900 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━ Office ━━━ */}
        <div className="relative aspect-[3/2] md:aspect-[16/9] w-full">
          <Image
            src="/images/recruit/office.jpg"
            alt="STARUP 京都オフィス"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 100vw, 100vw"
            unoptimized
          />
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">Office</p>
            <p className="text-xs md:text-sm mt-1">STARUP Kyoto Office</p>
          </div>
        </div>
      </div>
    </section>
  )
}

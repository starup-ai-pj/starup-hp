import Image from 'next/image'

const OPENING = [
  '私たちは、テクノロジーによる、既存産業・文化の再構築というミッションを掲げ、事業を行っております。',
  '日本の製造業、建設業、インフラ、小売などの産業には、世界に誇る技術と現場があります。しかし、その多くは未だに分断されたデータ、属人的な判断、古いシステム構造の上で動いています。本来つながるべき情報がつながっていない。その結果、本来もっと速く、もっと強く進化できるはずの現場が、構造的な制約によって力を発揮しきれていないと感じています。',
  'STARUPは、その構造そのものを変えるために生まれました。私たちは単なる受託開発会社でも、単なるSaaS企業でもありません。現場に深く入り込み、業務を理解し、AIとソフトウェアを用いて「現場の意思決定OS」をつくる会社です。',
]

const CREDO = [
  '現場の知識を、データに変える。',
  'データを、意思決定に変える。',
  '意思決定を、産業の進化につなげる。',
]

const CLOSING = [
  '世界では、ソフトウェアが国家や産業の競争力を決める時代に入っています。日本にも、日本の産業構造や文化に最適化されたAI基盤が必要です。だからこそ私たちは、単発のシステム開発ではなく、産業を支えるAIプロダクトを生み出し続ける「AIメーカー」でありたいと考えています。',
]

export default function MessageSection() {
  return (
    <section className="py-24 md:py-40" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* ━━━ Left: portrait with overlay caption ━━━ */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[78vh] overflow-hidden">
                <Image
                  src="/images/member/ogata-yuto-hero.jpg"
                  alt="緒方 勇斗 / 代表取締役"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  unoptimized
                />

                {/* Top-right stamp */}
                <div className="absolute top-5 right-5 md:top-8 md:right-8 text-white text-right text-[10px] uppercase tracking-[0.35em] opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                  STARUP / Message
                </div>

                {/* Bottom gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Caption — name + title */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white">
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-80 mb-3">
                    — Yuto Ogata, CEO
                  </p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
                    緒方 勇斗<br />
                    代表取締役
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━ Right: message ━━━ */}
          <div className="lg:col-span-7">
            <div className="mb-10 md:mb-14">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">Message</p>
              <p className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                代表からのメッセージ
              </p>
            </div>

            <div className="space-y-7 md:space-y-9 text-base md:text-lg text-gray-800 leading-[2] max-w-2xl">
              {OPENING.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {/* Credo callout */}
              <div className="border-l-2 border-gray-900 pl-6 md:pl-8 py-2 my-12 md:my-16 space-y-2">
                {CREDO.map((line, i) => (
                  <p
                    key={i}
                    className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
                <p className="text-sm text-gray-500 pt-3">それが私たちの挑戦です。</p>
              </div>

              {CLOSING.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {/* Final punch */}
              <div className="pt-10 md:pt-14">
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-[1.5] tracking-tight">
                  思想をテクノロジーに変え、<br />
                  産業と文化を<span className="text-gray-400">再構築する。</span>
                </p>
                <p className="mt-5 md:mt-6 text-base md:text-lg text-gray-500 italic">
                  京都から、世界に挑戦していきます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

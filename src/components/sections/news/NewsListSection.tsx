import Image from 'next/image'
import { getAllNewsForList } from '@/lib/news'
import TransitionLink from '@/components/ui/TransitionLink'
import ExploreLinks from '@/components/sections/shared/ExploreLinks'

export default async function NewsListSection() {
  const allNews = await getAllNewsForList()
  const total = allNews.length

  return (
    <>
    <section className="bg-white pt-20 md:pt-40 pb-16 md:pb-24">
      <div className="max-w-[1500px] mx-auto px-4 md:px-6">

        {/* ━━━ ヘッダー ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-2">
            <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">News</span>
          </div>
          <div className="lg:col-span-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.05] mb-4 tracking-tight">
              Stories
            </h1>
            <p className="text-base md:text-lg text-gray-500">
              STAR UPの最新の取り組みとお知らせ。
            </p>
          </div>
          <div className="lg:col-span-2"></div>
        </div>

        {/* ━━━ Body: count + horizontal cards ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sticky count */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                stories
              </p>
              <span className="text-3xl font-medium text-gray-900">{total}</span>
            </div>
          </div>

          {/* Title-led horizontal cards */}
          <div className="lg:col-span-10 border-t border-gray-200">
            {allNews.map((item) => (
              <TransitionLink
                key={item.id}
                href={`/news/${item.id}`}
                className="group block border-b border-gray-200 py-10 md:py-14"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                  {/* Left: meta */}
                  <div className="md:col-span-2 flex md:flex-col gap-4 md:gap-0">
                    <p className="font-mono text-xs text-gray-500 tracking-wider md:mb-2 shrink-0">
                      {item.date.replace(/\//g, '.')}
                    </p>
                    {item.tags[0] && (
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900">
                        {item.tags[0]}
                      </p>
                    )}
                  </div>

                  {/* Center: title (the hero) */}
                  <div className="md:col-span-7">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 leading-[1.35] tracking-tight transition-all duration-500 group-hover:text-gray-600 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <div className="mt-6 md:mt-8 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors duration-500">
                      <span className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-10" />
                      Read article
                    </div>
                  </div>

                  {/* Right: image (accent) */}
                  <div className="md:col-span-3">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </TransitionLink>
            ))}

            {total === 0 && (
              <p className="text-sm text-gray-500 py-16 text-center">
                記事はまだありません。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
    <ExploreLinks />
    </>
  )
}

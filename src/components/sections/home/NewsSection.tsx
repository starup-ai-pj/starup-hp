import { getLatestNews } from '@/lib/news'
import TransitionLink from '@/components/ui/TransitionLink'
import NewsIndexList from '@/components/sections/home/NewsIndexList'

export default async function NewsSection() {
  const latest = await getLatestNews(4)

  return (
    <section className="relative bg-white py-20 md:py-32">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10">

        {/* ━━━ ヘッダー ━━━ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20 border-b border-gray-200 pb-8 md:pb-10">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3 block">News</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.05] tracking-tight">
              Latest Updates
            </h2>
          </div>
          <TransitionLink
            href="/news"
            className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-4 transition-all duration-300 self-start md:self-auto"
          >
            すべて見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </TransitionLink>
        </div>

        <NewsIndexList items={latest} />
      </div>
    </section>
  )
}

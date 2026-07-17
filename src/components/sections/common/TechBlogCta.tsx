import { getTranslations } from 'next-intl/server'
import { techBlogUrl } from '@/data/company'

interface TechBlogCtaProps {
  locale: string
}

/**
 * Tech Blog（tech.starup01.jp）への導線となる共通CTAバンド。
 * 黒背景の全幅バンド。複数ページで再利用する。
 */
export default async function TechBlogCta({ locale }: TechBlogCtaProps) {
  const t = await getTranslations({ locale, namespace: 'techBlogCta' })

  return (
    <section className="py-10 md:py-14" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <a
          href={techBlogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-black text-white overflow-hidden"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between p-6 md:p-8 lg:p-10">
            {/* Left: copy */}
            <div className="md:max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                {t('eyebrow')}
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium leading-tight tracking-tight">
                {t('heading')}
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-400">
                {t('body')}
              </p>
            </div>

            {/* Right: button */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2.5 border border-white/25 px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-base font-medium group-hover:bg-white group-hover:text-black transition-colors">
                {t('cta')}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}

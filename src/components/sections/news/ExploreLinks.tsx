import { getTranslations } from 'next-intl/server'
import TransitionLink from '@/components/ui/TransitionLink'

const LINKS = [
  { href: '/recruit/culture', eyebrow: 'Culture', key: 'culture' },
  { href: '/member', eyebrow: 'Member', key: 'member' },
  { href: '/recruit/jobs', eyebrow: 'Jobs', key: 'jobs' },
] as const

export default async function ExploreLinks({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'sections.news.explore' })

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">{t('eyebrow')}</span>
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900">
              {t('heading')}
            </h2>
          </div>
          <div className="lg:col-span-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LINKS.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="group block border border-gray-200 p-8 md:p-10 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                {link.eyebrow}
              </p>
              <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                {t(`links.${link.key}.title`)}
              </h3>
              <p className="text-sm text-gray-500 mb-6">{t(`links.${link.key}.description`)}</p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                {t('viewMore')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  )
}

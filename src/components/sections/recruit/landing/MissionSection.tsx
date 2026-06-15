'use client'

import { useTranslations } from 'next-intl'
import TransitionLink from '@/components/ui/TransitionLink'

const MISSION_BODY_KEYS = ['body1', 'body2', 'body3', 'body4'] as const

const VALUES = [
  { id: 'ownership', num: '01' },
  { id: 'notCynical', num: '02' },
  { id: 'stayCurious', num: '03' },
  { id: 'beMultiplier', num: '04' },
] as const

export default function MissionSection() {
  const t = useTranslations('sections.recruit.landing.mission')

  return (
    <section className="py-24 md:py-40" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* ━━━ Mission ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{t('label')}</p>
            <p className="text-sm text-gray-500">{t('lead')}</p>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-medium text-gray-900 leading-[1.12] tracking-tight max-w-[1200px]">
              {t.rich('heading', { br: () => <br /> })}
            </h2>
            <p className="mt-6 md:mt-8 text-base md:text-xl text-gray-400 italic mb-16 md:mb-24">
              {t('headingSub')}
            </p>

            <div className="border-t border-gray-200 pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8">
              {MISSION_BODY_KEYS.map((key) => (
                <p key={key} className="text-sm md:text-base text-gray-700 leading-[2]">
                  {t(key)}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━ Values ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-32 md:mt-48">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{t('valuesLabel')}</p>
            <p className="text-sm text-gray-500">{t('valuesLead')}</p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-10">
              {VALUES.map((v) => (
                <div key={v.num} className="border-t border-gray-300 pt-6 md:pt-8">
                  <p className="text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-medium text-gray-900 leading-[0.9] tracking-tighter mb-8 md:mb-12">
                    {v.num}
                  </p>
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 tracking-tight whitespace-pre-line">
                    {t(`values.${v.id}`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-20 flex justify-end">
              <TransitionLink
                href="/recruit/culture"
                className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all duration-300"
              >
                {t('cultureLink')}
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

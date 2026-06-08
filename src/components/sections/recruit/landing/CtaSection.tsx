'use client'

import { useTranslations } from 'next-intl'
import TransitionLink from '@/components/ui/TransitionLink'

const CTA_CARDS = [
  { id: 'culture', href: '/recruit/culture' },
  { id: 'member', href: '/member' },
  { id: 'jobs', href: '/recruit/jobs' },
] as const

export default function CtaSection() {
  const t = useTranslations('sections.recruit.landing.cta')

  return (
    <section className="py-20 md:py-32" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {CTA_CARDS.map((card) => (
            <TransitionLink
              key={card.id}
              href={card.href}
              className="group block border border-gray-200 p-8 md:p-12 hover:border-gray-400 transition-colors"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-10 md:mb-14">
                {t(`cards.${card.id}.label`)}
              </p>
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors tracking-tight">
                {t(`cards.${card.id}.title`)}
              </h3>
              <p className="text-sm text-gray-500 mb-8">{t(`cards.${card.id}.body`)}</p>
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

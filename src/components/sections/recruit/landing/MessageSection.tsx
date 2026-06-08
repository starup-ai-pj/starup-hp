import Image from 'next/image'
import { useTranslations } from 'next-intl'

const OPENING_KEYS = ['opening1', 'opening2', 'opening3'] as const
const CREDO_KEYS = ['credo1', 'credo2', 'credo3'] as const

export default function MessageSection() {
  const t = useTranslations('sections.recruit.landing.message')

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
                  alt={t('ceoImageAlt')}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  unoptimized
                />

                {/* Top-right stamp */}
                <div className="absolute top-5 right-5 md:top-8 md:right-8 text-white text-right text-[10px] uppercase tracking-[0.35em] opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                  {t('stamp')}
                </div>

                {/* Bottom gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Caption — name + title */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white">
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-80 mb-3">
                    {t('ceoCaption')}
                  </p>
                  <p className="text-xl md:text-2xl font-medium tracking-tight leading-[1.2]">
                    {t('ceoName')}<br />
                    <span className="text-sm md:text-base text-white/80">{t('ceoTitle')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━ Right: message ━━━ */}
          <div className="lg:col-span-7">
            <div className="mb-10 md:mb-14">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{t('label')}</p>
              <p className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                {t('heading')}
              </p>
            </div>

            <div className="space-y-7 md:space-y-9 text-base md:text-lg text-gray-800 leading-[2] max-w-2xl">
              {OPENING_KEYS.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}

              {/* Credo callout */}
              <div className="border-l-2 border-gray-900 pl-6 md:pl-8 py-2 my-12 md:my-16 space-y-2">
                {CREDO_KEYS.map((key) => (
                  <p
                    key={key}
                    className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed"
                  >
                    {t(key)}
                  </p>
                ))}
                <p className="text-sm text-gray-500 pt-3">{t('credoClose')}</p>
              </div>

              <p>{t('closing1')}</p>

              {/* Final punch */}
              <div className="pt-10 md:pt-14">
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-[1.5] tracking-tight">
                  {t.rich('punch', {
                    br: () => <br />,
                    span: (chunks) => <span className="text-gray-400">{chunks}</span>,
                  })}
                </p>
                <p className="mt-5 md:mt-6 text-base md:text-lg text-gray-500 italic">
                  {t('punchSub')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

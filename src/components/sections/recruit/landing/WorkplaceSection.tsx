import Image from 'next/image'
import { useTranslations } from 'next-intl'

const ROLES = [
  { id: 'product', num: '01' },
  { id: 'aiSolution', num: '02' },
  { id: 'bizDev', num: '03' },
] as const

const PILLARS = [
  { id: 'speed', num: '01' },
  { id: 'frontline', num: '02' },
  { id: 'philosophy', num: '03' },
] as const

export default function WorkplaceSection() {
  const t = useTranslations('sections.recruit.landing.workplace')

  return (
    <section className="py-24 md:py-40" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* ━━━ Section header ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{t('label')}</p>
            <p className="text-sm text-gray-500">{t('lead')}</p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-medium text-gray-900 leading-[1.12] tracking-tight">
              {t.rich('heading', {
                br: () => <br />,
                span: (chunks) => <span className="text-gray-400">{chunks}</span>,
              })}
            </h2>
          </div>
        </div>

        {/* ━━━ Roles map ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{t('rolesLabel')}</p>
            <p className="text-sm text-gray-500">{t('rolesLead')}</p>
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
                      {t(`roles.${r.id}.name`)}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{t(`roles.${r.id}.subtitle`)}</p>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-sm md:text-base text-gray-700 leading-[1.95]">
                      {t(`roles.${r.id}.body`)}
                    </p>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                      {t('rolesColumnLabel')}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">{t(`roles.${r.id}.roleNames`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━ How we work ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="lg:col-span-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{t('howWeWorkLabel')}</p>
            <p className="text-sm text-gray-500">{t('howWeWorkLead')}</p>
          </div>
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {PILLARS.map((p) => (
                <div key={p.num} className="border-t border-gray-300 pt-6 md:pt-8">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                    {p.num}
                  </span>
                  <h3 className="mt-4 mb-4 text-xl md:text-2xl font-medium text-gray-900 tracking-tight">
                    {t(`pillars.${p.id}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t(`pillars.${p.id}.body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━ Office ━━━ */}
        <div className="relative aspect-[3/2] md:aspect-[16/9] w-full">
          <Image
            src="/images/recruit/office.jpg"
            alt={t('officeImageAlt')}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 100vw, 100vw"
            unoptimized
          />
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">{t('officeLabel')}</p>
            <p className="text-xs md:text-sm mt-1">{t('officeName')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

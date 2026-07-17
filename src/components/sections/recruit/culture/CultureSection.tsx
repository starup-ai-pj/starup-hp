import { getTranslations } from 'next-intl/server'
import TransitionLink from '@/components/ui/TransitionLink'
import { getCulture } from '@/data/culture'
import TechBlogCta from '@/components/sections/common/TechBlogCta'

interface CultureSectionProps {
  locale: string
}

export default async function CultureSection({ locale }: CultureSectionProps) {
  const t = await getTranslations({ locale, namespace: 'sections.recruit.culture' })
  const { philosophyBody, values, workStyles } = await getCulture(locale)

  return (
    <div className="bg-white">
      {/* ━━━ Opening (hero-as-text) ━━━ */}
      <section className="pt-40 pb-32 md:pt-56 md:pb-40 lg:pt-64 lg:pb-56" data-bg="light">
        <SplitLayout
          left={<Marker label={t('opening.label')} jaLabel={t('opening.jaLabel')} />}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-gray-900 leading-[0.95] tracking-tight">
            {t.rich('opening.heading', { br: () => <br /> })}
          </h1>
          <p className="mt-10 md:mt-14 text-base md:text-lg text-gray-500 italic max-w-md leading-relaxed">
            {t.rich('opening.lead', { br: () => <br /> })}
          </p>
        </SplitLayout>
      </section>

      {/* ━━━ Philosophy ━━━ */}
      <section className="py-32 md:py-48 lg:py-56" data-bg="light">
        <SplitLayout
          left={<Marker num="01" label={t('philosophy.label')} jaLabel={t('philosophy.jaLabel')} />}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.15] tracking-tight mb-12 md:mb-16 max-w-[18ch]">
            {t.rich('philosophy.heading', {
              br: () => <br />,
              span: (chunks) => <span className="text-gray-400">{chunks}</span>,
            })}
          </h2>
          <div className="space-y-5 text-sm md:text-base text-gray-700 leading-[2] max-w-2xl">
            {philosophyBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </SplitLayout>
      </section>

      {/* ━━━ Values (4 deep) ━━━ */}
      <section className="py-32 md:py-48 lg:py-56" data-bg="light">
        <SplitLayout
          left={<Marker num="02" label={t('values.label')} jaLabel={t('values.jaLabel')} />}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.15] tracking-tight mb-20 md:mb-32">
            {t('values.heading')}
          </h2>
          <div className="space-y-24 md:space-y-32">
            {values.map((v) => (
              <article key={v.num}>
                <p className="text-5xl md:text-6xl lg:text-7xl text-gray-200 font-medium leading-none tracking-tighter mb-8 md:mb-12">
                  {v.num}
                </p>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight leading-[1.1] mb-4 md:mb-5">
                  {v.title}
                </h3>
                <p className="text-base md:text-lg text-gray-500 mb-8 md:mb-10">
                  {v.subtitle}
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-[1.95] max-w-xl">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </SplitLayout>
      </section>

      {/* ━━━ Work Style ━━━ */}
      <section className="py-32 md:py-48 lg:py-56" data-bg="light">
        <SplitLayout
          left={<Marker num="03" label={t('workStyle.label')} jaLabel={t('workStyle.jaLabel')} />}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.15] tracking-tight mb-16 md:mb-24">
            {t.rich('workStyle.heading', {
              br: () => <br />,
              span: (chunks) => <span className="text-gray-400">{chunks}</span>,
            })}
          </h2>
          <div className="space-y-14 md:space-y-20">
            {workStyles.map((w) => (
              <div key={w.num}>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">{w.num}</p>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 tracking-tight mb-4">
                  {w.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-[1.95] max-w-xl">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </SplitLayout>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 md:py-32" data-bg="light">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <TransitionLink
              href="/member"
              className="group block border border-gray-200 p-8 md:p-12 hover:border-gray-400 transition-colors"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-12 md:mb-16">{t('cta.member.label')}</p>
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                {t('cta.member.title')}
              </h3>
              <p className="text-sm text-gray-500 mb-8">{t('cta.member.body')}</p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                {t('cta.viewMore')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>

            <TransitionLink
              href="/recruit/jobs"
              className="group block border border-gray-200 p-8 md:p-12 hover:border-gray-400 transition-colors"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-12 md:mb-16">{t('cta.jobs.label')}</p>
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                {t('cta.jobs.title')}
              </h3>
              <p className="text-sm text-gray-500 mb-8">{t('cta.jobs.body')}</p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                {t('cta.viewMore')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* ━━━ Tech Blog CTA ━━━ */}
      <TechBlogCta locale={locale} />
    </div>
  )
}

// ━━━ Layout: 左にセクションマーカー(sticky)、右にコンテンツ（lg+）━━━
function SplitLayout({
  left,
  children,
}: {
  left: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="max-w-[1500px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-32">{left}</div>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </div>
  )
}

// ━━━ 左カラムのセクションマーカー ━━━
function Marker({
  num,
  label,
  jaLabel,
}: {
  num?: string
  label: string
  jaLabel?: string
}) {
  return (
    <div>
      {num ? (
        <p className="text-[5rem] md:text-[6.5rem] lg:text-[8rem] text-gray-200 font-medium leading-[0.85] tracking-tighter mb-6 md:mb-8">
          {num}
        </p>
      ) : (
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-10 h-px bg-gray-300" />
        </div>
      )}
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.35em] mb-2">— {label}</p>
      {jaLabel && <p className="text-sm text-gray-500">{jaLabel}</p>}
    </div>
  )
}

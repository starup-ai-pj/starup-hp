import { getTranslations } from 'next-intl/server'
import TypingText from '@/components/ui/TypingText'

export default async function InformationSecurityPolicySection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'sections.legal.infoSecurity' })

  const facts = [
    { label: t('isms.facts.certificationBody'), value: 'G-CERTI' },
    { label: t('isms.facts.accreditation'), value: 'IAS / IAF' },
    { label: t('isms.facts.certificateNo'), value: 'GUP-2109-IC' },
    { label: t('isms.facts.soa'), value: 'Rev.00 / 2025.11.19' },
    { label: t('isms.facts.initialCertification'), value: '2026.04.02' },
    { label: t('isms.facts.validUntil'), value: '2029.04.01' },
  ]

  const guidelineNumbers = ['1', '2', '3', '4'] as const

  return (
    <section className="py-16 md:py-32 bg-white" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-12 md:mb-16">
          <p className="text-sm lg:text-base text-gray-600 mb-2">
            {t('eyebrow')}
          </p>
          <TypingText
            text={t('heading')}
            className="text-2xl md:text-3xl lg:text-6xl font-bold text-gray-900"
          />
        </div>

        {/* ISO/IEC 27001 認証取得 — フィーチャー帯 */}
        <div className="mb-16 md:mb-24 bg-gray-50 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* 左：認証マーク */}
            <div className="lg:col-span-5 lg:border-r lg:border-gray-200 lg:pr-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                {t('isms.certified')}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.05] tracking-tight">
                {t.rich('isms.standard', { br: () => <br /> })}
              </h2>
              <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                {t('isms.subtitle')}
              </p>
            </div>

            {/* 右：ステートメント＋ファクト */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                {t('isms.statement')}
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-200 pt-6 md:pt-8">
                {facts.map((row) => (
                  <div key={row.label}>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                      {row.label}
                    </dt>
                    <dd className="text-sm md:text-base text-gray-900 leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                ))}

                {/* 認証範囲 — フル幅 */}
                <div className="sm:col-span-2 pt-2">
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                    {t('isms.facts.scope')}
                  </dt>
                  <dd className="text-sm md:text-base text-gray-900 leading-relaxed">
                    {t('isms.scopeValue')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="space-y-12 md:space-y-16">
          {/* タイトル */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              {t('policyHeading')}
            </h1>
          </div>

          {/* 行動指針 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              {t('guidelinesHeading')}
            </h2>

            {guidelineNumbers.map((number) => (
              <div key={number} className="border-b border-gray-200 pb-6 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                  <div className="md:col-span-1">
                    <p className="text-lg md:text-xl font-bold text-gray-900">{number}.</p>
                  </div>
                  <div className="md:col-span-11">
                    <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                      {t(`guidelines.${number}`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 制定日・署名 */}
          <div className="pt-8 md:pt-12 text-right space-y-4">
            <p className="text-base md:text-lg text-gray-900">
              {t('enactedDate')}
            </p>
            <div className="space-y-1">
              <p className="text-lg md:text-xl font-bold text-gray-900">
                {t('companyName')}
              </p>
              <p className="text-base md:text-lg text-gray-900">
                {t('representativeTitle')}
              </p>
              <p className="text-base md:text-lg text-gray-900">
                {t('representativeName')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

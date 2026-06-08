import { getTranslations } from 'next-intl/server'
import TypingText from '@/components/ui/TypingText'

export default async function RecruitmentDisclosureSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'sections.legal.recruitmentDisclosure' })

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

        {/* コンテンツ */}
        <div className="space-y-12 md:space-y-16">
          {/* 前文 */}
          <div>
            <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              {t('preamble')}
            </p>
          </div>

          {/* 1. 業務の運営に関する規程 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              {t('section1.heading')}
            </h2>

            {/* 取扱職種の範囲等 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {t('section1.scope.heading')}
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.scope.occupation')}
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.scope.region')}
                </p>
              </div>
            </div>

            {/* 個人情報の保護に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {t('section1.privacy.heading')}
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.privacy.manager')}
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.privacy.statement')}
                </p>
              </div>
              <div className="mt-6 pb-6 md:pb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  {t('section1.purpose.heading')}
                </h3>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-3 pl-4">
                  {t('section1.purpose.intro')}
                </p>
                <div className="space-y-2 pl-4">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    {t('section1.purpose.item1')}
                  </p>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    {t('section1.purpose.item2')}
                  </p>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    {t('section1.purpose.item3')}
                  </p>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    {t('section1.purpose.item4')}
                  </p>
                </div>
              </div>
            </div>

            {/* 手数料の徴収に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {t('section1.fee.heading')}
              </h3>
              <div className="pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.fee.statement')}
                </p>
              </div>
            </div>

            {/* 苦情の処理に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {t('section1.complaint.heading')}
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.complaint.manager')}
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.complaint.statement')}
                </p>
              </div>
            </div>

            {/* 返戻金制度に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {t('section1.refund.heading')}
              </h3>
              <div className="pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section1.refund.statement')}
                </p>
              </div>
            </div>
            <div className="pl-4 mt-4">
              <a
                href="/docs/operation-policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-base md:text-lg text-gray-900 hover:text-gray-600 transition-colors"
              >
                {t('section1.pdfLink')}
                <span className="text-sm text-gray-500">{t('section1.pdfLabel')}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2. 手数料表 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              {t('section2.heading')}
            </h2>
            <div>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-4">
                {t('section2.intro')}
              </p>
              <div className="pb-6 md:pb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  {t('section2.notified.heading')}
                </h3>
                <div className="space-y-2 pl-4">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    {t('section2.notified.amount')}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t('section2.notified.note')}
                  </p>
                </div>
              </div>
              <div className="pl-4 mt-4">
                <a
                  href="/docs/fee-schedule.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base md:text-lg text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {t('section2.pdfLink')}
                  <span className="text-sm text-gray-500">{t('section2.pdfLabel')}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 3. 返戻金制度に関する事項 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              {t('section3.heading')}
            </h2>
            <div>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-6">
                {t('section3.intro')}
              </p>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {t('section3.rateHeading')}
              </h3>
              <div className="space-y-3 pl-4 mb-6">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section3.rate1')}
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section3.rate2')}
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  {t('section3.rate3')}
                </p>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('section3.note')}
              </p>
            </div>
          </div>

          {/* 4. 事業者情報 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              {t('section4.heading')}
            </h2>
            <div className="space-y-3 pl-4">
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                {t('section4.license')}
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                {t('section4.name')}
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                {t('section4.address')}
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                {t('section4.licenseDate')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

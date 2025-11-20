import TypingText from '@/components/ui/TypingText'

export default function InformationSecurityPolicySection() {
  return (
    <section className="py-16 md:py-32 bg-white" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-12 md:mb-16">
          <p className="text-sm lg:text-base text-gray-600 mb-2">
            情報セキュリティ基本方針
          </p>
          <TypingText
            text="Information Security Policy"
            className="text-2xl md:text-3xl lg:text-6xl font-bold text-gray-900"
          />
        </div>

        {/* コンテンツ */}
        <div className="space-y-12 md:space-y-16">
          {/* タイトル */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              情報セキュリティ基本方針
            </h1>
          </div>

          {/* 行動指針 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              行動指針
            </h2>

            {/* 指針1 */}
            <div className="border-b border-gray-200 pb-6 md:pb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <p className="text-lg md:text-xl font-bold text-gray-900">1.</p>
                </div>
                <div className="md:col-span-11">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    情報資産の機密性、完全性、可用性を確実に保護するために組織的、技術的に適切な対策を講じ、変化する情報技術や新たな脅威に対応する。
                  </p>
                </div>
              </div>
            </div>

            {/* 指針2 */}
            <div className="border-b border-gray-200 pb-6 md:pb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <p className="text-lg md:text-xl font-bold text-gray-900">2.</p>
                </div>
                <div className="md:col-span-11">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    全社員に情報セキュリティ教育の実施と方針の周知徹底をはかり、意識の向上・維持に努める。
                  </p>
                </div>
              </div>
            </div>

            {/* 指針3 */}
            <div className="border-b border-gray-200 pb-6 md:pb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <p className="text-lg md:text-xl font-bold text-gray-900">3.</p>
                </div>
                <div className="md:col-span-11">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    マネジメントシステム及び、情報セキュリティに関する目的を設定し、定期的にレビューし、継続的に改善を実施し、維持する。
                  </p>
                </div>
              </div>
            </div>

            {/* 指針4 */}
            <div className="border-b border-gray-200 pb-6 md:pb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <p className="text-lg md:text-xl font-bold text-gray-900">4.</p>
                </div>
                <div className="md:col-span-11">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    マネジメントシステムを実行・維持・改善して行くために管理責任者に責任と権限を委譲する。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 制定日・署名 */}
          <div className="pt-8 md:pt-12 text-right space-y-4">
            <p className="text-base md:text-lg text-gray-900">
              2025年11月19日 制定
            </p>
            <div className="space-y-1">
              <p className="text-lg md:text-xl font-bold text-gray-900">
                株式会社 STAR UP
              </p>
              <p className="text-base md:text-lg text-gray-900">
                代表取締役
              </p>
              <p className="text-base md:text-lg text-gray-900">
                緒方 勇斗
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

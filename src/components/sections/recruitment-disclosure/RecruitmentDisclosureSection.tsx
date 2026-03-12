import TypingText from '@/components/ui/TypingText'

export default function RecruitmentDisclosureSection() {
  return (
    <section className="py-16 md:py-32 bg-white" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-12 md:mb-16">
          <p className="text-sm lg:text-base text-gray-600 mb-2">
            有料職業紹介事業に基づく情報公開
          </p>
          <TypingText
            text="Recruitment Business Disclosure"
            className="text-2xl md:text-3xl lg:text-6xl font-bold text-gray-900"
          />
        </div>

        {/* コンテンツ */}
        <div className="space-y-12 md:space-y-16">
          {/* 前文 */}
          <div>
            <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              当社は、職業安定法第32条の13および同法施行規則第24条の5に基づき、以下の項目を公開いたします。
            </p>
          </div>

          {/* 1. 業務の運営に関する規程 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              1. 業務の運営に関する規程
            </h2>

            {/* 取扱職種の範囲等 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                ■ 取扱職種の範囲等
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・取扱職種：全職種
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・取扱地域：日本国内
                </p>
              </div>
            </div>

            {/* 個人情報の保護に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                ■ 個人情報の保護に関する事項
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・個人情報保護責任者：代表取締役　緒方勇斗
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・当社は、求職者および求人者の個人情報を適切に管理し、本人の同意なく第三者に開示・提供することはありません。また、個人情報の開示、訂正、削除の求めには迅速に対応いたします。
                </p>
              </div>
              <div className="mt-6 pb-6 md:pb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  ■ 個人情報の利用目的について
                </h3>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-3 pl-4">
                  当社は、職業紹介業務において取得した個人情報を以下の目的で利用いたします。
                </p>
                <div className="space-y-2 pl-4">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    ・求職者への最適な求人情報の提供および進捗管理
                  </p>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    ・求人企業への紹介、選考の実施
                  </p>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    ・就業後のアフターフォローおよびアンケート実施
                  </p>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    ・法令（職業安定法等）に基づく情報の管理
                  </p>
                </div>
              </div>
            </div>

            {/* 手数料の徴収に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                ■ 手数料の徴収に関する事項
              </h3>
              <div className="pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・求人者（採用企業）より、あらかじめ締結した契約書に基づき手数料を徴収いたします。
                </p>
              </div>
            </div>

            {/* 苦情の処理に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                ■ 苦情の処理に関する事項
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・苦情処理責任者：代表取締役　緒方勇斗
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・苦情の申出があった場合は、誠意をもって迅速かつ適切に処理いたします。
                </p>
              </div>
            </div>

            {/* 返礼金制度に関する事項 */}
            <div className="pb-6 md:pb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                ■ 返礼金制度に関する事項
              </h3>
              <div className="pl-4">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・紹介した労働者が早期に退職した場合、手数料を返還する制度を設けています。詳細は「3. 返礼金制度」をご参照ください。
                </p>
              </div>
            </div>
          </div>

          {/* 2. 手数料表 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              2. 手数料表
            </h2>
            <div>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-4">
                当社が求人者（採用企業）より申し受ける手数料は、以下の通りです。
              </p>
              <div className="pb-6 md:pb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  ■ 届出制手数料
                </h3>
                <div className="space-y-2 pl-4">
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                    ・手数料の額：採用決定者の想定年収の 35％（別途消費税）
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    ※想定年収とは、本採用から1年間に支払われると見込まれる賃金（基本給、諸手当、賞与を含む）の合計額を指します。
                  </p>
                </div>
              </div>
              <div className="pl-4 mt-4">
                <a
                  href="/docs/手数料表.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base md:text-lg text-gray-900 hover:text-gray-600 transition-colors"
                >
                  ・手数料表の詳細はこちら
                  <span className="text-sm text-gray-500">（PDF）</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 3. 返礼金制度に関する事項 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              3. 返礼金制度に関する事項
            </h2>
            <div>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-6">
                当社では、ご紹介した候補者が入社後に早期退職した場合、受領した紹介手数料の一部を返還する制度を設けています。
              </p>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                ■ 返還の割合（自己都合退職の場合）
              </h3>
              <div className="space-y-3 pl-4 mb-6">
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・入社後 1ヶ月以内の退職：紹介手数料の 80％
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・入社後 1ヶ月超〜3ヶ月以内の退職：紹介手数料の 50％
                </p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  ・入社後 3ヶ月超〜6ヶ月以内の退職：紹介手数料の 10％
                </p>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                ※解雇、倒産、求人者の責に帰すべき事由による退職、または事前に合意した条件と著しく異なることによる退職の場合は、本制度の対象外となります。
              </p>
            </div>
          </div>

          {/* 4. 事業者情報 */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              4. 事業者情報
            </h2>
            <div className="space-y-3 pl-4">
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                ・許可番号：26-ユ-300728
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                ・事業所名：株式会社STARUP
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                ・所在地：京都府京都市上京区甲斐守町97西陣産業創造會舘109
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                ・許可年月日：令和6年8月1日
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

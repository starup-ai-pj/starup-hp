import { ReactNode } from 'react'

type InfoItem = {
  label: string
  value: ReactNode
}

const partners = [
  'オムロンデジタル株式会社',
  '東京都',
  '株式会社NTTドコモ',
  '東映アニメーション株式会社',
  'アート引越センター株式会社',
  '横河マニュファクチャリング株式会社',
  '株式会社明電エンジニアリング',
  '株式会社神崎高級工機製作所',
  '日本オートマチックマシン株式会社',
  '生田産機工業株式会社',
  '株式会社リネックス',
  'その他',
]

const items: InfoItem[] = [
  { label: 'Company', value: '株式会社STAR UP' },
  { label: 'Representative', value: '緒方 勇斗' },
  { label: 'Established', value: '2023.11.30' },
  { label: 'Employees', value: '38名（アルバイトを含む）' },
  {
    label: 'Address',
    value: (
      <>
        京都府京都市上京区甲斐守町97<br />
        西陣産業創造會舘
      </>
    ),
  },
  {
    label: 'Business',
    value: (
      <>
        AIを活用した共同開発・新規事業開発<br />
        AIプロダクトの開発<br />
        製造業向けAI SaaS事業<br />
        人材紹介事業
      </>
    ),
  },
  {
    label: 'License',
    value: (
      <>
        有料職業紹介<br />
        認可番号：26-ユ-300728
      </>
    ),
  },
  {
    label: 'Legal',
    value: (
      <>
        HEROリーガルグループ<br />
        弁護士法人 淀屋橋・山上合同 大阪事務所
      </>
    ),
  },
  { label: 'Tax', value: '木田事務所' },
  {
    label: 'Bank',
    value: (
      <>
        京都銀行<br />
        みずほ銀行<br />
        京都中央信用金庫<br />
        滋賀銀行
      </>
    ),
  },
  {
    label: 'Partners',
    value: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {partners.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    ),
  },
]

export default function InformationSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1500px] mx-auto px-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Information</p>
        <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-12 md:mb-20">
          会社情報
        </h2>

        <div className="border-t border-gray-200">
          {items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-gray-200"
            >
              <p className="col-span-12 md:col-span-3 text-xs md:text-sm text-gray-400 uppercase tracking-widest pt-1">
                {item.label}
              </p>
              <div className="col-span-12 md:col-span-9 text-sm md:text-base text-gray-900 leading-relaxed">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

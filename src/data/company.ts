export interface CompanySNS {
  twitter: string
  note: string
  linkedin: string
}

export const companySNS: CompanySNS = {
  twitter: "https://x.com/starup01",
  note: "https://note.com/starup01",
  linkedin: "https://www.linkedin.com/company/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BEstar-up/",
}

/**
 * 会社概要（About ページの Information セクション）
 * value は行配列。描画側で改行（<br/>）として展開する。
 */
export interface CompanyInfoItem {
  label: string
  lines: string[]
}

export const companyProfile: CompanyInfoItem[] = [
  { label: 'Company', lines: ['株式会社STAR UP'] },
  { label: 'Representative', lines: ['緒方 勇斗'] },
  { label: 'Established', lines: ['2023.11.30'] },
  { label: 'Employees', lines: ['38名（アルバイトを含む）'] },
  { label: 'Address', lines: ['京都府京都市上京区甲斐守町97', '西陣産業創造會舘'] },
  {
    label: 'Business',
    lines: [
      'AIを活用した共同開発・新規事業開発',
      'AIプロダクトの開発',
      '製造業向けAI SaaS事業',
      '人材紹介事業',
    ],
  },
  { label: 'License', lines: ['有料職業紹介', '認可番号：26-ユ-300728'] },
  {
    label: 'Certification',
    lines: [
      'ISO/IEC 27001:2022（情報セキュリティマネジメントシステム）',
      '認証機関：G-CERTI／認証番号：GUP-2109-IC',
      '有効期限：2029年4月1日',
    ],
  },
  { label: 'Legal', lines: ['HEROリーガルグループ', '弁護士法人 淀屋橋・山上合同 大阪事務所'] },
  { label: 'Tax', lines: ['木田事務所'] },
  { label: 'Bank', lines: ['京都銀行', 'みずほ銀行', '京都中央信用金庫', '滋賀銀行'] },
]

export const partners: string[] = [
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
/**
 * 会社沿革（About ページの History セクション）
 */
export interface HistoryEvent {
  year: string
  month: string
  title: string
  description?: string
  image: string
}

export const historyData: HistoryEvent[] = [
  {
    year: '2023',
    month: '11',
    title: '創業',
    description: '京都にて創業',
    image: '/images/about/company.jpg',
  },
  {
    year: '2024',
    month: '03',
    title: 'AI開発事業開始',
    description: '受託開発を中心に開発事業をスタート',
    image: '/images/tech-cards/tech-01.jpg',
  },
  {
    year: '2025',
    month: '01',
    title: 'Archaive β版ローンチ',
    description: '製造業向けAIプロダクトの提供を開始',
    image: '/images/services/archaive/hero.jpg',
  },
  {
    year: '2026',
    month: '01',
    title: 'Send AI ローンチ',
    description: 'アパレル・小売向けAIプロダクトの提供を開始',
    image: '/images/services/sendai/thumbnail.jpg',
  },
  {
    year: '2026',
    month: '04',
    title: '正社員10名体制へ拡大',
    image: '/images/recruit/office-history.jpg',
  },
]

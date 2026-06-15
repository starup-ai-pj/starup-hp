import { getTranslations } from 'next-intl/server'

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

/**
 * 沿革の非翻訳構造（id・年月・画像・description の有無）。
 * 翻訳対象の title / description はメッセージ data.history.<id> に置く。
 */
interface HistoryAsset {
  id: string
  year: string
  month: string
  image: string
  hasDescription: boolean
}

const historyAssets: HistoryAsset[] = [
  { id: 'founding', year: '2023', month: '11', image: '/images/about/company.jpg', hasDescription: true },
  { id: 'ai-development', year: '2024', month: '03', image: '/images/tech-cards/tech-01.jpg', hasDescription: true },
  { id: 'archaive-beta', year: '2025', month: '01', image: '/images/services/archaive/hero.jpg', hasDescription: true },
  { id: 'sendai-launch', year: '2026', month: '01', image: '/images/services/sendai/thumbnail.jpg', hasDescription: true },
  { id: 'team-expansion', year: '2026', month: '04', image: '/images/recruit/office-history.jpg', hasDescription: false },
]

/** 指定 locale の沿革（年月・画像 + 翻訳済みの title/description）を返す（Server Component 用） */
export async function getHistory(locale: string): Promise<HistoryEvent[]> {
  const t = await getTranslations({ locale, namespace: 'data.history' })
  return historyAssets.map((asset) => ({
    year: asset.year,
    month: asset.month,
    image: asset.image,
    title: t(`${asset.id}.title`),
    description: asset.hasDescription ? t(`${asset.id}.description`) : undefined,
  }))
}

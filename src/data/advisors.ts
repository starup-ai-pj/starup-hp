import { getTranslations } from 'next-intl/server'

export interface Advisor {
  id: string
  name: string
  englishName?: string
  position: string
  description: string
  image?: string
}

/**
 * 顧問の非翻訳フィールド（id・ローマ字・画像）。
 * 翻訳対象の name / position / description はメッセージ data.advisors.<id> に置く。
 */
export interface AdvisorAsset {
  id: string
  englishName?: string
  image?: string
}

export const advisorAssets: AdvisorAsset[] = [
  { id: "tokutaro-nakai", englishName: "Tokutaro Nakai", image: "/images/advisor/nakai-tokutaro.jpg" },
]

/** 指定 locale の全顧問（assets + 翻訳テキスト）を返す（Server Component 用） */
export async function getAdvisors(locale: string): Promise<Advisor[]> {
  const t = await getTranslations({ locale, namespace: 'data.advisors' })
  return advisorAssets.map((asset) => ({
    ...asset,
    name: t(`${asset.id}.name`),
    position: t(`${asset.id}.position`),
    description: t(`${asset.id}.description`),
  }))
}

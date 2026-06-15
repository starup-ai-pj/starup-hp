import { getTranslations } from 'next-intl/server'

export interface ServiceFeature {
  title: string
  description: string
}

export interface ServicePillar {
  label: string
  features: ServiceFeature[]
}

export interface ServicePreview {
  label: string
  image: string
}

export interface ServiceItem {
  id: string
  number: string
  category: string
  title: string
  subtitle: string
  catchphrase: string
  description: string
  pillars: ServicePillar[]
  previews: ServicePreview[]
  image: string
  diorama?: string
  href?: string
}

/**
 * サービスの非翻訳フィールド（id・連番・画像・href・配列構造）。
 * 翻訳対象（subtitle / catchphrase / description / category / pillars / previews.label）は
 * メッセージ data.services.<id> に置き、index でミラーする。
 * featureCounts は各 pillar の features 件数（翻訳キーをインデックス参照するために必要）。
 */
export interface ServiceAsset {
  id: string
  number: string
  pillarLabelCount: number
  featureCounts: number[]
  previewImages: string[]
  image: string
  diorama?: string
  href?: string
}

export const serviceAssets: ServiceAsset[] = [
  {
    id: "archaive",
    number: "01",
    pillarLabelCount: 3,
    featureCounts: [3, 2, 2],
    previewImages: [
      "/images/services/archaive/similar-search.png",
      "/images/services/archaive/chat-search.jpg",
      "/images/services/archaive/project-management.jpg",
    ],
    image: "/images/services/archaive/hero.jpg",
    diorama: "/html/archaive-diorama.html",
    href: "https://archaive.net",
  },
  {
    id: "send-ai",
    number: "02",
    pillarLabelCount: 3,
    featureCounts: [3, 2, 2],
    previewImages: [
      "/images/services/sendai/product-master.png",
      "/images/services/sendai/dashboard.png",
      "/images/services/sendai/ai-suggestion.png",
    ],
    image: "/images/services/sendai/hero.png",
    diorama: "/html/retail-diorama.html",
    href: "https://send-ai.co.jp/",
  },
  {
    id: "flowerium",
    number: "03",
    pillarLabelCount: 3,
    featureCounts: [1, 1, 1],
    previewImages: [
      "/images/services/flowerium/custom-app-builder.png",
      "/images/services/flowerium/workflow.png",
      "/images/services/flowerium/erd.png",
    ],
    image: "/images/services/flowerium/hero.png",
    diorama: "/html/ontology-diorama.html",
  },
]

/** 指定 locale の全サービス（assets + 翻訳テキスト）を返す（Server Component 用） */
export async function getServices(locale: string): Promise<ServiceItem[]> {
  const t = await getTranslations({ locale, namespace: 'data.services' })
  return serviceAssets.map((asset) => ({
    id: asset.id,
    number: asset.number,
    image: asset.image,
    diorama: asset.diorama,
    href: asset.href,
    category: t(`${asset.id}.category`),
    title: t(`${asset.id}.title`),
    subtitle: t(`${asset.id}.subtitle`),
    catchphrase: t(`${asset.id}.catchphrase`),
    description: t(`${asset.id}.description`),
    pillars: Array.from({ length: asset.pillarLabelCount }, (_, p) => ({
      label: t(`${asset.id}.pillars.${p}.label`),
      features: Array.from({ length: asset.featureCounts[p] }, (_, f) => ({
        title: t(`${asset.id}.pillars.${p}.features.${f}.title`),
        description: t(`${asset.id}.pillars.${p}.features.${f}.description`),
      })),
    })),
    previews: asset.previewImages.map((image, i) => ({
      image,
      label: t(`${asset.id}.previews.${i}.label`),
    })),
  }))
}

/**
 * ホームの ServiceDetail セクション用のキュレーション要約。
 * serviceAssets（サービスページの完全版）とは別ビュー：description は短縮、features は抜粋。
 * title / subtitle / index は serviceAssets と一致させること。
 */
export interface HomeServiceFeatureGroup {
  label: string
  items: string[]
}

export interface HomeServiceSummary {
  index: string
  subtitle: string
  title: string
  description: string
  features: HomeServiceFeatureGroup[]
  href: string
}

/**
 * ホーム要約の非翻訳フィールド（index・内部アンカー href・配列構造）。
 * 翻訳対象（subtitle / title / description / features）はメッセージ
 * data.services.homeServiceSummaries.<id> に置き index でミラーする。
 * featureItemCounts は各 feature group の items 件数。
 */
export interface HomeServiceSummaryAsset {
  id: string
  index: string
  featureGroupCount: number
  featureItemCounts: number[]
  href: string
}

export const homeServiceSummaryAssets: HomeServiceSummaryAsset[] = [
  { id: "archaive", index: "01", featureGroupCount: 2, featureItemCounts: [3, 2], href: "/service#archaive" },
  { id: "send-ai", index: "02", featureGroupCount: 2, featureItemCounts: [3, 2], href: "/service#send-ai" },
  { id: "flowerium", index: "03", featureGroupCount: 3, featureItemCounts: [1, 1, 1], href: "/service#flowerium" },
]

/** 指定 locale のホーム要約（assets + 翻訳テキスト）を返す（Server Component 用） */
export async function getHomeServiceSummaries(locale: string): Promise<HomeServiceSummary[]> {
  const t = await getTranslations({ locale, namespace: 'data.services.homeServiceSummaries' })
  return homeServiceSummaryAssets.map((asset) => ({
    index: asset.index,
    href: asset.href,
    subtitle: t(`${asset.id}.subtitle`),
    title: t(`${asset.id}.title`),
    description: t(`${asset.id}.description`),
    features: Array.from({ length: asset.featureGroupCount }, (_, g) => ({
      label: t(`${asset.id}.features.${g}.label`),
      items: Array.from({ length: asset.featureItemCounts[g] }, (_, i) =>
        t(`${asset.id}.features.${g}.items.${i}`)
      ),
    })),
  }))
}

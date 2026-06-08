import { getTranslations } from 'next-intl/server'

export interface Member {
  id: string
  name: string
  englishName?: string
  position: string
  description: string
  image?: string
  heroImage?: string
}

/**
 * メンバーの非翻訳フィールド（id・ローマ字・画像）。
 * 翻訳対象の name / position / description はメッセージ data.members.<id> に置く。
 */
export interface MemberAsset {
  id: string
  englishName?: string
  image?: string
  heroImage?: string
}

export const memberAssets: MemberAsset[] = [
  { id: "yuto-ogata", englishName: "Yuto Ogata", image: "/images/member/ogata-yuto.jpg", heroImage: "/images/member/ogata-yuto-hero.jpg" },
  { id: "takehiro-kikkawa", englishName: "Takehiro Kikkawa", image: "/images/member/kikkawa-takehiro.jpg", heroImage: "/images/member/kikkawa-takehiro-hero.jpg" },
  { id: "yuki-tanaka", englishName: "Yuki Tanaka", image: "/images/member/tanaka-yuki.jpg", heroImage: "/images/member/tanaka-yuki-hero.jpg" },
  { id: "daigo-fujii", englishName: "Daigo Fujii", image: "/images/member/fujii-daigo.jpg", heroImage: "/images/member/fujii-daigo-hero.jpg" },
  { id: "naoki-kadokura", englishName: "Naoki Kadokura", image: "/images/member/kadokura-naoki.jpg", heroImage: "/images/member/kadokura-naoki-hero.jpg" },
  { id: "haruki-kimura", englishName: "Haruki Kimura", image: "/images/member/kimura-haruki.jpg", heroImage: "/images/member/kimura-haruki-hero.jpg" },
  { id: "jiho-ryu", englishName: "Jiho Ryu", image: "/images/member/ryu-jiho.jpg", heroImage: "/images/member/ryu-jiho-hero.jpg" },
  { id: "shota-yamashita", englishName: "Shota Yamashita", image: "/images/member/yamashita-shota.jpg", heroImage: "/images/member/yamashita-shota-hero.jpg" },
  { id: "shunsuke-kimura", englishName: "Shunsuke Kimura", image: "/images/member/kimura-shunsuke.jpg", heroImage: "/images/member/kimura-shunsuke-hero.jpg" },
  { id: "namiki-chikusa", englishName: "Namiki Chikusa", image: "/images/member/chikusa-namiki.jpg", heroImage: "/images/member/chikusa-namiki-hero.jpg" },
  { id: "sota-nagai", englishName: "Sota Nagai", image: "/images/member/nagai-sota.jpg", heroImage: "/images/member/nagai-sota-hero.jpg" },
]

/** 指定 locale の全メンバー（assets + 翻訳テキスト）を返す（Server Component 用） */
export async function getMembers(locale: string): Promise<Member[]> {
  const t = await getTranslations({ locale, namespace: 'data.members' })
  return memberAssets.map((asset) => ({
    ...asset,
    name: t(`${asset.id}.name`),
    position: t(`${asset.id}.position`),
    description: t(`${asset.id}.description`),
  }))
}

/** 指定 locale・id のメンバーを返す（見つからなければ undefined） */
export async function getMember(locale: string, id: string): Promise<Member | undefined> {
  if (!memberAssets.some((m) => m.id === id)) return undefined
  const members = await getMembers(locale)
  return members.find((m) => m.id === id)
}

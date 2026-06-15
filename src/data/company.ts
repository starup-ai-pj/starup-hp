import { getTranslations } from 'next-intl/server'

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

/**
 * 会社情報の非翻訳構造（id・ラベル・行数）。
 * 翻訳対象の各行テキストはメッセージ data.company.profile.<id>.lines.<n> に置く。
 */
interface CompanyProfileAsset {
  id: string
  label: string
  lineCount: number
}

const companyProfileAssets: CompanyProfileAsset[] = [
  { id: 'company', label: 'Company', lineCount: 1 },
  { id: 'representative', label: 'Representative', lineCount: 1 },
  { id: 'established', label: 'Established', lineCount: 1 },
  { id: 'employees', label: 'Employees', lineCount: 1 },
  { id: 'address', label: 'Address', lineCount: 2 },
  { id: 'business', label: 'Business', lineCount: 4 },
  { id: 'license', label: 'License', lineCount: 2 },
  { id: 'certification', label: 'Certification', lineCount: 3 },
  { id: 'legal', label: 'Legal', lineCount: 2 },
  { id: 'tax', label: 'Tax', lineCount: 1 },
  { id: 'bank', label: 'Bank', lineCount: 4 },
]

const partnerCount = 11

/** 指定 locale の会社情報（ラベル + 翻訳済みの行）を返す（Server Component 用） */
export async function getCompanyProfile(locale: string): Promise<CompanyInfoItem[]> {
  const t = await getTranslations({ locale, namespace: 'data.company' })
  return companyProfileAssets.map((asset) => ({
    label: asset.label,
    lines: Array.from({ length: asset.lineCount }, (_, i) =>
      t(`profile.${asset.id}.lines.${i}`)
    ),
  }))
}

/** 指定 locale の取引先一覧（翻訳済み）を返す（Server Component 用） */
export async function getPartners(locale: string): Promise<string[]> {
  const t = await getTranslations({ locale, namespace: 'data.company' })
  return Array.from({ length: partnerCount }, (_, i) => t(`partners.${i}`))
}

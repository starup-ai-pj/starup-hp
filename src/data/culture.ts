/**
 * カルチャーページ（/recruit/culture）のコンテンツ
 * フィロソフィー本文・バリュー・働き方。
 * 構造（id・番号・英語タイトル）はここに、翻訳テキストは data.culture メッセージに置く。
 */

import { getTranslations } from 'next-intl/server'

export interface CultureValue {
  num: string
  title: string
  subtitle: string
  body: string
}

export interface WorkStyle {
  num: string
  title: string
  body: string
}

export interface CultureContent {
  philosophyBody: string[]
  values: CultureValue[]
  workStyles: WorkStyle[]
}

/** バリューの非翻訳フィールド（番号・英語タイトル）と翻訳キー */
const valueStructure = [
  { id: 'ownership', num: '01', title: 'Ownership' },
  { id: 'notCynical', num: '02', title: 'Not cynical' },
  { id: 'stayCurious', num: '03', title: 'Stay curious, stay grounded' },
  { id: 'beMultiplier', num: '04', title: 'Be a multiplier' },
] as const

const workStyleStructure = [
  { id: 'speed', num: '01' },
  { id: 'frontline', num: '02' },
  { id: 'kyoto', num: '03' },
] as const

const philosophyKeys = ['p1', 'p2', 'p3', 'p4'] as const

/** 指定 locale のカルチャーコンテンツ（構造 + 翻訳テキスト）を返す（Server Component 用） */
export async function getCulture(locale: string): Promise<CultureContent> {
  const t = await getTranslations({ locale, namespace: 'data.culture' })
  return {
    philosophyBody: philosophyKeys.map((key) => t(`philosophyBody.${key}`)),
    values: valueStructure.map((value) => ({
      num: value.num,
      title: value.title,
      subtitle: t(`values.${value.id}.subtitle`),
      body: t(`values.${value.id}.body`),
    })),
    workStyles: workStyleStructure.map((style) => ({
      num: style.num,
      title: t(`workStyles.${style.id}.title`),
      body: t(`workStyles.${style.id}.body`),
    })),
  }
}

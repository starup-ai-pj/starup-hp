/**
 * Notion プロパティ抽出ヘルパー
 * Notionページの各プロパティを、型に応じた素のJS値へ変換する。
 * 各ドメインのデータ層から直接呼び出して使う（config駆動の抽象は持たない）。
 */

import { NotionPage } from './types'

/** title プロパティ → プレーンテキスト */
export function getTitle(page: NotionPage, property: string): string {
  return page.properties[property]?.title?.[0]?.plain_text || ''
}

/** rich_text プロパティ → プレーンテキスト */
export function getRichText(page: NotionPage, property: string): string {
  return page.properties[property]?.rich_text?.[0]?.plain_text || ''
}

/** unique_id プロパティ → 文字列化した番号 */
export function getUniqueId(page: NotionPage, property: string): string {
  const number = page.properties[property]?.unique_id?.number
  return number !== undefined ? String(number) : ''
}

/** select プロパティ → 選択名 */
export function getSelect(page: NotionPage, property: string): string {
  return page.properties[property]?.select?.name || ''
}

/** multi_select プロパティ → 選択名の配列 */
export function getMultiSelect(page: NotionPage, property: string): string[] {
  return (
    page.properties[property]?.multi_select?.map(
      (item: { name: string }) => item.name
    ) || []
  )
}

/**
 * select / multi_select のどちらでも配列で取得する後方互換ヘルパー
 * Notion 側でプロパティ型を単一選択→複数選択へ移行している最中でも値を失わない。
 * - multi_select: 選択名の配列をそのまま返す
 * - select: 選択名を要素1つの配列にして返す（未選択は空配列）
 */
export function getSelectOrMultiSelect(
  page: NotionPage,
  property: string
): string[] {
  const prop = page.properties[property]
  if (!prop) return []
  if (Array.isArray(prop.multi_select)) {
    return prop.multi_select.map((item: { name: string }) => item.name)
  }
  if (prop.select?.name) return [prop.select.name]
  return []
}

/** date プロパティ → 開始日（YYYY-MM-DD） */
export function getDate(page: NotionPage, property: string): string {
  return page.properties[property]?.date?.start || ''
}

/** number プロパティ → 数値（未設定 / プロパティ未追加は null） */
export function getNumber(page: NotionPage, property: string): number | null {
  const value = page.properties[property]?.number
  return typeof value === 'number' ? value : null
}

/** files プロパティ → 先頭ファイルのURL（file / external 両対応） */
export function getFileUrl(page: NotionPage, property: string): string {
  const files = page.properties[property]?.files
  if (!files || files.length === 0) return ''

  const file = files[0]
  if (file.type === 'file' && file.file) return file.file.url
  if (file.type === 'external' && file.external) return file.external.url
  return ''
}

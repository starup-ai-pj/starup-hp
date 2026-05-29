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

/** date プロパティ → 開始日（YYYY-MM-DD） */
export function getDate(page: NotionPage, property: string): string {
  return page.properties[property]?.date?.start || ''
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

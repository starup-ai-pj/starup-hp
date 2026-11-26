/**
 * Notion 画像の URL を、next/image に渡せる「変わらない URL」にする。
 *
 * Notion のファイル URL は 1 時間ほどで切れる署名付き S3 URL で、取得のたびに変わる。
 * そのまま next/image に渡すと、表示のたびに別の画像として変換が走り、キャッシュも効かない。
 * そこで ID と更新日時だけを含む自前のプロキシ（/api/notion-image/...）の URL を返す。
 * プロキシは呼ばれたときに Notion API から最新の署名付き URL を取り直して画像を返す。
 *
 * URL に更新日時を入れているので、Notion で画像を差し替えると URL も変わる（古い変換結果は使われない）。
 */

import { NotionBlock, NotionImageBlock, NotionPage } from './types'

export const NOTION_IMAGE_ROUTE = '/api/notion-image'

/** プロキシ経由で返してよいページのファイルプロパティ（これ以外は 404） */
export const NOTION_IMAGE_PAGE_PROPERTIES = ['Thumbnail'] as const
export type NotionImagePageProperty = (typeof NOTION_IMAGE_PAGE_PROPERTIES)[number]

/** 更新日時を URL 用の短い文字列にする（例: 2025-10-30T14:31:00.000Z → "mhd3k1s0"） */
function toVersion(lastEditedTime: string): string {
  const ms = Date.parse(lastEditedTime)
  return Number.isNaN(ms) ? '0' : ms.toString(36)
}

/** 画像ブロックの表示用 URL（画像でない・URL が無いときは空文字） */
export function getImageBlockSrc(block: NotionBlock): string {
  if (block.type !== 'image') return ''
  const image = (block as NotionImageBlock).image
  if (!image.file?.url && !image.external?.url) return ''
  return `${NOTION_IMAGE_ROUTE}/block/${block.id}/${toVersion(block.last_edited_time)}`
}

/** ページの files プロパティ（先頭のファイル）の表示用 URL（未設定なら空文字） */
export function getPageFileSrc(
  page: NotionPage,
  property: NotionImagePageProperty
): string {
  const files = page.properties[property]?.files
  if (!files || files.length === 0) return ''
  return `${NOTION_IMAGE_ROUTE}/page/${page.id}/${property}/${toVersion(page.last_edited_time)}`
}

/**
 * 汎用Notion APIクライアント
 * プロジェクト間で再利用可能な汎用的なNotionクライアント
 */

import { Client } from '@notionhq/client'
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionPage, NotionBlock } from './types'

/**
 * Notionクライアントのシングルトンインスタンス
 */
let notionClient: Client | null = null

/**
 * 環境変数を取得（検証付き）
 */
function getEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not defined in environment variables`)
  }
  return value
}

/**
 * NotionのIDをUUID形式に変換
 * ハイフンなし32文字のIDを、UUID形式（8-4-4-4-12）に変換
 * すでにUUID形式の場合はそのまま返す
 *
 * @param id - NotionのID（ハイフンありまたはなし）
 * @returns UUID形式のID
 */
function normalizeNotionId(id: string): string {
  // ハイフンを削除して32文字の文字列にする
  const cleanId = id.replace(/-/g, '')

  // 32文字でない場合はそのまま返す（エラーはNotion APIに任せる）
  if (cleanId.length !== 32) {
    return id
  }

  // UUID形式（8-4-4-4-12）に変換
  return `${cleanId.slice(0, 8)}-${cleanId.slice(8, 12)}-${cleanId.slice(12, 16)}-${cleanId.slice(16, 20)}-${cleanId.slice(20)}`
}

/**
 * Notionクライアントを初期化して取得
 */
export function getNotionClient(): Client {
  if (!notionClient) {
    const apiKey = getEnvVar('NOTION_API_KEY')
    notionClient = new Client({
      auth: apiKey,
    })
  }
  return notionClient
}

/**
 * データベースから全ページを取得（汎用）
 *
 * @param databaseId - NotionデータベースID
 * @param options.sorts - ソート条件
 * @param options.filter - フィルター条件
 * @returns ページの配列
 */
export async function queryDatabase(
  databaseId: string,
  options?: {
    sorts?: Array<{
      property: string
      direction: 'ascending' | 'descending'
    }>
    filter?: any
  }
): Promise<NotionPage[]> {
  const notion = getNotionClient()

  try {
    const response = await notion.dataSources.query({
      data_source_id: normalizeNotionId(databaseId),
      sorts: options?.sorts,
      filter: options?.filter,
    })

    return response.results as unknown as NotionPage[]
  } catch (error) {
    console.error('Error querying Notion database:', error)
    throw error
  }
}

/**
 * ページIDでページ情報を取得
 *
 * @param pageId - NotionページID（UUID）
 * @returns ページオブジェクト
 */
export async function getPageByPageId(pageId: string): Promise<NotionPage> {
  const notion = getNotionClient()

  try {
    const response = await notion.pages.retrieve({
      page_id: normalizeNotionId(pageId),
    })

    return response as unknown as NotionPage
  } catch (error) {
    console.error(`Error retrieving page ${pageId}:`, error)
    throw error
  }
}

/**
 * ブロックが完全なBlockObjectResponseかチェック
 */
function isBlockObject(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return block.object === 'block' && 'type' in block
}

/**
 * ブロックの子要素を再帰的に取得
 *
 * @param blockId - NotionブロックID
 * @returns ブロックの配列（子ブロックを含む）
 */
async function fetchBlockChildrenRecursive(
  blockId: string
): Promise<NotionBlock[]> {
  const notion = getNotionClient()
  const blocks: NotionBlock[] = []
  let cursor: string | undefined = undefined

  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: normalizeNotionId(blockId),
        start_cursor: cursor,
        page_size: 100,
      })

      for (const entry of response.results) {
        if (!isBlockObject(entry)) continue

        const block: NotionBlock = { ...entry } as NotionBlock

        // 子要素がある場合は再帰的に取得
        if (block.has_children) {
          block.children = await fetchBlockChildrenRecursive(block.id)
        }

        blocks.push(block)
      }

      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)

    return blocks
  } catch (error) {
    console.error(`Error getting blocks for ${blockId}:`, error)
    throw error
  }
}

/**
 * ページのブロック（本文）を取得（再帰的に子ブロックも取得）
 *
 * @param pageId - NotionページID（UUID）
 * @returns ブロックの配列（子ブロックを含む）
 */
export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    return await fetchBlockChildrenRecursive(pageId)
  } catch (error) {
    console.error(`Error getting blocks for page ${pageId}:`, error)
    throw error
  }
}

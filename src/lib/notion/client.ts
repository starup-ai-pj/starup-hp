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
 * サンプルコードと同じfetch方式を使用してcache制御を明示
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
  const apiKey = getEnvVar('NOTION_API_KEY')
  const NOTION_API_VERSION = '2022-06-28'
  const NOTION_API_BASE_URL = 'https://api.notion.com/v1'

  try {
    const response = await fetch(
      `${NOTION_API_BASE_URL}/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Notion-Version': NOTION_API_VERSION,
        },
        body: JSON.stringify({
          sorts: options?.sorts,
          filter: options?.filter,
        }),
        cache: 'no-store', // ★サンプルと同じ: 毎回新しいデータを取得
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error querying Notion database:', errorText)
      throw new Error(`Failed to query Notion database: ${response.status}`)
    }

    const data = await response.json()
    return data.results as NotionPage[]
  } catch (error) {
    console.error('Error querying Notion database:', error)
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
        block_id: blockId,
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

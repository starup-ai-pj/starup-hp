/**
 * 汎用コンテンツリポジトリ
 * DatabaseConfig とマッパーから、Notion DB をソースとする
 * 「一覧取得 / ID取得 / 全ID取得」の共通データ層を生成する。
 * news / recruit など、構造が同じデータ層の重複を排除するためのファクトリ。
 */

import { queryDatabase, getPageBlocks } from './client'
import { createExtractors, getDatabaseId, getDefaultSorts } from './extractors'
import { DatabaseConfig, NotionPage, NotionBlock } from './types'

type Extractors<C extends DatabaseConfig> = ReturnType<typeof createExtractors<C>>

interface ContentMappers<C extends DatabaseConfig, TListItem, TPost> {
  /** 一覧表示用の軽量データへ変換（本文を含まない） */
  toListItem: (extractors: Extractors<C>, page: NotionPage) => TListItem
  /** 詳細表示用の完全データへ変換（本文ブロックを含む） */
  toPost: (extractors: Extractors<C>, page: NotionPage, blocks: NotionBlock[]) => TPost
}

export function createContentRepository<C extends DatabaseConfig, TListItem, TPost>(
  config: C,
  mappers: ContentMappers<C, TListItem, TPost>
) {
  const extractors = createExtractors(config)

  /** 一覧を取得（defaultSorts 適用済み） */
  async function getAllForList(): Promise<TListItem[]> {
    const pages = await queryDatabase(getDatabaseId(config), {
      sorts: getDefaultSorts(config),
    })
    return pages.map((page) => mappers.toListItem(extractors, page))
  }

  /** unique_id で詳細を取得（見つからなければ null） */
  async function getById(id: string): Promise<TPost | null> {
    const targetId = parseInt(id, 10)
    if (isNaN(targetId)) return null

    const pages = await queryDatabase(getDatabaseId(config))
    const page = pages.find((p) => extractors.id(p) === String(targetId))
    if (!page) return null

    const blocks = await getPageBlocks(page.id)
    return mappers.toPost(extractors, page, blocks)
  }

  /** 全ての unique_id を取得（動的ルーティング用） */
  async function getAllIds(): Promise<string[]> {
    const pages = await queryDatabase(getDatabaseId(config))
    return pages.map((page) => extractors.id(page)).filter(Boolean)
  }

  return { getAllForList, getById, getAllIds }
}

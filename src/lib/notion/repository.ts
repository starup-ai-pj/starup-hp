/**
 * 汎用コンテンツリポジトリ
 * Notion DB をソースとする「一覧取得 / ID取得 / 全ID取得」の共通オーケストレーションを提供する。
 * プロパティの抽出（マッピング）は各ドメインが fields ヘルパで行い、ここには Notion DB 構造の知識を持たせない。
 */

import { queryDatabase, getPageBlocks } from './client'
import { NotionPage, NotionBlock } from './types'

type Sort = { property: string; direction: 'ascending' | 'descending' }

interface ContentMappers<TListItem, TPost> {
  /** 一覧表示用の軽量データへ変換（本文を含まない） */
  toListItem: (page: NotionPage) => TListItem
  /** 詳細表示用の完全データへ変換（本文ブロックを含む） */
  toPost: (page: NotionPage, blocks: NotionBlock[]) => TPost
  /** unique_id を文字列で返す（getById の突合に使用） */
  getId: (page: NotionPage) => string
}

interface RepositoryOptions {
  /**
   * 公開フィルタ。取得した全ページから「サイトに表示してよいもの」だけを返す。
   * 全件を一度に受け取るため「ステータス未設定なら全件表示」のような
   * データセット全体を見た判定ができる。未指定なら全件公開。
   */
  filterVisible?: (pages: NotionPage[]) => NotionPage[]
  /**
   * 一覧の並べ替え（Notion の sorts 取得後にアプリ側で適用）。
   * 手動並び順など、プロパティ未追加でも壊れない後方互換な並べ替えをドメイン側に閉じる。
   * 安定ソート前提で、sorts の結果を二次キーとして活かす想定。未指定なら sorts のまま。
   */
  orderListItems?: (pages: NotionPage[]) => NotionPage[]
}

export function createContentRepository<TListItem, TPost>(
  databaseId: string,
  sorts: Sort[],
  mappers: ContentMappers<TListItem, TPost>,
  options?: RepositoryOptions
) {
  const filterVisible = options?.filterVisible ?? ((pages) => pages)
  const orderListItems = options?.orderListItems ?? ((pages) => pages)

  /** 一覧を取得（sorts・公開フィルタ・並べ替え適用済み） */
  async function getAllForList(): Promise<TListItem[]> {
    const pages = await queryDatabase(databaseId, { sorts })
    return orderListItems(filterVisible(pages)).map(mappers.toListItem)
  }

  /** unique_id で詳細を取得（非公開・見つからなければ null） */
  async function getById(id: string): Promise<TPost | null> {
    const targetId = parseInt(id, 10)
    if (isNaN(targetId)) return null

    const pages = await queryDatabase(databaseId)
    const page = filterVisible(pages).find(
      (p) => mappers.getId(p) === String(targetId)
    )
    if (!page) return null

    const blocks = await getPageBlocks(page.id)
    return mappers.toPost(page, blocks)
  }

  return { getAllForList, getById }
}

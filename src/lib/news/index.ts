/**
 * News データレイヤー
 * Notion の News データベースから取得・整形する。
 * Notion DB の構造（プロパティ名）はこのファイルに閉じている。
 */

import { requireEnv } from '@/lib/notion/client'
import { createContentRepository } from '@/lib/notion/repository'
import {
  getUniqueId,
  getTitle,
  getDate,
  getMultiSelect,
  getRichText,
  getFileUrl,
} from '@/lib/notion/fields'
import { NewsPost, NewsListItem } from './types'

export type { NewsPost, NewsListItem } from './types'

const DEFAULT_IMAGE = '/images/news/news-detail.webp'

const repository = createContentRepository<NewsListItem, NewsPost>(
  requireEnv('NOTION_NEWS_DATABASE_ID'),
  [{ property: 'Date', direction: 'descending' }],
  {
    getId: (page) => getUniqueId(page, 'ID'),
    toListItem: (page) => ({
      id: getUniqueId(page, 'ID'),
      title: getTitle(page, 'Name'),
      date: getDate(page, 'Date'),
      tags: getMultiSelect(page, 'Tags'),
      summary: getRichText(page, 'Description'),
      thumbnail: getFileUrl(page, 'Thumbnail') || DEFAULT_IMAGE,
    }),
    toPost: (page, blocks) => ({
      id: getUniqueId(page, 'ID'),
      title: getTitle(page, 'Name'),
      date: getDate(page, 'Date'),
      tags: getMultiSelect(page, 'Tags'),
      summary: getRichText(page, 'Description'),
      blocks,
      thumbnail: getFileUrl(page, 'Thumbnail') || DEFAULT_IMAGE,
    }),
  }
)

/** ニュース一覧を取得（日付降順） */
export const getAllNewsForList = repository.getAllForList

/** IDでニュース記事を取得（見つからなければ null） */
export const getNewsPostById = repository.getById

/** 最新のニュースを指定件数取得 */
export async function getLatestNews(limit: number = 3): Promise<NewsListItem[]> {
  const allNews = await getAllNewsForList()
  return allNews.slice(0, limit)
}

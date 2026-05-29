/**
 * News データレイヤー
 * Notionからニュースデータを取得・整形
 */

import { NewsPost, NewsListItem } from '@/types/news'
import { newsConfig } from './notion/config/news-config'
import { createContentRepository } from './notion/repository'

const DEFAULT_IMAGE = '/images/news/news-detail.webp'

const repository = createContentRepository<typeof newsConfig, NewsListItem, NewsPost>(
  newsConfig,
  {
    toListItem: (ex, page) => ({
      id: ex.id(page),
      title: ex.title(page),
      date: ex.date(page),
      tags: ex.tags(page),
      summary: ex.description(page),
      imageUrl: ex.thumbnail(page) || DEFAULT_IMAGE,
    }),
    toPost: (ex, page, blocks) => ({
      id: ex.id(page),
      title: ex.title(page),
      date: ex.date(page),
      tags: ex.tags(page),
      summary: ex.description(page),
      blocks,
      thumbnail: ex.thumbnail(page) || DEFAULT_IMAGE,
    }),
  }
)

/** ニュース一覧を取得（日付降順） */
export const getAllNewsForList = repository.getAllForList

/** IDでニュース記事を取得（見つからなければ null） */
export const getNewsPostById = repository.getById

/** 全てのニュースIDを取得（動的ルーティング用） */
export const getAllNewsIds = repository.getAllIds

/** 最新のニュースを指定件数取得 */
export async function getLatestNews(limit: number = 3): Promise<NewsListItem[]> {
  const allNews = await getAllNewsForList()
  return allNews.slice(0, limit)
}

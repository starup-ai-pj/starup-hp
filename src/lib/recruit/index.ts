/**
 * Recruit データレイヤー
 * Notion の Recruit データベースから取得・整形する。
 * Notion DB の構造（プロパティ名）はこのファイルに閉じている。
 */

import { requireEnv } from '@/lib/notion/client'
import { createContentRepository } from '@/lib/notion/repository'
import { NotionPage } from '@/lib/notion/types'
import {
  getUniqueId,
  getTitle,
  getDate,
  getSelect,
  getSelectOrMultiSelect,
  getMultiSelect,
  getRichText,
  getFileUrl,
} from '@/lib/notion/fields'
import { RecruitPost, RecruitListItem } from './types'

export type { RecruitPost, RecruitListItem } from './types'

const DEFAULT_IMAGE = '/images/recruit/detail/business.jpg'

/** 公開ステータス（Select）。値はこのファイルに閉じる。 */
const STATUS_PROPERTY = 'PublishStatus'
const STATUS_OPEN = '募集中'

/**
 * 公開フィルタ。
 * - ステータスが1件も設定されていない（プロパティ未追加 / 全件空）間は全件表示する
 *   ＝ Notion 移行が済むまでの後方互換フォールバック。
 * - 1件でも設定されたら「募集中」のみ公開する
 *   ＝「作り置きして募集中だけ表示」という運用を満たす。
 */
function filterPublished(pages: NotionPage[]) {
  const anyStatusSet = pages.some(
    (page) => getSelect(page, STATUS_PROPERTY) !== ''
  )
  if (!anyStatusSet) return pages
  return pages.filter((page) => getSelect(page, STATUS_PROPERTY) === STATUS_OPEN)
}

const repository = createContentRepository<RecruitListItem, RecruitPost>(
  requireEnv('NOTION_RECRUIT_DATABASE_ID'),
  [{ property: 'Date', direction: 'descending' }],
  {
    getId: (page) => getUniqueId(page, 'ID'),
    toListItem: (page) => ({
      id: getUniqueId(page, 'ID'),
      title: getTitle(page, 'Name'),
      date: getDate(page, 'Date'),
      category: getSelectOrMultiSelect(page, 'Category'),
      summary: getRichText(page, 'Summary'),
      jobType: getSelectOrMultiSelect(page, 'JobType'),
      location: getRichText(page, 'Location'),
      employmentType: getMultiSelect(page, 'EmploymentType'),
      salary: getRichText(page, 'Salary'),
      thumbnail: getFileUrl(page, 'Thumbnail') || DEFAULT_IMAGE,
    }),
    toPost: (page, blocks) => ({
      id: getUniqueId(page, 'ID'),
      title: getTitle(page, 'Name'),
      date: getDate(page, 'Date'),
      category: getSelectOrMultiSelect(page, 'Category'),
      summary: getRichText(page, 'Summary'),
      jobType: getSelectOrMultiSelect(page, 'JobType'),
      location: getRichText(page, 'Location'),
      employmentType: getMultiSelect(page, 'EmploymentType'),
      salary: getRichText(page, 'Salary'),
      workingHours: getRichText(page, 'WorkingHours'),
      holidays: getRichText(page, 'Holidays'),
      benefits: getRichText(page, 'Benefits'),
      thumbnail: getFileUrl(page, 'Thumbnail') || DEFAULT_IMAGE,
      blocks,
    }),
  },
  { filterVisible: filterPublished }
)

/** 採用情報一覧を取得（日付降順） */
export const getAllRecruitsForList = repository.getAllForList

/** IDで採用情報を取得（見つからなければ null） */
export const getRecruitPostById = repository.getById

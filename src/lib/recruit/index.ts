/**
 * Recruit データレイヤー
 * Notion の Recruit データベースから取得・整形する。
 * Notion DB の構造（プロパティ名）はこのファイルに閉じている。
 */

import { requireEnv } from '@/lib/notion/client'
import { createContentRepository } from '@/lib/notion/repository'
import {
  getUniqueId,
  getTitle,
  getDate,
  getSelect,
  getMultiSelect,
  getRichText,
  getFileUrl,
} from '@/lib/notion/fields'
import { RecruitPost, RecruitListItem } from './types'

export type { RecruitPost, RecruitListItem } from './types'

const DEFAULT_IMAGE = '/images/recruit/detail/business.jpg'

const repository = createContentRepository<RecruitListItem, RecruitPost>(
  requireEnv('NOTION_RECRUIT_DATABASE_ID'),
  [{ property: 'Date', direction: 'descending' }],
  {
    getId: (page) => getUniqueId(page, 'ID'),
    toListItem: (page) => ({
      id: getUniqueId(page, 'ID'),
      title: getTitle(page, 'Name'),
      date: getDate(page, 'Date'),
      category: getSelect(page, 'Category'),
      summary: getRichText(page, 'Summary'),
      jobType: getSelect(page, 'JobType'),
      location: getRichText(page, 'Location'),
      employmentType: getMultiSelect(page, 'EmploymentType'),
      salary: getRichText(page, 'Salary'),
      thumbnail: getFileUrl(page, 'Thumbnail') || DEFAULT_IMAGE,
    }),
    toPost: (page, blocks) => ({
      id: getUniqueId(page, 'ID'),
      title: getTitle(page, 'Name'),
      date: getDate(page, 'Date'),
      category: getSelect(page, 'Category'),
      summary: getRichText(page, 'Summary'),
      jobType: getSelect(page, 'JobType'),
      location: getRichText(page, 'Location'),
      employmentType: getMultiSelect(page, 'EmploymentType'),
      salary: getRichText(page, 'Salary'),
      workingHours: getRichText(page, 'WorkingHours'),
      holidays: getRichText(page, 'Holidays'),
      benefits: getRichText(page, 'Benefits'),
      thumbnail: getFileUrl(page, 'Thumbnail') || DEFAULT_IMAGE,
      blocks,
    }),
  }
)

/** 採用情報一覧を取得（日付降順） */
export const getAllRecruitsForList = repository.getAllForList

/** IDで採用情報を取得（見つからなければ null） */
export const getRecruitPostById = repository.getById

/** 全ての採用情報IDを取得（動的ルーティング用） */
export const getAllRecruitIds = repository.getAllIds

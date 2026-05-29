/**
 * Recruit データレイヤー
 * Notionから採用情報データを取得・整形
 */

import { RecruitPost, RecruitListItem } from '@/types/recruit'
import { recruitConfig } from './notion/config/recruit-config'
import { createContentRepository } from './notion/repository'

const DEFAULT_IMAGE = '/images/recruit/detail/business.jpg'

const repository = createContentRepository<typeof recruitConfig, RecruitListItem, RecruitPost>(
  recruitConfig,
  {
    toListItem: (ex, page) => ({
      id: ex.id(page),
      title: ex.title(page),
      date: ex.date(page),
      category: ex.category(page),
      summary: ex.summary(page),
      jobType: ex.jobType(page),
      location: ex.location(page),
      employmentType: ex.employmentType(page),
      salary: ex.salary(page),
      imageUrl: ex.thumbnail(page) || DEFAULT_IMAGE,
    }),
    toPost: (ex, page, blocks) => ({
      id: ex.id(page),
      title: ex.title(page),
      date: ex.date(page),
      category: ex.category(page),
      summary: ex.summary(page),
      jobType: ex.jobType(page),
      location: ex.location(page),
      employmentType: ex.employmentType(page),
      salary: ex.salary(page),
      workingHours: ex.workingHours(page),
      holidays: ex.holidays(page),
      benefits: ex.benefits(page),
      thumbnail: ex.thumbnail(page) || DEFAULT_IMAGE,
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

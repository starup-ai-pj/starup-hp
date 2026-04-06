/**
 * Recruit 型定義
 */

import { NotionBlock } from '@/lib/notion/types'

/**
 * 採用情報の完全なデータ型
 */
export interface RecruitPost {
  id: string
  title: string
  date: string
  category: string
  summary: string
  blocks: NotionBlock[]
  jobType: string
  location: string
  employmentType: string
  salary: string
  workingHours: string
  holidays: string
  benefits: string
  thumbnail: string
}

/**
 * 採用情報一覧表示用のデータ型
 */
export interface RecruitListItem {
  id: string
  title: string
  date: string
  category: string
  imageUrl: string
  summary: string
  jobType: string
  location: string
  employmentType: string
  salary: string
}

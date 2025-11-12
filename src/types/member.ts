/**
 * Member型定義
 * アプリケーション全体で使用するメンバー関連の型定義
 */

import { NotionBlock } from '@/lib/notion/types'

/**
 * メンバーの完全なデータ型
 * 詳細ページで使用
 */
export interface MemberPost {
  /** メンバーID（Notionのunique_id.numberを文字列化） */
  id: string
  /** メンバー名（日本語） */
  name: string
  /** メンバー名（英語） */
  englishName: string
  /** URLスラッグ（英語名から生成） */
  slug: string
  /** 役職 */
  position: string
  /** 説明文 */
  description: string
  /** プロフィール本文（Notionブロック配列） */
  blocks: NotionBlock[]
  /** プロフィール画像URL */
  image: string
  /** SNSリンク */
  socialLinks: {
    twitter?: string
    facebook?: string
    linkedin?: string
  }
}

/**
 * メンバー一覧表示用のデータ型
 * 一覧ページで使用
 */
export interface MemberListItem {
  /** メンバーID */
  id: string
  /** メンバー名（日本語） */
  name: string
  /** メンバー名（英語） */
  englishName: string
  /** URLスラッグ（英語名から生成） */
  slug: string
  /** 役職 */
  position: string
  /** 説明文 */
  description: string
  /** プロフィール画像URL */
  imageUrl: string
  /** SNSリンク */
  socialLinks?: {
    twitter?: string
    facebook?: string
    linkedin?: string
  }
}

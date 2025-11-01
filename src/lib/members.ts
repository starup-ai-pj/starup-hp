/**
 * Members データレイヤー
 * Notionからメンバーデータを取得・整形
 */

import { MemberPost, MemberListItem } from '@/types/member'
import { queryDatabase } from './notion/client'
import { memberConfig } from './notion/config/member-config'
import { createExtractors, getDatabaseId, getDefaultSorts } from './notion/extractors'

// Memberのextractorを自動生成
const extractors = createExtractors(memberConfig)

const DEFAULT_IMAGE = '/images/member/default-member.png'

/**
 * 画像URLを取得（デフォルト画像のフォールバック付き）
 */
function getImageUrl(imageUrl: string): string {
  return imageUrl || DEFAULT_IMAGE
}

/**
 * メンバー一覧を取得
 *
 * @returns メンバー一覧（ID昇順）
 */
export async function getAllMembersForList(): Promise<MemberListItem[]> {
  try {
    const pages = await queryDatabase(getDatabaseId(memberConfig), {
      sorts: getDefaultSorts(memberConfig),
    })

    return pages.map((page) => ({
      id: extractors.id(page),
      name: extractors.name(page),
      englishName: extractors.englishName(page),
      position: extractors.position(page),
      description: extractors.description(page),
      imageUrl: getImageUrl(extractors.image(page)),
      socialLinks: {
        twitter: extractors.twitter(page) || undefined,
        facebook: extractors.facebook(page) || undefined,
        linkedin: extractors.linkedin(page) || undefined,
      },
    }))
  } catch (error) {
    console.error('Error fetching members list:', error)
    throw error
  }
}

/**
 * IDでメンバーを取得
 *
 * @param id - メンバーID（unique_id.number）
 * @returns メンバー情報、見つからない場合はnull
 */
export async function getMemberById(id: string): Promise<MemberPost | null> {
  try {
    const pages = await queryDatabase(getDatabaseId(memberConfig))
    const targetId = parseInt(id, 10)

    if (isNaN(targetId)) {
      return null
    }

    const page = pages.find((p) => {
      const pageId = extractors.id(p)
      return pageId === String(targetId)
    })

    if (!page) {
      return null
    }

    return {
      id: extractors.id(page),
      name: extractors.name(page),
      englishName: extractors.englishName(page),
      position: extractors.position(page),
      description: extractors.description(page),
      image: getImageUrl(extractors.image(page)),
      socialLinks: {
        twitter: extractors.twitter(page) || undefined,
        facebook: extractors.facebook(page) || undefined,
        linkedin: extractors.linkedin(page) || undefined,
      },
    }
  } catch (error) {
    console.error(`Error fetching member by ID ${id}:`, error)
    throw error
  }
}

/**
 * 全てのメンバーIDを取得（動的ルーティング用）
 *
 * @returns メンバーIDの配列
 */
export async function getAllMemberIds(): Promise<string[]> {
  try {
    const pages = await queryDatabase(getDatabaseId(memberConfig))
    return pages.map((page) => extractors.id(page)).filter(Boolean)
  } catch (error) {
    console.error('Error fetching all member IDs:', error)
    throw error
  }
}

/**
 * Members データレイヤー
 * Notionからメンバーデータを取得・整形
 */

import { MemberPost, MemberListItem } from '@/types/member'
import { queryDatabase, getPageBlocks } from './notion/client'
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
 * 英語名からスラッグを生成
 * 例: "Yuto Ogata" → "yuto-ogata"
 */
export function createSlugFromEnglishName(englishName: string): string {
  return englishName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
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

    return pages.map((page) => {
      const englishName = extractors.englishName(page)
      return {
        id: extractors.id(page),
        name: extractors.name(page),
        englishName: englishName,
        slug: createSlugFromEnglishName(englishName),
        position: extractors.position(page),
        description: extractors.description(page),
        imageUrl: getImageUrl(extractors.image(page)),
        socialLinks: {
          twitter: extractors.twitter(page) || undefined,
          facebook: extractors.facebook(page) || undefined,
          linkedin: extractors.linkedin(page) || undefined,
        },
      }
    })
  } catch (error) {
    console.error('Error fetching members list:', error)
    throw error
  }
}

/**
 * スラッグでメンバーを取得
 *
 * @param slug - メンバースラッグ（英語名から生成）
 * @returns メンバー情報、見つからない場合はnull
 */
export async function getMemberBySlug(slug: string): Promise<MemberPost | null> {
  try {
    const pages = await queryDatabase(getDatabaseId(memberConfig))

    const page = pages.find((p) => {
      const englishName = extractors.englishName(p)
      const pageSlug = createSlugFromEnglishName(englishName)
      return pageSlug === slug
    })

    if (!page) {
      return null
    }

    // ページのブロック（本文）を取得
    const blocks = await getPageBlocks(page.id)

    const englishName = extractors.englishName(page)
    return {
      id: extractors.id(page),
      name: extractors.name(page),
      englishName: englishName,
      slug: createSlugFromEnglishName(englishName),
      position: extractors.position(page),
      description: extractors.description(page),
      blocks,
      image: getImageUrl(extractors.image(page)),
      socialLinks: {
        twitter: extractors.twitter(page) || undefined,
        facebook: extractors.facebook(page) || undefined,
        linkedin: extractors.linkedin(page) || undefined,
      },
    }
  } catch (error) {
    console.error(`Error fetching member by slug ${slug}:`, error)
    throw error
  }
}

/**
 * 全てのメンバースラッグを取得（動的ルーティング用）
 *
 * @returns メンバースラッグの配列
 */
export async function getAllMemberSlugs(): Promise<string[]> {
  try {
    const pages = await queryDatabase(getDatabaseId(memberConfig))
    return pages
      .map((page) => {
        const englishName = extractors.englishName(page)
        return createSlugFromEnglishName(englishName)
      })
      .filter(Boolean)
  } catch (error) {
    console.error('Error fetching all member slugs:', error)
    throw error
  }
}

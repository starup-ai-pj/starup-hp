/**
 * Image gallery mapping for member pages
 * Maps member slugs to their personalized photo collections
 */

export interface GalleryImageSource {
  type: 'local' | 'unsplash'
  url: string
}

type MemberGalleryMap = {
  [slug: string]: GalleryImageSource[]
}

const memberGalleryImages: MemberGalleryMap = {
  'daigo-fujii': [
    // Local images
    { type: 'local', url: '/images/member/daigo-fujii/B745B9C8-2A42-43B0-95CD-B7A31D95842F.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_1382.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_2341.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_2912.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_3392.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_3704.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_4791.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_5016.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_5667.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_7775.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_8762.jpg' },
    { type: 'local', url: '/images/member/daigo-fujii/IMG_9474.jpg' },

    // Unsplash images
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&q=80' }, // 黄色とピンクの背景の絵
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1663868652528-04970e627cc2?w=800&q=80' }, // 本を持つ手
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1592832343983-48e2b801d129?w=800&q=80' }, // 昼間の川に浮かぶ白と青のボート
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1495473351003-ba0a460f7961?w=800&q=80' }, // 夜間の黒い高層ビル
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1443706340763-4b60757a36ce?w=800&q=80' }, // 緑の芝生の広角写真
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80' }, // アソートタイトルブックロット / ホッキョクグマ
    { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1666256629479-d049bc3cf40b?w=800&q=80' }, // 砂浜の上でサーフボードに乗る男
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1724178395638-42b12b1a6238?w=800&q=80' }, // 空を背景にした大きな空のスタジアム
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1500805987811-1913fdec59e6?w=800&q=80' }, // 夜間のライト付き店舗サイネージ
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?w=800&q=80' }, // 茶色の木製棚の本
    { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1673843714930-f214274eb201?w=800&q=80' }, // 昼間白い雲の下の海岸近くの2本のココヤシの木
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=800&q=80' }, // 木々を背景にした雪の中の小道
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1576341912554-68bf44eeab7d?w=800&q=80' }, // ビール入り透明なグラス
    { type: 'unsplash', url: 'https://images.unsplash.com/vector-1746720020454-48761cc07922?w=800&q=80' }, // 茶色の木製棚
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=800&q=80' }, // 茶色の木製の床に茶色と白の羊
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1495473351003-ba0a460f7961?w=800&q=80' }, // OKジェスチャーを手作業で行います
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1443706340763-4b60757a36ce?w=800&q=80' }, // 4棟の高層ビルのローアングル撮影
    { type: 'unsplash', url: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&q=80' }, // 追加 (繰り返し)
  ],
}

/**
 * Get gallery images for a specific member
 * @param slug - Member slug
 * @returns Array of image sources or null if not found
 */
export function getMemberGalleryImages(slug: string): GalleryImageSource[] | null {
  return memberGalleryImages[slug] || null
}

/**
 * Get default gallery images (fallback)
 * @param count - Number of default images to generate
 * @returns Array of default image sources
 */
export function getDefaultGalleryImages(count: number = 180): GalleryImageSource[] {
  return Array.from({ length: count }, (_, index) => ({
    type: 'unsplash' as const,
    url: `https://images.unsplash.com/photo-${1500000000000 + index}?w=800&q=80`,
  }))
}

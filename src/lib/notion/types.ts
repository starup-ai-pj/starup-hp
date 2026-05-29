/**
 * Notion API型定義
 * Notion APIのレスポンスに対応する型定義
 */

/**
 * Notion Rich Text オブジェクト
 */
export interface NotionRichText {
  type: 'text'
  text: {
    content: string
    link: {
      url: string
    } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

/**
 * Notion プロパティ値の汎用型
 */
export interface NotionPropertyValue {
  id: string
  type: string
  [key: string]: any
}

/**
 * Notion プロパティの汎用型（インデックスシグネチャ付き）
 */
export type NotionProperties = Record<string, NotionPropertyValue>

/**
 * Notion ページオブジェクト（汎用版）
 */
export interface NotionPage {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
  properties: NotionProperties
}

/**
 * Notion ブロック基底型
 */
export interface NotionBlockBase {
  object: 'block'
  id: string
  type: string
  created_time: string
  last_edited_time: string
  has_children: boolean
  archived: boolean
}

/**
 * Notion 見出しブロック
 */
export interface NotionHeadingBlock extends NotionBlockBase {
  type: 'heading_1' | 'heading_2' | 'heading_3'
  heading_1?: {
    rich_text: NotionRichText[]
    is_toggleable: boolean
    color: string
  }
  heading_2?: {
    rich_text: NotionRichText[]
    is_toggleable: boolean
    color: string
  }
  heading_3?: {
    rich_text: NotionRichText[]
    is_toggleable: boolean
    color: string
  }
}

/**
 * Notion 段落ブロック
 */
export interface NotionParagraphBlock extends NotionBlockBase {
  type: 'paragraph'
  paragraph: {
    rich_text: NotionRichText[]
    color: string
  }
}

/**
 * Notion リストアイテムブロック
 */
export interface NotionListItemBlock extends NotionBlockBase {
  type: 'bulleted_list_item' | 'numbered_list_item'
  bulleted_list_item?: {
    rich_text: NotionRichText[]
    color: string
  }
  numbered_list_item?: {
    rich_text: NotionRichText[]
    color: string
  }
}

/**
 * Notion コードブロック
 */
export interface NotionCodeBlock extends NotionBlockBase {
  type: 'code'
  code: {
    rich_text: NotionRichText[]
    language: string
  }
}

/**
 * Notion 引用ブロック
 */
export interface NotionQuoteBlock extends NotionBlockBase {
  type: 'quote'
  quote: {
    rich_text: NotionRichText[]
    color: string
  }
}

/**
 * Notion 区切り線ブロック
 */
export interface NotionDividerBlock extends NotionBlockBase {
  type: 'divider'
  divider: Record<string, never>
}

/**
 * Notion 画像ブロック
 */
export interface NotionImageBlock extends NotionBlockBase {
  type: 'image'
  image: {
    type: 'file' | 'external'
    file?: {
      url: string
      expiry_time: string
    }
    external?: {
      url: string
    }
  }
}

/**
 * Notion ブロックの統合型（children プロパティ付き）
 */
export type NotionBlock = (
  | NotionHeadingBlock
  | NotionParagraphBlock
  | NotionListItemBlock
  | NotionCodeBlock
  | NotionQuoteBlock
  | NotionDividerBlock
  | NotionImageBlock
  | NotionBlockBase // その他のブロックタイプ
) & {
  children?: NotionBlock[] // 再帰的な子ブロック
}

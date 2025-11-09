/**
 * Notion Block Renderer
 * NotionブロックをReactコンポーネントとして直接レンダリング
 */

import type { ReactNode } from 'react'
import Image from 'next/image'
import {
  NotionBlock,
  NotionRichText,
  NotionParagraphBlock,
  NotionHeadingBlock,
  NotionListItemBlock,
  NotionQuoteBlock,
  NotionCodeBlock,
  NotionImageBlock,
} from '@/lib/notion/types'
import CodeBlock from './CodeBlock'

/**
 * Notionの実際の色に合わせたテキスト色のマッピング（Light Mode）
 */
const TEXT_COLOR_CLASS_MAP: Record<string, string> = {
  gray: 'text-[#787774]',
  brown: 'text-[#976D57]',
  orange: 'text-[#CC782F]',
  yellow: 'text-[#C29343]',
  green: 'text-[#548164]',
  blue: 'text-[#487CA5]',
  purple: 'text-[#8A67AB]',
  pink: 'text-[#B35488]',
  red: 'text-[#C4554D]',
  default: '',
}

/**
 * Notionの実際の色に合わせた背景色のマッピング（Light Mode）
 */
const BACKGROUND_COLOR_CLASS_MAP: Record<string, string> = {
  gray_background: 'bg-[#F1F1EF]',
  brown_background: 'bg-[#F3EEEE]',
  orange_background: 'bg-[#F8ECDF]',
  yellow_background: 'bg-[#FAF3DD]',
  green_background: 'bg-[#EEF3ED]',
  blue_background: 'bg-[#E9F3F7]',
  purple_background: 'bg-[#F6F3F8]',
  pink_background: 'bg-[#F9F2F5]',
  red_background: 'bg-[#FAECEC]',
}

/**
 * Rich Textのアノテーションをレンダリング
 */
function renderAnnotations(
  text: ReactNode,
  annotations: NotionRichText['annotations']
): ReactNode {
  const classNames: string[] = []

  if (annotations.bold) classNames.push('font-semibold')
  if (annotations.italic) classNames.push('italic')
  if (annotations.underline) classNames.push('underline')
  if (annotations.strikethrough) classNames.push('line-through')
  if (annotations.code)
    classNames.push('font-mono text-sm px-1.5 py-0.5 bg-gray-100 text-red-600 rounded')

  if (annotations.color && annotations.color !== 'default') {
    const colorClass =
      TEXT_COLOR_CLASS_MAP[annotations.color] ??
      BACKGROUND_COLOR_CLASS_MAP[annotations.color]
    if (colorClass) {
      classNames.push(colorClass)
      if (annotations.color.endsWith('_background')) {
        classNames.push('px-1 rounded')
      }
    }
  }

  if (classNames.length === 0) {
    return text
  }

  return <span className={classNames.join(' ')}>{text}</span>
}

/**
 * Rich Textをレンダリング
 */
function renderRichText(items: NotionRichText[]): ReactNode {
  if (!items?.length) return null

  return items.map((item, index) => {
    const content = item.plain_text
    const withAnnotations = renderAnnotations(content, item.annotations)

    if (item.href) {
      return (
        <a
          key={`${item.plain_text}-${index}`}
          href={item.href}
          className="text-blue-600 hover:text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {withAnnotations}
        </a>
      )
    }

    return (
      <span key={`${item.plain_text}-${index}`} className="whitespace-pre-wrap">
        {withAnnotations}
      </span>
    )
  })
}

/**
 * 子ブロックをレンダリング
 */
function renderChildren(block: NotionBlock): ReactNode {
  if (!block.children?.length) return null
  return <div className="mt-1">{renderNotionBlocks(block.children)}</div>
}

/**
 * 段落ブロックをレンダリング
 */
function renderParagraph(block: NotionBlock): ReactNode {
  if (block.type !== 'paragraph') return null

  const paragraphBlock = block as NotionParagraphBlock
  const richText = paragraphBlock.paragraph.rich_text

  if (!richText?.length) {
    return <p key={block.id} className="mb-1 leading-[1.75]" />
  }

  return (
    <p key={block.id} className="mb-1 text-[#373530] leading-[1.75] text-base">
      {renderRichText(richText)}
    </p>
  )
}

/**
 * 見出しブロックをレンダリング
 */
function renderHeading(block: NotionBlock): ReactNode {
  const headingBlock = block as NotionHeadingBlock

  switch (block.type) {
    case 'heading_1':
      return (
        <h1 key={block.id} className="text-4xl font-bold text-gray-900 mt-12 mb-2 leading-tight">
          {renderRichText(headingBlock.heading_1?.rich_text || [])}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 key={block.id} className="text-3xl font-bold text-gray-900 mt-10 mb-2 leading-snug">
          {renderRichText(headingBlock.heading_2?.rich_text || [])}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 key={block.id} className="text-2xl font-semibold text-gray-900 mt-8 mb-2 leading-normal">
          {renderRichText(headingBlock.heading_3?.rich_text || [])}
        </h3>
      )
    default:
      return null
  }
}

/**
 * リストアイテムをレンダリング
 */
function renderListItem(block: NotionBlock): ReactNode {
  const { id, type } = block

  if (type !== 'bulleted_list_item' && type !== 'numbered_list_item') {
    return null
  }

  const listBlock = block as NotionListItemBlock
  const payload =
    type === 'bulleted_list_item'
      ? listBlock.bulleted_list_item
      : listBlock.numbered_list_item

  return (
    <li key={id} className="mb-1 text-[#373530]">
      <div className="leading-[1.75]">{renderRichText(payload?.rich_text || [])}</div>
      {block.children?.length ? renderChildren(block) : null}
    </li>
  )
}

/**
 * 引用ブロックをレンダリング
 */
function renderQuote(block: NotionBlock): ReactNode {
  if (block.type !== 'quote') return null

  const quoteBlock = block as NotionQuoteBlock

  return (
    <blockquote
      key={block.id}
      className="border-l-4 border-gray-900 pl-6 py-1 my-4 text-gray-700 text-base italic"
    >
      {renderRichText(quoteBlock.quote?.rich_text || [])}
    </blockquote>
  )
}

/**
 * コードブロックをレンダリング
 */
function renderCode(block: NotionBlock): ReactNode {
  if (block.type !== 'code') return null

  const codeBlock = block as NotionCodeBlock
  const code = (codeBlock.code?.rich_text || []).map((text) => text.plain_text).join('')
  const language = codeBlock.code?.language || 'plaintext'

  return (
    <div key={block.id} className="my-6">
      <CodeBlock code={code} language={language} variant="desktop" />
    </div>
  )
}

/**
 * 区切り線をレンダリング
 */
function renderDivider(block: NotionBlock): ReactNode {
  if (block.type !== 'divider') return null
  return <hr key={block.id} className="my-10 border-t border-gray-200" />
}

/**
 * 画像ブロックをレンダリング
 */
function renderImage(block: NotionBlock): ReactNode {
  if (block.type !== 'image') return null

  const imageBlock = block as NotionImageBlock
  let url = ''
  if (imageBlock.image.type === 'file' && imageBlock.image.file) {
    url = imageBlock.image.file.url
  } else if (imageBlock.image.type === 'external' && imageBlock.image.external) {
    url = imageBlock.image.external.url
  }

  if (!url) return null

  return (
    <div key={block.id} className="relative w-full my-6">
      <Image
        src={url}
        alt="image"
        width={1200}
        height={675}
        className="w-full h-auto rounded-sm shadow-sm"
        style={{ objectFit: 'cover' }}
        unoptimized
      />
    </div>
  )
}

/**
 * 単一ブロックをレンダリング
 */
function renderSingleBlock(block: NotionBlock): ReactNode {
  return (
    renderHeading(block) ??
    renderParagraph(block) ??
    renderQuote(block) ??
    renderCode(block) ??
    renderImage(block) ??
    renderDivider(block)
  )
}

/**
 * Notionブロック配列をレンダリング
 */
export function renderNotionBlocks(blocks: NotionBlock[]): ReactNode[] {
  const elements: ReactNode[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    // リストアイテムの場合、連続するリストをグループ化
    if (
      block.type === 'bulleted_list_item' ||
      block.type === 'numbered_list_item'
    ) {
      const ordered = block.type === 'numbered_list_item'
      const grouped: NotionBlock[] = []

      // 同じタイプのリストアイテムを集める
      while (
        index < blocks.length &&
        blocks[index].type ===
          (ordered ? 'numbered_list_item' : 'bulleted_list_item')
      ) {
        grouped.push(blocks[index])
        index += 1
      }

      index -= 1

      const ListTag = ordered ? 'ol' : 'ul'
      elements.push(
        <ListTag
          key={`${grouped[0]?.id}-list`}
          className={
            ordered
              ? 'list-decimal ml-6 mb-1 marker:text-[#37353080]'
              : 'list-disc ml-6 mb-1 marker:text-[#37353080]'
          }
        >
          {grouped.map((item) => renderListItem(item))}
        </ListTag>
      )
      continue
    }

    // その他のブロック
    const rendered = renderSingleBlock(block)
    if (rendered) {
      elements.push(rendered)
    }
  }

  return elements
}

/**
 * NotionBlockRenderer コンポーネント
 */
interface NotionBlockRendererProps {
  blocks: NotionBlock[]
  className?: string
}

export default function NotionBlockRenderer({
  blocks,
  className = '',
}: NotionBlockRendererProps) {
  return (
    <div className={`notion-content max-w-full ${className}`}>
      {renderNotionBlocks(blocks)}
    </div>
  )
}

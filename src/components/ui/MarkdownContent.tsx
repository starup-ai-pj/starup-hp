/**
 * MarkdownContent Component
 * Markdownコンテンツを安全にHTMLに変換して表示するコンポーネント
 */

import Image from 'next/image'
import parse, { Element, domToReact, HTMLReactParserOptions } from 'html-react-parser'
import CodeBlock from './CodeBlock'

interface MarkdownContentProps {
  content: string
  className?: string
  variant?: 'mobile' | 'desktop'
}

/**
 * MarkdownをHTMLに変換
 * @param markdown - Markdown文字列
 * @param variant - モバイルまたはデスクトップ用のスタイル
 * @returns HTML文字列
 */
function convertMarkdownToHtml(markdown: string, variant: 'mobile' | 'desktop' = 'desktop'): string {
  const isMobile = variant === 'mobile'

  // Notionライクな見出しのスタイル
  const h1Class = isMobile
    ? 'text-3xl font-bold text-gray-900 mt-8 mb-2 leading-tight'
    : 'text-4xl font-bold text-gray-900 mt-12 mb-2 leading-tight'
  const h2Class = isMobile
    ? 'text-2xl font-bold text-gray-900 mt-8 mb-2 leading-snug'
    : 'text-3xl font-bold text-gray-900 mt-10 mb-2 leading-snug'
  const h3Class = isMobile
    ? 'text-xl font-semibold text-gray-900 mt-6 mb-2 leading-normal'
    : 'text-2xl font-semibold text-gray-900 mt-8 mb-2 leading-normal'
  const pClass = isMobile
    ? 'mb-1 text-gray-700 leading-[1.75] text-base'
    : 'mb-1 text-gray-700 leading-[1.75] text-base'
  const hrClass = isMobile
    ? 'my-8 border-t border-gray-200'
    : 'my-10 border-t border-gray-200'
  const blockquoteClass = isMobile
    ? 'border-l-4 border-gray-900 pl-5 py-1 my-4 text-gray-700 text-base italic'
    : 'border-l-4 border-gray-900 pl-6 py-1 my-4 text-gray-700 text-base italic'
  const codeBlockClass = isMobile
    ? 'bg-gray-100 rounded p-3 my-4 overflow-x-auto text-sm'
    : 'bg-gray-100 rounded-lg p-4 my-6 overflow-x-auto'
  const codeClass = 'text-gray-800 font-mono text-sm'

  // ステップ1: コードブロックを特別なマーカーに置き換え
  let result = markdown.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, language, code) => {
      const lang = language || 'plaintext'
      const escapedCode = code.trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
      return `<div class="code-block-wrapper" data-language="${lang}" data-code="${escapedCode}"></div>`
    }
  )

  // ステップ2: その他のMarkdown変換
  result = result
    // 引用ブロック
    .replace(/^> (.+)$/gm, `<blockquote class="${blockquoteClass}">$1</blockquote>`)
    // 見出し
    .replace(/^# (.+)$/gm, `<h1 class="${h1Class}">$1</h1>`)
    .replace(/^## (.+)$/gm, `<h2 class="${h2Class}">$1</h2>`)
    .replace(/^### (.+)$/gm, `<h3 class="${h3Class}">$1</h3>`)
    // 水平線
    .replace(/^---$/gm, `<hr class="${hrClass}" />`)
    // 画像 (Notionライクなスタイル)
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" class="w-full h-auto my-6 rounded-sm shadow-sm" loading="lazy" />'
    )
    // 太字
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // インラインコード (Notionライクなスタイル)
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 text-red-600 rounded text-sm font-mono">$1</code>')
    // リンク (Notionライクなスタイル)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(
      /<(https?:\/\/[^>]+)>/g,
      '<a href="$1" class="text-blue-600 hover:text-blue-700 underline decoration-blue-300 underline-offset-2 break-all transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // リスト (Notionライクなスタイル)
    .replace(/^- (.+)$/gm, '<li class="ml-6 mb-1 text-gray-700 leading-[1.75] list-disc marker:text-gray-400">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 mb-1 text-gray-700 leading-[1.75] list-decimal marker:text-gray-400">$2</li>')

  // ステップ3: 段落処理（ブロック要素ではない行のみ）
  result = result
    .split('\n')
    .map(line => {
      // 空行をスキップ
      if (line.trim() === '') return ''
      // すでにHTMLタグで始まっている行はそのまま（見出し、リスト、引用、コードブロックなど）
      if (line.match(/^<(h[123]|blockquote|hr|img|pre|li|ul|ol|div)/)) return line
      // それ以外は段落として扱う
      return `<p class="${pClass}">${line}</p>`
    })
    .join('\n')

  return result
}

/**
 * MarkdownContentコンポーネント
 * Markdownを安全にHTMLに変換して表示
 */
export default function MarkdownContent({
  content,
  className = '',
  variant = 'desktop'
}: MarkdownContentProps) {
  const html = convertMarkdownToHtml(content, variant)

  // HTMLパーサーのオプション: imgタグとコードブロックを置き換え
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // imgタグをNext.js Imageに置き換え
        if (domNode.name === 'img') {
          const { src, alt } = domNode.attribs

          if (!src) return null

          return (
            <div className="relative w-full my-6">
              <Image
                src={src}
                alt={alt || 'image'}
                width={1200}
                height={675}
                className="w-full h-auto rounded-sm shadow-sm"
                style={{ objectFit: 'cover' }}
                unoptimized // NotionのURLは外部URLなので最適化をスキップ
              />
            </div>
          )
        }

        // コードブロックをCodeBlockコンポーネントに置き換え
        if (domNode.name === 'div' && domNode.attribs.class === 'code-block-wrapper') {
          const language = domNode.attribs['data-language'] || 'plaintext'
          const escapedCode = domNode.attribs['data-code'] || ''

          // エスケープされたコードを戻す
          const code = escapedCode
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")

          return <CodeBlock code={code} language={language} variant={variant} />
        }
      }
    }
  }

  return (
    <div className={`notion-content max-w-full ${className}`}>
      {parse(html, options)}
    </div>
  )
}

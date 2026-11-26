/**
 * Notion 画像のプロキシ
 *
 *   /api/notion-image/block/<ブロックID>/<版>
 *   /api/notion-image/page/<ページID>/<プロパティ名>/<版>
 *
 * Notion API から最新の署名付き URL を取り直し、画像をそのまま流して返す。
 * URL は src/lib/notion/image.ts で作る。<版> は更新日時なので、同じ URL の中身は変わらない。
 * そのため長くキャッシュさせ、next/image の変換結果も使い回せるようにしている。
 */

import { retrieveBlock, retrievePage } from '@/lib/notion/client'
import { NOTION_IMAGE_PAGE_PROPERTIES } from '@/lib/notion/image'

const UUID_RE = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

/** 中身が変わらない URL なので 1 年キャッシュさせる */
const CACHE_CONTROL = 'public, max-age=31536000, immutable'

type FileObject = {
  type?: string
  file?: { url?: string }
  external?: { url?: string }
}

function fileUrl(file: FileObject | undefined): string | null {
  if (!file) return null
  if (file.type === 'file') return file.file?.url ?? null
  if (file.type === 'external') return file.external?.url ?? null
  return null
}

/** パスから、いま有効な画像の URL を引く。対象外・見つからなければ null */
async function resolveImageUrl(path: string[]): Promise<string | null> {
  const [kind, id, ...rest] = path
  if (!id || !UUID_RE.test(id)) return null

  if (kind === 'block' && rest.length === 1) {
    const block = await retrieveBlock(id)
    if (!('type' in block) || block.type !== 'image') return null
    return fileUrl(block.image as FileObject)
  }

  if (kind === 'page' && rest.length === 2) {
    const property = rest[0]
    if (!(NOTION_IMAGE_PAGE_PROPERTIES as readonly string[]).includes(property)) return null
    const page = await retrievePage(id)
    if (!('properties' in page)) return null
    const prop = page.properties[property]
    if (prop?.type !== 'files') return null
    return fileUrl(prop.files[0] as FileObject | undefined)
  }

  return null
}

function notFound() {
  return new Response('Not Found', { status: 404 })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params

  let url: string | null
  try {
    url = await resolveImageUrl(path)
  } catch (error) {
    // 存在しない ID・連携していないページは Notion が 404 / 400 を返す
    const status = (error as { status?: number }).status
    if (status === 404 || status === 400) return notFound()
    console.error('[notion-image] failed to resolve', path.join('/'), error)
    return new Response('Bad Gateway', { status: 502 })
  }
  if (!url) return notFound()

  const upstream = await fetch(url, { cache: 'no-store' })
  const contentType = upstream.headers.get('content-type') ?? ''
  if (!upstream.ok || !upstream.body) {
    console.error('[notion-image] upstream error', upstream.status, path.join('/'))
    return new Response('Bad Gateway', { status: 502 })
  }
  // 画像以外（HTML など）を自分のドメインから返さない
  if (!contentType.startsWith('image/') || contentType.includes('svg')) {
    return new Response('Unsupported Media Type', { status: 415 })
  }

  const headers = new Headers({
    'Content-Type': contentType,
    'Cache-Control': CACHE_CONTROL,
    'X-Content-Type-Options': 'nosniff',
  })
  const length = upstream.headers.get('content-length')
  if (length) headers.set('Content-Length', length)

  // 本体はバッファせずにそのまま流す
  return new Response(upstream.body, { status: 200, headers })
}

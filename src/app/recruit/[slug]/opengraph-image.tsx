import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'
import { getRecruitPostById } from '@/lib/recruit'

export const runtime = 'nodejs'
export const alt = 'STARUP 採用情報'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Regular.ttf')

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getRecruitPostById(slug)
  const title = post?.title || '採用情報'
  const subtitle = post?.jobType?.[0] || post?.category?.[0] || ''
  const location = post?.location || ''
  const employment = (post?.employmentType || []).join(' / ')

  const fontData = readFileSync(fontPath)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 60%, #16213e 100%)',
          color: '#ffffff',
          fontFamily: 'NotoSansJP',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 40,
              background: '#5b8def',
              borderRadius: 2,
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 4, color: '#a3b3cf' }}>
            STARUP RECRUIT
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {subtitle && (
            <div style={{ fontSize: 28, color: '#7ea8ff', letterSpacing: 2 }}>{subtitle}</div>
          )}
          <div
            style={{
              fontSize: title.length > 18 ? 60 : 78,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: 1,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#c5d2eb',
            fontSize: 26,
          }}
        >
          <div style={{ display: 'flex', gap: 32 }}>
            {location && <span>📍 {location}</span>}
            {employment && <span>{employment}</span>}
          </div>
          <div style={{ fontSize: 22, color: '#7e8aa5' }}>starup.co.jp</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'NotoSansJP',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}

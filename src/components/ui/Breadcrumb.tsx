'use client'

import TransitionLink from '@/components/ui/TransitionLink'
import { usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  isDarkBackground?: boolean
}

const KNOWN_SEGMENTS = ['news', 'about', 'service', 'member', 'recruit', 'contact'] as const

export default function Breadcrumb({ isDarkBackground = false }: BreadcrumbProps) {
  // locale プレフィックスを除いたパスを返す ("/en/about" でも "/about")
  const pathname = usePathname()
  const t = useTranslations('breadcrumb')

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const items: BreadcrumbItem[] = []

    // パスからブレッドクラムを生成（Homeは含めない）
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`

      let label: string
      if ((KNOWN_SEGMENTS as readonly string[]).includes(segment)) {
        label = t(segment)
      } else if (pathSegments[index - 1] === 'news') {
        // ニュース詳細ページの場合、簡潔なラベルを表示
        label = t('newsDetail')
      } else {
        label = segment.charAt(0).toUpperCase() + segment.slice(1)
      }

      items.push({ label, href: currentPath })
    })

    return items
  }, [pathname, t])

  // ホームページの場合はパンくずを表示しない
  if (pathname === '/') {
    return null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          {/* 最初の要素の前にも / を表示 */}
          <span className={`transition-colors duration-300 ${
            isDarkBackground ? 'text-white/60' : 'text-black/60'
          }`}>
            /
          </span>
          {index === breadcrumbs.length - 1 ? (
            <span className={`transition-colors duration-300 ${
              isDarkBackground ? 'text-white' : 'text-black'
            }`}>
              {item.label}
            </span>
          ) : (
            <TransitionLink
              href={item.href}
              className={`hover:opacity-80 transition-all duration-300 ${
                isDarkBackground ? 'text-white/80' : 'text-black/80'
              }`}
            >
              {item.label}
            </TransitionLink>
          )}
        </div>
      ))}
    </nav>
  )
}

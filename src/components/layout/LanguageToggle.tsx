'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useTransition } from 'react'
import type { Locale } from '@/i18n/routing'

interface LanguageToggleProps {
  isDarkBackground?: boolean
}

/** ヘッダーの言語切替。現在のパスを維持したまま locale を切り替える */
export default function LanguageToggle({ isDarkBackground = false }: LanguageToggleProps) {
  const locale = useLocale()
  const router = useRouter()
  // locale プレフィックスを除いた現在のパス（動的セグメントは展開済み）
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchTo = (next: Locale) => {
    if (next === locale) return
    // pathname はそのまま渡し、locale だけ差し替える（NEXT_LOCALE クッキーは middleware が自動保存）
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  const baseColor = isDarkBackground ? 'text-white' : 'text-black'
  const activeClass = `font-bold ${baseColor}`
  const inactiveClass = `${baseColor} opacity-50 hover:opacity-80`

  return (
    <div className={`flex items-center gap-1.5 text-sm transition-opacity duration-300 ${isPending ? 'opacity-60' : ''}`}>
      <button
        type="button"
        onClick={() => switchTo('ja')}
        className={`transition-all duration-300 ${locale === 'ja' ? activeClass : inactiveClass}`}
        aria-current={locale === 'ja'}
      >
        JA
      </button>
      <span className={`${baseColor} opacity-40`}>/</span>
      <button
        type="button"
        onClick={() => switchTo('en')}
        className={`transition-all duration-300 ${locale === 'en' ? activeClass : inactiveClass}`}
        aria-current={locale === 'en'}
      >
        EN
      </button>
    </div>
  )
}

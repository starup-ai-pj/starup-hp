'use client'

import { Link, useRouter, usePathname } from '@/i18n/navigation'
import { ReactNode } from 'react'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
  [key: string]: any
}

export default function TransitionLink({ href, children, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()
  // locale プレフィックスを除いたパス ("/about"。/en/about でも "/about")
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent) => {
    // 外部リンクやアンカーリンクの場合は通常通り
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
      if (onClick) onClick(e)
      return
    }

    // 同じページの場合は何もしない。href も pathname も locale を含まない相対パスで比較する
    const hrefPath = href.split('#')[0].split('?')[0]
    if (hrefPath === pathname) {
      e.preventDefault()
      if (onClick) onClick(e)
      return
    }

    e.preventDefault()

    // onClickがある場合は実行
    if (onClick) onClick(e)

    // トランジションイベントを発火
    window.dispatchEvent(new CustomEvent('startPageTransition', { detail: { href } }))

    // 300ms後にナビゲーション（グレーが画面を覆った時）
    // wrapper の router が現在の locale を自動で付与する
    setTimeout(() => {
      router.push(href)
    }, 300)
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

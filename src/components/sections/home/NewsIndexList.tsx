'use client'

import { useState } from 'react'
import Image from 'next/image'
import { NewsListItem } from '@/types/news'
import TransitionLink from '@/components/ui/TransitionLink'

interface NewsIndexListProps {
  items: NewsListItem[]
}

export default function NewsIndexList({ items }: NewsIndexListProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (items.length === 0) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* ━━━ 左: 大見出しリスト ━━━ */}
      <div
        className="lg:col-span-7 order-2 lg:order-1"
        onMouseLeave={() => setActiveIdx(0)}
      >
        {items.map((item, i) => {
          const isActive = activeIdx === i
          return (
            <TransitionLink
              key={item.id}
              href={`/news/${item.id}`}
              onMouseEnter={() => setActiveIdx(i)}
              className="group block border-b border-gray-200 py-6 md:py-8 first:border-t first:border-gray-200"
            >
              <div className="flex items-start gap-4 md:gap-6">
                {/* Index number */}
                <span
                  className={`text-xs md:text-sm tracking-[0.2em] shrink-0 pt-2 transition-colors duration-300 ${
                    isActive ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Main */}
                <div className="flex-1 min-w-0">
                  {/* meta */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-500 font-light tracking-wider">
                      {item.date.replace(/\//g, '.')}
                    </span>
                    {item.tags[0] && (
                      <span
                        className={`text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                          isActive ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {item.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* title */}
                  <h3
                    className={`text-base md:text-lg lg:text-xl font-medium leading-[1.4] transition-all duration-300 ${
                      isActive
                        ? 'text-gray-900 translate-x-2 md:translate-x-3'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* arrow */}
                <svg
                  className={`w-5 h-5 shrink-0 mt-2 transition-all duration-300 ${
                    isActive ? 'text-gray-900 translate-x-1' : 'text-gray-300'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </TransitionLink>
          )
        })}
      </div>

      {/* ━━━ 右: スティッキーで切り替わるイメージプレビュー ━━━ */}
      <div className="lg:col-span-5 order-1 lg:order-2">
        <div className="lg:sticky lg:top-24">
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: activeIdx === i ? 1 : 0 }}
                aria-hidden={activeIdx !== i}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
            {/* index badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1 tracking-[0.2em]">
                {String(activeIdx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

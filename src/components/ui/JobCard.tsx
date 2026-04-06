'use client'

import { RecruitListItem } from '@/types/recruit'
import TransitionLink from '@/components/ui/TransitionLink'
import Image from 'next/image'

interface JobCardProps {
  item: RecruitListItem
}

export default function JobCard({ item }: JobCardProps) {
  const badges = [
    item.employmentType,
    item.location,
    item.salary,
  ].filter(Boolean)

  return (
    <TransitionLink
      href={`/recruit/${item.id}`}
      className="group block border-t border-gray-200 py-8"
    >
      {/* Mobile: 縦並び */}
      <div className="md:hidden space-y-4">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            unoptimized
          />
        </div>
        <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {item.title}
        </h3>
        {item.summary && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {item.summary}
          </p>
        )}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map(b => (
              <span key={b} className="text-xs bg-gray-100 text-gray-700 px-3 py-1">
                {b}
              </span>
            ))}
          </div>
        )}
        <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
          詳細を見る
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>

      {/* Desktop: 横並び（左サムネ / 右コンテンツ） */}
      <div className="hidden md:grid grid-cols-12 gap-8 items-start">
        {/* サムネイル */}
        <div className="col-span-4 relative aspect-[3/2] overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="33vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            unoptimized
          />
        </div>

        {/* コンテンツ */}
        <div className="col-span-8 flex flex-col justify-between min-h-full">
          <div>
            <h3 className="text-2xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
              {item.title}
            </h3>
            {item.summary && (
              <p className="text-base text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {item.summary}
              </p>
            )}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {badges.map(b => (
                  <span key={b} className="text-xs bg-gray-100 text-gray-700 px-3 py-1">
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 self-start group-hover:gap-3 transition-all duration-300">
            詳細を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </TransitionLink>
  )
}

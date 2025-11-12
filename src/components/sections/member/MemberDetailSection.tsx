'use client'

import { MemberPost } from '@/types/member'
import OrbitPhotoGallery from '@/components/animation/orbit-photo-gallery'
import NotionBlockRenderer from '@/components/ui/NotionBlockRenderer'
import { getMemberGalleryData } from '@/lib/image-gallery-map'
import { useEffect, useState } from 'react'

interface MemberDetailSectionProps {
  member: MemberPost
}

export default function MemberDetailSection({ member }: MemberDetailSectionProps) {
  // Get member-specific gallery configuration
  const galleryData = getMemberGalleryData(member.slug)
  const [spacerHeight, setSpacerHeight] = useState(100) // Start at 100vh
  const [showCaption, setShowCaption] = useState(false)

  useEffect(() => {
    // First show caption text
    const captionTimer = setTimeout(() => {
      setShowCaption(true)
    }, 100)

    // Then animate content up after caption appears
    const contentTimer = setTimeout(() => {
      setSpacerHeight(70) // Animate to 70vh
    }, 2000) // Start content animation 2 seconds after caption

    return () => {
      clearTimeout(captionTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <div className="">
      {/* 最上部: Photo Gallery - Fixed Background */}
      <OrbitPhotoGallery
        images={galleryData?.images}
        bgColor={galleryData?.bgColor}
      />

      {/* Caption text - positioned over the fixed gallery */}
      <div
        className={`absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none transition-opacity duration-1000 ${
          showCaption ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-3xl md:text-5xl lg:text-7xl text-white text-shadow-lg" style={{ fontFamily: 'Lavishly Yours, cursive' }}>
          Photos of things I love
        </p>
      </div>

      {/* Spacer to create scroll space for initial view */}
      <div
        style={{ height: `${spacerHeight}vh` }}
        className="transition-all duration-[3000ms] ease-out"
      ></div>

      {/* メインコンテンツ: 3カラム構造 */}
      <section className="relative z-10 py-12 md:py-16 bg-white">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            {/* 左カラム: Position */}
            <div className="col-span-2">
              <span className="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded inline-block">
                {member.position}
              </span>
            </div>

            {/* 中央カラム: Name + Profile */}
            <div className="col-span-8 border-r border-gray-700 pr-8">
              {/* Name */}
              <div className="mb-12 flex items-baseline gap-4">
                <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
                  {member.name}
                </h1>
                {member.englishName && (
                  <p className="text-xl text-gray-500">{member.englishName}</p>
                )}
              </div>

              {/* Profile */}
                <div className="max-w-none prose prose-lg prose-gray">
                  <NotionBlockRenderer blocks={member.blocks} />
                </div>
              </div>

            {/* 右カラム: SNS + Member Info + Share */}
            <div className="col-span-2">
              <div className="sticky top-8 space-y-8">
                {/* SNS Links */}
                {(member.socialLinks?.twitter || member.socialLinks?.facebook || member.socialLinks?.linkedin) && (
                  <div className="flex flex-row gap-3">
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.facebook && (
                      <a
                        href={member.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* Member Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Member Info</h3>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium block mb-1">Position:</span>
                      <p>{member.position}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium block mb-1">Biography:</span>
                      <p className="leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

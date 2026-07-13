'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TypingText from "@/components/ui/TypingText"
import TransitionLink from "@/components/ui/TransitionLink"
import type { Member } from "@/data/members"
import type { Advisor } from "@/data/advisors"

gsap.registerPlugin(ScrollTrigger)

interface MemberListItem {
  member: Member
  preview: string | null
  hasInterview: boolean
}

interface MemberListSectionProps {
  members: MemberListItem[]
  advisors?: Advisor[]
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MemberListSection({ members, advisors = [] }: MemberListSectionProps) {
  const t = useTranslations('sections.member.list')
  const [ordered, setOrdered] = useState<MemberListItem[]>(members)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOrdered(shuffle(members))
  }, [members])

  useEffect(() => {
    if (!listRef.current) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.member-card')

      cards.forEach((card) => {
        const images = card.querySelectorAll<HTMLElement>('.member-image')
        const contents = card.querySelectorAll<HTMLElement>('.member-content')

        gsap.set(images, { opacity: 0, x: -20 })
        gsap.set(contents, { opacity: 0, y: 20 })

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
          .to(images, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" })
          .to(contents, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      })
    }, listRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [ordered])

  return (
    <section className="bg-white pt-20 md:pt-40 pb-16 md:pb-24">
      <div className="max-w-[1500px] mx-auto px-4">

        {/* ──── ヘッダー ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">{t('eyebrow')}</span>
          </div>
          <div className="lg:col-span-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-4">
              {t('heading')}
            </h1>
            <TypingText
              text={t('tagline')}
              className="text-xl md:text-2xl lg:text-3xl text-gray-500"
            />
          </div>
          <div className="lg:col-span-2"></div>
        </div>

        {/* ──── 集合写真バナー ──── */}
        <figure className="mb-16 md:mb-24">
          <div className="relative w-full aspect-[4/3] md:aspect-[2/1] overflow-hidden bg-gray-100">
            <Image
              src="/images/member/team-group.jpg"
              alt={t('groupPhotoAlt')}
              fill
              priority
              sizes="(min-width: 1024px) 1500px, 100vw"
              className="object-cover object-[center_60%]"
              unoptimized
            />
          </div>
          <figcaption className="mt-3 md:mt-4 flex items-center justify-between gap-4 text-[10px] text-gray-400 uppercase tracking-[0.3em]">
            <span>{t('allMembers')}</span>
            <span className="h-px flex-1 bg-gray-200" />
            <span>STARUP / 2026</span>
          </figcaption>
        </figure>

        {/* ──── メンバー一覧 ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左2col */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <span className="text-3xl font-medium text-gray-900">{ordered.length}</span>
              <p className="text-xs text-gray-500 mt-1">{t('countLabel')}</p>
            </div>
          </div>

          {/* 右10col: 2列グリッド(5+5) */}
          <div className="lg:col-span-10">
            {/* Mobile: 1列 / Desktop: 2列 */}
            <div ref={listRef} className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
              {ordered.map(({ member, preview, hasInterview }) => (
                <TransitionLink
                  key={member.id}
                  href={`/member/${member.id}`}
                  className="member-card group block border-t border-gray-200 py-8"
                >
                  {/* Mobile: 縦並び */}
                  <div className="lg:hidden space-y-4">
                    <div className="member-image relative w-full aspect-[4/3] overflow-hidden">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">{t('noImage')}</span>
                        </div>
                      )}
                    </div>
                    <div className="member-content space-y-2">
                      <p className="text-xs text-gray-500">{member.position}</p>
                      <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed ">{member.description}</p>
                      <div className="flex items-center gap-3">
                        {hasInterview && (
                          <span className="text-xs bg-gray-900 text-white px-2 py-0.5">{t('interview')}</span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs text-gray-900 border-b border-gray-900 pb-0.5 group-hover:gap-2 transition-all duration-300">
                          {t('readMore')}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: 画像+テキスト横並び */}
                  <div className="hidden lg:grid grid-cols-2 gap-5">
                    <div className="member-image relative aspect-[3/4] overflow-hidden">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">{t('noImage')}</span>
                        </div>
                      )}
                    </div>
                    <div className="member-content flex flex-col">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{member.position}</p>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                          {member.name}
                        </h3>
                        {member.englishName && (
                          <p className="text-xs text-gray-400 mb-2">{member.englishName}</p>
                        )}
                        <p className="text-xs text-gray-500 leading-relaxed ">
                          {member.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        {/* Hover preview */}
                        {preview && (
                          <div
                            aria-hidden="true"
                            className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100 mb-4"
                          >
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1.5">
                              {t('fromInterview')}
                            </span>
                            <p className="text-xs text-gray-600 italic leading-relaxed line-clamp-3 pl-3 border-l border-gray-400">
                              &ldquo;{preview}&rdquo;
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          {hasInterview && (
                            <span className="text-xs bg-gray-900 text-white px-2 py-0.5">{t('interview')}</span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs text-gray-900 border-b border-gray-900 pb-0.5 group-hover:gap-2 transition-all duration-300">
                            {t('readMore')}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>

        {/* ──── 顧問 ──── */}
        {advisors.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20 md:mt-32 border-t border-gray-200 pt-16 md:pt-20">
            <div className="lg:col-span-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{t('advisors.eyebrow')}</span>
              <p className="text-3xl font-medium text-gray-900 mt-2">{advisors.length}</p>
              <p className="text-xs text-gray-500 mt-1">{t('advisors.countLabel')}</p>
            </div>
            <div className="lg:col-span-10">
              <h2 className="text-3xl md:text-5xl font-medium text-gray-900 leading-[1.1] mb-10 md:mb-12">
                {t('advisors.heading')}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
                {advisors.map((advisor) => (
                  <div
                    key={advisor.id}
                    className="block border-t border-gray-200 py-8"
                  >
                    {/* Mobile: 縦並び */}
                    <div className="lg:hidden space-y-4">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        {advisor.image ? (
                          <Image
                            src={advisor.image}
                            alt={advisor.name}
                            fill
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">{t('noImage')}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">{advisor.position}</p>
                        <h3 className="text-xl font-medium text-gray-900">{advisor.name}</h3>
                        {advisor.englishName && (
                          <p className="text-xs text-gray-400">{advisor.englishName}</p>
                        )}
                        <p className="text-xs text-gray-500 leading-relaxed">{advisor.description}</p>
                      </div>
                    </div>

                    {/* Desktop: 画像+テキスト横並び */}
                    <div className="hidden lg:grid grid-cols-2 gap-5">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        {advisor.image ? (
                          <Image
                            src={advisor.image}
                            alt={advisor.name}
                            fill
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">{t('noImage')}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs text-gray-500 mb-1">{advisor.position}</p>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{advisor.name}</h3>
                        {advisor.englishName && (
                          <p className="text-xs text-gray-400 mb-2">{advisor.englishName}</p>
                        )}
                        <p className="text-xs text-gray-500 leading-relaxed">{advisor.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ──── Career CTA ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20 md:mt-32 border-t border-gray-200 pt-16 md:pt-20">
          <div className="lg:col-span-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">{t('career.eyebrow')}</span>
          </div>
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.1] mb-6">
              {t('career.heading')}
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl">
              {t('career.lead')}
            </p>
            <TransitionLink
              href="/recruit/jobs"
              className="group inline-flex items-center gap-3 text-lg md:text-xl text-gray-900 border-b border-gray-900 pb-2 hover:gap-5 transition-all duration-300"
            >
              {t('career.cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </TransitionLink>
          </div>
          <div className="lg:col-span-2"></div>
        </div>

      </div>
    </section>
  )
}

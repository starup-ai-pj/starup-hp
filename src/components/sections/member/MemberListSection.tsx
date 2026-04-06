'use client'

import { memberData } from "@/data/member/member"
import Image from "next/image"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TypingText from "@/components/ui/TypingText"
import TransitionLink from "@/components/ui/TransitionLink"

gsap.registerPlugin(ScrollTrigger)

export default function MemberListSection() {
  useEffect(() => {
    const cards = document.querySelectorAll('.member-card')

    cards.forEach((card) => {
      const image = card.querySelector('.member-image')
      const content = card.querySelector('.member-content')

      gsap.set(image, { opacity: 0, x: -20 })
      gsap.set(content, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to(image, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" })
        .to(content, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="bg-white pt-20 md:pt-40 pb-16 md:pb-24">
      <div className="max-w-[1500px] mx-auto px-4">

        {/* ──── ヘッダー ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Team</span>
          </div>
          <div className="lg:col-span-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-4">
              Our Team
            </h1>
            <TypingText
              text="Where brilliant minds converge to create the future."
              className="text-xl md:text-2xl lg:text-3xl text-gray-500"
            />
          </div>
          <div className="lg:col-span-2"></div>
        </div>

        {/* ──── メンバー一覧 ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左2col */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <span className="text-3xl font-medium text-gray-900">{memberData.length}</span>
              <p className="text-xs text-gray-500 mt-1">members</p>
            </div>
          </div>

          {/* 右10col: 2列グリッド(5+5) */}
          <div className="lg:col-span-10">
            {/* Mobile: 1列 / Desktop: 2列 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
              {memberData.map((member) => (
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
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="member-content space-y-2">
                      <p className="text-xs text-gray-500">{member.position}</p>
                      <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                      {member.comment && (
                        <p className="text-sm text-gray-700 italic">&ldquo;{member.comment}&rdquo;</p>
                      )}
                      <p className="text-xs text-gray-500 leading-relaxed ">{member.description}</p>
                      <div className="flex items-center gap-3">
                        {member.hasInterview && (
                          <span className="text-xs bg-gray-900 text-white px-2 py-0.5">Interview</span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs text-gray-900 border-b border-gray-900 pb-0.5 group-hover:gap-2 transition-all duration-300">
                          View profile
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
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="member-content flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{member.position}</p>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                          {member.name}
                        </h3>
                        {member.englishName && (
                          <p className="text-xs text-gray-400 mb-2">{member.englishName}</p>
                        )}
                        {member.comment && (
                          <p className="text-sm text-gray-700 italic mb-2">&ldquo;{member.comment}&rdquo;</p>
                        )}
                        <p className="text-xs text-gray-500 leading-relaxed ">
                          {member.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        {member.hasInterview && (
                          <span className="text-xs bg-gray-900 text-white px-2 py-0.5">Interview</span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs text-gray-900 border-b border-gray-900 pb-0.5 group-hover:gap-2 transition-all duration-300">
                          View profile
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>

        {/* ──── Career CTA ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20 md:mt-32 border-t border-gray-200 pt-16 md:pt-20">
          <div className="lg:col-span-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Career</span>
          </div>
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.1] mb-6">
              Join our team.
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl">
              一緒に働きませんか。私たちは常に新しい仲間を探しています。
            </p>
            <TransitionLink
              href="/recruit/jobs"
              className="group inline-flex items-center gap-3 text-lg md:text-xl text-gray-900 border-b border-gray-900 pb-2 hover:gap-5 transition-all duration-300"
            >
              募集中のポジションを見る
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

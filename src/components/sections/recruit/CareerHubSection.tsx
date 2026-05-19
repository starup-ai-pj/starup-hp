'use client'

import Image from 'next/image'
import TransitionLink from '@/components/ui/TransitionLink'
import { PhotoGalleryWall } from '@/components/animation/photo-wall/PhotoGalleryWall'
import TypingText from '@/components/ui/TypingText'
import JobCard from '@/components/ui/JobCard'
import { RecruitListItem } from '@/types/recruit'

interface CareerHubSectionProps {
  jobPreviews?: RecruitListItem[]
}

const VALUES = [
  {
    num: '01',
    title: 'Ownership',
    subtitle: '当事者意識を持つ',
    action: '顧客・プロダクト・事業・会社の成長を自分ごととして捉え、最後までやり切ること',
  },
  {
    num: '02',
    title: 'not cynical',
    subtitle: '斜に構えない',
    action: 'できない理由ではなく実現する方法を考え、素直に向き合うこと',
  },
  {
    num: '03',
    title: 'stay curious, stay grounded',
    subtitle: 'ワクワクと現場を大切に',
    action: '最先端と現場を行き来し、顧客が「使える」価値に変えること',
  },
  {
    num: '04',
    title: 'Be a multiplier',
    subtitle: '三人寄れば文殊の知恵',
    action: 'チームで知恵を出し合い、最善の答えを出すこと',
  },
]

export default function CareerHubSection({ jobPreviews = [] }: CareerHubSectionProps) {
  return (
    <div className="bg-white">

      {/* ━━━ Hero ━━━ */}
      <section className="pt-20 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Career</span>
            </div>
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-4">
                Careers
              </h1>
              <TypingText
                text="Join us to create the future together."
                className="text-xl md:text-2xl lg:text-3xl text-gray-500"
              />
            </div>
            <div className="lg:col-span-2"></div>
          </div>
        </div>
      </section>

      {/* ━━━ 採用メッセージ ━━━ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute top-0 right-0 w-[50%] h-full hidden lg:block">
          <Image
            src="/images/about/company.jpg"
            alt="Team"
            fill
            className="object-cover grayscale opacity-30"
            unoptimized
          />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Message</span>
            </div>
            <div className="lg:col-span-6">
              <h2 className="text-2xl md:text-4xl font-medium text-gray-900 leading-[1.3] mb-8">
                「それ、おもろくね？」を<br />形にする仲間を探しています。
              </h2>
              <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
                <p>
                  STAR UPは「それ、おもろくね？」と感じるプロダクトを世の中に生み出し続ける会社を目指しています。それは既存の市場をさらによくしたり、新しい市場を生み出す、壮大なチャレンジです。
                </p>
                <p>
                  その実現のためには、世の中に必要な仕組みやプロダクトを構想する力、それを実現するプロダクトを生み出す力も、どれも欠かすことはできません。
                </p>
                <p>
                  上記のValueに共感してくれる人には、様々な領域でエキサイティングな環境をご用意します。ぜひよりよい世界を共に実現しましょう！
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 overflow-hidden">
                  <Image
                    src="/images/member/ogata-yuto.png"
                    alt="緒方 勇斗"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">緒方 勇斗</p>
                  <p className="text-xs text-gray-500">代表取締役</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4"></div>
          </div>
        </div>
      </section>

      {/* ━━━ 求める人物像（マニフェスト） ━━━ */}
      <section className="py-20 md:py-32 border-t border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Ideal Candidate</span>
            </div>
            <div className="lg:col-span-10">
              <p className="text-sm text-gray-500 mb-10 md:mb-14">
                私たちが共に働く方に求めるのは、以下の4つです。
              </p>
              <div className="space-y-6 md:space-y-8">
                {VALUES.map((value) => (
                  <div key={value.num} className="flex items-start gap-6 md:gap-8">
                    <span className="text-xs text-gray-400 mt-2 shrink-0">{value.num}</span>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug">
                      {value.subtitle}
                      <span className="text-gray-300 ml-3 text-lg md:text-xl lg:text-2xl font-normal">
                        {value.title}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12 md:mt-16">
                <TransitionLink
                  href="/recruit/culture"
                  className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all duration-300"
                >
                  Cultureページで詳しく見る
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 募集職種プレビュー ━━━ */}
      {jobPreviews.length > 0 && (
        <section className="py-20 md:py-32 border-t border-gray-200">
          <div className="max-w-[1500px] mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Jobs</span>
                <h2 className="mt-2 text-3xl md:text-5xl font-medium text-gray-900 mb-4">
                  現在募集中のポジション
                </h2>
                <p className="text-base text-gray-500">
                  注目の求人を一部ご紹介します。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
              {jobPreviews.map((item) => (
                <JobCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex justify-end">
              <TransitionLink
                href="/recruit/jobs"
                className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all duration-300"
              >
                すべての求人を見る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </TransitionLink>
            </div>
          </div>
        </section>
      )}

      {/* ━━━ 導線カード: Culture / Member / Jobs ━━━ */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
            <div className="lg:col-span-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Explore</span>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-5xl font-medium text-gray-900">
                STAR UPをもっと知る
              </h2>
            </div>
            <div className="lg:col-span-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TransitionLink
              href="/recruit/culture"
              className="group block border border-gray-200 p-8 md:p-10 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Culture</p>
              <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                カルチャーを知る
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Mission・Vision・Valueと、私たちの働き方をご紹介します。
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                View more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>

            <TransitionLink
              href="/member"
              className="group block border border-gray-200 p-8 md:p-10 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Member</p>
              <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                メンバーを知る
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                一緒に働くチームメンバーとインタビュー記事をご覧ください。
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                View more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>

            <TransitionLink
              href="/recruit/jobs"
              className="group block border border-gray-200 p-8 md:p-10 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Jobs</p>
              <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                募集職種を見る
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                現在募集中のポジションをご確認ください。
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 group-hover:gap-3 transition-all duration-300">
                View more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </TransitionLink>
          </div>
        </div>
      </section>


      {/* ━━━ PhotoGalleryWall ━━━ */}
      <PhotoGalleryWall />
    </div>
  )
}

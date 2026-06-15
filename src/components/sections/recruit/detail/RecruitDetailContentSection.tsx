'use client'

import { useTranslations } from 'next-intl'
import { RecruitPost, RecruitListItem } from '@/lib/recruit'
import RecruitItem from '@/components/sections/recruit/detail/RecruitItem'
import TransitionLink from '@/components/ui/TransitionLink'
import NotionBlockRenderer from '@/components/notion/NotionBlockRenderer'
import Image from 'next/image'

interface RecruitDetailContentSectionProps {
  post: RecruitPost
  allRecruits: RecruitListItem[]
}

const SELECTION_STEP_NUMBERS = ['01', '02', '03', '04', '05'] as const

export default function RecruitDetailContentSection({ post, allRecruits }: RecruitDetailContentSectionProps) {
  const t = useTranslations('sections.recruit.detail')

  const selectionSteps = SELECTION_STEP_NUMBERS.map((num, i) => ({
    num,
    label: t(`selectionSteps.step${i + 1}`),
  }))

  const relatedRecruits = allRecruits
    .filter(recruit =>
      recruit.id !== post.id &&
      recruit.jobType.some(t => post.jobType.includes(t))
    )
    .slice(0, 4)

  const badges = [
    ...post.employmentType,
    post.location,
    post.salary,
  ].filter(Boolean)

  const requirementRows = [
    { id: 'employmentType', label: t('requirementLabels.employmentType'), value: post.employmentType.join(', ') },
    { id: 'salary', label: t('requirementLabels.salary'), value: post.salary },
    { id: 'location', label: t('requirementLabels.location'), value: post.location },
    { id: 'workingHours', label: t('requirementLabels.workingHours'), value: post.workingHours },
    { id: 'holidays', label: t('requirementLabels.holidays'), value: post.holidays },
    { id: 'benefits', label: t('requirementLabels.benefits'), value: post.benefits },
  ].filter(r => !!r.value)

  return (
    <div className="bg-white pt-16 md:pt-24">
      {/* ──── 1. ヘッダー ──── */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1500px] mx-auto px-4">
          {/* Mobile */}
          <div className="block lg:hidden space-y-4">
            {post.category.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.category.map(c => (
                  <span key={c} className="inline-block text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded">
                    {c}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
              {post.title}
            </h1>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map(b => (
                  <span key={b} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 ">
                    {b}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-600 text-base leading-relaxed">
              {post.summary}
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-8">
            <div className="col-span-2">
              <div className="flex flex-wrap gap-2">
                {post.category.map(c => (
                  <span key={c} className="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-8 border-r border-gray-700 pr-8">
              <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {badges.map(b => (
                    <span key={b} className="text-sm bg-gray-100 text-gray-700 px-4 py-1.5 ">
                      {b}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-600 text-lg leading-relaxed">
                {post.summary}
              </p>
            </div>
            <div className="col-span-2">
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' }).replace(/年|月/g, '').toUpperCase()}
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(post.date).getFullYear()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── ヒーロー画像（ワイド） ──── */}
      <section className="w-full px-4 max-w-[1500px] mx-auto">
        <div className="relative w-full h-48 md:h-96 lg:h-[700px]">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-cover"
            loading="lazy"
            quality={80}
            unoptimized
          />
        </div>
      </section>

      {/* ──── 2〜5. 本文（Notionブロック）＋サイドバー ──── */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1500px] mx-auto px-4">
          {/* Mobile */}
          <div className="block lg:hidden">
            <div className="max-w-none prose prose-gray
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            ">
              <NotionBlockRenderer blocks={post.blocks} />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-8">
            <div className="col-span-2"></div>
            <div className="col-span-8 border-r border-gray-700 pr-8">
              <div className="max-w-none prose prose-lg prose-gray
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              ">
                <NotionBlockRenderer blocks={post.blocks} />
              </div>
            </div>

            {/* サイドバー */}
            <div className="col-span-2">
              <div className="sticky top-24 space-y-8">
                {/* 選考フロー */}
                <div className="bg-gray-50 p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">{t('selectionFlowTitle')}</h3>
                  <div className="flex flex-col gap-3">
                    {selectionSteps.map(step => (
                      <div key={step.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-gray-900 flex items-center justify-center text-xs font-medium text-gray-900 shrink-0">
                          {step.num}
                        </div>
                        <span className="text-sm text-gray-700">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 応募ボタン */}
                <TransitionLink
                  href={`/recruit/apply?position=${encodeURIComponent(post.title)}`}
                  className="block w-full py-4 bg-gray-900 text-white text-center font-medium hover:bg-gray-800 transition-colors"
                >
                  {t('applyButton')}
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 6. 募集要項テーブル ──── */}
      {requirementRows.length > 0 && (
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-[1500px] mx-auto px-4">
            {/* Mobile */}
            <div className="block lg:hidden">
              <h2 className="text-2xl font-medium text-gray-900 mb-8">{t('requirementsTitle')}</h2>
              <dl className="divide-y divide-gray-200">
                {requirementRows.map(r => (
                  <div key={r.id} className="py-4">
                    <dt className="text-sm font-medium text-gray-500 mb-1">{r.label}</dt>
                    <dd className="text-base text-gray-900">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-8">
              <div className="col-span-2">
                <h2 className="text-sm text-gray-500 sticky top-24">{t('requirementsTitle')}</h2>
              </div>
              <div className="col-span-8">
                <dl className="divide-y divide-gray-200">
                  {requirementRows.map(r => (
                    <div key={r.id} className="py-5 grid grid-cols-4 gap-8">
                      <dt className="text-sm font-medium text-gray-500 col-span-1">{r.label}</dt>
                      <dd className="text-base text-gray-900 col-span-3">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="col-span-2"></div>
            </div>
          </div>
        </section>
      )}

      {/* ──── 7. 応募CTA ──── */}
      <section className="py-20 md:py-32 border-t border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
            <div className="lg:col-span-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{t('applyLabel')}</span>
            </div>
            <div className="lg:col-span-8">
              <p className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-8">
                {t('applyHeading')}
              </p>
              <p className="text-base md:text-lg text-gray-500 max-w-2xl mb-12">
                {t('applyBody')}
              </p>
              <TransitionLink
                href={`/recruit/apply?position=${encodeURIComponent(post.title)}`}
                className="group inline-flex items-center gap-3 text-lg md:text-xl text-gray-900 border-b border-gray-900 pb-2 hover:gap-5 transition-all duration-300"
              >
                {t('applyLink')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </TransitionLink>
            </div>
            <div className="lg:col-span-2"></div>
          </div>
        </div>
      </section>

      {/* ──── 9. 関連リンク ──── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="hidden lg:grid grid-cols-12 gap-8">
            <div className="col-span-2"></div>
            <div className="col-span-8 grid grid-cols-2 gap-6">
              <TransitionLink
                href="/recruit/culture"
                className="group block border border-gray-200  p-8 hover:border-gray-400 transition-colors"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{t('links.culture.label')}</p>
                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {t('links.culture.title')}
                </h3>
                <p className="text-sm text-gray-500">
                  {t('links.culture.body')}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-gray-800 mt-4 group-hover:gap-2 transition-all">
                  {t('viewMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </TransitionLink>
              <TransitionLink
                href="/member"
                className="group block border border-gray-200  p-8 hover:border-gray-400 transition-colors"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{t('links.member.label')}</p>
                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {t('links.member.title')}
                </h3>
                <p className="text-sm text-gray-500">
                  {t('links.member.body')}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-gray-800 mt-4 group-hover:gap-2 transition-all">
                  {t('viewMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </TransitionLink>
            </div>
            <div className="col-span-2"></div>
          </div>

          {/* Mobile */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            <TransitionLink
              href="/recruit/culture"
              className="group block border border-gray-200  p-6 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('links.culture.label')}</p>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                {t('links.culture.title')}
              </h3>
            </TransitionLink>
            <TransitionLink
              href="/member"
              className="group block border border-gray-200  p-6 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('links.member.label')}</p>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                {t('links.member.title')}
              </h3>
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* ──── 関連求人 ──── */}
      {relatedRecruits.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="w-full max-w-[1500px] mx-auto px-4">
            <div className="my-6 md:my-8">
              <p className="text-sm lg:text-base text-gray-600">{t('relatedLead')}</p>
              <p className="text-3xl lg:text-6xl">{t('relatedHeading')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {relatedRecruits.map((item) => (
                <RecruitItem
                  key={item.id}
                  item={item}
                  showDivider={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

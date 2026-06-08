'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { RecruitListItem } from '@/lib/recruit'
import JobCard from '@/components/sections/recruit/jobs/JobCard'

interface JobListSectionProps {
  recruits: RecruitListItem[]
}

// 「すべて」フィルターの言語非依存センチネル（Notion値と衝突しない固定文字列）
const ALL_FILTER = '__all__'

export default function JobListSection({ recruits }: JobListSectionProps) {
  const t = useTranslations('sections.recruit.jobs')
  const [selectedJobType, setSelectedJobType] = useState<string>(ALL_FILTER)
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>(ALL_FILTER)

  const jobTypes = useMemo(() => {
    const types = new Set(recruits.flatMap(r => r.jobType))
    return [ALL_FILTER, ...Array.from(types)]
  }, [recruits])

  const employmentTypes = useMemo(() => {
    const types = new Set(recruits.flatMap(r => r.employmentType))
    return [ALL_FILTER, ...Array.from(types)]
  }, [recruits])

  const filteredRecruits = useMemo(() => {
    return recruits.filter((recruit) => {
      const matchesJobType = selectedJobType === ALL_FILTER || recruit.jobType.includes(selectedJobType)
      const matchesEmploymentType = selectedEmploymentType === ALL_FILTER || recruit.employmentType.includes(selectedEmploymentType)
      return matchesJobType && matchesEmploymentType
    })
  }, [recruits, selectedJobType, selectedEmploymentType])

  const isFiltered = selectedJobType !== ALL_FILTER || selectedEmploymentType !== ALL_FILTER

  // フィルター値のラベル: センチネルは「すべて」、それ以外はNotion値をそのまま表示
  const filterLabel = (value: string) => (value === ALL_FILTER ? t('all') : value)

  return (
    <section className="bg-white pt-20 md:pt-40 pb-16 md:pb-24">
      <div className="max-w-[1500px] mx-auto px-4">

        {/* ──── ヘッダー ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">{t('label')}</span>
          </div>
          <div className="lg:col-span-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-4">
              {t('heading')}
            </h1>
            <p className="text-base md:text-lg text-gray-500">
              {t('lead')}
            </p>
          </div>
          <div className="lg:col-span-2"></div>
        </div>

        {/* ──── モバイル: フィルター ──── */}
        <div className="lg:hidden space-y-6 mb-10">
          <div>
            <h3 className="text-xs text-gray-500 mb-3">{t('jobTypeLabel')}</h3>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedJobType(type)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    selectedJobType === type
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterLabel(type)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-3">{t('employmentTypeLabel')}</h3>
            <div className="flex flex-wrap gap-2">
              {employmentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedEmploymentType(type)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    selectedEmploymentType === type
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterLabel(type)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ──── デスクトップ: 左フィルター + 右一覧 ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 左2col: スティッキーフィルター */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-8">
              {/* 件数 */}
              <div>
                <span className="text-3xl font-medium text-gray-900">{filteredRecruits.length}</span>
                <p className="text-xs text-gray-500 mt-1">{t('openPositions')}</p>
              </div>

              {/* 区切り線 */}
              <div className="w-8 h-px bg-gray-300" />

              {/* 職種フィルター */}
              <div>
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">{t('jobTypeLabel')}</h3>
                <div className="flex flex-col gap-1">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedJobType(type)}
                      className={`text-left text-sm py-1 transition-colors ${
                        selectedJobType === type
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {filterLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* 雇用形態フィルター */}
              <div>
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">{t('employmentTypeLabel')}</h3>
                <div className="flex flex-col gap-1">
                  {employmentTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedEmploymentType(type)}
                      className={`text-left text-sm py-1 transition-colors ${
                        selectedEmploymentType === type
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {filterLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {isFiltered && (
                <button
                  onClick={() => {
                    setSelectedJobType(ALL_FILTER)
                    setSelectedEmploymentType(ALL_FILTER)
                  }}
                  className="text-xs text-gray-500 border-b border-gray-400 pb-0.5 hover:text-gray-900 transition-colors"
                >
                  {t('reset')}
                </button>
              )}
            </div>
          </div>

          {/* 中央8col: 求人一覧 */}
          <div className="lg:col-span-8">
            {filteredRecruits.length > 0 ? (
              <div>
                {filteredRecruits.map((item) => (
                  <JobCard key={item.id} item={item} />
                ))}
                <div className="border-t border-gray-200" />
              </div>
            ) : (
              <div className="py-16 text-center border-t border-gray-200">
                <p className="text-gray-500 mb-4">{t('empty')}</p>
                <button
                  onClick={() => {
                    setSelectedJobType(ALL_FILTER)
                    setSelectedEmploymentType(ALL_FILTER)
                  }}
                  className="text-sm text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 transition-colors"
                >
                  {t('resetFilters')}
                </button>
              </div>
            )}
          </div>

          {/* 右2col */}
          <div className="hidden lg:block lg:col-span-2"></div>
        </div>

        {/* ──── モバイル: 0件メッセージ ──── */}
        {filteredRecruits.length === 0 && (
          <div className="lg:hidden text-center py-12">
            <p className="text-gray-500 mb-4">{t('empty')}</p>
            <button
              onClick={() => {
                setSelectedJobType(ALL_FILTER)
                setSelectedEmploymentType(ALL_FILTER)
              }}
              className="text-sm text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 transition-colors"
            >
              {t('resetFilters')}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

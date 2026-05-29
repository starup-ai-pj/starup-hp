import Image from 'next/image'
import { getAllRecruitsForList } from '@/lib/recruit'
import TransitionLink from '@/components/ui/TransitionLink'

export default async function JobsSection() {
  const recruits = await getAllRecruitsForList()
  const jobs = recruits.slice(0, 5)

  return (
    <section className="py-24 md:py-40" data-bg="light">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* ━━━ Left: sticky photo (= セクション見出し) - PCのみ表示 ━━━ */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative w-full aspect-[2/3] lg:aspect-auto lg:h-[78vh] overflow-hidden">
                <Image
                  src="/images/recruit/jobs.jpg"
                  alt="STARUP メンバー"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  unoptimized
                />

                {/* Top-right stamp */}
                <div className="absolute top-5 right-5 md:top-8 md:right-8 text-white text-right text-[10px] uppercase tracking-[0.35em] opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                  STARUP / Recruit
                </div>

                {/* Bottom gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Caption — this is the section heading */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white">
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-80 mb-3">
                    — Open Positions
                  </p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
                    募集中の<br />ポジション。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━ Right: numbered job list ━━━ */}
          <div className="lg:col-span-7">
            {/* Status bar */}
            <div className="flex items-baseline justify-between border-b border-gray-900 pb-3 md:pb-4 mb-2 md:mb-3">
              <p className="text-[10px] text-gray-900 uppercase tracking-[0.3em]">All roles</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                {jobs.length} open
              </p>
            </div>

            {/* Jobs */}
            {jobs.length > 0 ? (
              <div>
                {jobs.map((job, i) => (
                  <TransitionLink
                    key={job.id}
                    href={`/recruit/${job.id}`}
                    className="group block border-b border-gray-200 py-8 md:py-10 -mx-3 px-3 md:-mx-4 md:px-4 hover:bg-gray-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-5 md:gap-8">
                      <span className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-300 leading-none shrink-0 w-12 md:w-16 lg:w-20 tracking-tighter">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        {job.employmentType?.[0] && (
                          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">
                            {job.employmentType[0]}
                          </p>
                        )}
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 tracking-tight mb-3 leading-snug group-hover:text-gray-600 transition-colors">
                          {job.title}
                        </h3>
                        {job.summary && (
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 max-w-2xl mb-5">
                            {job.summary}
                          </p>
                        )}
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-500">
                            {job.location && (
                              <span className="px-2 py-1 bg-gray-100 rounded-sm">{job.location}</span>
                            )}
                            {job.salary && (
                              <span className="px-2 py-1 bg-gray-100 rounded-sm">{job.salary}</span>
                            )}
                          </div>
                          <span className="inline-flex items-center gap-2 text-xs text-gray-900 border-b border-gray-900 pb-0.5 group-hover:gap-3 transition-all duration-300 shrink-0">
                            詳細を見る
                            <svg
                              className="w-3.5 h-3.5"
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
                          </span>
                        </div>
                      </div>
                    </div>
                  </TransitionLink>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 py-12">現在募集中のポジションはありません。</p>
            )}

            {/* See all */}
            <div className="mt-10 md:mt-14 flex justify-end">
              <TransitionLink
                href="/recruit/jobs"
                className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all duration-300"
              >
                すべての求人を見る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

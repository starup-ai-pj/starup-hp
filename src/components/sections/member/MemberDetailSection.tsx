'use client'

import Image from 'next/image'
import TransitionLink from '@/components/ui/TransitionLink'
import type { Member } from '@/data/member/member'
import type { Interview } from '@/types/interview'

interface OtherMember {
  member: Member
  preview: string | null
}

interface MemberDetailSectionProps {
  member: Member
  interview: Interview | null
  otherMembers: OtherMember[]
}

function isInterviewer(speaker: string): boolean {
  return /梅田/.test(speaker)
}

export default function MemberDetailSection({ member, interview, otherMembers }: MemberDetailSectionProps) {
  const profileRows = [
    { label: '役職', value: member.position },
    { label: '氏名', value: `${member.name}${member.englishName ? ` / ${member.englishName}` : ''}` },
    { label: '経歴', value: member.description },
  ].filter(r => !!r.value)

  return (
    <div className="bg-white pt-16 md:pt-24">
      {/* ──── 1. ヘッダー ──── */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1500px] mx-auto px-4">
          {/* Mobile */}
          <div className="block lg:hidden space-y-4">
            <span className="inline-block text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded">
              Member
            </span>
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
              {member.name}
            </h1>
            {member.englishName && (
              <p className="text-sm text-gray-400">{member.englishName}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1">{member.position}</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              {member.description}
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-8">
            <div className="col-span-2">
              <span className="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded">
                Member
              </span>
            </div>
            <div className="col-span-8 border-r border-gray-700 pr-8">
              <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-2 leading-tight">
                {member.name}
              </h1>
              {member.englishName && (
                <p className="text-sm text-gray-400 mb-4">{member.englishName}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm bg-gray-100 text-gray-700 px-4 py-1.5">{member.position}</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {member.description}
              </p>
            </div>
            <div className="col-span-2">
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase tracking-wider">Interview</div>
                <div className="text-xs text-gray-400 mt-1">{interview ? `${interview.sections.length} chapters` : '—'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── ヒーロー画像 ──── */}
      <section className="w-full px-4 max-w-[1500px] mx-auto">
        <div className="relative w-full h-48 md:h-96 lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
          {member.heroImage ? (
            <Image
              src={member.heroImage}
              alt={member.name}
              fill
              sizes="(max-width: 1500px) 100vw, 1500px"
              className="object-cover object-[center_20%]"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Hero image</span>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>
          )}
        </div>
      </section>

      {/* ──── インタビュー本文 ＋ サイドバー ──── */}
      {interview && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1500px] mx-auto px-4">
            {/* Mobile */}
            <div className="block lg:hidden space-y-10">
              {interview.intro.length > 0 && (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  {interview.intro.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {interview.sections.map((section, si) => (
                <div key={si} className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-900 pb-2 border-b border-gray-200">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item, ii) => (
                      <div
                        key={ii}
                        className={
                          isInterviewer(item.speaker)
                            ? 'pl-4 border-l-2 border-gray-300 text-gray-500 italic'
                            : 'text-gray-800'
                        }
                      >
                        <p className="text-xs font-medium text-gray-500 mb-1">{item.speaker}</p>
                        {item.text.split('\n').map((line, li) => (
                          <p key={li} className="leading-relaxed">{line}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-8">
              <div className="col-span-2"></div>
              <div className="col-span-8 border-r border-gray-700 pr-8 space-y-16">
                {interview.intro.length > 0 && (
                  <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
                    {interview.intro.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
                {interview.sections.map((section, si) => (
                  <div key={si} className="space-y-6">
                    <h2 className="text-2xl font-medium text-gray-900 pb-3 border-b border-gray-200">
                      {section.title}
                    </h2>
                    <div className="space-y-6">
                      {section.items.map((item, ii) => (
                        <div
                          key={ii}
                          className={
                            isInterviewer(item.speaker)
                              ? 'pl-5 border-l-2 border-gray-300 text-gray-500 italic'
                              : 'text-gray-800'
                          }
                        >
                          <p className="text-xs font-medium text-gray-500 mb-2 tracking-wider uppercase">
                            {item.speaker}
                          </p>
                          {item.text.split('\n').map((line, li) => (
                            <p key={li} className="leading-[1.9] text-base">{line}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* サイドバー */}
              <div className="col-span-2">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-gray-50 p-6 space-y-4">
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{member.position}</p>
                      <p className="text-base font-medium text-gray-900">{member.name}</p>
                      {member.englishName && (
                        <p className="text-xs text-gray-400">{member.englishName}</p>
                      )}
                    </div>
                  </div>
                  <TransitionLink
                    href="/member"
                    className="block w-full py-4 bg-gray-900 text-white text-center font-medium hover:bg-gray-800 transition-colors"
                  >
                    メンバー一覧へ戻る
                  </TransitionLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──── プロフィール基本情報 ──── */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-[1500px] mx-auto px-4">
          {/* Mobile */}
          <div className="block lg:hidden">
            <h2 className="text-2xl font-medium text-gray-900 mb-8">プロフィール</h2>
            <dl className="divide-y divide-gray-200">
              {profileRows.map(r => (
                <div key={r.label} className="py-4">
                  <dt className="text-sm font-medium text-gray-500 mb-1">{r.label}</dt>
                  <dd className="text-base text-gray-900 leading-relaxed">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-8">
            <div className="col-span-2">
              <h2 className="text-sm text-gray-500 sticky top-24">プロフィール</h2>
            </div>
            <div className="col-span-8">
              <dl className="divide-y divide-gray-200">
                {profileRows.map(r => (
                  <div key={r.label} className="py-5 grid grid-cols-4 gap-8">
                    <dt className="text-sm font-medium text-gray-500 col-span-1">{r.label}</dt>
                    <dd className="text-base text-gray-900 col-span-3 leading-relaxed">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </section>

      {/* ──── CTA ──── */}
      <section className="py-20 md:py-32 border-t border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Join us</span>
            </div>
            <div className="lg:col-span-8">
              <p className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-8">
                Work with us.
              </p>
              <p className="text-base md:text-lg text-gray-500 max-w-2xl mb-12">
                一緒に未来をつくる仲間を募集しています。気になるポジションがあれば、お気軽にご応募ください。
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

      {/* ──── 関連リンク ──── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="hidden lg:grid grid-cols-12 gap-8">
            <div className="col-span-2"></div>
            <div className="col-span-8 grid grid-cols-2 gap-6">
              <TransitionLink
                href="/recruit/culture"
                className="group block border border-gray-200 p-8 hover:border-gray-400 transition-colors"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Culture</p>
                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  私たちのカルチャーを知る
                </h3>
                <p className="text-sm text-gray-500">
                  STAR UPが大切にしている価値観やチームの雰囲気をご紹介します。
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-gray-800 mt-4 group-hover:gap-2 transition-all">
                  View more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </TransitionLink>
              <TransitionLink
                href="/recruit"
                className="group block border border-gray-200 p-8 hover:border-gray-400 transition-colors"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Career</p>
                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  Careerページを見る
                </h3>
                <p className="text-sm text-gray-500">
                  採用情報・働き方・選考フローなど、Careerに関する情報をまとめています。
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-gray-800 mt-4 group-hover:gap-2 transition-all">
                  View more
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
              className="group block border border-gray-200 p-6 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Culture</p>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                私たちのカルチャーを知る
              </h3>
            </TransitionLink>
            <TransitionLink
              href="/recruit"
              className="group block border border-gray-200 p-6 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Career</p>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                Careerページを見る
              </h3>
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* ──── 他のメンバー ──── */}
      {otherMembers.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="w-full max-w-[1500px] mx-auto px-4">
            <div className="my-6 md:my-8">
              <p className="text-sm lg:text-base text-gray-600">他のメンバーのインタビューもぜひご覧ください。</p>
              <p className="text-3xl lg:text-6xl">Meet other members.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              {otherMembers.map(({ member: m, preview }) => (
                <TransitionLink
                  key={m.id}
                  href={`/member/${m.id}`}
                  className="group flex items-start gap-5 border-t border-gray-200 pt-6"
                >
                  <div className="relative w-24 h-32 lg:w-28 lg:h-36 shrink-0 overflow-hidden bg-gray-100">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 relative h-32 lg:h-36">
                    <div className="absolute inset-0 transition-all duration-500 ease-out opacity-100 group-hover:opacity-0 group-hover:-translate-y-1">
                      <p className="text-xs text-gray-500 mb-1">{m.position}</p>
                      <p className="text-base lg:text-lg font-medium text-gray-900 mb-1">{m.name}</p>
                      {m.englishName && (
                        <p className="text-xs text-gray-400 mb-3">{m.englishName}</p>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs text-gray-900 border-b border-gray-900 pb-0.5 transition-all duration-300">
                        Read more
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                    {preview && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex flex-col justify-center opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">From the interview</span>
                        <p className="text-sm lg:text-[15px] text-gray-800 italic leading-[1.9] line-clamp-3 pl-4 border-l-2 border-gray-900">
                          &ldquo;{preview}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

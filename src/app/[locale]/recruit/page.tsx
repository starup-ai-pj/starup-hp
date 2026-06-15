import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroAiMakerSection from '@/components/sections/recruit/landing/HeroAiMakerSection'
import ChapterDivider from '@/components/sections/recruit/landing/ChapterDivider'
import MissionSection from '@/components/sections/recruit/landing/MissionSection'
import WorkplaceSection from '@/components/sections/recruit/landing/WorkplaceSection'
import MessageSection from '@/components/sections/recruit/landing/MessageSection'
import JobsSection from '@/components/sections/recruit/landing/JobsSection'
import CtaSection from '@/components/sections/recruit/landing/CtaSection'

interface RecruitPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: RecruitPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sections.recruit.landing.metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    alternates: {
      canonical: locale === 'ja' ? '/recruit' : '/en/recruit',
      languages: { ja: '/recruit', en: '/en/recruit' },
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: locale === 'ja' ? '/recruit' : '/en/recruit',
      images: ['/images/recruit/hero.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('ogDescription'),
      images: ['/images/recruit/hero.jpg'],
    },
  }
}

export default async function RecruitPage({ params }: RecruitPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'sections.recruit.landing.chapter' })

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-white">
        {/* 表紙 + §0 Prologue: STARUP=AIメーカー (右側Pinterest風ギャラリー付き) */}
        <HeroAiMakerSection />

        {/* ━━━ 01. Mission + Values ━━━ */}
        <ChapterDivider
          number="01"
          jaTitle={t('mission.jaTitle')}
          enTitle={t.rich('mission.enTitle', { br: () => <br /> })}
          bgImage="/images/recruit/chapters/chapter-01.jpg"
        />
        <MissionSection />

        {/* ━━━ 02. ここで働くということ ━━━ */}
        <ChapterDivider
          number="02"
          jaTitle={t('workplace.jaTitle')}
          enTitle={t.rich('workplace.enTitle', { br: () => <br /> })}
          bgImage="/images/recruit/chapters/chapter-02.jpg"
        />
        <WorkplaceSection />

        {/* 代表メッセージ */}
        <MessageSection />

        {/* ━━━ 03. 募集中のポジション ━━━ */}
        <ChapterDivider
          number="03"
          jaTitle={t('jobs.jaTitle')}
          enTitle={t.rich('jobs.enTitle', { br: () => <br /> })}
          bgImage="/images/recruit/chapters/chapter-03.jpg"
        />
        <JobsSection />

        <CtaSection />
      </div>
      <Footer />
    </div>
  )
}

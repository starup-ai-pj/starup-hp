import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroAiMakerSection from '@/components/sections/recruit/landing/HeroAiMakerSection'
import ChapterDivider from '@/components/sections/recruit/landing/ChapterDivider'
import MissionSection from '@/components/sections/recruit/landing/MissionSection'
import WorkplaceSection from '@/components/sections/recruit/landing/WorkplaceSection'
import MessageSection from '@/components/sections/recruit/landing/MessageSection'
import JobsSection from '@/components/sections/recruit/landing/JobsSection'
import CtaSection from '@/components/sections/recruit/landing/CtaSection'

export const metadata: Metadata = {
  title: 'Recruit | STARUP 採用情報',
  description:
    'STARUPでは産業と文化の構造を再構築する仲間を募集しています。代表メッセージ、カルチャー、募集職種、選考プロセスをご覧ください。',
  keywords: ['STARUP 採用', '採用情報', '求人', 'スタートアップ 採用', 'AI エンジニア 採用', '新卒採用', '中途採用'],
  alternates: {
    canonical: '/recruit',
  },
  openGraph: {
    title: 'Recruit | STARUP 採用情報',
    description: '産業と文化の構造を再構築する仲間を募集しています。',
    url: '/recruit',
    images: ['/images/recruit/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recruit | STARUP 採用情報',
    description: '産業と文化の構造を再構築する仲間を募集しています。',
    images: ['/images/recruit/hero.jpg'],
  },
}

export default function RecruitPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-white">
        {/* 表紙 + §0 Prologue: STARUP=AIメーカー (右側Pinterest風ギャラリー付き) */}
        <HeroAiMakerSection />

        {/* ━━━ 01. Mission + Values ━━━ */}
        <ChapterDivider
          number="01"
          jaTitle="わたしたちがやろうとしていること"
          enTitle={
            <>
              What we&apos;re<br />trying to do.
            </>
          }
          bgImage="/images/recruit/chapters/chapter-01.jpg"
        />
        <MissionSection />

        {/* ━━━ 02. ここで働くということ ━━━ */}
        <ChapterDivider
          number="02"
          jaTitle="ここで働くということ"
          enTitle={
            <>
              How we<br />work.
            </>
          }
          bgImage="/images/recruit/chapters/chapter-02.jpg"
        />
        <WorkplaceSection />

        {/* 代表メッセージ */}
        <MessageSection />

        {/* ━━━ 03. 募集中のポジション ━━━ */}
        <ChapterDivider
          number="03"
          jaTitle="募集中のポジション"
          enTitle={
            <>
              Open<br />positions.
            </>
          }
          bgImage="/images/recruit/chapters/chapter-03.jpg"
        />
        <JobsSection />

        <CtaSection />
      </div>
      <Footer />
    </div>
  )
}

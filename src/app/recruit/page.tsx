import type { Metadata } from 'next'
import RecruitDeckPage from '@/components/sections/recruit/RecruitDeckPage'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
    images: ['/images/recruit/recruit-hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recruit | STARUP 採用情報',
    description: '産業と文化の構造を再構築する仲間を募集しています。',
    images: ['/images/recruit/recruit-hero.jpg'],
  },
}

export default function RecruitPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <RecruitDeckPage />
      <Footer />
    </div>
  )
}

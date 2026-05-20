import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CulturePage from '@/components/sections/culture/CulturePage'

export const metadata: Metadata = {
  title: 'Culture | STARUP のカルチャー',
  description:
    'STARUPのカルチャー、バリュー、働き方、メンバーの素顔をご紹介します。産業と文化の構造を再構築する組織の根底にある価値観をお伝えします。',
  keywords: ['STARUP カルチャー', 'スタートアップ カルチャー', '企業文化', '働き方', 'バリュー', 'チーム'],
  alternates: {
    canonical: '/recruit/culture',
  },
  openGraph: {
    title: 'Culture | STARUP のカルチャー',
    description: 'STARUPのカルチャー、バリュー、働き方、メンバーの素顔をご紹介します。',
    url: '/recruit/culture',
    images: ['/images/recruit/recruit-office.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Culture | STARUP のカルチャー',
    description: 'STARUPのカルチャー、バリュー、働き方、メンバーの素顔をご紹介します。',
    images: ['/images/recruit/recruit-office.jpg'],
  },
}

export default function RecruitCulturePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <CulturePage />
      <Footer />
    </div>
  )
}

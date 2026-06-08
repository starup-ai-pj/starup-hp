import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CultureSection from '@/components/sections/recruit/culture/CultureSection'

interface RecruitCulturePageProps {
  params: Promise<{ locale: string }>
}

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
    images: ['/images/recruit/office.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Culture | STARUP のカルチャー',
    description: 'STARUPのカルチャー、バリュー、働き方、メンバーの素顔をご紹介します。',
    images: ['/images/recruit/office.jpg'],
  },
}

export default async function RecruitCulturePage({ params }: RecruitCulturePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen">
      <Header />
      <CultureSection locale={locale} />
      <Footer />
    </div>
  )
}

import type { Metadata } from 'next'
import RecruitApplyFormSection from '@/components/sections/recruit/RecruitApplyFormSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '採用応募フォーム | STARUP',
  description:
    'STARUPの採用応募フォームです。あなたのスキルと情熱を私たちのチームで活かしませんか。お気軽にご応募ください。',
  keywords: ['STARUP 応募', '採用 応募', 'エントリー', '応募フォーム'],
  alternates: {
    canonical: '/recruit/apply',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: '採用応募フォーム | STARUP',
    description: 'STARUPの採用応募フォームです。あなたのスキルと情熱を私たちのチームで活かしませんか。',
    url: '/recruit/apply',
    images: ['/images/recruit/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '採用応募フォーム | STARUP',
    description: 'STARUPの採用応募フォームです。あなたのスキルと情熱を私たちのチームで活かしませんか。',
    images: ['/images/recruit/hero.jpg'],
  },
}

export default function RecruitApplyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <RecruitApplyFormSection />
      <Footer />
    </div>
  )
}

import type { Metadata } from 'next'
import JobListSection from '@/components/sections/recruit/JobListSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllRecruitsForList } from '@/lib/recruit'

export const metadata: Metadata = {
  title: '募集職種一覧 | STARUP 採用情報',
  description:
    'STARUPで募集中の職種一覧。エンジニア、ビジネス、デザインなど、産業と文化の構造を再構築する仲間を募集しています。',
  keywords: ['STARUP 求人', '募集職種', 'エンジニア 求人', 'スタートアップ 求人', '中途採用', '新卒採用'],
  alternates: {
    canonical: '/recruit/jobs',
  },
  openGraph: {
    title: '募集職種一覧 | STARUP 採用情報',
    description: 'STARUPで募集中の職種一覧をご覧いただけます。',
    url: '/recruit/jobs',
    images: ['/images/recruit/recruit-jobs.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '募集職種一覧 | STARUP 採用情報',
    description: 'STARUPで募集中の職種一覧をご覧いただけます。',
    images: ['/images/recruit/recruit-jobs.jpg'],
  },
}

export default async function RecruitJobsPage() {
  const recruits = await getAllRecruitsForList()

  return (
    <div className="min-h-screen">
      <Header />
      <JobListSection recruits={recruits} />
      <Footer />
    </div>
  )
}

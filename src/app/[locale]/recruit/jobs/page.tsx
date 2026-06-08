import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import JobListSection from '@/components/sections/recruit/jobs/JobListSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllRecruitsForList } from '@/lib/recruit'

interface RecruitJobsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: RecruitJobsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sections.recruit.jobs.metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    alternates: {
      canonical: locale === 'ja' ? '/recruit/jobs' : '/en/recruit/jobs',
      languages: { ja: '/recruit/jobs', en: '/en/recruit/jobs' },
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: locale === 'ja' ? '/recruit/jobs' : '/en/recruit/jobs',
      images: ['/images/recruit/jobs.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('ogDescription'),
      images: ['/images/recruit/jobs.jpg'],
    },
  }
}

export default async function RecruitJobsPage({ params }: RecruitJobsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const recruits = await getAllRecruitsForList()

  return (
    <div className="min-h-screen">
      <Header />
      <JobListSection recruits={recruits} />
      <Footer />
    </div>
  )
}

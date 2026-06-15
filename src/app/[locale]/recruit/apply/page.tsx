import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import RecruitApplyFormSection from '@/components/sections/recruit/apply/RecruitApplyFormSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllRecruitsForList } from '@/lib/recruit'

interface RecruitApplyPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ position?: string }>
}

export async function generateMetadata({ params }: RecruitApplyPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sections.recruit.apply.metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    alternates: {
      canonical: locale === 'ja' ? '/recruit/apply' : '/en/recruit/apply',
      languages: { ja: '/recruit/apply', en: '/en/recruit/apply' },
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: locale === 'ja' ? '/recruit/apply' : '/en/recruit/apply',
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

export default async function RecruitApplyPage({ params, searchParams }: RecruitApplyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const { position } = await searchParams
  const recruits = await getAllRecruitsForList()
  const positions = recruits.map((r) => r.title)
  return (
    <div className="min-h-screen">
      <Header />
      <RecruitApplyFormSection positions={positions} initialPosition={position} />
      <Footer />
    </div>
  )
}

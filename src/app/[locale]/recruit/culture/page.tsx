import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CultureSection from '@/components/sections/recruit/culture/CultureSection'

interface RecruitCulturePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: RecruitCulturePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sections.recruit.culture.metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    alternates: {
      canonical: locale === 'ja' ? '/recruit/culture' : '/en/recruit/culture',
      languages: { ja: '/recruit/culture', en: '/en/recruit/culture' },
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: locale === 'ja' ? '/recruit/culture' : '/en/recruit/culture',
      images: ['/images/recruit/office.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('ogDescription'),
      images: ['/images/recruit/office.jpg'],
    },
  }
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

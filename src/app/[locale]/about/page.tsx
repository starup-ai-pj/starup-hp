import HeroSection from '@/components/sections/about/HeroSection'
import VisionSection from '@/components/sections/about/VisionSection'
import InformationSection from '@/components/sections/about/InformationSection'
import HistorySection from '@/components/sections/about/HistorySection'
import JoinUsSection from '@/components/sections/common/JoinUsSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getHistory } from '@/data/history'
import { setRequestLocale } from 'next-intl/server'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function About({ params }: AboutPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const historyEvents = await getHistory(locale)

  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <VisionSection />
      <InformationSection locale={locale} />
      <HistorySection events={historyEvents} />
      <JoinUsSection />
      <Footer />
    </div>
  );
}

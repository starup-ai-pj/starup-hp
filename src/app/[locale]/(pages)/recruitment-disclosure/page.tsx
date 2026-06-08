import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RecruitmentDisclosureSection from '@/components/sections/recruitment-disclosure/RecruitmentDisclosureSection'

export const metadata = {
  title: '有料職業紹介事業に基づく情報公開 | STAR UP',
  description: '株式会社STAR UPの有料職業紹介事業に基づく情報公開',
}

interface RecruitmentDisclosurePageProps {
  params: Promise<{ locale: string }>
}

export default async function RecruitmentDisclosurePage({ params }: RecruitmentDisclosurePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen">
      <Header />
      <RecruitmentDisclosureSection locale={locale} />
      <Footer />
    </div>
  )
}

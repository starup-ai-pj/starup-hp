import { setRequestLocale } from 'next-intl/server'
import NewsListSection from '@/components/sections/news/NewsListSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface NewsPageProps {
  params: Promise<{ locale: string }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen">
      <Header />
      <NewsListSection locale={locale} />
      <Footer />
    </div>
  )
}

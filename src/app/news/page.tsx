
import NewsListSection from '@/components/sections/news/NewsListSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ISR設定: 1時間ごとに再検証
export const revalidate = 3600

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <NewsListSection />
      <Footer />
    </div>
  )
}
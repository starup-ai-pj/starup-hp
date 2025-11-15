import RecruitListSection from '@/components/sections/recruit/RecruitListSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllRecruitsForList } from '@/lib/recruit'

// ISR設定: 1時間ごとに再検証
export const revalidate = 3600

export default async function RecruitPage() {
  const recruits = await getAllRecruitsForList()

  return (
    <div className="min-h-screen">
      <Header />
      <RecruitListSection recruits={recruits} />
      <Footer />
    </div>
  )
}

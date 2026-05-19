import CareerHubSection from '@/components/sections/recruit/CareerHubSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllRecruitsForList } from '@/lib/recruit'

export default async function RecruitPage() {
  const recruits = await getAllRecruitsForList()
  const jobPreviews = recruits.slice(0, 4)

  return (
    <div className="min-h-screen">
      <Header />
      <CareerHubSection jobPreviews={jobPreviews} />
      <Footer />
    </div>
  )
}

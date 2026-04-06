import JobListSection from '@/components/sections/recruit/JobListSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllRecruitsForList } from '@/lib/recruit'

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

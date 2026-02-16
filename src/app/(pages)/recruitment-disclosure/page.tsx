import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RecruitmentDisclosureSection from '@/components/sections/recruitment-disclosure/RecruitmentDisclosureSection'

export const metadata = {
  title: '有料職業紹介事業に基づく情報公開 | STAR UP',
  description: '株式会社STAR UPの有料職業紹介事業に基づく情報公開',
}

export default function RecruitmentDisclosurePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <RecruitmentDisclosureSection />
      <Footer />
    </div>
  )
}

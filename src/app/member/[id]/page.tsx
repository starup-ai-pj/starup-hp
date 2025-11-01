import { notFound } from 'next/navigation'
import { getAllMemberIds, getMemberById } from '@/lib/members'
import MemberDetailSection from '@/components/sections/member/MemberDetailSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface MemberDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = await getAllMemberIds()
  return ids.map((id) => ({
    id: id, // Using numeric ID
  }))
}

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { id } = await params

  const member = await getMemberById(id)

  if (!member) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <MemberDetailSection member={member} />
      <Footer />
    </div>
  )
}

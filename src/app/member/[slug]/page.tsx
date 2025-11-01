import { notFound } from 'next/navigation'
import { getAllMemberSlugs, getMemberBySlug } from '@/lib/members'
import MemberDetailSection from '@/components/sections/member/MemberDetailSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface MemberDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllMemberSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { slug } = await params

  const member = await getMemberBySlug(slug)

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

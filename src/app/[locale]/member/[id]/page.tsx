import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getMembers, getMember, memberAssets } from '@/data/members'
import { getInterviewByMemberId, getInterviewPreview } from '@/lib/interview'
import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MemberDetailSection from '@/components/sections/member/MemberDetailSection'

interface MemberDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export function generateStaticParams() {
  return memberAssets.map(m => ({ id: m.id }))
}

export async function generateMetadata({ params }: MemberDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params
  const member = await getMember(locale, id)
  if (!member) return {}
  const title = `${member.name}｜STAR UP Member`
  const description = `${member.position} ${member.name}｜${member.description}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: member.image ? [member.image] : undefined,
    },
  }
}

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const member = await getMember(locale, id)
  if (!member) notFound()

  const allMembers = await getMembers(locale)
  const interview = getInterviewByMemberId(id)
  const otherMembers = allMembers
    .filter(m => m.id !== id)
    .slice(0, 4)
    .map(m => ({ member: m, preview: getInterviewPreview(m.id) }))

  return (
    <div className="relative">
      <Header />
      <MemberDetailSection member={member} interview={interview} otherMembers={otherMembers} />
      <Footer />
    </div>
  )
}

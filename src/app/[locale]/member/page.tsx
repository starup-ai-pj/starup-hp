import Header from "@/components/layout/Header"
import MemberListSection from "@/components/sections/member/MemberListSection"
import Footer from "@/components/layout/Footer"
import { getMembers } from "@/data/members"
import { getInterviewPreview, hasInterview } from "@/lib/interview"
import { setRequestLocale } from "next-intl/server"

interface MemberPageProps {
  params: Promise<{ locale: string }>
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const memberData = await getMembers(locale)
  const members = memberData.map(m => ({
    member: m,
    preview: getInterviewPreview(m.id),
    hasInterview: hasInterview(m.id),
  }))
  return (
    <div className="relative">
      <Header />
      <MemberListSection members={members} />
      <Footer />
    </div>
  );
}

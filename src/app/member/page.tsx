import Header from "@/components/layout/Header"
import MemberListSection from "@/components/sections/member/MemberListSection"
import Footer from "@/components/layout/Footer"
import { memberData } from "@/data/member/member"
import { getInterviewPreview, hasInterview } from "@/lib/interview"

export default function MemberPage() {
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

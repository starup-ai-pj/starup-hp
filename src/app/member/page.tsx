import Header from "@/components/layout/Header"
import MemberListSection from "@/components/sections/member/MemberListSection"
import Footer from "@/components/layout/Footer"
import { getAllMembersForList } from "@/lib/members"

export default async function MemberPage() {
  const members = await getAllMembersForList()

  return (
    <div className="relative">
      <Header />
      <MemberListSection members={members} />
      <Footer />
    </div>
  )
}
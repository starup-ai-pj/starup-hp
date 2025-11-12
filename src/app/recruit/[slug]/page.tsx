import { notFound } from 'next/navigation'
import { getAllRecruitIds, getRecruitPostById, getAllRecruitsForList } from '@/lib/recruit'
import RecruitDetailContentSection from '@/components/sections/recruit/RecruitDetailContentSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface RecruitPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function RecruitPostPage({ params }: RecruitPostPageProps) {
  const { slug } = await params

  const post = await getRecruitPostById(slug)

  if (!post) {
    notFound()
  }

  const allRecruits = await getAllRecruitsForList()

  return (
    <div className="min-h-screen">
      <Header />
      <RecruitDetailContentSection post={post} allRecruits={allRecruits} />
      <Footer />
    </div>
  )
}

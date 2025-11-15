import { notFound } from 'next/navigation'
import { getAllNewsIds, getNewsPostById } from '@/lib/news'
import NewsDetailContentSection from '@/components/sections/news/NewsDetailContentSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface NewsPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params

  const post = await getNewsPostById(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <NewsDetailContentSection post={post} />
      <Footer />
    </div>
  )
}
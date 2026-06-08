import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getNewsPostById } from '@/lib/news'
import NewsDetailContentSection from '@/components/sections/news/NewsDetailContentSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface NewsPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

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
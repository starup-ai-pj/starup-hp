import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getRecruitPostById, getAllRecruitsForList } from '@/lib/recruit'
import RecruitDetailContentSection from '@/components/sections/recruit/detail/RecruitDetailContentSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface RecruitPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

const SITE_URL = 'https://starup.co.jp'

export async function generateMetadata({ params }: RecruitPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getRecruitPostById(slug)

  if (!post) {
    return {
      title: '採用情報が見つかりません | STARUP',
      robots: { index: false, follow: false },
    }
  }

  const title = `${post.title} | STARUP 採用情報`
  const description =
    post.summary ||
    `STARUPの${post.jobType[0] || post.title}の募集詳細。勤務地: ${post.location || '—'}。あなたのスキルと情熱を私たちのチームで活かしませんか。`
  const url = `/recruit/${post.id}`
  const image = post.thumbnail || '/images/recruit/hero.jpg'

  const keywords = [
    'STARUP 採用',
    post.title,
    ...post.jobType,
    ...post.category,
    post.location,
    ...(post.employmentType || []),
  ].filter(Boolean) as string[]

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function RecruitPostPage({ params }: RecruitPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getRecruitPostById(slug)

  if (!post) {
    notFound()
  }

  const allRecruits = await getAllRecruitsForList()

  const imageUrl = post.thumbnail?.startsWith('http')
    ? post.thumbnail
    : `${SITE_URL}${post.thumbnail || '/images/recruit/hero.jpg'}`

  const jobPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: post.title,
    description: [post.summary, post.benefits, post.workingHours && `勤務時間: ${post.workingHours}`, post.holidays && `休日休暇: ${post.holidays}`]
      .filter(Boolean)
      .join('\n\n'),
    datePosted: post.date,
    employmentType: post.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'STARUP',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: post.location || '東京',
        addressCountry: 'JP',
      },
    },
    ...(post.salary && { baseSalary: post.salary }),
    ...(post.jobType.length > 0 && { occupationalCategory: post.jobType.join(', ') }),
    image: imageUrl,
    url: `${SITE_URL}/recruit/${post.id}`,
    identifier: {
      '@type': 'PropertyValue',
      name: 'STARUP',
      value: post.id,
    },
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }}
      />
      <Header />
      <RecruitDetailContentSection post={post} allRecruits={allRecruits} />
      <Footer />
    </div>
  )
}

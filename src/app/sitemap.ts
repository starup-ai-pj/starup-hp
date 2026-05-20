import type { MetadataRoute } from 'next'
import { getAllRecruitsForList } from '@/lib/recruit'
import { getAllNewsForList } from '@/lib/news'
import { memberData } from '@/data/member/member'

const SITE_URL = 'https://starup.co.jp'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/service`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/member`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/recruit`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/recruit/jobs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/recruit/culture`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/recruitment-disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/information-security-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const memberRoutes: MetadataRoute.Sitemap = memberData.map((m) => ({
    url: `${SITE_URL}/member/${m.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const [recruits, news] = await Promise.all([
    getAllRecruitsForList().catch(() => []),
    getAllNewsForList().catch(() => []),
  ])

  const recruitRoutes: MetadataRoute.Sitemap = recruits.map((r) => ({
    url: `${SITE_URL}/recruit/${r.id}`,
    lastModified: r.date ? new Date(r.date) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/news/${n.id}`,
    lastModified: n.date ? new Date(n.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...memberRoutes, ...recruitRoutes, ...newsRoutes]
}

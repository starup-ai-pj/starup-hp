import type { MetadataRoute } from 'next'
import { getAllRecruitsForList } from '@/lib/recruit'
import { getAllNewsForList } from '@/lib/news'
import { memberAssets } from '@/data/members'

const SITE_URL = 'https://starup.co.jp'

type RouteMeta = Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>

/** 1 パスにつき ja(プレフィックスなし) と en(/en) の 2 エントリを hreflang 付きで生成する */
function localizedEntries(path: string, meta: RouteMeta): MetadataRoute.Sitemap {
  const jaUrl = `${SITE_URL}${path === '/' ? '/' : path}`
  const enUrl = `${SITE_URL}/en${path === '/' ? '' : path}`
  const languages = { ja: jaUrl, en: enUrl, 'x-default': jaUrl }
  return [
    { url: jaUrl, alternates: { languages }, ...meta },
    { url: enUrl, alternates: { languages }, ...meta },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPaths: { path: string; meta: RouteMeta }[] = [
    { path: '/', meta: { lastModified: now, changeFrequency: 'weekly', priority: 1.0 } },
    { path: '/about', meta: { lastModified: now, changeFrequency: 'monthly', priority: 0.8 } },
    { path: '/service', meta: { lastModified: now, changeFrequency: 'monthly', priority: 0.8 } },
    { path: '/member', meta: { lastModified: now, changeFrequency: 'monthly', priority: 0.7 } },
    { path: '/news', meta: { lastModified: now, changeFrequency: 'weekly', priority: 0.7 } },
    { path: '/contact', meta: { lastModified: now, changeFrequency: 'yearly', priority: 0.5 } },
    { path: '/recruit', meta: { lastModified: now, changeFrequency: 'weekly', priority: 0.9 } },
    { path: '/recruit/jobs', meta: { lastModified: now, changeFrequency: 'weekly', priority: 0.9 } },
    { path: '/recruit/culture', meta: { lastModified: now, changeFrequency: 'monthly', priority: 0.7 } },
    { path: '/recruitment-disclosure', meta: { lastModified: now, changeFrequency: 'yearly', priority: 0.3 } },
    { path: '/information-security-policy', meta: { lastModified: now, changeFrequency: 'yearly', priority: 0.3 } },
  ]

  const staticRoutes = staticPaths.flatMap(({ path, meta }) => localizedEntries(path, meta))

  const memberRoutes = memberAssets.flatMap((m) =>
    localizedEntries(`/member/${m.id}`, { lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  )

  const [recruits, news] = await Promise.all([
    getAllRecruitsForList().catch(() => []),
    getAllNewsForList().catch(() => []),
  ])

  const recruitRoutes = recruits.flatMap((r) =>
    localizedEntries(`/recruit/${r.id}`, {
      lastModified: r.date ? new Date(r.date) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  )

  const newsRoutes = news.flatMap((n) =>
    localizedEntries(`/news/${n.id}`, {
      lastModified: n.date ? new Date(n.date) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  )

  return [...staticRoutes, ...memberRoutes, ...recruitRoutes, ...newsRoutes]
}

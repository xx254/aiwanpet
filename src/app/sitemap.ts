import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

// Lists the home page, the blog index and every published post. Scheduled
// posts (future `date`) stay out until their day, same as the blog index, so
// this revalidates hourly like the blog pages do.
export const revalidate = 3600

const BASE = 'https://www.aiwanpet.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: 'daily', priority: 0.8 },
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      ...(p.date ? { lastModified: new Date(`${p.date}T00:00:00Z`) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}

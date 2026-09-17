import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date?: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

// A post with a `date` in the future is scheduled, not published: it stays out
// of the index and its URL 404s until that day arrives. Posts with no date are
// the original library and are always published.
function isPublished(date?: string): boolean {
  if (!date) return true
  const publishAt = Date.parse(`${date}T00:00:00Z`)
  if (Number.isNaN(publishAt)) return true
  return Date.now() >= publishAt
}

function readAll(): { meta: PostMeta; content: string }[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      meta: {
        slug: data.slug || fileName.replace(/\.md$/, ''),
        title: data.title,
        description: data.description,
        date: data.date,
      },
      content,
    }
  })
}

export function getAllPosts(): PostMeta[] {
  const published = readAll()
    .map(p => p.meta)
    .filter(p => isPublished(p.date))

  // Newest dated posts first, then the undated library in its existing order.
  const dated = published.filter(p => p.date).sort((a, b) => (a.date! < b.date! ? 1 : -1))
  const undated = published.filter(p => !p.date)
  return [...dated, ...undated]
}

export function getScheduledPosts(): PostMeta[] {
  return readAll()
    .map(p => p.meta)
    .filter(p => p.date && !isPublished(p.date))
    .sort((a, b) => (a.date! < b.date! ? -1 : 1))
}

// Posts cross-link each other, and a scheduled post may be referenced by one
// that goes live earlier. Rather than 404 the reader, demote links to
// not-yet-published posts to plain text. They become links again on their own
// date, when the page next re-renders.
function demoteUnpublishedLinks(contentHtml: string): string {
  const published = new Set(getAllPosts().map(p => p.slug))
  return contentHtml.replace(
    /<a href="\/blog\/([a-z0-9-]+)">([\s\S]*?)<\/a>/g,
    (full, linkSlug, text) => (published.has(linkSlug) ? full : text)
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const match = readAll().find(p => p.meta.slug === slug)
  if (!match || !isPublished(match.meta.date)) return null
  const processed = await remark().use(html).process(match.content)
  return { ...match.meta, contentHtml: demoteUnpublishedLinks(processed.toString()) }
}

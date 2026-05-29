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
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: data.slug || slug,
      title: data.title,
      description: data.description,
    }
  })
  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const postSlug = data.slug || fileName.replace(/\.md$/, '')
    if (postSlug === slug) {
      const processed = await remark().use(html).process(content)
      return {
        slug: postSlug,
        title: data.title,
        description: data.description,
        contentHtml: processed.toString(),
      }
    }
  }
  return null
}

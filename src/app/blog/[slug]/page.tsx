import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">
        ← All posts
      </Link>
      <article>
        <header className="mb-10">
          <p className="text-xs text-gray-400 mb-3">{post.date}</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">{post.description}</p>
        </header>
        <div
          className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-gray-900 prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
      <div className="mt-16 pt-8 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-4">
          Managing feeding for multiple cats? Aiwan makes it effortless.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Learn about Aiwan →
        </Link>
      </div>
    </div>
  );
}

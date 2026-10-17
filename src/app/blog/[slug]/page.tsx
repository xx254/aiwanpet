import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// Re-render hourly so scheduled posts go live on their date without a redeploy.
export const revalidate = 3600;

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
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <header className="bg-mist">
        <div className="max-w-3xl mx-auto px-5 py-14">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-ink transition-colors mb-6 inline-block"
          >
            ← All articles
          </Link>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed">{post.description}</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-14">
        <article
          className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-brand-dark prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <aside className="mt-16 bg-mist rounded-md p-8">
          <p className="text-[15px] leading-relaxed mb-5 max-w-lg">
            Feeding two cats two different diets? The Aiwan shield opens only for
            the cat wearing the registered RFID tag.
          </p>
          <Link
            href="/"
            className="inline-block bg-brand text-white px-6 py-3 rounded-sm text-sm font-medium hover:bg-brand-dark transition-colors"
          >
            See how Aiwan works
          </Link>
        </aside>
      </div>
    </>
  );
}

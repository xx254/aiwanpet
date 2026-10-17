import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

// Re-render hourly so scheduled posts go live on their date without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cat Care Blog",
  description:
    "Tips on multi-cat feeding, prescription diets, weight management, and selective RFID feeders — from the Aiwan team.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <header className="bg-mist">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
            Learn
          </h1>
          <p className="text-muted max-w-xl leading-relaxed">
            Practical advice for multi-cat households, prescription diets, and
            healthy feeding.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full border border-line rounded-md p-7 hover:border-ink/40 transition-colors"
              >
                <h2 className="text-lg font-semibold leading-snug mb-2 group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-[15px] text-muted leading-relaxed">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-brand-dark">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

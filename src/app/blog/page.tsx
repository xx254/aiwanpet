import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat Care Blog",
  description:
    "Tips on multi-cat feeding, prescription diets, weight management, and microchip feeders — from the Aiwan team.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Cat Care Blog</h1>
      <p className="text-gray-500 mb-12">
        Practical advice for multi-cat households, prescription diets, and healthy feeding.
      </p>
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <article key={post.slug} className="py-8">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold group-hover:text-gray-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                {post.description}
              </p>
              <span className="inline-block mt-3 text-sm font-medium text-gray-900 group-hover:underline">
                Read more →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

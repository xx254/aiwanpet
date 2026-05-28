import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
          The right cat eats the right food.
          <br />
          <span className="text-gray-400">Every single time.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Aiwan is a microchip-activated food shield that fits over any bowl or
          automatic feeder. Only the cat with the right chip gets in — everyone
          else is locked out.
        </p>
        <Link
          href="/#product"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
        >
          Learn more
        </Link>
      </section>

      {/* Use cases */}
      <section className="bg-gray-50 py-16" id="product">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Built for real multi-cat challenges
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: "💊",
                title: "Prescription diets",
                desc: "Keep kidney, diabetic, or allergy food away from healthy cats — no separate rooms needed.",
              },
              {
                icon: "⚖️",
                title: "Weight management",
                desc: "Calorie-controlled portions stay protected. Your overweight cat eats its diet; others eat theirs.",
              },
              {
                icon: "🐱",
                title: "Multi-cat households",
                desc: "No more food stealing. Each cat is enrolled to its own shield, no supervision required.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">How Aiwan works</h2>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            { step: "1", title: "Place the shield", desc: "Aiwan fits over your existing bowl or automatic feeder. No new hardware to learn." },
            { step: "2", title: "Enroll your cat", desc: "Hold your cat near the shield to register its microchip. Takes under a minute." },
            { step: "3", title: "Done", desc: "The shield opens only for the enrolled cat. All other animals are locked out automatically." },
          ].map((item) => (
            <div key={item.step}>
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent blog posts */}
      {posts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">From the blog</h2>
              <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                  <h3 className="font-semibold text-sm leading-snug mb-2">{post.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Aiwan — RFID Cat Food Shield",
    template: "%s | Aiwan",
  },
  description:
    "Aiwan's RFID food shield opens only for the cat wearing the registered collar tag — built for multi-cat households, prescription diets, and weight management.",
  metadataBase: new URL("https://www.aiwanpet.com"),
};

const nav = [
  { href: "/#how", label: "How it works" },
  { href: "/#product", label: "The shield" },
  { href: "/blog", label: "Learn" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-ink">
        {/* Announcement bar */}
        <div className="bg-brand text-white text-center text-[13px] py-2.5 px-4">
          One shield per cat. No separate rooms, no standing guard.
        </div>

        <header>
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-bold tracking-[0.12em] uppercase shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="" width={28} height={28} className="w-7 h-7" />
              Aiwan
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-ink">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-brand-dark transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/#product"
              className="bg-brand text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-soft hover:bg-brand-dark transition-colors"
            >
              Get Aiwan
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-ink text-white/70 mt-24 rounded-t-[36px]">
          <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="text-white text-lg font-bold tracking-[0.12em] uppercase mb-3">
                Aiwan
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                An RFID food shield for homes where one cat eats the wrong bowl.
              </p>
            </div>
            <div className="text-sm">
              <div className="text-white font-medium mb-3">Product</div>
              <ul className="space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-sm">
              <div className="text-white font-medium mb-3">Site</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Cat care blog
                  </Link>
                </li>
                <li>aiwanpet.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="max-w-6xl mx-auto px-5 py-5 text-xs">
              © 2026 Aiwan. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

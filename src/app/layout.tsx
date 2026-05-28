import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Aiwan — Smart Cat Food Shield",
    template: "%s | Aiwan",
  },
  description:
    "Aiwan's microchip cat food shield lets only the right cat eat the right food — perfect for multi-cat households, prescription diets, and weight management.",
  metadataBase: new URL("https://aiwanpet.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <header className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Aiwan
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/blog" className="hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link
                href="/#product"
                className="bg-gray-900 text-white px-4 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
              >
                Get Aiwan
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 mt-24">
          <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-400 flex items-center justify-between">
            <span>© 2026 Aiwan. All rights reserved.</span>
            <span>aiwanpet.com</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

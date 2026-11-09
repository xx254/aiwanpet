import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're in",
  robots: { index: false },
};

export default function ReserveThanks() {
  return (
    <section className="max-w-xl mx-auto px-5 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight mb-4">You&apos;re on the list.</h1>
      <p className="text-muted leading-relaxed mb-3">
        Thank you. Your $5 reservation is in, and it comes off as $50 when the Aiwan
        shield launches. Stripe will email your receipt.
      </p>
      <p className="text-muted leading-relaxed mb-8">
        Changed your mind? Reply to that receipt or write to raison@aiwanpet.com and
        we&apos;ll refund you in full before launch.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-brand-dark transition-colors"
      >
        Back to Aiwan
      </Link>
    </section>
  );
}

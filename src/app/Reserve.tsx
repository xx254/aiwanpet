"use client";

import { useState } from "react";

// "Reserve for $5" button. Starts a Stripe Checkout Session and sends the visitor there.
export default function Reserve() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onClick() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="w-full bg-brand text-white text-[15px] font-medium px-6 py-3.5 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60"
      >
        {busy ? "Opening checkout…" : "Reserve yours for $5"}
      </button>
      {error && (
        <p className="mt-2 text-sm text-brand-dark" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 text-[13px] text-muted">
        Secure payment by Stripe. Fully refundable before launch.
      </p>
    </div>
  );
}

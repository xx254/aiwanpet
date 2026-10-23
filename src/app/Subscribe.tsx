"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

// Email sign-up form. `tone` picks colours for light or dark backgrounds.
export default function Subscribe({
  source,
  tone = "light",
}: {
  source: string;
  tone?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const company = (new FormData(e.currentTarget).get("company") as string) || "";
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
      setMessage(data.already ? "You're already on the list. Thank you!" : "You're on the list. We'll be in touch.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const dark = tone === "dark";

  if (status === "done") {
    return (
      <p className={`text-[15px] font-medium ${dark ? "text-white" : "text-ink"}`} role="status">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 align-middle" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
      <div
        className={`flex items-center gap-2 p-1.5 rounded-full border ${
          dark ? "bg-white/10 border-white/30 backdrop-blur-sm" : "bg-white border-line shadow-soft"
        }`}
      >
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 min-w-0 bg-transparent px-4 py-2 text-[15px] outline-none ${
            dark ? "text-white placeholder:text-white/60" : "text-ink placeholder:text-muted/70"
          }`}
        />
        {/* Honeypot for bots: hidden from people and screen readers. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 bg-brand text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className={`mt-2 text-sm ${dark ? "text-orange-200" : "text-brand-dark"}`} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}

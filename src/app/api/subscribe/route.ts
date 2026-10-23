import { createHash } from "crypto";
import { head, put } from "@vercel/blob";

// Saves one private JSON file per subscriber in the "aiwan-subscribers" Blob store.
// The file name is a hash of the email, so the same person signing up twice is a no-op.
// Export the list with: node scripts/export-subscribers.mjs

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  const source = typeof body.source === "string" ? body.source.slice(0, 80) : "unknown";

  const pathname = `subscribers/${createHash("sha256").update(email).digest("hex")}.json`;

  try {
    await head(pathname);
    return Response.json({ ok: true, already: true });
  } catch {
    // not found: new subscriber
  }

  try {
    await put(
      pathname,
      JSON.stringify({
        email,
        source,
        createdAt: new Date().toISOString(),
        country: request.headers.get("x-vercel-ip-country") ?? null,
      }),
      { access: "private", contentType: "application/json", addRandomSuffix: false },
    );
  } catch (err) {
    console.error("subscribe: blob put failed", err);
    return Response.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}

// Export the email subscriber list to CSV.
// Usage (from the repo root): vercel env pull .env.local && node --env-file=.env.local scripts/export-subscribers.mjs > subscribers.csv
import { list, get } from "@vercel/blob";

const rows = [];
let cursor;
do {
  const page = await list({ prefix: "subscribers/", cursor });
  for (const b of page.blobs) {
    const res = await get(b.pathname, { access: "private" });
    if (!res) continue;
    const text = await new Response(res.stream).text();
    rows.push(JSON.parse(text));
  }
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

rows.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
console.log("email,source,country,createdAt");
for (const r of rows) console.log([r.email, r.source, r.country, r.createdAt].map(esc).join(","));
console.error(`${rows.length} subscribers`);

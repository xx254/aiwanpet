// Creates a Stripe Checkout Session for the $5 pre-sale reservation and returns its URL.
// Uses Stripe's REST API directly, so no SDK dependency is needed.
// Needs STRIPE_SECRET_KEY (test key sk_test_… while testing, live key sk_live_… to take real money).

const PRICE_CENTS = 500;

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return Response.json({ ok: false, error: "Reservations are not open yet." }, { status: 503 });
  }

  let email = "";
  try {
    const body = await request.json();
    if (typeof body.email === "string") email = body.email.trim().toLowerCase();
  } catch {
    // email is optional; Checkout will ask for it
  }
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;

  const origin = new URL(request.url).origin;
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", `${origin}/reserve/thanks`);
  form.set("cancel_url", `${origin}/#reserve`);
  form.set("line_items[0][quantity]", "1");
  form.set("line_items[0][price_data][currency]", "usd");
  form.set("line_items[0][price_data][unit_amount]", String(PRICE_CENTS));
  form.set("line_items[0][price_data][product_data][name]", "Aiwan shield pre-sale reservation");
  form.set(
    "line_items[0][price_data][product_data][description]",
    "$5 reserves your place and gets you $50 off when the Aiwan shield launches. Fully refundable before launch.",
  );
  form.set("payment_intent_data[description]", "Aiwan pre-sale reservation");
  form.set("payment_intent_data[statement_descriptor]", "AIWAN PRESALE");
  form.set("metadata[kind]", "presale-reservation");
  if (validEmail) form.set("customer_email", email);

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || typeof data.url !== "string") {
    console.error("reserve: stripe checkout failed", res.status, data?.error?.message);
    return Response.json({ ok: false, error: "Could not start checkout. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true, url: data.url });
}

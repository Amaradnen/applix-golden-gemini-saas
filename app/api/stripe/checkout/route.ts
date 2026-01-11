import Stripe from "stripe";
import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/server";

type Item = {
  name: string;
  unit_amount: number; // in cents
  quantity: number;
};

export async function POST(req: Request) {
  const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
    apiVersion: "2024-06-20",
  });

  const body = await req.json().catch(() => null) as
    | { customer_email?: string; items: Item[]; currency?: string }
    | null;

  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const currency = (body.currency || "eur").toLowerCase();

  // Create a pending order in Supabase
  const sb = supabaseAdmin();
  const subtotal = body.items.reduce((s, it) => s + it.unit_amount * it.quantity, 0);
  const { data: order, error: orderErr } = await sb
    .from("orders")
    .insert({
      customer_email: body.customer_email || null,
      currency,
      amount_subtotal: subtotal,
      amount_total: subtotal,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }

  // Insert order items
  const itemsInsert = body.items.map((it) => ({
    order_id: order.id,
    name: it.name,
    unit_amount: it.unit_amount,
    quantity: it.quantity,
  }));

  const { error: itemsErr } = await sb.from("order_items").insert(itemsInsert);
  if (itemsErr) {
    // best effort cleanup
    await sb.from("orders").delete().eq("id", order.id);
    return NextResponse.json({ error: "Failed to create order items" }, { status: 500 });
  }

  const appUrl = requireEnv("NEXT_PUBLIC_APP_URL");
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: body.customer_email,
    line_items: body.items.map((it) => ({
      price_data: {
        currency,
        product_data: { name: it.name },
        unit_amount: it.unit_amount,
      },
      quantity: it.quantity,
    })),
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/checkout/cancel`,
    metadata: { order_id: String(order.id) },
  });

  // Save Stripe session
  await sb.from("orders").update({ stripe_session_id: session.id }).eq("id", order.id);

  return NextResponse.json({ url: session.url, order_id: order.id });
}

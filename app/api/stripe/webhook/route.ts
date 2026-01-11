import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
    apiVersion: "2024-06-20",
  });

  const sig = (await headers()).get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = Buffer.from(await req.arrayBuffer());
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      requireEnv("STRIPE_WEBHOOK_SECRET")
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const sb = supabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;
    if (orderId) {
      await sb
        .from("orders")
        .update({
          status: "paid",
          stripe_payment_intent_id: session.payment_intent ?? null,
          paid_at: new Date().toISOString(),
        })
        .eq("id", orderId);
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;
    if (orderId) {
      await sb.from("orders").update({ status: "expired" }).eq("id", orderId);
    }
  }

  return NextResponse.json({ received: true });
}

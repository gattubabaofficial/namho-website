import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key", {
  apiVersion: "2025-01-27-accursed-date-placeholder" as any, // Bypass version strict check
});

export async function POST(req: Request) {
  try {
    const { priceId, userId, planName, email } = await req.json();

    if (!priceId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Determine Stripe mode based on price/plan
    const mode = planName?.toLowerCase().includes("pro") ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      metadata: {
        userId: userId,
        planName: planName || "Pro",
        email: email || "",
      },
      customer_email: email || undefined,
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

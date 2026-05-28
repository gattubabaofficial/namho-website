import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-01-27-accursed-date-placeholder" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // Direct parsing for testing/dev environments where webhook secret is not set
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata?.userId;
    const planName = session.metadata?.planName || "Pro";
    const email = session.metadata?.email || session.customer_email || "";

    if (userId) {
      try {
        // Initialize Supabase Client with Service Role Key to bypass RLS
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Fetch current token balance
        const { data: balanceData } = await supabase
          .from("token_balances")
          .select("balance")
          .eq("user_id", userId)
          .single();

        const currentBalance = balanceData?.balance || 0;
        
        // Define tokens based on plan
        let tokensToAdd = 0;
        if (planName.toLowerCase().includes("pro")) {
          tokensToAdd = 1000;
        } else if (planName.toLowerCase().includes("starter")) {
          tokensToAdd = 5;
        }

        const newBalance = currentBalance + tokensToAdd;

        // Update token balance in Supabase
        const { error: supabaseError } = await supabase
          .from("token_balances")
          .update({
            balance: newBalance,
            last_refill_date: new Date().toISOString(),
          })
          .eq("user_id", userId);

        if (supabaseError) {
          console.error("Failed to update token balance in Supabase:", supabaseError);
        }

        // Call FastAPI backend to log transaction in SQLite
        const backendRes = await fetch("http://localhost:8000/api/v1/payments/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            email: email,
            stripe_session_id: session.id,
            amount_total: session.amount_total || 0,
            currency: session.currency || "usd",
            status: "paid",
            plan_name: planName,
          }),
        });

        if (!backendRes.ok) {
          const backendErr = await backendRes.text();
          console.error("Failed to log transaction in FastAPI backend:", backendErr);
        }

      } catch (err) {
        console.error("Error processing checkout session webhook:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
export const dynamic = "force-dynamic";

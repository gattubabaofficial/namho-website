"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function checkAndRefillTokens() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  // 1. Fetch current balance
  const { data, error } = await supabase
    .from("token_balances")
    .select("balance, last_refill_date")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return { success: false, message: "Could not fetch tokens" };
  }

  // 2. Check time difference
  const lastRefill = new Date(data.last_refill_date).getTime();
  const now = new Date().getTime();
  const hoursSinceRefill = (now - lastRefill) / (1000 * 60 * 60);

  if (hoursSinceRefill >= 24) {
    // Need a refill!
    const { error: updateError } = await supabase
      .from("token_balances")
      .update({
        balance: 5,
        last_refill_date: new Date().toISOString()
      })
      .eq("user_id", user.id);

    if (updateError) {
      return { success: false, message: "Failed to refill tokens" };
    }
    
    return { success: true, balance: 5, refilled: true };
  }

  return { success: true, balance: data.balance, refilled: false };
}

export async function runAutomationTool(toolId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  // Double check balance before deduction
  const { data, error } = await supabase
    .from("token_balances")
    .select("balance")
    .eq("user_id", user.id)
    .single();

  if (error || !data || data.balance <= 0) {
    return { success: false, message: "Not enough tokens" };
  }

  // MOCK: Simulate running an AI model (e.g. 2s delay)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Deduct token
  const newBalance = data.balance - 1;
  const { error: updateError } = await supabase
    .from("token_balances")
    .update({ balance: newBalance })
    .eq("user_id", user.id);

  if (updateError) {
    return { success: false, message: "Token deduction failed" };
  }

  // Revalidate the pages to reflect the new balance immediately
  revalidatePath("/dashboard");
  revalidatePath(`/automations/${toolId}`);

  return { 
    success: true, 
    message: "Automation ran successfully!",
    newBalance,
    mockResult: `Generated specific asset via NAMHO AI model [${toolId}]`
  };
}

import { createClient } from "@/lib/supabase-server";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Fetch token balance
  const { data: balanceData } = await supabase
    .from("token_balances")
    .select("balance, last_refill_date")
    .eq("user_id", user.id)
    .single();

  const tokens = balanceData?.balance || 0;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bricolage font-medium mb-2">Welcome Back.</h1>
            <p className="text-white/50">{user.email}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex flex-col items-end">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-1">Available Tokens</span>
              <div className="flex items-center gap-2">
                {/* @ts-expect-error */}
                <iconify-icon icon="solar:star-fall-minimalistic-bold-duotone" width="24" className="text-emerald-400"></iconify-icon>
                <span className="text-3xl font-bricolage font-bold">{tokens}</span>
              </div>
            </div>
            
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-colors">
                {/* @ts-expect-error */}
                <iconify-icon icon="solar:logout-2-outline" width="20"></iconify-icon>
              </button>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <h2 className="text-xl font-medium mb-6">Your Automations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tile 1 */}
          <Link href="/automations/ugc-ad-generator" className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              {/* @ts-expect-error */}
              <iconify-icon icon="solar:video-frame-bold-duotone" width="24"></iconify-icon>
            </div>
            <h3 className="font-medium mb-1 group-hover:text-blue-400 transition-colors">UGC Ad Generator</h3>
            <p className="text-sm text-white/50">Create converting TikTok/Meta ads instantly.</p>
          </Link>

          {/* Tile 2 */}
          <Link href="/automations/hyper-realistic-image" className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              {/* @ts-expect-error */}
              <iconify-icon icon="solar:gallery-bold-duotone" width="24"></iconify-icon>
            </div>
            <h3 className="font-medium mb-1 group-hover:text-purple-400 transition-colors">Image Generator</h3>
            <p className="text-sm text-white/50">High fidelity visual asset generation.</p>
          </Link>
        </div>

      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { checkAndRefillTokens, runAutomationTool } from "@/app/actions/automations";
import { useRouter } from "next/navigation";

export default function AutomationToolPage({ params }: { params: { toolId: string } }) {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Mapping simple tool names (in a real app, this would be fetched from a DB or config)
  const toolName = params.toolId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  useEffect(() => {
    async function initTool() {
      const res = await checkAndRefillTokens();
      if (!res.success) {
        if (res.message === "Unauthorized") {
          router.push("/login"); // Force login if accessing directly
        } else {
          setError(res.message || "An error occurred");
        }
      } else {
        setBalance(res.balance);
      }
      setLoading(false);
    }
    initTool();
  }, [router]);

  const handleRun = async () => {
    if (balance === null || balance <= 0) return;
    
    setRunning(true);
    setError(null);
    setResult(null);

    const res = await runAutomationTool(params.toolId);
    
    if (res.success) {
      setBalance(res.newBalance ?? null);
      setResult(res.mockResult || "Success");
    } else {
      setError(res.message || "An error occurred");
    }
    
    setRunning(false);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <button 
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
        >
          {/* @ts-expect-error */}
          <iconify-icon icon="solar:arrow-left-linear" width="16"></iconify-icon>
          Back to Dashboard
        </button>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-bricolage font-medium mb-2">{toolName}</h1>
              <p className="text-white/50">Run this automation using your available tokens.</p>
            </div>
            
            <div className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-center shrink-0">
              <span className="block text-xs uppercase tracking-widest text-white/40 mb-1">Your Tokens</span>
              {loading ? (
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin mx-auto"></div>
              ) : (
                <span className={`text-3xl font-bricolage font-bold ${balance && balance > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {balance}
                </span>
              )}
            </div>
          </div>

          {!loading && balance !== null && balance <= 0 && (
             <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8 relative z-10">
               <h3 className="text-red-400 font-medium mb-1 flex items-center gap-2">
                 {/* @ts-expect-error */}
                 <iconify-icon icon="solar:danger-triangle-bold-duotone" width="20"></iconify-icon>
                 Out of Tokens for Today
               </h3>
               <p className="text-white/60 text-sm">
                 You've used all 5 of your daily free tokens. They will automatically refill 24 hours after your last reset. Come back tomorrow!
               </p>
             </div>
          )}

          <div className="h-64 border border-white/5 bg-black/50 rounded-2xl flex items-center justify-center relative z-10 mb-8 overflow-hidden">
             {running ? (
               <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
                 <div className="w-12 h-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin"></div>
                 <p className="text-emerald-400 text-sm font-mono animate-pulse">Running {toolName} AI Logic...</p>
                 <p className="text-white/30 text-xs">-1 Token</p>
               </div>
             ) : result ? (
               <div className="p-8 text-center animate-in zoom-in duration-300">
                 <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                   {/* @ts-expect-error */}
                   <iconify-icon icon="solar:check-circle-bold-duotone" width="32"></iconify-icon>
                 </div>
                 <p className="text-lg text-white mb-2">{result}</p>
                 <button onClick={() => setResult(null)} className="text-sm text-white/50 hover:text-white underline">Run Again?</button>
               </div>
             ) : (
               <div className="text-white/20 flex flex-col items-center">
                 {/* @ts-expect-error */}
                 <iconify-icon icon="solar:magic-stick-3-bold-duotone" width="48" className="mb-4"></iconify-icon>
                 <p>Ready to process</p>
               </div>
             )}
          </div>

          {error && <p className="text-red-400 text-sm text-center mb-6 relative z-10">{error}</p>}

          <button 
            onClick={handleRun}
            disabled={loading || running || balance === null || balance <= 0}
            className="w-full bg-white hover:bg-neutral-200 text-black font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-3 disabled:opacity-30 relative z-10"
          >
            {/* @ts-expect-error */}
            <iconify-icon icon="solar:play-circle-bold" width="24"></iconify-icon>
            Run Automation (Cost: 1 Token)
          </button>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </main>
  );
}

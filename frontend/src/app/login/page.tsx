"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (isSignUp) {
        // Sign Up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        setStatus("success");
        // Instruct user to check email if confirm required, but for simplicity let's redirect
        router.push("/dashboard");

      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white flex items-center justify-center relative overflow-hidden">
      <Navigation />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        
        <div className="mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black mx-auto mb-6">
            {/* @ts-expect-error */}
            <iconify-icon icon="solar:lock-keyhole-bold-duotone" width="24"></iconify-icon>
          </div>
          <h1 className="text-3xl font-bricolage font-medium mb-2">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-white/50 text-sm">
            {isSignUp ? "Join NAMHO AI to access advanced automations." : "Log in to access your AI automations."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm border border-red-500/20 bg-red-500/10 rounded-lg p-3">
              {errorMessage}
            </p>
          )}

          {status === "success" && isSignUp && (
            <p className="text-emerald-400 text-sm border border-emerald-500/20 bg-emerald-500/10 rounded-lg p-3">
              Check your email to confirm your account, or just try logging in!
            </p>
          )}

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full mt-6 bg-white hover:bg-neutral-200 text-black font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === "loading" ? "Processing..." : (isSignUp ? "Sign Up" : "Log In")}
            {status !== "loading" && (
              <>
                {/* @ts-expect-error */}
                <iconify-icon icon="solar:arrow-right-linear" width="20"></iconify-icon>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage("");
            }}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            {isSignUp ? "Already have an account? Log in." : "Don't have an account? Sign up."}
          </button>
        </div>
      </div>
    </main>
  );
}

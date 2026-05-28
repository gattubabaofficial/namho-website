"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/context/AppContext";

const staticPricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for testing the waters and exploring our AI capabilities.",
    tokens: "5 Tokens / Day",
    features: [
      "Access to all AI Automation Tools",
      "Standard processing speed",
      "Community Discord support",
      "Basic generations history"
    ],
    buttonText: "Start for Free",
    buttonLink: "/login",
    popular: false,
    color: "from-blue-500 to-cyan-400",
    stripePriceId: ""
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For creators and agencies scaling their content production.",
    tokens: "1,000 Tokens / Month",
    features: [
      "Everything in Starter, plus:",
      "Priority processing speed",
      "No watermarks on video exports",
      "Commercial usage rights",
      "Dedicated Discord channel support"
    ],
    buttonText: "Upgrade to Pro",
    buttonLink: "/api/stripe/checkout?priceId=pro",
    popular: true,
    color: "from-emerald-500 to-teal-400",
    stripePriceId: "prod_QLr123456789"
  },
  {
    name: "Agency",
    price: "Custom",
    description: "For businesses requiring tailored integrations and high-volume workloads.",
    tokens: "Unlimited Tokens",
    features: [
      "Everything in Pro, plus:",
      "Custom API endpoints integration",
      "Dedicated developer support",
      "SLA uptime guarantees",
      "Custom models training"
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact",
    popular: false,
    color: "from-purple-500 to-pink-500",
    stripePriceId: ""
  }
];

export default function PricingPage() {
  const { pricingTiers } = useAppContext();
  const [annualBilling, setAnnualBilling] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const tiers = pricingTiers && pricingTiers.length > 0 ? pricingTiers : staticPricingTiers;

  // Load user session
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, [supabase]);

  const handleCheckout = async (tier: any) => {
    // Standard redirection if free or custom
    if (tier.price.toLowerCase().includes("free")) {
      router.push("/login");
      return;
    }
    if (tier.price.toLowerCase().includes("custom") || !tier.stripePriceId) {
      router.push("/contact");
      return;
    }

    // Require authentication
    if (!user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    setLoadingTier(tier.name);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: tier.stripePriceId,
          userId: user.id,
          planName: tier.name,
          email: user.email,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      console.error("Checkout redirection failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      {/* Header Section */}
      <div suppressHydrationWarning className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="text-xs uppercase tracking-widest text-emerald-500 font-mono">Simple & Transparent</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bricolage font-medium tracking-tighter mb-6 relative">
          Pricing that scales with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">you.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
          Unlock the full power of NAMHO AI. Choose the plan that fits your growth architecture.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 text-sm font-medium">
          <span className={`transition-colors ${!annualBilling ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <button 
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-14 h-7 rounded-full bg-white/10 border border-white/20 p-1 relative transition-colors hover:bg-white/20"
          >
            <div className={`w-5 h-5 rounded-full bg-emerald-400 transition-transform duration-300 absolute top-1 ${annualBilling ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center gap-2">
            <span className={`transition-colors ${annualBilling ? 'text-white' : 'text-white/40'}`}>Annually</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">Save 20%</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div suppressHydrationWarning className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              suppressHydrationWarning
              className={`relative rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-500 ${
                tier.popular 
                  ? 'bg-neutral-900 border border-emerald-500/50 shadow-2xl shadow-emerald-500/10 md:-translate-y-4' 
                  : 'bg-white/5 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute top-0 inset-x-0 flex justify-center translate-y-[-50%] z-10">
                  <span className="bg-emerald-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20 translate-y-4">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Background Glow */}
              <div className={`absolute -right-32 -top-32 w-64 h-64 bg-gradient-to-br ${tier.color} opacity-10 blur-[100px] rounded-full`}></div>

              <div className="relative z-10 flex-1">
                <h3 className="text-xl font-bricolage font-medium text-white/70 mb-2">{tier.name}</h3>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bricolage font-bold tracking-tight">
                    {annualBilling && tier.price.includes('$') 
                      ? `$${Math.round(parseInt(tier.price.replace('$', '')) * 0.8)}` 
                      : tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-white/50 text-sm">{tier.period}</span>
                  )}
                </div>

                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-emerald-400 font-medium mb-6">
                  {tier.tokens}
                </div>

                <p className="text-sm text-white/60 mb-8 border-b border-white/10 pb-8 h-[88px] flex items-center">
                  {tier.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature: string, fIndex: number) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm text-white/80">
                      <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        {/* @ts-expect-error */}
                        <iconify-icon icon="solar:check-circle-bold" width="16"></iconify-icon>
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <button 
                  onClick={() => handleCheckout(tier)}
                  disabled={loadingTier === tier.name}
                  className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                    tier.popular
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                  } disabled:opacity-50`}
                >
                  {loadingTier === tier.name ? "Redirecting..." : tier.buttonText}
                  {loadingTier !== tier.name && (
                    /* @ts-expect-error */
                    <iconify-icon icon="solar:arrow-right-linear" width="18" className="transform group-hover/btn:translate-x-1 transition-transform"></iconify-icon>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

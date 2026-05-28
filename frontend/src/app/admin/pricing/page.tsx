"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  tokens: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  popular: boolean;
  color: string;
  stripePriceId: string;
}

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadPricing() {
      try {
        const res = await adminFetch("/settings/pricing_tiers");
        if (res.ok) {
          const data = await res.json();
          if (data.value) {
            setPlans(JSON.parse(data.value));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPricing();
  }, []);

  const handleChange = (index: number, field: keyof PricingPlan, value: any) => {
    setPlans(prev =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleFeaturesChange = (index: number, value: string) => {
    const list = value.split(",").map(f => f.trim());
    handleChange(index, "features", list);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await adminFetch("/settings/pricing_tiers", {
        method: "PUT",
        body: JSON.stringify({
          value: JSON.stringify(plans),
          type: "json",
          description: "Stripe subscription packages config JSON",
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save plans settings");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bricolage font-medium mb-1">Pricing Tiers Configurator</h1>
        <p className="text-white/50 text-sm">Configure subscription plan titles, pricing rates, tokens awarded, features, and bind Stripe Price IDs.</p>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm">Loading pricing plans...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`bg-white/5 border rounded-3xl p-6 space-y-4 relative ${
                  plan.popular ? "border-emerald-500/40 shadow-xl" : "border-white/10"
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-lg font-bricolage font-bold text-white">{plan.name} Plan</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id={`popular-${index}`}
                      checked={plan.popular}
                      onChange={(e) => handleChange(index, "popular", e.target.checked)}
                      className="rounded border-white/10 bg-black text-emerald-500"
                    />
                    <label htmlFor={`popular-${index}`} className="text-xs text-white/50 font-medium">Popular</label>
                  </div>
                </div>

                {/* Plan Name & Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-white/40 mb-1">Plan Name</label>
                    <input
                      type="text"
                      required
                      value={plan.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-white/40 mb-1">UI Color (Gradient)</label>
                    <input
                      type="text"
                      required
                      value={plan.color}
                      onChange={(e) => handleChange(index, "color", e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50 text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Price, Period, and Tokens */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase text-white/40 mb-1">Rate ($)</label>
                    <input
                      type="text"
                      required
                      value={plan.price}
                      onChange={(e) => handleChange(index, "price", e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-white/40 mb-1">Period</label>
                    <input
                      type="text"
                      value={plan.period}
                      onChange={(e) => handleChange(index, "period", e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                      placeholder="/month"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-white/40 mb-1">Token Quota</label>
                    <input
                      type="text"
                      required
                      value={plan.tokens}
                      onChange={(e) => handleChange(index, "tokens", e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] uppercase text-white/40 mb-1">Description Paragraph</label>
                  <textarea
                    rows={2}
                    required
                    value={plan.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                  />
                </div>

                {/* Stripe Price ID */}
                <div>
                  <label className="block text-[10px] uppercase text-white/40 mb-1">Stripe Price ID</label>
                  <input
                    type="text"
                    value={plan.stripePriceId}
                    onChange={(e) => handleChange(index, "stripePriceId", e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-emerald-400 focus:outline-none focus:border-emerald-500/50 text-sm font-mono"
                    placeholder="price_1..."
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-[10px] uppercase text-white/40 mb-1">Features (Comma-separated)</label>
                  <textarea
                    rows={3}
                    required
                    value={plan.features.join(", ")}
                    onChange={(e) => handleFeaturesChange(index, e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50 text-xs leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div>
              {success && (
                <span className="text-emerald-400 text-sm flex items-center gap-2">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon>
                  Pricing tiers layout successfully updated.
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] disabled:opacity-50"
            >
              {saving ? "Updating pricing database..." : "Apply Price Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

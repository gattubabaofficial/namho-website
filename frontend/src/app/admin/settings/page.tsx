"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

interface Setting {
  key: string;
  value: string;
  type: string;
  description: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await adminFetch("/settings");
        if (res.ok) {
          const data = await res.json();
          // Filter out pricing_tiers as it has its own dedicated editor
          setSettings(data.filter((s: Setting) => s.key !== "pricing_tiers"));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev =>
      prev.map(s => (s.key === key ? { ...s, value } : s))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await Promise.all(
        settings.map(s =>
          adminFetch(`/settings/${s.key}`, {
            method: "PUT",
            body: JSON.stringify({
              value: s.value,
              type: s.type,
              description: s.description,
            }),
          })
        )
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  // Human-readable labels mapping
  const labels: Record<string, string> = {
    company_name: "Company Name",
    contact_email: "Contact Email",
    contact_phone: "Contact Phone",
    contact_address: "Company Location / Address",
    hero_headline: "Hero Headline (Primary text in large letters)",
    hero_tagline: "Hero Description (The paragraph text in Hero box)",
    hero_cta_text: "Hero CTA Link Text (e.g. View Case Studies)",
    footer_tagline: "Footer Headline / Tagline",
    hero_uptime: "Display Server Uptime (e.g. 99.99%)",
    hero_model_version: "Display AI Model Version (e.g. v4.0 Active)",
    operational_version: "Footer Systems Version (e.g. v2.0.1)",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bricolage font-medium mb-1">Site Global Copy CMS</h1>
        <p className="text-white/50 text-sm">Update text values dynamically across the headers, footers, contact information, and hero areas.</p>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm">Loading site settings...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl">
          <div className="space-y-6 divide-y divide-white/5">
            {settings.map((s, idx) => (
              <div key={s.key} className={`pt-6 ${idx === 0 ? "pt-0 border-t-0" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-white block">
                      {labels[s.key] || s.key.replace("_", " ")}
                    </label>
                    <span className="text-xs font-mono text-white/30 block mt-1">Key: {s.key}</span>
                  </div>
                  <div className="md:col-span-2">
                    {s.value && s.value.length > 80 ? (
                      <textarea
                        rows={3}
                        value={s.value}
                        onChange={(e) => handleChange(s.key, e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm leading-relaxed"
                      />
                    ) : (
                      <input
                        type="text"
                        value={s.value || ""}
                        onChange={(e) => handleChange(s.key, e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div>
              {success && (
                <span className="text-emerald-400 text-sm flex items-center gap-2">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon>
                  Site settings successfully saved & pushed live!
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] disabled:opacity-50"
            >
              {saving ? "Pushing updates..." : "Save Copy Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

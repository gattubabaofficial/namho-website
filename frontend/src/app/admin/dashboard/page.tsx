"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    faqs: 0,
    settings: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [servicesRes, projectsRes, faqsRes, settingsRes, paymentsRes] = await Promise.all([
          adminFetch("/services"),
          adminFetch("/projects"),
          adminFetch("/faqs"),
          adminFetch("/settings"),
          adminFetch("/payments/transactions"),
        ]);

        const servicesData = servicesRes.ok ? await servicesRes.json() : { total: 0 };
        const projectsData = projectsRes.ok ? await projectsRes.json() : { total: 0 };
        const faqsData = faqsRes.ok ? await faqsRes.json() : [];
        const settingsData = settingsRes.ok ? await settingsRes.json() : [];
        const paymentsData = paymentsRes.ok ? await paymentsRes.json() : [];

        setStats({
          services: servicesData.total || (Array.isArray(servicesData) ? servicesData.length : 0),
          projects: projectsData.total || (Array.isArray(projectsData) ? projectsData.length : 0),
          faqs: faqsData.length || 0,
          settings: settingsData.length || 0,
          payments: paymentsData.length || 0,
        });
      } catch (err) {
        console.error("Error loading admin dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statsList = [
    { name: "Services", value: stats.services, icon: "solar:case-outline", color: "text-blue-400", bg: "bg-blue-500/10", href: "/admin/services" },
    { name: "Projects", value: stats.projects, icon: "solar:folder-open-outline", color: "text-violet-400", bg: "bg-violet-500/10", href: "/admin/projects" },
    { name: "FAQs", value: stats.faqs, icon: "solar:question-square-outline", color: "text-amber-400", bg: "bg-amber-500/10", href: "/admin/faqs" },
    { name: "Site Settings", value: stats.settings, icon: "solar:settings-outline", color: "text-emerald-400", bg: "bg-emerald-500/10", href: "/admin/settings" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bricolage font-medium mb-2">Dashboard Overview</h1>
        <p className="text-white/50 text-sm">Welcome back to the NAMHO AI Console. Select an action below or browse statistics.</p>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm py-12">Loading system stats...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsList.map((stat) => (
              <Link 
                key={stat.name} 
                href={stat.href}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/50">{stat.name}</span>
                  <span className="block text-3xl font-bricolage font-bold mt-2 text-white">{stat.value}</span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-105 transition-transform`}>
                  {/* @ts-expect-error */}
                  <iconify-icon icon={stat.icon} width="22"></iconify-icon>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-medium mb-6">Quick CMS Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href="/admin/settings"
                className="group bg-neutral-900/50 hover:bg-neutral-900 border border-white/5 hover:border-emerald-500/20 p-6 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:pen-new-square-linear" width="20"></iconify-icon>
                </div>
                <h3 className="font-medium mb-1 text-white group-hover:text-emerald-400 transition-colors">Edit Homepage Copy</h3>
                <p className="text-xs text-white/40">Modify Hero texts, CTA buttons, and company taglines instantly.</p>
              </Link>

              <Link 
                href="/admin/pricing"
                className="group bg-neutral-900/50 hover:bg-neutral-900 border border-white/5 hover:border-blue-500/20 p-6 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:bill-list-outline" width="20"></iconify-icon>
                </div>
                <h3 className="font-medium mb-1 text-white group-hover:text-blue-400 transition-colors">Configure Plans & Price IDs</h3>
                <p className="text-xs text-white/40">Adjust subscription rates, token bundles, and features lists.</p>
              </Link>

              <Link 
                href="/admin/payments"
                className="group bg-neutral-900/50 hover:bg-neutral-900 border border-white/5 hover:border-purple-500/20 p-6 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:card-2-outline" width="20"></iconify-icon>
                </div>
                <h3 className="font-medium mb-1 text-white group-hover:text-purple-400 transition-colors">View Sales & Transactions</h3>
                <p className="text-xs text-white/40">Audit Stripe payments log and trace user license awards.</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

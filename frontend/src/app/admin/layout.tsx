"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "solar:dashboard-outline" },
  { name: "Services", href: "/admin/services", icon: "solar:case-outline" },
  { name: "Projects", href: "/admin/projects", icon: "solar:folder-open-outline" },
  { name: "FAQs", href: "/admin/faqs", icon: "solar:question-square-outline" },
  { name: "Site Settings", href: "/admin/settings", icon: "solar:settings-outline" },
  { name: "Pricing Plans", href: "/admin/pricing", icon: "solar:bill-list-outline" },
  { name: "Stripe Payments", href: "/admin/payments", icon: "solar:card-2-outline" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Avoid checking auth on the login page itself
    if (pathname === "/admin") {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white font-mono text-sm">
        Verifying credentials...
      </div>
    );
  }

  // If we are on the login page, just return children without the sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-neutral-900/40 backdrop-blur-xl flex flex-col justify-between p-6 shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black">
              {/* @ts-expect-error */}
              <iconify-icon icon="solar:shield-keyhole-bold-duotone" width="18"></iconify-icon>
            </div>
            <span className="font-bricolage text-lg tracking-tight font-medium text-white">NAMHO Console</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-white/10 text-white border border-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* @ts-expect-error */}
                  <iconify-icon icon={item.icon} width="18"></iconify-icon>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Logout */}
        <div className="border-t border-white/5 pt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
          >
            {/* @ts-expect-error */}
            <iconify-icon icon="solar:logout-outline" width="18"></iconify-icon>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

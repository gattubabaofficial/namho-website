"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const active = path === "/" ? pathname === "/" : pathname?.startsWith(path);
    return active
      ? "px-5 py-2 text-sm font-medium text-black bg-white rounded-full transition-all duration-300 inline-block"
      : "px-5 py-2 text-sm font-medium text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300 inline-block";
  };

  const getMobileLinkClass = (path: string, isLast = false) => {
    const active = path === "/" ? pathname === "/" : pathname?.startsWith(path);
    const base = active
      ? "text-emerald-400 font-medium py-2"
      : "text-white/80 hover:text-white transition-colors py-2";
    return isLast ? base : `${base} border-b border-white/10`;
  };

  return (
    <div suppressHydrationWarning className="fixed flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12 top-6 z-50 animate-slide-up [animation-delay:0.5s] opacity-0 group/nav">
      
      {/* Background shadow layer (optional depending on texture requirements) */}
      <div className="absolute inset-x-0 top-[-24px] h-32 bg-gradient-to-b from-neutral-950/80 to-transparent pointer-events-none -z-10"></div>

      {/* 1. Logo (Left) */}
      <div className="flex items-center gap-3 pl-4">
        <div suppressHydrationWarning className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#F5F4F0] p-1 border border-white/10 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/namho-logo.svg" className="w-full h-full object-contain" alt="NAMHO Logo" />
        </div>
        <span className="font-bricolage text-lg tracking-tight font-medium text-white">NAMHO</span>
      </div>

      {/* 2. Navigation Links (Center) */}
      <nav className="hidden md:flex transition-all duration-300 bg-neutral-900/60 border border-white/10 rounded-full px-2 py-2 shadow-2xl backdrop-blur-xl items-center gap-1">
        <Link suppressHydrationWarning href="/" className={getLinkClass("/")}>Home</Link>
        <Link suppressHydrationWarning href="/about" className={getLinkClass("/about")}>About</Link>
        <Link suppressHydrationWarning href="/services" className={getLinkClass("/services")}>Services</Link>
        <Link suppressHydrationWarning href="/automations" className={getLinkClass("/automations")}>AI Models</Link>
        <Link suppressHydrationWarning href="/pricing" className={getLinkClass("/pricing")}>Pricing</Link>
        <Link suppressHydrationWarning href="/blog" className={getLinkClass("/blog")}>Blog</Link>
        <Link suppressHydrationWarning href="/contact" className={getLinkClass("/contact")}>Contact</Link>
      </nav>

      {/* 3. Actions (Right) */}
      <div suppressHydrationWarning className="hidden md:flex items-center gap-4">
        <Link 
          href="/dashboard" 
          className="px-6 py-2.5 rounded-full border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-all duration-300 bg-transparent"
        >
          Login
        </Link>
        <Link 
          href="/pricing" 
          className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all duration-300 flex items-center gap-2"
        >
          {/* @ts-expect-error - custom element */}
          <iconify-icon icon="solar:bolt-bold-duotone" width="16"></iconify-icon>
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="absolute right-6 top-1 md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors border border-white/10 bg-neutral-900/60 backdrop-blur-md" 
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {/* @ts-expect-error - custom element */}
        <iconify-icon icon="solar:hamburger-menu-linear" width="20"></iconify-icon>
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div suppressHydrationWarning className="absolute top-20 left-4 right-4 bg-neutral-900/95 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col gap-4 md:hidden">
          <Link suppressHydrationWarning href="/" className={getMobileLinkClass("/")} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link suppressHydrationWarning href="/about" className={getMobileLinkClass("/about")} onClick={() => setMobileOpen(false)}>About</Link>
          <Link suppressHydrationWarning href="/services" className={getMobileLinkClass("/services")} onClick={() => setMobileOpen(false)}>Services</Link>
          <Link suppressHydrationWarning href="/automations" className={getMobileLinkClass("/automations")} onClick={() => setMobileOpen(false)}>AI Models</Link>
          <Link suppressHydrationWarning href="/pricing" className={getMobileLinkClass("/pricing")} onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link suppressHydrationWarning href="/blog" className={getMobileLinkClass("/blog")} onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link suppressHydrationWarning href="/contact" className={getMobileLinkClass("/contact", true)} onClick={() => setMobileOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
}

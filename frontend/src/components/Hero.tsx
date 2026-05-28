"use client";

import { useAppContext } from "@/context/AppContext";

export default function Hero() {
  const { settings } = useAppContext();

  const heroHeadline = settings.hero_headline || "NEURAL & SYSTEMS";
  let firstLine = "NEURAL";
  let secondLine = "SYSTEMS";
  if (heroHeadline.includes("&")) {
    const parts = heroHeadline.split("&");
    firstLine = parts[0].trim();
    secondLine = parts.slice(1).join("&").trim();
  } else {
    firstLine = heroHeadline;
    secondLine = "";
  }
  const heroTagline = settings.hero_tagline || "We engineer digital evolution. A full-service agency bridging AI Automation, custom software, and immersive design to scale your business.";
  const heroCtaText = settings.hero_cta_text || "View Case Studies";
  const heroModelVersion = settings.hero_model_version || "v4.0 Active";
  const serverUptime = settings.hero_uptime || "99.99%";

  return (
    <header className="relative w-full overflow-hidden flex flex-col justify-end pb-12 md:pb-24 min-h-screen md:h-screen">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* CSS-only animated background — replaces heavy Spline 3D WebGL iframe */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {/* Central glow orb */}
          <div
            className="absolute rounded-full"
            style={{
              width: "70vw",
              height: "70vw",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              background: "radial-gradient(ellipse at center, rgba(16,185,129,0.18) 0%, rgba(59,130,246,0.10) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          {/* Particle ring 1 */}
          <div
            className="absolute rounded-full border border-emerald-500/10"
            style={{
              width: "55vw", height: "55vw",
              top: "50%", left: "50%",
              transform: "translate(-50%, -60%)",
              animation: "spin 25s linear infinite",
            }}
          />
          {/* Particle ring 2 */}
          <div
            className="absolute rounded-full border border-blue-500/8 border-dashed"
            style={{
              width: "72vw", height: "72vw",
              top: "50%", left: "50%",
              transform: "translate(-50%, -60%)",
              animation: "spin 40s linear infinite reverse",
            }}
          />
          {/* Particle ring 3 */}
          <div
            className="absolute rounded-full border border-emerald-400/5"
            style={{
              width: "90vw", height: "90vw",
              top: "50%", left: "50%",
              transform: "translate(-50%, -60%)",
              animation: "spin 60s linear infinite",
            }}
          />
          {/* Accent dot top-left */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-emerald-400/40" style={{ boxShadow: "0 0 12px 4px rgba(16,185,129,0.3)" }} />
          {/* Accent dot right */}
          <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-blue-400/40" style={{ boxShadow: "0 0 12px 4px rgba(59,130,246,0.3)" }} />
        </div>
        {/* Hero background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-bg.webp"
          className="w-full h-full object-cover animate-cinematic opacity-0"
          alt="Abstract Digital Network"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />
        <div className="bg-black/10 mix-blend-overlay absolute inset-0" />
      </div>


      {/* Main Content */}
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        {/* Left Column: Headline */}
        <div className="md:col-span-7 relative">
          <div className="flex items-center gap-3 mb-6 animate-slide-up [animation-delay:1.2s] opacity-0">
            <span className="h-[1px] w-8 bg-white/60"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">Est. 2024</span>
          </div>

          <h1 className="font-bricolage text-white leading-[0.85] tracking-tight font-semibold">
            <span className="block text-[15vw] md:text-[9rem] lg:text-[11rem] animate-slide-up [animation-delay:1.4s] text-white opacity-0 mix-blend-normal drop-shadow-2xl">
              {firstLine}
            </span>
            {secondLine && (
              <div className="flex items-baseline gap-4 md:gap-8 -mt-2 md:-mt-8 animate-slide-up [animation-delay:1.6s] opacity-0">
                <span className="text-[15vw] md:text-[9rem] lg:text-[11rem] font-serif-custom italic font-thin text-white/60 opacity-50 blur-[1px]">
                  &
                </span>
                <span className="text-[15vw] md:text-[9rem] lg:text-[11rem] text-white drop-shadow-2xl">
                  {secondLine}
                </span>
              </div>
            )}
          </h1>
        </div>
      </div>

      {/* AI Model Badge — absolutely positioned, top-right */}
      <div className="absolute top-28 right-[232px] z-20 flex justify-end animate-slide-up [animation-delay:2.5s] opacity-0">
        <div className="px-4 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono tracking-wider uppercase text-white/90">AI Model: {heroModelVersion}</span>
        </div>
      </div>

      {/* Info Card — absolutely positioned below badge */}
      <div className="absolute top-40 right-16 w-96 z-20 animate-slide-up [animation-delay:1.8s] opacity-0">
        <div className="overflow-hidden bg-neutral-950/60 border-white/10 border rounded-2xl ring-white/5 ring-1 p-5 relative shadow-2xl backdrop-blur-2xl">
          {/* Shimmer */}
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none animate-shimmer-effect"></div>
          <div className="relative z-10">
            <p className="text-base md:text-lg text-white font-light leading-relaxed mb-4 antialiased drop-shadow-md">
              {heroTagline}
            </p>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Automations</span>
                  <span className="text-xl font-bricolage text-white">420+</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Clients</span>
                  <span className="text-xl font-bricolage text-white">85</span>
                </div>
              </div>
              <a href="#projects" className="group flex items-center justify-between w-full p-1 border-b border-white/30 hover:border-white transition-colors pb-1">
                <span className="text-sm font-medium tracking-wide text-white">{heroCtaText}</span>
                {/* @ts-expect-error - custom element */}
                <iconify-icon icon="solar:arrow-right-linear" className="text-white group-hover:translate-x-1 transition-transform" width="16"></iconify-icon>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up [animation-delay:2.2s] opacity-0">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent"></div>
      </div>

      {/* Bottom Left Status Card */}
      <div className="absolute bottom-8 left-2 hidden lg:flex flex-col gap-2 animate-slide-up [animation-delay:2.4s] opacity-0 z-20">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40 font-mono">
          <span>Sys.Norm</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>V. 2.0.1</span>
        </div>
        <div className="bg-neutral-900/80 w-64 border-white/10 border rounded-xl px-4 py-4 backdrop-blur">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-white/60">Server Uptime</span>
            <span className="text-xs text-emerald-400">{serverUptime}</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-500 w-[99%] h-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="block text-[10px] text-white/40 uppercase tracking-wider">Requests</span>
              <span className="text-sm text-white font-mono">2.4M/s</span>
            </div>
            <div>
              <span className="block text-[10px] text-white/40 uppercase tracking-wider">Latency</span>
              <span className="text-sm text-white font-mono">12ms</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

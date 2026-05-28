"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

type Filter = "all" | "deep-space" | "orbital";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const { projects } = useAppContext();

  useEffect(() => {
    if (projects.length > 0) {
      setTimeout(() => {
        if (typeof window !== "undefined" && (window as any).initInViewAnimations) {
          (window as any).initInViewAnimations();
        }
      }, 50);
    }
  }, [projects]);

  const activeClass = "filter-btn px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 bg-white text-neutral-950 shadow-lg shadow-white/5";
  const inactiveClass = "filter-btn px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 text-white/50 hover:text-white hover:bg-white/5";

  const p1 = projects[0];
  const p2 = projects[1];
  const p3 = projects[2];

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-neutral-950 text-white overflow-hidden selection:bg-emerald-500/30">
      {/* Ambient background — static, no animate-pulse (expensive on large blur) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-emerald-900/15 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen" />

      <div className="md:px-12 z-10 w-full max-w-7xl mr-auto ml-auto pr-6 pl-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl relative animate-on-scroll">
            <div className="absolute -left-4 md:-left-8 top-1 bottom-1 w-1 bg-gradient-to-b from-emerald-500 to-transparent opacity-50"></div>
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              {/* @ts-expect-error */}
              <iconify-icon icon="solar:programming-linear" className="animate-spin-slow-reverse" width="16"></iconify-icon>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400/80">Project Archive</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bricolage font-medium tracking-tighter text-white leading-[0.9]">
              Selected <span className="text-white/20 font-light">Work.</span>
            </h2>
          </div>

          {/* Filter Controls */}
          <div className="relative group animate-on-scroll delay-100">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex items-center p-1.5 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <button onClick={() => setFilter("all")} className={filter === "all" ? activeClass : inactiveClass}>
                {/* @ts-expect-error */}
                <iconify-icon icon="solar:widget-2-linear" width="14"></iconify-icon>
                All Projects
              </button>
              <button onClick={() => setFilter("deep-space")} className={filter === "deep-space" ? activeClass : inactiveClass}>
                {/* @ts-expect-error */}
                <iconify-icon icon="solar:magic-stick-linear" width="14"></iconify-icon>
                AI &amp; Auto
              </button>
              <button onClick={() => setFilter("orbital")} className={filter === "orbital" ? activeClass : inactiveClass}>
                {/* @ts-expect-error */}
                <iconify-icon icon="solar:smartphone-linear" width="14"></iconify-icon>
                Dev &amp; Design
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[800px]">
          {/* Card 1 */}
          {p1 && (filter === "all" || p1.category === filter) && (
            <div className="group relative md:col-span-8 rounded-4xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20 origin-left animate-on-scroll delay-200">
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p1.image_url}
                  className="w-full h-full group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 ease-out group-hover:grayscale-0 opacity-50 mix-blend-darken object-cover grayscale"
                  alt={p1.title}
                  loading="lazy"
                />
                <div className="bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent absolute inset-0" />
              </div>

              {/* HUD Overlay */}
              <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-mono text-white/80">{(p1.technologies || []).join(' / ')}</span>
                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] uppercase tracking-widest font-mono text-emerald-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="text-[10px] font-mono text-white/40 tabular-nums text-right hidden sm:block">TOKENS: 4.2M / DAY</div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                <div className="max-w-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                  <div className="text-[8rem] md:text-[12rem] font-bricolage font-bold text-white/5 absolute -top-32 md:-top-40 -left-6 pointer-events-none select-none tracking-tighter">01</div>
                  <h3 className="text-4xl md:text-6xl font-bricolage font-medium text-white mb-4 relative tracking-tight">{p1.title}</h3>
                  <p className="text-white/70 text-lg font-light leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75 max-w-md">
                    {p1.description}
                  </p>
                  <div className="flex items-center gap-8 pt-6 border-t border-white/10 text-xs font-mono text-white/40 uppercase tracking-widest">
                    <div>
                      <span className="block text-white mb-1">Stack</span>
                      {(p1.technologies || []).join(' / ')}
                    </div>
                    <div>
                      <span className="block text-white mb-1">Efficiency</span>
                      +400%
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
                      <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors bg-white/5 backdrop-blur-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Stack */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Card 2 */}
            {p2 && (filter === "all" || p2.category === filter) && (
              <div className="group relative flex-1 min-h-[380px] rounded-4xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20 origin-top animate-on-scroll delay-300">
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p2.image_url}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 ease-out grayscale group-hover:grayscale-0"
                    alt={p2.title}
                    loading="lazy"
                  />
                  <div className="bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent absolute inset-0" />
                </div>
                <div className="absolute top-6 right-6 z-20">
                  <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="font-bricolage text-sm font-medium">02</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgb(245,158,11)]" />
                      <span className="text-[10px] uppercase text-amber-400 tracking-widest font-mono">{p2.category === 'deep-space' ? 'AI Auto' : 'Dev Design'}</span>
                    </div>
                    <h3 className="text-3xl font-medium text-white tracking-tight font-bricolage mb-2">{p2.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{p2.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3 */}
            {p3 && (filter === "all" || p3.category === filter) && (
              <div className="group relative flex-1 min-h-[380px] rounded-4xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20 origin-bottom animate-on-scroll delay-400">
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p3.image_url}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 ease-out grayscale group-hover:grayscale-0"
                    alt={p3.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                </div>
                <div className="absolute top-6 right-6 z-20">
                  <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="font-bricolage text-sm font-medium">03</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgb(245,158,11)]" />
                      <span className="text-[10px] uppercase text-amber-400 tracking-widest font-mono">{p3.category === 'deep-space' ? 'AI Auto' : 'Dev Design'}</span>
                    </div>
                    <h3 className="text-3xl font-medium text-white tracking-tight font-bricolage mb-2">{p3.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{p3.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <a href="#" className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono text-white/60 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest border border-transparent hover:border-white/10">
            View Complete Portfolio
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

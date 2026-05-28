export default function Systems() {
  const cards = [
    {
      color: "emerald",
      icon: "solar:cpu-bolt-linear",
      title: "AI Automation",
      desc: "Intelligent workflows and bots that automate repetitive tasks, saving time and resources.",
      badge: "Online",
      visual: "ai",
    },
    {
      color: "blue",
      icon: "solar:code-circle-linear",
      title: "Software Dev",
      desc: "Custom web and mobile applications built on robust, scalable, and secure architectures.",
      badge: "Clean Code",
      visual: "code",
    },
    {
      color: "purple",
      icon: "solar:shield-star-linear",
      title: "DevOps Services",
      desc: "Streamlined deployment, continuous integration, and secure cloud management infrastructure.",
      badge: "Secure",
      visual: "devops",
    },
  ];

  return (
    <section id="systems" className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="z-10 max-w-7xl mr-auto ml-auto pr-6 pl-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-on-scroll">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Core Services</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bricolage text-white mb-6 tracking-tighter leading-none">Systems</h2>
            <p className="text-lg text-white/50 font-light leading-relaxed max-w-lg">
              Proprietary technology and expert workflows engineered for scalability. The infrastructure that powers your business.
            </p>
          </div>
          <a href="/services" className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-all mt-8 md:mt-0">
            <span>View All Services</span>
            {/* @ts-expect-error */}
            <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card) => {
            const colorMap: Record<string, { dot: string; text: string; grad: string; bar: string }> = {
              emerald: { dot: "bg-emerald-500 shadow-[0_0_10px_rgb(16,185,129)]", text: "text-emerald-400", grad: "from-emerald-500/5", bar: "bg-emerald-500" },
              blue: { dot: "bg-blue-500 shadow-[0_0_10px_rgb(59,130,246)]", text: "text-blue-400", grad: "from-blue-500/5", bar: "bg-blue-500" },
              purple: { dot: "bg-purple-500 shadow-[0_0_10px_rgb(168,85,247)]", text: "text-purple-400", grad: "from-purple-500/5", bar: "bg-purple-500" },
            };
            const c = colorMap[card.color];
            return (
              <div key={card.title} className="group relative h-[500px] bg-neutral-900/40 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-neutral-900/60 transition-all duration-300 hover:border-white/20 backdrop-blur-sm animate-on-scroll delay-100">
                <div className={`absolute inset-0 bg-gradient-to-b ${c.grad} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-auto ${c.text} group-hover:scale-110 transition-all duration-300`}>
                  {/* @ts-expect-error */}
                  <iconify-icon icon={card.icon} className="text-2xl"></iconify-icon>
                </div>

                {/* Lightweight CSS visualization — reduced spin count & complexity */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  {card.visual === "ai" && (
                    <div className="relative w-[260px] h-[260px]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Only 2 rings instead of 3, slower spin for less GPU load */}
                        <div className="w-28 h-28 rounded-full border border-emerald-500/30" style={{ animation: "spin 14s linear infinite" }} />
                        <div className="absolute w-44 h-44 rounded-full border border-dashed border-emerald-500/20" style={{ animation: "spin 22s linear infinite reverse" }} />
                        <div className="absolute w-4 h-4 rounded-full bg-emerald-500/20 blur-sm" />
                      </div>
                    </div>
                  )}
                  {card.visual === "code" && (
                    <div className="relative w-[240px] h-[240px]">
                      <svg className="absolute inset-0 w-full h-full text-blue-500" viewBox="0 0 100 100" fill="none" style={{ animation: "spin 30s linear infinite" }}>
                        <path d="M50 15 L80.3 32.5 V67.5 L50 85 L19.7 67.5 V32.5 Z" stroke="currentColor" strokeWidth="0.3" className="opacity-40" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-28 h-28 border-[0.5px] border-blue-400/25 rotate-45" style={{ animation: "spin 12s linear infinite" }} />
                      </div>
                    </div>
                  )}
                  {card.visual === "devops" && (
                    <div className="relative w-[260px] h-[260px]">
                      <svg className="absolute inset-0 w-full h-full text-purple-500" viewBox="0 0 100 100" fill="none" style={{ animation: "spin 16s linear infinite" }}>
                        <ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" strokeWidth="0.3" className="opacity-35" />
                        <ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" strokeWidth="0.3" className="opacity-35" transform="rotate(60 50 50)" />
                        <ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" strokeWidth="0.3" className="opacity-35" transform="rotate(120 50 50)" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_16px_rgb(168,85,247)]" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-auto pt-32">
                  <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-2 group-hover:translate-y-0">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${c.dot}`} />
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${c.text}`}>{card.badge}</span>
                  </div>
                  <h3 className="text-3xl text-white font-bricolage mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">{card.desc}</p>
                  <div className="w-full bg-white/5 h-[2px] mt-6 relative overflow-hidden rounded-full">
                    <div className={`absolute inset-0 ${c.bar} w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section suppressHydrationWarning className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center z-10">
        <div suppressHydrationWarning className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-500/20 via-blue-500/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono">The Intelligence Agency</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bricolage font-medium tracking-tighter mb-6 animate-slide-up [animation-delay:0.1s]">
          We Engineer <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Digital Evolution.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up [animation-delay:0.2s]">
          NAMHO is not just a development studio. We are architects of scale, fusing bleeding-edge AI logic with breathtaking design to give your business an unfair advantage.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section suppressHydrationWarning className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div suppressHydrationWarning className="space-y-8 animate-slide-up [animation-delay:0.3s]">
            <div>
              <h2 className="text-3xl font-bricolage font-medium mb-4">Our Mission</h2>
              <p className="text-white/60 leading-relaxed text-lg">
                To democratize enterprise-grade technology. We believe that immense computing power, automation, and world-class design shouldn't be reserved for billion-dollar corporations. We bring scalable systems to visionary founders.
              </p>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent"></div>
            <div>
              <h2 className="text-3xl font-bricolage font-medium mb-4">Our Approach</h2>
              <p className="text-white/60 leading-relaxed text-lg">
                We operate at the intersection of logic and aesthetics. A beautiful interface is useless if the backend collapses under pressure. A brilliant AI model is wasted if the UX is confusing. We engineer the complete spectrum.
              </p>
            </div>
          </div>
          
          <div suppressHydrationWarning className="relative group animate-slide-up [animation-delay:0.4s]">
            <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <div suppressHydrationWarning className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-full flex flex-col justify-center">
              {/* @ts-expect-error */}
              <iconify-icon icon="solar:infinity-bold-duotone" width="64" className="text-white/80 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"></iconify-icon>
              <h3 className="text-2xl font-bricolage font-medium mb-2">Relentless Iteration</h3>
              <p className="text-white/50">
                Technology moves too fast for static solutions. We build systems designed to adapt, learn, and scale alongside your ambitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section suppressHydrationWarning className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bricolage font-medium mb-6">Our Core Variables</h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">The foundational principles that compile our culture and dictate our code.</p>
        </div>

        <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Velocity",
              desc: "Speed of execution without compromising architectural integrity. We deploy fast and iterate faster.",
              icon: "solar:rocket-bold-duotone",
              color: "text-rose-400"
            },
            {
              title: "Precision",
              desc: "Pixel-perfect mastery and mathematically exact backend logic. Near enough is never good enough.",
              icon: "solar:target-bold-duotone",
              color: "text-cyan-400"
            },
            {
              title: "Innovation",
              desc: "We don't follow trends; we write the documentation for them. Always pioneering the next frontier.",
              icon: "solar:lightbulb-minimalistic-bold-duotone",
              color: "text-amber-400"
            }
          ].map((value, idx) => (
            <div key={idx} suppressHydrationWarning className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:bg-neutral-800/50 transition-colors group">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${value.color}`}>
                {/* @ts-expect-error */}
                <iconify-icon icon={value.icon} width="24"></iconify-icon>
              </div>
              <h3 className="text-2xl font-bricolage font-medium mb-3">{value.title}</h3>
              <p className="text-white/50 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

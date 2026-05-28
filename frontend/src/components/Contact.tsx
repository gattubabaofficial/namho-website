export default function Contact() {
  const stats = [
    { num: "98", suffix: "%", label: "Retention Rate" },
    { num: "120", suffix: "+", label: "Projects Shipped" },
    { num: "5.0", suffix: "", label: "Client Rating" },
    { num: "24", suffix: "/7", label: "DevOps Support" },
  ];

  const partners = ["Stripe", "Vercel", "OpenAI", "Linear", "Raycast", "Shopify"];

  return (
    <>
      {/* Partners / Stats */}
      <section className="bg-neutral-950 border-white/5 border-t pt-20 pb-20">
        <div className="max-w-7xl mr-auto ml-auto pr-6 pl-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-white/30">Trusted By Innovators</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 animate-on-scroll delay-200 mb-20">
            {partners.map((p) => (
              <div key={p} className="flex items-center justify-center h-12 text-white font-bricolage font-bold text-xl tracking-tighter">{p}</div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/5 pt-12 gap-x-8 gap-y-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bricolage text-white font-light mb-2">
                  <span>{s.num}</span>
                  <span className="text-lg text-emerald-500">{s.suffix}</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-950 border-white/5 border-t pt-24 pr-6 pb-24 pl-6 relative" id="careers">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="z-10 w-full max-w-7xl mr-auto ml-auto relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-3xl animate-on-scroll">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-emerald-500"></span>
                <span className="text-emerald-500 text-xs font-mono uppercase tracking-widest">Start a Project</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bricolage font-medium tracking-tighter text-white leading-[0.9]">
                {"Let's Build the"} <span className="text-white/30">Future.</span>
              </h2>
            </div>
            <p className="text-neutral-400 text-lg max-w-md font-light leading-relaxed">
              Ready to transform your business with AI and modern software solutions? {"We're"} taking new clients for Q4.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 flex flex-col gap-4">
              {[
                { icon: "solar:chat-round-dots-linear", title: "Book Discovery Call", time: "30 Minutes", mode: "Google Meet", tag: "Free" },
                { icon: "solar:letter-linear", title: "Request a Quote", time: "Proposal", mode: "24h Response", tag: "Contact" },
              ].map((item) => (
                <a key={item.title} href="#" className="group relative block p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-white/0 hover:from-white/20 hover:to-white/5 transition-all duration-500 animate-on-scroll delay-100">
                  <div className="relative h-full bg-neutral-900/80 backdrop-blur-xl rounded-[23px] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center border border-white/5 group-hover:border-transparent transition-colors overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-500 z-10">
                      {/* @ts-expect-error */}
                      <iconify-icon icon={item.icon} width="28"></iconify-icon>
                    </div>
                    <div className="flex-1 text-center md:text-left z-10">
                      <h3 className="text-xl font-bricolage font-medium text-white mb-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          {/* @ts-expect-error */}
                          <iconify-icon icon="solar:clock-circle-linear" width="16"></iconify-icon>
                          {item.time}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-600 my-auto"></span>
                        <span>{item.mode}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 z-10">
                      <span className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/60 bg-white/5 uppercase tracking-wide group-hover:border-white/30">{item.tag}</span>
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-white/50 transition-all duration-300">
                        {/* @ts-expect-error */}
                        <iconify-icon icon="solar:arrow-right-linear" width="20"></iconify-icon>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Side Card */}
            <div className="lg:col-span-4 animate-on-scroll delay-300">
              <div className="relative overflow-hidden rounded-3xl bg-neutral-900/60 border border-white/10 p-8 backdrop-blur-xl h-full min-h-[300px] flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 mix-blend-screen pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgb(16,185,129)]"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Status: Available</span>
                  </div>
                  <h3 className="text-2xl font-bricolage text-white mb-3 font-medium">Open for new projects</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{"We're"} selectively onboarding clients who want to build something meaningful.</p>
                </div>
                <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[{ val: "4", label: "Slots Left" }, { val: "~2wk", label: "Kickoff" }, { val: "7+", label: "Countries" }].map((item) => (
                      <div key={item.label}>
                        <div className="text-xl font-bricolage text-white">{item.val}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

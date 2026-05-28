export default function Timeline() {
  const events = [
    { year: "2020", label: "20", title: "Foundation", description: "The agency is formed by a collective of senior developers and AI researchers.", side: "left" },
    { year: "2022", label: "22", title: "AI Integration", description: "We pivoted to full-scale AI automation, integrating LLMs into enterprise workflows.", side: "right" },
    { year: "2024", label: "24", title: "Global Scale", description: "Serving Fortune 500 clients with custom software and autonomous digital systems.", side: "left" },
  ];

  return (
    <section id="timeline" className="py-32 bg-neutral-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 animate-on-scroll">
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Timeline</span>
          <h2 className="text-5xl md:text-7xl font-bricolage text-white mt-4 font-semibold tracking-tight">Our Evolution</h2>
        </div>

        <div className="relative">
          {events.map((event, i) => (
            <div key={event.year} className={`flex flex-col md:flex-row items-center justify-between ${i < events.length - 1 ? "mb-24" : ""} group`}>
              {event.side === "left" ? (
                <>
                  <div className="w-full md:w-5/12 pr-0 md:pr-12 order-2 md:order-1 animate-on-scroll text-center md:text-right" data-anim="slide-right">
                    <h3 className="text-3xl text-white font-bricolage">{event.title}</h3>
                    <p className="text-white/40 mt-2 font-light">{event.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 z-10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] order-1 md:order-2 mb-6 md:mb-0 relative">
                    <span className="font-mono text-xs">{event.label}</span>
                  </div>
                  <div className="w-full md:w-5/12 pl-0 md:pl-12 order-3 animate-on-scroll" data-anim="slide-left">
                    <span className="text-8xl font-bricolage text-white/5 font-bold absolute -translate-y-12 select-none pointer-events-none">{event.year}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-5/12 text-right pr-0 md:pr-12 order-2 md:order-1 animate-on-scroll" data-anim="slide-right">
                    <span className="text-8xl font-bricolage text-white/5 font-bold absolute right-6 md:right-12 -translate-y-12 select-none pointer-events-none">{event.year}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 z-10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] order-1 md:order-2 mb-6 md:mb-0 relative">
                    <span className="font-mono text-xs">{event.label}</span>
                  </div>
                  <div className="w-full md:w-5/12 pl-0 md:pl-12 order-3 animate-on-scroll text-center md:text-left" data-anim="slide-left">
                    <h3 className="text-3xl text-white font-bricolage">{event.title}</h3>
                    <p className="text-white/40 mt-2 font-light">{event.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

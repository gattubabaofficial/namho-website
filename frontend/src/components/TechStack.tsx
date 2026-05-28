
const BarGraph = ({ pattern }: { pattern: number[] }) => (
  <div className="w-full h-8 flex items-end gap-0.5 opacity-50">
    {pattern.map((h, i) => (
      <div
        key={i}
        className="w-1 bg-white rounded-t-sm bar-anim"
        style={{ height: `${h}%`, animationDuration: `${1.5 + (i % 3) * 0.3}s`, animationDelay: `-${(i % 4) * 0.5}s` }}
      />
    ))}
  </div>
);

const techStack = [
  {
    image: "/assets/web&appdev-image.webp",
    icon: "solar:layers-minimalistic-linear",
    name: "Web & App Dev",
    sub: "Next.js / Flutter",
    specs: [
      { icon: "solar:code-linear", label: "Language", val: "TypeScript" },
      { icon: "solar:server-square-linear", label: "Backend", val: "Node/Go" },
      { icon: "solar:shield-check-linear", label: "Performance", val: "Lighthouse 99+" },
    ],
    bars: [40,60,80,65,50,45,60,75,90,70,55,40],
    barLabel: ["Build Speed", "Rendering"],
    tag: "Scale",
  },
  {
    image: "/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.webp",
    icon: "solar:magic-stick-linear",
    name: "Generative AI",
    sub: "LLM Integration",
    specs: [
      { icon: "solar:clock-circle-linear", label: "Models", val: "GPT-4/Claude" },
      { icon: "solar:check-circle-linear", label: "Framework", val: "LangChain" },
      { icon: "solar:umbrella-linear", label: "Data", val: "Vector DBs" },
    ],
    bars: [50,52,55,58,60,60,60,58,55,52,50,48],
    barLabel: ["Token Efficiency", "Reasoning"],
    tag: "Smart",
  },
  {
    image: "/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.webp",
    icon: "solar:pallete-2-linear",
    name: "UI/UX Design",
    sub: "Design Systems",
    specs: [
      { icon: "solar:ruler-angular-linear", label: "Tools", val: "Figma/Spline" },
      { icon: "solar:graph-up-linear", label: "Conversion", val: "Optimized" },
      { icon: "solar:shield-warning-linear", label: "Access", val: "WCAG 2.1" },
    ],
    bars: [90,95,92,98,100,98,96,94,92,95,98,99],
    barLabel: ["User Engagement", "Retention"],
    tag: "Flow",
  },
];

export default function TechStack() {
  return (
    <section className="bg-neutral-950 border-white/5 border-t pt-24 pr-6 pb-24 pl-6 relative" id="process">
      <div className="absolute top-12 right-6 md:right-12 z-0 opacity-10 font-bricolage font-bold text-[8rem] md:text-[10rem] leading-none text-white pointer-events-none select-none tracking-tighter">
        STACK
      </div>
      <div className="z-10 w-full max-w-5xl mr-auto ml-auto relative">
        <div className="text-center mb-16 animate-on-scroll">
          <h3 className="text-3xl md:text-5xl font-bricolage font-light text-white mb-4 tracking-tight">Technology Stack</h3>
          <p className="text-white/50">Best-in-class tools for modern digital solutions.</p>
        </div>
        <div className="flex flex-col gap-4">
          {techStack.map((item) => (
            <div key={item.name} className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 md:p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all duration-300 animate-on-scroll">
              <div className="col-span-1 md:col-span-4 flex items-center gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} className="w-full h-full object-cover text-[0px] text-transparent" alt={item.name} loading="lazy" />
                </div>
                <div>
                  {/* @ts-expect-error */}
                  <iconify-icon icon={item.icon} width="32" className="text-white/60 mb-1"></iconify-icon>
                  <h4 className="text-xl text-white font-bricolage font-light">{item.name}</h4>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{item.sub}</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-6 grid gap-y-4 gap-x-2 border-l border-white/10 pl-6 grid-cols-2 sm:grid-cols-3">
                {item.specs.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-white/50 text-xs uppercase tracking-wide">
                      {/* @ts-expect-error */}
                      <iconify-icon icon={s.icon} width="14"></iconify-icon>
                      {s.label}
                    </div>
                    <span className="text-white text-sm">{s.val}</span>
                  </div>
                ))}
                <div className="col-span-3 mt-2">
                  <div className="flex items-center justify-between text-xs text-white/30 mb-1">
                    <span>{item.barLabel[0]}</span>
                    <span>{item.barLabel[1]}</span>
                  </div>
                  <BarGraph pattern={item.bars} />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-6">
                <span className="text-xl font-serif italic text-white">{item.tag}</span>
                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors group-hover:border-white">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:file-download-linear" width="18"></iconify-icon>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

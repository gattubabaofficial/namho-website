
export default function Infrastructure() {
  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden" id="infrastructure">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-emerald-500"></span>
              <span className="text-emerald-500 text-xs font-mono uppercase tracking-widest">Digital Infrastructure</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bricolage font-medium mb-6 leading-tight animate-on-scroll">
              Scalable<br />
              <span className="text-white/40">Architecture</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed font-light animate-on-scroll delay-100">
              Beyond code, we build the robust systems that power the future. From microservices orchestration to serverless cloud environments, our footprint ensures your software handles growth effortlessly.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 group cursor-default animate-on-scroll delay-200">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:server-minimalistic-linear" width="24" className="text-white"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-1 font-bricolage">DevOps & Cloud</h4>
                  <p className="text-sm text-white/50">CI/CD pipelines, Docker containerization, and Kubernetes orchestration.</p>
                </div>
              </div>
              <div className="flex gap-4 group cursor-default animate-on-scroll delay-300">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  {/* @ts-expect-error */}
                  <iconify-icon icon="solar:code-circle-linear" width="24" className="text-white"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-1 font-bricolage">Full Stack Engineering</h4>
                  <p className="text-sm text-white/50">Modern frameworks like React, Next.js, and Node.js built for performance.</p>
                </div>
              </div>
            </div>

            <button className="mt-10 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2 group animate-on-scroll delay-300">
              View Capabilities
              {/* @ts-expect-error */}
              <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
            </button>
          </div>

          {/* Image with Hotspots */}
          <div className="relative lg:h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 group animate-on-scroll h-[300px] md:h-[500px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 absolute inset-0" alt="Server Room" loading="lazy" />
            <div className="bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900/20 absolute inset-0"></div>

            {/* Hotspot 1 */}
            <div className="absolute top-1/4 left-1/3 group/spot">
              <div className="w-4 h-4 bg-emerald-500 rounded-full relative z-10 cursor-pointer border-2 border-white" style={{ boxShadow: '0 0 0 0 rgba(16,185,129,0.5)', animation: 'hotspotPing 2s ease-out infinite' }} />
              <div className="absolute left-6 top-0 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 w-56 opacity-0 group-hover/spot:opacity-100 transition-all duration-300 translate-y-2 group-hover/spot:translate-y-0 pointer-events-none">
                <span className="text-xs font-mono text-emerald-400 block mb-1 uppercase tracking-wider">API Gateway</span>
                <span className="text-[11px] text-white/70 block">Throughput: 10k req/s</span>
                <span className="text-[10px] text-white/40 block mt-1">Status: Operational</span>
              </div>
            </div>

            {/* Hotspot 2 */}
            <div className="absolute bottom-1/3 right-1/4 group/spot">
              <div className="w-4 h-4 bg-blue-500 rounded-full relative z-10 cursor-pointer border-2 border-white" style={{ boxShadow: '0 0 0 0 rgba(59,130,246,0.5)', animation: 'hotspotPing 2s ease-out 0.5s infinite' }} />
              <div className="absolute right-6 top-0 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 w-56 opacity-0 group-hover/spot:opacity-100 transition-all duration-300 translate-y-2 group-hover/spot:translate-y-0 pointer-events-none text-right">
                <span className="text-xs font-mono text-blue-400 block mb-1 uppercase tracking-wider">Database Cluster</span>
                <span className="text-[11px] text-white/70 block">Shards: 12 Active</span>
                <span className="text-[10px] text-white/40 block mt-1">Replication: Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

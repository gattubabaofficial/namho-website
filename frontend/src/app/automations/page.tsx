import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const automations = [
  {
    id: "ugc-ad-generator",
    title: "UGC Ad Generator",
    description: "Instantly create high-converting User Generated Content ads for TikTok and Meta using our trained AI models.",
    icon: "solar:video-frame-bold-duotone",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "hyper-realistic-image",
    title: "Hyper-Realistic Image Gen",
    description: "Generate breathtaking, photorealistic images from simple text prompts for your marketing campaigns.",
    icon: "solar:gallery-bold-duotone",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "seo-blog-writer",
    title: "SEO Blog Autopilot",
    description: "Generate fully-optimized, 2000+ word blog posts that rank on Google with a single click.",
    icon: "solar:document-text-bold-duotone",
    color: "from-emerald-400 to-teal-500",
  }
];

export default function AutomationsHub() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      {/* Header Section */}
      <div className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono">AI Automations</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bricolage font-medium tracking-tighter mb-6 relative">
          Supercharge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Workflow</span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
          Access our suite of proprietary AI tools designed to automate content creation, marketing, and engineering tasks.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Link href="/login" className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
            Login to Access Tools
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.map((tool) => (
            <div 
              key={tool.id} 
              className="group relative bg-white/5 border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-500 flex flex-col items-start overflow-hidden"
            >
              <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`}></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-white/15 transition-colors">
                {/* @ts-expect-error */}
                <iconify-icon icon={tool.icon} width="28" className="text-white drop-shadow-lg"></iconify-icon>
              </div>
              
              <h3 className="text-2xl font-bricolage text-white font-medium mb-3">{tool.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">
                {tool.description}
              </p>

              <Link 
                href={`/automations/${tool.id}`}
                className="mt-auto flex items-center justify-center w-full py-3 rounded-xl border border-white/10 text-sm font-medium text-white/80 hover:bg-white hover:text-black transition-all group/btn"
              >
                Launch Tool
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

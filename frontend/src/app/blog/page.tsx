"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publish_date: string;
  reading_time: number;
  image_url?: string;
  category?: {
    name: string;
    slug: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
}

export default function BlogPage() {
  const { blogs: posts, isDataLoaded } = useAppContext();
  const loading = !isDataLoaded;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 relative flex flex-col justify-between">
      {/* Background lights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.04) 55%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navigation />

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Journal</span>
            <h1 className="text-5xl md:text-7xl font-bricolage text-white font-semibold tracking-tighter mt-4 leading-none">
              Digital <span className="text-white/20 font-light">Intelligence.</span>
            </h1>
            <p className="text-white/50 mt-6 text-lg font-light leading-relaxed">
              Perspectives, research, and technical insights from the intersection of artificial intelligence, design systems, and cloud infrastructure.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">Loading Articles</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24 border border-white/5 bg-white/5 backdrop-blur rounded-3xl max-w-md mx-auto">
              <span className="text-3xl">📝</span>
              <h3 className="text-xl font-medium text-white mt-4">No articles found</h3>
              <p className="text-white/40 text-sm mt-2">Check back soon for new insights.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group relative flex flex-col justify-between overflow-hidden bg-neutral-900/40 border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-neutral-900/60 transition-all duration-300 hover:border-white/20 backdrop-blur-sm min-h-[480px]"
                >
                  {/* Subtle Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col gap-6">
                    {/* Header: Date + Reading Time */}
                    <div className="flex justify-between items-center text-xs font-mono text-white/40">
                      <span>
                        {post.publish_date
                          ? new Date(post.publish_date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Draft"}
                      </span>
                      <span>{post.reading_time} Min Read</span>
                    </div>

                    {/* Image Placeholder or Actual Image */}
                    {post.image_url && (
                      <div className="w-full h-48 rounded-2xl overflow-hidden bg-neutral-800 relative border border-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-102"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div>
                      {post.category && (
                        <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] uppercase tracking-widest font-mono text-emerald-400 mb-4">
                          {post.category.name}
                        </span>
                      )}
                      <h2 className="text-2xl md:text-3xl font-bricolage text-white font-medium tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-white/60 text-base leading-relaxed mt-4 font-light line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer: Author + Read Link */}
                  <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 font-mono text-xs">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-white/80">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 group-hover:text-white transition-colors"
                    >
                      Read Article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

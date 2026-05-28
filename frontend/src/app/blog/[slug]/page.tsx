"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getApiUrl } from "@/lib/api";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publish_date: string;
  reading_time: number;
  image_url?: string;
  category?: {
    name: string;
    slug: string;
  };
}

export default function BlogPostDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetchPost() {
      try {
        const response = await fetch(getApiUrl(`/api/v1/blog/${slug}`));
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

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

        <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
          <div className="mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-emerald-400 transition-colors mb-8"
            >
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
                className="rotate-180"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              Back to Journal
            </Link>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-mono tracking-widest text-white/40 uppercase">Loading Article</span>
              </div>
            ) : !post ? (
              <div className="text-center py-24 border border-white/5 bg-white/5 backdrop-blur rounded-3xl max-w-md mx-auto">
                <span className="text-3xl">⚠️</span>
                <h3 className="text-xl font-medium text-white mt-4">Article not found</h3>
                <p className="text-white/40 text-sm mt-2">The requested article could not be located.</p>
                <Link
                  href="/blog"
                  className="mt-6 inline-flex px-6 py-2.5 bg-white text-black font-medium text-sm rounded-full hover:bg-neutral-200 transition-colors"
                >
                  Return to Journal
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 text-xs font-mono text-white/40 mb-6">
                  {post.category && (
                    <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-semibold uppercase tracking-widest">
                      {post.category.name}
                    </span>
                  )}
                  <span>•</span>
                  <span>
                    {new Date(post.publish_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.reading_time} Min Read</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bricolage text-white font-semibold tracking-tight leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 font-mono text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-white/80">{post.author}</span>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">Contributor</span>
                  </div>
                </div>

                {post.image_url && (
                  <div className="w-full h-[400px] rounded-3xl overflow-hidden bg-neutral-800 relative border border-white/5 mt-12">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                )}

                {/* Article Body */}
                <div className="mt-12 prose prose-invert max-w-none text-white/80 font-light leading-relaxed text-lg antialiased">
                  {post.content.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("# ")) {
                      return null; // Skip main title as we render it in the header
                    }
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-2xl md:text-3xl font-bricolage text-white font-medium mt-10 mb-4 tracking-tight">
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                      return (
                        <ul key={index} className="list-disc pl-6 my-4 flex flex-col gap-2">
                          {paragraph.split("\n").map((li, liIndex) => (
                            <li key={liIndex} className="text-white/70">
                              {li.replace(/^[\*\-]\s+/, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (/^\d+\.\s+/.test(paragraph)) {
                      return (
                        <ol key={index} className="list-decimal pl-6 my-4 flex flex-col gap-2">
                          {paragraph.split("\n").map((li, liIndex) => (
                            <li key={liIndex} className="text-white/70">
                              {li.replace(/^\d+\.\s+/, "")}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={index} className="mb-6 last:mb-0">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

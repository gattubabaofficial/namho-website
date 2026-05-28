"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getApiUrl } from "@/lib/api";
import { useAppContext } from "@/context/AppContext";

export default function ContactPage() {
  const { settings } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(getApiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const errData = await response.json();
        setError(errData.detail || "Failed to send message. Please check your inputs.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactEmail = settings.contact_email || "hello@namho.ai";
  const contactPhone = settings.contact_phone || "+1 (555) 019-2834";
  const contactAddress = settings.contact_address || "San Francisco, CA";

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
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Connect</span>
            <h1 className="text-5xl md:text-7xl font-bricolage text-white font-semibold tracking-tighter mt-4 leading-none">
              Start a <span className="text-white/20 font-light">Project.</span>
            </h1>
            <p className="text-white/50 mt-6 text-lg font-light leading-relaxed">
              Have an automation challenge, custom software goal, or immersive design request? Reach out and we will respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            {/* Contact Details Card (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative overflow-hidden rounded-3xl bg-neutral-900/40 border border-white/10 p-8 backdrop-blur-xl flex flex-col justify-between min-h-[420px]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 mix-blend-screen pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgb(16,185,129)]"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">NAMHO AI Head Office</span>
                  </div>
                  
                  <div className="flex flex-col gap-8 mt-10">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                        {/* @ts-expect-error */}
                        <iconify-icon icon="solar:letter-linear" width="20"></iconify-icon>
                      </div>
                      <div>
                        <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">Email Address</span>
                        <a href={`mailto:${contactEmail}`} className="text-white hover:text-emerald-400 transition-colors text-base font-light">
                          {contactEmail}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                        {/* @ts-expect-error */}
                        <iconify-icon icon="solar:phone-linear" width="20"></iconify-icon>
                      </div>
                      <div>
                        <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">Phone Number</span>
                        <a href={`tel:${contactPhone}`} className="text-white hover:text-emerald-400 transition-colors text-base font-light">
                          {contactPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                        {/* @ts-expect-error */}
                        <iconify-icon icon="solar:map-point-linear" width="20"></iconify-icon>
                      </div>
                      <div>
                        <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">Location</span>
                        <span className="text-white text-base font-light">{contactAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Google Maps Location Embed */}
                  <div className="w-full mt-8 rounded-2xl overflow-hidden border border-white/10 h-56 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500 relative">
                    <iframe
                      title="Office Map Location"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(contactAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/10 mt-10 flex gap-4 text-xs font-mono text-white/40 uppercase tracking-widest">
                  <span>Inquiries: 24h Response</span>
                </div>
              </div>
            </div>

            {/* Contact Form Container (Right) */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="border border-white/10 bg-neutral-900/40 backdrop-blur rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3 className="text-3xl font-bricolage text-white font-medium mb-3">Message Sent!</h3>
                  <p className="text-white/60 font-light max-w-md leading-relaxed">
                    Thank you for reaching out. We have logged your request and a technology coordinator will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-neutral-900/40 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest font-mono text-white/40">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors text-sm font-light"
                        placeholder="e.g. tarun"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest font-mono text-white/40">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors text-sm font-light"
                        placeholder="e.g. name@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest font-mono text-white/40">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors text-sm font-light"
                        placeholder="e.g. +1 (555) 000-0000"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-xs uppercase tracking-widest font-mono text-white/40">Subject</label>
                      <select
                        name="subject"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-emerald-500 transition-colors text-sm font-light"
                      >
                        <option value="" disabled className="bg-neutral-900 text-white/30">Select project type</option>
                        <option value="AI Automation" className="bg-neutral-900 text-white">AI & Automation System</option>
                        <option value="Software Dev" className="bg-neutral-900 text-white">Software Development</option>
                        <option value="DevOps Infrastructure" className="bg-neutral-900 text-white">DevOps & Cloud</option>
                        <option value="Other Consultation" className="bg-neutral-900 text-white">Other Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest font-mono text-white/40">Message Details</label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors text-sm font-light resize-none leading-relaxed"
                      placeholder="Describe your goals, requirements, or timeframe..."
                    />
                  </div>

                  {error && (
                    <div className="text-rose-400 text-xs font-mono bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

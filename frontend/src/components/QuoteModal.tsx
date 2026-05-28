"use client";

import { useState, useEffect } from "react";
import { getApiUrl } from "@/lib/api";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function QuoteModal({ isOpen, onClose, serviceName }: QuoteModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(getApiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || null,
          subject: `Quote Request: ${serviceName}`,
          message,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.detail || "Failed to submit quote request. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please make sure the backend server is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content Container */}
      <div className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 z-10">
        {/* Glow decoration */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          {/* @ts-expect-error */}
          <iconify-icon icon="solar:close-circle-linear" width="20"></iconify-icon>
        </button>

        {/* Title */}
        <div className="mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Quote Request</span>
          </div>
          <h3 className="text-2xl font-bricolage text-white font-medium">Request a Quote</h3>
          <p className="text-white/50 text-sm mt-1">
            Let us know what you need for <span className="text-emerald-400 font-semibold">{serviceName}</span>
          </p>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium relative z-10 animate-fade-in">
            {/* @ts-expect-error */}
            <iconify-icon icon="solar:check-circle-linear" width="18"></iconify-icon>
            <span>Quote request submitted! We will contact you shortly.</span>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium relative z-10">
            {/* @ts-expect-error */}
            <iconify-icon icon="solar:danger-circle-linear" width="18"></iconify-icon>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider mb-2 block font-mono">Your Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" 
              className="w-full bg-black/60 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider mb-2 block font-mono">Work Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com" 
                className="w-full bg-black/60 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider mb-2 block font-mono">Phone (Optional)</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000" 
                className="w-full bg-black/60 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider mb-2 block font-mono">Message</label>
            <textarea 
              rows={4} 
              required 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project requirements, goals, and timeline..."
              className="w-full bg-black/60 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-wide text-xs hover:bg-neutral-100 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-6"
          >
            <span>{submitting ? "Submitting..." : "Submit Quote Request"}</span>
            {!submitting && (
              /* @ts-expect-error */
              <iconify-icon icon="solar:arrow-right-linear" width="16"></iconify-icon>
            )}
            {submitting && (
              <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

export default function FAQPage() {
  const { faqs } = useAppContext();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <div className="pt-40 pb-32 max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bricolage font-medium tracking-tighter mb-4">Frequently Asked Questions</h1>
        <p className="text-white/40 mb-16 text-lg">Find answers to common questions about our services and process.</p>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-medium text-white mb-4">{faq.question}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

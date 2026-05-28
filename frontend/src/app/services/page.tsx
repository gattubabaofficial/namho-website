"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function ServicesPage() {
  const { services } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenQuote = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      {/* Header Section */}
      <div suppressHydrationWarning className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest text-emerald-500 font-mono">Our Capabilities</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bricolage font-medium tracking-tighter mb-6 relative">
          Services We <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Provide</span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          From groundbreaking AI integrations to pixel-perfect mobile apps, we design, build, and scale digital products that dominate.
        </p>
      </div>

      {/* Services Grid */}
      <div suppressHydrationWarning className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              suppressHydrationWarning
              className="group relative bg-white/5 border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-500 flex flex-col items-start overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-full`}></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-white/15 transition-colors">
                {/* @ts-expect-error */}
                <iconify-icon icon={service.icon} width="28" className="text-white drop-shadow-lg"></iconify-icon>
              </div>
              
              <h3 className="text-2xl font-bricolage text-white font-medium mb-3">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">
                {service.description}
              </p>

              <button 
                onClick={() => handleOpenQuote(service.title)}
                className="mt-auto flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white group/btn"
              >
                Get a Quote
                {/* @ts-expect-error */}
                <iconify-icon icon="solar:arrow-right-linear" width="16" className="transform group-hover/btn:translate-x-1 transition-transform"></iconify-icon>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      
      {/* Quote Request Modal */}
      <QuoteModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        serviceName={selectedService} 
      />
    </main>
  );
}

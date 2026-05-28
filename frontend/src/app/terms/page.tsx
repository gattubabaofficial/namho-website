import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <div className="pt-40 pb-20 max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bricolage font-medium tracking-tighter mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-invert max-w-none text-white/60 space-y-6">
          <p>Last Updated: October 2024</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using NAMHO AI's website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">2. Description of Service</h2>
          <p>NAMHO AI provides digital intelligence services, including AI Automation, custom software development, and UI/UX design. We reserve the right to modify or discontinue any part of our service at any time.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">3. Intellectual Property</h2>
          <p>All content included on this site, such as text, graphics, logos, and software, is the property of NAMHO AI or its content suppliers and protected by international copyright laws.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">4. User Conduct</h2>
          <p>You agree not to use the service for any unlawful purpose or in any way that interrupts, damages, or impairs the service.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">5. Limitation of Liability</h2>
          <p>NAMHO AI shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of, or inability to access or use the services.</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

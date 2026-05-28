import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <div className="pt-40 pb-20 max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bricolage font-medium tracking-tighter mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-white/60 space-y-6">
          <p>Last Updated: October 2024</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">1. Information We Collect</h2>
          <p>We may collect personal information such as your name, email address, and company details when you contact us for inquiries, subscribe to our newsletter, or use our services.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">2. How We Use Your Information</h2>
          <p>The information we collect is used to provide and enhance our services, respond to your requests, and send periodic emails regarding updates or relevant products.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">3. Data Protection</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">4. Cookies</h2>
          <p>Our website may use "cookies" to enhance user experience. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent.</p>
          
          <h2 className="text-2xl text-white font-bricolage mt-12 mb-4">5. Third-Party Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information without your consent, except to trusted third parties who assist us in operating our website or serving you.</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

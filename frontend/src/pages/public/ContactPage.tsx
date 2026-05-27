import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to start your next big project? Contact us today for a free consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Us</p>
                    <p className="text-gray-400">hello@namho.com</p>
                    <p className="text-gray-400">support@namho.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Call Us</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400">Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Visit Us</p>
                    <p className="text-gray-400">123 Innovation Drive<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="glass h-64 rounded-2xl relative overflow-hidden flex items-center justify-center group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity"></div>
               <span className="relative z-10 font-semibold text-white/80 flex items-center gap-2">
                  <MapPin size={20} /> View on Google Maps
               </span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="h-16 w-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                    <Send size={32} />
                  </div>
                  <h4 className="text-2xl font-bold">Message Sent!</h4>
                  <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">First Name</label>
                      <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Last Name</label>
                      <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Subject</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white">
                      <option value="general">General Inquiry</option>
                      <option value="project">New Project</option>
                      <option value="support">Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Message</label>
                    <textarea required rows={5} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold text-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

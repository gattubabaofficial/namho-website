import { motion } from 'framer-motion';
import { ArrowRight, Code, Search, Smartphone, Zap, Camera, Briefcase, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';

export function HomePage() {
  const [socialPosts, setSocialPosts] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await apiClient.get('/social-posts?is_active=true');
        setSocialPosts(res.data.items || []);
      } catch (err) {
        console.error('Failed to load social posts');
      }
    };
    fetchSocials();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('Subscribing...');
    try {
      const res = await apiClient.post('/newsletter', { email });
      setNewsletterStatus(res.data.message || 'Subscribed successfully!');
      setEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    } catch (err) {
      setNewsletterStatus('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Transforming Ideas Into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                Digital Excellence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              We build enterprise-grade software and data-driven marketing strategies that scale your business to new heights.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portfolio" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group">
                View Our Work
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 backdrop-blur-sm transition-all flex items-center justify-center">
                Get a Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-black/50 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Expertise</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive solutions tailored for modern businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Web Development", desc: "High-performance applications built with modern frameworks." },
              { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile experiences." },
              { icon: Search, title: "SEO Optimization", desc: "Data-driven strategies to dominate search results." },
              { icon: Zap, title: "Digital Marketing", desc: "Targeted campaigns that drive real growth." },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-2xl group hover:border-blue-500/50 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending on Social Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trending on Social</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">See our latest updates, insights, and behind-the-scenes on LinkedIn and Instagram.</p>
          </div>

          {socialPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {socialPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl overflow-hidden shadow-lg border border-white/5 relative"
                >
                  <div className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center shadow-md border border-white/10">
                    {post.platform === 'linkedin' ? <Briefcase className="text-blue-500" /> : <Camera className="text-pink-500" />}
                  </div>
                  {/* Dangerously setting HTML for embeds - careful in production, but okay if admin controls it */}
                  <div className="w-full min-h-[400px] flex items-center justify-center bg-[#111]" dangerouslySetInnerHTML={{ __html: post.embed_code }} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 glass rounded-2xl border border-white/5">
              <p className="text-gray-400">No recent social posts to display right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-[#111] to-blue-900/10 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-16 text-center border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-violet-500/20 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Mail className="text-white" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead of the Curve</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
                Join our newsletter to get the latest insights on digital marketing trends, tech innovations, and exclusive offers delivered straight to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]">
                  Subscribe
                </button>
              </form>
              {newsletterStatus && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm font-medium text-blue-400">
                  {newsletterStatus}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass p-12 rounded-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
            <p className="text-gray-300 mb-8 text-lg">Let's discuss how we can help you achieve your goals with our tailored digital solutions.</p>
            <Link to="/contact" className="inline-block px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
              Start Your Project Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

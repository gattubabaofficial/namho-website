import { motion } from 'framer-motion';
import { ArrowRight, Code, Search, Smartphone, Zap, Camera, Briefcase, Mail, Sparkles, Rocket } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-neon-blue/15 rounded-full blur-[80px] animate-float" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-8"
            >
              <Sparkles size={16} className="text-neon-purple" />
              <span className="text-sm font-medium text-neon-purple">Welcome to the Future</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 leading-tight"
            >
              Transforming Ideas Into{' '}
              <br className="hidden md:block" />
              <span className="gradient-text-primary">Digital Excellence</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              We build enterprise-grade software and data-driven marketing strategies that scale your business to new heights. Experience the power of innovation with cutting-edge technology and world-class design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/portfolio"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold hover:shadow-neon transition-all duration-300 flex items-center justify-center gap-2 group hover-lift"
              >
                View Our Work
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-neon-cyan/50 text-white font-semibold hover:bg-neon-cyan/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center group hover-glow"
              >
                Get a Free Consultation
                <Rocket className="ml-2 group-hover:scale-110 transition-transform" size={20} />
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-neon-purple/30 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-2 bg-neon-purple rounded-full mt-2"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUSTED BY SECTION ===== */}
      <section className="py-20 bg-black/30 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Trusted by industry leaders</p>
          </motion.div>

          {/* Logo Marquee */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [-1000, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex gap-12 whitespace-nowrap"
            >
              {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Tesla', 'Netflix', 'Stripe'].map((company) => (
                <div key={company} className="flex items-center gap-3 px-6 py-3 glass rounded-lg hover-glow transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan" />
                  <span className="font-semibold text-gray-300">{company}</span>
                </div>
              ))}
              {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Tesla', 'Netflix', 'Stripe'].map((company) => (
                <div key={`${company}-2`} className="flex items-center gap-3 px-6 py-3 glass rounded-lg hover-glow transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan" />
                  <span className="font-semibold text-gray-300">{company}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-32 relative z-10 section-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Expertise</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive solutions tailored for modern businesses with cutting-edge technology and premium design.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Code, title: 'Web Development', desc: 'High-performance applications built with modern frameworks.' },
              { icon: Smartphone, title: 'Mobile Apps', desc: 'Native and cross-platform mobile experiences.' },
              { icon: Search, title: 'SEO Optimization', desc: 'Data-driven strategies to dominate search results.' },
              { icon: Zap, title: 'Digital Marketing', desc: 'Targeted campaigns that drive real growth.' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group glass p-8 rounded-2xl hover:border-neon-purple/50 transition-all duration-300 hover-lift"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 text-neon-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SOCIAL SECTION ===== */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Trending on Social</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              See our latest updates, insights, and behind-the-scenes on LinkedIn and Instagram.
            </p>
          </motion.div>

          {socialPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {socialPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="glass rounded-2xl overflow-hidden shadow-lg border border-white/5 relative group hover-lift"
                >
                  <div className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center shadow-md border border-white/10">
                    {post.platform === 'linkedin' ? (
                      <Briefcase className="text-neon-blue" />
                    ) : (
                      <Camera className="text-neon-cyan" />
                    )}
                  </div>
                  <div
                    className="w-full min-h-[400px] flex items-center justify-center bg-[#111]"
                    dangerouslySetInnerHTML={{ __html: post.embed_code }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center p-12 glass rounded-2xl border border-white/5"
            >
              <p className="text-gray-400">No recent social posts to display right now.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="py-32 bg-gradient-to-b from-[#111] to-neon-purple/10 border-t border-white/5 relative z-10 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 bg-neon-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 bg-neon-cyan/20 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-16 text-center border border-neon-purple/30 shadow-[0_0_50px_rgba(124,58,237,0.2)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-neon-purple to-neon-cyan rounded-full flex items-center justify-center mb-6 shadow-neon">
                <Mail className="text-white" size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Stay Ahead of the Curve</h2>
              <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                Join our newsletter to get the latest insights on digital marketing trends, tech innovations, and exclusive offers delivered straight to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 input-glass"
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              {newsletterStatus && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm font-medium text-neon-cyan"
                >
                  {newsletterStatus}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-cyan/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass p-12 rounded-3xl border border-neon-purple/30"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to scale your business?</h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Let's discuss how we can help you achieve your goals with our tailored digital solutions and innovative strategies.
            </p>
            <Link
              to="/contact"
              className="inline-block btn-primary"
            >
              Start Your Project Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

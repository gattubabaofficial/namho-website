import { motion } from 'framer-motion';
import { Award, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Driving Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Innovation</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We are a team of passionate engineers, designers, and strategists dedicated to transforming businesses through cutting-edge technology and data-driven marketing.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/10 bg-black/50 py-16 mb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '30+', label: 'Happy Clients' },
              { value: '15+', label: 'Team Experts' },
              { value: '5', label: 'Years Experience' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-400">The principles that guide everything we do.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: Target, title: 'Results-Driven', desc: 'We focus on delivering measurable ROI and tangible business outcomes for every client.' },
            { icon: Zap, title: 'Innovation', desc: 'We stay ahead of the curve, constantly exploring new technologies to give you a competitive edge.' },
            { icon: Users, title: 'Collaboration', desc: 'We work closely as an extension of your team, ensuring transparent communication at every step.' },
            { icon: Award, title: 'Excellence', desc: 'We refuse to settle for "good enough". We strive for perfection in every pixel and line of code.' },
          ].map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl flex gap-6 items-start"
            >
              <div className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <value.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-4xl text-center">
        <div className="glass p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20" />
          <h2 className="text-3xl font-bold mb-6 relative z-10">Want to work with us?</h2>
          <Link to="/contact" className="relative z-10 inline-block px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

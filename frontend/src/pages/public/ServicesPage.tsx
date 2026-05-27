import { motion } from 'framer-motion';
import { ArrowRight, Code, Search, Smartphone, Zap, Monitor, Cloud, Database, BarChart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ALL_SERVICES = [
  { id: '1', title: 'Web Development', desc: 'Enterprise-grade web applications built with modern frameworks and scalable architectures.', category: 'Tech', icon: Code },
  { id: '2', title: 'Mobile Apps', desc: 'Native and cross-platform mobile experiences that engage users on any device.', category: 'Tech', icon: Smartphone },
  { id: '3', title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that convert visitors into loyal customers.', category: 'Tech', icon: Monitor },
  { id: '4', title: 'Cloud Infrastructure', desc: 'Secure, scalable cloud setups using AWS, Google Cloud, or Azure.', category: 'Tech', icon: Cloud },
  { id: '5', title: 'SEO Optimization', desc: 'Data-driven strategies to dominate search engine results pages.', category: 'Marketing', icon: Search },
  { id: '6', title: 'Digital Marketing', desc: 'Targeted campaigns that drive real growth and measurable ROI.', category: 'Marketing', icon: Zap },
  { id: '7', title: 'Data Analytics', desc: 'Actionable insights derived from your complex business data.', category: 'Marketing', icon: BarChart },
  { id: '8', title: 'Database Design', desc: 'Optimized schemas and performant queries for heavy workloads.', category: 'Tech', icon: Database },
];

export function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Tech' | 'Marketing'>('All');

  const filteredServices = ALL_SERVICES.filter(
    (s) => activeTab === 'All' || s.category === activeTab
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive digital solutions tailored to elevate your business in the modern landscape.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {['All', 'Tech', 'Marketing'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-violet-600/0 group-hover:from-blue-600/10 group-hover:to-violet-600/10 transition-colors duration-500" />
              
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400 flex items-center justify-center mb-6 relative z-10">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">
                {service.desc}
              </p>
              
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors relative z-10 group/link">
                Learn more
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

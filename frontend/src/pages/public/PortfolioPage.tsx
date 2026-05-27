import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { useState } from 'react';

const PORTFOLIO_PROJECTS = [
  { id: '1', title: 'E-Commerce Redesign', category: 'Web', tech: ['React', 'Next.js', 'Stripe'], image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop' },
  { id: '2', title: 'FinTech Dashboard', category: 'App', tech: ['React Native', 'Node.js', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
  { id: '3', title: 'AI Marketing Platform', category: 'Web', tech: ['Vue.js', 'Python', 'TensorFlow'], image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
  { id: '4', title: 'Healthcare Portal', category: 'Web', tech: ['Angular', 'Java', 'AWS'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop' },
  { id: '5', title: 'Fitness Tracker', category: 'App', tech: ['Swift', 'Kotlin', 'Firebase'], image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop' },
  { id: '6', title: 'Real Estate CRM', category: 'Web', tech: ['React', 'Django', 'MySQL'], image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop' },
];

export function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Web' | 'App'>('All');

  const filteredProjects = PORTFOLIO_PROJECTS.filter(
    (p) => activeTab === 'All' || p.category === activeTab
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of our best work across web and mobile platforms.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {['All', 'Web', 'App'].map((tab) => (
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

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="group rounded-2xl overflow-hidden glass border border-white/10 relative"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 relative z-20 bg-black/80 backdrop-blur-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <div className="flex gap-2">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Code size={18} /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><ExternalLink size={18} /></a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

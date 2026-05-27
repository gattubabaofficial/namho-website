import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  { id: '1', category: 'General', question: 'What services do you offer?', answer: 'We offer a comprehensive suite of digital services including web development, mobile app development, UI/UX design, cloud infrastructure, SEO optimization, and digital marketing.' },
  { id: '2', category: 'General', question: 'How long does a typical project take?', answer: 'Project timelines vary depending on scope and complexity. A standard web application might take 8-12 weeks, while a simpler marketing site could be completed in 4-6 weeks. We provide detailed timelines during our initial consultation.' },
  { id: '3', category: 'Development', question: 'What technologies do you use?', answer: 'We are stack-agnostic but specialize in modern, scalable technologies. For web, we often use React, Next.js, and Vue. For backend, we use Node.js, Python (FastAPI/Django), and Java. We deploy on AWS, Google Cloud, and Azure.' },
  { id: '4', category: 'Development', question: 'Do you provide ongoing support?', answer: 'Yes! We offer comprehensive maintenance and support retainers to ensure your application stays secure, up-to-date, and continues to perform optimally after launch.' },
  { id: '5', category: 'Marketing', question: 'When will I see results from SEO?', answer: 'SEO is a long-term strategy. While some improvements can be seen in the first month (usually from technical fixes), significant organic growth typically takes 3-6 months to materialize depending on your industry\'s competitiveness.' },
];

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>('1');

  const categories = ['All', ...Array.from(new Set(FAQS.map(f => f.category)))];
  
  const filteredFaqs = FAQS.filter(
    (f) => activeCategory === 'All' || f.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg">
            Find answers to common questions about our services, process, and more.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <motion.div layout className="space-y-4">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl overflow-hidden border transition-colors ${isOpen ? 'border-blue-500/50' : 'border-white/10'}`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-blue-400' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Still have questions */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 glass rounded-3xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">We're here to help! Contact our team for personalized answers.</p>
          <Link to="/contact" className="inline-block px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto glass p-12 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-violet-600/10" />
          
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-4 relative z-10">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Page Not Found</h2>
          <p className="text-gray-400 mb-8 relative z-10">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] relative z-10">
            <Home size={20} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

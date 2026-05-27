import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  { id: '1', title: 'The Future of Web Development in 2026', category: 'Technology', author: 'Jane Doe', readTime: '5 min read', date: 'May 20, 2026', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' },
  { id: '2', title: 'Maximizing ROI with Data-Driven SEO', category: 'Marketing', author: 'John Smith', readTime: '7 min read', date: 'May 18, 2026', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
  { id: '3', title: 'Why You Need a Cloud-Native Architecture', category: 'Engineering', author: 'Alice Johnson', readTime: '6 min read', date: 'May 15, 2026', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' },
  { id: '4', title: 'Mastering User Retention in Mobile Apps', category: 'UX Design', author: 'Mike Brown', readTime: '4 min read', date: 'May 10, 2026', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
];

export function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Insights, tutorials, and news from the experts at Namho.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-colors"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                    <div>{post.date}</div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                  <div className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                    Read Article &rarr;
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

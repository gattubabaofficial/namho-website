import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, MessageSquare, Users, Briefcase, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
  { name: 'Total Services', value: '12', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Active Projects', value: '8', icon: FileText, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { name: 'Published Posts', value: '45', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { name: 'Unread Messages', value: '3', icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const RECENT_MESSAGES = [
  { id: 1, name: 'John Doe', subject: 'Project Inquiry', date: 'Today, 10:23 AM', unread: true },
  { id: 2, name: 'Jane Smith', subject: 'SEO Services', date: 'Yesterday', unread: true },
  { id: 3, name: 'Mike Brown', subject: 'Partnership', date: 'Jan 18, 2026', unread: true },
  { id: 4, name: 'Sarah Wilson', subject: 'Career Opportunities', date: 'Jan 15, 2026', unread: false },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/5 bg-[#161616] p-6 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/5 bg-[#161616] shadow-sm flex flex-col"
        >
          <div className="border-b border-white/5 p-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
            <Link to="/admin/messages" className="text-sm text-blue-400 hover:text-blue-300 font-medium">View all</Link>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-white/5">
              {RECENT_MESSAGES.map((msg) => (
                <li key={msg.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {msg.unread ? (
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-transparent" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${msg.unread ? 'text-white' : 'text-gray-300'}`}>{msg.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{msg.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{msg.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-white/5 bg-[#161616] shadow-sm flex flex-col"
        >
          <div className="border-b border-white/5 p-6">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link to="/admin/blog/new" className="group rounded-xl border border-white/5 bg-[#222] p-6 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-blue-400 group-hover:bg-blue-500/10">
                <FileText size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">New Blog Post</span>
            </Link>
            
            <Link to="/admin/projects/new" className="group rounded-xl border border-white/5 bg-[#222] p-6 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-violet-400 group-hover:bg-violet-500/10">
                <Briefcase size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Add Project</span>
            </Link>
            
            <Link to="/admin/services" className="group rounded-xl border border-white/5 bg-[#222] p-6 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-emerald-400 group-hover:bg-emerald-500/10">
                <BarChart3 size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Manage Services</span>
            </Link>
            
            <Link to="/admin/settings" className="group rounded-xl border border-white/5 bg-[#222] p-6 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-amber-400 group-hover:bg-amber-500/10">
                <Users size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Site Settings</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

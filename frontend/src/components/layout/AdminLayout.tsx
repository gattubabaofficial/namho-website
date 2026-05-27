import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, FileText, Briefcase, Users, MessageSquare, HelpCircle, Star, LogOut, ChevronRight, Menu, X, Link2, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', path: '/admin/services', icon: Briefcase },
  { name: 'Projects', path: '/admin/projects', icon: FileText },
  { name: 'Blog', path: '/admin/blog', icon: FileText },
  { name: 'Social Feeds', path: '/admin/social', icon: Link2 },
  { name: 'Newsletter', path: '/admin/newsletter', icon: Mail },
  { name: 'Team', path: '/admin/team', icon: Users },
  { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare, badge: 3 },
  { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-[#0a0a0a] border-r border-white/5 w-64 text-gray-300">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2" title="View Website">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-violet-500" />
          <span className="text-lg font-bold text-white tracking-tight">Namho Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'} />
                {item.name}
              </div>
              {item.badge && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut size={18} className="text-gray-400 group-hover:text-red-400" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#111] text-white overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0a0a0a] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="-ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">Logged in as <strong className="text-white">Admin</strong></span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold shadow-lg">
              AD
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#111] p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../../api/client';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await apiClient.post('/auth/register', {
        username,
        email,
        password
      });
      // Optionally login the user immediately or just navigate to login
      navigate('/admin/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased">
      {/* Dynamic Background with improved gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/15 via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/[0.02] p-8 sm:p-10 rounded-3xl border border-white/[0.05] shadow-2xl backdrop-blur-2xl">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 mb-6 border border-white/5 ring-1 ring-white/10 shadow-[0_0_30px_rgba(99,102,241,0.15)]"
            >
              <User className="text-indigo-400" size={28} strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-3xl font-display font-semibold text-white tracking-tight mb-2">Create Account</h1>
            <p className="text-lg text-zinc-300 font-serif italic mb-6">Register a new admin portal access</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-sm mb-6 text-center font-medium backdrop-blur-md"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 border border-white/[0.07] rounded-xl leading-5 bg-white/[0.03] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 sm:text-sm transition-all duration-200"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 border border-white/[0.07] rounded-xl leading-5 bg-white/[0.03] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 sm:text-sm transition-all duration-200"
                  placeholder="admin@namho.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 border border-white/[0.07] rounded-xl leading-5 bg-white/[0.03] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 sm:text-sm transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.15)] text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#0a0a0a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
            
            <div className="text-center mt-6">
              <Link to="/admin/login" className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                Already have an account? <span className="text-indigo-400 hover:text-indigo-300 ml-1 font-medium">Sign in</span>
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

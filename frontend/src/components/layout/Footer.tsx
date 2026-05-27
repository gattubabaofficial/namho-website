import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-violet-500" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                Namho
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Empowering businesses with enterprise-grade digital solutions and marketing strategies.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">SEO Optimization</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>hello@namho.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Namho. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

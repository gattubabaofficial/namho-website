import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { PortfolioPage } from './pages/public/PortfolioPage';
import { BlogPage } from './pages/public/BlogPage';
import { ContactPage } from './pages/public/ContactPage';
import { FAQPage } from './pages/public/FAQPage';
import { NotFoundPage } from './pages/public/NotFoundPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { RegisterPage } from './pages/admin/RegisterPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ServicesAdminPage } from './pages/admin/ServicesAdminPage';
import { BlogAdminPage } from './pages/admin/BlogAdminPage';
import { SocialAdminPage } from './pages/admin/SocialAdminPage';
import { NewsletterAdminPage } from './pages/admin/NewsletterAdminPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
          <Route index element={<DashboardPage />} />
          {/* Real routes */}
          <Route path="services" element={<ServicesAdminPage />} />
          <Route path="blog" element={<BlogAdminPage />} />
          <Route path="social" element={<SocialAdminPage />} />
          <Route path="newsletter" element={<NewsletterAdminPage />} />
          {/* Mock routes for others */}
          <Route path="projects" element={<div className="p-8 text-center text-gray-400">Projects Admin Content</div>} />
          <Route path="team" element={<div className="p-8 text-center text-gray-400">Team Admin Content</div>} />
          <Route path="testimonials" element={<div className="p-8 text-center text-gray-400">Testimonials Admin Content</div>} />
          <Route path="messages" element={<div className="p-8 text-center text-gray-400">Messages Admin Content</div>} />
          <Route path="faqs" element={<div className="p-8 text-center text-gray-400">FAQs Admin Content</div>} />
          <Route path="settings" element={<div className="p-8 text-center text-gray-400">Settings Admin Content</div>} />
        </Route>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;

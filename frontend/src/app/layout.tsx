import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { AppProvider } from "@/context/AppContext";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "NAMHO — Digital Intelligence Agency",
  description: "We engineer digital evolution. A full-service agency bridging AI Automation, custom software, and immersive design to scale your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(m) {
                  if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                    m.target.removeAttribute('bis_skin_checked');
                  }
                });
              });
              observer.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked'] });
            } catch (e) {}
          })();
        ` }} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Fonts — preconnect + single consolidated stylesheet request */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap"
        />
        {/* Preload critical hero image for faster LCP */}
        <link rel="preload" as="image" href="/assets/hero-bg.webp" />
        {/* Iconify — load after page is interactive */}
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" defer></script>
      </head>
      <body className="bg-neutral-950 text-neutral-50 w-full overflow-x-hidden selection:bg-white/20 selection:text-white relative" suppressHydrationWarning>
        <AppProvider>
          {/* Grain overlay */}
          <div className="bg-grain" suppressHydrationWarning />
          <Preloader />
          {children}
        </AppProvider>

        {/* In-view animation initializer */}
        <Script id="in-view-observer" strategy="afterInteractive">{`
          (function () {
            if (!window.__inViewIO) {
              window.__inViewIO = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('animate');
                    window.__inViewIO.unobserve(el);
                    // Release will-change after animation to free GPU memory
                    el.addEventListener('animationend', function onEnd() {
                      el.style.willChange = 'auto';
                      el.removeEventListener('animationend', onEnd);
                    }, { once: true });
                  }
                });
              }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
            }
            window.initInViewAnimations = function() {
              if (window.__inViewIO) {
                document.querySelectorAll('.animate-on-scroll').forEach((el) => {
                  window.__inViewIO.observe(el);
                });
              }
            };
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', window.initInViewAnimations);
            } else {
              window.initInViewAnimations();
            }
          })();
        `}</Script>
      </body>
    </html>
  );
}

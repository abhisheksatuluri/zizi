import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import InstagramArchive from './components/InstagramArchive';
import { getProductBySlug } from './data/products';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import SmoothScroll from './components/SmoothScroll';
import ParallaxReveal from './components/ParallaxReveal';
import CardScrollSection from './components/CardScrollSection';

// Lazy-loaded heavy components for code splitting
const FullCollection = lazy(() => import('./components/FullCollection'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const CartPage = lazy(() => import('./components/CartPage'));
const ThankYouPage = lazy(() => import('./components/ThankYouPage'));
const CheckoutPage = lazy(() => import('./components/CheckoutPage'));
const AccountPage = lazy(() => import('./components/AccountPage'));
const AccountOrdersPage = lazy(() => import('./components/AccountOrdersPage'));
const AccountDetailsPage = lazy(() => import('./components/AccountDetailsPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="text-white text-center">
      <h1 className="text-4xl font-serif mb-4 animate-pulse">ZIZI</h1>
      <p className="text-xs tracking-widest uppercase text-white/50">Loading...</p>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'collection' | 'about' | 'product' | 'cart' | 'thank-you' | 'checkout' | 'account' | 'account-orders' | 'account-details'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll for logo animation
  useEffect(() => {
    const handleScroll = () => {
      // slower docking on mobile for better experience
      const threshold = isMobile ? window.innerHeight * 0.6 : window.innerHeight * 0.4;
      const progress = Math.min(window.scrollY / threshold, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Handle URL routing
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/product/') || path.startsWith('/collection/')) {
        const slug = path.split('/').pop();
        if (slug) {
          setCurrentProductSlug(slug);
          setCurrentView('product');
          window.scrollTo(0, 0);
          return;
        }
      }
      if (path === '/collection') { setCurrentView('collection'); return; }
      if (path === '/cart') { setCurrentView('cart'); return; }
      if (path === '/checkout') { setCurrentView('checkout'); return; }
      if (path === '/checkout/thank-you') { setCurrentView('thank-you'); return; }
      if (path === '/account/orders') { setCurrentView('account-orders'); return; }
      if (path === '/account/details') { setCurrentView('account-details'); return; }
      if (path === '/account') { setCurrentView('account'); return; }
      if (path === '/') setCurrentView('home');
    };
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Section and Theme Detection
  useEffect(() => {
    if (['collection', 'about', 'product', 'cart', 'thank-you', 'checkout', 'account', 'account-orders', 'account-details'].includes(currentView)) {
      setTheme('light');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute('data-theme') as 'dark' | 'light';
          if (sectionTheme) setTheme(sectionTheme);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[data-section-name]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [currentView]);

  const navigateTo = (view: 'home' | 'collection' | 'about' | 'cart' | 'checkout' | 'thank-you' | 'account' | 'account-orders' | 'account-details') => {
    window.history.pushState({}, '', view === 'home' ? '/' : `/${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const navigateToProduct = (slug: string) => {
    window.history.pushState({}, '', `/collection/${slug}`);
    setCurrentProductSlug(slug);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const isDocked = scrollProgress === 1 || currentView !== 'home';
  const currentProduct = currentProductSlug ? getProductBySlug(currentProductSlug) : null;
  const [dockedScale, setDockedScale] = useState(0.12);

  useEffect(() => {
    const calculateScale = () => {
      const width = window.innerWidth;
      const baseSize = width * 0.16;
      const targetSize = width < 768 ? 28 : 40; // Smaller target on mobile
      const scale = Math.min(Math.max(targetSize / baseSize, 0.08), 1);
      setDockedScale(scale);
    };
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // Color logic for logo
  const getLogoColor = () => {
    if (currentView !== 'home') return 'black';
    if (scrollProgress < 0.2) return 'white'; // Keep white longer
    return theme === 'dark' ? 'white' : 'black';
  };

  // Calculate Y movement for docking
  const getLogoTransform = () => {
    const headerOffset = isMobile ? '2.4rem' : '2.2rem';
    if (isDocked) return `translateY(calc(-50vh + ${headerOffset})) scale(${dockedScale})`;

    const yMove = `calc(-${scrollProgress * 50}vh + ${scrollProgress * parseFloat(headerOffset)}rem)`;
    const scaleVal = 1 - (scrollProgress * (1 - dockedScale));
    return `translateY(${yMove}) scale(${scaleVal})`;
  };

  return (
    <AuthProvider>
      <CartProvider>
        <SmoothScroll>
          <div className="grain relative bg-white font-sans selection:bg-[#D4AF37] selection:text-white min-h-screen overflow-x-hidden w-full max-w-full">
            <Navbar theme={theme} onNavigate={navigateTo} currentView={currentView} isLogoDocked={isDocked} />

            {/* --- DYNAMIC MONOLITHIC LOGO --- */}
            <div className="fixed inset-0 z-[170] flex items-center justify-center pointer-events-none">
              <h1
                onClick={() => navigateTo('home')}
                className="font-serif font-bold tracking-tighter leading-none cursor-pointer pointer-events-auto select-none"
                style={{
                  transform: getLogoTransform(),
                  fontSize: '16vw',
                  color: getLogoColor(),
                  transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.4s ease',
                  textShadow: (currentView === 'home' && scrollProgress < 0.5) ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                ZIZI
              </h1>
            </div>

            {/* --- VIEW ROUTING --- */}
            {currentView === 'home' ? (
              <main className="relative">
                {/* Hero Section - Full viewport with parallax background */}
                <CardScrollSection index={0} className="min-h-[100dvh]">
                  <div className="h-[100dvh] w-full overflow-hidden" data-section-name="The Beginning" data-theme="dark">
                    <Hero onNavigateProduct={navigateToProduct} />
                  </div>
                </CardScrollSection>

                {/* Featured Collection - Cards animate from left */}
                <CardScrollSection index={1} className="min-h-screen md:min-h-[100dvh] bg-white">
                  <ParallaxReveal direction="left" offset={80}>
                    <div className="min-h-screen md:h-[100dvh] w-full overflow-hidden" data-section-name="Featured" data-theme="light">
                      <FeaturedCollection onNavigateProduct={navigateToProduct} />
                    </div>
                  </ParallaxReveal>
                </CardScrollSection>

                {/* About Section - Content animates from right */}
                <CardScrollSection index={2} className="bg-[#f4f4f4]">
                  <ParallaxReveal direction="right" offset={80}>
                    <div className="w-full overflow-hidden" data-section-name="Our Philosophy" data-theme="light">
                      <AboutSection />
                    </div>
                  </ParallaxReveal>
                </CardScrollSection>

                {/* Testimonials - Animate from left */}
                <CardScrollSection index={3} className="bg-[#fbfaf8]">
                  <ParallaxReveal direction="left" offset={60}>
                    <div className="w-full overflow-hidden" data-section-name="Voices" data-theme="light">
                      <Testimonials />
                    </div>
                  </ParallaxReveal>
                </CardScrollSection>

                {/* Instagram Archive - Animate from right */}
                <CardScrollSection index={4} className="bg-[#f4f4f4]">
                  <ParallaxReveal direction="right" offset={60}>
                    <div className="w-full overflow-hidden" data-section-name="Archive" data-theme="light">
                      <InstagramArchive />
                    </div>
                  </ParallaxReveal>
                </CardScrollSection>

                {/* Newsletter - Animate from left */}
                <CardScrollSection index={5} className="bg-black">
                  <ParallaxReveal direction="left" offset={60}>
                    <div className="w-full overflow-hidden" data-section-name="Join Us" data-theme="dark">
                      <Newsletter />
                    </div>
                  </ParallaxReveal>
                </CardScrollSection>

                {/* Footer - Animate up */}
                <CardScrollSection index={6} className="bg-[#050505]">
                  <ParallaxReveal direction="up" offset={40}>
                    <div className="w-full overflow-hidden py-16 md:py-24" data-section-name="Connect" data-theme="dark">
                      <Footer />
                    </div>
                  </ParallaxReveal>
                </CardScrollSection>
              </main>
            ) : (
              <div className="pt-20">
                {currentView === 'about' ? (
                  <Suspense fallback={<PageLoader />}><AboutPage /></Suspense>
                ) : currentView === 'cart' ? (
                  <Suspense fallback={<PageLoader />}><CartPage onNavigate={navigateTo} /></Suspense>
                ) : currentView === 'thank-you' ? (
                  <Suspense fallback={<PageLoader />}><ThankYouPage onNavigate={navigateTo} /></Suspense>
                ) : currentView === 'checkout' ? (
                  <Suspense fallback={<PageLoader />}><CheckoutPage onNavigate={navigateTo} /></Suspense>
                ) : currentView === 'account' ? (
                  <Suspense fallback={<PageLoader />}><AccountPage onNavigate={navigateTo} /></Suspense>
                ) : currentView === 'account-orders' ? (
                  <Suspense fallback={<PageLoader />}><AccountOrdersPage onNavigate={navigateTo} /></Suspense>
                ) : currentView === 'account-details' ? (
                  <Suspense fallback={<PageLoader />}><AccountDetailsPage onNavigate={navigateTo} /></Suspense>
                ) : currentView === 'product' && currentProduct ? (
                  <Suspense fallback={<PageLoader />}>
                    <ProductDetailPage
                      product={currentProduct}
                      onBack={() => navigateTo('collection')}
                      onNavigate={navigateTo}
                    />
                  </Suspense>
                ) : (
                  <Suspense fallback={<PageLoader />}><FullCollection onNavigateProduct={navigateToProduct} /></Suspense>
                )}
              </div>
            )}
          </div>
        </SmoothScroll>
      </CartProvider>
    </AuthProvider>
  );
}
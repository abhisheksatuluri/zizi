import React, { useState } from 'react';
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  theme: 'dark' | 'light';
  onNavigate: (view: 'home' | 'collection' | 'about' | 'cart') => void;
  currentView: 'home' | 'collection' | 'about' | 'cart';
}

const Navbar: React.FC<NavbarProps> = ({ theme, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { items } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  // Dynamic color classes based on theme
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const hoverColor = theme === 'dark' ? 'hover:text-white/70' : 'hover:text-black/60';
  const mutedColor = theme === 'dark' ? 'text-white/80' : 'text-black/80';

  // Header bar background based on theme
  const bgColor = theme === 'dark'
    ? 'bg-black/60 border-b border-white/5'
    : 'bg-white/70 border-b border-black/5';

  const handleLinkClick = (view: 'home' | 'collection' | 'about' | 'cart') => {
    setIsMobileMenuOpen(false);
    onNavigate(view);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      window.history.pushState({}, '', '/account');
      onNavigate('account' as any);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const menuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 ${isMobileMenuOpen ? 'z-[180]' : 'z-[160]'} transition-all duration-700 backdrop-blur-md ${bgColor} ${textColor}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-8 flex items-center justify-between relative">

          {/* Mobile Home Link (Left) */}
          <div className="md:hidden z-[190] flex items-center mr-auto">
            {currentView !== 'home' && (
              <button
                onClick={() => handleLinkClick('home')}
                className={`${textColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
              >
                Home
              </button>
            )}
          </div>

          {/* Left Links */}
          <div className="hidden md:flex space-x-8 z-20">
            <button
              onClick={() => handleLinkClick('collection')}
              className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
            >
              Collection
            </button>
            {currentView !== 'home' && (
              <button
                onClick={() => handleLinkClick('home')}
                className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
              >
                Home
              </button>
            )}
            <button
              onClick={() => handleLinkClick('about')}
              className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
            >
              About
            </button>
          </div>

          {/* Center Space - Reserved for animated logo from App.tsx */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-8 flex items-center justify-center pointer-events-none">
            {/* Empty - The animated ZIZI logo docks here from App.tsx */}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-8 z-20">
            <button className={`${mutedColor} ${hoverColor} transition-colors`}>
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <div className="relative">
              <button
                onClick={() => handleLinkClick('cart')}
                className={`${mutedColor} ${hoverColor} transition-colors`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {items.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={items.reduce((acc, item) => acc + item.quantity, 0)} // Trigger animation on count change
                    className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    style={{ boxShadow: '0 0 8px rgba(220, 38, 38, 0.6)' }}
                  >
                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={handleUserClick}
              className={`${mutedColor} ${hoverColor} transition-colors relative`}
              title={isAuthenticated ? `Signed in as ${user?.name || user?.email}` : "Sign In"}
            >
              {isAuthenticated && !user?.isGuest ? (
                <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold border border-white/20">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              ) : (
                <User size={20} strokeWidth={1.5} className={isAuthenticated ? "fill-current" : ""} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Cart Indicator */}
          <div className="md:hidden z-[190] ml-auto flex items-center space-x-4">
            <AnimatePresence>
              {items.reduce((acc, item) => acc + item.quantity, 0) > 0 && !isMobileMenuOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleLinkClick('cart')}
                  className={`relative ${textColor} p-2`}
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-3 h-3 flex items-center justify-center rounded-full">
                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isMobileMenuOpen ? 'text-white' : textColor} p-4 -mr-2 rounded-full transition-colors duration-300 relative`}
              style={{ zIndex: 191 }}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed inset-0 bg-black z-[180] flex flex-col h-screen touch-none grain overflow-hidden"
            >
              {/* Artistic background element for mobile menu */}
              <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent blur-3xl" />
              </div>

              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex-1 flex flex-col items-center justify-center space-y-12 relative z-10"
              >
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => handleLinkClick('home')}
                  className="text-white text-6xl font-serif mb-6 tracking-tighter"
                >
                  ZIZI
                </motion.button>

                <div className="w-8 h-px bg-white/10" />

                <div className="flex flex-col items-center space-y-6">
                  {[
                    { label: 'Collection', view: 'collection' },
                    { label: 'About', view: 'about' }
                  ].map((item) => (
                    <motion.button
                      key={item.view}
                      variants={menuItemVariants}
                      onClick={() => handleLinkClick(item.view as any)}
                      className="text-white text-4xl font-serif tracking-tight hover:italic transition-all duration-300 transform"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                <div className="pt-12 flex space-x-12">
                  {[
                    { icon: Heart, key: 'wishlist' },
                    { icon: ShoppingBag, key: 'cart', action: () => handleLinkClick('cart') },
                    { icon: User, key: 'profile', action: handleUserClick }
                  ].map((IconItem) => (
                    <motion.button
                      key={IconItem.key}
                      variants={menuItemVariants}
                      onClick={IconItem.action}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <IconItem.icon size={28} strokeWidth={1} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Footer info in menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 w-full text-center"
              >
                <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Signature Archive — 2025</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
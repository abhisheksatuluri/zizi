import React, { useState } from 'react';
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'dark' | 'light';
  onNavigate: (view: 'home' | 'collection' | 'inspiration' | 'about' | 'cart') => void;
  currentView: 'home' | 'collection' | 'inspiration' | 'about' | 'cart';
  isLogoDocked?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onNavigate, currentView, isLogoDocked }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic color classes based on theme
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const hoverColor = theme === 'dark' ? 'hover:text-white/70' : 'hover:text-black/60';
  const mutedColor = theme === 'dark' ? 'text-white/80' : 'text-black/80';

  // Header bar background based on theme
  const bgColor = theme === 'dark'
    ? 'bg-black/60 border-b border-white/5'
    : 'bg-white/70 border-b border-black/5';

  const handleLinkClick = (view: 'home' | 'collection' | 'inspiration' | 'about' | 'cart') => {
    setIsMobileMenuOpen(false);
    onNavigate(view);
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
    <nav className={`fixed top-0 left-0 right-0 ${isMobileMenuOpen ? 'z-[180]' : 'z-[160]'} transition-all duration-700 backdrop-blur-md ${bgColor} ${textColor}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 md:py-8 flex items-center justify-between relative">

        {/* Left Links */}
        <div className="hidden md:flex space-x-8 z-20">
          <button
            onClick={() => handleLinkClick('collection')}
            className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
          >
            Collection
          </button>
          <button
            onClick={() => handleLinkClick('inspiration')}
            className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
          >
            Inspiration
          </button>
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
          <button
            onClick={() => handleLinkClick('cart')}
            className={`${mutedColor} ${hoverColor} transition-colors`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button className={`${mutedColor} ${hoverColor} transition-colors`}>
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-[190] ml-auto">
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
                  { label: 'Inspiration', view: 'inspiration' },
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
                  { icon: User, key: 'profile' }
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
  );
};

export default Navbar;
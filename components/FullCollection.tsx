import React, { useRef } from 'react';
import { products, getProductBySlug } from '../data/products';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FullCollectionProps {
  onNavigateProduct?: (slug: string) => void;
}

// Image mapping for Collection Page specific assets
// Section Configuration: Backgrounds, Alignment, and Theme
const SECTION_CONFIG: Record<string, {
  desktop: string;
  mobile: string;
  alignment: 'left' | 'right';
  theme: 'dark' | 'light';
}> = {
  'dior-eloise': {
    desktop: '/zizi-webp/eloise.webp',
    mobile: '/zizi-webp/eloise-mobile.webp',
    alignment: 'left',
    theme: 'dark'
  },
  'fendi-vittoria': {
    desktop: '/zizi-webp/vittoria.webp',
    mobile: '/zizi-webp/vittoria-mobile.webp',
    alignment: 'right',
    theme: 'light'
  },
  'lv-aurele': {
    desktop: '/zizi-webp/aurele.webp',
    mobile: '/zizi-webp/aurele-mobile.webp',
    alignment: 'left',
    theme: 'dark'
  },
  'lv-benoit': {
    desktop: '/zizi-webp/benoit.webp',
    mobile: '/zizi-webp/benoit-mobile.webp',
    alignment: 'right',
    theme: 'dark'
  },
  'hermes-henrietta': {
    desktop: '/zizi-webp/henrietta.webp',
    mobile: '/zizi-webp/henrietta-mobile.webp',
    alignment: 'right',
    theme: 'light'
  },
  'harrods-william': {
    desktop: '/zizi-webp/william.webp',
    mobile: '/zizi-webp/william-mobile.webp',
    alignment: 'left',
    theme: 'light'
  },
  'fortnum-reginald': {
    desktop: '/zizi-webp/reginald.webp',
    mobile: '/zizi-webp/reginald-mobile.webp',
    alignment: 'right',
    theme: 'light' // Lighter background, dark text
  }
};

// Product descriptions for editorial feel
const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  'dior-eloise': 'A sculptural homage to Parisian elegance, rendered in signature Toile de Jouy.',
  'fendi-vittoria': 'Bold geometry meets Italian craftsmanship in verdant monogram.',
  'lv-aurele': 'The quiet confidence of Maison heritage, elevated in gold.',
  'lv-benoit': 'A statement of refined luxury, accented with timeless marquetry.',
  'hermes-henrietta': 'The spirit of the saddle, reimagined for the modern collector.',
  'harrods-william': 'British elegance, distilled into an iconic silhouette.',
  'fortnum-reginald': 'London heritage embodied in the crown jewel of the collection.'
};

// Helper not needed with new config approach, but keeping if other parts use it, otherwise ignoring
const getDisplayImage = (slug: string, fallbackImages: string[]) => {
  return fallbackImages[0];
};

// --- CURTAIN COMPONENT ---
interface CurtainProps {
  children: React.ReactNode;
  zIndex: number;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

const Curtain: React.FC<CurtainProps> = ({ children, zIndex, progress, range, className = "" }) => {
  const exitRange = [range[1], range[1] + 0.1];

  const scale = useTransform(progress, exitRange, [1, 0.95]);
  const opacity = useTransform(progress, exitRange, [1, 0.5]);
  const brightness = useTransform(progress, exitRange, [1, 0.4]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter: useTransform(brightness, b => `brightness(${b})`),
        zIndex
      }}
      className={`sticky top-0 h-screen w-full overflow-hidden flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
};

const FullCollection: React.FC<FullCollectionProps> = ({ onNavigateProduct }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const handleNavigate = (slug: string) => {
    if (onNavigateProduct) onNavigateProduct(slug);
  };

  const handleAddToCart = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const productData = getProductBySlug(slug);
    if (productData) {
      addToCart(productData);
    }
  };

  // Total sections = 1 (Hero) + number of products
  const totalSections = 1 + products.length;
  const step = 1 / totalSections;

  // Hero scroll transforms (hooks must be at top level)
  const heroSubtitleY = useTransform(smoothProgress, [0, step], [0, -100]);
  const heroSubtitleOpacity = useTransform(smoothProgress, [0, step * 0.5], [1, 0]);
  const heroTitleY = useTransform(smoothProgress, [0, step], [0, -200]);
  const heroTitleScale = useTransform(smoothProgress, [0, step], [1, 0.5]);
  const heroTitleOpacity = useTransform(smoothProgress, [0, step * 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="bg-black relative" style={{ height: `${totalSections * 100}vh` }}>

      {/* === HERO SECTION: GENESIS (Z-0) === */}
      <Curtain zIndex={0} progress={smoothProgress} range={[0, step]}>
        <div className="absolute inset-0">
          <img
            src="/zizi-webp/collection_hero_bg_symbolic_turtle_16x9.webp"
            alt="Genesis Collection"
            className="w-full h-full object-cover opacity-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white text-center px-6">
          <motion.p
            className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-8 text-white/90 drop-shadow-md"
            style={{
              y: heroSubtitleY,
              opacity: heroSubtitleOpacity
            }}
          >
            The Spring 2025 Collection
          </motion.p>
          <motion.h1
            className="text-[12vw] md:text-[15vw] font-serif leading-none tracking-tighter text-white drop-shadow-2xl"
            style={{
              y: heroTitleY,
              scale: heroTitleScale,
              opacity: heroTitleOpacity
            }}
          >
            GENESIS
          </motion.h1>
          <div className="absolute bottom-12 animate-bounce">
            <ArrowDown className="text-white/70 w-8 h-8" />
          </div>
        </div>
      </Curtain>

      {/* === PRODUCT SECTIONS (Z-1 onwards) === */}
      {products.map((product, index) => {
        const panelIndex = index + 1; // Offset by 1 because Hero is first
        const range: [number, number] = [panelIndex * step, (panelIndex + 1) * step];
        // const displayImage = getDisplayImage(product.slug, product.images); // No longer needed
        const description = PRODUCT_DESCRIPTIONS[product.slug] || 'A masterpiece of craftsmanship.';
        const config = SECTION_CONFIG[product.slug];
        const isRightAligned = config?.alignment === 'right'; // Default to left if undefined
        const isLightMode = config?.theme === 'light';
        const textColorClass = isLightMode ? 'text-black' : 'text-white';

        return (
          <Curtain
            key={product.id}
            zIndex={panelIndex}
            progress={smoothProgress}
            range={range}
            className="bg-black"
          >
            {/* Background Images - No Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden group">
              {config && (
                <>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    src={config.desktop}
                    alt={`${product.title} Background`}
                    className="hidden md:block w-full h-full object-cover origin-center"
                  />
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    src={config.mobile}
                    alt={`${product.title} Background`}
                    className="block md:hidden w-full h-full object-cover object-top origin-top"
                  />
                </>
              )}
            </div>

            {/* Content Layout */}
            <div className={`relative z-10 w-full h-full flex flex-col md:flex-row p-8 md:p-16 lg:p-24 ${isRightAligned ? 'md:justify-end' : 'md:justify-start'} justify-start`}>

              {/* Text Container */}
              <div className="md:w-1/3 flex flex-col justify-start md:justify-center mt-12 md:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-lg"
                >
                  <h2 className={`text-5xl md:text-7xl lg:text-8xl font-serif mb-4 leading-[0.9] ${textColorClass}`}>
                    {product.title}
                  </h2>

                  <p className={`text-2xl md:text-3xl font-serif italic mb-6 ${textColorClass} opacity-80`}>
                    {product.price}
                  </p>

                  <p className={`text-sm md:text-base font-sans leading-relaxed mb-8 max-w-md ${textColorClass} opacity-70`}>
                    {description}
                  </p>

                  <button
                    onClick={() => handleNavigate(product.slug)}
                    className={`block w-fit mb-8 text-[10px] font-bold uppercase tracking-[0.2em] border-b pb-1 transition-all ${isLightMode ? 'border-black/30 hover:border-black text-black' : 'border-white/30 hover:border-white text-white'}`}
                  >
                    More Details
                  </button>

                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      onClick={(e) => handleAddToCart(e, product.slug)}
                      className={`px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-colors rounded-full shadow-lg ${isLightMode ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleNavigate(product.slug)}
                      className={`transition-colors uppercase text-xs font-bold tracking-[0.15em] flex items-center gap-2 ${textColorClass} hover:opacity-100 opacity-60`}
                    >
                      Buy Now <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

            </div>
          </Curtain>
        );
      })}

    </div>
  );
};

export default FullCollection;
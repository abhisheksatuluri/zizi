import React, { useRef } from 'react';
import { products, getProductBySlug } from '../data/products';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FullCollectionProps {
  onNavigateProduct?: (slug: string) => void;
}

// Section Configuration: Backgrounds, Alignment, and Theme
const SECTION_CONFIG: Record<string, {
  image: string;
  alignment: 'left' | 'right';
  theme: 'dark' | 'light';
  bgText: string;
}> = {
  'dior-eloise': {
    image: '/zizi-square/eloise.png',
    alignment: 'left',
    theme: 'light',
    bgText: 'ELOISE'
  },
  'fendi-vittoria': {
    image: '/zizi-square/vittoria.png',
    alignment: 'right',
    theme: 'light',
    bgText: 'VITTORIA'
  },
  'lv-aurele': {
    image: '/zizi-square/aurele.png',
    alignment: 'left',
    theme: 'light',
    bgText: 'AURELE'
  },
  'lv-benoit': {
    image: '/zizi-square/benoit.png',
    alignment: 'right',
    theme: 'light',
    bgText: 'BENOIT'
  },
  'hermes-henrietta': {
    image: '/zizi-square/henrietta.png',
    alignment: 'right',
    theme: 'light',
    bgText: 'HENRIETTA'
  },
  'harrods-william': {
    image: '/zizi-square/william.png',
    alignment: 'left',
    theme: 'light',
    bgText: 'WILLIAM'
  },
  'fortnum-reginald': {
    image: '/zizi-square/reginald.png',
    alignment: 'right',
    theme: 'light',
    bgText: 'REGINALD'
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

const FullCollection: React.FC<FullCollectionProps> = ({ onNavigateProduct }) => {
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleNavigate = (slug: string) => {
    if (onNavigateProduct) onNavigateProduct(slug);
  };

  const handleAddToCart = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const productData = getProductBySlug(slug);
    if (productData) {
      const priceNumber = parseInt(productData.price.replace(/[^0-9]/g, ''), 10);
      addItem({
        id: productData.id.toString(),
        name: productData.title,
        price: priceNumber,
        image: productData.images[0],
        quantity: 1
      });
    }
  };

  return (
    <div ref={containerRef} className="bg-[#f0f0f0] relative overflow-hidden">

      {/* Global Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/collections/bg-reference.png"
          alt=""
          className="w-full h-full object-cover opacity-30 blur-3xl scale-125"
        />
        <div className="absolute inset-0 bg-white/40 mix-blend-overlay" />
      </div>

      {/* === HERO SECTION: COLLECTION === */}
      <motion.section
        className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/collections/hero-bg.png"
            alt="Collection Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-[8vw] md:text-[6vw] font-serif font-bold leading-none tracking-tight text-white drop-shadow-md"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            COLLECTION
          </motion.h1>
        </div>
      </motion.section>

      {/* === PRODUCT SECTIONS === */}
      {products.map((product, index) => {
        const description = PRODUCT_DESCRIPTIONS[product.slug] || 'A masterpiece of craftsmanship.';
        const config = SECTION_CONFIG[product.slug];
        if (!config) return null; // Skip if no config

        const isRightAligned = config.alignment === 'right';
        const isLightMode = config.theme === 'light'; // keeping theme logic but overriding styles for gallery feel

        return (
          <ProductSection
            key={product.id}
            product={product}
            config={config}
            description={description}
            isRightAligned={isRightAligned}
            onNavigate={() => handleNavigate(product.slug)}
            onAddToCart={(e) => handleAddToCart(e, product.slug)}
          />
        );
      })}

      <div className="h-[20vh]" /> {/* Spacer */}
    </div>
  );
};

// Sub-component for individual product section to manage its own scroll effects
const ProductSection = ({ product, config, description, isRightAligned, onNavigate, onAddToCart }: any) => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[80vh] md:min-h-screen w-full flex flex-col justify-center md:flex-row md:justify-start ${isRightAligned ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Background Text - Spanning entire section */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <h2 className="text-[25vw] font-serif font-bold text-black/[0.025] whitespace-nowrap leading-none select-none drop-shadow-xl">
          {config.bgText}
        </h2>
      </div>

      {/* Image Half */}
      <div className="w-full h-[40vh] md:w-1/2 md:h-screen relative z-10 flex items-center justify-center p-4 md:p-12">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={config.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain filter transition-all duration-700 ease-out drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Info Half */}
      <div className="w-full md:w-1/2 md:h-screen flex flex-col items-center justify-center p-6 md:p-16 text-center relative z-10">
        <div className={`max-w-md mx-auto ${config.theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <span className={`inline-block text-[10px] font-bold tracking-[0.3em] uppercase mb-4 ${config.theme === 'dark' ? 'text-white/60' : 'text-black/40'}`}>
            {product.subtitle.split('—')[0]}
          </span>
          <h3 className={`text-3xl md:text-5xl lg:text-6xl font-serif mb-6 ${config.theme === 'dark' ? 'text-white' : 'text-black'} leading-tight`}>
            {product.title}
          </h3>
          <p className="text-black/60 font-sans leading-relaxed mb-8 text-sm md:text-base">
            {description}
          </p>
          <p className="text-xl md:text-2xl font-serif italic text-black/80 mb-8">
            {product.price}
          </p>

          <div className="flex flex-wrap items-center gap-6 justify-center">
            <button
              onClick={onAddToCart}
              className="px-8 py-3 bg-black text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors rounded-full shadow-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={onNavigate}
              className="text-xs font-bold tracking-[0.15em] uppercase border-b border-black/20 pb-1 hover:border-black transition-all flex items-center gap-2"
            >
              View Details <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullCollection;
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../data/products';

const products = [
  {
    id: 1,
    title: "Dior – Éloise",
    category: "Featured Sculpture",
    price: "£575",
    image: "/zizi-webp/selected-dior-eloise.webp",
    slug: "dior-eloise"
  },
  {
    id: 2,
    title: "Fendi – Vittoria",
    category: "Featured Sculpture",
    price: "£575",
    image: "/zizi-webp/selected-fendi-vittoria.webp",
    slug: "fendi-vittoria"
  }
];

interface FeaturedCollectionProps {
  onNavigateProduct: (slug: string) => void;
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ onNavigateProduct }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const productData = getProductBySlug(slug);
    if (productData) {
      // Transform Product to CartItem
      addItem({
        id: productData.id.toString(), // Convert number to string
        name: productData.title,      // Map title to name
        price: parseFloat(productData.price.replace(/[^0-9.]/g, '')), // Parse "£575" to 575
        image: productData.images[0], // Use first image
        quantity: 1
      });
    }
  };

  return (
    <section className="h-full w-full max-w-full bg-[#f4f4f4] relative overflow-hidden flex flex-col justify-center">

      {/* Texture / Grain Overlay would go here */}

      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full overflow-hidden select-none pointer-events-none opacity-[0.03]">
        <h1 className="text-[20vw] font-serif leading-[0.8]">ARCHIVE</h1>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col h-[85vh] justify-center">

        {/* Header */}
        <div className="flex justify-between items-end mb-8 md:mb-16 border-b border-black/5 pb-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">Curated Selection</span>
            <h2 className="text-3xl md:text-5xl font-serif text-black">Featured</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 group cursor-pointer">
            <span className="text-xs font-bold tracking-[0.2em] uppercase group-hover:opacity-50 transition-opacity">View Index</span>
          </button>
        </div>

        {/* Gallery Grid / Mobile Scroller */}
        <div className="flex md:grid md:grid-cols-2 gap-6 md:gap-8 overflow-x-auto md:overflow-visible scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 min-h-[50vh] md:h-[60vh] pb-8 md:pb-0 snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onNavigateProduct(product.slug)}
              className="flex-shrink-0 w-[85vw] md:w-auto md:flex-1 aspect-[3/4] md:aspect-auto md:h-full relative cursor-pointer overflow-hidden bg-gray-200 snap-center group"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                />
              </div>

              {/* Interaction Overlay - Cinematic Fade */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-1000 ease-out" />

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                <div className="flex justify-end">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                    <ArrowUpRight size={24} />
                  </div>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="bg-white/90 backdrop-blur-sm p-6 shadow-2xl">
                    <h3 className="text-xl font-serif text-black mb-1">{product.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{product.category}</span>
                      <span className="font-serif text-lg">{product.price}</span>
                    </div>

                    {/* Soft Tactile Buttons */}
                    <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      <button
                        onClick={(e) => handleAddToCart(e, product.slug)}
                        className="flex-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-gray-800 transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => onNavigateProduct(product.slug)}
                        className="flex-1 border border-black text-black text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-black hover:text-white transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resting State Label (Visible when NOT hovering) */}
              <div className="absolute bottom-8 left-8 group-hover:opacity-0 transition-opacity duration-500">
                <h3 className="text-2xl font-serif text-white drop-shadow-md">{product.title}</h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
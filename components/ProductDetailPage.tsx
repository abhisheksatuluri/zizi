import React, { useEffect } from 'react';
import { ArrowLeft, ArrowDown, ArrowUpRight } from 'lucide-react';
import { Product } from '../data/products';
import { motion } from 'framer-motion';
import SmoothScroll from './SmoothScroll';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
    product: Product;
    onBack: () => void;
    onNavigate: (view: 'home' | 'collection' | 'inspiration' | 'about' | 'cart') => void;
}

// Animation variants for staggered reveals
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const slideFromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

// Mappings
const squareImageMap: Record<string, string> = {
    '1': '/zizi-square/eloise.png',
    '2': '/zizi-square/vittoria.png',
    '3': '/zizi-square/aurele.png',
    '4': '/zizi-square/benoit.png',
    '5': '/zizi-square/henrietta.png',
    '6': '/zizi-square/william.png',
    '7': '/zizi-square/reginald.png',
};



const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onNavigate }) => {
    const { addItem } = useCart();
    const squareImage = squareImageMap[product.id.toString()] || product.images[0];

    const handleAddToCart = () => {
        const priceNumber = parseInt(product.price.replace(/[^0-9]/g, ''), 10);
        addItem({
            id: product.id.toString(),
            name: product.title,
            price: isNaN(priceNumber) ? 0 : priceNumber,
            image: squareImage, // Use square image for cart consistency if added from here
            quantity: 1
        });
        onNavigate('cart');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = product.seo.title;
    }, [product]);

    return (
        <SmoothScroll>
            <div className="bg-black text-white font-sans selection:bg-[#D4AF37] selection:text-white relative">

                {/* --- HEADER / NAV (Fixed) --- */}
                <div className="fixed top-0 left-0 z-50 p-8 mix-blend-difference text-white w-full flex justify-between items-center pointer-events-none">
                    <button
                        onClick={onBack}
                        className="pointer-events-auto group flex items-center space-x-3 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden md:inline group-hover:translate-x-1 transition-transform">Back to Archive</span>
                    </button>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 hidden md:block">{product.id}</span>
                </div>

                {/* --- SECTION 1: THE HERO --- */}
                <motion.section
                    className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-end md:justify-center pb-32 md:pb-0 bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.img
                        src={product.images[0]}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        style={{ objectPosition: product.imagePosition || 'center' }}
                        loading="eager"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="relative z-10 text-center max-w-6xl px-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-4 md:mb-8 text-white/70 px-4"
                        >
                            Masterpiece Collection
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-[14vw] md:text-[12vw] leading-[0.85] font-serif font-medium tracking-tighter text-white px-2"
                        >
                            {product.title}
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-8 md:bottom-12 w-full flex justify-center"
                    >
                        <ArrowDown className="text-white/50 animate-bounce" size={24} />
                    </motion.div>
                </motion.section>

                {/* --- SECTION 2: THE GALLERY (Replaces Story) --- */}
                <motion.section
                    className="relative w-full bg-[#f4f4f4] text-black py-12 md:py-24 px-4 md:px-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <div className="max-w-[1600px] mx-auto">
                        <div className="columns-1 md:columns-2 gap-8 space-y-8">
                            {product.galleryImages.map((src, index) => (
                                <motion.div
                                    key={index}
                                    className="relative overflow-hidden break-inside-avoid"
                                    variants={itemVariants}
                                >
                                    <img
                                        src={src}
                                        alt={`${product.title} detailed view ${index + 1}`}
                                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* --- SECTION 3: ACQUISITION --- */}
                <motion.section
                    className="relative w-full bg-white text-black py-16 md:py-32 flex justify-center border-t border-b border-black/5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="max-w-2xl w-full mx-4 flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-12 shadow-2xl shadow-black/5 border border-black/5"
                        variants={slideFromRight}
                    >
                        <div className="text-center mb-4">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 block mb-2">{product.category}</span>
                            <h2 className="text-3xl md:text-5xl font-serif">{product.title}</h2>
                        </div>

                        <motion.div
                            className="flex justify-between items-baseline border-b border-black/10 pb-6 md:pb-8"
                            variants={itemVariants}
                        >
                            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-gray-400">Acquisition</span>
                            <span className="text-3xl md:text-4xl font-serif">{product.price}</span>
                        </motion.div>

                        <motion.div
                            className="flex flex-col md:flex-row gap-4"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-5 md:py-6 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors w-full shadow-lg"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                Add to Collection
                            </motion.button>
                            <motion.button
                                className="flex-1 border border-black py-5 md:py-6 text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors w-full"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                Inquire
                            </motion.button>
                        </motion.div>
                        <motion.p
                            className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-2 md:mt-4"
                            variants={itemVariants}
                        >
                            Worldwide Shipping • Authenticity Certified
                        </motion.p>
                    </motion.div>
                </motion.section>

                {/* --- SECTION 4: THE DETAILS & FOOTER --- */}
                <motion.section
                    className="relative min-h-screen w-full bg-white text-black flex flex-col"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <div className="flex-1 flex items-center justify-center py-16 md:py-32 px-5 md:px-12">
                        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
                            <motion.div variants={slideFromLeft}>
                                <motion.h3
                                    className="text-5xl md:text-7xl font-serif mb-12"
                                    variants={itemVariants}
                                >
                                    Specifications
                                </motion.h3>
                                <dl className="space-y-8">
                                    {[
                                        { label: 'Material', value: product.specs.material },
                                        { label: 'Dimensions', value: product.specs.dimensions },
                                        { label: 'Finish', value: product.specs.finish },
                                        { label: 'Care', value: product.specs.care },
                                    ].map((spec, index) => (
                                        <motion.div
                                            key={spec.label}
                                            className="border-t border-black py-4 flex justify-between items-baseline group hover:bg-gray-50 transition-colors px-2"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <dt className="text-xs font-bold uppercase tracking-widest">{spec.label}</dt>
                                            <dd className="font-serif text-xl italic text-gray-500 group-hover:text-black transition-colors">{spec.value}</dd>
                                        </motion.div>
                                    ))}
                                </dl>
                            </motion.div>
                            <motion.div
                                className="bg-gray-50 p-12 h-full flex flex-col justify-center items-center text-center"
                                variants={slideFromRight}
                            >
                                <motion.blockquote
                                    className="text-2xl md:text-3xl font-serif italic mb-8"
                                    variants={itemVariants}
                                >
                                    "True luxury is in the details that others overlook."
                                </motion.blockquote>
                                <motion.div
                                    className="w-12 h-[1px] bg-black mb-4"
                                    variants={itemVariants}
                                />
                                <motion.span
                                    className="text-xs font-bold uppercase tracking-widest"
                                    variants={itemVariants}
                                >
                                    The ZIZI Promise
                                </motion.span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Navigation Footer */}
                    <motion.div
                        onClick={() => onNavigate('collection')}
                        className="h-[40vh] bg-black w-full flex items-center justify-center cursor-pointer group overflow-hidden relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                        <motion.div
                            className="text-center relative z-10"
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/50 mb-6 block">Continue the Journey</span>
                            <h2 className="text-5xl md:text-8xl font-serif text-white">Full Collection</h2>
                            <ArrowUpRight className="text-white mx-auto mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500" size={48} />
                        </motion.div>
                    </motion.div>
                </motion.section>

            </div>
        </SmoothScroll>
    );
};

export default ProductDetailPage;

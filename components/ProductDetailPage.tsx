import React, { useRef, useEffect } from 'react';
import { ArrowLeft, ArrowDown, ArrowUpRight } from 'lucide-react';
import { Product } from '../data/products';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SmoothScroll from './SmoothScroll';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
    product: Product;
    onBack: () => void;
    onNavigate: (view: 'home' | 'collection' | 'inspiration' | 'about' | 'cart') => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onNavigate }) => {
    // Cart Context
    const { addItem } = useCart();

    // Parallax & Scroll Hooks
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Smooth physics
    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // --- CURTAIN ANIMATIONS ---
    // Hero Layer (Z-0) - Fades out as Story layer covers it
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

    // Story Layer (Z-10) - Slides Up, then fades slightly as Gallery covers it
    const storyScale = useTransform(smoothProgress, [0.2, 0.5], [1, 0.95]);
    const storyOpacity = useTransform(smoothProgress, [0.3, 0.5], [1, 0]);

    const handleAddToCart = () => {
        // Parse "£575" -> 575
        const priceNumber = parseInt(product.price.replace(/[^0-9]/g, ''), 10);

        addItem({
            id: product.id.toString(),
            name: product.title,
            price: isNaN(priceNumber) ? 0 : priceNumber,
            image: product.images[0],
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
            {/* Main Container: Needs sufficient height to allow for all sticky sections to scroll */}
            <div ref={containerRef} className="bg-black text-white font-sans selection:bg-white selection:text-black relative">

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

                {/* --- LAYER 1: THE HERO (Sticky z-0) --- */}
                {/* This stays fixed at the top while other layers scroll over it */}
                <motion.section
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="sticky top-0 h-screen w-full z-0 overflow-hidden flex flex-col items-center justify-end md:justify-center pb-32 md:pb-0 bg-black"
                >
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="relative z-10 text-center max-w-6xl px-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-4 md:mb-8 text-white/70"
                        >
                            Masterpiece Collection
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-[14vw] md:text-[12vw] leading-[0.85] font-serif font-medium tracking-tighter text-white mix-blend-overlay"
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

                {/* --- LAYER 2: THE STORY (Sticky z-10) --- */}
                {/* Visual: Paper-like sheet sliding up */}
                <motion.section
                    style={{ scale: storyScale, opacity: storyOpacity }}
                    className="relative md:sticky md:top-0 min-h-screen w-full z-10 flex items-center justify-center bg-[#fbfaf8] text-black shadow-[0_-50px_100px_rgba(0,0,0,0.5)] rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden py-12 md:py-0"
                >
                    <div className="max-w-[1400px] w-full px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center h-full">

                        {/* Editorial Text */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-5xl md:text-8xl font-serif mb-8 md:mb-12 leading-[0.9] mt-8 md:mt-0">The Story</h2>
                            <div className="w-16 md:w-24 h-[1px] bg-black mb-8 md:mb-12" />
                            <div
                                className="prose prose-lg md:prose-xl prose-p:font-serif prose-p:text-gray-600 prose-p:leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        {/* Commerce / Actions */}
                        <div className="flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-12 shadow-xl rounded-sm mb-12 md:mb-0">
                            <div className="flex justify-between items-baseline border-b border-black/10 pb-6 md:pb-8">
                                <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-gray-400">Acquisition</span>
                                <span className="text-3xl md:text-4xl font-serif">{product.price}</span>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white py-5 md:py-6 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors w-full"
                                >
                                    Add to Collection
                                </button>
                                <button className="flex-1 border border-black py-5 md:py-6 text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors w-full">
                                    Inquire
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-2 md:mt-4">
                                Worldwide Shipping • Authenticity Certified
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* --- LAYER 3: THE GALLERY (Sticky z-20) --- */}
                {/* Visual: Dark immersive mode */}
                <section className="sticky top-0 h-screen w-full z-20 bg-[#111] text-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                    <div className="absolute top-12 left-0 w-full text-center z-10">
                        <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-50">Visual Study</span>
                    </div>

                    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
                        {product.images[1] && (
                            <div className="relative h-full border-r border-white/10 group overflow-hidden">
                                <img src={product.images[1]} alt="Detail 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                        )}
                        {product.images[2] ? (
                            <div className="relative h-full group overflow-hidden">
                                <img src={product.images[2]} alt="Detail 2" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-[#151515]">
                                <span className="font-serif italic text-white/30">Detail View Coming Soon</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* --- LAYER 4: THE DETAILS & FOOTER (Sticky z-30) --- */}
                {/* Visual: Clean finish */}
                <section className="sticky top-0 min-h-screen w-full z-30 bg-white text-black shadow-[0_-50px_100px_rgba(0,0,0,0.5)] flex flex-col">
                    <div className="flex-1 flex items-center justify-center py-32 px-6">
                        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
                            <div>
                                <h3 className="text-7xl font-serif mb-12">Specifications</h3>
                                <dl className="space-y-8">
                                    {[
                                        { label: 'Material', value: product.specs.material },
                                        { label: 'Dimensions', value: product.specs.dimensions },
                                        { label: 'Finish', value: product.specs.finish },
                                        { label: 'Care', value: product.specs.care },
                                    ].map((spec) => (
                                        <div key={spec.label} className="border-t border-black py-4 flex justify-between items-baseline group hover:bg-gray-50 transition-colors px-2">
                                            <dt className="text-xs font-bold uppercase tracking-widest">{spec.label}</dt>
                                            <dd className="font-serif text-xl italic text-gray-500 group-hover:text-black transition-colors">{spec.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                            <div className="bg-gray-50 p-12 h-full flex flex-col justify-center items-center text-center">
                                <blockquote className="text-3xl font-serif italic mb-8">
                                    "True luxury is in the details that others overlook."
                                </blockquote>
                                <div className="w-12 h-[1px] bg-black mb-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">The ZIZI Promise</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Footer */}
                    <div
                        onClick={() => onNavigate('collection')}
                        className="h-[40vh] bg-black w-full flex items-center justify-center cursor-pointer group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                        <div className="text-center relative z-10 transition-transform duration-700 group-hover:-translate-y-2">
                            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/50 mb-6 block">Continue the Journey</span>
                            <h2 className="text-5xl md:text-8xl font-serif text-white">Full Collection</h2>
                            <ArrowUpRight className="text-white mx-auto mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0" size={48} />
                        </div>
                    </div>
                </section>

                {/* Spacer to ensure last sticky section can be fully viewed */}
                <div className="h-screen w-full bg-white relative z-[-1]" />

            </div>
        </SmoothScroll>
    );
};

export default ProductDetailPage;

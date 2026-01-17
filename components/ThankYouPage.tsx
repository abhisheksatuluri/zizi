import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface ThankYouProps {
    onNavigate: (view: any) => void;
}

const ThankYouPage: React.FC<ThankYouProps> = ({ onNavigate }) => {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-center px-6">

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/zizi-webp/dior-eloise-hero.webp"
                    alt="Background"
                    className="w-full h-full object-cover opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl w-full relative z-10"
            >
                <div className="mb-20">
                    <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight drop-shadow-2xl">
                        Acquisition<br />Confirmed
                    </h1>
                </div>

                <div className="space-y-12 mb-24">
                    <p className="font-serif italic text-2xl md:text-3xl text-white/90 leading-relaxed max-w-lg mx-auto drop-shadow-md">
                        This piece is now part of your private collection.
                    </p>

                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/60">
                        Our archivists are preparing your delivery
                    </p>
                </div>

                <div className="w-8 h-[1px] bg-white/30 mx-auto mb-24"></div>

                <div>
                    <button
                        onClick={() => onNavigate('collection')}
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-white/70 transition-colors pb-2 border-b border-transparent hover:border-white/30"
                    >
                        Return to Archive
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default ThankYouPage;

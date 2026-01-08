import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ThankYouPage: React.FC = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <section className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl w-full"
            >
                <h1 className="text-5xl md:text-7xl font-serif mb-6 text-black">
                    Thank you
                </h1>

                <div className="w-12 h-[1px] bg-black mx-auto mb-8 opacity-20"></div>

                <p className="font-serif italic text-2xl md:text-3xl text-gray-800 mb-6">
                    Your acquisition is confirmed.
                </p>

                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-16 max-w-md mx-auto">
                    We are honored to have you as a collector. Our team will be in touch shortly regarding the personalized delivery and care of your ZIZI piece.
                </p>

                <div>
                    <a
                        href="/collection"
                        className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-black pb-2 hover:opacity-50 transition-opacity"
                    >
                        Return to Collection
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default ThankYouPage;

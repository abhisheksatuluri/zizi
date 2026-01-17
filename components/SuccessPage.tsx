import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SuccessPage: React.FC = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Optionally clear the cart upon successful payment
        clearCart();
    }, [clearCart]);

    return (
        <section className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-xl w-full"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-green-900/5 flex items-center justify-center text-green-900">
                        <Check size={32} strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif mb-6 text-black">
                    Purchase Confirmed
                </h1>

                <p className="font-serif italic text-xl text-gray-500 mb-12">
                    Thank you for your patronage. Your piece is being prepared for its journey.
                </p>

                <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Order Reference
                    </p>
                    <p className="font-mono text-sm text-gray-600">
                        #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                </div>

                <div className="mt-16">
                    <a
                        href="/collection"
                        className="text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2 hover:opacity-50 transition-opacity"
                    >
                        Return to Collection
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default SuccessPage;

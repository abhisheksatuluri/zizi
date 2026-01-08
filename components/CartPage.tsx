import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage: React.FC = () => {
    const { items, removeFromCart, updateQuantity, subtotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center text-black">
                <h1 className="text-4xl md:text-6xl font-serif mb-6">Your Selection</h1>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">Is Empty</p>
                <a href="/collection" className="border-b border-black pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
                    Explore the Archive
                </a>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#FBFBFB] pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/10 pb-8">
                    <h1 className="text-5xl md:text-8xl font-serif">Your Selection</h1>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 md:mb-4">
                        {items.length} {items.length === 1 ? 'Object' : 'Objects'}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-col md:flex-row gap-8 items-start md:items-center group"
                            >
                                {/* Image */}
                                <div className="w-full md:w-48 aspect-[4/5] bg-gray-100 overflow-hidden relative">
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-serif">{item.title}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <X size={20} strokeWidth={1} />
                                        </button>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.category}</p>
                                    <p className="font-serif italic text-lg text-gray-500 mt-2">{item.price}</p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-6 md:ml-auto">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-20"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-serif text-xl w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-black/5">
                            <h3 className="text-xl font-serif mb-8">Summary</h3>

                            <div className="space-y-4 mb-12">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                    <span className="font-serif text-lg">£{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                                    <span className="font-serif italic text-gray-400">Calculated at next step</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline border-t border-black/10 pt-6 mb-8">
                                <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                                <span className="text-3xl font-serif">£{subtotal.toLocaleString()}</span>
                            </div>

                            <button className="w-full bg-black text-white py-6 flex items-center justify-center gap-4 group hover:bg-gray-900 transition-all duration-500">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Proceed to Checkout</span>
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </button>

                            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-6">
                                Secure Encrypted Transaction
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;

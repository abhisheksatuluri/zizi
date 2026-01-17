import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CartPageProps {
    onNavigate: (view: any) => void;
}

// Mapping for Square Images in Cart
const cartImageMap: Record<string, string> = {
    '1': '/zizi-square/eloise.png',
    '2': '/zizi-square/vittoria.png',
    '3': '/zizi-square/aurele.png',
    '4': '/zizi-square/benoit.png',
    '5': '/zizi-square/henrietta.png',
    '6': '/zizi-square/william.png',
    '7': '/zizi-square/reginald.png',
};

const getCartImage = (id: string, fallback: string) => {
    return cartImageMap[id] || fallback;
};

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
    const { items, removeItem, updateQuantity, subtotal } = useCart();
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);

    const handleCheckout = () => {
        onNavigate('checkout');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center text-black">
                <h1 className="text-4xl md:text-6xl font-serif mb-6">Your Selection</h1>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">Is Empty</p>
                <button
                    onClick={() => onNavigate('collection')}
                    className="border-b border-black pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity"
                >
                    Explore the Archive
                </button>
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

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Cart Items List - Editorial Layout */}
                    <div className="flex-1 flex flex-col">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`flex gap-6 md:gap-12 py-10 ${index !== 0 ? 'border-t border-black/5' : ''}`}
                            >
                                {/* Image - Large & Immersive */}
                                <div className="w-32 md:w-48 aspect-square relative shrink-0">
                                    <img
                                        src={getCartImage(item.id, item.image)}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-4"
                                    />
                                </div>

                                {/* Details - Minimalist */}
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-2xl md:text-3xl font-serif text-black leading-none">{item.name}</h3>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeItem(item.id);
                                                }}
                                                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <p className="font-serif italic text-lg text-gray-500">£{item.price.toLocaleString()}</p>
                                    </div>

                                    {/* Quantity - Clean & Text based */}
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quantity</span>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="hover:text-black text-gray-300 transition-colors disabled:opacity-20"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-serif text-lg w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="hover:text-black text-gray-300 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary - Floating & Minimal */}
                    <div className="lg:w-[400px] shrink-0 lg:sticky lg:top-32 h-fit">
                        <div className="bg-[#FBFBFB] pt-8 lg:pl-12">
                            <h3 className="text-xl font-serif mb-8 text-black">Summary</h3>

                            <div className="space-y-6 mb-12 border-b border-black/5 pb-8">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Subtotal</span>
                                    <span className="font-serif text-xl">£{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Shipping</span>
                                    <span className="font-serif italic text-gray-400 text-sm">Complimentary</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline mb-12">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black">Total</span>
                                <span className="text-4xl font-serif">£{subtotal.toLocaleString()}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full bg-black text-white h-14 flex items-center justify-center gap-3 group hover:bg-gray-900 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="text-[11px] font-bold uppercase tracking-[0.25em] group-hover:tracking-[0.35em] transition-all">
                                    {isCheckingOut ? 'Processing...' : 'Checkout'}
                                </span>
                                {!isCheckingOut && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                            </button>

                            <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest mt-6">
                                Taxes calculated at next step
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;

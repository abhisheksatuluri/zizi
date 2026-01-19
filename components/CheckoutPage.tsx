import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Lock, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';

interface CheckoutProps {
    onNavigate: (view: any) => void;
}

// Mapping for Square Images in Cart (Same as CartPage)
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

const CheckoutPage: React.FC<CheckoutProps> = ({ onNavigate }) => {
    const { items, subtotal } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    // Real Stripe Checkout
    const handlePay = async () => {
        setIsProcessing(true);
        setCheckoutError(null);

        try {
            // Map cart items to Stripe format
            const checkoutItems = items.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            }));

            // Call our API route
            const response = await fetch('/api/checkout/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: checkoutItems }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setCheckoutError(error instanceof Error ? error.message : 'Checkout failed. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <section className="min-h-screen bg-[#FBFBFB] pt-32 pb-24 px-4 md:px-12">
            <div className="max-w-[1000px] mx-auto">
                <header className="mb-20">
                    <h1 className="text-4xl md:text-6xl font-serif">Checkout</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Order Summary */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-xl font-serif mb-8 border-b border-black/10 pb-4">Review</h2>
                            <div className="space-y-8">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-6">
                                        <div className="w-20 aspect-[4/5] overflow-hidden shrink-0 bg-white/50 rounded-sm">
                                            <img
                                                src={getCartImage(item.id, item.image)}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between py-1">
                                            <div>
                                                <p className="font-serif text-lg leading-tight">{item.name}</p>
                                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-serif italic text-gray-500">£{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-black/10 pt-6 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                <span className="font-serif text-lg">£{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                                <span className="font-serif italic text-gray-400 text-sm">Complimentary</span>
                            </div>
                            <div className="flex justify-between items-baseline pt-4">
                                <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                                <span className="text-3xl font-serif">£{subtotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Action */}
                    <div className="h-fit space-y-8">
                        <div>
                            <h2 className="text-xl font-serif mb-8 border-b border-black/10 pb-4">Complete Acquisition</h2>
                            <p className="font-serif text-lg text-gray-600 mb-8 italic">
                                Please confirm your details below. This transaction is encrypted and secure.
                            </p>

                            <button
                                onClick={handlePay}
                                disabled={isProcessing}
                                className="w-full bg-black text-white py-5 flex items-center justify-center gap-4 group hover:bg-gray-900 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                                    {isProcessing ? 'Processing...' : 'Complete Purchase'}
                                </span>
                            </button>

                            {checkoutError && (
                                <p className="text-xs text-center text-red-500 mt-4">
                                    {checkoutError}
                                </p>
                            )}

                            <p className="text-[10px] text-center uppercase tracking-widest text-gray-400 mt-6">
                                By completing this purchase, you agree to our Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// --- TYPES ---

// Strict adherence to requirements
export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number; // Helper for UI
}

// --- CONTEXT ---

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- PROVIDER ---

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // 1. Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('zizi_cart');
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    setItems(parsedCart);
                }
            }
        } catch (error) {
            console.error('ZIZI Cart: Failed to hydrate cart', error);
            // Fail safely: State remains empty
        }
    }, []);

    // 2. Persist to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem('zizi_cart', JSON.stringify(items));
        } catch (error) {
            console.error('ZIZI Cart: Failed to persist cart', error);
        }
    }, [items]);

    // --- ACTIONS ---

    const addItem = (newItem: CartItem) => {
        setItems((currentItems) => {
            const existingItemIndex = currentItems.findIndex((item) => item.id === newItem.id);

            if (existingItemIndex > -1) {
                // Item exists: Increase quantity
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
                };
                return updatedItems;
            } else {
                // New item: Append
                return [...currentItems, newItem];
            }
        });
    };

    const removeItem = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return; // Enforce minimum quantity of 1

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    // derived state
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

// --- HOOK ---

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

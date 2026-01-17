import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface AccountOrdersPageProps {
    onNavigate: (view: 'home' | 'collection' | 'about' | 'cart' | 'account' | 'account-orders' | 'account-details') => void;
}

const AccountOrdersPage: React.FC<AccountOrdersPageProps> = ({ onNavigate }) => {
    const { isAuthenticated } = useAuth();

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            onNavigate('home');
        }
    }, [isAuthenticated, onNavigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-2xl mx-auto px-6 py-24 md:py-32">

                {/* Back Link */}
                <button
                    onClick={() => {
                        window.history.pushState({}, '', '/account');
                        onNavigate('account');
                    }}
                    className="text-black/40 text-xs uppercase tracking-[0.2em] hover:text-black transition-colors mb-12 block"
                >
                    ← Account
                </button>

                {/* Header */}
                <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-black mb-16 md:mb-24">
                    Orders
                </h1>

                {/* Empty State */}
                <div className="py-16 md:py-24">
                    <p className="text-black/50 text-lg md:text-xl font-light tracking-wide leading-relaxed">
                        You have not acquired any pieces yet.
                    </p>

                    <button
                        onClick={() => onNavigate('collection')}
                        className="mt-12 text-black text-sm uppercase tracking-[0.15em] border-b border-black/20 pb-1 hover:border-black transition-colors"
                    >
                        View Collection
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AccountOrdersPage;

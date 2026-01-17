import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface AccountPageProps {
    onNavigate: (view: 'home' | 'collection' | 'about' | 'cart' | 'account' | 'account-orders' | 'account-details') => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
    const { user, isAuthenticated, logout } = useAuth();

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            onNavigate('home');
        }
    }, [isAuthenticated, onNavigate]);

    if (!isAuthenticated) {
        return null;
    }

    const handleSignOut = () => {
        logout();
        onNavigate('home');
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-2xl mx-auto px-6 py-24 md:py-32">

                {/* Header */}
                <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-black mb-4">
                    Your Collection
                </h1>

                {/* User Email */}
                <p className="text-black/50 text-sm tracking-wide mb-16 md:mb-24">
                    {user?.email}
                </p>

                {/* Navigation Links */}
                <nav className="space-y-8">
                    <button
                        onClick={() => {
                            window.history.pushState({}, '', '/account/orders');
                            onNavigate('account-orders');
                        }}
                        className="block text-black text-lg md:text-xl font-light tracking-wide hover:text-black/60 transition-colors text-left"
                    >
                        Orders
                    </button>

                    <div className="w-full h-px bg-black/10" />

                    <button
                        onClick={() => {
                            window.history.pushState({}, '', '/account/details');
                            onNavigate('account-details');
                        }}
                        className="block text-black text-lg md:text-xl font-light tracking-wide hover:text-black/60 transition-colors text-left"
                    >
                        Account details
                    </button>

                    <div className="w-full h-px bg-black/10" />

                    <button
                        onClick={handleSignOut}
                        className="block text-black/50 text-lg md:text-xl font-light tracking-wide hover:text-black transition-colors text-left"
                    >
                        Sign out
                    </button>
                </nav>

            </div>
        </div>
    );
};

export default AccountPage;

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface AccountDetailsPageProps {
    onNavigate: (view: 'home' | 'collection' | 'about' | 'cart' | 'account' | 'account-orders' | 'account-details') => void;
}

const AccountDetailsPage: React.FC<AccountDetailsPageProps> = ({ onNavigate }) => {
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
                    Account Details
                </h1>

                {/* Details */}
                <div className="space-y-12">

                    {/* Email Section */}
                    <div>
                        <p className="text-black/40 text-xs uppercase tracking-[0.2em] mb-3">
                            Email
                        </p>
                        <p className="text-black text-lg md:text-xl font-light tracking-wide">
                            {user?.email}
                        </p>
                    </div>

                    <div className="w-full h-px bg-black/10" />

                    {/* Sign Out */}
                    <button
                        onClick={handleSignOut}
                        className="text-black/50 text-lg md:text-xl font-light tracking-wide hover:text-black transition-colors text-left"
                    >
                        Sign out
                    </button>

                </div>

            </div>
        </div>
    );
};

export default AccountDetailsPage;

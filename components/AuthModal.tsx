import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { login, signup, guestLogin } = useAuth();
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let success = false;
            if (mode === 'signin') {
                success = await login(email, password);
            } else {
                success = await signup(email, password);
            }

            if (success) {
                onClose();
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuest = async () => {
        await guestLogin();
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white w-full max-w-md p-8 md:p-12 relative shadow-2xl overflow-hidden"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-serif mb-2">Welcome to ZIZI</h2>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                            Join the Collector's Circle
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-black/10 mb-8">
                        <button
                            onClick={() => setMode('signin')}
                            className={`flex-1 pb-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === 'signin' ? 'text-black border-b border-black' : 'text-gray-300 hover:text-gray-500'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 pb-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === 'signup' ? 'text-black border-b border-black' : 'text-gray-300 hover:text-gray-500'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-b border-black/10 py-3 text-sm font-serif placeholder:font-sans placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-b border-black/10 py-3 text-sm font-serif placeholder:font-sans placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white h-12 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                {loading ? 'Processing...' : (mode === 'signin' ? 'Enter' : 'Join')}
                            </span>
                            {!loading && <ArrowRight size={14} />}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-black/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-300 text-[9px] tracking-widest">Or</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGuest}
                        className="w-full border border-black/10 text-gray-500 h-12 flex items-center justify-center hover:border-black hover:text-black transition-colors"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            Continue as Guest
                        </span>
                    </button>

                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define User Types
export interface User {
    id: string;
    email?: string;
    name?: string;
    isGuest: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string) => Promise<boolean>;
    guestLogin: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize Auth State from LocalStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('zizi_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from storage");
                localStorage.removeItem('zizi_user');
            }
        }
        setIsLoading(false);
    }, []);

    // Persist User to LocalStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('zizi_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('zizi_user');
        }
    }, [user]);

    // Mock Login - In production, this would call an API
    const login = async (email: string, password: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simple mock validation
                if (email.includes('@') && password.length >= 6) {
                    const newUser: User = {
                        id: 'user_' + Date.now(),
                        email: email,
                        name: email.split('@')[0],
                        isGuest: false
                    };
                    setUser(newUser);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 800);
        });
    };

    // Mock Signup - In production, this would call an API
    const signup = async (email: string, password: string): Promise<boolean> => {
        return login(email, password); // Reuse login logic for mock
    };

    // Guest Login
    const guestLogin = async (): Promise<void> => {
        const guestUser: User = {
            id: 'guest_' + Date.now(),
            name: 'Guest',
            isGuest: true
        };
        setUser(guestUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('zizi_cart'); // Optional: Clear cart on logout if desired, or keep specific logic
        // For this requirement: "No cart loss on login or signup". 
        // We maintain cart in CartContext separately, so it will persist in local storage unless explicitly cleared there.
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user && !user.isGuest,
            isLoading,
            login,
            signup,
            guestLogin,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

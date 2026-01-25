import React, { useState, useEffect } from 'react';

interface AnimatedLogoProps {
    currentView: string;
    theme: 'light' | 'dark';
    onNavigate: (view: 'home') => void;
}

/**
 * AnimatedLogo - Isolated ZIZI logo with scroll-driven animation
 * This component manages its own scroll state to prevent App-level re-renders
 */
const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ currentView, theme, onNavigate }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [dockedScale, setDockedScale] = useState(0.12);

    // Check mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Track scroll for logo animation
    useEffect(() => {
        const handleScroll = () => {
            const threshold = isMobile ? window.innerHeight * 0.6 : window.innerHeight * 0.4;
            const progress = Math.min(window.scrollY / threshold, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // Calculate docked scale
    useEffect(() => {
        const calculateScale = () => {
            const width = window.innerWidth;
            const baseSize = width * 0.16;
            const targetSize = width < 768 ? 28 : 40;
            const scale = Math.min(Math.max(targetSize / baseSize, 0.08), 1);
            setDockedScale(scale);
        };
        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, []);

    const isDocked = scrollProgress === 1 || currentView !== 'home';

    // Color logic for logo
    const getLogoColor = () => {
        if (currentView !== 'home') return 'black';
        if (scrollProgress < 0.2) return 'white';
        return theme === 'dark' ? 'white' : 'black';
    };

    // Calculate Y movement for docking
    const getLogoTransform = () => {
        const headerOffset = isMobile ? '2.4rem' : '2.2rem';
        if (isDocked) return `translateY(calc(-50vh + ${headerOffset})) scale(${dockedScale})`;

        const yMove = `calc(-${scrollProgress * 50}vh + ${scrollProgress * parseFloat(headerOffset)}rem)`;
        const scaleVal = 1 - (scrollProgress * (1 - dockedScale));
        return `translateY(${yMove}) scale(${scaleVal})`;
    };

    return (
        <div className="fixed inset-0 z-[170] flex items-center justify-center pointer-events-none">
            <h1
                onClick={() => onNavigate('home')}
                className="font-serif font-bold tracking-tighter leading-none cursor-pointer pointer-events-auto select-none"
                style={{
                    transform: getLogoTransform(),
                    fontSize: '16vw',
                    color: getLogoColor(),
                    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.4s ease',
                    textShadow: (currentView === 'home' && scrollProgress < 0.5) ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
                    willChange: 'transform',
                }}
            >
                ZIZI
            </h1>
        </div>
    );
};

export default AnimatedLogo;

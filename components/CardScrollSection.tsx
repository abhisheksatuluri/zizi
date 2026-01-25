import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface CardScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    index?: number;
    total?: number;
}

/**
 * CardScrollSection - Creates a card-like section with parallax depth
 * Cards have subtle scale and shadow changes as they scroll into view
 */
const CardScrollSection: React.FC<CardScrollSectionProps> = ({
    children,
    className = '',
    index = 0,
    total = 1
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Smooth spring for cinematic buttery animations
    // Reduced physics for mobile to prevent jank
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: isMobile ? 100 : 60,
        damping: isMobile ? 30 : 25,
        restDelta: 0.001
    });

    // Card scale effect - subtle grow as it enters viewport
    const scale = useTransform(
        smoothProgress,
        [0, 0.3, 0.5, 0.7, 1],
        [0.95, 1, 1, 1, 0.98]
    );

    // Opacity for smooth fade in/out
    const opacity = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        [0.6, 1, 1, 0.8]
    );

    // Stagger delay based on index
    const staggerDelay = index * 0.1;

    return (
        <motion.section
            ref={ref}
            className={`relative w-full max-w-full overflow-hidden ${className}`}
            style={{ scale, opacity, willChange: 'transform, opacity' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 1.0,
                delay: staggerDelay,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {children}
        </motion.section>
    );
};

export default CardScrollSection;

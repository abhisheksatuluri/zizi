import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    offset?: number;
    parallaxSpeed?: number;
}

/**
 * ParallaxReveal - Wraps content with scroll-triggered parallax animations
 * Elements animate in from the specified direction with subtle, moderately slow timing
 */
const ParallaxReveal: React.FC<ParallaxRevealProps> = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    offset = 60,
    parallaxSpeed = 0.2
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Smooth spring physics for cinematic motion
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 25,
        restDelta: 0.001
    });

    // Parallax Y offset - elements move slightly as you scroll past
    const parallaxY = useTransform(
        smoothProgress,
        [0, 1],
        [offset * parallaxSpeed, -offset * parallaxSpeed]
    );

    // Get initial position based on direction
    const getInitialPosition = () => {
        switch (direction) {
            case 'left': return { x: -offset, y: 0 };
            case 'right': return { x: offset, y: 0 };
            case 'down': return { x: 0, y: offset };
            case 'up':
            default: return { x: 0, y: offset };
        }
    };

    const initial = getInitialPosition();

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                x: initial.x,
                y: initial.y,
                scale: 0.96
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 1.2,
                delay,
                ease: [0.16, 1, 0.3, 1] // Cinematic ease-out for luxury feel
            }}
            style={{ y: parallaxY, willChange: 'transform, opacity' }}
        >
            {children}
        </motion.div>
    );
};

export default ParallaxReveal;

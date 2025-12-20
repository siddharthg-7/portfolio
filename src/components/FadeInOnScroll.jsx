import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { duration, easing, isMobileDevice, getOptimizedDuration } from '../utils/motionConfig';

/**
 * Reusable scroll-triggered fade-in animation component
 * Automatically optimizes for mobile devices
 * 
 * @param {ReactNode} children - Content to animate
 * @param {number} delay - Animation delay in seconds
 * @param {string} direction - Animation direction: 'up', 'down', 'left', 'right', 'none'
 * @param {number} amount - Percentage of element visible before triggering (0-1)
 * @param {number} distance - Distance to travel in pixels (auto-reduced on mobile)
 */
const FadeInOnScroll = ({
    children,
    delay = 0,
    direction = 'up',
    amount = 0.3,
    distance = 24,
    className = ''
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: '-100px',
        amount
    });

    // Reduce distance on mobile for better performance
    const optimizedDistance = isMobileDevice() ? distance * 0.5 : distance;

    const directionVariants = {
        up: {
            initial: { opacity: 0, y: optimizedDistance },
            animate: { opacity: 1, y: 0 }
        },
        down: {
            initial: { opacity: 0, y: -optimizedDistance },
            animate: { opacity: 1, y: 0 }
        },
        left: {
            initial: { opacity: 0, x: -optimizedDistance },
            animate: { opacity: 1, x: 0 }
        },
        right: {
            initial: { opacity: 0, x: optimizedDistance },
            animate: { opacity: 1, x: 0 }
        },
        none: {
            initial: { opacity: 0 },
            animate: { opacity: 1 }
        },
    };

    const variant = directionVariants[direction] || directionVariants.up;

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={variant.initial}
            animate={isInView ? variant.animate : variant.initial}
            transition={{
                duration: getOptimizedDuration(duration.base),
                delay,
                ease: easing.enter
            }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInOnScroll;

/**
 * Motion Design System
 * Centralized animation configuration for consistent, professional motion
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if device is mobile/tablet
export const isMobileDevice = () => {
    return window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check if device is touch-enabled
export const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Get optimized duration based on device
export const getOptimizedDuration = (baseDuration) => {
    if (prefersReducedMotion()) return 0;
    if (isMobileDevice()) return baseDuration * 0.7; // 30% faster on mobile
    return baseDuration;
};

// ===========================
// DURATION TOKENS
// ===========================
export const duration = {
    instant: 0.15,      // Micro-interactions (hover, focus)
    fast: 0.3,          // Quick transitions (tooltips, dropdowns)
    base: 0.5,          // Standard entrance/exit
    slow: 0.8,          // Emphasis animations
    slower: 1.2,        // Hero/major section animations
};

// ===========================
// EASING CURVES
// ===========================
export const easing = {
    // Entrance - Elements coming into view (ease-out)
    enter: [0.25, 0.1, 0.25, 1],           // Smooth deceleration

    // Exit - Elements leaving view (ease-in)
    exit: [0.4, 0, 0.6, 1],                // Smooth acceleration

    // Emphasis - Draw attention (ease-in-out)
    emphasis: [0.43, 0.13, 0.23, 0.96],    // Subtle bounce

    // Spring - Natural, bouncy feel
    spring: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
    },

    // Soft spring - Gentler version
    softSpring: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
    },
};

// ===========================
// COMMON ANIMATION VARIANTS
// ===========================

// Fade in from bottom (most common entrance)
export const fadeInUp = {
    initial: {
        opacity: 0,
        y: 24,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration.base,
            ease: easing.enter,
        },
    },
    exit: {
        opacity: 0,
        y: -24,
        transition: {
            duration: duration.fast,
            ease: easing.exit,
        },
    },
};

// Fade in (no movement)
export const fadeIn = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: duration.base,
            ease: easing.enter,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: duration.fast,
            ease: easing.exit,
        },
    },
};

// Scale in (for modals, cards)
export const scaleIn = {
    initial: {
        opacity: 0,
        scale: 0.95,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: duration.base,
            ease: easing.enter,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: duration.fast,
            ease: easing.exit,
        },
    },
};

// Slide in from left
export const slideInLeft = {
    initial: {
        opacity: 0,
        x: -32,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: duration.base,
            ease: easing.enter,
        },
    },
};

// Slide in from right
export const slideInRight = {
    initial: {
        opacity: 0,
        x: 32,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: duration.base,
            ease: easing.enter,
        },
    },
};

// ===========================
// MOBILE-OPTIMIZED VARIANTS
// ===========================

// Mobile-friendly fade in up (reduced distance)
export const fadeInUpMobile = {
    initial: {
        opacity: 0,
        y: isMobileDevice() ? 12 : 24,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: getOptimizedDuration(duration.base),
            ease: easing.enter,
        },
    },
};

// Mobile-friendly hover lift (reduced distance)
export const hoverLiftMobile = {
    y: isMobileDevice() ? -2 : -4,
    transition: {
        duration: getOptimizedDuration(duration.instant),
        ease: easing.emphasis,
    },
};

// ===========================
// STAGGER CONFIGURATIONS
// ===========================
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerContainerFast = {
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

// ===========================
// HOVER ANIMATIONS
// ===========================
export const hoverScale = {
    scale: 1.05,
    transition: {
        duration: duration.instant,
        ease: easing.emphasis,
    },
};

export const hoverLift = {
    y: -4,
    transition: {
        duration: duration.instant,
        ease: easing.emphasis,
    },
};

export const hoverGlow = {
    boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4)",
    transition: {
        duration: duration.instant,
    },
};

// ===========================
// TAP ANIMATIONS
// ===========================
export const tapScale = {
    scale: 0.97,
    transition: {
        duration: duration.instant,
    },
};

// ===========================
// BUTTON STATES (Phase 3)
// ===========================
export const buttonStates = {
    default: {
        scale: 1,
        opacity: 1,
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: duration.instant,
            ease: easing.emphasis,
        },
    },
    tap: {
        scale: 0.97,
        transition: {
            duration: duration.instant,
        },
    },
    disabled: {
        scale: 1,
        opacity: 0.5,
        cursor: 'not-allowed',
        transition: {
            duration: duration.fast,
        },
    },
    active: {
        scale: 0.98,
        transition: {
            duration: duration.instant,
        },
    },
};

// ===========================
// SCROLL REVEAL CONFIGURATION
// ===========================
export const scrollReveal = {
    initial: "initial",
    whileInView: "animate",
    viewport: {
        once: true,      // Animate only once
        margin: "-100px", // Trigger 100px before element enters viewport
        amount: 0.3,     // Trigger when 30% of element is visible
    },
};

// ===========================
// PAGE TRANSITION
// ===========================
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration.slow,
            ease: easing.enter,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: duration.fast,
            ease: easing.exit,
        },
    },
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Get animation props with reduced motion support
 * @param {Object} variants - Animation variants
 * @returns {Object} - Animation props or empty object if reduced motion
 */
export const getAnimationProps = (variants) => {
    if (prefersReducedMotion()) {
        return {
            initial: false,
            animate: false,
            exit: false,
            transition: { duration: 0 },
        };
    }
    return variants;
};

/**
 * Create stagger children animation
 * @param {number} staggerDelay - Delay between each child (default: 0.1)
 * @param {number} delayChildren - Initial delay before first child (default: 0)
 */
export const createStagger = (staggerDelay = 0.1, delayChildren = 0) => ({
    animate: {
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren,
        },
    },
});

/**
 * GPU-accelerated transform
 * Forces hardware acceleration for smoother animations
 */
export const gpuAcceleration = {
    transform: "translateZ(0)",
    willChange: "transform, opacity",
};

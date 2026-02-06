/**
 * Stitch-inspired Animation Utilities
 * Advanced Framer Motion animations for premium UI/UX
 */

// Spring physics configurations
export const springConfigs = {
    gentle: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5
    },
    bouncy: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8
    },
    snappy: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.5
    },
    smooth: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.6
    }
};

// Magnetic button effect
export const magneticEffect = {
    whileHover: {
        scale: 1.05,
        transition: springConfigs.bouncy
    },
    whileTap: {
        scale: 0.95,
        transition: springConfigs.snappy
    }
};

// Morphing card animations
export const morphingCard = {
    initial: {
        opacity: 0,
        scale: 0.9,
        rotateX: -10,
        y: 50
    },
    animate: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0,
        transition: {
            ...springConfigs.smooth,
            opacity: { duration: 0.4 },
            rotateX: { duration: 0.6 }
        }
    },
    whileHover: {
        scale: 1.02,
        rotateX: 5,
        y: -8,
        transition: springConfigs.gentle
    }
};

// Stagger children with spring
export const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

// Fade slide variants
export const fadeSlide = {
    up: {
        initial: { opacity: 0, y: 40 },
        animate: {
            opacity: 1,
            y: 0,
            transition: springConfigs.smooth
        }
    },
    down: {
        initial: { opacity: 0, y: -40 },
        animate: {
            opacity: 1,
            y: 0,
            transition: springConfigs.smooth
        }
    },
    left: {
        initial: { opacity: 0, x: -40 },
        animate: {
            opacity: 1,
            x: 0,
            transition: springConfigs.smooth
        }
    },
    right: {
        initial: { opacity: 0, x: 40 },
        animate: {
            opacity: 1,
            x: 0,
            transition: springConfigs.smooth
        }
    }
};

// Reveal animations with mask
export const revealMask = {
    initial: {
        clipPath: "inset(0 100% 0 0)"
    },
    animate: {
        clipPath: "inset(0 0% 0 0)",
        transition: {
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1]
        }
    }
};

// Floating animation
export const floatingAnimation = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Pulse glow effect
export const pulseGlow = {
    animate: {
        boxShadow: [
            "0 0 20px rgba(0, 240, 255, 0.3)",
            "0 0 40px rgba(0, 240, 255, 0.6)",
            "0 0 20px rgba(0, 240, 255, 0.3)"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Shimmer effect
export const shimmerEffect = {
    animate: {
        backgroundPosition: ["200% 0", "-200% 0"],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

// Scroll-triggered reveal
export const scrollReveal = {
    initial: {
        opacity: 0,
        y: 60,
        scale: 0.95
    },
    whileInView: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: springConfigs.smooth
    },
    viewport: {
        once: true,
        margin: "-100px"
    }
};

// Text reveal character by character
export const textReveal = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.1
            }
        }
    },
    char: {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    }
};

// Liquid morph effect
export const liquidMorph = {
    initial: {
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%"
    },
    animate: {
        borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "30% 70% 70% 30% / 30% 30% 70% 70%"
        ],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Parallax scroll effect
export const createParallax = (scrollY, inputRange, outputRange) => {
    return {
        y: scrollY,
        inputRange,
        outputRange
    };
};

// Hover lift with shadow
export const hoverLift = {
    whileHover: {
        y: -8,
        boxShadow: "0 20px 60px rgba(0, 240, 255, 0.3)",
        transition: springConfigs.gentle
    },
    whileTap: {
        y: -4,
        boxShadow: "0 10px 30px rgba(0, 240, 255, 0.2)",
        transition: springConfigs.snappy
    }
};

// Rotate on hover
export const rotateHover = {
    whileHover: {
        rotate: [0, -5, 5, -5, 0],
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

// Scale pulse
export const scalePulse = {
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Gradient shift
export const gradientShift = {
    animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

// Page transition
export const pageTransition = {
    initial: {
        opacity: 0,
        scale: 0.98,
        filter: "blur(10px)"
    },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96]
        }
    },
    exit: {
        opacity: 0,
        scale: 1.02,
        filter: "blur(10px)",
        transition: {
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96]
        }
    }
};

// Magnetic cursor follow
export const useMagneticCursor = (strength = 0.3) => {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;

        return { x, y };
    };

    return handleMouseMove;
};

// Entrance animations
export const entranceAnimations = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 }
    },
    slideUp: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: springConfigs.smooth
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: springConfigs.bouncy
    },
    rotateIn: {
        initial: { opacity: 0, rotate: -180, scale: 0.5 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        transition: springConfigs.bouncy
    }
};

// Button ripple effect
export const buttonRipple = {
    whileTap: {
        scale: 0.95,
        transition: { duration: 0.1 }
    }
};

// Card flip
export const cardFlip = {
    initial: { rotateY: 0 },
    hover: {
        rotateY: 180,
        transition: { duration: 0.6 }
    }
};

// Elastic bounce
export const elasticBounce = {
    whileHover: {
        scale: [1, 1.2, 0.9, 1.1, 1],
        transition: {
            duration: 0.6,
            times: [0, 0.2, 0.4, 0.6, 1]
        }
    }
};

export default {
    springConfigs,
    magneticEffect,
    morphingCard,
    staggerChildren,
    fadeSlide,
    revealMask,
    floatingAnimation,
    pulseGlow,
    shimmerEffect,
    scrollReveal,
    textReveal,
    liquidMorph,
    hoverLift,
    rotateHover,
    scalePulse,
    gradientShift,
    pageTransition,
    entranceAnimations,
    buttonRipple,
    cardFlip,
    elasticBounce
};

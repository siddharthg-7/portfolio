import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

/**
 * Custom Cursor Component
 * Premium cursor with trailing effect
 */
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.classList.contains('magnetic-button') ||
                target.classList.contains('morphing-card') ||
                target.closest('button') ||
                target.closest('a');

            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Don't show on touch devices
    if ('ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="custom-cursor-dot"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isHovering ? 0.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />

            {/* Cursor ring */}
            <motion.div
                className="custom-cursor-ring"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.8
                }}
            />

            {/* Trailing glow */}
            <motion.div
                className="custom-cursor-glow"
                animate={{
                    x: mousePosition.x - 40,
                    y: mousePosition.y - 40,
                    opacity: isHovering ? 0.6 : 0.3,
                }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    mass: 1
                }}
            />
        </>
    );
};

export default CustomCursor;

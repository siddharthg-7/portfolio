import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { springConfigs } from '../utils/stitchAnimations';
import './MagneticButton.css';

/**
 * Magnetic Button Component
 * Button that follows cursor with magnetic effect
 */
const MagneticButton = ({
    children,
    className = '',
    onClick,
    href,
    strength = 0.4,
    ...props
}) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic effect within a radius
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const maxDistance = 100; // Magnetic field radius

        if (distance < maxDistance) {
            setPosition({
                x: distanceX * strength,
                y: distanceY * strength
            });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={buttonRef}
            className={`magnetic-button ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            href={href}
            animate={{
                x: position.x,
                y: position.y
            }}
            transition={springConfigs.gentle}
            whileHover={{
                scale: 1.05,
                transition: springConfigs.bouncy
            }}
            whileTap={{
                scale: 0.95,
                transition: springConfigs.snappy
            }}
            {...props}
        >
            <motion.span
                className="magnetic-button-content"
                animate={{
                    x: -position.x * 0.5,
                    y: -position.y * 0.5
                }}
                transition={springConfigs.smooth}
            >
                {children}
            </motion.span>

            {/* Ripple effect */}
            <motion.span
                className="magnetic-button-ripple"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{
                    scale: 1.5,
                    opacity: 0,
                    transition: { duration: 0.6 }
                }}
            />
        </Component>
    );
};

export default MagneticButton;

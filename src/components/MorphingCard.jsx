import { motion } from 'framer-motion';
import { morphingCard, scrollReveal } from '../utils/stitchAnimations';
import './MorphingCard.css';

/**
 * Morphing Card Component
 * Card with 3D transform and morphing effects
 */
const MorphingCard = ({
    children,
    className = '',
    delay = 0,
    enableHover = true,
    ...props
}) => {
    return (
        <motion.div
            className={`morphing-card ${className}`}
            initial="initial"
            whileInView="animate"
            whileHover={enableHover ? "whileHover" : undefined}
            variants={{
                ...morphingCard,
                animate: {
                    ...morphingCard.animate,
                    transition: {
                        ...morphingCard.animate.transition,
                        delay
                    }
                }
            }}
            viewport={{ once: true, margin: "-50px" }}
            {...props}
        >
            {/* Gradient overlay */}
            <motion.div
                className="morphing-card-gradient"
                initial={{ opacity: 0 }}
                whileHover={{
                    opacity: 1,
                    transition: { duration: 0.3 }
                }}
            />

            {/* Corner accents */}
            <div className="morphing-card-corner morphing-card-corner-tl" />
            <div className="morphing-card-corner morphing-card-corner-tr" />
            <div className="morphing-card-corner morphing-card-corner-bl" />
            <div className="morphing-card-corner morphing-card-corner-br" />

            {/* Content */}
            <div className="morphing-card-content">
                {children}
            </div>

            {/* Glow effect */}
            <motion.div
                className="morphing-card-glow"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

export default MorphingCard;

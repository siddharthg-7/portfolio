import { motion } from 'framer-motion';
import './CyberpunkLoader.css';

export default function CyberpunkLoader() {
    return (
        <motion.div
            className="cyberpunk-loader-container"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className="cyberpunk-loader">
                <motion.div
                    className="loader-ring loader-ring-outer"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="loader-ring loader-ring-middle"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="loader-ring loader-ring-inner"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <div className="loader-core">
                    <div className="loader-pulse" />
                </div>
            </div>
            <motion.p
                className="loader-text"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Loading...
            </motion.p>
        </motion.div>
    );
}

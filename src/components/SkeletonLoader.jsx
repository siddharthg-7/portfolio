import { motion } from 'framer-motion';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
    return (
        <div className="skeleton-loader">
            <div className="skeleton-container">
                <motion.div
                    className="skeleton-navbar"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                <div className="skeleton-hero">
                    <div className="skeleton-hero-content">
                        <motion.div
                            className="skeleton-line skeleton-title"
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                        />
                        <motion.div
                            className="skeleton-line skeleton-subtitle"
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                            className="skeleton-line skeleton-text"
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                        <div className="skeleton-buttons">
                            <motion.div
                                className="skeleton-button"
                                initial={{ opacity: 0.6 }}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            />
                            <motion.div
                                className="skeleton-button"
                                initial={{ opacity: 0.6 }}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            />
                        </div>
                    </div>
                    <motion.div
                        className="skeleton-circle"
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;

import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from '../utils/stitchAnimations';

/**
 * Page Transition Wrapper
 * Smooth transitions between page states
 */
const PageTransition = ({ children, className = '' }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={className}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;

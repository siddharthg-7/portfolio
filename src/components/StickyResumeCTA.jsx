import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import './StickyResumeCTA.css';

const StickyResumeCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('home');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                setIsVisible(window.scrollY > heroBottom - 200);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/uc?export=download&id=1JCw6ULtCzwvinFwQk2jTubn4Fm3Z8fhj';
        link.download = 'Gilakathi_Siddhartha_Goud_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    className="sticky-resume-cta"
                    onClick={handleDownload}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Download Resume"
                >
                    <FaDownload />
                    <span>Download Resume</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default StickyResumeCTA;

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <motion.p
                    className="footer-text"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Designed & Built with <Heart size={16} className="heart-icon" /> by{' '}
                    <span>Gilakathi Siddhartha Goud</span>
                </motion.p>
                <motion.p
                    className="footer-copyright"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    © {new Date().getFullYear()} All rights reserved.
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { duration, easing } from '../utils/motionConfig';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <Github size={20} />, href: 'https://github.com/siddharthg-7', label: 'GitHub' },
        { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/gilakathi-siddhartha-goud-a51ba3325', label: 'LinkedIn' },
        { icon: <Mail size={20} />, href: 'mailto:siddharthgoudgilakathi@gmail.com', label: 'Email' },
    ];

    // Heart beat animation
    const heartBeatVariants = {
        initial: { scale: 1 },
        animate: {
            scale: [1, 1.2, 1],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 1,
                ease: easing.emphasis,
            },
        },
    };

    // Social link hover animation
    const socialVariants = {
        initial: { y: 0 },
        hover: {
            y: -4,
            transition: {
                duration: duration.instant,
                ease: easing.emphasis,
            },
        },
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Social Links */}
                <motion.div
                    className="footer-social"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: duration.base }}
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target={social.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="footer-social-link"
                            variants={socialVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Credit */}
                <motion.p
                    className="footer-text"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: duration.slow, delay: 0.2 }}
                >
                    Designed & Built with{' '}
                    <motion.span
                        className="heart-icon"
                        variants={heartBeatVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <Heart size={16} fill="currentColor" />
                    </motion.span>{' '}
                    by <span className="footer-name">Gilakathi Siddhartha Goud</span>
                </motion.p>

                {/* Copyright */}
                <motion.p
                    className="footer-copyright"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: duration.slow, delay: 0.3 }}
                >
                    © {new Date().getFullYear()} All rights reserved.
                </motion.p>

                {/* Scroll to Top Button */}
                <motion.button
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: duration.base, delay: 0.4 }}
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(0, 212, 255, 0.2)',
                        transition: { duration: duration.instant }
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </motion.button>
            </div>
        </footer>
    );
};

export default Footer;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="nav-container">
                <motion.div
                    className="nav-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    SG
                </motion.div>

                <ul className="nav-links desktop-nav">
                    {navLinks.map((link, index) => (
                        <motion.li
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                                {link.name}
                            </a>
                        </motion.li>
                    ))}
                </ul>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    className="mobile-menu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ul className="mobile-nav-links">
                        {navLinks.map((link) => (
                            <motion.li
                                key={link.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                                    {link.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;

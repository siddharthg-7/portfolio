import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { animateNavbarEntrance, animateNavLinks } from '../utils/animeAnimations';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navRef = useRef(null);
    const mounted = useRef(false);

    // Anime.js navbar entrance on mount
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            animateNavbarEntrance('.navbar');
            setTimeout(() => animateNavLinks('.desktop-nav li'), 200);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track active section
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }
        );
        sections.forEach((s) => observer.observe(s));
        return () => sections.forEach((s) => observer.unobserve(s));
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
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            ref={navRef}
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{ opacity: 0 }} // Anime.js will reveal it
        >
            <div className="nav-container">
                <div className="nav-logo">SG</div>

                <ul className="nav-links desktop-nav">
                    {navLinks.map((link) => (
                        <li
                            key={link.name}
                            style={{ opacity: 0 }} // Anime.js stagger
                        >
                            <a
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={activeSection === link.href.substring(1) ? 'active' : ''}
                            >
                                {link.name}
                            </a>
                        </li>
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

            {/* Mobile Menu — keep Framer Motion for collapse accordion */}
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
                                <a
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className={activeSection === link.href.substring(1) ? 'active' : ''}
                                >
                                    {link.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;

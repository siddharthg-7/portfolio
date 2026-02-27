import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaStar, FaDownload } from 'react-icons/fa';
import { isMobileDevice } from '../utils/motionConfig';
import MagneticButton from './MagneticButton';
import {
    animateHeroEntrance,
    animateHeroFloat,
    animateHeroRing,
    animateOrbs,
    animateCTAArrow,
    animateScrollIndicator,
} from '../utils/animeAnimations';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const floatRef = useRef(null);
    const ringRef = useRef(null);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], isMobileDevice() ? [0, 0] : [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const handleScroll = (id) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // ── Hero text entrance (Anime.js timeline) ────────────────────────────
        const tl = animateHeroEntrance('.hero-text');

        // ── Profile image float (Anime.js loop) ──────────────────────────────
        let floatAnim, ringAnim;
        if (floatRef.current) {
            floatAnim = animateHeroFloat('.hero-image');
        }
        if (ringRef.current) {
            ringAnim = animateHeroRing('.hero-image-ring');
        }

        // ── Background orbs (Anime.js) ────────────────────────────────────────
        animateOrbs('.hero-orb');

        // ── CTA button arrow bounce ───────────────────────────────────────────
        animateCTAArrow('.cta-arrow');

        // ── Scroll indicator ──────────────────────────────────────────────────
        animateScrollIndicator('.scroll-indicator-line');

        return () => {
            tl?.pause?.();
            floatAnim?.pause?.();
            ringAnim?.pause?.();
        };
    }, []);

    return (
        <section id="home" className="hero" ref={heroRef}>
            {/* Animated grid background */}
            <motion.div className="hero-grid" style={{ opacity }} />

            {/* Floating gradient orbs – animated by Anime.js */}
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />

            <div className="hero-content">
                <div className="hero-text">
                    {/* Greeting */}
                    <div className="hero-greeting-wrapper" style={{ opacity: 0 }}>
                        <span className="hero-greeting">
                            <FaStar size={20} className="greeting-icon" />
                            Hello, I'm
                        </span>
                    </div>

                    {/* Name */}
                    <h1 className="hero-title" style={{ opacity: 0 }}>
                        <span className="hero-title-gradient">
                            Gilakathi Siddhartha Goud
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="hero-tagline" style={{ opacity: 0 }}>
                        Second-year B.Tech IT student building scalable full-stack and AI-powered systems.
                    </p>

                    <p className="hero-description" style={{ opacity: 0 }}>
                        Passionate about software development, full-stack web applications, and data-driven AI projects.
                        I focus on clean code, problem-solving, and building scalable systems that make a real-world impact.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-cta" style={{ opacity: 0 }}>
                        <MagneticButton
                            className="btn btn-primary"
                            onClick={() => handleScroll('#projects')}
                            strength={0.3}
                        >
                            <span>View Projects</span>
                            <span className="cta-arrow">
                                <FaArrowRight size={20} />
                            </span>
                        </MagneticButton>

                        <MagneticButton
                            className="btn btn-secondary"
                            onClick={() => handleScroll('#contact')}
                            strength={0.3}
                        >
                            Contact Me
                        </MagneticButton>

                        <MagneticButton
                            href="https://drive.google.com/uc?export=download&id=1JCw6ULtCzwvinFwQk2jTubn4Fm3Z8fhj"
                            download="Gilakathi_Siddhartha_Goud_Resume.pdf"
                            className="btn btn-outline"
                            strength={0.3}
                        >
                            <FaDownload size={18} />
                            <span>Download Resume</span>
                        </MagneticButton>
                    </div>

                    {/* Social Links */}
                    <div className="hero-social" style={{ opacity: 0 }}>
                        {[
                            { icon: FaGithub, href: "https://github.com/siddharthg-7", label: "GitHub" },
                            { icon: FaLinkedin, href: "https://linkedin.com/in/gilakathi-siddhartha-goud-a51ba3325", label: "LinkedIn" },
                            { icon: FaEnvelope, href: "mailto:siddharthgoudgilakathi@gmail.com", label: "Email" },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target={social.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="social-icon-link"
                            >
                                <social.icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Profile image with parallax + Anime.js float */}
                <motion.div
                    className="hero-image-container"
                    style={{ y }}
                >
                    <div className="hero-image-wrapper">
                        {/* Glow */}
                        <div className="hero-image-glow" />

                        {/* Rotating ring — driven by Anime.js */}
                        <div className="hero-image-ring" ref={ringRef} />

                        {/* Profile image — floating driven by Anime.js */}
                        <div className="hero-image" ref={floatRef}>
                            <img
                                src="/GilakathiSiddharthaGoud.jpg"
                                alt="Gilakathi Siddhartha Goud"
                                loading="eager"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-indicator-line" />
            </div>
        </section>
    );
};

export default Hero;

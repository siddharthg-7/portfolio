import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaStar, FaDownload } from 'react-icons/fa';
import {
    fadeInUp,
    slideInLeft,
    slideInRight,
    staggerContainer,
    duration,
    easing,
    hoverScale,
    tapScale,
    scrollReveal,
    isMobileDevice,
} from '../utils/motionConfig';
import './Hero.css';

const Hero = () => {
    // Parallax effect on scroll (disabled on mobile for performance)
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], isMobileDevice() ? [0, 0] : [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const handleScroll = (id) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Floating animation for profile picture
    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    };

    // Gradient animation
    const gradientAnimation = {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
        },
    };

    return (
        <section id="home" className="hero">
            {/* Animated grid background */}
            <motion.div
                className="hero-grid"
                style={{ opacity }}
            />

            {/* Animated gradient orbs */}
            <motion.div
                className="hero-orb hero-orb-1"
                animate={{
                    x: [0, 30, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="hero-orb hero-orb-2"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="hero-content"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <div className="hero-text">
                    {/* Greeting with icon */}
                    <motion.div
                        className="hero-greeting-wrapper"
                        variants={slideInLeft}
                    >
                        <motion.span
                            className="hero-greeting"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <FaStar size={20} className="greeting-icon" />
                            Hello, I'm
                        </motion.span>
                    </motion.div>

                    {/* Name with gradient animation */}
                    <motion.h1
                        className="hero-title"
                        variants={fadeInUp}
                    >
                        <motion.span
                            className="hero-title-gradient"
                            animate={gradientAnimation}
                        >
                            Gilakathi Siddhartha Goud
                        </motion.span>
                    </motion.h1>

                    {/* Tagline with typing effect */}
                    <motion.p
                        className="hero-tagline"
                        variants={fadeInUp}
                    >
                        Second-year B.Tech IT student building scalable full-stack and AI-powered systems.
                    </motion.p>

                    <motion.p
                        className="hero-description"
                        variants={fadeInUp}
                    >
                        Passionate about software development, full-stack web applications, and data-driven AI projects.
                        I focus on clean code, problem-solving, and building scalable systems that make a real-world impact.
                    </motion.p>

                    {/* CTA Buttons with enhanced hover */}
                    <motion.div
                        className="hero-cta"
                        variants={fadeInUp}
                    >
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => handleScroll('#projects')}
                            whileHover={hoverScale}
                            whileTap={tapScale}
                        >
                            <span>View Projects</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <FaArrowRight size={20} />
                            </motion.span>
                        </motion.button>

                        <motion.button
                            className="btn btn-secondary"
                            onClick={() => handleScroll('#contact')}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(0, 212, 255, 0.15)",
                                transition: { duration: 0.2 },
                            }}
                            whileTap={tapScale}
                        >
                            Contact Me
                        </motion.button>

                        <motion.a
                            href="https://drive.google.com/uc?export=download&id=1JCw6ULtCzwvinFwQk2jTubn4Fm3Z8fhj"
                            download="Gilakathi_Siddhartha_Goud_Resume.pdf"
                            className="btn btn-outline"
                            whileHover={{
                                scale: 1.05,
                                borderColor: "#00d4ff",
                                transition: { duration: 0.2 },
                            }}
                            whileTap={tapScale}
                        >
                            <FaDownload size={18} />
                            <span>Download Resume</span>
                        </motion.a>
                    </motion.div>

                    {/* Social links with stagger */}
                    <motion.div
                        className="hero-social"
                        variants={fadeInUp}
                    >
                        {[
                            { icon: FaGithub, href: "https://github.com/siddharthg-7", label: "GitHub" },
                            { icon: FaLinkedin, href: "https://linkedin.com/in/gilakathi-siddhartha-goud-a51ba3325", label: "LinkedIn" },
                            { icon: FaEnvelope, href: "mailto:siddharthgoudgilakathi@gmail.com", label: "Email" },
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target={social.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                whileHover={{
                                    y: -4,
                                    scale: 1.1,
                                    backgroundColor: "rgba(0, 212, 255, 0.2)",
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 1 + index * 0.1,
                                    duration: duration.base,
                                    ease: easing.enter,
                                }}
                            >
                                <social.icon size={24} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Enhanced profile image with parallax */}
                <motion.div
                    className="hero-image-container"
                    variants={slideInRight}
                    style={{ y }}
                >
                    <div className="hero-image-wrapper">
                        {/* Animated glow */}
                        <motion.div
                            className="hero-image-glow"
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.3, 0.6, 0.3],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Rotating ring */}
                        <motion.div
                            className="hero-image-ring"
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* Profile image with floating effect */}
                        <motion.div
                            className="hero-image"
                            animate={floatingAnimation}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <img
                                src="https://i.postimg.cc/1XLdTkBw/Gilakathi-Siddhartha-Goud.jpg"
                                alt="Gilakathi Siddhartha Goud"
                                loading="eager"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <motion.div
                    className="scroll-indicator-line"
                    animate={{
                        height: ['0%', '100%', '0%'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;

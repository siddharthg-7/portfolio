import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import {
    fadeInUp,
    staggerContainer,
    duration,
    easing,
    hoverLift,
    tapScale,
    scrollReveal,
    isTouchDevice,
} from '../utils/motionConfig';
import './Projects.css';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredCard, setHoveredCard] = useState(null);

    const projects = [
        {
            title: 'Bus Tracker Application',
            status: 'Ongoing',
            description: 'Real-time GPS tracking system for college buses with dual interfaces for drivers and students.',
            features: [
                'Real-time GPS tracking',
                'Pickup confirmation logic',
                'Route optimization',
                'Round-tracking for active trips',
            ],
            tech: ['React', 'Node.js', 'Firebase', 'Socket.io'],
            link: 'https://github.com/siddharthg-7/College-Bus-Tracking-Attendance-System',
        },
        {
            title: 'TrustLink – Secure Opportunity Verifier',
            status: 'Completed',
            description: 'Platform to detect fake internship and job offers with scam detection capabilities.',
            features: [
                'Fraud indicator detection',
                'Phishing awareness dashboard',
                'Fully responsive UI',
                'Educational resources',
            ],
            tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
            link: 'https://github.com/siddharthg-7/Trustlink-updated-version',
        },
        {
            title: 'Decentralized Certificate Validation System',
            status: 'Completed',
            description: 'Blockchain-based academic certificate verification using Ethereum and IPFS.',
            features: [
                'Ethereum hash storage',
                'IPFS document storage',
                'One-click verification',
                'Employer verification portal',
            ],
            tech: ['Solidity', 'Ethereum', 'React', 'IPFS'],
            link: 'https://github.com/siddharthg-7/certification-validation-system-web3.0',
        },
    ];

    // Enhanced stagger configuration for cards
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        initial: {
            opacity: 0,
            y: 60,
            scale: 0.95,
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: duration.slow,
                ease: easing.enter,
            },
        },
    };

    // Feature list stagger
    const featureListVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const featureItemVariants = {
        initial: { opacity: 0, x: -10 },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                duration: duration.fast,
            },
        },
    };

    // Tech chip hover animation (only on desktop)
    const getTechChipAnimation = (cardIndex) => {
        if (isTouchDevice()) return {};
        return hoveredCard === cardIndex ? { y: -3, scale: 1.05 } : { y: 0, scale: 1 };
    };

    return (
        <section id="projects" className="section projects-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, ease: easing.enter }}
            >
                <h2 className="section-title">Projects</h2>
                <p className="section-subtitle">
                    Real-world applications built to solve problems and explore new technologies
                </p>
            </motion.div>

            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="initial"
                animate={isInView ? 'animate' : 'initial'}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="card project-card"
                        variants={cardVariants}
                        whileHover={{
                            y: -12,
                            transition: {
                                duration: duration.fast,
                                ease: easing.emphasis,
                            },
                        }}
                        whileTap={tapScale}
                        onHoverStart={() => setHoveredCard(index)}
                        onHoverEnd={() => setHoveredCard(null)}
                    >
                        {/* Status badge with animation */}
                        <motion.span
                            className={`project-status ${project.status.toLowerCase()}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.15 }}
                        >
                            {project.status}
                        </motion.span>

                        {/* Title */}
                        <motion.h3
                            className="project-title"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.15 }}
                        >
                            {project.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                            className="project-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.15 }}
                        >
                            {project.description}
                        </motion.p>

                        {/* Features with stagger */}
                        <motion.ul
                            className="project-features"
                            variants={featureListVariants}
                            initial="initial"
                            animate={isInView ? 'animate' : 'initial'}
                        >
                            {project.features.map((feature, featureIndex) => (
                                <motion.li
                                    key={featureIndex}
                                    variants={featureItemVariants}
                                >
                                    {feature}
                                </motion.li>
                            ))}
                        </motion.ul>

                        {/* Tech stack with hover animation */}
                        <motion.div
                            className="project-tech"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.15 }}
                        >
                            {project.tech.map((tech, techIndex) => (
                                <motion.span
                                    key={techIndex}
                                    className="tech-tag"
                                    animate={getTechChipAnimation(index)}
                                    transition={{
                                        duration: duration.instant,
                                        delay: techIndex * 0.03,
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        y: -2,
                                        transition: { duration: duration.instant },
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* GitHub link with enhanced animation */}
                        {project.link && (
                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: hoveredCard === index || isTouchDevice() ? 1 : 0.7,
                                }}
                                transition={{ duration: duration.fast }}
                                whileHover={{
                                    x: 5,
                                    opacity: 1,
                                    transition: { duration: duration.instant },
                                }}
                            >
                                <FaGithub size={18} />
                                <span>View on GitHub</span>
                                <motion.span
                                    animate={{
                                        x: [0, 3, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <FaExternalLinkAlt size={16} />
                                </motion.span>
                            </motion.a>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;

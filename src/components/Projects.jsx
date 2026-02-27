import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { isMobileDevice } from '../utils/motionConfig';
import { animateProjectCards } from '../utils/animeAnimations';
import MorphingCard from './MorphingCard';
import './Projects.css';

import busTrackerImg from '../assets/projects/bus_tracker.png';
import trustlinkImg from '../assets/projects/trustlink.png';
import blockchainImg from '../assets/projects/blockchain.png';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const cardsAnimated = useRef(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], isMobileDevice() ? [0, 0] : [30, -30]);

    useEffect(() => {
        if (isInView && !cardsAnimated.current) {
            cardsAnimated.current = true;
            setTimeout(() => {
                animateProjectCards('.project-card');
            }, 100);
        }
    }, [isInView]);

    const projects = [
        {
            title: 'Bus Tracker Application',
            status: 'Ongoing',
            image: busTrackerImg,
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
            title: 'TrustLink – Opportunity Verifier',
            status: 'Completed',
            image: trustlinkImg,
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
            title: 'Decentralized Certificate System',
            status: 'Completed',
            image: blockchainImg,
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

    return (
        <section id="projects" className="section projects-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Projects</h2>
                <p className="section-subtitle">
                    Real-world applications built to solve problems and explore new technologies
                </p>
            </motion.div>

            <motion.div
                className="projects-grid"
                style={{ y: parallaxY }}
            >
                {projects.map((project, index) => (
                    <MorphingCard
                        key={index}
                        className="project-card"
                        delay={0}
                        style={{ opacity: 0 }}
                    >
                        {/* Project Image */}
                        <div className="project-image-container">
                            <img src={project.image} alt={project.title} className="project-card-image" />
                            <div className="project-image-overlay" />
                        </div>

                        {/* Status badge */}
                        <span className={`project-status ${project.status.toLowerCase()}`}>
                            {project.status}
                        </span>

                        {/* Title */}
                        <h3 className="project-title">{project.title}</h3>

                        {/* Description */}
                        <p className="project-description">{project.description}</p>

                        {/* Features */}
                        <ul className="project-features">
                            {project.features.map((feature, featureIndex) => (
                                <li key={featureIndex}>{feature}</li>
                            ))}
                        </ul>

                        {/* Tech stack */}
                        <div className="project-tech">
                            {project.tech.map((tech, techIndex) => (
                                <span key={techIndex} className="tech-tag">{tech}</span>
                            ))}
                        </div>

                        {/* GitHub link */}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                            >
                                <FaGithub size={18} />
                                <span>View on GitHub</span>
                                <FaExternalLinkAlt size={16} />
                            </a>
                        )}
                    </MorphingCard>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;

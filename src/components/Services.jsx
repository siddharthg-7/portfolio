import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaBriefcase, FaUsers, FaRocket, FaTrophy } from 'react-icons/fa';
import { duration, easing, isTouchDevice } from '../utils/motionConfig';
import './Services.css';

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredService, setHoveredService] = useState(null);

    const services = [
        { icon: <FaBriefcase size={24} />, text: 'Internships' },
        { icon: <FaUsers size={24} />, text: 'Entry-level Roles' },
        { icon: <FaRocket size={24} />, text: 'Project Collaborations' },
        { icon: <FaTrophy size={24} />, text: 'Hackathons & Startups' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: duration.base, ease: easing.enter },
        },
    };

    // Icon pulse animation
    const iconVariants = {
        initial: { scale: 1 },
        hover: {
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 0.6,
                ease: easing.emphasis,
            },
        },
    };

    // Background glow animation
    const glowVariants = {
        initial: { opacity: 0, scale: 0.8 },
        hover: {
            opacity: 1,
            scale: 1.2,
            transition: {
                duration: duration.fast,
            },
        },
    };

    return (
        <section id="services" className="section services-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow }}
            >
                <h2 className="section-title">Open to Opportunities</h2>
                <p className="section-subtitle">
                    Actively seeking opportunities to learn, grow, and contribute to meaningful projects
                </p>
            </motion.div>

            <div className="services-content">
                <motion.div
                    className="services-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-item"
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.05,
                                transition: { duration: duration.fast }
                            }}
                            onHoverStart={() => setHoveredService(index)}
                            onHoverEnd={() => setHoveredService(null)}
                        >
                            {/* Background glow effect */}
                            <motion.div
                                className="service-glow"
                                variants={glowVariants}
                                initial="initial"
                                animate={hoveredService === index && !isTouchDevice() ? "hover" : "initial"}
                            />

                            <motion.div
                                className="service-icon"
                                variants={iconVariants}
                                initial="initial"
                                animate={hoveredService === index && !isTouchDevice() ? "hover" : "initial"}
                            >
                                {service.icon}
                            </motion.div>

                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                {service.text}
                            </motion.span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;

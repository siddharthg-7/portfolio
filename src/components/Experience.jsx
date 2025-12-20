import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { duration, easing, isTouchDevice } from '../utils/motionConfig';
import './Experience.css';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredItem, setHoveredItem] = useState(null);

    const experiences = [
        {
            title: 'AICTE & VOIS for Tech – Data Analysis with LLMs',
            date: 'Sep 2025 – Oct 2025',
            points: [
                'Analyzed 7,789 Netflix records to identify regional content trends',
                'Built an LLM-driven analysis pipeline reducing manual insight generation by ~60%',
            ],
        },
        {
            title: 'AICTE & Edunet Foundation – AI & Cloud Technology',
            date: 'Sep 2025 – Oct 2025',
            points: [
                'Built an AI-powered design platform with automation',
                'Applied AI tools for marketing automation and content generation',
            ],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: duration.slow, ease: easing.enter },
        },
    };

    // Point list stagger animation
    const pointsVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const pointVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: duration.fast },
        },
    };

    // Timeline dot animation
    const dotVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.3,
            transition: {
                duration: duration.instant,
                ease: easing.emphasis,
            },
        },
    };

    return (
        <section id="experience" className="section experience-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow }}
            >
                <h2 className="section-title">Experience</h2>
                <p className="section-subtitle">
                    Internships and learning experiences that shaped my technical journey
                </p>
            </motion.div>

            <motion.div
                className="experience-timeline"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="experience-item"
                        variants={itemVariants}
                        whileHover={{
                            x: 10,
                            transition: { duration: duration.fast }
                        }}
                        onHoverStart={() => setHoveredItem(index)}
                        onHoverEnd={() => setHoveredItem(null)}
                    >
                        {/* Animated timeline dot */}
                        <motion.div
                            className="timeline-dot"
                            variants={dotVariants}
                            initial="initial"
                            animate={hoveredItem === index && !isTouchDevice() ? "hover" : "initial"}
                        />

                        <div className="experience-content">
                            <div className="experience-header">
                                <motion.h3
                                    className="experience-title"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    {exp.title}
                                </motion.h3>
                                <motion.div
                                    className="experience-date"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    <Calendar size={16} />
                                    <span>{exp.date}</span>
                                </motion.div>
                            </div>

                            <motion.ul
                                className="experience-description"
                                variants={pointsVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                {exp.points.map((point, pointIndex) => (
                                    <motion.li
                                        key={pointIndex}
                                        variants={pointVariants}
                                    >
                                        <motion.span
                                            className="point-icon"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: 0.4 + index * 0.1 + pointIndex * 0.1,
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 15
                                            }}
                                        >
                                            <CheckCircle size={16} />
                                        </motion.span>
                                        {point}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Experience;

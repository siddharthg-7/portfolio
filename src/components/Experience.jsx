import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { animateExperienceItems } from '../utils/animeAnimations';
import './Experience.css';

const Experience = () => {
    const sectionRef = useRef(null);
    const itemsAnimated = useRef(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    // Keep Framer Motion spring for the timeline line fill — it's scroll-synced
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    // Anime.js staggered entrance for experience items
    useEffect(() => {
        if (isInView && !itemsAnimated.current) {
            itemsAnimated.current = true;
            setTimeout(() => {
                animateExperienceItems('.experience-item');
            }, 100);
        }
    }, [isInView]);

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

    return (
        <section id="experience" className="section experience-section" ref={sectionRef}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Experience</h2>
                <p className="section-subtitle">
                    Internships and learning experiences that shaped my technical journey
                </p>
            </motion.div>

            <div className="experience-timeline-container">
                {/* Timeline line — Framer Motion spring scroll sync */}
                <motion.div
                    className="timeline-line-animated"
                    style={{ scaleY, transformOrigin: 'top' }}
                />

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="experience-item"
                            style={{ opacity: 0 }}
                        >
                            <div className="timeline-dot" />

                            <div className="experience-content">
                                <div className="experience-header">
                                    <h3 className="experience-title">{exp.title}</h3>
                                    <div className="experience-date">
                                        <FaCalendarAlt size={16} />
                                        <span>{exp.date}</span>
                                    </div>
                                </div>

                                <ul className="experience-description">
                                    {exp.points.map((point, pointIndex) => (
                                        <li key={pointIndex}>
                                            <span className="point-icon">
                                                <FaCheckCircle size={16} />
                                            </span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar } from 'lucide-react';
import './Experience.css';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="experience" className="section experience-section" ref={ref}>
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
                        whileHover={{ x: 10, transition: { duration: 0.3 } }}
                    >
                        <div className="experience-header">
                            <h3 className="experience-title">{exp.title}</h3>
                            <div className="experience-date">
                                <Calendar size={16} />
                                <span>{exp.date}</span>
                            </div>
                        </div>
                        <ul className="experience-description">
                            {exp.points.map((point, pointIndex) => (
                                <li key={pointIndex}>{point}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Experience;

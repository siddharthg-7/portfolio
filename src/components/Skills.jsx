import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skillCategories = [
        {
            title: 'Core Areas',
            skills: ['Software Development', 'Full-Stack Web Development', 'Applied AI Concepts'],
        },
        {
            title: 'Programming & Tech',
            skills: ['Python', 'C', 'JavaScript'],
        },
        {
            title: 'Backend & Data',
            skills: ['Database Management (SQL)', 'API Development & Integration', 'Automation & Scripting'],
        },
        {
            title: 'Foundations',
            skills: ['Data Structures & Algorithms', 'Problem Solving', 'Data Analysis & Visualization'],
        },
        {
            title: 'Communication & Leadership',
            skills: ['Public Speaking', 'Community Learning', 'Startup Initiatives', 'Team Collaboration'],
        },
        {
            title: 'Creative & Marketing',
            skills: ['Digital Marketing', 'Content Creation', 'Technical Writing', 'Brand Strategy'],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const categoryVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const chipVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 },
        },
    };

    return (
        <section id="skills" className="section skills-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Skills & Expertise</h2>
                <p className="section-subtitle">
                    A comprehensive toolkit built through hands-on projects and continuous learning
                </p>
            </motion.div>

            <motion.div
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        className="skill-category card"
                        variants={categoryVariants}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                        <h3>{category.title}</h3>
                        <motion.div
                            className="skill-chips"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                        >
                            {category.skills.map((skill, skillIndex) => (
                                <motion.span
                                    key={skillIndex}
                                    className="skill-chip"
                                    variants={chipVariants}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;

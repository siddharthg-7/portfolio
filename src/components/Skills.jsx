import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skillCategories = [
        {
            title: 'Core Areas',
            skills: [
                { name: 'Software Development', level: 'Advanced' },
                { name: 'Full-Stack Web Development', level: 'Advanced' },
                { name: 'Applied AI Concepts', level: 'Intermediate' }
            ],
        },
        {
            title: 'Programming & Tech',
            skills: [
                { name: 'Python', level: 'Advanced' },
                { name: 'C', level: 'Intermediate' },
                { name: 'JavaScript', level: 'Advanced' }
            ],
        },
        {
            title: 'Backend & Data',
            skills: [
                { name: 'Database Management (SQL)', level: 'Intermediate' },
                { name: 'API Development & Integration', level: 'Advanced' },
                { name: 'Automation & Scripting', level: 'Advanced' }
            ],
        },
        {
            title: 'Foundations',
            skills: [
                { name: 'Data Structures & Algorithms', level: 'Intermediate' },
                { name: 'Problem Solving', level: 'Advanced' },
                { name: 'Data Analysis & Visualization', level: 'Intermediate' }
            ],
        },
        {
            title: 'Communication & Leadership',
            skills: [
                { name: 'Public Speaking', level: 'Advanced' },
                { name: 'Community Learning', level: 'Advanced' },
                { name: 'Startup Initiatives', level: 'Intermediate' },
                { name: 'Team Collaboration', level: 'Advanced' }
            ],
        },
        {
            title: 'Creative & Marketing',
            skills: [
                { name: 'Digital Marketing', level: 'Intermediate' },
                { name: 'Content Creation', level: 'Advanced' },
                { name: 'Technical Writing', level: 'Advanced' },
                { name: 'Brand Strategy', level: 'Intermediate' }
            ],
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
                                <motion.div
                                    key={skillIndex}
                                    className="skill-chip-wrapper"
                                    variants={chipVariants}
                                >
                                    <motion.span
                                        className={`skill-chip skill-level-${skill.level.toLowerCase()}`}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        {skill.name}
                                        <span className="skill-level-tooltip">{skill.level}</span>
                                    </motion.span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;

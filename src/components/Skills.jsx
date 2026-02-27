import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { isMobileDevice } from '../utils/motionConfig';
import { animateSkillChips, hoverSkillChip, leaveSkillChip, animateAboutCards } from '../utils/animeAnimations';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const chipsAnimated = useRef(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], isMobileDevice() ? [0, 0] : [15, -15]);

    // Fire Anime.js stagger when section comes into view
    useEffect(() => {
        if (isInView && !chipsAnimated.current) {
            chipsAnimated.current = true;
            // Small delay so elements have rendered
            setTimeout(() => {
                animateSkillChips('.skill-chip');
                animateAboutCards('.skill-category');
            }, 100);
        }
    }, [isInView]);

    const skillCategories = [
        {
            title: 'Core Areas',
            skills: [
                { name: 'Software Development', level: 'Advanced' },
                { name: 'Full-Stack Web Development', level: 'Advanced' },
                { name: 'Applied AI Concepts', level: 'Intermediate' },
            ],
        },
        {
            title: 'Programming & Tech',
            skills: [
                { name: 'Python', level: 'Advanced' },
                { name: 'C', level: 'Intermediate' },
                { name: 'JavaScript', level: 'Advanced' },
            ],
        },
        {
            title: 'Backend & Data',
            skills: [
                { name: 'Database Management (SQL)', level: 'Intermediate' },
                { name: 'API Development & Integration', level: 'Advanced' },
                { name: 'Automation & Scripting', level: 'Advanced' },
            ],
        },
        {
            title: 'Foundations',
            skills: [
                { name: 'Data Structures & Algorithms', level: 'Intermediate' },
                { name: 'Problem Solving', level: 'Advanced' },
                { name: 'Data Analysis & Visualization', level: 'Intermediate' },
            ],
        },
        {
            title: 'Communication & Leadership',
            skills: [
                { name: 'Public Speaking', level: 'Advanced' },
                { name: 'Community Learning', level: 'Advanced' },
                { name: 'Startup Initiatives', level: 'Intermediate' },
                { name: 'Team Collaboration', level: 'Advanced' },
            ],
        },
        {
            title: 'Creative & Marketing',
            skills: [
                { name: 'Digital Marketing', level: 'Intermediate' },
                { name: 'Content Creation', level: 'Advanced' },
                { name: 'Technical Writing', level: 'Advanced' },
                { name: 'Brand Strategy', level: 'Intermediate' },
            ],
        },
    ];

    return (
        <section id="skills" className="section skills-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Skills &amp; Expertise</h2>
                <p className="section-subtitle">
                    A comprehensive toolkit built through hands-on projects and continuous learning
                </p>
            </motion.div>

            <motion.div
                className="skills-grid"
                style={{ y: parallaxY }}
            >
                {skillCategories.map((category, index) => (
                    <div
                        key={index}
                        className="skill-category card"
                        style={{ opacity: isInView ? 1 : 0 }}
                    >
                        <h3>{category.title}</h3>
                        <div className="skill-chips">
                            {category.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="skill-chip-wrapper">
                                    <span
                                        className={`skill-chip skill-level-${skill.level.toLowerCase()}`}
                                        style={{ opacity: 0 }}
                                        onMouseEnter={(e) => hoverSkillChip(e.currentTarget)}
                                        onMouseLeave={(e) => leaveSkillChip(e.currentTarget)}
                                    >
                                        {skill.name}
                                        <span className="skill-level-tooltip">{skill.level}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;

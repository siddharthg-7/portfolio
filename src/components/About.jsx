import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { GraduationCap, Code, Lightbulb } from 'lucide-react';
import { duration, easing, isTouchDevice } from '../utils/motionConfig';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredCard, setHoveredCard] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: duration.slow, ease: easing.enter },
        },
    };

    // Icon animation variants
    const iconVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.15,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.5,
                ease: easing.emphasis,
            },
        },
    };

    // Content stagger for card internals
    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const aboutCards = [
        {
            icon: <GraduationCap size={32} />,
            title: 'Education',
            content: (
                <>
                    <p><strong>B.Tech in Information Technology</strong></p>
                    <p>VNR Vignana Jyothi Institute of Engineering and Technology</p>
                    <p className="graduation-date">Expected Graduation: August 2028</p>
                </>
            ),
        },
        {
            icon: <Code size={32} />,
            title: 'Professional Summary',
            content: (
                <p>
                    Second-year B.Tech IT student with hands-on experience in academic projects,
                    internships, and startup initiatives. Focused on building real-world applications
                    and solving complex problems through code.
                </p>
            ),
        },
        {
            icon: <Lightbulb size={32} />,
            title: 'Mindset',
            content: (
                <p>
                    Driven by a passion for turning ideas into real-world solutions.
                    Active in startup initiatives, public speaking, and community learning.
                    Engineering-first approach combined with creative problem-solving and
                    a commitment to long-term growth in the software industry.
                </p>
            ),
        },
    ];

    return (
        <section id="about" className="section about-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow }}
            >
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">
                    A detail-oriented engineering student passionate about building scalable,
                    real-world applications and exploring the intersection of software and AI.
                </p>
            </motion.div>

            <motion.div
                className="about-grid"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {aboutCards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="card about-card"
                        variants={cardVariants}
                        whileHover={{
                            y: -10,
                            scale: 1.02,
                            transition: { duration: duration.fast }
                        }}
                        onHoverStart={() => setHoveredCard(index)}
                        onHoverEnd={() => setHoveredCard(null)}
                    >
                        <motion.div
                            className="about-card-icon"
                            variants={iconVariants}
                            initial="initial"
                            animate={hoveredCard === index && !isTouchDevice() ? "hover" : "initial"}
                        >
                            {card.icon}
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            {card.title}
                        </motion.h3>
                        <motion.div
                            className="about-card-content"
                            variants={contentVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            {card.content}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default About;

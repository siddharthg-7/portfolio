import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code, Lightbulb } from 'lucide-react';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            transition: { duration: 0.6, ease: 'easeOut' },
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
                transition={{ duration: 0.6 }}
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
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                        <div className="about-card-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <div className="about-card-content">{card.content}</div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default About;

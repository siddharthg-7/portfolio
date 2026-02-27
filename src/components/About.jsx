import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FaGraduationCap, FaCode, FaLightbulb } from 'react-icons/fa';
import { isMobileDevice } from '../utils/motionConfig';
import { animateAboutCards } from '../utils/animeAnimations';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const cardsAnimated = useRef(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], isMobileDevice() ? [0, 0] : [20, -20]);

    // Anime.js stagger entrance for cards
    useEffect(() => {
        if (isInView && !cardsAnimated.current) {
            cardsAnimated.current = true;
            setTimeout(() => {
                animateAboutCards('.about-card');
            }, 80);
        }
    }, [isInView]);

    const aboutCards = [
        {
            icon: <FaGraduationCap size={32} />,
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
            icon: <FaCode size={32} />,
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
            icon: <FaLightbulb size={32} />,
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
                style={{ y: parallaxY }}
            >
                {aboutCards.map((card, index) => (
                    <div
                        key={index}
                        className="card about-card"
                        style={{ opacity: 0 }}
                    >
                        <div className="about-card-icon">
                            {card.icon}
                        </div>
                        <h3>{card.title}</h3>
                        <div className="about-card-content">
                            {card.content}
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default About;

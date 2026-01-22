import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ProgressIndicator.css';

const ProgressIndicator = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrollProgress, setScrollProgress] = useState(0);

    const sections = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            setScrollProgress(progress);

            const sectionElements = sections.map(section => ({
                id: section.id,
                element: document.getElementById(section.id),
            }));

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const section = sectionElements[i];
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    if (rect.top <= windowHeight / 2) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.div
                className="scroll-progress-bar"
                style={{ width: `${scrollProgress}%` }}
                initial={{ width: 0 }}
                transition={{ duration: 0.1 }}
            />
            <div className="progress-indicator">
                {sections.map((section, index) => (
                    <motion.button
                        key={section.id}
                        className={`progress-dot ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => handleClick(section.id)}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Navigate to ${section.label}`}
                    >
                        <span className="progress-tooltip">{section.label}</span>
                    </motion.button>
                ))}
            </div>
        </>
    );
};

export default ProgressIndicator;

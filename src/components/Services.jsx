import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Users, Rocket, Award } from 'lucide-react';
import './Services.css';

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const services = [
        { icon: <Briefcase size={24} />, text: 'Internships' },
        { icon: <Users size={24} />, text: 'Entry-level Roles' },
        { icon: <Rocket size={24} />, text: 'Project Collaborations' },
        { icon: <Award size={24} />, text: 'Hackathons & Startups' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section id="services" className="section services-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Open to Opportunities</h2>
                <p className="section-subtitle">
                    Actively seeking opportunities to learn, grow, and contribute to meaningful projects
                </p>
            </motion.div>

            <div className="services-content">
                <motion.div
                    className="services-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-item"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <span>{service.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;

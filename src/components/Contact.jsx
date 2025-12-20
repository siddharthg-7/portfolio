import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import {
    fadeInUp,
    duration,
    easing,
    tapScale,
} from '../utils/motionConfig';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const formRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'

    // EmailJS Configuration
    const EMAILJS_SERVICE_ID = 'service_amw3fln';
    const EMAILJS_TEMPLATE_ID = 'template_1w5j4wd';
    const EMAILJS_PUBLIC_KEY = 'ja499bAq6EQvV-6Ny';

    const contactInfo = [
        {
            icon: <Mail size={24} />,
            label: 'Email',
            value: 'siddharthgoudgilakathi@gmail.com',
            link: 'mailto:siddharthgoudgilakathi@gmail.com',
        },
        {
            icon: <Phone size={24} />,
            label: 'Phone',
            value: '+91 9493217211',
            link: 'tel:+919493217211',
        },
        {
            icon: <MapPin size={24} />,
            label: 'Location',
            value: 'Hyderabad, India',
            link: null,
        },
        {
            icon: <Linkedin size={24} />,
            label: 'LinkedIn',
            value: 'Connect on LinkedIn',
            link: 'https://linkedin.com/in/gilakathi-siddhartha-goud-a51ba3325',
        },
        {
            icon: <Github size={24} />,
            label: 'GitHub',
            value: 'View GitHub Profile',
            link: 'https://github.com/siddharthg-7',
        },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // Send email using EmailJS
            const result = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Gilakathi Siddhartha Goud',
                },
                EMAILJS_PUBLIC_KEY
            );

            console.log('Email sent successfully:', result);

            // Success
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(''), 5000);

        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitStatus('error');

            // Clear error message after 5 seconds
            setTimeout(() => setSubmitStatus(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

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
            transition: { duration: duration.base, ease: easing.enter },
        },
    };

    return (
        <section id="contact" className="section contact-section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, ease: easing.enter }}
            >
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">
                    Let's connect! I'm always open to discussing new opportunities and collaborations
                </p>
            </motion.div>

            <div className="contact-grid">
                <motion.div
                    className="contact-info"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            className="contact-item"
                            variants={itemVariants}
                            whileHover={{ x: 5, transition: { duration: 0.3 } }}
                        >
                            <div className="contact-icon">{item.icon}</div>
                            <div className="contact-details">
                                <h4>{item.label}</h4>
                                {item.link ? (
                                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p>{item.value}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.form
                    ref={formRef}
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: duration.slow, delay: 0.3, ease: easing.enter }}
                >
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Your message..."
                            disabled={isSubmitting}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? tapScale : {}}
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    className="spinner"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <Send size={18} />
                            </>
                        )}
                    </motion.button>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <motion.div
                            className="submit-message submit-success"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <CheckCircle size={20} />
                            <span>Message sent successfully! I'll get back to you soon.</span>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <motion.div
                            className="submit-message submit-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <AlertCircle size={20} />
                            <span>Failed to send message. Please try again or email me directly.</span>
                        </motion.div>
                    )}
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;

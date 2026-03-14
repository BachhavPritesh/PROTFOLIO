import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // You can add email service integration here (e.g., EmailJS)
        alert('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: 'Email',
            value: 'pritesh.v.bachhav.cg@gmail.com',
            link: 'mailto:pritesh.v.bachhav.cg@gmail.com',
        },
        {
            icon: FaPhone,
            label: 'Phone',
            value: '+91 8200762015',
            link: 'tel:+918200762015',
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Location',
            value: 'Ahmedabad, India',
            link: null,
        },
    ];

    const socialLinks = [
        {
            icon: FaGithub,
            label: 'GitHub',
            link: 'https://github.com/BachhavPritesh',
            color: '#fff',
        },
        {
            icon: FaLinkedin,
            label: 'LinkedIn',
            link: 'http://linkedin.com/in/pritesh-cg-bachhav-233148396/',
            color: '#fff',
        },
        {
            icon: FaXTwitter,
            label: 'X',
            link: 'https://x.com/PRITESH_CG',
            color: '#fff',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="contact" className="contact section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.h2>

                <motion.div
                    className="contact-content"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    {/* Contact Form */}
                    <motion.div className="contact-form-wrapper" variants={itemVariants}>
                        <h3 className="contact-subtitle">Send Me a Message</h3>
                        <form className="contact-form glass" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaPaperPlane /> Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Social */}
                    <div className="contact-sidebar">
                        <motion.div className="contact-info" variants={itemVariants}>
                            <h3 className="contact-subtitle">Contact Information</h3>
                            <div className="info-list">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="info-item glass">
                                        <info.icon className="info-icon" />
                                        <div className="info-details">
                                            <p className="info-label">{info.label}</p>
                                            {info.link ? (
                                                <a href={info.link} className="info-value">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="info-value">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="contact-social" variants={itemVariants}>
                            <h3 className="contact-subtitle">Connect With Me</h3>
                            <div className="social-links">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-card glass"
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="social-icon" style={{ color: social.color }} />
                                        <span className="social-label">{social.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;

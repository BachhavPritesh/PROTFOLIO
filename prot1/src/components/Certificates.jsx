import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import './Certificates.css';

const Certificates = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeCategory, setActiveCategory] = useState('all');

    const certificates = [
        {
            title: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2023',
            category: 'cloud',
            link: 'https://aws.amazon.com',
        },
        {
            title: 'React Developer Certification',
            issuer: 'Meta',
            date: '2023',
            category: 'frontend',
            link: 'https://meta.com',
        },
        {
            title: 'Node.js Application Development',
            issuer: 'OpenJS Foundation',
            date: '2022',
            category: 'backend',
            link: 'https://openjsf.org',
        },
        {
            title: 'MongoDB Certified Developer',
            issuer: 'MongoDB University',
            date: '2022',
            category: 'database',
            link: 'https://university.mongodb.com',
        },
        {
            title: 'Google Cloud Professional',
            issuer: 'Google Cloud',
            date: '2023',
            category: 'cloud',
            link: 'https://cloud.google.com',
        },
        {
            title: 'Full Stack Web Development',
            issuer: 'freeCodeCamp',
            date: '2021',
            category: 'fullstack',
            link: 'https://freecodecamp.org',
        },
    ];

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'cloud', label: 'Cloud' },
        { id: 'frontend', label: 'Frontend' },
        { id: 'backend', label: 'Backend' },
        { id: 'database', label: 'Database' },
        { id: 'fullstack', label: 'Full Stack' },
    ];

    const filteredCertificates =
        activeCategory === 'all'
            ? certificates
            : certificates.filter((cert) => cert.category === activeCategory);

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
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="certificates" className="certificates section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    Certificates & Achievements
                </motion.h2>

                <motion.div
                    className="certificate-filters"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`filter-btn ${activeCategory === category.id ? 'active' : ''
                                }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    className="certificates-grid"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    key={activeCategory}
                >
                    {filteredCertificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            className="certificate-card glass"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="certificate-icon">
                                <FaAward />
                            </div>
                            <h3 className="certificate-title">{cert.title}</h3>
                            <p className="certificate-issuer">{cert.issuer}</p>
                            <p className="certificate-date">{cert.date}</p>
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="certificate-link btn btn-secondary"
                            >
                                <FaExternalLinkAlt /> View Certificate
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certificates;

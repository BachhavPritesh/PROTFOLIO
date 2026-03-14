import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="about" className="about section" ref={ref}>
            <div className="container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    <motion.h2 className="section-title" variants={itemVariants}>
                        About Me
                    </motion.h2>

                    <div className="about-content">
                        <motion.div className="about-text" variants={itemVariants}>
                            <p>
                                I'm a passionate Full Stack Developer with a love for creating
                                elegant solutions to complex problems. With expertise in modern
                                web technologies, I specialize in building responsive,
                                user-friendly applications that deliver exceptional experiences.
                            </p>
                            <p>
                                My journey in software development has equipped me with a diverse
                                skill set spanning front-end and back-end technologies. I thrive
                                in collaborative environments and am constantly learning new
                                technologies to stay at the forefront of web development.
                            </p>
                            <p>
                                When I'm not coding, you'll find me exploring new technologies,
                                contributing to open-source projects, or sharing knowledge with
                                the developer community.
                            </p>
                        </motion.div>

                        <motion.div className="about-stats" variants={itemVariants}>
                            <div className="stat-card glass">
                                <h3 className="stat-number">3+</h3>
                                <p className="stat-label">Years Experience</p>
                            </div>
                            <div className="stat-card glass">
                                <h3 className="stat-number">50+</h3>
                                <p className="stat-label">Projects Completed</p>
                            </div>
                            <div className="stat-card glass">
                                <h3 className="stat-number">20+</h3>
                                <p className="stat-label">Happy Clients</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;

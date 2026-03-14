import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
const profileImg = 'https://res.cloudinary.com/dzmso2ukz/image/upload/v1767710904/prit_v53ufo.jpg';
import './Hero.css';

const Hero = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: 'easeOut',
            },
        }),
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="hero section">
            <div className="hero-container container">
                <motion.div
                    className="hero-content"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="hero-image-wrapper"
                        variants={imageVariants}
                    >
                        <div className="hero-image-glow"></div>
                        <div className="hero-image-ring"></div>
                        <img src={profileImg} alt="Profile" className="hero-image" />
                    </motion.div>

                    <motion.h3
                        className="hero-greeting"
                        custom={0}
                        variants={textVariants}
                    >
                        Hi, I'm
                    </motion.h3>

                    <motion.h1
                        className="hero-name"
                        custom={1}
                        variants={textVariants}
                    >
                        BACHHAV PRITESH
                    </motion.h1>

                    <motion.div
                        className="hero-title-wrapper"
                        custom={2}
                        variants={textVariants}
                    >
                        <TypeAnimation
                            sequence={[
                                'Full Stack Developer',
                                2000,
                                'UI/UX Designer',
                                2000,
                                'Problem Solver',
                                2000,
                                'Creative Thinker',
                                2000,
                            ]}
                            wrapper="h2"
                            speed={50}
                            className="hero-title"
                            repeat={Infinity}
                        />
                    </motion.div>

                    <motion.p
                        className="hero-description"
                        custom={3}
                        variants={textVariants}
                    >
                        I craft beautiful, functional, and user-centric digital experiences.
                        Passionate about creating innovative solutions that make a difference.
                    </motion.p>

                    <motion.div
                        className="hero-cta"
                        custom={4}
                        variants={textVariants}
                    >
                        <a href="#contact" className="btn btn-primary">
                            <FaEnvelope /> Get In Touch
                        </a>
                        <a href="#projects" className="btn btn-secondary">
                            View Projects
                        </a>
                    </motion.div>

                    <motion.div
                        className="hero-socials"
                        custom={5}
                        variants={textVariants}
                    >
                        <a
                            href="https://github.com/BachhavPritesh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="http://linkedin.com/in/pritesh-cg-bachhav-233148396/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="mailto:pritesh.v.bachhav.cg@gmail.com"
                            className="social-link"
                            aria-label="Email"
                        >
                            <FaEnvelope />
                        </a>
                    </motion.div>

                    <motion.button
                        className="scroll-indicator"
                        onClick={scrollToAbout}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        aria-label="Scroll to about section"
                    >
                        <FaArrowDown className="scroll-arrow" />
                    </motion.button>
                </motion.div>

                {/* Enhanced Background */}
                <div className="hero-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>

                    {/* Particle Grid */}
                    <div className="particle-grid">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${3 + Math.random() * 4}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

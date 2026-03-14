import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import MouseGlow from './ui/MouseGlow';

const greetings = [
    "Hello",       // English
    "Ciao",        // Italian
    "Bonjour",     // French
    "Hola",        // Spanish
    "Namaste",     // Hindi
    "Konnichiwa",  // Japanese
    "Guten Tag"    // German
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setIsTablet(w >= 768 && w < 1024);
        };
        window.addEventListener('resize', handleResize);

        const greetingTimer = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 2000);

        const glitchTimer = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 300);
        }, 3000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(greetingTimer);
            clearInterval(glitchTimer);
        };
    }, []);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const showGlitch = isHovered || isGlitching;

    return (
        <section
            ref={containerRef}
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '120px 5% 60px 5%' : '0 10%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <MouseGlow containerRef={containerRef} />
            <motion.div style={{
                scale,
                opacity,
                y,
                width: '100%',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1.2fr 1fr' : '1.2fr 1fr',
                gap: isMobile ? '2.5rem' : isTablet ? '2rem' : '4rem',
                alignItems: 'center',
                marginTop: isMobile ? '20px' : '0'
            }}>

                {/* Left Side: Image with Geometric Background */}
                <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    style={{ position: 'relative', cursor: 'pointer', maxWidth: isMobile ? '350px' : 'none', margin: isMobile ? '0 auto' : '0' }}
                >
                    {/* ... (glitch layers and neon shape remain same) ... */}
                    {showGlitch && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 0.2, 0.5], x: [-2, 2, -1], y: [1, -1, 1] }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    left: '-5px',
                                    width: '100%',
                                    height: '100%',
                                    border: '2px solid #ff00ff',
                                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                                    zIndex: -1,
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 0.2, 0.5], x: [2, -2, 1], y: [-1, 1, -1] }}
                                transition={{ duration: 0.15, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    left: '5px',
                                    width: '100%',
                                    height: '100%',
                                    border: '2px solid #00ffff',
                                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                                    zIndex: -1,
                                }}
                            />
                        </>
                    )}

                    <motion.div
                        animate={{
                            x: showGlitch ? -30 : -20,
                            y: showGlitch ? -30 : -20,
                            filter: showGlitch ? 'blur(10px) brightness(1.2)' : 'blur(0px) brightness(1)',
                        }}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'var(--accent-color)',
                            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                            zIndex: -1,
                        }}
                    />

                    <motion.img
                        src="https://res.cloudinary.com/dzmso2ukz/image/upload/v1767710904/prit_v53ufo.jpg"
                        alt="Pritesh"
                        whileHover={{ scale: 1.05 }}
                        animate={{
                            filter: showGlitch
                                ? 'grayscale(0%) contrast(1.1)'
                                : 'grayscale(100%) contrast(1.1)',
                            x: isGlitching ? [0, -5, 5, 0] : 0,
                        }}
                        transition={{
                            filter: { duration: 0.4 },
                            x: { duration: 0.1, repeat: isGlitching ? Infinity : 0 }
                        }}
                        style={{
                            width: '100%',
                            aspectRatio: '1',
                            objectFit: 'cover',
                            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                        }}
                    />

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '-10px',
                            width: '40px',
                            height: '40px',
                            borderTop: '2px solid var(--accent-color)',
                            borderLeft: '2px solid var(--accent-color)',
                        }}
                    />
                </motion.div>

                {/* Right Side: Text & Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ textAlign: isMobile ? 'center' : 'left' }}
                >
                    <div style={{ height: isMobile ? '3rem' : '4rem', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={index}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{
                                    fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.2rem)' : '3rem',
                                    fontWeight: '400',
                                    color: 'var(--text-primary)',
                                    margin: 0
                                }}
                            >
                                {greetings[index]} World!
                            </motion.h2>
                        </AnimatePresence>
                    </div>

                    <motion.h1
                        style={{ fontSize: isMobile ? 'clamp(2.2rem, 10vw, 3.5rem)' : isTablet ? '3.5rem' : '5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem' }}
                    >
                        Im <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', fontWeight: '400', fontFamily: 'serif' }}>PRITESH BACHHAV</span>
                    </motion.h1>

                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: isMobile ? '0.95rem' : '1.2rem',
                        maxWidth: isMobile ? '100%' : '500px',
                        lineHeight: '1.6',
                        marginBottom: '2rem',
                        margin: isMobile ? '0 auto 2rem auto' : '0 0 2rem 0'
                    }}>
                        A passionate Fullstack Developer with creative thinking. Loves creating sleek designs and best softwares out of the box, I always wanna make products the best and most efficient.
                    </p>

                    <div className="hero-glow"></div>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '3rem',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        flexWrap: 'wrap'
                    }}>
                        <MagneticButton
                            className="neon-btn"
                            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ padding: isMobile ? '10px 20px' : '12px 24px', fontSize: isMobile ? '0.9rem' : '1rem' }}
                        >
                            My Projects
                        </MagneticButton>
                        <MagneticButton
                            className="outline-btn"
                            onClick={() => document.querySelector('#focus')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ padding: isMobile ? '10px 20px' : '12px 24px', fontSize: isMobile ? '0.9rem' : '1rem' }}
                        >
                            About Me
                        </MagneticButton>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '0.8rem',
                        justifyContent: isMobile ? 'center' : 'flex-start'
                    }}>
                        {[
                            { Icon: Github, color: '#171515', link: 'https://github.com/BachhavPritesh' },
                            { Icon: Linkedin, color: '#0077B5', link: 'https://www.linkedin.com/in/pritesh-bachhav-233148396/' },
                            { Icon: Twitter, color: '#1DA1F2', link: 'https://x.com/PRITESH_CG' },
                            { Icon: Instagram, color: '#E4405F', link: 'https://instagram.com' }
                        ].map(({ Icon, color, link }, idx) => (
                            <motion.a
                                key={idx}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{
                                    y: -8,
                                    scale: 1.1,
                                    rotate: 8,
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    color: '#fff',
                                    borderColor: color,
                                    boxShadow: `0 10px 20px ${color}44`
                                }}
                                style={{
                                    width: isMobile ? '45px' : '55px',
                                    height: isMobile ? '45px' : '55px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    background: 'rgba(255,255,255,0.02)',
                                    overflow: 'hidden'
                                }}
                            >
                                <Icon size={isMobile ? 20 : 24} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating Chat Icon */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: isMobile ? '20px' : '40px',
                    right: isMobile ? '20px' : '40px',
                    width: isMobile ? '48px' : '60px',
                    height: isMobile ? '48px' : '60px',
                    background: 'var(--accent-color)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(163, 255, 0, 0.4)',
                    zIndex: 100
                }}
            >
                <Send size={isMobile ? 20 : 24} color="#000" />
            </motion.div>
        </section>
    );
};

export default Hero;

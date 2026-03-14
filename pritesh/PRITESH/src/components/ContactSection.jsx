import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MessageSquare, ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import MouseGlow from './ui/MouseGlow';

const ContactSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
    const [currentTime, setCurrentTime] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setIsTablet(w >= 768 && w < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
            setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(now));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopyEmail = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText('pritesh.v.bachhav.cg@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { scrollYProgress: entranceProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const entranceScale = useTransform(entranceProgress, [0, 1], [0.85, 1]);
    const entranceOpacity = useTransform(entranceProgress, [0, 1], [0, 1]);

    const socialLinks = [
        {
            name: "Mail",
            icon: <Mail size={24} />,
            link: "mailto:pritesh.v.bachhav.cg@gmail.com",
            color: "#a3ff00",
            label: "Send an Email",
            canCopy: true
        },
        {
            name: "Github",
            icon: <Github size={24} />,
            link: "https://github.com/BachhavPritesh",
            color: "#ffffff",
            label: "View Repositories"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={24} />,
            link: "https://www.linkedin.com/in/pritesh-bachhav-233148396/",
            color: "#0077b5",
            label: "Professional Profile"
        },
        {
            name: "Twitter",
            icon: <Twitter size={24} />,
            link: "https://x.com/PRITESH_CG",
            color: "#1DA1F2",
            label: "Social Hub"
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            style={{
                backgroundColor: '#0c0c0c',
                padding: isMobile ? '100px 5% 40px 5%' : '120px 10%',
                minHeight: '100vh',
                position: 'relative',
                zIndex: 4,
                overflow: 'hidden'
            }}
        >
            <MouseGlow containerRef={sectionRef} />

            <motion.div
                style={{
                    scale: entranceScale,
                    opacity: entranceOpacity,
                    width: '100%'
                }}
            >
                {/* Header Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'center' : 'flex-end',
                    marginBottom: isMobile ? '4rem' : '8rem',
                    gap: isMobile ? '2rem' : '0'
                }}>
                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 16px',
                                background: 'rgba(163, 255, 0, 0.05)',
                                borderRadius: '100px',
                                color: '#a3ff00',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                border: '1px solid rgba(163, 255, 0, 0.1)',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <span style={{ width: '8px', height: '8px', background: '#a3ff00', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #a3ff00' }}></span>
                            Available for hire
                        </motion.div>
                        <motion.h2
                            style={{
                                fontSize: isMobile ? 'clamp(3rem, 15vw, 4.5rem)' : isTablet ? '7rem' : '10rem',
                                fontWeight: '900',
                                fontFamily: "'Syne', sans-serif",
                                color: 'transparent',
                                background: 'linear-gradient(90deg, #ffffff 0%, #a1a1a1 25%, #fff 50%, #a1a1a1 75%, #ffffff 100%)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase',
                                margin: 0,
                                lineHeight: 1
                            }}
                        >
                            {"CONTACT".split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    style={{ display: 'inline-block' }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.h2>
                    </div>

                    {/* Local Time Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            textAlign: isMobile ? 'center' : 'right',
                            padding: isMobile ? '15px' : '20px',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            minWidth: isMobile ? '100%' : '200px'
                        }}
                    >
                        <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>My Local Time</p>
                        <p style={{ color: '#fff', fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: '700', fontFamily: 'monospace' }}>{currentTime}</p>
                        <p style={{ color: '#a3ff00', fontSize: '0.8rem', marginTop: '5px' }}>AHMEDABAD, India (IST)</p>
                    </motion.div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
                    gap: isMobile ? '3rem' : '6rem',
                    alignItems: 'start'
                }}>
                    {/* Left Content */}
                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{
                                fontSize: isMobile ? '2.5rem' : '4.5rem',
                                color: '#fff',
                                fontWeight: '500',
                                marginBottom: '2.5rem',
                                lineHeight: '1',
                                letterSpacing: '-0.03em'
                            }}
                        >
                            Interested in working <br />
                            <span style={{ color: '#a3ff00', fontStyle: 'italic', fontFamily: 'serif' }}>together?</span>
                        </motion.h3>

                        <div style={{ marginBottom: '4rem' }}>
                            <MagneticButton
                                onClick={() => window.location.href = 'mailto:pritesh.v.bachhav.cg@gmail.com'}
                                style={{
                                    padding: isMobile ? '16px 28px' : '24px 56px',
                                    background: '#a3ff00',
                                    color: '#000',
                                    border: 'none',
                                    fontSize: isMobile ? '0.95rem' : '1.1rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    cursor: 'pointer',
                                    borderRadius: '100px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    boxShadow: '0 20px 40px rgba(163, 255, 0, 0.2)',
                                    transition: 'background 0.3s',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Start a Conversation
                                <ArrowRight size={isMobile ? 18 : 22} />
                            </MagneticButton>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                            style={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: isMobile ? '1.5rem' : '3rem',
                                justifyContent: isMobile ? 'center' : 'flex-start',
                                alignItems: isMobile ? 'center' : 'flex-start'
                            }}
                        >
                            <div>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '8px' }}>Email</p>
                                <p style={{ color: '#fff', fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: '500', wordBreak: 'break-all' }}>pritesh.v.bachhav.cg@gmail.com</p>
                            </div>
                            <div>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '8px' }}>Location</p>
                                <p style={{ color: '#fff', fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: '500' }}>GUJARAT, India</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Social Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: isMobile ? '1rem' : '1.5rem'
                    }}>
                        {socialLinks.map((social, idx) => (
                            <motion.div
                                key={social.name}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                                whileHover={{
                                    y: -10,
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: social.color + '44'
                                }}
                                style={{
                                    padding: isMobile ? '1.2rem' : '2.5rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '32px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: isMobile ? '1rem' : '1.5rem',
                                    position: 'relative',
                                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                                }}
                                onClick={() => window.open(social.link, '_blank')}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: social.color,
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    {social.icon}
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.3rem', fontWeight: '600' }}>
                                        {social.name}
                                    </h4>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                                        {social.label}
                                    </p>
                                </div>

                                {social.canCopy && (
                                    <motion.button
                                        whileHover={{ scale: 1.1, background: '#a3ff00', color: '#000' }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleCopyEmail}
                                        style={{
                                            position: 'absolute',
                                            top: '20px',
                                            right: '20px',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'transparent',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </motion.button>
                                )}
                            </motion.div>
                        ))}

                        {/* LinkedIn Special Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            whileHover={{ scale: 1.02, background: 'linear-gradient(135deg, rgba(163, 255, 0, 0.15) 0%, rgba(163, 255, 0, 0.05) 100%)' }}
                             style={{
                                gridColumn: 'span 2',
                                padding: isMobile ? '1.2rem' : '2.5rem',
                                background: 'linear-gradient(135deg, rgba(163, 255, 0, 0.1) 0%, rgba(163, 255, 0, 0.02) 100%)',
                                border: '1px solid rgba(163, 255, 0, 0.1)',
                                borderRadius: '32px',
                                display: 'flex',
                                flexDirection: isMobile ? 'row' : 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                marginTop: '1rem',
                                transition: 'all 0.4s',
                                gap: isMobile ? '1rem' : '0'
                            }}
                            onClick={() => window.open('https://www.linkedin.com/in/pritesh-bachhav-233148396/', '_blank')}
                        >
                             <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2rem' }}>
                                <div style={{
                                    width: isMobile ? '48px' : '64px',
                                    height: isMobile ? '48px' : '64px',
                                    borderRadius: '50%',
                                    background: '#a3ff00',
                                    color: '#000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 20px rgba(163, 255, 0, 0.3)',
                                    flexShrink: 0
                                }}>
                                    <MessageSquare size={isMobile ? 24 : 32} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ 
                                        color: '#fff', 
                                        fontSize: isMobile ? 'clamp(1.1rem, 4vw, 1.5rem)' : '1.5rem', 
                                        fontWeight: '600',
                                        margin: 0,
                                        lineHeight: 1.2
                                    }}>
                                        Drop a message
                                    </h4>
                                    <p style={{ 
                                        color: '#a3ff00', 
                                        fontSize: isMobile ? '0.85rem' : '1rem', 
                                        fontWeight: '500',
                                        margin: '4px 0 0 0'
                                    }}>
                                        Response time: Usually within 24h
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                border: '1px solid rgba(163, 255, 0, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#a3ff00'
                            }}>
                                <ExternalLink size={20} />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Refined Footer */}
                <div style={{
                    marginTop: isMobile ? '6rem' : '10rem',
                    padding: '4rem 0',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: isMobile ? '3rem' : '0'
                }}>
                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <h5 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '2px' }}>PRITESH</h5>
                        <p style={{ color: '#555', fontSize: '0.9rem' }}>© {new Date().getFullYear()} All Rights Reserved.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[
                            { label: 'Work', link: '#projects' },
                            { label: 'Focus', link: '#focus' },
                            { label: 'About', link: '#about' }
                        ].map(item => (
                            <a key={item.label} href={item.link} style={{
                                color: '#666',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                transition: 'color 0.3s'
                            }}
                                onMouseEnter={e => e.target.style.color = '#a3ff00'}
                                onMouseLeave={e => e.target.style.color = '#666'}>
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <motion.div
                        whileHover={{ y: -5, color: '#fff' }}
                        style={{
                            color: '#a3ff00',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            letterSpacing: '3px',
                            cursor: 'pointer',
                            padding: '10px 20px',
                            border: '1px solid rgba(163, 255, 0, 0.2)',
                            borderRadius: '100px',
                            textTransform: 'uppercase'
                        }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Scroll to top
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactSection;

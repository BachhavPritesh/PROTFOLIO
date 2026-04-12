import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setIsTablet(w >= 768 && w < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { name: 'Home', target: '#home' },
        { name: 'About', target: '#about' },
        { name: 'Education', target: '#education' },
        { name: 'Projects', target: '#projects' },
        { name: 'Contact', target: '#contact' },
    ];

    const scrollToSection = (e, target) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: isMobile ? '15px 5%' : '30px 10%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    backgroundColor: isOpen ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
                    backdropFilter: isOpen ? 'blur(10px)' : 'none',
                    transition: 'background-color 0.3s ease'
                }}
            >
                {/* Modern Brand Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', zIndex: 1001, gap: '10px' }}
                    onClick={(e) => scrollToSection(e, '#home')}
                >
                    <svg viewBox="0 0 100 100" style={{ width: isMobile ? '35px' : '45px', height: isMobile ? '35px' : '45px', overflow: 'visible' }}>
                        <defs>
                            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--accent-color)" />
                                <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.2" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        
                        {/* Rotating geometric frame */}
                        <motion.polygon 
                            points="50,5 89,27 89,72 50,95 11,72 11,27"
                            fill="transparent"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1.5"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "50px 50px" }}
                        />
                        <motion.polygon 
                            points="50,15 80,32 80,68 50,85 20,68 20,32"
                            fill="transparent"
                            stroke="rgba(163, 255, 0, 0.15)"
                            strokeWidth="1"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "50px 50px" }}
                        />

                        {/* Stylized P */}
                        <motion.path
                            d="M38,72 L38,28 L58,28 C68,28 72,34 72,43 C72,52 68,58 58,58 L38,58"
                            fill="transparent"
                            stroke="url(#neonGradient)"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        
                        {/* Accent dot */}
                        <motion.circle 
                            cx="55" 
                            cy="43" 
                            r="3.5" 
                            fill="#fff" 
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.5, 1] }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                        />
                    </svg>

                    {!isMobile && (
                        <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{ 
                                fontSize: '1.2rem', 
                                fontWeight: '900', 
                                color: '#fff', 
                                letterSpacing: '1.5px',
                                fontFamily: "'Syne', sans-serif"
                            }}
                        >
                            PRITESH<span style={{ color: 'var(--accent-color)' }}>.</span>
                        </motion.span>
                    )}
                </motion.div>

                {/* Desktop Links */}
                {!isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? '16px' : '30px' }}>
                        <div style={{ display: 'flex', gap: isTablet ? '12px' : '20px' }}>
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.target}
                                    onClick={(e) => scrollToSection(e, link.target)}
                                    whileHover={{ color: 'var(--accent-color)', y: -2 }}
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        transition: 'color 0.3s'
                                    }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => scrollToSection(e, '#contact')}
                            style={{
                                background: 'var(--accent-color)',
                                color: '#000',
                                border: 'none',
                                padding: isTablet ? '8px 20px' : '10px 30px',
                                borderRadius: '25px',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                letterSpacing: '1px',
                                boxShadow: '0 4px 15px rgba(163, 255, 0, 0.2)'
                            }}
                        >
                            LET'S TALK
                        </motion.button>
                    </div>
                )}

                {/* Mobile Hamburger Button */}
                {isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--accent-color)',
                                cursor: 'pointer',
                                zIndex: 1001,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </motion.button>
                    </div>
                )}
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            backgroundColor: 'rgba(10, 10, 10, 0.98)',
                            backdropFilter: 'blur(15px)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '30px'
                        }}
                    >
                        {navLinks.map((link, idx) => (
                            <motion.a
                                key={link.name}
                                href={link.target}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={(e) => scrollToSection(e, link.target)}
                                style={{
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    fontSize: '28px',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontFamily: "'Syne', sans-serif"
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            onClick={(e) => scrollToSection(e, '#contact')}
                            style={{
                                marginTop: '20px',
                                background: 'var(--accent-color)',
                                color: '#000',
                                border: 'none',
                                padding: '15px 40px',
                                borderRadius: '100px',
                                fontWeight: '700',
                                fontSize: '18px',
                                cursor: 'pointer'
                            }}
                        >
                            Get in Touch
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;

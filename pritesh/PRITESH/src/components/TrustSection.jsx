import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, animate, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import MouseGlow from './ui/MouseGlow';

const StatCounter = ({ value, label, suffix = "", isMobile = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 60,
    });

    useEffect(() => {
        if (isInView) {
            animate(motionValue, value, { duration: 2, ease: "easeOut" });
        } else {
            motionValue.set(0);
        }
    }, [isInView, value, motionValue]);

    const [displayValue, setDisplayValue] = React.useState("0");

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest).toLocaleString());
        });
    }, [springValue]);

    return (
        <div ref={ref} style={{ textAlign: 'center', padding: isMobile ? '0' : '0 2rem' }}>
            <div style={{
                fontSize: isMobile ? '3rem' : '4.5rem',
                fontWeight: '800',
                color: '#000',
                marginBottom: '0.2rem'
            }}>
                {displayValue}{suffix}
            </div>
            <div style={{
                fontSize: isMobile ? '0.8rem' : '1rem',
                color: '#000',
                opacity: 0.6,
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                {label}
            </div>
        </div>
    );
};

const TrustSection = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, margin: "-100px" });
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = React.useState(window.innerWidth >= 768 && window.innerWidth < 1024);

    React.useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setIsTablet(w >= 768 && w < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // For Exit Animation (Receding)
    const { scrollYProgress: exitProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // For Entrance Animation (Emerging)
    const { scrollYProgress: entranceProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const exitScale = useTransform(exitProgress, [0.5, 1], [1, 0.7]);
    const exitOpacity = useTransform(exitProgress, [0.5, 1], [1, 0.4]);
    const exitY = useTransform(exitProgress, [0.5, 1], [0, -100]);

    const entranceScale = useTransform(entranceProgress, [0, 1], [0.6, 1]);
    const entranceOpacity = useTransform(entranceProgress, [0, 1], [0, 1]);
    const entranceY = useTransform(entranceProgress, [0, 1], [200, 0]);

    const mainText = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
    const subText = "The combination of my passion for design, code & interaction positions me in a unique place in the web design world.";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.215, 0.610, 0.355, 1.000]
            }
        },
    };

    // Combine transforms using entrance for start and exit for end
    const combinedScale = useTransform(
        [entranceProgress, exitProgress],
        ([ent, ext]) => ent < 1 ? entranceScale.get() : exitScale.get()
    );
    const combinedOpacity = useTransform(
        [entranceProgress, exitProgress],
        ([ent, ext]) => ent < 1 ? entranceOpacity.get() : exitOpacity.get()
    );
    const combinedY = useTransform(
        [entranceProgress, exitProgress],
        ([ent, ext]) => ent < 1 ? entranceY.get() : exitY.get()
    );

    return (
        <section
            ref={containerRef}
            style={{
                backgroundColor: '#a3ff00',
                minHeight: '80vh',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
            }}
        >
            <MouseGlow containerRef={containerRef} color="rgba(0,0,0,0.05)" />
            <motion.div style={{
                scale: combinedScale,
                opacity: combinedOpacity,
                y: combinedY,
                padding: isMobile ? '80px 5%' : '120px 10%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1.5fr 1fr' : '2fr 1fr',
                    gap: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
                    marginBottom: isMobile ? '4rem' : '8rem',
                    alignItems: 'start',
                    textAlign: isMobile ? 'center' : 'left'
                }}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                         style={{
                            fontSize: isMobile ? 'clamp(1.5rem, 8vw, 2.2rem)' : isTablet ? '2.2rem' : '3rem',
                            fontWeight: '600',
                            lineHeight: '1.2',
                            color: '#000',
                            letterSpacing: '-0.02em',
                            textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            width: '100%',
                            maxWidth: '100%'
                        }}
                    >
                        {mainText.split(" ").map((word, i) => (
                            <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>

                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start'
                    }}>
                        <motion.p
                            initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
                            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{
                                color: '#000',
                                fontSize: isMobile ? '1.05rem' : '1.25rem',
                                lineHeight: '1.6',
                                marginBottom: '3.5rem',
                                opacity: 0.9,
                                fontWeight: '500'
                            }}
                        >
                            {subText}
                        </motion.p>

                        <MagneticButton
                            whileHover={{ scale: 1.15, backgroundColor: '#ffffff', color: '#000000' }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{
                                width: isMobile ? '150px' : '180px',
                                height: isMobile ? '150px' : '180px',
                                backgroundColor: '#1a1a1a',
                                color: '#ffffff',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                fontWeight: '500',
                                position: 'relative',
                                border: 'none'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                Know More <ArrowUpRight size={isMobile ? 18 : 20} style={{ marginLeft: '4px' }} />
                            </div>
                        </MagneticButton>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '4rem' }}>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        style={{ fontSize: isMobile ? 'clamp(1.5rem, 8vw, 2rem)' : '2.5rem', color: '#000', fontWeight: '400', maxWidth: '100%' }}
                    >
                        Trusted by <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>people</span> worldwide
                    </motion.h3>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    gap: isMobile ? '2.5rem' : '0'
                }}>
                    <StatCounter value={105} suffix="+" label="Linkedin Connections" isMobile={isMobile} />
                    {!isMobile && <div style={{ width: '1px', height: '100px', backgroundColor: '#000', opacity: 0.1 }}></div>}
                    <StatCounter value={10} suffix="+" label="Github Stars" isMobile={isMobile} />
                    {!isMobile && <div style={{ width: '1px', height: '100px', backgroundColor: '#000', opacity: 0.1 }}></div>}
                    <StatCounter value={1} label="Years of experience" isMobile={isMobile} />
                </div>
            </motion.div>

            {/* Small Chat Icon in corner */}
            <div style={{ position: 'absolute', bottom: isMobile ? '15px' : '30px', right: isMobile ? '15px' : '30px' }}>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                        width: isMobile ? '40px' : '50px',
                        height: isMobile ? '40px' : '50px',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#a3ff00',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                >
                    <svg width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </motion.div>
            </div>
        </section>
    );
};

export default TrustSection;

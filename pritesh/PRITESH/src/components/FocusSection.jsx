import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Database, Monitor, Palette, Sparkles, Zap, Layers, Cpu } from 'lucide-react';

// --- Sub-component: TiltCard ---
// This provides a high-end 3D tilt effect on mouse hover.
const TiltCard = ({ children, style, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px"
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d", height: '100%' }}>
                {children}
            </div>
        </motion.div>
    );
};

// --- Sub-component: TechOrbit ---
// Enhanced with depth perception and 3D-like icon scaling.
const TechOrbit = ({ currentTech, techs, isMobile }) => {
    const orbitRadius = isMobile ? 85 : 130;
    const centerSize  = isMobile ? 65 : 100;
    const orbitIconSz = isMobile ? 18 : 26;
    const NUM = 8; 
    const activeTech = techs[currentTech];

    const orbitTechs = useMemo(() => {
        const filtered = techs.filter((_, i) => i !== currentTech);
        return Array.from({ length: NUM }).map((_, i) => filtered[i % filtered.length]);
    }, [currentTech, techs]);

    return (
        <div style={{
            position: 'relative',
            width: isMobile ? '250px' : '350px',
            height: isMobile ? '250px' : '350px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            {/* Inner Glowing Core */}
            <motion.div
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: centerSize * 2,
                    height: centerSize * 2,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${activeTech.color}44 0%, transparent 70%)`,
                    filter: 'blur(35px)',
                    zIndex: 0
                }}
            />

            {/* Orbiting Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    width: orbitRadius * 2,
                    height: orbitRadius * 2,
                    borderRadius: '50%',
                    border: `1px solid ${activeTech.color}22`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {orbitTechs.map((tech, i) => {
                    const angle = (i / NUM) * 2 * Math.PI;
                    const x = orbitRadius * Math.cos(angle);
                    const y = orbitRadius * Math.sin(angle);
                    
                    return (
                        <motion.div
                            key={i}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                width: orbitIconSz + 18,
                                height: orbitIconSz + 18,
                                marginLeft: -(orbitIconSz + 18) / 2 + x,
                                marginTop: -(orbitIconSz + 18) / 2 + y,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(255,255,255,0.02)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '50%',
                                border: `1px solid ${tech.color}33`,
                                color: tech.color,
                                boxShadow: `0 0 12px ${tech.color}15`
                            }}
                        >
                            {React.createElement(tech.icon, { size: orbitIconSz })}
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Central Main Tech Icon */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTech}
                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 1.5, rotate: 45, opacity: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 90 }}
                    style={{
                        zIndex: 10,
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(15px)',
                        padding: isMobile ? '1.5rem' : '2.2rem',
                        borderRadius: '28%',
                        border: `1.5px solid ${activeTech.color}55`,
                        boxShadow: `0 0 40px ${activeTech.color}25`,
                        color: activeTech.color
                    }}
                >
                    {React.createElement(activeTech.icon, { size: centerSize * 0.65 })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// --- Custom SVGs for Tech ---
const JSIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm16.525 13.83c-.35-.58-.81-1.07-1.37-1.46-.3-.21-.62-.39-.96-.53l.31-.7c.4-.9.6-1.87.6-2.87 0-1.74-.6-3.32-1.79-4.73C15.11 5.12 13.62 4.3 11.83 4.3c-1.83 0-3.35.83-4.54 2.51-1.16 1.64-1.74 3.51-1.74 5.61 0 2.11.58 3.99 1.74 5.63 1.18 1.67 2.7 2.51 4.54 2.51 1.54 0 2.86-.64 3.97-1.92l.81 1.34c.15.25.32.44.51.57.19.13.43.2.71.2h.74l-2.09-3.41zM11.83 18.23c-1.33 0-2.43-.63-3.29-1.89-.83-1.22-1.25-2.65-1.25-4.31 0-1.65.41-3.08 1.22-4.29.85-1.25 1.95-1.87 3.32-1.87s2.47.62 3.32 1.87c.81 1.21 1.22 2.64 1.22 4.29 0 1.66-.42 3.09-1.25 4.31-.86 1.26-1.96 1.89-3.29 1.89z" /></svg>);
const TSIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M1.035 0h21.93c.571 0 1.035.464 1.035 1.035v21.93c0 .571-.464 1.035-1.035 1.035h-21.93c-.571 0-1.035-.464-1.035-1.035v-21.93c0-.571.464-1.035 1.035-1.035zm19.863 18.995c.004-.766-.341-1.428-1.037-1.983-.695-.558-1.574-.919-2.636-1.082l-.963-.146c-.636-.098-1.125-.22-1.463-.365-.339-.147-.53-.406-.57-.775-.01-.309.117-.558.384-.741.268-.184.629-.276 1.084-.276.438 0 .822.102 1.15.309.329.206.568.529.718.966l3.374-1.164c-.201-.58-.553-1.054-1.055-1.42-.501-.366-1.112-.61-1.833-.733-.721-.122-1.516-.182-2.388-.182-.88 0-1.683.085-2.408.256-.726.17-1.326.439-1.801.808-.476.369-.824.819-1.041 1.349-.219.529-.328 1.127-.328 1.792 0 .762.179 1.396.539 1.902.359.505.86.911 1.5.117.64.305 1.416.531 2.329.679l1.157.182c.866.136 1.503.3 1.912.492.409.191.614.512.614.962 0 .393-.162.705-.487.935-.325.23-.787.345-1.388.345-.63 0-1.14-.14-1.53-.42-.39-.28-.682-.727-.872-1.341l-3.384 1.442c.311.9.827 1.6 1.549 2.097.722.5 1.62.75 2.695.75 1.042 0 1.97-.132 2.783-.396.814-.265 1.487-.643 2.022-1.135.534-.492.932-1.076 1.192-1.753.253-.746.38-1.481.38-2.205zm-15.378-5.321h-3.46v10.326h3.46v-10.326zm2.336-3.674h-8.086v3.297h2.32v7.029h3.46v-7.029h2.306v-3.297z" /></svg>);
const ReactIcon = ({ size }) => (<svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor"><circle cx="0" cy="0" r="2.05" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>);
const NodeIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 21.6L3.6 16.8V7.2L12 2.4l8.4 4.8v9.6L12 21.6zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" /></svg>);
const PythonIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M11.997 0C9.648 0 7.3.012 5.025.044c-1.312.02-2.383 1.057-2.463 2.368-.118 1.907-.118 3.824 0 5.731.063 1.042.846 1.886 1.884 2.05.748.118 1.503.118 2.251.118v1.127H4.379c-1.295 0-2.348 1.053-2.348 2.348v3.425c0 1.295 1.053 2.348 2.348 2.348h3.425V21.19c0 .762.617 1.379 1.379 1.379h2.348c.762 0 1.379-.617 1.379-1.379v-2.348h3.354c1.295 0 2.342-1.047 2.342-2.342v-3.41c0-1.295-1.047-2.342-2.342-2.342h-2.316v-1.112h2.251c1.037-.164 1.821-1.008 1.884-2.05.118-1.907.118-3.824 0-5.731-.08-1.312-1.15-2.348-2.463-2.368C16.697.012 14.347 0 11.997 0zm-2.348 2.348c.648 0 1.174.526 1.174 1.174s-.526 1.174-1.174 1.174-1.174-.526-1.174-1.174.526-1.174 1.174-1.174zm4.696 16.924c.648 0 1.174.526 1.174 1.174s-.526 1.174-1.174 1.174-1.174-.526-1.174-1.174.526-1.174 1.174-1.174z" /></svg>);

// --- Main Component: FocusSection ---
const FocusSection = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [currentTech, setCurrentTech] = useState(0);

    const techs = [
        { icon: JSIcon, color: '#F7DF1E', name: 'JavaScript' },
        { icon: TSIcon, color: '#3178C6', name: 'TypeScript' },
        { icon: ReactIcon, color: '#61DAFB', name: 'React' },
        { icon: NodeIcon, color: '#339933', name: 'Node.js' },
        { icon: PythonIcon, color: '#3776AB', name: 'Python' },
    ];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        const timer = setInterval(() => {
            setCurrentTech((prev) => (prev + 1) % techs.length);
        }, 3800);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(timer);
        };
    }, [techs.length]);

    const { scrollYProgress: entranceProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const scale = useTransform(entranceProgress, [0, 1], [0.85, 1]);
    const opacity = useTransform(entranceProgress, [0, 0.3], [0, 1]);

    const activeTech = techs[currentTech];

    return (
        <section
            ref={sectionRef}
            id="focus"
            style={{
                backgroundColor: 'transparent',
                marginBottom: isMobile ? '80px' : '150px',
                padding: isMobile ? '70px 5%' : '120px 10%',
                minHeight: '120vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                zIndex: 2,
                overflow: 'hidden'
            }}
        >
            {/* Dynamic Atmosphere Background */}
            <motion.div 
                animate={{ 
                    backgroundColor: `${activeTech.color}03`, 
                }}
                transition={{ duration: 1.8 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1
                }}
            />
            
            <motion.div 
                animate={{ 
                    background: `radial-gradient(circle at 50% 50%, ${activeTech.color}12 0%, transparent 65%)`,
                }}
                transition={{ duration: 1.8 }}
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '10%',
                    width: '65%',
                    height: '65%',
                    filter: 'blur(110px)',
                    zIndex: -1
                }}
            />

            <motion.div
                style={{
                    scale,
                    opacity,
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '3.5rem' : '7.5rem' }}>
                    <motion.span 
                        animate={{ color: activeTech.color, opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ fontSize: '0.8rem', fontWeight: '900', letterSpacing: '5px', textTransform: 'uppercase' }}
                    >
                        Focus & Expertise
                    </motion.span>
                    <h2 style={{ fontSize: isMobile ? '3.2rem' : '6.5rem', fontWeight: '800', color: '#fff', lineHeight: '1', marginTop: '1.2rem', letterSpacing: '-0.03em' }}>
                        Refining the <br /> 
                        <span style={{ color: activeTech.color, fontStyle: 'italic', fontFamily: 'serif', transition: 'color 1.8s' }}>Craft</span>
                    </h2>
                </div>

                {/* --- Bento Grid --- */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gridTemplateRows: isMobile ? 'auto' : 'repeat(2, 380px)',
                    gap: isMobile ? '2rem' : '3.5rem',
                }}>
                    {/* Card 1: Main Tech Universe (2x2) */}
                    <TiltCard style={{
                        gridColumn: isMobile ? 'span 1' : 'span 2',
                        gridRow: isMobile ? 'span 1' : 'span 2',
                    }}>
                        <div style={{
                            height: '100%',
                            background: 'rgba(255,255,255,0.015)',
                            backdropFilter: 'blur(35px)',
                            borderRadius: '45px',
                            border: '1px solid rgba(255,255,255,0.06)',
                            padding: isMobile ? '2rem' : '3.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: isMobile ? '300px' : '380px' }}>
                                <TechOrbit currentTech={currentTech} techs={techs} isMobile={isMobile} />
                            </div>
                            
                            <div style={{ position: 'relative', zIndex: 10 }}>
                                <motion.h3 
                                    key={activeTech.name}
                                    initial={{ y: 25, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    style={{ fontSize: isMobile ? '2rem' : '2.8rem', fontWeight: '800', color: '#fff' }}
                                >
                                    {activeTech.name} <span style={{ color: activeTech.color }}>Mastery</span>
                                </motion.h3>
                                <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '450px', lineHeight: '1.7', marginTop: '0.8rem', fontSize: '1.05rem' }}>
                                    Architecting high-performance digital experiences through rigorous performance optimization and scalable methodologies.
                                </p>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Card 2: Performance (1x1) */}
                    <TiltCard>
                        <div style={{
                            height: '100%',
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(25px)',
                            borderRadius: '42px',
                            border: '1px solid rgba(255,255,255,0.07)',
                            padding: '2.8rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)'
                        }}>
                            <div style={{ 
                                width: '65px', height: '65px', borderRadius: '18px', 
                                background: `linear-gradient(135deg, ${activeTech.color}, #ffffff55)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
                                marginBottom: '1.8rem', boxShadow: `0 10px 30px ${activeTech.color}33`,
                                transition: 'background 1.8s, box-shadow 1.8s'
                            }}>
                                <Zap size={30} />
                            </div>
                            <h4 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '0.6rem', color: '#fff' }}>Power <span style={{ fontStyle: 'italic', fontFamily: 'serif', color: activeTech.color, transition: 'color 1.8s' }}>Play</span></h4>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: '1.7' }}> 
                                Specialized in reduction of latency and maximizing computational throughput. 
                            </p>
                        </div>
                    </TiltCard>

                    {/* Card 3: Architecture (1x1) */}
                    <TiltCard>
                        <div style={{
                            height: '100%',
                            background: 'rgba(255,255,255,0.025)',
                            backdropFilter: 'blur(25px)',
                            borderRadius: '42px',
                            border: '1px solid rgba(255,255,255,0.07)',
                            padding: '2.8rem',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)'
                        }}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ marginBottom: '1.2rem', color: activeTech.color, transition: 'color 1.8s' }}>
                                    <Layers size={45} />
                                </div>
                                <h4 style={{ fontSize: '1.7rem', fontWeight: '800', marginBottom: '0.6rem', color: '#fff' }}>
                                    Stable <br /> 
                                    <span style={{ color: activeTech.color, transition: 'color 1.8s' }}>Foundations</span>
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: '1.6' }}> 
                                    Implementing clean architectures that survive the test of scale and time. 
                                </p>
                            </div>
                            <div style={{ position: 'absolute', bottom: -30, right: -30, opacity: 0.08, transform: 'rotate(-15deg)' }}>
                                <Cpu size={180} color={activeTech.color} style={{ transition: 'color 1.8s' }} />
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </motion.div>
        </section>
    );
};

export default FocusSection;

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, School, Calendar, BookOpen } from 'lucide-react';

const EducationCard = ({ title, institution, period, description, index, isMobile }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={{ y: -10 }}
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(15px)',
                borderRadius: '30px',
                padding: isMobile ? '2rem' : '3rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                height: '100%'
            }}
        >
            {/* Background Icon Watermark */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                opacity: 0.03,
                color: 'var(--accent-color)',
                zIndex: 0
            }}>
                {index === 0 ? <School size={200} /> : <GraduationCap size={200} />}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '15px',
                        background: 'var(--accent-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        boxShadow: '0 0 20px rgba(163, 255, 0, 0.2)'
                    }}>
                        {index === 0 ? <School size={24} /> : <GraduationCap size={24} />}
                    </div>
                    <div style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: 'var(--accent-color)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {period}
                    </div>
                </div>

                <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: '700',
                    color: '#fff',
                    marginBottom: '0.5rem',
                    lineHeight: '1.2'
                }}>
                    {title}
                </h3>
                
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    marginBottom: '1.5rem'
                }}>
                    <BookOpen size={18} color="var(--accent-color)" />
                    <span>{institution}</span>
                </div>

                <p style={{
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: '1.6',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                    {description}
                </p>
            </div>

            {/* Accent Line At Bottom */}
            <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: '40%' } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                    height: '2px',
                    background: 'var(--accent-color)',
                    position: 'absolute',
                    bottom: '0',
                    left: '3rem'
                }}
            />
        </motion.div>
    );
};

const EducationSection = () => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress: entranceProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const { scrollYProgress: exitProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(entranceProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(entranceProgress, [0, 0.5], [0, 1]);
    const y = useTransform(entranceProgress, [0, 1], [100, 0]);

    const educationData = [
        {
            title: "Higher Secondary (Science)",
            institution: "MUKTAJIVAN HIGH SCHOOL",
            period: "2025",
            description: "Completed higher secondary education with a focus on Science subjects, laying a strong foundation for technical studies."
        },
        {
            title: "B.E. in Computer Science & Engineering",
            institution: "Swaminarayan Institute of Technology",
            period: "2025 — 2029",
            description: "Currently pursuing a Bachelor of Engineering in Computer Science, focusing on advanced algorithms, software development, and modern tech stacks."
        }
    ];

    return (
        <section
            ref={containerRef}
            id="education"
            style={{
                backgroundColor: 'transparent',
                padding: isMobile ? '80px 5%' : '120px 10%',
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                zIndex: 2,
                overflow: 'hidden'
            }}
        >
            <motion.div style={{ scale, opacity, y }}>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '6rem' }}>
                    <h2 style={{
                        fontSize: isMobile ? 'clamp(2.5rem, 8vw, 3.5rem)' : '5rem',
                        fontWeight: '600',
                        color: '#fff',
                        lineHeight: '1.1'
                    }}>
                        Academic <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', fontFamily: 'serif' }}>Journey</span>
                    </h2>
                    <p style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        marginTop: '1.5rem',
                        maxWidth: '600px',
                        margin: '1.5rem auto 0'
                    }}>
                        Tracing my educational background and technical foundations.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '2rem' : '3rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {educationData.map((edu, index) => (
                        <EducationCard
                            key={index}
                            {...edu}
                            index={index}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Decorative Grid or Background Elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(163, 255, 0, 0.02) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: -1
            }} />
        </section>
    );
};

export default EducationSection;

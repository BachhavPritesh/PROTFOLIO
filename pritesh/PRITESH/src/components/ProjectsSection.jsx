import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Youtube, Play } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import MouseGlow from './ui/MouseGlow';

const projects = [
    {
        id: 1,
        title: "SPACEX",
        description: "A high-performance SpaceX landing page clone featuring launch schedules, mission tracking, and detailed vehicle information.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770459266/Screenshot_2026-02-07_154337_s1hpop.png",
        color: "#ffffff",
        label: "SpaceX",
        live: "https://pritesh-projects.netlify.app/projects/spacex/spacex",
        github: "https://github.com/BachhavPritesh/HtmlAssignment/tree/main/Projects/SpaceX",
        youtube: "https://youtu.be/nnG6_GrB1Ts?si=_S80zuaUuD8RR60R"
    },
    {
        id: 2,
        title: "DUER",
        description: "A sleek, responsive fashion e-commerce interface focusing on modern performance apparel and high-quality textiles.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770459654/Screenshot_2026-02-07_155031_kk1edo.png",
        color: "#a3ff00",
        label: "DUER",
        live: "https://pritesh-projects.netlify.app/projects/duer/duer",
        github: "https://github.com/BachhavPritesh/HtmlAssignment/tree/main/Projects/DUER",
        youtube: "https://youtu.be/V9_EYVGe5Gk?si=iMqbr4UAS0DttXN9"
    },
    {
        id: 3,
        title: "DREAM",
        description: "An immersive landing page design exploring surrealist aesthetics and high-end digital art concepts.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770459999/Screenshot_2026-02-07_155615_wjc2no.png",
        color: "#00f2ff",
        label: "DREAM",
        live: "https://pritesh-projects.netlify.app/projects/dream/dream",
        github: "https://github.com/BachhavPritesh/HtmlAssignment/tree/main/Projects/DREAM",
        youtube: "https://youtu.be/4pecoN3zqig?si=ggrBqXA1w3f7WH3g"
    },
    {
        id: 4,
        title: "PRIME",
        description: "A high-performance landing page for Prime Video, featuring dynamic content carousels and a premium cinematic UI.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770460324/Screenshot_2026-02-07_160137_g3goqt.png",
        color: "#bf00ff",
        label: "PRIME",
        live: "https://pritesh-projects.netlify.app/projects/prime/prime",
        github: "https://github.com/BachhavPritesh/HtmlAssignment/tree/main/Projects/PRIME",
        youtube: "https://youtu.be/o3hQxbBX7qE?si=HRYwdMM7xwf7dpI-"
    },
    {
        id: 5,
        title: "GHOST",
        description: "A professional and minimal landing page clone for the Ghost CMS, emphasizing clean typography and efficient content delivery.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770460796/Screenshot_2026-02-07_160912_pnxbix.png",
        color: "#ffffff",
        label: "GHOST",
        live: "https://pritesh-projects.netlify.app/projects/ghost/ghost",
        github: "https://github.com/BachhavPritesh/HtmlAssignment/tree/main/Projects/GHOST",
        youtube: "https://youtu.be/bnTA7oqRZLc?si=0Mc1xyjdJPD4q4C-"
    },
    {
        id: 6,
        title: "CANVA",
        description: "A feature-rich clone of the Canva landing page, showcasing modern design principles and intuitive user interfaces.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770460534/Screenshot_2026-02-07_160508_vmtl9j.png",
        color: "#00c4cc",
        label: "CANVA",
        live: "https://pritesh-projects.netlify.app/projects/canva/canva",
        github: "https://github.com/BachhavPritesh/HtmlAssignment/tree/main/Projects/Canva",
        youtube: "https://youtu.be/fLP39oQQVB0?si=Y2CysRkEUE22rNU7"
    },
    {
        id: 7,
        title: "SPINO AI",
        description: "An advanced AI-powered platform designed for intelligent automation and data-driven insights.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770461178/Screenshot_2026-02-07_161557_yub9uz.png",
        color: "#ff8c00",
        label: "SPINO AI",
        live: "https://pritesh-projects.netlify.app/projects/spino-ai/spino",
        github: "https://github.com/BachhavPritesh/HtmlAssignment/tree/main/Projects/SPINO-AI"
    },
    {
        id: 8,
        title: "QUICK NEWS",
        description: "A fast and responsive news aggregator providing real-time updates on global events and trending topics.",
        image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1770459562/Screenshot_2026-02-07_154836_dp1mnv.png",
        color: "#e11d48",
        label: "QUICK NEWS",
        live: "https://pritesh-projects.netlify.app/projects/news/news"
    }
];

const ProjectCard = ({ project, index, isMobile }) => {
    return (
        <motion.div
            initial="initial"
            whileInView="inView"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
                initial: { opacity: 0, y: 50 },
                inView: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: index * 0.1 }
                },
                hover: { y: -10, transition: { duration: 0.3 } }
            }}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: isMobile ? '4/3' : '16/9',
                backgroundColor: '#111',
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                overflow: 'hidden',
                cursor: 'pointer'
            }}
        >
            <motion.img
                src={project.image}
                alt={project.title}
                variants={{
                    initial: { scale: 1, opacity: 0.6 },
                    inView: { scale: 1, opacity: 0.6 },
                    hover: { scale: 1.1, opacity: 0.3 }
                }}
                transition={{ duration: 0.6 }}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />

            <motion.div
                variants={{
                    initial: { background: 'rgba(0,0,0,0)' },
                    inView: { background: 'rgba(0,0,0,0)' },
                    hover: { background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%)' }
                }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    padding: isMobile ? '1.5rem' : '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    zIndex: 2
                }}
            >
                {/* Reveal Section: Only visible on hover */}
                <motion.div
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        inView: { opacity: 0, y: 20 },
                        hover: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <h3 style={{
                        fontSize: isMobile ? '1.5rem' : '2.2rem',
                        fontWeight: '700',
                        color: '#fff',
                        marginBottom: '0.8rem'
                    }}>
                        {project.title}
                    </h3>
                    <p style={{
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        color: 'rgba(255,255,255,0.7)',
                        maxWidth: '450px',
                        lineHeight: '1.5',
                        marginBottom: '2rem'
                    }}>
                        {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {[
                            { name: 'Live', icon: <ExternalLink size={18} />, color: project.color, link: project.live },
                            { name: 'Github', icon: <Github size={18} />, color: '#fff', link: project.github },
                            { name: 'Youtube', icon: <Youtube size={18} />, color: '#ff0000', link: project.youtube }
                        ].filter(btn => btn.link).map((btn) => (
                            <motion.button
                                key={btn.name}
                                whileHover={{ scale: 1.05, backgroundColor: btn.color, color: '#000' }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 18px',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    border: `1px solid ${btn.color}44`,
                                    borderRadius: '4px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    backdropFilter: 'blur(10px)'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(btn.link, '_blank');
                                }}
                            >
                                {btn.icon}
                                <span>{btn.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Permanent Label Section: Bottom-left */}
                <motion.div
                    style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}
                    variants={{
                        initial: { opacity: 0 },
                        inView: { opacity: 1 }
                    }}
                >
                    <div style={{
                        backgroundColor: project.color,
                        padding: '6px 16px',
                        color: '#000',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: `0 0 20px ${project.color}55`
                    }}>
                        {project.label}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setIsTablet(w >= 768 && w < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress: entranceProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const entranceScale = useTransform(entranceProgress, [0, 1], [0.85, 1]);
    const entranceOpacity = useTransform(entranceProgress, [0, 1], [0, 1]);
    const entranceY = useTransform(entranceProgress, [0, 1], [150, 0]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{
                position: 'relative',
                padding: isMobile ? '80px 5%' : '140px 10%',
                background: '#0a0a0a',
                overflow: 'hidden',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            {/* Background Text */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '-5%',
                    fontSize: isMobile ? 'clamp(5rem, 20vw, 8rem)' : '18rem',
                    fontWeight: '900',
                    color: 'rgba(255,255,255,0.02)',
                    zIndex: 0,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                }}
            >
                WORK
            </motion.div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: isMobile ? '3rem' : '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p style={{
                            color: 'var(--accent-color)',
                            fontSize: isMobile ? '12px' : '14px',
                            fontWeight: '700',
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            marginBottom: '1rem'
                        }}>
                            Selected Works
                        </p>
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
                            Projects
                        </motion.h2>
                    </motion.div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr',
                    gap: isMobile ? '2.5rem' : '3rem',
                    width: '100%',
                    marginBottom: '4rem'
                }}>
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} isMobile={isMobile} />
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <MagneticButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: isMobile ? '14px 30px' : '16px 40px',
                            background: 'transparent',
                            color: '#a3ff00',
                            border: '1px solid #a3ff00',
                            fontSize: isMobile ? '0.85rem' : '1rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 20px rgba(163, 255, 0, 0.1)'
                        }}
                        onClick={() => window.open('https://github.com/BachhavPritesh?tab=repositories', '_blank')}
                    >
                        Check out all
                        <ExternalLink size={isMobile ? 18 : 20} />
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;

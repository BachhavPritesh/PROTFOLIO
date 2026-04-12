import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Code2, Globe, BrainCircuit, Database } from 'lucide-react';

const TiltCard = ({ children, style, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d", height: '100%' }}>
                {children}
            </div>
        </motion.div>
    );
};

const skillCategories = [
  {
    title: "Language & Logic",
    description: "Core Programming",
    icon: Code2,
    color: "#a3ff00",
    skills: [
      { name: "JavaScript / TypeScript", level: 92 },
      { name: "Python", level: 88 },
      { name: "C / C++", level: 85 },
      { name: "Java", level: 75 }
    ]
  },
  {
    title: "Frontend Engineering",
    description: "UI / UX & Architecture",
    icon: Globe,
    color: "#61DAFB",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
      { name: "Next.js", level: 78 }
    ]
  },
  {
    title: "Backend & Systems",
    description: "Server & Databases",
    icon: Database,
    color: "#339933",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "REST APIs Architecture", level: 90 },
      { name: "SQL", level: 75 }
    ]
  },
  {
    title: "AI & Intelligence",
    description: "Machine Learning & Data",
    icon: BrainCircuit,
    color: "#ff00ff",
    skills: [
      { name: "Computer Vision", level: 87 },
      { name: "Pandas & NumPy", level: 88 },
      { name: "Scikit-learn", level: 80 },
      { name: "Deep Learning / YOLO", level: 75 }
    ]
  }
];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      style={{
        padding: isMobile ? '80px 5%' : '120px 10%',
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <motion.div style={{ opacity, y }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
            fontWeight: '600', 
            color: '#fff', 
            marginBottom: '1rem' 
          }}>
            Technical <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', fontFamily: 'serif' }}>Expertise</span>
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'var(--accent-color)',
            margin: '0 auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px var(--accent-color)'
          }} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
          gap: isMobile ? '2.5rem' : '4rem' 
        }}>
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <TiltCard
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '35px',
                  border: `1px solid ${category.color}33`,
                  padding: isMobile ? '2rem' : '3.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 15px 35px -10px ${category.color}22`
                }}
              >
                {/* Ambient glow */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  background: category.color,
                  filter: 'blur(80px)',
                  opacity: 0.15,
                  zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
                    <div style={{ 
                      width: '55px', 
                      height: '55px', 
                      borderRadius: '16px', 
                      background: `linear-gradient(135deg, ${category.color}44, transparent)`,
                      border: `1px solid ${category.color}88`,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: category.color,
                      boxShadow: `0 0 20px ${category.color}44`
                    }}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', letterSpacing: '0.02em', marginBottom: '4px' }}>
                        {category.title}
                      </h3>
                      <p style={{ color: category.color, fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.95rem' }}>{skill.name}</span>
                          <span style={{ color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>{skill.level}%</span>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '6px', 
                          background: 'rgba(255,255,255,0.05)', 
                          borderRadius: '10px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2 + (sIdx * 0.1), ease: "easeOut" }}
                            style={{ 
                              height: '100%', 
                              background: category.color,
                              boxShadow: `0 0 10px ${category.color}`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;

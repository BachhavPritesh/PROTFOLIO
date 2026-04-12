import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, User, Target, Rocket, Compass } from 'lucide-react';

const AboutMeSection = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
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

  const details = [
    { icon: <User size={20} />, label: "Name", value: "Bachhav Pritesh Vikram" },
    { icon: <Calendar size={20} />, label: "Born", value: "January 24, 2006 (Age 19)" },
    { icon: <MapPin size={20} />, label: "From", value: "Nashik, Maharashtra" },
    { icon: <Compass size={20} />, label: "Currently", value: "Ahmedabad, Gujarat" }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: isMobile ? '80px 5%' : '100px 10%',
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <motion.div style={{ opacity, y }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '1rem'
          }}>
            About <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', fontFamily: 'serif' }}>Me</span>
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
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
          gap: isMobile ? '2.5rem' : '4rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Personal Data Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              background: 'var(--accent-color)',
              filter: 'blur(100px)',
              opacity: 0.2,
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '2rem' }}>
                Identity Profile
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {details.map((detail, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(163, 255, 0, 0.1)',
                      color: 'var(--accent-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {detail.icon}
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {detail.label}
                      </p>
                      <p style={{ color: '#fff', fontSize: '1.05rem', fontWeight: '500' }}>
                        {detail.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <Rocket color="var(--accent-color)" size={28} />
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>The Journey</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                My journey into technology began in Nashik, Maharashtra, fueled by a relentless curiosity about how digital systems are architected and scaled. At just 19 years old, I have immersed myself deeply into the world of full-stack engineering, rapidly transitioning from foundational learning to executing complex, production-grade architectures.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                Currently based in Ahmedabad, Gujarat, I view code not just as syntax, but as a dynamic tool for problem-solving. Every hackathon I participate in and every application I deploy is a stepping stone to refining my craft as a developer who prioritizes high-performance logic and seamless user experience.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <Target color="var(--accent-color)" size={28} />
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>My Goals</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                My primary objective is to continually push the boundaries of modern development. I strive to build scalable software solutions that not only fulfill immediate technical requirements but also provide stunning, out-of-the-box user experiences. I want to establish myself among the best in the industry, engineering technologies that are efficient, secure, and visually breathtaking. 
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default AboutMeSection;

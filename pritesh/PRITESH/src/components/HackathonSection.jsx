import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Trophy, Code2 } from 'lucide-react';

const hackathons = [
  {
    title: "AI-Adaptive Onboarding Engine",
    event: "Innovation Hackathon",
    description: "AI-powered engine that personalizes onboarding by analyzing resumes, detecting skill gaps, and generating adaptive learning paths.",
    image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1774101720/Screenshot_2026-03-21_171921_cmlp8y.png",
    github: "https://github.com/BachhavPritesh/ai-adaptive-onboarding/tree/main",
    techStack: ["React.js", "Node.js", "MongoDB", "OpenAI GPT", "spaCy"]
  },
  {
    title: "FleetFlow System",
    event: "Odoo x Gujarat Vidyapith Hackathon '26",
    description: "Modular Fleet & Logistics Management System developed to optimize operations during a fast-paced 24-hour sprint.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/BachhavPritesh/Odoo-x-Gujarat-Vidyapith-Hackathon-26",
    techStack: ["React", "Express.js", "Node.js", "REST APIs", "Analytics"]
  },
  {
    title: "Smart Retail Shelf",
    event: "DAIICT Hackathon",
    description: "An innovative smart retail shelf solution featuring real-time inventory tracking and analytics.",
    image: "https://res.cloudinary.com/dzmso2ukz/image/upload/v1776004069/generated-image_1_gkplhd.png",
    github: "https://github.com/raunak2015/smart-retail-shelf_DAIICT.git",
    techStack: ["Computer Vision", "IoT", "React", "Python", "Analytics"]
  }
];

const HackathonCard = ({ project, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      // For mobile devices, tapping registers as hover 
      onClick={() => setIsHovered(!isHovered)}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        position: 'relative',
        height: '420px',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 15px 35px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'brightness(0.2) blur(4px)' : 'brightness(0.7) blur(0px)'
        }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '2rem 1.5rem',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        zIndex: 1,
        transition: 'opacity 0.3s ease',
        opacity: isHovered ? 0 : 1
      }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', lineHeight: 1.2 }}>{project.title}</h3>
        <p style={{ 
          color: 'var(--accent-color)', 
          fontSize: '0.9rem', 
          fontWeight: '600', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          marginTop: '8px',
          letterSpacing: '0.05em'
        }}>
          <Trophy size={16} /> {project.event}
        </p>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '2rem 1.5rem',
              background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, transparent 100%)',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: '100%',
              overflowY: 'auto'
            }}
          >
            <h3 style={{ fontSize: isMobile ? '1.2rem' : '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
                {project.title}
            </h3>
            
            <p style={{ color: '#ccc', fontSize: isMobile ? '0.85rem' : '0.95rem', lineHeight: '1.5', marginBottom: '1rem' }}>
              {project.description}
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#fff', fontSize: '0.85rem', fontWeight: '700' }}>
                <Code2 size={16} color="var(--accent-color)" /> Technologies Used
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.techStack.map((tech, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(163, 255, 0, 0.1)',
                    border: '1px solid rgba(163, 255, 0, 0.3)',
                    color: 'var(--accent-color)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(5px)'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#fff',
                color: '#000',
                padding: isMobile ? '10px 16px' : '12px 20px',
                borderRadius: '10px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                alignSelf: 'flex-start'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.background = 'var(--accent-color)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(163, 255, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)';
              }}
            >
              <Github size={20} /> View GitHub Repo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HackathonSection = () => {
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

  return (
    <section
      ref={sectionRef}
      id="hackathons"
      style={{
        padding: isMobile ? '80px 5%' : '100px 10%',
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
            Hackathon <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', fontFamily: 'serif' }}>Projects</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Showcasing innovative solutions developed under pressure, demonstrating rapid prototyping, teamwork, and problem-solving skills.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '1.5rem' : '2.5rem'
        }}>
          {hackathons.map((project, idx) => (
            <HackathonCard key={idx} project={project} isMobile={isMobile} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HackathonSection;

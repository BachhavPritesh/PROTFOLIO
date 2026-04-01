import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Globe, BrainCircuit, Terminal } from 'lucide-react';

const skillCategories = [
  {
    title: "CORE LANGUAGES",
    description: "Programming",
    icon: Code2,
    skills: ["Python", "C", "JavaScript", "C++"]
  },
  {
    title: "FRONTEND & BACKEND",
    description: "Web Dev",
    icon: Globe,
    skills: ["HTML", "CSS", "React", "Node.js", "Tailwind CSS"]
  },
  {
    title: "DATA & INTELLIGENCE",
    description: "AI / ML / DS",
    icon: BrainCircuit,
    skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"]
  },
  {
    title: "DEV ENVIRONMENT",
    description: "Tools",
    icon: Terminal,
    skills: ["Git", "GitHub", "VS Code", "Vite", "Figma"]
  }
];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  
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
        padding: '100px 10%',
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
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            A structured breakdown of my core technical competencies and tools.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(15px)',
                borderRadius: '30px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: '-20px', 
                right: '-20px', 
                opacity: 0.05,
                color: 'var(--accent-color)'
              }}>
                <category.icon size={150} />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '12px', 
                    background: 'var(--accent-color)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#000' 
                  }}>
                    <category.icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', tracking: '0.05em' }}>
                    {category.title}
                  </h3>
                </div>

                <p style={{ 
                  color: 'var(--accent-color)', 
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem', 
                  letterSpacing: '0.15em',
                  opacity: 0.8
                }}>
                  {category.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {category.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: 'rgba(163, 255, 0, 0.15)',
                        borderColor: 'var(--accent-color)'
                      }}
                      style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: '#fff',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;

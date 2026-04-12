import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Award, Maximize2, X } from 'lucide-react';

const certifications = [
  {
    id: 1,
    title: "HackRust 1.0 - DCRUST",
    subtitle: "Certificate of Participation",
    description: "Awarded for participating in HackRust 1.0, a major hackathon organized by DCRUST, Murthal on the Unstop platform, representing team 'Code Catalyst'.",
    image: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/cbb7cc3d-b28d-4b60-82bd-b91cf0deabaf.jpg"
  },
  {
    id: 2,
    title: "Odoo x Gujarat Vidyapith Hackathon '26",
    subtitle: "Certificate of Participation",
    description: "Awarded for actively participating in a 24-hour hackathon and contributing to the development of the FleetFlow Modular Fleet & Logistics Management System.",
    image: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/a22bfc93-4970-4609-ae21-681949f5abbb.jpg"
  },
  {
    id: 3,
    title: "Protex: Hack-2-Win Hackathon",
    subtitle: "Certificate of Participation",
    description: "Awarded for commendable participation and continued efforts in Protex: Hack-2-Win Hackathon, organised by Protege, IGDTUW.",
    image: "https://res.cloudinary.com/dzmso2ukz/image/upload/q_auto/f_auto/v1776003203/protege_tiqr5h.jpg", 
    link: "https://certificate.givemycertificate.com/c/c254ca47-c825-4408-8e64-039ebef12041"
  }
];

const CertCard = ({ cert, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onOpen(cert)}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        position: 'relative',
        height: '350px',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 15px 35px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <motion.img
        src={cert.image}
        alt={cert.title}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'brightness(0.3) blur(3px)' : 'brightness(0.9) blur(0px)'
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

      {/* Persistent subtle overlay at bottom for readability if needed */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        zIndex: 1,
        opacity: isHovered ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }} />

      {/* Hover Information Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '2rem 1.5rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 60%, transparent 100%)',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: '100%'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(163, 255, 0, 0.15)',
              color: 'var(--accent-color)',
              marginBottom: '1rem'
            }}>
              <Award size={20} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', lineHeight: 1.2, marginBottom: '6px' }}>
              {cert.title}
            </h3>
            
            <p style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              {cert.subtitle}
            </p>

            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {cert.description}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-color)',
              fontSize: '0.9rem',
              fontWeight: '700'
            }}>
              <Maximize2 size={16} /> Click to view full image
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Fullscreen Modal component
const ImageModal = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          style={{
            position: 'absolute',
            top: '2rem', right: '2rem',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            width: '45px', height: '45px',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10000,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-color)'; e.currentTarget.style.color = '#000'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
        >
          <X size={24} />
        </button>

        <motion.img
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          src={cert.image}
          alt={cert.title}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          style={{
            maxHeight: '90vh',
            maxWidth: '90vw',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            border: '2px solid rgba(255,255,255,0.1)'
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.6)',
            padding: '10px 20px',
            borderRadius: '30px',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <p style={{ color: '#fff', fontSize: '1rem', fontWeight: '600' }}>{cert.title}</p>
          <p style={{ color: 'var(--accent-color)', fontSize: '0.8rem', letterSpacing: '1px' }}>{cert.subtitle}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CertificationsSection = () => {
  const sectionRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCert]);

  return (
    <>
      <section
        ref={sectionRef}
        id="certifications"
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
              Licenses & <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', fontFamily: 'serif' }}>Certifications</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
              A collection of credentials demonstrating continuous learning, hackathon participation, and technical proficiency.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {certifications.map(cert => (
              <CertCard key={cert.id} cert={cert} onOpen={setSelectedCert} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {selectedCert && (
        <ImageModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </>
  );
};

export default CertificationsSection;

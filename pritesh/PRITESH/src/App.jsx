import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import FocusSection from './components/FocusSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 4 seconds for a nice animation reveal

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <div className="grid-background"></div>
      <div className="glow-overlay"></div>

      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <>
            <Navbar />
            <main>
              <Hero />
              <TrustSection />
              <FocusSection />
              <ProjectsSection />
              <ContactSection />
            </main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

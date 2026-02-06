import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CyberpunkLoader from './components/CyberpunkLoader';
import ProgressIndicator from './components/ProgressIndicator';
import ParticleBackground from './components/ParticleBackground';
import ScanlineOverlay from './components/ScanlineOverlay';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <CyberpunkLoader key="loader" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CustomCursor />
          <ScanlineOverlay />
          <ParticleBackground />
          <ProgressIndicator />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Services />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;

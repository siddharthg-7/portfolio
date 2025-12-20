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
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="loader"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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

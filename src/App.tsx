import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurtainLoader } from './components/loaders/CurtainLoader';
import { GlassNavbar } from './components/navigation/GlassNavbar';
import { ScrollTimelineIndicator } from './components/navigation/ScrollTimelineIndicator';
import CursorRevealHero from './components/sections/CursorRevealHero';
import { AboutSection } from './components/sections/AboutSection';
import { WhatIDoSection } from './components/sections/WhatIDoSection';
import { WorksSection } from './components/sections/WorksSection';
import { StandOutSection } from './components/sections/StandOutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { useMousePosition } from './hooks';
import { smoothScroll } from './utils';
import { NoiseOverlay } from './components/effects/NoiseOverlay';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mousePosition = useMousePosition();
  
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionTitles = ['Hero', 'About', 'What I Do', 'Works', 'Stand Out', 'Contact'];

  const scrollToSection = (index: number) => {
    const targetSection = sectionRefs.current[index];
    if (targetSection) {
      const offsetTop = targetSection.offsetTop;
      smoothScroll(offsetTop - 80); // Account for navbar height
    }
  };

  const handleExplorePressed = () => {
    scrollToSection(3); // Go to Works section
  };

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="App relative min-h-screen bg-dark-100 text-dark-900 overflow-x-hidden">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <CurtainLoader
            onComplete={() => setIsLoading(false)}
            duration={1000}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="relative z-10 isolate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation */}
            <GlassNavbar onNavigationTap={scrollToSection} />
            
            {/* Scroll Timeline Indicator */}
            <ScrollTimelineIndicator
              sectionTitles={sectionTitles}
              onSectionTap={scrollToSection}
            />

            {/* Sections */}
            <main>
              <div ref={setSectionRef(0)}>
                <CursorRevealHero onExplorePressed={handleExplorePressed} />
              </div>
              <div ref={setSectionRef(1)}>
                <AboutSection />
              </div>
              <div ref={setSectionRef(2)}>
                <WhatIDoSection />
              </div>
              <div ref={setSectionRef(3)}>
                <WorksSection />
              </div>
              <div ref={setSectionRef(4)}>
                <StandOutSection />
              </div>
              <div ref={setSectionRef(5)}>
                <ContactSection />
              </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Noise Overlay */}
            <NoiseOverlay />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor Styles */}
      <style>{`
        :root {
          --mouse-x: ${mousePosition.x}px;
          --mouse-y: ${mousePosition.y}px;
        }
      `}</style>
    </div>
  );
}

export default App;

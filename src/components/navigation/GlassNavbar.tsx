import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks';
import { scrollToElement } from '../../utils';
import { siteConfig } from '../../data';

interface GlassNavbarProps {
  onNavigationTap?: (index: number) => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({ onNavigationTap }) => {
  const scrollProgress = useScrollProgress();
  const [currentSection, setCurrentSection] = useState(0);

  // Determine current section based on scroll progress
  useEffect(() => {
    const sections = 6; // Hero, About, What I Do, Works, Stand Out, Contact
    const sectionIndex = Math.floor(scrollProgress * sections);
    setCurrentSection(Math.min(sectionIndex, sections - 1));
  }, [scrollProgress]);

  // Dynamic navbar styling based on current section
  const getNavbarStyle = () => {
    switch (currentSection) {
      case 0: // Hero
        return 'glass-navbar-hero';
      case 1: // About
        return 'glass-navbar-subtle';
      case 2: // What I Do
        return 'glass-navbar-subtle';
      case 3: // Works
        return 'glass-navbar-dark'; // For works section with paper/dark background
      case 4: // Stand Out
        return 'glass-navbar-subtle';
      case 5: // Contact
        return 'glass-navbar-subtle';
      default:
        return 'glass-navbar-subtle';
    }
  };

  const navItems = [
    { label: 'About', index: 1 },
    { label: 'Timeline', index: 2 },
    { label: 'Works', index: 3 },
    { label: 'Contact', index: 4 },
  ];

  const handleNavClick = (index: number) => {
    if (onNavigationTap) {
      onNavigationTap(index);
    } else {
      // Fallback to element IDs
      const sections = ['hero', 'about', 'timeline', 'works', 'contact'];
      if (sections[index]) {
        scrollToElement(sections[index], 80);
      }
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${getNavbarStyle()} px-6 py-4 md:px-10 md:py-5 transition-all duration-500`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick(0)}
            className="flex items-center space-x-2 text-dark-900 hover:text-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
              <span className="text-dark-100 font-bold text-sm">
                {siteConfig.name.charAt(0)}
              </span>
            </div>
            <span className="font-display font-medium text-base hidden sm:block">
              {siteConfig.name}
            </span>
          </motion.button>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                onClick={() => handleNavClick(item.index)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

interface NavItemProps {
  label: string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(label);

  useEffect(() => {
    if (isHovered) {
      const scrambleAnimation = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let scrambled = '';
        for (let i = 0; i < label.length; i++) {
          if (Math.random() > 0.7) {
            scrambled += label[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(scrambled);
      };

      const interval = setInterval(scrambleAnimation, 50);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayText(label);
      }, 300);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setDisplayText(label);
    }
  }, [isHovered, label]);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-3 py-1.5 text-xs font-medium text-dark-800 hover:text-accent transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{displayText}</span>
      <motion.div
        className="absolute inset-0 bg-dark-300/30 rounded-lg backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8 
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

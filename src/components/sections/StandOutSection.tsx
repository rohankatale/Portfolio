import React from 'react';
import { Section } from '../layout/Section';
import { Heading } from '../typography/Heading';
import { ScrollReveal } from '../animations/ScrollReveal';
import { motion } from 'framer-motion';

export const StandOutSection: React.FC = () => {
  return (
    <Section id="stand-out" className="bg-dark-100 text-white py-24 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <ScrollReveal>
          <Heading level={1} className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight">
            I don't just build websites,
            <br />
            <span className="text-accent">I build experiences.</span>
          </Heading>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.p 
            className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            My philosophy is to merge artistic design with robust engineering to create digital products that are not only functional and user-friendly but also aesthetically pleasing and memorable.
          </motion.p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="inline-block bg-accent text-dark-100 font-bold py-4 px-10 rounded-full uppercase tracking-wider hover:bg-accent/80 transition-colors duration-300"
            >
              Let's Talk
            </a>
          </motion.div>
        </ScrollReveal>
      </div>
    </Section>
  );
};

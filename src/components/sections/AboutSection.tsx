import React from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../../hooks';
import { ScrollReveal } from '../animations/ScrollReveal';
import { siteConfig } from '../../data';

export const AboutSection: React.FC = () => {
  const { isMobile } = useResponsive();

  const stats = [
    { label: 'CGPA', value: '7.61' },
    { label: 'Projects', value: '10+' },
    { label: 'DSA Problems', value: '250+' },
    { label: 'TryHackMe Rank', value: 'Top 7%' },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6 bg-dark-100">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-16'} items-start`}>
          
          {/* Title Section */}
          <div className={`${isMobile ? 'text-center' : 'col-span-4 flex justify-center'}`}>
            <ScrollReveal delay={0.1} duration={1.2}>
              <h2 className="text-dark-900 font-display font-bold text-3xl tracking-wide">
                (About.)
              </h2>
            </ScrollReveal>
          </div>

          {/* Content Section */}
          <div className={`${isMobile ? '' : 'col-span-8'}`}>
            <ScrollReveal delay={0.3} duration={1.2}>
              <div className="space-y-6">
                <p className="text-dark-900 text-xl leading-relaxed">
                  {siteConfig.aboutText}
                </p>
                
                <p className="text-dark-800 leading-relaxed">
                  My approach combines technical expertise with creative vision, ensuring every project 
                  not only functions flawlessly but also provides an exceptional user experience. 
                  I believe in the power of collaboration and continuous learning.
                </p>

                <motion.a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors duration-300 font-medium"
                  whileHover={{ x: 5 }}
                >
                  <span>View Resume</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 pt-12 border-t border-dark-400/20">
            <ScrollReveal delay={0.5} duration={1.2}>
              <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-8`}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="text-accent text-4xl font-bold font-display mb-2">
                      {stat.value}
                    </div>
                    <div className="text-dark-700 text-sm tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

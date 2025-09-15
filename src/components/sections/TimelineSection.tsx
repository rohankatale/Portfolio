import React, { useState, useEffect, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useInView, useResponsive } from '../../hooks';
import { ScrollReveal } from '../animations/ScrollReveal';
import { careerEvents } from '../../data';
import { CareerEvent } from '../../types';

export const TimelineSection: React.FC = () => {
  const { isMobile } = useResponsive();
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3 });

  // Auto-progress through timeline when in view
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % careerEvents.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: ReactElement } = {
      code: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.7 15.9L4.8 12l3.9-3.9c.39-.39.39-1.01 0-1.4s-1.01-.39-1.4 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41L7.3 17.3c.39.39 1.01.39 1.4 0s.39-1.01 0-1.4zm6.6 0l3.9-3.9-3.9-3.9c-.39-.39-.39-1.01 0-1.4s1.01-.39 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41L16.7 17.3c-.39.39-1.01.39-1.4 0s-.39-1.01 0-1.4z"/>
        </svg>
      ),
      shield: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5C16.4,11 17,11.6 17,12.5V16.5C17,17.4 16.4,18 15.5,18H8.5C7.6,18 7,17.4 7,16.5V12.5C7,11.6 7.6,11 8.5,11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      ),
      laptop: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z"/>
        </svg>
      ),
      server: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 1h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2z"/>
        </svg>
      ),
      react: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89zM7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96zm.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51zm6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47zM12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72zm0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72zM16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96zm-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51zm1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
        </svg>
      ),
      graduation: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18M12,3L1,9L12,15L21,11V17H23V9L12,3Z"/>
        </svg>
      ),
      palette: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.15-.64-1.46-.42-.32-.64-.86-.64-1.54 0-1.38 1.12-2.5 2.5-2.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/>
        </svg>
      ),
      star: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
    };
    return icons[iconName] || icons.code;
  };

  return (
    <section id="timeline" className="min-h-screen py-20 px-6 bg-dark-100" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-center text-4xl font-display font-bold text-dark-900 mb-16">
            Career Timeline
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-dark-400 to-transparent" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {careerEvents.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                index={index}
                isActive={index === activeIndex}
                isLeft={index % 2 === 0}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineEventProps {
  event: CareerEvent;
  index: number;
  isActive: boolean;
  isLeft: boolean;
  isMobile: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  index,
  isActive,
  isLeft,
  isMobile,
}) => {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: ReactElement } = {
      code: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.7 15.9L4.8 12l3.9-3.9c.39-.39.39-1.01 0-1.4s-1.01-.39-1.4 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41L7.3 17.3c.39.39 1.01.39 1.4 0s.39-1.01 0-1.4zm6.6 0l3.9-3.9-3.9-3.9c-.39-.39-.39-1.01 0-1.4s1.01-.39 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41L16.7 17.3c-.39.39-1.01.39-1.4 0s-.39-1.01 0-1.4z"/>
        </svg>
      ),
      laptop: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z"/>
        </svg>
      ),
      server: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 1h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2z"/>
        </svg>
      ),
      react: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89zM7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96zm.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51zm6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47zM12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72zm0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72zM16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96zm-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51zm1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
        </svg>
      ),
      palette: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.15-.64-1.46-.42-.32-.64-.86-.64-1.54 0-1.38 1.12-2.5 2.5-2.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/>
        </svg>
      ),
      star: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
    };
    return icons[iconName] || icons.code;
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className={`relative flex items-center ${isMobile ? 'justify-center' : isLeft ? 'justify-start' : 'justify-end'}`}>
        {/* Content */}
        <motion.div
          className={`
            relative max-w-md p-6 glass rounded-2xl
            ${isMobile ? 'ml-8' : isLeft ? 'mr-8' : 'ml-8'}
          `}
          initial={{ opacity: 0, x: isLeft && !isMobile ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${isActive ? 'bg-accent text-dark-100' : 'bg-dark-400 text-dark-800'}
              transition-all duration-300
            `}>
              {getIcon(event.icon)}
            </div>
            <div>
              <h3 className="text-dark-900 font-display font-semibold text-lg">
                {event.title}
              </h3>
            </div>
          </div>
          
          <p className="text-accent text-sm font-medium">
            {event.title}
          </p>
          
          <p className="text-dark-800 text-sm leading-relaxed mb-3">
            {event.description}
          </p>
          
          {event.company && (
            <div className="text-xs text-dark-700">
              <span className="font-medium">{event.company}</span>
              {event.location && <span> • {event.location}</span>}
            </div>
          )}
        </motion.div>

        {/* Timeline Dot */}
        <motion.div
          className={`
            absolute left-1/2 transform -translate-x-1/2 z-10
            w-6 h-6 rounded-full border-2 transition-all duration-300
            ${isActive ? 'bg-accent border-accent scale-125' : 'bg-dark-200 border-dark-400'}
          `}
          initial={{ scale: 0 }}
          whileInView={{ scale: isActive ? 1.25 : 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
        />
      </div>
    </ScrollReveal>
  );
};

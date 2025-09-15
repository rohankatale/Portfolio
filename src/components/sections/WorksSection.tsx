import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useResponsive } from '../../hooks';
import { ScrollReveal } from '../animations/ScrollReveal';
import { projects } from '../../data';
import { Project } from '../../types';

const ProjectImageCarousel: React.FC<{ project: Project }> = ({ project }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isMobile } = useResponsive();

  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % project.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, project.images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const isCustomImageProject = ['quiz-app', 'event-booking', 'intrusion-detection'].includes(project.id);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative bg-gray-50 rounded-lg shadow-lg"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          height: isMobile ? '40vh' : 'auto',
          maxHeight: '80vh',
          width: isMobile
            ? (isCustomImageProject ? '40vh' : '85vw')
            : (isCustomImageProject ? '80vh' : '60vw'),
          maxWidth: isMobile ? '90vw' : '90vw'
        }}
        className="relative rounded-lg overflow-hidden"
      >
        <motion.img
          key={currentImage}
          src={project.images[currentImage]}
          alt={`${project.title} - Image ${currentImage + 1}`}
          className={`w-full h-full object-contain`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {project.images.length > 1 && (
          <>
            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white/80 hover:bg-black/80 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {currentImage < project.images.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white/80 hover:bg-black/80 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {project.images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImage(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const MobileProjectImageCarousel: React.FC<{ project: Project }> = ({ project }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { isMobile } = useResponsive();

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const isCustomImageProject = ['quiz-app', 'event-booking', 'intrusion-detection'].includes(project.id);

  return (
    <motion.div
      className="relative bg-gray-50 rounded-lg shadow-lg overflow-hidden"
      style={{
        height: isMobile ? '40vh' : '80vh',
        width: isMobile
          ? (isCustomImageProject ? '40vh' : '25vh')
          : (isCustomImageProject ? '80vh' : '45vh'),
      }}
    >
      <div className="relative w-full h-full">
        <motion.img
          key={currentImage}
          src={project.images[currentImage]}
          alt={`${project.title} - Image ${currentImage + 1}`}
          className={`w-full h-full ${isCustomImageProject ? 'object-cover' : 'object-contain'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {project.images.length > 1 && (
          <>
            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 ${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-black/70 rounded-full flex items-center justify-center text-white/80 hover:bg-black/80 transition-all duration-300`}
              >
                <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {currentImage < project.images.length - 1 && (
              <button
                onClick={nextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-black/70 rounded-full flex items-center justify-center text-white/80 hover:bg-black/80 transition-all duration-300`}
              >
                <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {project.images.length > 1 && (
        <div className={`flex justify-center space-x-1 ${isMobile ? 'mt-3' : 'mt-4'}`}>
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`${isMobile ? 'h-1.5' : 'h-2'} rounded-full transition-all duration-300 ${
                index === currentImage 
                  ? 'bg-black/80' 
                  : 'bg-black/30'
              }`}
              style={{
                width: index === currentImage 
                  ? (isMobile ? '24px' : '32px') 
                  : (isMobile ? '6px' : '8px')
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const ProjectSection: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return <MobileProjectSection project={project} index={index} />;
  }

  return (
    <div className="h-full flex items-center px-8 py-24 bg-white text-black isolate mix-blend-normal">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-12">
        <div className="w-[25%] flex-shrink-0">
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-5xl font-bold text-black">{project.title}</h3>
                <p className="text-lg text-black leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-200 text-black text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col space-y-4 pt-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-black hover:text-gray-800 transition-all duration-300 text-lg font-semibold"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-white hover:text-blue-100 transition-all duration-300 text-sm font-semibold bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 919-9" />
                    </svg>
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <div className="w-[75%]">
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center">
              {project.type === 'mobile' ? (
                <MobileProjectImageCarousel project={project} />
              ) : (
                <ProjectImageCarousel project={project} />
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

const MobileProjectSection: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <div className="px-4 py-16 bg-white">
      <div className="space-y-6">
        <ScrollReveal delay={0.1}>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-black">{project.title}</h3>
            <p className="text-sm text-black leading-relaxed px-2">{project.description}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex justify-center">
            {project.type === 'mobile' ? (
              <MobileProjectImageCarousel project={project} />
            ) : (
              <ProjectImageCarousel project={project} />
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-gray-200 text-black text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col space-y-3 items-center">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-black hover:text-gray-800 transition-all duration-300 text-sm font-semibold"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-white hover:text-blue-100 transition-all duration-300 text-sm font-semibold bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
                >
                  <svg className="w-4 h-4 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 919-9" />
                  </svg>
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export const WorksSection: React.FC = () => {
  const { isMobile } = useResponsive();
  const [headerScrollOffset, setHeaderScrollOffset] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      
      const textWidth = textRef.current ? textRef.current.scrollWidth : 0;
      const screenWidth = window.innerWidth;
      const maxScrollDistance = textWidth > screenWidth ? (textWidth - screenWidth + 160) * 1.1 : 0;
      
      setHeaderScrollOffset(scrollProgress * maxScrollDistance);
    };

    // Run once on mount to set initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="works" className="relative z-[101] w-full text-black isolate mix-blend-normal">
      <div 
        className={`relative z-20 w-full ${isMobile ? 'h-[50vh]' : 'h-[70vh]'} overflow-hidden mix-blend-normal`}
        style={{
          backgroundImage: 'url(/images/paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`${isMobile ? 'h-[35vh]' : 'h-[65vh]'} overflow-hidden flex items-center`}>
          <div className="w-full overflow-hidden">
            <div
              ref={textRef}
              className="whitespace-nowrap font-display font-black select-none"
              style={{
                fontSize: isMobile ? '80px' : '180px',
                color: '#000000',
                transform: `translateX(-${headerScrollOffset}px)`,
                paddingLeft: isMobile ? '12px' : '20px',
                lineHeight: '1'
              }}
            >
              DESIGNED WITH LOGIC DESIGNED WITH LOGIC DESIGNED WITH LOGIC
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className={`px-6 pb-6 ${isMobile ? 'px-4 pb-4' : ''}`}>
            <div className="max-w-7xl mx-auto">
              {isMobile ? (
                <div className="space-y-2">
                  <h2 className="text-black font-bold text-base">(Works.)</h2>
                  <p className="text-black font-bold text-xs text-center">
                    This creation is a confession.
                  </p>
                </div>
              ) : (
                <div className="flex justify-between items-end">
                  <div className="w-[15%]">
                    <h2 className="text-black font-bold text-lg">(Works.)</h2>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-black font-bold text-base">
                      This creation is a confession.
                    </p>
                  </div>
                  <div className="w-[15%]"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white">
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

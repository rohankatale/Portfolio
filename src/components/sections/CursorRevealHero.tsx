import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../../hooks';
import { ScrollReveal } from '../animations/ScrollReveal';
import { siteConfig } from '../../data';

interface CursorRevealHeroProps {
  onExplorePressed?: () => void;
}

export const CursorRevealHero: React.FC<CursorRevealHeroProps> = ({ onExplorePressed }) => {
  const { isMobile, isDesktop } = useResponsive();
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rAFRef = useRef<number | null>(null);
  const revealRadiusRef = useRef(0);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  // Mouse tracking for reveal effect (tracks position only)
  useEffect(() => {
    if (!isDesktop) return;
    const el = sectionRef.current;
    if (!el) return;

    const update = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseXRef.current = x;
      mouseYRef.current = y;

      // Update position immediately for responsive feel
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
    };

    el.addEventListener('mousemove', update);
    return () => {
      el.removeEventListener('mousemove', update);
    };
  }, [isDesktop]);

  // Breathing animation loop for reveal radius
  useEffect(() => {
    if (!isDesktop) return;
    const el = sectionRef.current;
    if (!el) return;

    let animId: number;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) / 1000; // seconds
      const base = isHovering ? 150 : 0; // increased base radius when hovering
      const amplitude = isHovering ? 16 : 0; // slightly larger pulse
      const freq = 0.6; // Hz (cycles per second)

      const sine = Math.sin(2 * Math.PI * freq * t);
      const target = base + amplitude * sine;
      // Smoothly approach target radius
      revealRadiusRef.current += (target - revealRadiusRef.current) * 0.15;

      el.style.setProperty('--reveal-radius', revealRadiusRef.current.toFixed(1) + 'px');
      // Keep last known cursor position so pulse works even if mouse is still
      el.style.setProperty('--mx', mouseXRef.current + 'px');
      el.style.setProperty('--my', mouseYRef.current + 'px');

      // Eye icon scale factor (1 to ~1.05)
      const scale = isHovering ? 1 + 0.05 * (0.5 + 0.5 * sine) : 1;
      el.style.setProperty('--eye-scale', scale.toFixed(3));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isDesktop, isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const getResponsiveFontSize = (base: number) => {
    if (isMobile) return base * 0.4;
    return base * 0.7; // Reduce overall size to match original better
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden bg-[#1A1F2B]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image (Foreground.jpg) */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/hero/FOREGROUND.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </div>

      {/* Masked Foreground Image (Background.jpg) - Only visible in cursor reveal */}
      {isDesktop && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(circle var(--reveal-radius,0px) at var(--mx,50%) var(--my,50%), #000 0%, #000 60%, transparent 100%)',
            maskImage: 'radial-gradient(circle var(--reveal-radius,0px) at var(--mx,50%) var(--my,50%), #000 0%, #000 60%, transparent 100%)',
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <img
            src="/images/hero/BACKGROUND.png"
            alt="Revealed Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-black/30" />
          
          {/* Geometric Portrait Placeholder - Will be replaced with actual portrait */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 relative opacity-60">
              {/* Temporary geometric placeholder - much more subtle */}
              <div 
                className="w-full h-full bg-gradient-to-br from-gray-600/30 via-gray-500/20 to-gray-700/30"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                }}
              />
              {/* Subtle indicator that this is a placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-light tracking-wider">Portrait Area</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Eye icon that follows the cursor and sits at the center of reveal */}
      {isDesktop && (
        <div
          aria-hidden
          className="absolute z-20 pointer-events-none"
          style={{
            left: 'var(--mx, 50%)',
            top: 'var(--my, 50%)',
            transform: 'translate(-50%, -50%) scale(var(--eye-scale, 1))',
            opacity: isHovering ? 0.9 : 0,
            transition: 'opacity 200ms ease-out',
          }}
        >
          {/* Simple eye SVG */}
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Z" stroke="#00d2ff" strokeOpacity="0.9" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="3.5" fill="#00d2ff" fillOpacity="0.9"/>
            <circle cx="11" cy="11.5" r="1" fill="#1A1F2B" />
          </svg>
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Main Content - positioned in center */}
        <div className="flex flex-col justify-center items-center h-full px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal delay={0.2}>
              <motion.h1
                className="font-display font-black text-white mb-4 leading-tight tracking-wider"
                style={{ 
                  fontSize: `${getResponsiveFontSize(48)}px`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  letterSpacing: isMobile ? '2px' : '4px'
                }}
              >
                {siteConfig.heroTitle}
              </motion.h1>
              
              <h2
                className="font-display font-light text-white mb-8 tracking-widest"
                style={{ 
                  fontSize: `${getResponsiveFontSize(28)}px`,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  letterSpacing: isMobile ? '1px' : '2px'
                }}
              >
                {siteConfig.tagline}
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Section - "Scroll to explore" and description */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16">
          <div className="max-w-6xl mx-auto text-center">
            {/* Scroll to explore indicator */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col items-center space-y-3 mb-8">
                <span className="text-white/70 text-xs tracking-wide uppercase">Scroll to explore</span>
                <div className="w-0.5 h-10 bg-gradient-to-b from-white/60 to-transparent" />
              </div>
            </ScrollReveal>
            
            {/* Description text */}
            <ScrollReveal delay={0.6}>
              <p 
                className="text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide"
                style={{ 
                  fontSize: `${getResponsiveFontSize(16)}px`,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {siteConfig.description}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Bottom decorative line and text */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4" />
          <div className={`flex ${isMobile ? 'flex-col space-y-2 text-center' : 'justify-between items-center'} text-xs text-white/70`}>
            <ScrollReveal delay={0.3} direction="right">
              <span className="tracking-wide">Ethical Hacker</span>
            </ScrollReveal>
            <ScrollReveal delay={0.7} direction="left">
              <span className="tracking-wide">Java Developer</span>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Film grain overlay - subtle like original photography */}
      <div className="absolute inset-0 opacity-30 pointer-events-none film-grain" />
    </section>
  );
};

export default CursorRevealHero;
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks';

interface ScrollTimelineIndicatorProps {
  sectionTitles: string[];
  onSectionTap: (index: number) => void;
}

export const ScrollTimelineIndicator: React.FC<ScrollTimelineIndicatorProps> = ({
  sectionTitles,
  onSectionTap,
}) => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center space-y-4">
        {/* Progress Line */}
        <div className="relative w-0.5 h-64 bg-dark-400">
          <motion.div
            className="absolute top-0 left-0 w-full bg-accent"
            style={{ height: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Section Indicators */}
        <div className="flex flex-col space-y-3">
          {sectionTitles.map((title, index) => (
            <motion.button
              key={title}
              onClick={() => onSectionTap(index)}
              className="group relative flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`
                  w-3 h-3 rounded-full border-2 transition-all duration-300
                  ${
                    scrollProgress > index / (sectionTitles.length - 1)
                      ? 'bg-accent border-accent'
                      : 'bg-transparent border-dark-600'
                  }
                `}
              />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-dark-200 text-dark-900 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  {title}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

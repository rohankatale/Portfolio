import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CurtainLoaderProps {
  onComplete: () => void;
  duration?: number;
}

export const CurtainLoader: React.FC<CurtainLoaderProps> = ({ 
  onComplete, 
  duration = 1000 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Increment progress based on duration
        const increment = 100 / (duration / 50);
        return prev + increment;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-100"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
    >
      <div className="text-center w-3/4 max-w-md">
        <motion.h1
          className="text-5xl md:text-7xl font-black font-display text-dark-900 mb-4"
          style={{
            textShadow: `
              -1px -1px 0 #4E9AF1, 1px -1px 0 #4E9AF1, -1px 1px 0 #4E9AF1, 1px 1px 0 #4E9AF1,
              -2px -2px 0 #4E9AF1, 2px -2px 0 #4E9AF1, -2px 2px 0 #4E9AF1, 2px 2px 0 #4E9AF1,
              -3px -3px 0 #4E9AF1, 3px -3px 0 #4E9AF1, -3px 3px 0 #4E9AF1, 3px 3px 0 #4E9AF1
            `,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Rohan Katale
        </motion.h1>
        <div className="flex items-center justify-center space-x-1 mt-4">
          {Array.from({ length: 8 }).map((_, index) => {
            const progressThreshold = (index + 1) * (100 / 8);
            return (
              <motion.div
                key={index}
                className="h-2 w-6 bg-dark-300 rounded-sm"
                initial={{ backgroundColor: '#2f3441' }}
                animate={{
                  backgroundColor: progress >= progressThreshold ? '#4E9AF1' : '#2f3441',
                }}
                transition={{ duration: 0.2 }}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

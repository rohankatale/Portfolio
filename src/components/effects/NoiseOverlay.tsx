import React from 'react';

export const NoiseOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <div className="absolute inset-0 animate-noise bg-noise opacity-5" />
    </div>
  );
};

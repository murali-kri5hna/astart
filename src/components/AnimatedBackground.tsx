
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-gradient bg-400 animate-gradient-shift" />
      
      {/* Additional floating elements for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse-slow delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-pulse-slow delay-2000" />
      </div>
    </div>
  );
};

export default AnimatedBackground;

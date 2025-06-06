
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={`w-full bg-white/10 rounded-full h-3 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-accent to-success transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;

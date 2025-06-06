
import React from 'react';

interface ReadyScreenProps {
  userName: string;
  onReady: () => void;
}

const ReadyScreen: React.FC<ReadyScreenProps> = ({ userName, onReady }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      onClick={onReady}
    >
      <div className="text-center animate-pulse-slow">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {userName}, are you ready to move?
        </h1>
        <p className="text-white/40 text-xl md:text-2xl">
          (no going back)
        </p>
      </div>
      
      <div className="absolute bottom-8 text-white/40 text-sm animate-pulse">
        Tap anywhere to continue
      </div>
    </div>
  );
};

export default ReadyScreen;

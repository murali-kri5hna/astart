
import React, { useEffect, useRef, useState } from 'react';

interface LogoScreenProps {
  onComplete: () => void;
}

const LogoScreen: React.FC<LogoScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Check if video exists and can be loaded
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
        video.play().catch(() => {
          // If autoplay fails, show fallback
          setShowFallback(true);
          setTimeout(onComplete, 3000);
        });
      };

      const handleEnded = () => {
        onComplete();
      };

      const handleError = () => {
        setShowFallback(true);
        setTimeout(onComplete, 3000);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('error', handleError);

      // Fallback timer in case video doesn't load within 1 second
      const fallbackTimer = setTimeout(() => {
        if (!videoLoaded) {
          setShowFallback(true);
          setTimeout(onComplete, 3000);
        }
      }, 1000);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
        clearTimeout(fallbackTimer);
      };
    } else {
      // No video element, show fallback immediately
      setShowFallback(true);
      setTimeout(onComplete, 3000);
    }
  }, [onComplete, videoLoaded]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500"
      onClick={handleSkip}
    >
      {/* Video container */}
      {!showFallback && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="./logo-animation.mp4" type="video/mp4" />
          <source src="./logo-animation.webm" type="video/webm" />
        </video>
      )}

      {/* Fallback logo */}
      {showFallback && (
        <div className="flex flex-col items-center animate-pulse-slow">
          <div className="w-32 h-32 mb-6 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
            <span className="text-4xl">📱</span>
          </div>
          
          <h1 className="text-6xl font-black text-white text-center">
            ASTART
          </h1>
          
          <p className="text-white/60 text-lg mt-4">
            Move Like You Mean It
          </p>
        </div>
      )}

      {/* Skip indicator */}
      <div className="absolute bottom-8 text-white/40 text-sm z-10">
        Tap to skip
      </div>
    </div>
  );
};

export default LogoScreen;

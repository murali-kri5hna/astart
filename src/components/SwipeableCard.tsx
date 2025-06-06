
import React, { useState, useRef } from 'react';
import { Activity, SwipeDirection } from '@/types';

interface SwipeableCardProps {
  activity: Activity;
  onSwipe: (direction: SwipeDirection) => void;
  onTap: () => void;
  isTop: boolean;
  style?: React.CSSProperties;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ 
  activity, 
  onSwipe, 
  onTap, 
  isTop,
  style = {}
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
    
    // Determine swipe direction and tint
    if (Math.abs(deltaX) > 50) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleEnd = () => {
    if (!isDragging || !isTop) return;
    
    setIsDragging(false);
    
    // Check if swipe was far enough
    if (Math.abs(dragOffset.x) > 100) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  };

  const handleTap = () => {
    if (!isDragging && Math.abs(dragOffset.x) < 10) {
      onTap();
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const transform = `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`;
  
  const overlayColor = swipeDirection === 'left' 
    ? 'rgba(239, 68, 68, 0.4)' 
    : swipeDirection === 'right' 
    ? 'rgba(16, 185, 129, 0.4)' 
    : 'transparent';

  return (
    <div
      ref={cardRef}
      className={`glass-card p-6 w-full max-w-sm mx-auto cursor-pointer no-select transition-transform duration-200 ${
        activity.isShiny ? 'shiny-border' : ''
      } ${!isTop ? 'scale-95 opacity-60' : ''}`}
      style={{
        transform: isTop ? transform : undefined,
        ...style
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleTap}
    >
      {/* Swipe overlay */}
      {swipeDirection && (
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center text-white text-6xl font-bold"
          style={{ backgroundColor: overlayColor }}
        >
          {swipeDirection === 'left' ? '✕' : '✓'}
        </div>
      )}
      
      {/* Activity icon/image placeholder */}
      <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center text-3xl">
        {activity.category === 'cardio' && '🏃‍♂️'}
        {activity.category === 'strength' && '💪'}
        {activity.category === 'flexibility' && '🤸‍♀️'}
        {activity.category === 'mobility' && '🕺'}
        {activity.category === 'posture' && '🧘‍♀️'}
        {activity.category === 'wellness' && '🌟'}
        {activity.category === 'movement' && '🚶‍♂️'}
      </div>
      
      {/* Activity title */}
      <h3 className="text-xl font-bold text-center mb-3 text-white">
        {activity.title}
      </h3>
      
      {/* Activity description */}
      <p className="text-sm text-white/80 text-center mb-4 leading-relaxed">
        {activity.description}
      </p>
      
      {/* Points */}
      <div className="text-center mb-4">
        <span className="text-accent text-lg font-semibold">
          +{activity.points} points
        </span>
      </div>
      
      {/* Cue */}
      {activity.cue && (
        <div className="text-center mb-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs text-white/90">
            {activity.cue}
          </span>
        </div>
      )}
      
      {/* Swipe buttons */}
      <div className="flex justify-between items-center">
        <button 
          className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center text-white text-xl font-bold hover:scale-110 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onSwipe('left');
          }}
        >
          ✕
        </button>
        <button 
          className="w-12 h-12 bg-success rounded-full flex items-center justify-center text-white text-xl font-bold hover:scale-110 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onSwipe('right');
          }}
        >
          ✓
        </button>
      </div>
    </div>
  );
};

export default SwipeableCard;

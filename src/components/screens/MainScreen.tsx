
import React, { useState, useEffect } from 'react';
import { Activity, SwipeDirection } from '@/types';
import { TRACKABLE_ACTIVITIES, EXERCISE_ACTIVITIES } from '@/data/activities';
import { storage } from '@/utils/storage';
import SwipeableCard from '@/components/SwipeableCard';
import ProgressBar from '@/components/ProgressBar';

interface MainScreenProps {
  onGoToGoals: () => void;
  onGoToRewards: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onGoToGoals, onGoToRewards }) => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [availableActivities, setAvailableActivities] = useState<Activity[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    // Load game state
    const gameState = storage.getGameState();
    if (gameState) {
      setCurrentPoints(gameState.currentPoints);
      setProgress(gameState.progressToday);
    }

    // Check if we need to generate new activities
    const dailyGoals = storage.getDailyGoals();
    if (dailyGoals && dailyGoals.activities.length === 5) {
      // Already have today's activities, go to goals screen
      onGoToGoals();
    } else {
      // Generate new activity pool
      generateActivityPool();
    }
  }, [onGoToGoals]);

  const generateActivityPool = () => {
    // Always include at least one shiny (trackable) activity first
    const shinyActivities = [...TRACKABLE_ACTIVITIES];
    const normalActivities = [...EXERCISE_ACTIVITIES];
    
    // Shuffle arrays
    const shuffledShiny = shinyActivities.sort(() => Math.random() - 0.5);
    const shuffledNormal = normalActivities.sort(() => Math.random() - 0.5);
    
    // Create pool: 2-3 shiny, rest normal (total 10 cards)
    const pool = [
      ...shuffledShiny.slice(0, 2),
      ...shuffledNormal.slice(0, 8)
    ].sort(() => Math.random() - 0.5);
    
    setAvailableActivities(pool);
  };

  const handleSwipe = (direction: SwipeDirection) => {
    if (!direction || currentCardIndex >= availableActivities.length) return;

    const currentActivity = availableActivities[currentCardIndex];
    
    if (direction === 'right') {
      // Accept activity
      const newSelected = [...selectedActivities, currentActivity];
      setSelectedActivities(newSelected);
      
      if (newSelected.length === 5) {
        // Save daily goals and go to goals screen
        const dailyGoals = {
          activities: newSelected,
          completedCount: 0,
          totalPoints: 0,
          date: new Date().toDateString()
        };
        storage.saveDailyGoals(dailyGoals);
        
        // Initialize game state if needed
        if (!storage.getGameState()) {
          const gameState = {
            currentPoints: 0,
            totalPointsEarned: 0,
            streakDays: 0,
            level: 1,
            currentGoals: newSelected,
            completedToday: 0,
            progressToday: 0
          };
          storage.saveGameState(gameState);
        }
        
        onGoToGoals();
      }
    }
    
    // Move to next card
    setCurrentCardIndex(prev => prev + 1);
  };

  const handleCardTap = () => {
    if (currentCardIndex < availableActivities.length) {
      setSelectedActivity(availableActivities[currentCardIndex]);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  if (selectedActivities.length === 5) {
    return null; // Will be redirected to goals screen
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 text-white">
        <div className="text-left">
          <div className="text-3xl font-bold">{currentPoints.toString().padStart(3, '0')} points</div>
          <div className="flex items-center mt-2">
            <ProgressBar current={progress} total={5} className="w-48" />
            <span className="ml-3 text-sm text-white/60">{progress}/5</span>
          </div>
        </div>
        <button 
          onClick={onGoToRewards}
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          🏆
        </button>
      </div>

      {/* Card stack area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative w-full max-w-sm h-96">
          {availableActivities.slice(currentCardIndex, currentCardIndex + 3).map((activity, index) => (
            <div
              key={`${activity.id}-${currentCardIndex + index}`}
              className="absolute inset-0"
              style={{
                zIndex: 3 - index,
                transform: `translateY(${index * 8}px) scale(${1 - index * 0.05})`,
              }}
            >
              <SwipeableCard
                activity={activity}
                onSwipe={index === 0 ? handleSwipe : () => {}}
                onTap={index === 0 ? handleCardTap : () => {}}
                isTop={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom info */}
      <div className="p-6 text-center">
        <p className="text-white/60">
          Select {5 - selectedActivities.length} more activities
        </p>
        <p className="text-white/40 text-sm mt-2">
          Swipe right to accept, left to skip
        </p>
      </div>

      {/* Activity detail modal */}
      {showModal && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="glass-card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedActivity.title}</h2>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="text-white text-xl">×</span>
              </button>
            </div>
            
            <div className="space-y-4 text-white">
              <p className="text-white/80">{selectedActivity.description}</p>
              
              {selectedActivity.instructions && (
                <div>
                  <h3 className="font-semibold mb-2">Instructions:</h3>
                  <p className="text-white/80 text-sm">{selectedActivity.instructions}</p>
                </div>
              )}
              
              {selectedActivity.benefits && selectedActivity.benefits.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Benefits:</h3>
                  <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                    {selectedActivity.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedActivity.safetyTips && selectedActivity.safetyTips.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Safety Tips:</h3>
                  <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                    {selectedActivity.safetyTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="text-center pt-4">
                <span className="text-accent text-lg font-semibold">
                  +{selectedActivity.points} points
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;

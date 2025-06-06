
import React, { useState, useEffect } from 'react';
import { Activity, DailyGoals, CueOption } from '@/types';
import { CUE_OPTIONS } from '@/data/activities';
import { storage } from '@/utils/storage';
import ProgressBar from '@/components/ProgressBar';

interface GoalsScreenProps {
  onBack: () => void;
  onGoToRewards: () => void;
}

const GoalsScreen: React.FC<GoalsScreenProps> = ({ onBack, onGoToRewards }) => {
  const [dailyGoals, setDailyGoals] = useState<DailyGoals | null>(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showCueSelector, setShowCueSelector] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [completingActivityId, setCompletingActivityId] = useState<string | null>(null);

  useEffect(() => {
    loadDailyGoals();
    loadGameState();
  }, []);

  const loadDailyGoals = () => {
    const goals = storage.getDailyGoals();
    if (goals) {
      setDailyGoals(goals);
    } else {
      onBack();
    }
  };

  const loadGameState = () => {
    const gameState = storage.getGameState();
    if (gameState) {
      setCurrentPoints(gameState.currentPoints);
    }
  };

  const handleCompleteActivity = (activityId: string) => {
    if (!dailyGoals) return;
    
    const activity = dailyGoals.activities.find(a => a.id === activityId);
    if (!activity || activity.completed) return;

    setCompletingActivityId(activityId);
    
    // Complete the activity
    storage.completeActivity(activityId, activity.points);
    
    // Show completion animation
    setTimeout(() => {
      setCompletingActivityId(null);
      loadDailyGoals();
      loadGameState();
    }, 600);
  };

  const handleActivityCardClick = (activity: Activity) => {
    if (completingActivityId === activity.id) return; // Don't open modal during completion animation
    
    setSelectedActivity(activity);
    setShowDescriptionModal(true);
  };

  const handleCompleteButtonClick = (e: React.MouseEvent, activityId: string) => {
    e.stopPropagation(); // Prevent card click
    handleCompleteActivity(activityId);
  };

  const handleCueSelection = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowCueSelector(true);
    setShowDescriptionModal(false);
  };

  const handleCueSelected = (cue: CueOption) => {
    if (selectedActivity && dailyGoals) {
      const updatedActivities = dailyGoals.activities.map(a =>
        a.id === selectedActivity.id ? { ...a, cue: cue.label } : a
      );
      
      const updatedGoals = { ...dailyGoals, activities: updatedActivities };
      storage.saveDailyGoals(updatedGoals);
      setDailyGoals(updatedGoals);
    }
    
    setShowCueSelector(false);
    setSelectedActivity(null);
  };

  const closeModals = () => {
    setSelectedActivity(null);
    setShowCueSelector(false);
    setShowDescriptionModal(false);
  };

  const isTrackableGoalReached = (activity: Activity) => {
    if (activity.type !== 'trackable' || !activity.target) return false;
    return (activity.progress || 0) >= activity.target;
  };

  if (!dailyGoals) {
    return <div className="fixed inset-0 z-40 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-transparent">
      {/* Header */}
      <div className="flex justify-between items-center p-6 text-white">
        <button 
          onClick={onBack}
          className="p-3 hover:bg-white/10 rounded-full transition-colors"
        >
          ←
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">MY GOALS</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">{currentPoints.toString().padStart(3, '0')} pts</span>
          <button 
            onClick={onGoToRewards}
            className="p-3 hover:bg-white/10 rounded-full transition-colors"
          >
            🏆
          </button>
        </div>
      </div>

      {/* Goals list */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {dailyGoals.activities.map((activity) => (
          <div 
            key={activity.id}
            className={`activity-card p-4 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
              activity.completed ? 'completed' : ''
            } ${completingActivityId === activity.id ? 'confetti-animation' : ''}`}
            onClick={() => handleActivityCardClick(activity)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {activity.isShiny && <span className="mr-2">✨</span>}
                  <h3 className={`font-semibold text-white ${activity.completed ? 'line-through opacity-75' : ''}`}>
                    {activity.title}
                  </h3>
                  {activity.completed && <span className="ml-2 text-success">✓</span>}
                </div>
                
                {/* Progress bar for trackable activities */}
                {activity.type === 'trackable' && activity.target && (
                  <div className="mb-2">
                    <ProgressBar 
                      current={activity.progress || 0} 
                      total={activity.target} 
                      className="mb-1"
                    />
                    <div className="text-xs text-white/60">
                      {activity.progress || 0} / {activity.target}
                      {activity.id.includes('steps') && ' steps'}
                      {activity.id.includes('squats') && ' squats'}
                      {activity.id.includes('stairs') && ' times'}
                      {activity.id.includes('walk') && ' minutes'}
                      {activity.id.includes('stand') && ' times'}
                    </div>
                  </div>
                )}
                
                {/* Cue display */}
                <div 
                  className="inline-flex items-center text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full cursor-pointer hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCueSelection(activity);
                  }}
                >
                  {activity.cue}
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-accent font-semibold">+{activity.points}</div>
                {!activity.completed && (
                  <button 
                    className={`mt-2 px-3 py-1 rounded-full text-white text-xs transition-colors ${
                      activity.type === 'trackable' && !isTrackableGoalReached(activity)
                        ? 'bg-gray-500 cursor-not-allowed opacity-50'
                        : 'bg-accent hover:bg-accent/90'
                    }`}
                    onClick={(e) => handleCompleteButtonClick(e, activity.id)}
                    disabled={activity.type === 'trackable' && !isTrackableGoalReached(activity)}
                  >
                    Complete
                  </button>
                )}
                {activity.completed && (
                  <div className="mt-2 px-3 py-1 bg-success rounded-full text-white text-xs">
                    Completed ✓
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stats */}
      <div className="p-6 bg-white/5 backdrop-blur-sm">
        <div className="text-center text-white">
          <div className="text-lg font-semibold mb-2">
            {dailyGoals.completedCount} / 5 Goals Complete
          </div>
          <ProgressBar current={dailyGoals.completedCount} total={5} />
          {dailyGoals.completedCount === 5 && (
            <div className="mt-2 text-success font-semibold">
              🎉 Perfect Day! +50 Bonus Points
            </div>
          )}
        </div>
      </div>

      {/* Activity Description Modal */}
      {showDescriptionModal && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="glass-card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedActivity.title}</h2>
              <button 
                onClick={closeModals}
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

      {/* Cue Selector Modal */}
      {showCueSelector && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="glass-card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Choose Your Cue</h2>
              <button 
                onClick={closeModals}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="text-white text-xl">×</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {CUE_OPTIONS.map((cue) => (
                <button
                  key={cue.id}
                  onClick={() => handleCueSelected(cue)}
                  className="w-full p-4 text-left bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <div className="text-white font-medium">{cue.label}</div>
                  <div className="text-white/60 text-sm">{cue.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsScreen;

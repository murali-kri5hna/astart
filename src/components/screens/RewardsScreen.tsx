
import React, { useState, useEffect } from 'react';
import { Reward } from '@/types';
import { REWARDS } from '@/data/rewards';
import { storage } from '@/utils/storage';

interface RewardsScreenProps {
  onBack: () => void;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ onBack }) => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>(REWARDS);

  useEffect(() => {
    const gameState = storage.getGameState();
    if (gameState) {
      setCurrentPoints(gameState.currentPoints);
    }
  }, []);

  const handleClaimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || reward.claimed || currentPoints < reward.pointsCost) return;

    // Deduct points and mark as claimed
    const gameState = storage.getGameState();
    if (gameState) {
      gameState.currentPoints -= reward.pointsCost;
      storage.saveGameState(gameState);
      setCurrentPoints(gameState.currentPoints);
    }

    // Update reward status
    const updatedRewards = rewards.map(r =>
      r.id === rewardId ? { ...r, claimed: true, claimedAt: new Date() } : r
    );
    setRewards(updatedRewards);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return '🍽️';
      case 'fitness': return '💪';
      case 'entertainment': return '🎵';
      case 'wellness': return '🌟';
      case 'tech': return '📱';
      default: return '🎁';
    }
  };

  const getTierColor = (pointsCost: number) => {
    if (pointsCost <= 300) return 'border-blue-400';
    if (pointsCost <= 700) return 'border-purple-400';
    return 'border-yellow-400';
  };

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
        <h1 className="text-2xl font-bold">REWARDS</h1>
        <div className="text-right">
          <div className="text-xl font-bold">{currentPoints.toString().padStart(3, '0')} pts</div>
          <div className="text-xs text-white/60">Available</div>
        </div>
      </div>

      {/* Rewards grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {rewards.map((reward) => {
            const canAfford = currentPoints >= reward.pointsCost;
            const isAvailable = !reward.claimed && canAfford;
            
            return (
              <div 
                key={reward.id}
                className={`glass-card p-4 transition-all duration-200 border-2 ${getTierColor(reward.pointsCost)} ${
                  reward.claimed ? 'opacity-50' : canAfford ? 'hover:scale-102' : 'opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="text-3xl mr-4">
                      {getCategoryIcon(reward.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{reward.title}</h3>
                      <p className="text-white/80 text-sm">{reward.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-accent font-semibold">🏷️ {reward.pointsCost} points</span>
                        {reward.claimed && (
                          <span className="ml-3 text-success text-sm">✓ Claimed</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {reward.claimed ? (
                      <div className="px-4 py-2 bg-success/20 text-success rounded-lg text-sm font-medium">
                        CLAIMED
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaimReward(reward.id)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          canAfford
                            ? 'bg-accent hover:bg-accent/90 text-white'
                            : 'bg-white/10 text-white/40 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'CLAIM' : 'LOCKED'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier explanation */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-white font-semibold mb-3">Reward Tiers</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-blue-400">
              <div className="w-4 h-1 bg-blue-400 rounded mr-3"></div>
              Bronze (100-300 pts): Coffee & small perks
            </div>
            <div className="flex items-center text-purple-400">
              <div className="w-4 h-1 bg-purple-400 rounded mr-3"></div>
              Silver (400-700 pts): Fitness gear & meal deals
            </div>
            <div className="flex items-center text-yellow-400">
              <div className="w-4 h-1 bg-yellow-400 rounded mr-3"></div>
              Gold (800+ pts): Premium rewards & experiences
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsScreen;

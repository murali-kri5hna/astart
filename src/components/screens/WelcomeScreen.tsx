
import React, { useState } from 'react';
import { PAIN_POINTS } from '@/data/activities';

interface WelcomeScreenProps {
  onComplete: (name: string, painPoints: string[]) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [name, setName] = useState('');

  const togglePainPoint = (painPoint: string) => {
    setSelectedPainPoints(prev => 
      prev.includes(painPoint)
        ? prev.filter(p => p !== painPoint)
        : [...prev, painPoint]
    );
  };

  const handleSubmit = () => {
    if (name.trim() && selectedPainPoints.length > 0) {
      onComplete(name.trim(), selectedPainPoints);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col p-6 overflow-y-auto">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            What are your goals and limitations?
          </h1>
          <p className="text-white/60 text-lg">
            Select all that apply
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {PAIN_POINTS.map((painPoint) => (
            <button
              key={painPoint}
              onClick={() => togglePainPoint(painPoint)}
              className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 border border-white/10 ${
                selectedPainPoints.includes(painPoint)
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'hover:bg-white/20'
              }`}
              style={{
                background: selectedPainPoints.includes(painPoint) 
                  ? undefined 
                  : 'rgba(20, 20, 20, 0.95)'
              }}
            >
              {selectedPainPoints.includes(painPoint) && (
                <span className="mr-2">✓</span>
              )}
              {painPoint}
            </button>
          ))}
        </div>

        {/* Name input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Enter your name and press Enter"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-4 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            style={{ background: 'rgba(20, 20, 20, 0.95)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

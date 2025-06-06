
import React, { useState, useEffect } from 'react';
import { Screen, UserProfile } from '@/types';
import { storage } from '@/utils/storage';
import AnimatedBackground from '@/components/AnimatedBackground';
import LogoScreen from '@/components/screens/LogoScreen';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import ReadyScreen from '@/components/screens/ReadyScreen';
import MainScreen from '@/components/screens/MainScreen';
import GoalsScreen from '@/components/screens/GoalsScreen';
import RewardsScreen from '@/components/screens/RewardsScreen';

const Index: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('logo');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [previousScreen, setPreviousScreen] = useState<Screen>('main');

  useEffect(() => {
    // Check if user has already completed onboarding
    const existingProfile = storage.getUserProfile();
    if (existingProfile) {
      setUserProfile(existingProfile);
      
      // Check if user has daily goals for today
      const dailyGoals = storage.getDailyGoals();
      if (dailyGoals && dailyGoals.activities.length === 5) {
        setCurrentScreen('goals');
      } else {
        setCurrentScreen('main');
      }
    }
  }, []);

  const handleLogoComplete = () => {
    if (userProfile) {
      setCurrentScreen('main');
    } else {
      setCurrentScreen('welcome');
    }
  };

  const handleWelcomeComplete = (name: string, painPoints: string[]) => {
    const profile: UserProfile = {
      name,
      painPoints,
      createdAt: new Date(),
      totalPoints: 0,
      streakDays: 0,
      level: 1
    };
    
    storage.saveUserProfile(profile);
    setUserProfile(profile);
    setCurrentScreen('ready');
  };

  const handleReadyComplete = () => {
    setCurrentScreen('main');
  };

  const handleGoToGoals = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('goals');
  };

  const handleGoToRewards = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('rewards');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
  };

  const handleBackToGoals = () => {
    setCurrentScreen('goals');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {currentScreen === 'logo' && (
        <LogoScreen onComplete={handleLogoComplete} />
      )}
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      
      {currentScreen === 'ready' && userProfile && (
        <ReadyScreen 
          userName={userProfile.name} 
          onReady={handleReadyComplete} 
        />
      )}
      
      {currentScreen === 'main' && (
        <MainScreen 
          onGoToGoals={handleGoToGoals}
          onGoToRewards={handleGoToRewards}
        />
      )}
      
      {currentScreen === 'goals' && (
        <GoalsScreen 
          onBack={handleBackToMain}
          onGoToRewards={handleGoToRewards}
        />
      )}
      
      {currentScreen === 'rewards' && (
        <RewardsScreen 
          onBack={previousScreen === 'goals' ? handleBackToGoals : handleBackToMain}
        />
      )}
    </div>
  );
};

export default Index;

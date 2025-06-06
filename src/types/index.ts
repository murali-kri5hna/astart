
export interface UserProfile {
  name: string;
  painPoints: string[];
  createdAt: Date;
  totalPoints: number;
  streakDays: number;
  level: number;
}

export interface Activity {
  id: string;
  type: 'trackable' | 'exercise';
  title: string;
  description: string;
  points: number;
  category: string;
  isShiny?: boolean;
  completed: boolean;
  progress?: number;
  target?: number;
  cue?: string;
  instructions?: string;
  benefits?: string[];
  safetyTips?: string[];
}

export interface DailyGoals {
  activities: Activity[];
  completedCount: number;
  totalPoints: number;
  date: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  claimed: boolean;
  claimedAt?: Date;
}

export interface GameState {
  currentPoints: number;
  totalPointsEarned: number;
  streakDays: number;
  level: number;
  currentGoals: Activity[];
  completedToday: number;
  progressToday: number; // 0-5
}

export interface CueOption {
  id: string;
  label: string;
  description: string;
}

export type SwipeDirection = 'left' | 'right' | null;

export type Screen = 'logo' | 'welcome' | 'ready' | 'main' | 'goals' | 'rewards';

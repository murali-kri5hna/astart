
import { UserProfile, Activity, DailyGoals, GameState, Reward } from '@/types';

const STORAGE_KEYS = {
  USER_PROFILE: 'astart_user_profile',
  GAME_STATE: 'astart_game_state',
  DAILY_GOALS: 'astart_daily_goals',
  ACTIVITY_HISTORY: 'astart_activity_history',
  REWARDS: 'astart_rewards',
  SETTINGS: 'astart_settings'
};

export const storage = {
  // User Profile
  saveUserProfile: (profile: UserProfile): void => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getUserProfile: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (data) {
      const profile = JSON.parse(data);
      profile.createdAt = new Date(profile.createdAt);
      return profile;
    }
    return null;
  },

  // Game State
  saveGameState: (gameState: GameState): void => {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
  },

  getGameState: (): GameState | null => {
    const data = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    return data ? JSON.parse(data) : null;
  },

  // Daily Goals
  saveDailyGoals: (goals: DailyGoals): void => {
    localStorage.setItem(STORAGE_KEYS.DAILY_GOALS, JSON.stringify(goals));
  },

  getDailyGoals: (): DailyGoals | null => {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_GOALS);
    if (data) {
      const goals = JSON.parse(data);
      // Check if it's today's goals
      const today = new Date().toDateString();
      if (goals.date === today) {
        return goals;
      }
    }
    return null;
  },

  // Activity completion
  completeActivity: (activityId: string, points: number): void => {
    const gameState = storage.getGameState();
    if (gameState) {
      gameState.currentPoints += points;
      gameState.totalPointsEarned += points;
      gameState.completedToday += 1;
      gameState.progressToday = Math.min(gameState.progressToday + 1, 5);
      storage.saveGameState(gameState);
    }

    const dailyGoals = storage.getDailyGoals();
    if (dailyGoals) {
      const activity = dailyGoals.activities.find(a => a.id === activityId);
      if (activity) {
        activity.completed = true;
        dailyGoals.completedCount += 1;
        dailyGoals.totalPoints += points;
        storage.saveDailyGoals(dailyGoals);
      }
    }
  },

  // Update activity progress (for trackable activities)
  updateActivityProgress: (activityId: string, progress: number): void => {
    const dailyGoals = storage.getDailyGoals();
    if (dailyGoals) {
      const activity = dailyGoals.activities.find(a => a.id === activityId);
      if (activity && activity.target) {
        activity.progress = progress;
        if (progress >= activity.target && !activity.completed) {
          activity.completed = true;
          dailyGoals.completedCount += 1;
          dailyGoals.totalPoints += activity.points;
          
          // Update game state
          const gameState = storage.getGameState();
          if (gameState) {
            gameState.currentPoints += activity.points;
            gameState.totalPointsEarned += activity.points;
            gameState.completedToday += 1;
            gameState.progressToday = Math.min(gameState.progressToday + 1, 5);
            storage.saveGameState(gameState);
          }
        }
        storage.saveDailyGoals(dailyGoals);
      }
    }
  },

  // Clear all data (for testing)
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },

  // Check if new day
  isNewDay: (): boolean => {
    const goals = storage.getDailyGoals();
    const today = new Date().toDateString();
    return !goals || goals.date !== today;
  }
};

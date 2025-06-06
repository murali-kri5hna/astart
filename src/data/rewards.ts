
import { Reward } from '@/types';

export const REWARDS: Reward[] = [
  // Tier 1 (100-300 points)
  {
    id: 'coffee_20',
    title: '20% OFF COFFEE',
    description: 'Local coffee shops',
    pointsCost: 150,
    category: 'food',
    claimed: false
  },
  {
    id: 'smoothie_15',
    title: '15% OFF SMOOTHIES',
    description: 'Healthy smoothie bars',
    pointsCost: 120,
    category: 'food',
    claimed: false
  },
  {
    id: 'spotify_month',
    title: 'SPOTIFY PREMIUM',
    description: '1 month free',
    pointsCost: 250,
    category: 'entertainment',
    claimed: false
  },
  
  // Tier 2 (400-700 points)
  {
    id: 'adidas_20',
    title: '20% OFF ADIDAS',
    description: 'Online & In-store',
    pointsCost: 500,
    category: 'fitness',
    claimed: false
  },
  {
    id: 'nike_25',
    title: '25% OFF NIKE',
    description: 'Fitness gear & apparel',
    pointsCost: 550,
    category: 'fitness',
    claimed: false
  },
  {
    id: 'meal_delivery',
    title: 'HEALTHY MEAL DELIVERY',
    description: '$20 credit',
    pointsCost: 400,
    category: 'food',
    claimed: false
  },
  {
    id: 'fitness_tracker',
    title: 'FITNESS TRACKER',
    description: '30% off smartwatch',
    pointsCost: 650,
    category: 'tech',
    claimed: false
  },
  
  // Tier 3 (800+ points)
  {
    id: 'gym_month',
    title: 'GYM MEMBERSHIP',
    description: '1 month free',
    pointsCost: 800,
    category: 'fitness',
    claimed: false
  },
  {
    id: 'massage_session',
    title: 'MASSAGE SESSION',
    description: '60 minutes professional',
    pointsCost: 900,
    category: 'wellness',
    claimed: false
  },
  {
    id: 'personal_trainer',
    title: 'PERSONAL TRAINER',
    description: '2 sessions included',
    pointsCost: 1200,
    category: 'fitness',
    claimed: false
  },
  {
    id: 'wellness_retreat',
    title: 'WELLNESS WEEKEND',
    description: 'Spa retreat package',
    pointsCost: 1500,
    category: 'wellness',
    claimed: false
  }
];

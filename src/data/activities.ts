
import { Activity, CueOption } from '@/types';

export const PAIN_POINTS = [
  'Neck pain',
  'Lower back pain', 
  'Shoulder tension',
  'Wrist issues',
  'Hip flexibility',
  'Knee problems',
  'General fitness',
  'Posture improvement',
  'Energy boost',
  'Stress relief'
];

export const CUE_OPTIONS: CueOption[] = [
  { id: 'brushing', label: '🦷 Brushing teeth', description: 'While brushing your teeth' },
  { id: 'coffee', label: '☕ Making coffee', description: 'While your coffee brews' },
  { id: 'email', label: '📧 Checking email', description: 'Before opening your inbox' },
  { id: 'meeting', label: '📞 Before meetings', description: 'Right before video calls' },
  { id: 'lunch', label: '🍽️ Lunch break', description: 'During your lunch break' },
  { id: 'hourly', label: '⏰ Hourly reminder', description: 'Every hour on the hour' },
  { id: 'stress', label: '😤 Feeling stressed', description: 'When you feel tension' },
  { id: 'tired', label: '😴 Energy dip', description: 'When you feel sluggish' },
  { id: 'bathroom', label: '🚽 Bathroom break', description: 'After using the restroom' },
  { id: 'commute', label: '🚗 After commute', description: 'Right after arriving to work' }
];

export const TRACKABLE_ACTIVITIES: Activity[] = [
  {
    id: 'steps_8000',
    type: 'trackable',
    title: 'Walk 8,000 steps today',
    description: 'Your legs are made for walking, not just holding up your coffee addiction',
    points: 100,
    category: 'cardio',
    isShiny: true,
    completed: false,
    target: 8000,
    progress: 0,
    cue: 'All day challenge',
    instructions: 'Track your steps throughout the day. Take stairs, walk to lunch, pace during calls.',
    benefits: ['Improves cardiovascular health', 'Boosts energy', 'Enhances mood'],
    safetyTips: ['Wear comfortable shoes', 'Start gradually if sedentary', 'Stay hydrated']
  },
  {
    id: 'stairs_3',
    type: 'trackable', 
    title: 'Climb stairs 3 extra times',
    description: 'Elevator? We don\'t know her. Your calves are calling.',
    points: 75,
    category: 'cardio',
    isShiny: true,
    completed: false,
    target: 3,
    progress: 0,
    cue: 'Instead of elevator',
    instructions: 'Take the stairs instead of elevators. Count 3 extra trips beyond your normal routine.',
    benefits: ['Strengthens leg muscles', 'Improves stamina', 'Burns calories'],
    safetyTips: ['Hold the handrail', 'Take breaks if needed', 'Watch your step']
  },
  {
    id: 'walk_15min',
    type: 'trackable',
    title: 'Take a 15-minute walk',
    description: 'Your future self wants you to move. Don\'t disappoint them.',
    points: 50,
    category: 'cardio',
    isShiny: true,
    completed: false,
    target: 15,
    progress: 0,
    cue: 'Lunch break',
    instructions: 'Take a dedicated 15-minute walk outside or around your building.',
    benefits: ['Clears your mind', 'Improves circulation', 'Vitamin D boost'],
    safetyTips: ['Dress for weather', 'Choose safe routes', 'Bring water if needed']
  },
  {
    id: 'squats_20',
    type: 'trackable',
    title: 'Do 20 squats throughout the day',
    description: 'Your chair misses you already. Too bad. Squat it out.',
    points: 60,
    category: 'strength',
    isShiny: true,
    completed: false,
    target: 20,
    progress: 0,
    cue: 'Hourly breaks',
    instructions: 'Spread 20 squats throughout your day. 5 squats every few hours works great.',
    benefits: ['Strengthens glutes and quads', 'Improves mobility', 'Activates core'],
    safetyTips: ['Keep knees behind toes', 'Lower slowly', 'Stop if you feel pain']
  },
  {
    id: 'stand_hourly',
    type: 'trackable',
    title: 'Stand and move for 5 mins every hour',
    description: 'Motion is lotion for your joints. Time to moisturize.',
    points: 80,
    category: 'movement',
    isShiny: true,
    completed: false,
    target: 8,
    progress: 0,
    cue: 'Hourly reminder',
    instructions: 'Set hourly reminders to stand up and move around for 5 minutes.',
    benefits: ['Improves circulation', 'Reduces back stiffness', 'Boosts productivity'],
    safetyTips: ['Set gentle reminders', 'Start with 3 mins if needed', 'Listen to your body']
  }
];

export const EXERCISE_ACTIVITIES: Activity[] = [
  {
    id: 'neck_stretch',
    type: 'exercise',
    title: 'Neck Stretch',
    description: 'Your neck holds up 11 pounds of brain. Give it a break.',
    points: 30,
    category: 'flexibility',
    completed: false,
    cue: 'Morning routine',
    instructions: 'Slowly tilt your head to each side, holding for 15 seconds. Then look up and down gently.',
    benefits: ['Relieves neck tension', 'Improves range of motion', 'Reduces headaches'],
    safetyTips: ['Move slowly', 'Don\'t force the stretch', 'Stop if dizzy']
  },
  {
    id: 'shoulder_shrugs',
    type: 'exercise',
    title: 'Shoulder Shrugs',
    description: 'Shrug off that stress. Your shoulders aren\'t earrings.',
    points: 25,
    category: 'flexibility',
    completed: false,
    cue: 'Stress moment',
    instructions: 'Lift shoulders to ears, hold for 3 seconds, then release. Repeat 10 times.',
    benefits: ['Releases shoulder tension', 'Improves posture', 'Reduces stress'],
    safetyTips: ['Don\'t hold breath', 'Keep movements controlled', 'Relax completely on release']
  },
  {
    id: 'desk_pushups',
    type: 'exercise',
    title: 'Desk Push-ups',
    description: 'Push away from your desk like it owes you money.',
    points: 40,
    category: 'strength',
    completed: false,
    cue: 'Before lunch',
    instructions: 'Place hands on desk edge, step back, and do 10-15 inclined push-ups.',
    benefits: ['Strengthens chest and arms', 'Improves posture', 'Quick energy boost'],
    safetyTips: ['Ensure desk is stable', 'Keep body straight', 'Modify angle as needed']
  },
  {
    id: 'calf_raises',
    type: 'exercise',
    title: 'Calf Raises',
    description: 'Rise above your sedentary lifestyle. Literally.',
    points: 30,
    category: 'strength',
    completed: false,
    cue: 'While standing',
    instructions: 'Stand tall, raise up on your toes, hold for 2 seconds, lower slowly. Repeat 15 times.',
    benefits: ['Strengthens calves', 'Improves circulation', 'Better balance'],
    safetyTips: ['Hold onto something for balance', 'Rise slowly', 'Keep core engaged']
  },
  {
    id: 'spinal_twist',
    type: 'exercise',
    title: 'Seated Spinal Twist',
    description: 'Twist and shout (internally) at your vertebrae.',
    points: 35,
    category: 'flexibility',
    completed: false,
    cue: 'After sitting long',
    instructions: 'Sit tall, place right hand on left knee, twist gently to the left. Hold 20 seconds, repeat other side.',
    benefits: ['Improves spinal mobility', 'Relieves back tension', 'Aids digestion'],
    safetyTips: ['Keep spine straight', 'Don\'t force the twist', 'Breathe deeply']
  },
  {
    id: 'wall_angels',
    type: 'exercise',
    title: 'Wall Angels',
    description: 'Channel your inner angel. Your posture will thank you.',
    points: 35,
    category: 'posture',
    completed: false,
    cue: 'Posture break',
    instructions: 'Stand against wall, raise arms to make snow angel shape. Slide up and down 10 times.',
    benefits: ['Improves posture', 'Strengthens upper back', 'Opens chest'],
    safetyTips: ['Keep back flat against wall', 'Move slowly', 'Stop if shoulder pain']
  },
  {
    id: 'hip_circles',
    type: 'exercise',
    title: 'Standing Hip Circles',
    description: 'Your hips don\'t lie, and they\'re saying they need to move.',
    points: 30,
    category: 'mobility',
    completed: false,
    cue: 'Standing break',
    instructions: 'Stand with hands on hips, make slow circles 10 times each direction.',
    benefits: ['Improves hip mobility', 'Relieves lower back', 'Better circulation'],
    safetyTips: ['Start with small circles', 'Hold onto something if needed', 'Keep core engaged']
  },
  {
    id: 'wrist_stretches',
    type: 'exercise',
    title: 'Wrist Stretches',
    description: 'Your wrists are not just for mouse clicking. Show them some love.',
    points: 25,
    category: 'flexibility',
    completed: false,
    cue: 'Typing break',
    instructions: 'Extend arm, pull fingers back gently with other hand. Hold 15 seconds each direction.',
    benefits: ['Prevents carpal tunnel', 'Relieves wrist pain', 'Improves flexibility'],
    safetyTips: ['Gentle pressure only', 'Stretch both directions', 'Stop if numbness occurs']
  },
  {
    id: 'ankle_circles',
    type: 'exercise',
    title: 'Ankle Circles',
    description: 'Circle your way to better circulation. Your feet will applaud.',
    points: 20,
    category: 'mobility',
    completed: false,
    cue: 'Under desk',
    instructions: 'Lift one foot, rotate ankle in circles 10 times each direction. Switch feet.',
    benefits: ['Improves circulation', 'Prevents stiffness', 'Better ankle mobility'],
    safetyTips: ['Make full circles', 'Both directions', 'Can be done seated']
  },
  {
    id: 'chest_opener',
    type: 'exercise',
    title: 'Doorway Chest Stretch',
    description: 'Open your chest like you\'re opening your mind to movement.',
    points: 35,
    category: 'flexibility',
    completed: false,
    cue: 'Bathroom break',
    instructions: 'Place forearms on door frame, step forward until you feel stretch across chest. Hold 30 seconds.',
    benefits: ['Improves posture', 'Opens tight chest', 'Counteracts hunching'],
    safetyTips: ['Don\'t overstretch', 'Keep core engaged', 'Step back if too intense']
  },
  {
    id: 'leg_swings',
    type: 'exercise',
    title: 'Standing Leg Swings',
    description: 'Swing those legs like you\'re walking on sunshine.',
    points: 30,
    category: 'mobility',
    completed: false,
    cue: 'Getting up',
    instructions: 'Hold wall for balance, swing one leg forward and back 10 times. Switch legs.',
    benefits: ['Improves hip mobility', 'Activates leg muscles', 'Better balance'],
    safetyTips: ['Control the movement', 'Hold for balance', 'Keep standing leg stable']
  },
  {
    id: 'breathing_exercise',
    type: 'exercise',
    title: 'Deep Breathing Exercise',
    description: 'Breathe like your life depends on it. (It does.)',
    points: 25,
    category: 'wellness',
    completed: false,
    cue: 'Feeling stressed',
    instructions: 'Breathe in for 4 counts, hold for 4, breathe out for 6. Repeat 5 times.',
    benefits: ['Reduces stress', 'Lowers blood pressure', 'Improves focus'],
    safetyTips: ['Don\'t force it', 'Find your rhythm', 'Stop if dizzy']
  }
];

export const ALL_ACTIVITIES = [...TRACKABLE_ACTIVITIES, ...EXERCISE_ACTIVITIES];

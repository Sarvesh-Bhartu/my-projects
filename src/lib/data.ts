export const userStats = {
  checkIns: 42,
  sprintsCompleted: 12,
  challengesWon: 5,
  currentStreak: 21,
};

export const dailyQuote = {
  quote: "The journey of a thousand miles begins with a single step.",
  author: "Lao Tzu",
};

export const streakDates = [
  new Date(new Date().setDate(new Date().getDate() - 1)),
  new Date(new Date().setDate(new Date().getDate() - 2)),
  new Date(new Date().setDate(new Date().getDate() - 3)),
  new Date(new Date().setDate(new Date().getDate() - 5)),
  new Date(new Date().setDate(new Date().getDate() - 6)),
  new Date(new Date().setDate(new Date().getDate() - 9)),
  new Date(new Date().setDate(new Date().getDate() - 10)),
  new Date(new Date().setDate(new Date().getDate() - 11)),
  new Date(new Date().setDate(new Date().getDate() - 12)),
];

export const soulSprintBadges = [
  { id: 1, name: 'Mindful Morning', icon: 'Sunrise' },
  { id: 2, name: 'Digital Detox', icon: 'SmartphoneNfc' },
  { id: 3, name: 'Nature Walk', icon: 'Mountain' },
  { id: 4, name: 'Gratitude Journal', icon: 'BookHeart' },
  { id: 5, name: 'Hydration Hero', icon: 'GlassWater' },
  { id: 6, name: 'Creative Hour', icon: 'Paintbrush' },
  { id: 7, name: 'Meditation Master', icon: 'BrainCircuit' },
];

export const raceChallenges = [
  {
    id: 1,
    title: '30-Day Meditation Challenge',
    points: 1500,
    streak: 30,
    creator: { name: 'Sarah Chen', avatarId: 'user-avatar-2' },
    bgImageId: 'challenge-bg-1',
  },
  {
    id: 2,
    title: 'Weekly Fitness Goals',
    points: 500,
    streak: 7,
    creator: { name: 'Mike Davis', avatarId: 'user-avatar-3' },
    bgImageId: 'challenge-bg-2',
  },
  {
    id: 3,
    title: 'Mindful Eating Sprint',
    points: 750,
    streak: 14,
    creator: { name: 'Emily White', avatarId: 'user-avatar-4' },
    bgImageId: 'challenge-bg-3',
  },
];

export const meetingPods = [
  {
    id: 1,
    name: 'Mindfulness Mavericks',
    description: 'A group for daily meditation and mindfulness practices.',
    members: 12,
    bgImageId: 'pod-bg-1',
  },
  {
    id: 2,
    name: 'Fitness Fanatics',
    description: 'Support and accountability for your fitness journey.',
    members: 25,
    bgImageId: 'pod-bg-2',
  },
  {
    id: 3,
    name: 'Creative Souls',
    description: 'Share and get inspired by creative wellness activities.',
    members: 8,
    bgImageId: 'pod-bg-3',
  },
  {
    id: 4,
    name: 'Stoic Circle',
    description: 'Discussing and applying stoic principles to modern life.',
    members: 15,
    bgImageId: 'pod-bg-4',
  },
];

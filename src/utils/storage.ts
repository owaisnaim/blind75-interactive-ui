export interface UserState {
  solved: string[]; // Problem IDs
  mastered?: string[]; // Problem IDs (deprecated)
  reviewLater: string[]; // Problem IDs
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  userNotes: Record<string, string>;
  soundEnabled: boolean;
  theme: 'black' | 'white';
  activeFilterCategory: string | null;
  activeFilterDifficulty: string | null;
  searchQuery: string;
}

const STORAGE_KEY = 'blind75_user_state';
const LEGACY_STORAGE_KEY = 'algoquest_75_user_state';

export const INITIAL_STATE: UserState = {
  solved: [],
  mastered: [],
  reviewLater: [],
  xp: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  userNotes: {},
  soundEnabled: true,
  theme: 'black',
  activeFilterCategory: null,
  activeFilterDifficulty: null,
  searchQuery: '',
};

export function loadUserState(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_STATE,
      ...parsed,
      theme: parsed.theme === 'white' ? 'white' : 'black'
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveUserState(state: UserState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function calculateLevel(xp: number): {
  level: number;
  title: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
} {
  const RANKS = [
    { level: 1, title: 'Level 1: Novice (Foundations)', minXp: 0, maxXp: 300 },
    { level: 2, title: 'Level 2: Apprentice (Arrays)', minXp: 300, maxXp: 800 },
    { level: 3, title: 'Level 3: Intermediate (Data Structures)', minXp: 800, maxXp: 1600 },
    { level: 4, title: 'Level 4: Advanced (Trees & Recursion)', minXp: 1600, maxXp: 2800 },
    { level: 5, title: 'Level 5: Specialist (Graphs & Traversal)', minXp: 2800, maxXp: 4500 },
    { level: 6, title: 'Level 6: Expert (Dynamic Programming)', minXp: 4500, maxXp: 6500 },
    { level: 7, title: 'Level 7: Principal (Advanced Optimization)', minXp: 6500, maxXp: 9000 },
    { level: 8, title: 'Level 8: Master (LeetCode 75)', minXp: 9000, maxXp: 12000 }
  ];

  for (let i = 0; i < RANKS.length; i++) {
    const rank = RANKS[i];
    if (xp < rank.maxXp || i === RANKS.length - 1) {
      const span = rank.maxXp - rank.minXp;
      const earned = Math.max(0, xp - rank.minXp);
      const pct = Math.min(100, Math.round((earned / span) * 100));
      return {
        level: rank.level,
        title: rank.title,
        currentLevelXp: earned,
        nextLevelXp: span,
        progressPercent: pct
      };
    }
  }

  return {
    level: 8,
    title: 'Level 8: Master (LeetCode 75)',
    currentLevelXp: 12000,
    nextLevelXp: 12000,
    progressPercent: 100
  };
}

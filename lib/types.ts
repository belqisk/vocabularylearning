import React from 'react';

// Word data structure
export interface Word {
  id: number;
  en: string;
  cn: string;
  example?: string;
  difficulty?: number; // 1-5 stars
  learned: boolean;
  isFavorite: boolean;
}

// User settings
export interface Settings {
  darkMode: boolean;
  autoPronounce: boolean;
  randomOrder: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// Learning statistics
export interface Stats {
  totalWords: number;
  learnedWords: number;
  streakDays: number;
}

// Global context state
export interface AppContextState {
  words: Word[];
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  updateWordStatus: (id: number, updates: Partial<Word>) => void;
}

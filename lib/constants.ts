import { Word, Settings } from './types';

export const INITIAL_WORDS: Word[] = [
  { id: 1, en: "apple", cn: "苹果", learned: false, isFavorite: false, difficulty: 1, example: "I ate an apple for breakfast." },
  { id: 2, en: "serendipity", cn: "意外发现珍奇事物的本领", learned: false, isFavorite: true, difficulty: 5, example: "Meeting you here was pure serendipity." },
  { id: 3, en: "book", cn: "书", learned: true, isFavorite: false, difficulty: 1, example: "This is a good book." },
  { id: 4, en: "ethereal", cn: "飘渺的；超凡的", learned: false, isFavorite: false, difficulty: 4, example: "The music had an ethereal quality." },
  { id: 5, en: "resilience", cn: "恢复力；弹力", learned: false, isFavorite: false, difficulty: 3, example: "She showed great resilience after the setback." },
  { id: 6, en: "ephemeral", cn: "短暂的", learned: false, isFavorite: false, difficulty: 4, example: "Fashion trends are often ephemeral." },
  { id: 7, en: "galaxy", cn: "星系", learned: false, isFavorite: false, difficulty: 2, example: "The Milky Way is our galaxy." },
  { id: 8, en: "algorithm", cn: "算法", learned: true, isFavorite: false, difficulty: 3, example: "The search algorithm is very efficient." },
  { id: 9, en: "coffee", cn: "咖啡", learned: true, isFavorite: true, difficulty: 1, example: "I need coffee to wake up." },
  { id: 10, en: "zebra", cn: "斑马", learned: false, isFavorite: false, difficulty: 1, example: "Zebras have black and white stripes." },
];

export const DEFAULT_SETTINGS: Settings = {
  darkMode: false,
  autoPronounce: true,
  randomOrder: false,
  fontSize: 'medium',
};

export const STORAGE_KEYS = {
  WORDS: 'vocab_app_words',
  SETTINGS: 'vocab_app_settings',
};

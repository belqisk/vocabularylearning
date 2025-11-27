'use client';

import React from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Volume2, Star, Check } from 'lucide-react';
import { Word } from '../lib/types';

/**
 * 组件用途 (Component Purpose):
 * 核心单词卡片组件，支持滑动手势和发音。
 * Core word card component, supporting swipe gestures and pronunciation.
 * 
 * 交互说明 (Interaction Notes):
 * - 左右滑动切换单词 (Left: Prev/Skip, Right: Next)。
 * - Swipe left/right to switch words.
 * - 点击发音按钮调用浏览器语音API。
 * - Click pronunciation button to call Browser Speech API.
 * - 拖拽时的旋转和透明度变化效果。
 * - Rotation and opacity changes during drag.
 */

interface WordCardProps {
  word: Word;
  onSwipe: (direction: 'left' | 'right') => void;
  onFavoriteToggle: () => void;
  onLearnedToggle: () => void;
  autoPronounce: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  onSwipe, 
  onFavoriteToggle, 
  onLearnedToggle, 
  autoPronounce,
  fontSize
}) => {
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Font scaling
  const textSizes = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-5xl',
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  const speak = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.en);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto pronounce on mount if enabled
  React.useEffect(() => {
    if (autoPronounce) speak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.id, autoPronounce]);

  return (
    <motion.div
      style={{ x, rotate, opacity, cursor: 'grab' }}
      whileTap={{ cursor: 'grabbing', scale: 1.02 }}
      whileHover={{ scale: 1.01 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="relative w-full max-w-md aspect-[3/4] bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* Learned Badge */}
      {word.learned && (
        <div className="absolute top-6 right-6 text-green-500 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
          <Check className="w-3 h-3" /> Learned
        </div>
      )}

      {/* Main Word Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full text-center space-y-6">
        <h2 className={`${textSizes[fontSize]} font-bold text-gray-900 dark:text-white tracking-tight leading-none`}>
          {word.en}
        </h2>
        
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
          {word.cn}
        </p>
        
        {/* Pronunciation Button */}
        <button 
          onClick={speak}
          className="p-3 bg-amber-50 dark:bg-amber-900/20 text-primary rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
        >
          <Volume2 className="w-6 h-6" />
        </button>

        {/* Example Sentence */}
        {word.example && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-sm text-gray-600 dark:text-gray-300">
            "{word.example}"
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="w-full pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between px-4">
        <button 
          onClick={(e) => { e.stopPropagation(); onFavoriteToggle(); }}
          className={`flex flex-col items-center gap-1 text-sm ${word.isFavorite ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Star className={`w-6 h-6 ${word.isFavorite ? 'fill-current' : ''}`} />
          <span className="text-xs">Save</span>
        </button>

        <div className="text-gray-300 text-xs uppercase tracking-widest font-semibold">
           Swipe &rarr;
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onLearnedToggle(); }}
          className={`flex flex-col items-center gap-1 text-sm ${word.learned ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Check className="w-6 h-6" />
          <span className="text-xs">{word.learned ? 'Done' : 'Mark'}</span>
        </button>
      </div>

      {/* Decorative Blur Background (Accents) */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
};

export default WordCard;

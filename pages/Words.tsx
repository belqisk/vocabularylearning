import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppContext } from '../App.tsx';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import ProgressBar from '../components/ProgressBar';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Word } from '../types';

const Words: React.FC = () => {
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params for filtering
  const searchParams = new URLSearchParams(location.search);
  const filterType = searchParams.get('filter') || 'all';

  if (!context) return null;
  const { words, settings, updateWordStatus } = context;

  // Filter words based on selection
  const sessionWords = useMemo(() => {
    let filtered = [...words];
    if (filterType === 'unlearned') filtered = filtered.filter(w => !w.learned);
    if (filterType === 'favorites') filtered = filtered.filter(w => w.isFavorite);
    
    // Apply Random Sort if setting is on
    if (settings.randomOrder) {
      filtered = filtered.sort(() => Math.random() - 0.5);
    }
    return filtered;
  }, [words, filterType, settings.randomOrder]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // For animation direction
  const currentWord = sessionWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < sessionWords.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
        // End of list
        // Could show a "Complete" modal here
        alert("You've reached the end of this list!");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSwipe = (dir: 'left' | 'right') => {
    if (dir === 'left') {
        // In some apps left is next, in others left is prev. 
        // Logic: Swiping card to Left usually means "Trash" or "Next" in Tinder-like apps.
        // Prompt says "Swipe left/right cards". Let's map Right -> Next, Left -> Prev/Skip
        if (currentIndex < sessionWords.length - 1) {
             setDirection(1);
             setCurrentIndex(prev => prev + 1);
        }
    } else {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') { // Spacebar to toggle favorite
         if(currentWord) updateWordStatus(currentWord.id, { isFavorite: !currentWord.isFavorite });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, sessionWords]);


  // --- Render Empty State ---
  if (sessionWords.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showBack title="Learning" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <RotateCcw className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No words found</h3>
            <p className="text-gray-500 mb-8">
                {filterType === 'favorites' ? "You haven't saved any favorites yet." : "You've learned everything in this category!"}
            </p>
            <button 
                onClick={() => navigate('/')} 
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-amber-200/50 hover:bg-amber-600 transition-colors"
            >
                Go Back Home
            </button>
        </div>
      </div>
    );
  }

  // Animation variants for page transition
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Header showBack title={`${currentIndex + 1} / ${sessionWords.length}`} />
      
      {/* Progress Bar Top */}
      <div className="px-4 py-2">
         <ProgressBar current={currentIndex + 1} total={sessionWords.length} />
      </div>

      <main className="flex-1 relative flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md h-[500px] relative flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full flex justify-center"
            >
              <WordCard 
                word={currentWord}
                onSwipe={handleSwipe}
                onFavoriteToggle={() => updateWordStatus(currentWord.id, { isFavorite: !currentWord.isFavorite })}
                onLearnedToggle={() => updateWordStatus(currentWord.id, { learned: !currentWord.learned })}
                autoPronounce={settings.autoPronounce}
                fontSize={settings.fontSize}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual Navigation Controls (Desktop/Accessibility) */}
        <div className="flex items-center gap-8 mt-8">
            <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-500 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={handleNext}
                disabled={currentIndex === sessionWords.length - 1}
                className="p-4 bg-primary text-white rounded-full shadow-lg shadow-amber-200/50 hover:bg-amber-600 transition-all transform hover:scale-105"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
      </main>
    </div>
  );
};

export default Words;
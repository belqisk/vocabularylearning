import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Words from './pages/Words';
import SettingsPage from './pages/Settings';
import { AppContextState, Word, Settings } from './types';
import { INITIAL_WORDS, DEFAULT_SETTINGS, STORAGE_KEYS } from './constants';

// Create Global Context
export const AppContext = createContext<AppContextState | null>(null);

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/words" element={<Words />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  // --- Global State ---
  const [words, setWords] = useState<Word[]>(INITIAL_WORDS);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Persistence Logic ---
  useEffect(() => {
    // Load from local storage on mount
    try {
      const storedWords = localStorage.getItem(STORAGE_KEYS.WORDS);
      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

      if (storedWords) setWords(JSON.parse(storedWords));
      if (storedSettings) setSettings(JSON.parse(storedSettings));
    } catch (e) {
      console.error("Failed to load data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Save to local storage on change
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
  }, [words, settings, isLoaded]);

  useEffect(() => {
    // Apply Dark Mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // --- Helper Functions ---
  const updateWordStatus = (id: number, updates: Partial<Word>) => {
    setWords(prev => prev.map(word => word.id === id ? { ...word, ...updates } : word));
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <AppContext.Provider value={{ words, setWords, settings, setSettings, updateWordStatus }}>
      <HashRouter>
        <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 font-sans`}>
          <AppContent />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
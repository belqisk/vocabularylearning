'use client';

import React, { useState, useEffect, createContext } from 'react';
import { AppContextState, Word, Settings } from '../lib/types';
import { INITIAL_WORDS, DEFAULT_SETTINGS, STORAGE_KEYS } from '../lib/constants';

/**
 * 组件用途 (Component Purpose):
 * 全局状态管理提供者，替代原 App.tsx 的功能。
 * Global state management provider, replacing the original App.tsx functionality.
 * 
 * 逻辑修改点 (Logic Mod Points):
 * - 使用 useEffect 在客户端加载 LocalStorage 数据。
 * - Use useEffect to load LocalStorage data on the client side.
 * - 提供 Context 给子组件。
 * - Provide Context to child components.
 */

export const AppContext = createContext<AppContextState | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<Word[]>(INITIAL_WORDS);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Persistence Logic ---
  useEffect(() => {
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
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
  }, [words, settings, isLoaded]);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const updateWordStatus = (id: number, updates: Partial<Word>) => {
    setWords(prev => prev.map(word => word.id === id ? { ...word, ...updates } : word));
  };

  // Avoid hydration mismatch by rendering a loader or nothing until loaded on client
  // 为避免水合不匹配，在客户端加载完成前显示加载中
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AppContext.Provider value={{ words, setWords, settings, setSettings, updateWordStatus }}>
      <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 font-sans`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

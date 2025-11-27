'use client';

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../components/Providers';
import Header from '../../components/Header';
import ToggleSwitch from '../../components/ToggleSwitch';
import { Moon, Volume2, Shuffle, Type, Download, Upload, Trash2 } from 'lucide-react';
import { INITIAL_WORDS } from '../../lib/constants';

/**
 * 组件用途 (Component Purpose):
 * 设置页面，允许用户配置应用偏好。
 * Settings page, allowing users to configure app preferences.
 * 
 * 逻辑修改点 (Logic Mod Points):
 * - 引用正确的 Context Provider 路径。
 * - Referenced correct Context Provider path.
 */

const SettingsPage: React.FC = () => {
  const context = useContext(AppContext);
  
  if (!context) return null;
  const { settings, setSettings, setWords } = context;

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFontSize = (size: 'small' | 'medium' | 'large') => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };

  const handleReset = () => {
    if(window.confirm("Are you sure you want to reset all progress and words?")) {
        setWords(INITIAL_WORDS);
        alert("Reset complete.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Settings" />

      <motion.main 
        className="flex-1 max-w-2xl mx-auto w-full p-4 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        
        {/* Learning Preferences */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Preferences</h3>
          </div>
          
          <div className="p-6 space-y-2">
            <div className="flex items-center gap-3 mb-2">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                    <ToggleSwitch 
                        label="Auto-Pronunciation" 
                        isOn={settings.autoPronounce} 
                        onToggle={() => handleToggle('autoPronounce')} 
                    />
                </div>
            </div>
            
            <div className="w-full h-px bg-gray-100 dark:bg-gray-700 my-2" />

            <div className="flex items-center gap-3">
                <Shuffle className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                    <ToggleSwitch 
                        label="Random Order" 
                        isOn={settings.randomOrder} 
                        onToggle={() => handleToggle('randomOrder')} 
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Visual Settings */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Appearance</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                    <ToggleSwitch 
                        label="Dark Mode" 
                        isOn={settings.darkMode} 
                        onToggle={() => handleToggle('darkMode')} 
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Type className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Card Font Size</span>
                </div>
                <div className="flex gap-2">
                    {['small', 'medium', 'large'].map((size) => (
                        <button
                            key={size}
                            onClick={() => handleFontSize(size as any)}
                            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                                settings.fontSize === size 
                                ? 'bg-primary text-white border-primary' 
                                : 'bg-transparent border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Data</h3>
          </div>
          
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Export Word List</span>
                </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Import Words</span>
                </div>
            </button>

            <button 
                onClick={handleReset}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-left transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-500" />
                    <span className="text-red-500 group-hover:text-red-600 font-medium">Reset Progress</span>
                </div>
            </button>
          </div>
        </section>

      </motion.main>
    </div>
  );
};

export default SettingsPage;

'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppContext } from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Play, TrendingUp, Book, Heart, Grid } from 'lucide-react';

/**
 * 组件用途 (Component Purpose):
 * 首页，展示统计数据和学习入口。
 * Home page, displaying statistics and learning entry points.
 * 
 * 逻辑修改点 (Logic Mod Points):
 * - 使用 useContext 获取全局状态。
 * - Use useContext to access global state.
 * - 使用 Next.js Link 进行导航。
 * - Use Next.js Link for navigation.
 */

const Home: React.FC = () => {
  const context = useContext(AppContext);
  
  if (!context) return null;
  
  const { words } = context;
  const learnedCount = words.filter(w => w.learned).length;
  const favoriteCount = words.filter(w => w.isFavorite).length;
  const totalCount = words.length;
  const percentage = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header />

      <motion.main 
        className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-8 mt-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            I'm Learning Words
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Simple and smooth vocabulary experience.
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex items-center justify-between"
        >
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Progress</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {learnedCount} <span className="text-gray-400 text-lg font-normal">/ {totalCount}</span>
            </div>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
             <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100 dark:text-gray-700"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-primary drop-shadow-md"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute text-xs font-bold text-primary">{percentage}%</span>
          </div>
        </motion.div>

        {/* Action Grid */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Start Learning</h3>
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/words?filter=all" className="group bg-primary text-white p-6 rounded-2xl shadow-lg shadow-amber-200/50 dark:shadow-none hover:scale-105 transition-transform duration-200 flex flex-col justify-between h-40">
            <Play className="w-8 h-8 bg-white/20 p-1.5 rounded-full" />
            <div>
              <div className="font-bold text-lg">Start Now</div>
              <div className="text-amber-100 text-sm">All words</div>
            </div>
          </Link>

          <Link href="/words?filter=unlearned" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-40">
            <TrendingUp className="w-8 h-8 text-blue-500 bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-full" />
            <div>
              <div className="font-bold text-gray-900 dark:text-white">New Words</div>
              <div className="text-gray-400 text-sm">{totalCount - learnedCount} remaining</div>
            </div>
          </Link>
          
          <Link href="/words?filter=favorites" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-40">
            <Heart className="w-8 h-8 text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-1.5 rounded-full" />
            <div>
              <div className="font-bold text-gray-900 dark:text-white">Favorites</div>
              <div className="text-gray-400 text-sm">{favoriteCount} words</div>
            </div>
          </Link>

           <div className="group bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center h-40 cursor-not-allowed">
            <Grid className="w-8 h-8 text-gray-400 mb-2" />
            <div className="text-gray-400 text-sm font-medium">Coming Soon</div>
          </div>
        </motion.div>

        {/* Wordbooks Section */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Wordbooks</h3>
          <button className="text-primary text-sm font-medium hover:underline">View All</button>
        </div>
        
        <motion.div variants={itemVariants} className="overflow-x-auto no-scrollbar flex gap-4 pb-4">
          {[1, 2, 3].map((i) => (
             <div key={i} className="min-w-[140px] bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-primary">
                  <Book className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">Level {i}</div>
                  <div className="text-xs text-gray-400">150 words</div>
                </div>
             </div>
          ))}
          <div className="min-w-[140px] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-2xl text-gray-400 mb-1">+</span>
            <span className="text-xs text-gray-400 font-medium">Add Book</span>
          </div>
        </motion.div>

      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Home;

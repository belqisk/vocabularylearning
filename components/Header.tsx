'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Settings as SettingsIcon, ChevronLeft } from 'lucide-react';

/**
 * 组件用途 (Component Purpose):
 * 页面顶部导航栏，显示Logo、页面标题和主要导航链接。
 * Top navigation bar, displaying Logo, page title, and main navigation links.
 * 
 * 样式修改点 (Style Mod Points):
 * - 使用 backdrop-blur 实现毛玻璃效果。
 * - Use backdrop-blur for frosted glass effect.
 * - Sticky 定位确保吸顶。
 * - Sticky positioning ensures it stays at the top.
 * 
 * 交互说明 (Interaction Notes):
 * - 根据当前路径高亮显示对应的图标。
 * - Highlight corresponding icons based on current path.
 * - 支持返回按钮配置。
 * - Supports back button configuration.
 */

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 px-4 py-4 bg-opacity-90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 dark:bg-gray-900/90 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Left Section: Back button or Logo */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">VocabFlow</span>
            </div>
          )}
        </div>

        {/* Center Section: Title (if present) */}
        {title && (
          <h1 className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-lg">{title}</h1>
        )}

        {/* Right Section: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link 
            href="/" 
            className={`p-2 rounded-xl transition-all ${isActive('/') ? 'bg-amber-100 text-primary dark:bg-amber-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link 
            href="/words" 
            className={`p-2 rounded-xl transition-all ${isActive('/words') ? 'bg-amber-100 text-primary dark:bg-amber-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <BookOpen className="w-5 h-5" />
          </Link>
          <Link 
            href="/settings" 
            className={`p-2 rounded-xl transition-all ${isActive('/settings') ? 'bg-amber-100 text-primary dark:bg-amber-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

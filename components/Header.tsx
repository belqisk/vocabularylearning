import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Settings as SettingsIcon, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

/**
 * Header Component
 * Displays navigation controls and page title.
 * Interaction: Sticky top, changes content based on props.
 */
const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 px-4 py-4 bg-opacity-90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 dark:bg-gray-900/90 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Left Section: Back button or Logo */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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
            to="/" 
            className={`p-2 rounded-xl transition-all ${isActive('/') ? 'bg-amber-100 text-primary dark:bg-amber-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link 
            to="/words" 
            className={`p-2 rounded-xl transition-all ${isActive('/words') ? 'bg-amber-100 text-primary dark:bg-amber-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <BookOpen className="w-5 h-5" />
          </Link>
          <Link 
            to="/settings" 
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
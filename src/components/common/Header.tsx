import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun, Settings, Bell } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
      <div className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex justify-between items-center">
        <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          🎯 Career Intelligence
        </h1>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate?.('settings')}
            className={`
              relative p-2 sm:p-3 rounded-xl transition-all duration-300 ease-out
              group
              ${isDark 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900'
              }
              hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20
              active:scale-95
            `}
            title="Settings"
          >
            <Settings 
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:rotate-12" 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => onNavigate?.('notifications')}
            className={`
              relative p-2 sm:p-3 rounded-xl transition-all duration-300 ease-out
              group
              ${isDark 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900'
              }
              hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20
              active:scale-95
            `}
            title="Notifications"
          >
            <Bell 
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:rotate-12" 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={toggleTheme}
            className={`
              relative p-2 sm:p-3 rounded-xl transition-all duration-300 ease-out
              group
              ${isDark 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-yellow-400' 
                : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-yellow-600'
              }
              hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/20
              active:scale-95
            `}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? (
              <Sun 
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:rotate-90" 
              />
            ) : (
              <Moon 
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:-rotate-12" 
              />
            )}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

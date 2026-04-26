import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const LoadingSpinner: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="relative w-16 h-16">
        <div className={`absolute inset-0 rounded-full border-4 border-gray-300 ${isDark ? 'border-gray-700' : ''}`}></div>
        <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin`}></div>
      </div>
      <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Analyzing your profile...
      </p>
    </div>
  );
};

export default LoadingSpinner;

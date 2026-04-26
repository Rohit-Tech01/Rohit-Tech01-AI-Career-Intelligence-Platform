import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const { isDark } = useTheme();
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {label && (
        <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}: {current} of {total}
        </p>
      )}
      <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {Math.round(percentage)}%
      </p>
    </div>
  );
};

export default ProgressBar;

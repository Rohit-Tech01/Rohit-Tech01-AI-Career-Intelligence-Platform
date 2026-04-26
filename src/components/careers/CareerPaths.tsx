import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CareerRecommendation, SkillGap } from '../../types';
import { AIService } from '../../services/aiService';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface CareerPathsProps {
  career: CareerRecommendation | null;
  currentSkills?: string[];
}

const CareerPaths: React.FC<CareerPathsProps> = ({ career, currentSkills = [] }) => {
  const { isDark } = useTheme();
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (career) {
      setLoading(true);
      AIService.analyzeSkillGaps(career.title, currentSkills).then((gaps) => {
        setSkillGaps(gaps);
        setLoading(false);
      });
    }
  }, [career, currentSkills]);

  if (!career) {
    return (
      <div className={`p-8 text-center rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Select a career to view skill gaps
        </p>
      </div>
    );
  }

  const hasGaps = skillGaps.length > 0;

  return (
    <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-2 flex items-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          <TrendingUp size={32} className="mr-3" />
          {career.title}
        </h2>
        <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {career.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
            <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-600'}`}>Match Score</p>
            <p className={`text-3xl font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              {career.matchPercentage}%
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
            <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-600'}`}>Avg Salary</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-green-300' : 'text-green-700'}`}>
              {career.averageSalary}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
            <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-purple-600'}`}>Job Outlook</p>
            <p className={`text-lg font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
              {career.jobOutlook}
            </p>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-lg mb-8 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-3">
          {career.requiredSkills.map((skill) => (
            <span
              key={skill}
              className={`px-4 py-2 rounded-full font-medium ${
                currentSkills.includes(skill)
                  ? isDark
                    ? 'bg-green-900 text-green-200'
                    : 'bg-green-100 text-green-800'
                  : isDark
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {currentSkills.includes(skill) ? '✓' : '○'} {skill}
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={`p-6 text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Analyzing skill gaps...</p>
        </div>
      ) : hasGaps ? (
        <div className={`p-6 rounded-lg border-l-4 ${isDark ? 'bg-orange-900 border-orange-500' : 'bg-orange-50 border-orange-500'}`}>
          <h3 className={`text-xl font-bold mb-4 flex items-center ${isDark ? 'text-orange-200' : 'text-orange-800'}`}>
            <AlertCircle size={24} className="mr-2" />
            Skill Gaps to Address
          </h3>

          <div className="space-y-4">
            {skillGaps.map((gap, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${isDark ? 'border-gray-600' : 'border-orange-200'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {gap.skill}
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      gap.importance === 'high'
                        ? 'bg-red-500 text-white'
                        : gap.importance === 'medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {gap.importance.toUpperCase()}
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Current Level: {gap.proficiency}
                </p>
                <div className={`mt-3 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-orange-500"
                    style={{ width: `${gap.importance === 'high' ? 80 : gap.importance === 'medium' ? 50 : 30}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-50'}`}>
            <p className={`${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
              💡 Tip: Focus on high-priority skills first. These are crucial for success in this role.
            </p>
          </div>
        </div>
      ) : (
        <div className={`p-6 text-center rounded-lg ${isDark ? 'bg-green-900' : 'bg-green-50'}`}>
          <p className={`text-lg font-semibold ${isDark ? 'text-green-200' : 'text-green-700'}`}>
            🎉 You have all the required skills for this role!
          </p>
        </div>
      )}
    </div>
  );
};

export default CareerPaths;

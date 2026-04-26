import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, XCircle, Clock, Target, Award, BarChart3 } from 'lucide-react';

interface SkillAssessmentProps {
  userSkills: string[];
  onSkillsUpdate: (skills: string[]) => void;
}

interface SkillCategory {
  category: string;
  skills: {
    name: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
  }[];
}

const SkillAssessment: React.FC<SkillAssessmentProps> = ({ userSkills, onSkillsUpdate }) => {
  const { isDark } = useTheme();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(userSkills);
  const [currentCategory, setCurrentCategory] = useState(0);

  const skillCategories: SkillCategory[] = [
    {
      category: 'Technical Skills',
      skills: [
        { name: 'Python', description: 'Programming language for data science and web development', level: 'intermediate' },
        { name: 'JavaScript', description: 'Web development language for front-end and back-end', level: 'intermediate' },
        { name: 'Java', description: 'Enterprise-level programming language', level: 'advanced' },
        { name: 'SQL', description: 'Database query language', level: 'intermediate' },
        { name: 'React', description: 'Front-end JavaScript framework', level: 'intermediate' },
        { name: 'Node.js', description: 'Back-end JavaScript runtime', level: 'intermediate' },
      ]
    },
    {
      category: 'Data & Analytics',
      skills: [
        { name: 'Data Analysis', description: 'Analyzing and interpreting complex datasets', level: 'intermediate' },
        { name: 'Machine Learning', description: 'Building predictive models and algorithms', level: 'advanced' },
        { name: 'Statistics', description: 'Statistical analysis and probability', level: 'intermediate' },
        { name: 'Data Visualization', description: 'Creating charts and visual representations', level: 'beginner' },
        { name: 'Excel', description: 'Spreadsheet analysis and modeling', level: 'intermediate' },
      ]
    },
    {
      category: 'Design & Creative',
      skills: [
        { name: 'UI/UX Design', description: 'User interface and experience design', level: 'intermediate' },
        { name: 'Graphic Design', description: 'Visual communication and branding', level: 'intermediate' },
        { name: 'Figma', description: 'Collaborative design tool', level: 'beginner' },
        { name: 'Adobe Creative Suite', description: 'Professional design software', level: 'advanced' },
        { name: 'Web Design', description: 'Designing websites and web interfaces', level: 'intermediate' },
      ]
    },
    {
      category: 'Business & Management',
      skills: [
        { name: 'Project Management', description: 'Planning and executing projects', level: 'intermediate' },
        { name: 'Leadership', description: 'Leading teams and organizations', level: 'advanced' },
        { name: 'Communication', description: 'Effective verbal and written communication', level: 'intermediate' },
        { name: 'Marketing', description: 'Promoting products and services', level: 'intermediate' },
        { name: 'Sales', description: 'Selling products and services', level: 'intermediate' },
      ]
    },
    {
      category: 'Soft Skills',
      skills: [
        { name: 'Problem-Solving', description: 'Analytical thinking and solution finding', level: 'intermediate' },
        { name: 'Teamwork', description: 'Collaborating effectively with others', level: 'intermediate' },
        { name: 'Time Management', description: 'Prioritizing and managing time effectively', level: 'beginner' },
        { name: 'Critical Thinking', description: 'Analyzing information objectively', level: 'intermediate' },
        { name: 'Creativity', description: 'Generating innovative ideas and solutions', level: 'intermediate' },
      ]
    }
  ];

  const handleSkillToggle = (skillName: string) => {
    const newSkills = selectedSkills.includes(skillName)
      ? selectedSkills.filter(s => s !== skillName)
      : [...selectedSkills, skillName];
    
    setSelectedSkills(newSkills);
    onSkillsUpdate(newSkills);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'intermediate': return isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      case 'advanced': return isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
      default: return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillStats = () => {
    const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
    const selectedCount = selectedSkills.length;
    const percentage = Math.round((selectedCount / totalSkills) * 100);
    
    return { totalSkills, selectedCount, percentage };
  };

  const stats = getSkillStats();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-6`}>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            🎯 Skill Assessment
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Select the skills you currently have to improve your career recommendations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4`}>
            <div className="flex items-center gap-2">
              <Target className="text-blue-500" size={24} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Skills Selected</p>
                <p className="text-2xl font-bold text-blue-500">{stats.selectedCount}</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4`}>
            <div className="flex items-center gap-2">
              <BarChart3 className="text-green-500" size={24} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Available</p>
                <p className="text-2xl font-bold text-green-500">{stats.totalSkills}</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4`}>
            <div className="flex items-center gap-2">
              <Award className="text-purple-500" size={24} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completion</p>
                <p className="text-2xl font-bold text-purple-500">{stats.percentage}%</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4`}>
            <div className="flex items-center gap-2">
              <Clock className="text-orange-500" size={24} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Categories</p>
                <p className="text-2xl font-bold text-orange-500">{skillCategories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 mb-6`}>
          <div className="flex gap-2 overflow-x-auto">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition ${
                  currentCategory === index
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {skillCategories[currentCategory].category}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories[currentCategory].skills.map((skill, index) => {
              const isSelected = selectedSkills.includes(skill.name);
              
              return (
                <div
                  key={index}
                  onClick={() => handleSkillToggle(skill.name)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                    isSelected
                      ? isDark
                        ? 'border-blue-500 bg-blue-900'
                        : 'border-blue-500 bg-blue-50'
                      : isDark
                      ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                      : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {isSelected ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <XCircle className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {skill.description}
                  </p>
                  
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mt-6`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Assessment Progress
            </span>
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {stats.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;

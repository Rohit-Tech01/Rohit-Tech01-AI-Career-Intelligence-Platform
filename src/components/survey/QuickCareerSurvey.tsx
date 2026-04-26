import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronRight, User, Brain, Heart, Target, Award, CheckCircle, AlertCircle, Briefcase, GraduationCap, Code, Palette, Calculator, Microscope, BookOpen, Users, TrendingUp } from 'lucide-react';

interface QuickCareerSurveyProps {
  onComplete: (data: any) => void;
}

const QuickCareerSurvey: React.FC<QuickCareerSurveyProps> = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    fieldOfStudy: '',
    skills: [] as string[],
    personality: {
      Realistic: 3,
      Investigative: 3,
      Artistic: 3,
      Social: 3,
      Enterprising: 3,
      Conventional: 3
    },
    workEnvironment: '',
    salaryExpectation: '',
    motivation: '',
    dreamCareer: ''
  });

  const questions = [
    {
      id: 'basic',
      title: 'Basic Information',
      icon: User,
      color: 'from-blue-600 to-cyan-600',
      questions: [
        {
          id: 'name',
          type: 'text',
          label: 'What is your full name?',
          placeholder: 'Enter your full name',
          required: true
        },
        {
          id: 'email',
          type: 'email',
          label: 'What is your email address?',
          placeholder: 'your.email@example.com',
          required: true
        }
      ]
    },
    {
      id: 'education',
      title: 'Education & Skills',
      icon: GraduationCap,
      color: 'from-purple-600 to-pink-600',
      questions: [
        {
          id: 'education',
          type: 'radio',
          label: 'What is your highest education level?',
          options: [
            'High School',
            'Diploma',
            "Bachelor's Degree",
            "Master's Degree",
            'PhD'
          ],
          required: true
        },
        {
          id: 'fieldOfStudy',
          type: 'radio',
          label: 'What is your field of study?',
          options: [
            'Computer Science',
            'Engineering',
            'Business',
            'Design',
            'Psychology',
            'Education',
            'Marketing',
            'Healthcare',
            'Other'
          ],
          required: true
        },
        {
          id: 'skills',
          type: 'multi-select',
          label: 'Select your top 5 skills',
          options: [
            'Programming (Python, Java, JavaScript)',
            'Web Development',
            'Data Analysis',
            'Machine Learning',
            'UI/UX Design',
            'Project Management',
            'Digital Marketing',
            'Communication',
            'Leadership',
            'Problem-Solving',
            'Teaching',
            'Sales',
            'Financial Analysis',
            'Content Writing',
            'Research'
          ]
        }
      ]
    },
    {
      id: 'personality',
      title: 'Work Style',
      icon: Brain,
      color: 'from-green-600 to-teal-600',
      questions: [
        {
          id: 'personality',
          type: 'holland',
          label: 'Rate your work preferences (1-5)',
          traits: [
            { name: 'Realistic', description: 'Working with hands, tools, and machines' },
            { name: 'Investigative', description: 'Research, analysis, and problem-solving' },
            { name: 'Artistic', description: 'Creative expression and design' },
            { name: 'Social', description: 'Helping, teaching, and working with people' },
            { name: 'Enterprising', description: 'Leadership, business, and persuasion' },
            { name: 'Conventional', description: 'Organization, data, and structure' }
          ]
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Work Preferences',
      icon: Heart,
      color: 'from-orange-600 to-red-600',
      questions: [
        {
          id: 'workEnvironment',
          type: 'radio',
          label: 'Where do you prefer to work?',
          options: [
            'Office / Corporate',
            'Remote / Work from home',
            'Hybrid (Office + Remote)',
            'Startup / Fast-paced',
            'Healthcare facility',
            'Educational institution',
            'Creative studio'
          ]
        },
        {
          id: 'salaryExpectation',
          type: 'radio',
          label: 'What is your expected annual salary?',
          options: [
            'Under $30,000',
            '$30,000 - $50,000',
            '$50,000 - $75,000',
            '$75,000 - $100,000',
            '$100,000 - $150,000',
            'Over $150,000'
          ]
        },
        {
          id: 'motivation',
          type: 'radio',
          label: 'What motivates you most in a career?',
          options: [
            'High salary and financial success',
            'Work-life balance and flexibility',
            'Making a difference in society',
            'Continuous learning and growth',
            'Leadership opportunities',
            'Creative expression and innovation',
            'Helping others directly',
            'Technical challenges and problem-solving'
          ]
        }
      ]
    },
    {
      id: 'goals',
      title: 'Career Goals',
      icon: Target,
      color: 'from-indigo-600 to-purple-600',
      questions: [
        {
          id: 'dreamCareer',
          type: 'text',
          label: 'What is your dream career or job title?',
          placeholder: 'If you could have any job, what would it be?'
        }
      ]
    }
  ];

  const currentSection = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePersonalityChange = (trait: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [trait]: value
      }
    }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value];
      
      // Limit to 5 skills
      if (field === 'skills' && newArray.length > 5) {
        return prev;
      }
      
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion = () => {
    const currentQuestions = currentSection.questions;

    return currentQuestions.map((q, index) => {
      switch (q.type) {
        case 'text':
        case 'email':
          return (
            <div key={q.id} className="mb-6">
              <label className={`block text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {q.label}
                {q.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={q.type}
                value={formData[q.id as keyof typeof formData] as string || ''}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                required={q.required}
                className={`w-full px-6 py-4 text-lg rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          );

        case 'radio':
          return (
            <div key={q.id} className="mb-6">
              <label className={`block text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {q.label}
                {q.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="space-y-3">
                {q.options?.map((option) => (
                  <label key={option} className="flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={formData[q.id as keyof typeof formData] === option}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      className="w-5 h-5 text-purple-600"
                    />
                    <span className={`ml-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          );

        case 'multi-select':
          return (
            <div key={q.id} className="mb-6">
              <label className={`block text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {q.label}
                {q.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options?.map((option) => (
                  <label key={option} className="flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105">
                    <input
                      type="checkbox"
                      checked={(formData[q.id as keyof typeof formData] as string[]).includes(option)}
                      onChange={() => handleMultiSelect(q.id, option)}
                      className="w-5 h-5 text-purple-600"
                    />
                    <span className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{option}</span>
                  </label>
                ))}
              </div>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Selected: {(formData[q.id as keyof typeof formData] as string[]).length}/5
              </p>
            </div>
          );

        case 'holland':
          return (
            <div key={q.id} className="mb-6">
              <label className={`block text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {q.label}
              </label>
              <div className="space-y-4">
                {q.traits?.map((trait) => (
                  <div key={trait.name} className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {trait.name}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {trait.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          onClick={() => handlePersonalityChange(trait.name, value)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            formData.personality[trait.name as keyof typeof formData.personality] >= value
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                      <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formData.personality[trait.name as keyof typeof formData.personality]}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${currentSection.color} rounded-xl flex items-center justify-center`}>
                  {React.createElement(currentSection.icon, { className: "text-white", size: 24 })}
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {currentSection.title}
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Quick Career Assessment
                  </p>
                </div>
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {Math.round(progress)}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className={`p-8 rounded-3xl backdrop-blur-xl border-2 shadow-2xl ${
            isDark 
              ? 'bg-gray-800/80 border-purple-500/30' 
              : 'bg-white/80 border-purple-500/30'
          }`}>
            <div className="min-h-[400px]">
              {renderQuestion()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`
                  relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                  transition-all duration-300 ease-out
                  group
                  ${currentQuestion === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:scale-105 hover:shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 hover:scale-105 hover:shadow-lg'
                  }
                  active:scale-95
                `}
              >
                <ChevronRight 
                  size={20} 
                  className="transform rotate-180 transition-transform duration-300 group-hover:-translate-x-1" 
                />
                Previous
              </button>

              <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Section {currentQuestion + 1} of {questions.length}
              </div>

              <button
                onClick={handleNext}
                className={`
                  relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-purple-600 to-pink-600 text-white
                  shadow-2xl
                  transition-all duration-300 ease-out
                  group
                  hover:shadow-3xl hover:shadow-purple-500/30
                  hover:scale-105
                  active:scale-95
                `}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
                
                {currentQuestion === questions.length - 1 ? (
                  <>
                    Complete Survey
                    <Award 
                      size={20} 
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
                    />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight 
                      size={20} 
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1" 
                    />
                  </>
                )}
                
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCareerSurvey;

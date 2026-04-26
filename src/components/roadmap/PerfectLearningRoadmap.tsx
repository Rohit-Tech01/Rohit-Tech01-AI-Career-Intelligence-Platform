import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronRight, Play, BookOpen, Award, Clock, Star, CheckCircle, Lock, ExternalLink, Users, Target, TrendingUp, Brain, Code, Palette, Calculator, Microscope, Briefcase, Heart } from 'lucide-react';

interface PerfectLearningRoadmapProps {
  surveyData?: any;
}

const PerfectLearningRoadmap: React.FC<PerfectLearningRoadmapProps> = ({ surveyData }) => {
  const { isDark } = useTheme();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const learningPaths = [
    {
      id: 'software-development',
      title: 'Software Development',
      icon: Code,
      description: 'Master programming and build amazing applications',
      duration: '6-12 months',
      difficulty: 'Intermediate',
      color: 'from-blue-600 to-cyan-600',
      modules: [
        {
          id: 'fundamentals',
          title: 'Programming Fundamentals',
          duration: '4 weeks',
          lessons: [
            {
              title: 'Introduction to Programming',
              type: 'video',
              duration: '45 min',
              completed: false,
              url: 'https://www.coursera.org/learn/python-programming-introduction'
            },
            {
              title: 'Variables and Data Types',
              type: 'article',
              duration: '30 min',
              completed: false,
              url: 'https://www.geeksforgeeks.org/variables-and-data-types/'
            },
            {
              title: 'Control Structures',
              type: 'video',
              duration: '60 min',
              completed: false,
              url: 'https://www.udemy.com/course/control-structures/'
            },
            {
              title: 'Functions and Methods',
              type: 'practice',
              duration: '90 min',
              completed: false,
              url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript'
            }
          ]
        },
        {
          id: 'web-development',
          title: 'Web Development',
          duration: '6 weeks',
          lessons: [
            {
              title: 'HTML & CSS Basics',
              type: 'video',
              duration: '90 min',
              completed: false,
              url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/'
            },
            {
              title: 'JavaScript Fundamentals',
              type: 'video',
              duration: '120 min',
              completed: false,
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
            },
            {
              title: 'React Framework',
              type: 'course',
              duration: '8 hours',
              completed: false,
              url: 'https://reactjs.org/tutorial/tutorial.html'
            },
            {
              title: 'Build Your First App',
              type: 'project',
              duration: '10 hours',
              completed: false,
              url: 'https://github.com/topics/sample-app'
            }
          ]
        },
        {
          id: 'advanced-concepts',
          title: 'Advanced Concepts',
          duration: '8 weeks',
          lessons: [
            {
              title: 'Data Structures & Algorithms',
              type: 'course',
              duration: '12 hours',
              completed: false,
              url: 'https://www.coursera.org/learn/data-structures-algorithms'
            },
            {
              title: 'Database Design',
              type: 'video',
              duration: '6 hours',
              completed: false,
              url: 'https://www.udemy.com/course/database-design/'
            },
            {
              title: 'API Development',
              type: 'practice',
              duration: '8 hours',
              completed: false,
              url: 'https://www.restapitutorial.com/'
            },
            {
              title: 'Cloud Deployment',
              type: 'course',
              duration: '4 hours',
              completed: false,
              url: 'https://aws.amazon.com/getting-started/'
            }
          ]
        }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science & AI',
      icon: Brain,
      description: 'Explore machine learning and artificial intelligence',
      duration: '8-14 months',
      difficulty: 'Advanced',
      color: 'from-purple-600 to-pink-600',
      modules: [
        {
          id: 'data-fundamentals',
          title: 'Data Science Fundamentals',
          duration: '6 weeks',
          lessons: [
            {
              title: 'Introduction to Data Science',
              type: 'video',
              duration: '60 min',
              completed: false,
              url: 'https://www.coursera.org/learn/data-science-introduction'
            },
            {
              title: 'Statistics and Probability',
              type: 'course',
              duration: '10 hours',
              completed: false,
              url: 'https://www.khanacademy.org/math/statistics-probability'
            },
            {
              title: 'Data Visualization',
              type: 'practice',
              duration: '4 hours',
              completed: false,
              url: 'https://www.tableau.com/learn/training'
            },
            {
              title: 'Python for Data Science',
              type: 'course',
              duration: '8 hours',
              completed: false,
              url: 'https://www.coursera.org/learn/python-for-applied-data-science'
            }
          ]
        },
        {
          id: 'machine-learning',
          title: 'Machine Learning',
          duration: '10 weeks',
          lessons: [
            {
              title: 'Supervised Learning',
              type: 'video',
              duration: '90 min',
              completed: false,
              url: 'https://www.coursera.org/learn/machine-learning'
            },
            {
              title: 'Unsupervised Learning',
              type: 'video',
              duration: '75 min',
              completed: false,
              url: 'https://www.coursera.org/learn/unsupervised-learning'
            },
            {
              title: 'Deep Learning Fundamentals',
              type: 'course',
              duration: '12 hours',
              completed: false,
              url: 'https://www.deeplearning.ai/'
            },
            {
              title: 'Build ML Models',
              type: 'project',
              duration: '20 hours',
              completed: false,
              url: 'https://www.kaggle.com/learn'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      icon: Palette,
      description: 'Create beautiful user experiences and interfaces',
      duration: '4-8 months',
      difficulty: 'Beginner',
      color: 'from-green-600 to-teal-600',
      modules: [
        {
          id: 'design-principles',
          title: 'Design Principles',
          duration: '4 weeks',
          lessons: [
            {
              title: 'Introduction to Design',
              type: 'video',
              duration: '45 min',
              completed: false,
              url: 'https://www.coursera.org/learn/ui-design'
            },
            {
              title: 'Color Theory',
              type: 'article',
              duration: '30 min',
              completed: false,
              url: 'https://www.smashingmagazine.com/2019/07/color-theory-practical-design/'
            },
            {
              title: 'Typography',
              type: 'video',
              duration: '60 min',
              completed: false,
              url: 'https://www.coursera.org/learn/typography'
            },
            {
              title: 'Layout and Composition',
              type: 'practice',
              duration: '2 hours',
              completed: false,
              url: 'https://www.figma.com/templates/design-principles/'
            }
          ]
        },
        {
          id: 'ux-research',
          title: 'User Experience Research',
          duration: '6 weeks',
          lessons: [
            {
              title: 'User Research Methods',
              type: 'video',
              duration: '75 min',
              completed: false,
              url: 'https://www.interaction-design.org/literature/topics/user-research'
            },
            {
              title: 'Usability Testing',
              type: 'course',
              duration: '4 hours',
              completed: false,
              url: 'https://www.coursera.org/learn/usability-testing'
            },
            {
              title: 'User Personas',
              type: 'practice',
              duration: '3 hours',
              completed: false,
              url: 'https://www.usability.gov/how-to-and-tools/methods/personas.html'
            },
            {
              title: 'Journey Mapping',
              type: 'project',
              duration: '5 hours',
              completed: false,
              url: 'https://www.nngroup.com/articles/journey-mapping-101/'
            }
          ]
        }
      ]
    },
    {
      id: 'business-analytics',
      title: 'Business Analytics',
      icon: Calculator,
      description: 'Analyze data and drive business decisions',
      duration: '6-10 months',
      difficulty: 'Intermediate',
      color: 'from-orange-600 to-red-600',
      modules: [
        {
          id: 'business-fundamentals',
          title: 'Business Fundamentals',
          duration: '4 weeks',
          lessons: [
            {
              title: 'Business Analysis Basics',
              type: 'video',
              duration: '60 min',
              completed: false,
              url: 'https://www.coursera.org/learn/business-analytics'
            },
            {
              title: 'Financial Analysis',
              type: 'course',
              duration: '8 hours',
              completed: false,
              url: 'https://www.edx.org/course/financial-analysis'
            },
            {
              title: 'Market Research',
              type: 'practice',
              duration: '4 hours',
              completed: false,
              url: 'https://www.surveymonkey.com/mp/market-research-surveys/'
            },
            {
              title: 'Business Intelligence Tools',
              type: 'course',
              duration: '6 hours',
              completed: false,
              url: 'https://www.microsoft.com/en-us/power-platform/products/power-bi'
            }
          ]
        },
        {
          id: 'data-analysis',
          title: 'Data Analysis',
          duration: '8 weeks',
          lessons: [
            {
              title: 'Excel for Business',
              type: 'video',
              duration: '90 min',
              completed: false,
              url: 'https://www.excel-easy.com/'
            },
            {
              title: 'SQL for Analytics',
              type: 'course',
              duration: '10 hours',
              completed: false,
              url: 'https://www.mode.com/sql-tutorial'
            },
            {
              title: 'Tableau Visualization',
              type: 'practice',
              duration: '6 hours',
              completed: false,
              url: 'https://public.tableau.com/en-us/s/resources'
            },
            {
              title: 'Business Reporting',
              type: 'project',
              duration: '8 hours',
              completed: false,
              url: 'https://www.microsoft.com/en-us/power-platform/products/power-bi'
            }
          ]
        }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Medicine',
      icon: Microscope,
      description: 'Pursue careers in healthcare and medical fields',
      duration: '2-8 years',
      difficulty: 'Advanced',
      color: 'from-red-600 to-pink-600',
      modules: [
        {
          id: 'medical-basics',
          title: 'Medical Fundamentals',
          duration: '12 weeks',
          lessons: [
            {
              title: 'Introduction to Healthcare',
              type: 'video',
              duration: '90 min',
              completed: false,
              url: 'https://www.coursera.org/learn/healthcare-introduction'
            },
            {
              title: 'Medical Terminology',
              type: 'course',
              duration: '15 hours',
              completed: false,
              url: 'https://www.desales.edu/academics/undergraduate-programs/medical-terminology-certificate'
            },
            {
              title: 'Anatomy and Physiology',
              type: 'video',
              duration: '20 hours',
              completed: false,
              url: 'https://www.khanacademy.org/science/health-and-medicine'
            },
            {
              title: 'Healthcare Ethics',
              type: 'article',
              duration: '2 hours',
              completed: false,
              url: 'https://www.ama-assn.org/delivering-care/ethics'
            }
          ]
        }
      ]
    },
    {
      id: 'education',
      title: 'Education & Teaching',
      icon: BookOpen,
      description: 'Shape minds and inspire future generations',
      duration: '4-6 years',
      difficulty: 'Intermediate',
      color: 'from-indigo-600 to-purple-600',
      modules: [
        {
          id: 'teaching-fundamentals',
          title: 'Teaching Fundamentals',
          duration: '8 weeks',
          lessons: [
            {
              title: 'Introduction to Teaching',
              type: 'video',
              duration: '60 min',
              completed: false,
              url: 'https://www.coursera.org/learn/teaching-techniques'
            },
            {
              title: 'Learning Theories',
              type: 'course',
              duration: '8 hours',
              completed: false,
              url: 'https://www.edx.org/learn/learning-theories'
            },
            {
              title: 'Classroom Management',
              type: 'practice',
              duration: '4 hours',
              completed: false,
              url: 'https://www.edutopia.org/classroom-management'
            },
            {
              title: 'Curriculum Development',
              type: 'project',
              duration: '6 hours',
              completed: false,
              url: 'https://www.teachthought.com/pedagogy/what-is-curriculum/'
            }
          ]
        }
      ]
    }
  ];

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'article': return BookOpen;
      case 'course': return Award;
      case 'practice': return Target;
      case 'project': return Briefcase;
      default: return BookOpen;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-600 bg-blue-100';
      case 'article': return 'text-green-600 bg-green-100';
      case 'course': return 'text-purple-600 bg-purple-100';
      case 'practice': return 'text-orange-600 bg-orange-100';
      case 'project': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-10" />
        <div className="relative z-10 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Your Personalized Learning Roadmap
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Choose your career path and start your learning journey today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.id}
                className={`rounded-2xl backdrop-blur-xl border-2 shadow-2xl transform transition-all duration-300 hover:scale-105 ${
                  selectedPath === path.id
                    ? 'ring-4 ring-purple-500 border-purple-500'
                    : isDark
                    ? 'bg-gray-800/80 border-gray-700/50'
                    : 'bg-white/80 border-gray-200/50'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {path.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {path.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {path.duration}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      path.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {path.difficulty}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPath(path.id)}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedPath === path.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPath === path.id ? 'Selected' : 'Select Path'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Path Details */}
        {selectedPath && (
          <div className="mt-8">
            {learningPaths
              .filter(path => path.id === selectedPath)
              .map(path => (
                <div key={path.id} className={`rounded-2xl backdrop-blur-xl border-2 shadow-2xl ${
                  isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
                }`}>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${path.color} rounded-xl flex items-center justify-center`}>
                        {React.createElement(path.icon, { className: "text-white", size: 24 })}
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {path.title} Learning Path
                        </h2>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Complete all modules to earn your certificate
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {path.modules.map((module, moduleIndex) => (
                        <div key={module.id} className={`rounded-xl border ${
                          isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-50/50 border-gray-200/50'
                        }`}>
                          <div
                            className="p-6 cursor-pointer"
                            onClick={() => toggleModule(module.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center`}>
                                  <span className="text-white font-bold">{moduleIndex + 1}</span>
                                </div>
                                <div>
                                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {module.title}
                                  </h3>
                                  <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Clock size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {module.duration}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <BookOpen size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {module.lessons.length} lessons
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight
                                className={`transform transition-transform duration-300 ${
                                  expandedModules.has(module.id) ? 'rotate-90' : ''
                                } ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                                size={20}
                              />
                            </div>
                          </div>

                          {expandedModules.has(module.id) && (
                            <div className="px-6 pb-6">
                              <div className="space-y-3">
                                {module.lessons.map((lesson, lessonIndex) => {
                                  const LessonIcon = getLessonIcon(lesson.type);
                                  return (
                                    <div key={lessonIndex} className={`flex items-center gap-4 p-4 rounded-lg ${
                                      isDark ? 'bg-gray-800/50' : 'bg-white/50'
                                    }`}>
                                      <div className={`w-10 h-10 ${getLessonTypeColor(lesson.type)} rounded-lg flex items-center justify-center`}>
                                        <LessonIcon size={20} />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                          {lesson.title}
                                        </h4>
                                        <div className="flex items-center gap-4 mt-1">
                                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {lesson.type}
                                          </span>
                                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {lesson.duration}
                                          </span>
                                        </div>
                                      </div>
                                      <a
                                        href={lesson.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                          lesson.completed
                                            ? 'bg-green-100 text-green-700'
                                            : isDark
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                      >
                                        {lesson.completed ? (
                                          <>
                                            <CheckCircle size={16} className="inline mr-1" />
                                            Completed
                                          </>
                                        ) : (
                                          <>
                                            <ExternalLink size={16} className="inline mr-1" />
                                            Start
                                          </>
                                        )}
                                      </a>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfectLearningRoadmap;

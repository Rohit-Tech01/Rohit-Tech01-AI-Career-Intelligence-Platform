import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import Header from './src/components/common/Header';
import SimpleLoginPage from './src/components/auth/SimpleLoginPage';
import FixedUltimateAIHomePage from './src/components/home/FixedUltimateAIHomePage';
import AdvancedResumeChatbot from './src/components/dashboard/AdvancedResumeChatbot';
import ComprehensiveDashboard from './src/components/dashboard/ComprehensiveDashboard';
import QuickCareerSurvey from './src/components/survey/QuickCareerSurvey';
import PerfectLearningRoadmap from './src/components/roadmap/PerfectLearningRoadmap';
import SkillAssessment from './src/components/assessment/SkillAssessment';
import EnhancedResourcesPage from './src/components/resources/EnhancedResourcesPage';
import SettingsPage from './src/components/settings/SettingsPage';
import NotificationsPage from './src/components/notifications/NotificationsPage';
import CareerPaths from './src/components/careers/CareerPaths';
import AICareerChatbot from './src/components/chat/AICareerChatbot';
import LoadingSpinner from './src/components/common/LoadingSpinner';
import { CareerReport, HollandCode } from './src/types';
import { AIService } from './src/services/aiService';
import { Home, FileText, Brain, BarChart3, BookOpen, Target, Award, Library, Settings, Bell, Download } from 'lucide-react';

function AppContent() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [careerReport, setCareerReport] = useState<CareerReport | null>(null);
  const [selectedCareer, setSelectedCareer] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);

  useEffect(() => {
    const savedReport = localStorage.getItem('careerReport');
    const savedSurvey = localStorage.getItem('surveyData');

    if (savedReport) {
      setCareerReport(JSON.parse(savedReport));
    }
    if (savedSurvey) {
      setSurveyData(JSON.parse(savedSurvey));
      setHasCompletedSurvey(true);
    }
  }, []);

  useEffect(() => {
    if (!hasCompletedSurvey) {
      const savedSurveyData = localStorage.getItem('surveyData');
      if (savedSurveyData) {
        setSurveyData(JSON.parse(savedSurveyData));
        setHasCompletedSurvey(true);
        setActiveTab('dashboard');
      } else {
        setActiveTab('survey');
      }
    }
  }, [hasCompletedSurvey]);

  const handleSurveyComplete = (data: any) => {
    setSurveyData(data);
    setHasCompletedSurvey(true);
    localStorage.setItem('surveyData', JSON.stringify(data));
    setCurrentSkills(data.skills || []);

    const hollandCode: HollandCode = {
      Realistic: data.personality?.Realistic || 0,
      Investigative: data.personality?.Investigative || 0,
      Artistic: data.personality?.Artistic || 0,
      Social: data.personality?.Social || 0,
      Enterprising: data.personality?.Enterprising || 0,
      Conventional: data.personality?.Conventional || 0
    };

    setActiveTab('dashboard');
  };

  const handleQuizComplete = async (answers: { [key: number]: string }) => {
    setIsAnalyzing(true);

    try {
      const hollandCode = AIService.calculateHollandCode(answers) as HollandCode;
      const careerRecommendations = await AIService.generateCareerRecommendations(
        hollandCode,
        currentSkills
      );

      const learningRoadmap = await AIService.generateLearningRoadmap(
        careerRecommendations[0]?.title || 'Career Path',
        currentSkills
      );

      const newReport: CareerReport = {
        id: Date.now().toString(),
        userId: 'user-' + Date.now(),
        createdAt: new Date().toISOString(),
        resumeAnalysis: {
          skills: currentSkills,
          experience: ['Professional experience in various roles'],
          education: ['Higher education degree'],
          strengths: ['Adaptable', 'Quick learner', 'Problem solver'],
          weaknesses: ['Areas for growth and development'],
        },
        hollandCode,
        careerRecommendations: careerRecommendations as any,
        learningRoadmap: [learningRoadmap],
        skillGaps: [],
      };

      setCareerReport(newReport);
      localStorage.setItem('careerReport', JSON.stringify(newReport));
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResumeComplete = (skills: string[]) => {
    setCurrentSkills(skills);
    setActiveTab('quiz');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isAnalyzing) {
    return <LoadingSpinner />;
  }

  // Show login page first if not logged in
  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <SimpleLoginPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'survey', label: 'Career Survey', icon: Target },
    { id: 'assessment', label: 'Skills', icon: Award },
    { id: 'dashboard', label: 'Analysis', icon: BarChart3 },
    { id: 'roadmap', label: 'Learning Path', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Library },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {activeTab !== 'home' && <Header onNavigate={setActiveTab} />}

      <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Tab Navigation - Hide on home page */}
        {activeTab !== 'home' && (
          <div className={`mb-4 sm:mb-6 lg:mb-8 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} p-3 sm:p-4 lg:p-5 rounded-xl shadow-lg backdrop-blur-sm`}>
            <div className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide items-center justify-center sm:justify-start flex-wrap">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-3.5 rounded-lg whitespace-nowrap text-sm sm:text-base font-medium
                      transition-all duration-300 ease-out
                      group flex-shrink-0 min-w-fit
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20'
                        : isDark
                        ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                        : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                      }
                      hover:scale-102
                      active:scale-98
                    `}
                  >
                    {/* Active indicator glow */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-sm animate-pulse" />
                    )}
                    
                    {/* Icon with animation */}
                    <Icon
                      size={18}
                      className={`
                        flex-shrink-0 transition-transform duration-300
                        ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                      `}
                    />
                    
                    {/* Text - hide on very small screens for some tabs */}
                    <span className="relative z-10 hidden sm:inline">
                      {tab.label}
                    </span>
                    {/* Shorter text for mobile */}
                    <span className="relative z-10 sm:hidden">
                      {tab.id === 'survey' ? 'Survey' : 
                       tab.id === 'assessment' ? 'Skills' :
                       tab.id === 'dashboard' ? 'Analysis' :
                       tab.id === 'roadmap' ? 'Path' :
                       tab.id === 'resources' ? 'Resources' :
                       tab.id === 'settings' ? 'Settings' :
                       tab.id === 'notifications' ? 'Notify' : tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          {activeTab === 'home' && <FixedUltimateAIHomePage onStartSurvey={() => setActiveTab('survey')} onNavigate={setActiveTab} />}

          {activeTab === 'survey' && <QuickCareerSurvey onComplete={handleSurveyComplete} />}

          {activeTab === 'assessment' && (
            <SkillAssessment 
              userSkills={currentSkills} 
              onSkillsUpdate={(skills) => setCurrentSkills(skills)} 
            />
          )}

          {activeTab === 'dashboard' && (
            surveyData ? (
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <AdvancedResumeChatbot onStartSurvey={() => setActiveTab('survey')} />
                <ComprehensiveDashboard surveyData={surveyData} />
              </div>
            ) : (
              <div className={`p-4 sm:p-6 lg:p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
                <h2 className={`text-xl sm:text-2xl lg:text-2xl font-bold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Complete the Survey First
                </h2>
                <p className={`text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Please complete the career analysis survey to view your dashboard
                </p>
                <button
                  onClick={() => setActiveTab('survey')}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition text-sm sm:text-base"
                >
                  Take Survey Now
                </button>
              </div>
            )
          )}

          {activeTab === 'roadmap' && <PerfectLearningRoadmap surveyData={surveyData} />}

          {activeTab === 'resources' && <EnhancedResourcesPage />}

          {activeTab === 'settings' && <SettingsPage />}

          {activeTab === 'notifications' && <NotificationsPage />}
        </div>

        {/* Sidebar with Career Details and Chat */}
        {careerReport && (careerReport as any).careerRecommendations && (careerReport as any).careerRecommendations.length > 0 && activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <CareerPaths
                career={(careerReport as any).careerRecommendations[selectedCareer]}
                currentSkills={(careerReport as any).resumeAnalysis?.skills || currentSkills}
              />
            </div>

            <div className="lg:col-span-1">
              <AICareerChatbot />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

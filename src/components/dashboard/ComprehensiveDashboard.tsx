import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, AreaChart, Area, Treemap } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { Download, Users, Target, Briefcase, Brain, ExternalLink, Play, BookOpen, Award, Clock, Star, TrendingUp, DollarSign, Building, MapPin, Calendar, Eye, Heart, Zap, Shield, Rocket, Globe, Lightbulb, Sparkles, ChevronRight, Activity, PieChart as PieChartIcon, BarChart3, TrendingDown, Filter, Search, Bell, Settings, User, Mail, Phone, Linkedin, Twitter, Github, FileText } from 'lucide-react';
import { generateProfessionalPDF, generateProfessionalWord, generateProfessionalExcel } from '../reports/ProfessionalReportGenerator';

interface SurveyData {
  name: string;
  education: string;
  fieldOfStudy: string;
  skills: string[];
  personality: {
    Investigative: number;
    Artistic: number;
    Social: number;
    Enterprising: number;
    Realistic: number;
    Conventional: number;
  };
  workEnvironment: string;
  salaryExpectation: string;
  motivation: string;
  dreamCareer: string;
}

interface CareerMatch {
  title: string;
  matchPercentage: number;
  requiredSkills: string[];
  averageSalary: string;
  jobOutlook: string;
  description: string;
  courses: CourseLink[];
  companies: string[];
  jobBoards: string[];
  marketTrends: MarketTrend[];
  futureScope: FutureScope;
  growthRate: number;
  demandLevel: string;
  competitionLevel: string;
  workLifeBalance: number;
  requiredEducation: string;
  experienceLevel: string;
  remoteWorkOption: boolean;
  globalDemand: GlobalDemand[];
  industryInsights: string[];
}

interface CourseLink {
  title: string;
  provider: string;
  url: string;
  duration: string;
  price: string;
  level: string;
  rating: number;
  students: number;
}

interface MarketTrend {
  year: number;
  demand: number;
  salary: number;
  jobOpenings: number;
}

interface FutureScope {
  next5Years: string;
  automationRisk: string;
  emergingRoles: string[];
  skillsInDemand: string[];
  globalOpportunities: string[];
}

interface GlobalDemand {
  region: string;
  demand: number;
  averageSalary: string;
  growthRate: number;
}

interface ComprehensiveDashboardProps {
  surveyData: SurveyData;
}

const ComprehensiveDashboard: React.FC<ComprehensiveDashboardProps> = ({ surveyData }) => {
  const { isDark } = useTheme();
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('5years');
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Enhanced career matching with comprehensive data
  const careerMatches = useMemo(() => {
    const careers = [
      {
        title: 'Data Scientist',
        requiredSkills: ['Python', 'Data Analysis', 'Problem-Solving'],
        personality: ['Investigative'],
        avgSalary: '$120,000',
        outlook: 'Excellent (22% growth)',
        description: 'Analyze complex data to help companies make decisions',
        courses: [
          {
            title: 'Data Science Specialization',
            provider: 'Coursera',
            url: 'https://www.coursera.org/specializations/data-science',
            duration: '11 months',
            price: '$49/month',
            level: 'Beginner to Advanced',
            rating: 4.8,
            students: 125000
          },
          {
            title: 'Complete Data Science Bootcamp',
            provider: 'Udemy',
            url: 'https://www.udemy.com/course/data-science-bootcamp',
            duration: '25 hours',
            price: '$89.99',
            level: 'Beginner',
            rating: 4.7,
            students: 450000
          }
        ],
        companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Spotify'],
        jobBoards: [
          'https://www.linkedin.com/jobs/data-scientist-jobs',
          'https://www.indeed.com/q-data-scientist-jobs.html',
          'https://www.kaggle.com/jobs'
        ],
        growthRate: 22,
        demandLevel: 'Very High',
        competitionLevel: 'High',
        workLifeBalance: 4,
        requiredEducation: 'Bachelor\'s Degree',
        experienceLevel: '2-5 years',
        remoteWorkOption: true,
        marketTrends: [
          { year: 2019, demand: 65, salary: 95000, jobOpenings: 12000 },
          { year: 2020, demand: 72, salary: 105000, jobOpenings: 15000 },
          { year: 2021, demand: 78, salary: 110000, jobOpenings: 18000 },
          { year: 2022, demand: 85, salary: 115000, jobOpenings: 22000 },
          { year: 2023, demand: 92, salary: 120000, jobOpenings: 28000 },
          { year: 2024, demand: 98, salary: 125000, jobOpenings: 35000 },
          { year: 2025, demand: 105, salary: 132000, jobOpenings: 42000 },
          { year: 2026, demand: 112, salary: 140000, jobOpenings: 50000 },
          { year: 2027, demand: 120, salary: 148000, jobOpenings: 58000 }
        ],
        futureScope: {
          next5Years: '35% growth with AI and ML integration',
          automationRisk: 'Low (15%)',
          emergingRoles: ['AI Specialist', 'ML Engineer', 'Data Ethicist', 'Quantum Analyst'],
          skillsInDemand: ['Python', 'TensorFlow', 'AWS', 'Big Data', 'NLP'],
          globalOpportunities: ['USA', 'UK', 'Canada', 'Germany', 'Australia', 'Singapore']
        },
        globalDemand: [
          { region: 'North America', demand: 95, averageSalary: '$130,000', growthRate: 25 },
          { region: 'Europe', demand: 88, averageSalary: '$85,000', growthRate: 20 },
          { region: 'Asia Pacific', demand: 92, averageSalary: '$75,000', growthRate: 30 },
          { region: 'Middle East', demand: 75, averageSalary: '$90,000', growthRate: 18 }
        ],
        industryInsights: [
          'Healthcare sector leading adoption with 40% growth',
          'Finance industry investing $50B in data science',
          'Retail sector using predictive analytics for inventory',
          'Government agencies increasing data-driven policies'
        ]
      },
      {
        title: 'Software Developer',
        requiredSkills: ['Programming', 'Problem-Solving'],
        personality: ['Investigative', 'Realistic'],
        avgSalary: '$110,000',
        outlook: 'Excellent (25% growth)',
        description: 'Design and develop software applications',
        courses: [
          {
            title: 'Full Stack Web Development',
            provider: 'Coursera',
            url: 'https://www.coursera.org/specializations/full-stack',
            duration: '6 months',
            price: '$49/month',
            level: 'Beginner',
            rating: 4.7,
            students: 98000
          }
        ],
        companies: ['Google', 'Microsoft', 'Apple', 'Meta', 'Netflix', 'Uber', 'Airbnb'],
        jobBoards: [
          'https://stackoverflow.com/jobs/developer-jobs',
          'https://www.github.com/jobs',
          'https://www.angel.co/jobs'
        ],
        growthRate: 25,
        demandLevel: 'Very High',
        competitionLevel: 'Very High',
        workLifeBalance: 3,
        requiredEducation: 'Bachelor\'s Degree',
        experienceLevel: '1-3 years',
        remoteWorkOption: true,
        marketTrends: [
          { year: 2019, demand: 78, salary: 90000, jobOpenings: 25000 },
          { year: 2020, demand: 82, salary: 95000, jobOpenings: 28000 },
          { year: 2021, demand: 87, salary: 100000, jobOpenings: 32000 },
          { year: 2022, demand: 92, salary: 105000, jobOpenings: 38000 },
          { year: 2023, demand: 96, salary: 110000, jobOpenings: 45000 },
          { year: 2024, demand: 100, salary: 115000, jobOpenings: 52000 },
          { year: 2025, demand: 105, salary: 122000, jobOpenings: 60000 },
          { year: 2026, demand: 110, salary: 130000, jobOpenings: 68000 },
          { year: 2027, demand: 115, salary: 138000, jobOpenings: 76000 }
        ],
        futureScope: {
          next5Years: '40% growth with cloud and mobile development',
          automationRisk: 'Medium (25%)',
          emergingRoles: ['Cloud Architect', 'DevOps Engineer', 'Mobile Developer', 'Blockchain Developer'],
          skillsInDemand: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
          globalOpportunities: ['USA', 'India', 'Canada', 'Germany', 'Australia', 'Poland']
        },
        globalDemand: [
          { region: 'North America', demand: 98, averageSalary: '$120,000', growthRate: 28 },
          { region: 'Europe', demand: 85, averageSalary: '$70,000', growthRate: 22 },
          { region: 'Asia Pacific', demand: 95, averageSalary: '$60,000', growthRate: 35 },
          { region: 'Latin America', demand: 80, averageSalary: '$50,000', growthRate: 25 }
        ],
        industryInsights: [
          'FinTech sector leading with 45% developer demand',
          'Healthcare tech growing at 30% annually',
          'E-commerce platforms expanding globally',
          'Government digital transformation initiatives'
        ]
      },
      {
        title: 'UX Designer',
        requiredSkills: ['UI/UX Design', 'Communication'],
        personality: ['Artistic', 'Social'],
        avgSalary: '$90,000',
        outlook: 'Good (13% growth)',
        description: 'Create user-friendly interfaces and experiences',
        courses: [
          {
            title: 'Google UX Design Certificate',
            provider: 'Coursera',
            url: 'https://www.coursera.org/professional-certificates/google-ux-design',
            duration: '6 months',
            price: '$49/month',
            level: 'Beginner',
            rating: 4.8,
            students: 89000
          }
        ],
        companies: ['Apple', 'Google', 'Microsoft', 'Adobe', 'Figma', 'Airbnb', 'Spotify'],
        jobBoards: [
          'https://www.dribbble.com/jobs',
          'https://www.behance.net/joblist',
          'https://www.coroflot.com/jobs'
        ],
        growthRate: 13,
        demandLevel: 'High',
        competitionLevel: 'High',
        workLifeBalance: 4,
        requiredEducation: 'Bachelor\'s Degree',
        experienceLevel: '2-4 years',
        remoteWorkOption: true,
        marketTrends: [
          { year: 2019, demand: 70, salary: 75000, jobOpenings: 8000 },
          { year: 2020, demand: 75, salary: 80000, jobOpenings: 9500 },
          { year: 2021, demand: 80, salary: 85000, jobOpenings: 11000 },
          { year: 2022, demand: 85, salary: 88000, jobOpenings: 13000 },
          { year: 2023, demand: 90, salary: 90000, jobOpenings: 15000 },
          { year: 2024, demand: 95, salary: 95000, jobOpenings: 18000 },
          { year: 2025, demand: 100, salary: 100000, jobOpenings: 21000 },
          { year: 2026, demand: 105, salary: 108000, jobOpenings: 24000 },
          { year: 2027, demand: 110, salary: 115000, jobOpenings: 27000 }
        ],
        futureScope: {
          next5Years: '20% growth with AR/VR and AI design',
          automationRisk: 'Low (10%)',
          emergingRoles: ['AR/VR Designer', 'Voice UI Designer', 'AI Experience Designer', 'Design Systems Lead'],
          skillsInDemand: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
          globalOpportunities: ['USA', 'UK', 'Canada', 'Netherlands', 'Sweden', 'Australia']
        },
        globalDemand: [
          { region: 'North America', demand: 92, averageSalary: '$95,000', growthRate: 15 },
          { region: 'Europe', demand: 88, averageSalary: '$65,000', growthRate: 12 },
          { region: 'Asia Pacific', demand: 85, averageSalary: '$55,000', growthRate: 18 },
          { region: 'Middle East', demand: 78, averageSalary: '$70,000', growthRate: 10 }
        ],
        industryInsights: [
          'Mobile app design growing at 25% annually',
          'Enterprise software focusing on user experience',
          'Healthcare UX becoming critical for patient engagement',
          'E-commerce prioritizing user journey optimization'
        ]
      }
    ];

    return careers.map(career => {
      // Calculate skill match
      const skillMatches = career.requiredSkills.filter(skill => 
        surveyData.skills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );
      const skillScore = (skillMatches.length / career.requiredSkills.length) * 40;

      // Calculate personality match
      const personalityScore = career.personality.reduce((score, type) => {
        return score + (surveyData.personality[type as keyof typeof surveyData.personality] || 0);
      }, 0) / career.personality.length * 6;

      // Calculate work environment match
      let environmentScore = 0;
      if (surveyData.workEnvironment === 'Office / Corporate' && ['Product Manager', 'HR Manager'].includes(career.title)) environmentScore = 10;
      if (surveyData.workEnvironment === 'Remote / Work from home' && ['Software Developer', 'UX Designer'].includes(career.title)) environmentScore = 10;
      if (surveyData.workEnvironment === 'Startup / Fast-paced' && ['Data Scientist', 'Digital Marketing Manager'].includes(career.title)) environmentScore = 10;

      // Calculate motivation match
      let motivationScore = 0;
      if (surveyData.motivation === 'High salary and financial success' && parseInt(career.avgSalary.replace(/[^0-9]/g, '')) > 100000) motivationScore = 10;
      if (surveyData.motivation === 'Creative expression and innovation' && ['UX Designer', 'Digital Marketing Manager'].includes(career.title)) motivationScore = 10;
      if (surveyData.motivation === 'Leadership opportunities' && ['Product Manager', 'HR Manager'].includes(career.title)) motivationScore = 10;
      if (surveyData.motivation === 'Helping others directly' && ['HR Manager', 'UX Designer'].includes(career.title)) motivationScore = 10;

      const totalScore = Math.min(100, Math.round(skillScore + personalityScore + environmentScore + motivationScore));

      return {
        title: career.title,
        matchPercentage: totalScore,
        requiredSkills: career.requiredSkills,
        averageSalary: career.avgSalary,
        jobOutlook: career.outlook,
        description: career.description,
        courses: career.courses,
        companies: career.companies,
        jobBoards: career.jobBoards,
        marketTrends: career.marketTrends,
        futureScope: career.futureScope,
        growthRate: career.growthRate,
        demandLevel: career.demandLevel,
        competitionLevel: career.competitionLevel,
        workLifeBalance: career.workLifeBalance,
        requiredEducation: career.requiredEducation,
        experienceLevel: career.experienceLevel,
        remoteWorkOption: career.remoteWorkOption,
        globalDemand: career.globalDemand,
        industryInsights: career.industryInsights
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [surveyData]);

  // Personality data for radar chart
  const personalityData = Object.entries(surveyData.personality).map(([key, value]) => ({
    personality: key,
    score: value,
    fullMark: 5
  }));

  // Skills distribution data
  const skillDistribution = [
    { name: 'Technical', value: surveyData.skills.filter(s => ['Programming', 'Web Development', 'Machine Learning'].some(skill => s.toLowerCase().includes(skill.toLowerCase()))).length, color: '#8B5CF6' },
    { name: 'Analytical', value: surveyData.skills.filter(s => ['Data Analysis', 'Problem-Solving', 'Research'].some(skill => s.toLowerCase().includes(skill.toLowerCase()))).length, color: '#3B82F6' },
    { name: 'Creative', value: surveyData.skills.filter(s => ['UI/UX Design', 'Design', 'Creative'].some(skill => s.toLowerCase().includes(skill.toLowerCase()))).length, color: '#10B981' },
    { name: 'Soft Skills', value: surveyData.skills.filter(s => ['Communication', 'Leadership', 'Teaching', 'Marketing'].some(skill => s.toLowerCase().includes(skill.toLowerCase()))).length, color: '#F59E0B' }
  ].filter(item => item.value > 0);

  // Career match distribution
  const matchDistribution = [
    { name: 'Excellent (80-100%)', value: careerMatches.filter(c => c.matchPercentage >= 80).length, color: '#10B981' },
    { name: 'Good (60-79%)', value: careerMatches.filter(c => c.matchPercentage >= 60 && c.matchPercentage < 80).length, color: '#3B82F6' },
    { name: 'Fair (40-59%)', value: careerMatches.filter(c => c.matchPercentage >= 40 && c.matchPercentage < 60).length, color: '#F59E0B' },
    { name: 'Low (<40%)', value: careerMatches.filter(c => c.matchPercentage < 40).length, color: '#EF4444' }
  ].filter(item => item.value > 0);

  const handleDownloadReport = () => {
    setShowDownloadModal(true);
  };

  const downloadPDF = async () => {
    setShowDownloadModal(false);
    await generateProfessionalPDF(surveyData, careerMatches);
  };

  const downloadWord = async () => {
    setShowDownloadModal(false);
    await generateProfessionalWord(surveyData, careerMatches);
  };

  const downloadExcel = () => {
    setShowDownloadModal(false);
    generateProfessionalExcel(surveyData, careerMatches);
  };

  const getGrowthColor = (rate: number) => {
    if (rate >= 20) return 'text-green-500';
    if (rate >= 15) return 'text-blue-500';
    if (rate >= 10) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-green-100 text-green-700';
      case 'High': return 'bg-blue-100 text-blue-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-600 to-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border-2 ${
            isDark 
              ? 'bg-gray-800/80 border-purple-500/30' 
              : 'bg-white/80 border-purple-500/30'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <h1 className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2`}>
                  Comprehensive Career Analysis
                </h1>
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Welcome back, {surveyData.name}! Here's your detailed career guidance report
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className={`
                    relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                    text-white rounded-xl font-semibold
                    transition-all duration-300 ease-out
                    group
                    hover:shadow-2xl hover:shadow-purple-500/30
                    hover:scale-105
                    active:scale-95
                  `}
                  onClick={handleDownloadReport}
                  title="Download Report"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
                  
                  {/* Icon with animation */}
                  <Download 
                    size={20} 
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" 
                  />
                  
                  {/* Text with animation */}
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    Download Report
                  </span>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-2 mb-8 border-2 ${
            isDark 
              ? 'bg-gray-800/80 border-purple-500/30' 
              : 'bg-white/80 border-purple-500/30'
          }`}>
            <div className="flex space-x-2">
              {['overview', 'personality', 'skills', 'market', 'careers', 'future'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 transform hover:scale-105 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/80 border-purple-500/30' 
                  : 'bg-white/80 border-purple-500/30'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center`}>
                    <Target className="text-white" size={24} />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold text-green-500`}>
                      {careerMatches[0]?.matchPercentage || 0}%
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Top Match
                    </div>
                  </div>
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {careerMatches[0]?.title || 'N/A'}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  {careerMatches[0]?.description}
                </p>
              </div>

              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 transform hover:scale-105 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/80 border-blue-500/30' 
                  : 'bg-white/80 border-blue-500/30'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center`}>
                    <Brain className="text-white" size={24} />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold text-blue-500`}>
                      {surveyData.skills.length}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Skills
                    </div>
                  </div>
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Skills Analyzed
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  Across multiple categories
                </p>
              </div>

              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 transform hover:scale-105 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/80 border-green-500/30' 
                  : 'bg-white/80 border-green-500/30'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center`}>
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold text-green-500`}>
                      {careerMatches[0]?.growthRate || 0}%
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Growth Rate
                    </div>
                  </div>
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Market Growth
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  Next 5 years projection
                </p>
              </div>

              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 transform hover:scale-105 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/80 border-orange-500/30' 
                  : 'bg-white/80 border-orange-500/30'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center`}>
                    <Globe className="text-white" size={24} />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold text-orange-500`}>
                      {careerMatches[0]?.globalDemand.length || 0}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Regions
                    </div>
                  </div>
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Global Demand
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  Worldwide opportunities
                </p>
              </div>
            </div>
          )}

          {/* Personality Tab */}
          {activeTab === 'personality' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
                isDark 
                  ? 'bg-gray-800/80 border-purple-500/30' 
                  : 'bg-white/80 border-purple-500/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Personality Profile Analysis
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={personalityData}>
                    <PolarGrid stroke={isDark ? '#4B5563' : '#E5E7EB'} />
                    <PolarAngleAxis dataKey="personality" tick={{ fill: isDark ? '#9CA3AF' : '#4B5563' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: isDark ? '#9CA3AF' : '#4B5563' }} />
                    <Radar name="Score" dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
                isDark 
                  ? 'bg-gray-800/80 border-purple-500/30' 
                  : 'bg-white/80 border-purple-500/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Detailed Personality Insights
                </h3>
                <div className="space-y-4">
                  {Object.entries(surveyData.personality).map(([trait, score]) => (
                    <div key={trait} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {trait}
                        </span>
                        <span className={`text-2xl font-bold text-purple-500`}>
                          {score}/5
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {trait === 'Realistic' && 'Practical, hands-on approach to problem-solving'}
                        {trait === 'Investigative' && 'Analytical, research-oriented thinking'}
                        {trait === 'Artistic' && 'Creative, innovative expression'}
                        {trait === 'Social' && 'People-oriented, helping nature'}
                        {trait === 'Enterprising' && 'Leadership, business-focused mindset'}
                        {trait === 'Conventional' && 'Organized, detail-oriented approach'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
                isDark 
                  ? 'bg-gray-800/80 border-blue-500/30' 
                  : 'bg-white/80 border-blue-500/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Skills Distribution
                </h3>
                {skillDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={skillDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {skillDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No skills data available</p>
                  </div>
                )}
              </div>

              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
                isDark 
                  ? 'bg-gray-800/80 border-blue-500/30' 
                  : 'bg-white/80 border-blue-500/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Your Skills Portfolio
                </h3>
                <div className="space-y-3">
                  {surveyData.skills.map((skill, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className={`w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center`}>
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <span className={`flex-1 font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {skill}
                      </span>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        skill.includes('Programming') || skill.includes('Web Development') || skill.includes('Machine Learning')
                          ? 'bg-purple-100 text-purple-700'
                          : skill.includes('Data Analysis') || skill.includes('Problem-Solving')
                          ? 'bg-blue-100 text-blue-700'
                          : skill.includes('Design') || skill.includes('Creative')
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {skill.includes('Programming') || skill.includes('Web Development') || skill.includes('Machine Learning')
                          ? 'Technical'
                          : skill.includes('Data Analysis') || skill.includes('Problem-Solving')
                          ? 'Analytical'
                          : skill.includes('Design') || skill.includes('Creative')
                          ? 'Creative'
                          : 'Soft Skills'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Market Tab */}
          {activeTab === 'market' && (
            <div className="space-y-8 mb-8">
              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
                isDark 
                  ? 'bg-gray-800/80 border-green-500/30' 
                  : 'bg-white/80 border-green-500/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Market Trends Analysis
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={careerMatches[0]?.marketTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#4B5563' : '#E5E7EB'} />
                    <XAxis dataKey="year" tick={{ fill: isDark ? '#9CA3AF' : '#4B5563' }} />
                    <YAxis tick={{ fill: isDark ? '#9CA3AF' : '#4B5563' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="demand" stroke="#8B5CF6" strokeWidth={3} name="Demand %" />
                    <Line type="monotone" dataKey="jobOpenings" stroke="#3B82F6" strokeWidth={3} name="Job Openings" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {careerMatches.slice(0, 3).map((career, index) => (
                  <div key={index} className={`backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 ${
                    isDark 
                      ? 'bg-gray-800/80 border-green-500/30' 
                      : 'bg-white/80 border-green-500/30'
                  }`}>
                    <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {career.title}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Growth Rate</span>
                        <span className={`font-bold ${getGrowthColor(career.growthRate)}`}>
                          {career.growthRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Demand Level</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(career.demandLevel)}`}>
                          {career.demandLevel}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Competition</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {career.competitionLevel}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Work-Life Balance</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= career.workLifeBalance ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Careers Tab */}
          {activeTab === 'careers' && (
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
              isDark 
                ? 'bg-gray-800/80 border-purple-500/30' 
                : 'bg-white/80 border-purple-500/30'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Your Career Matches
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careerMatches.map((career, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCareer?.title === career.title
                        ? 'border-purple-500 bg-purple-50'
                        : isDark
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCareer(career)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {career.title}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                          {career.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${
                          career.matchPercentage >= 80 ? 'text-green-500' :
                          career.matchPercentage >= 60 ? 'text-blue-500' :
                          career.matchPercentage >= 40 ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {career.matchPercentage}%
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Match
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-green-500" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {career.averageSalary}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-blue-500" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {career.growthRate}% growth
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-purple-500" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {career.requiredEducation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-orange-500" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {career.remoteWorkOption ? 'Remote Available' : 'On-site Only'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(career.jobBoards[0], '_blank');
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                      >
                        <ExternalLink size={14} />
                        View Jobs
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCareer(career);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Future Tab */}
          {activeTab === 'future' && (
            <div className="space-y-8 mb-8">
              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
                isDark 
                  ? 'bg-gray-800/80 border-orange-500/30' 
                  : 'bg-white/80 border-orange-500/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Future Career Scope & Opportunities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {careerMatches.slice(0, 2).map((career, index) => (
                    <div key={index} className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {career.title}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Next 5 Years
                          </h5>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {career.futureScope.next5Years}
                          </p>
                        </div>
                        <div>
                          <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Emerging Roles
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {career.futureScope.emergingRoles.map((role, roleIndex) => (
                              <span
                                key={roleIndex}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
                                }`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Skills in Demand
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {career.futureScope.skillsInDemand.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Global Opportunities
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {career.futureScope.globalOpportunities.map((opportunity, oppIndex) => (
                              <span
                                key={oppIndex}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                                }`}
                              >
                                {opportunity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 ${
                isDark 
                  ? 'bg-gray-800/80 border-orange-500/30' 
                  : 'bg-white/80 border-orange-500/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Industry Insights & Trends
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {careerMatches.slice(0, 3).map((career, index) => (
                    <div key={index} className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {career.title}
                      </h4>
                      <div className="space-y-3">
                        {career.industryInsights.map((insight, insightIndex) => (
                          <div key={insightIndex} className="flex items-start gap-2">
                            <Lightbulb size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {insight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Career Details Modal */}
          {selectedCareer && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto`}>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2`}>
                        {selectedCareer.title}
                      </h2>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedCareer.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCareer(null)}
                      className={`p-3 rounded-xl ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          Career Overview
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Match Score</span>
                            <span className={`text-2xl font-bold ${
                              selectedCareer.matchPercentage >= 80 ? 'text-green-500' :
                              selectedCareer.matchPercentage >= 60 ? 'text-blue-500' :
                              selectedCareer.matchPercentage >= 40 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                              {selectedCareer.matchPercentage}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Average Salary</span>
                            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                              {selectedCareer.averageSalary}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Growth Rate</span>
                            <span className={`font-bold ${getGrowthColor(selectedCareer.growthRate)}`}>
                              {selectedCareer.growthRate}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Work-Life Balance</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={16}
                                  className={star <= selectedCareer.workLifeBalance ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCareer.requiredSkills.map((skill, index) => (
                            <span
                              key={index}
                              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                                isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          Top Companies
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedCareer.companies.map((company, index) => (
                            <div
                              key={index}
                              className={`flex items-center gap-2 p-3 rounded-xl ${
                                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              <Building size={16} />
                              <span className="text-sm">{company}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          Recommended Courses
                        </h3>
                        <div className="space-y-3">
                          {selectedCareer.courses.map((course, index) => (
                            <div
                              key={index}
                              className={`border rounded-xl p-4 ${
                                isDark ? 'border-gray-700' : 'border-gray-200'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {course.title}
                                  </h4>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {course.provider}
                                    </span>
                                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {course.duration}
                                    </span>
                                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {course.level}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <Star size={14} className="text-yellow-400 fill-current" />
                                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {course.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {course.price}
                                  </div>
                                  <a
                                    href={course.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                  >
                                    <Play size={14} />
                                    Start Course
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          Find Jobs
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedCareer.jobBoards.map((board, index) => (
                            <a
                              key={index}
                              href={board}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                                isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <ExternalLink size={20} className="text-blue-500" />
                              <span className={`flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {new URL(board).hostname}
                              </span>
                              <ChevronRight size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Download Report
            </h2>
            <div className="space-y-4">
              <button
                onClick={downloadPDF}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>PDF Format</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Professional document with tables</div>
                </div>
              </button>
              
              <button
                onClick={downloadWord}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Word Format</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Editable document with formatting</div>
                </div>
              </button>
              
              <button
                onClick={downloadExcel}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Excel Format</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Spreadsheet with multiple sheets</div>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setShowDownloadModal(false)}
              className="w-full mt-6 p-4 rounded-xl border-2 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveDashboard;

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Brain, Target, TrendingUp, Users, Award, Globe, 
  Rocket, Star, ArrowRight, Play, Sparkles,
  Shield, Heart, BarChart3, Activity,
  DollarSign, Briefcase, GraduationCap, Code, Palette,
  Microscope, FileText, Menu, X, CheckCircle,
  Linkedin, Twitter, Github, Clock, Zap, Lightbulb,
  MessageCircle, TrendingDown, AlertCircle, CheckCircle2,
  User, Bot, Cpu, Database, Network, GitBranch,
  LineChart, PieChart, Compass, Eye, EyeOff, RefreshCw,
  Download, Share2, Settings, Bell, Search, Filter,
  Calendar, MapPin, Building, Mail, Phone, Globe2,
  ChevronRight, ChevronDown, ChevronUp, Plus, Minus,
  ThumbsUp, ThumbsDown, Copy, Bookmark, ExternalLink,
  Layers, ZapOff, Battery, Wifi, Cloud, Server,
  Lock, Unlock, Key, ShieldCheck, Fingerprint,
  BrainCircuit, CircuitBoard, Microchip, LogOut
} from 'lucide-react';

interface FixedUltimateAIHomePageProps {
  onStartSurvey: () => void;
  onNavigate?: (tab: string) => void;
}

interface FeatureCard {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  stats: string;
  iconBg: string;
  features: string[];
  pricing?: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: any;
  description: string;
  trend?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  result: string;
  time: string;
  avatar: string;
}

interface CareerPath {
  title: string;
  icon: any;
  growth: string;
  color: string;
  description: string;
  avgSalary: string;
  demand: string;
  skills: string[];
  timeline: string;
  difficulty: string;
}

const FixedUltimateAIHomePage: React.FC<FixedUltimateAIHomePageProps> = ({ onStartSurvey, onNavigate }) => {
  const { isDark } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features: FeatureCard[] = [
    {
      icon: BrainCircuit,
      title: 'AI Career Twin',
      description: 'Advanced digital twin simulation that predicts your success probability across multiple career paths using deep learning algorithms.',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      stats: '99.2% Accuracy',
      iconBg: 'bg-purple-600',
      features: ['Future Simulation', 'Success Probability', 'Growth Prediction', 'Risk Analysis'],
      pricing: 'Advanced'
    },
    {
      icon: BrainCircuit,
      title: 'Explainable AI Engine',
      description: 'Transparent AI reasoning that shows exactly why each career recommendation is made with confidence scores and factor breakdown.',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      stats: 'Full Transparency',
      iconBg: 'bg-blue-600',
      features: ['Reasoning Display', 'Confidence Scores', 'Factor Analysis', 'Alternative Paths'],
      pricing: 'Premium'
    },
    {
      icon: GitBranch,
      title: 'Career Path Simulation',
      description: 'Compare multiple career trajectories side-by-side with detailed projections for salary, growth, and work-life balance.',
      color: 'from-green-600 to-teal-600',
      bgColor: 'from-green-50 to-teal-50',
      stats: 'Unlimited Paths',
      iconBg: 'bg-green-600',
      features: ['Side-by-Side Compare', 'Salary Projections', 'Growth Analysis', 'Balance Metrics'],
      pricing: 'Pro'
    },
    {
      icon: LineChart,
      title: 'Predictive Analytics',
      description: 'Real-time market trend analysis with 5-year salary projections and demand forecasting for data-driven decisions.',
      color: 'from-orange-600 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      stats: 'Live Data',
      iconBg: 'bg-orange-600',
      features: ['Market Trends', 'Salary Forecast', 'Demand Analysis', 'Future Outlook'],
      pricing: 'Enterprise'
    },
    {
      icon: MessageCircle,
      title: 'AI Mentor Chat',
      description: 'Context-aware chatbot with personality profiling that provides personalized career guidance 24/7.',
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50',
      stats: '24/7 Available',
      iconBg: 'bg-indigo-600',
      features: ['Personality Aware', 'Context Memory', 'Professional Advice', 'Instant Response'],
      pricing: 'Premium'
    },
    {
      icon: MapPin,
      title: 'Dynamic Learning Path',
      description: 'Adaptive roadmap that evolves based on your progress, skill gaps, and changing career goals.',
      color: 'from-pink-600 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50',
      stats: 'AI Adaptive',
      iconBg: 'bg-pink-600',
      features: ['Progress Tracking', 'Skill Gap Analysis', 'Goal Adjustment', 'Timeline Optimization'],
      pricing: 'Pro'
    }
  ];

  const stats: StatItem[] = [
    {
      value: '10,000+',
      label: 'Career Paths',
      icon: Target,
      description: 'Simulated careers',
      trend: '+15%'
    },
    {
      value: '99.2%',
      label: 'Accuracy',
      icon: Brain,
      description: 'Prediction rate',
      trend: '+2.3%'
    },
    {
      value: '50M+',
      label: 'Data Points',
      icon: Database,
      description: 'Training data',
      trend: '+25%'
    },
    {
      value: '24/7',
      label: 'AI Support',
      icon: MessageCircle,
      description: 'Always available'
    },
    {
      value: '150K+',
      label: 'Users',
      icon: Users,
      description: 'Active users',
      trend: '+45%'
    },
    {
      value: '85%',
      label: 'Success Rate',
      icon: TrendingUp,
      description: 'Career placement',
      trend: '+12%'
    }
  ];

  const careerPaths: CareerPath[] = [
    {
      title: 'AI/ML Engineer',
      icon: BrainCircuit,
      growth: '+35%',
      color: 'from-purple-600 to-pink-600',
      description: 'Design and implement artificial intelligence and machine learning systems.',
      avgSalary: '$120K-180K',
      demand: 'Very High',
      skills: ['Python', 'TensorFlow', 'Deep Learning', 'Statistics'],
      timeline: '6-12 months',
      difficulty: 'Advanced'
    },
    {
      title: 'Data Scientist',
      icon: BarChart3,
      growth: '+28%',
      color: 'from-blue-600 to-cyan-600',
      description: 'Analyze complex data to help companies make better business decisions.',
      avgSalary: '$100K-150K',
      demand: 'High',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
      timeline: '4-8 months',
      difficulty: 'Intermediate'
    },
    {
      title: 'Full Stack Developer',
      icon: Code,
      growth: '+22%',
      color: 'from-green-600 to-teal-600',
      description: 'Build complete web applications from frontend to backend.',
      avgSalary: '$90K-130K',
      demand: 'High',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Database'],
      timeline: '3-6 months',
      difficulty: 'Intermediate'
    },
    {
      title: 'DevOps Engineer',
      icon: Cloud,
      growth: '+30%',
      color: 'from-orange-600 to-red-600',
      description: 'Bridge development and operations to ensure smooth software deployment.',
      avgSalary: '$105K-145K',
      demand: 'High',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
      timeline: '4-7 months',
      difficulty: 'Intermediate'
    },
    {
      title: 'Product Manager',
      icon: Target,
      growth: '+18%',
      color: 'from-indigo-600 to-purple-600',
      description: 'Lead product development and strategy to meet market needs.',
      avgSalary: '$110K-160K',
      demand: 'High',
      skills: ['Strategy', 'Analytics', 'Communication', 'Leadership'],
      timeline: '5-8 months',
      difficulty: 'Advanced'
    },
    {
      title: 'UX/UI Designer',
      icon: Palette,
      growth: '+15%',
      color: 'from-pink-600 to-rose-600',
      description: 'Create user-centered designs that are both beautiful and functional.',
      avgSalary: '$75K-120K',
      demand: 'Medium',
      skills: ['Design Systems', 'Prototyping', 'User Research', 'Figma'],
      timeline: '3-6 months',
      difficulty: 'Beginner'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      role: 'Data Scientist',
      company: 'Tech Corp',
      content: 'The AI Career Twin helped me discover my true passion for data science. The predictions were incredibly accurate!',
      rating: 5,
      image: '/api/placeholder/40/40',
      result: '95% match',
      time: '2 months ago',
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      content: 'I was confused between multiple career paths. The simulation showed me exactly where I would thrive most.',
      rating: 5,
      image: '/api/placeholder/40/40',
      result: '92% match',
      time: '3 months ago',
      avatar: 'MR'
    },
    {
      name: 'Emily Johnson',
      role: 'Product Manager',
      company: 'Innovation Inc',
      content: 'The learning path recommendations were perfect. I landed my dream job in just 6 months!',
      rating: 5,
      image: '/api/placeholder/40/40',
      result: '88% match',
      time: '1 month ago',
      avatar: 'EJ'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? isDark ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800' : 'bg-white/95 backdrop-blur-xl border-b border-gray-200'
          : isDark ? 'bg-gray-900/80' : 'bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white" size={20} />
                </div>
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  AI Career Twin
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                Features
              </a>
              <a href="#careers" className={`font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                Careers
              </a>
              <a href="#testimonials" className={`font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                Success Stories
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onStartSurvey}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 font-medium hover:scale-105"
              >
                Get Started
              </button>
              <button
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={`fixed top-20 right-4 z-50 w-72 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl rounded-2xl shadow-2xl border-2 ${
          isDark ? 'border-purple-500/30' : 'border-purple-500/30'
        } animate-in fade-in slide-in-from-top-4 duration-300`}>
          {/* Header */}
          <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Menu
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quick access options
            </p>
          </div>

          {/* Menu Items */}
          <div className="p-3 space-y-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate?.('settings');
              }}
              className={`
                group relative w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left
                transition-all duration-300 ease-out
                hover:scale-102 hover:shadow-lg
                ${isDark 
                  ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-300 hover:from-purple-600/20 hover:to-pink-600/20 hover:text-white' 
                  : 'bg-gradient-to-r from-gray-100/50 to-gray-50/50 text-gray-700 hover:from-purple-100 hover:to-pink-100 hover:text-gray-900'
                }
              `}
            >
              {/* Icon container with animation */}
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-lg
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
                ${isDark 
                  ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30' 
                  : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                }
              `}>
                <Settings size={20} />
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <span className="font-semibold text-sm">Settings</span>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Manage preferences
                </p>
              </div>

              {/* Arrow with animation */}
              <ChevronRight 
                size={18} 
                className={`transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} 
              />
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate?.('notifications');
              }}
              className={`
                group relative w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left
                transition-all duration-300 ease-out
                hover:scale-102 hover:shadow-lg
                ${isDark 
                  ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-300 hover:from-purple-600/20 hover:to-pink-600/20 hover:text-white' 
                  : 'bg-gradient-to-r from-gray-100/50 to-gray-50/50 text-gray-700 hover:from-purple-100 hover:to-pink-100 hover:text-gray-900'
                }
              `}
            >
              {/* Icon container with animation */}
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-lg
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
                ${isDark 
                  ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30' 
                  : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                }
              `}>
                <Bell size={20} />
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <span className="font-semibold text-sm">Notifications</span>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  View alerts
                </p>
              </div>

              {/* Arrow with animation */}
              <ChevronRight 
                size={18} 
                className={`transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} 
              />
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                localStorage.clear();
                window.location.reload();
              }}
              className={`
                group relative w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left
                transition-all duration-300 ease-out
                hover:scale-102 hover:shadow-lg
                ${isDark 
                  ? 'bg-gradient-to-r from-red-600/20 to-red-500/20 text-red-400 hover:from-red-600/30 hover:to-red-500/30 hover:text-red-300' 
                  : 'bg-gradient-to-r from-red-100 to-red-50 text-red-600 hover:from-red-200 hover:to-red-100 hover:text-red-700'
                }
              `}
            >
              {/* Icon container with animation */}
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-lg
                transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6
                ${isDark 
                  ? 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30' 
                  : 'bg-red-100 text-red-600 group-hover:bg-red-200'
                }
              `}>
                <LogOut size={20} />
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <span className="font-semibold text-sm">Log Out</span>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Sign out of account
                </p>
              </div>

              {/* Arrow with animation */}
              <ChevronRight 
                size={18} 
                className={`transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} 
              />
            </button>
          </div>

          {/* Footer */}
          <div className={`px-6 py-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`w-full text-center text-sm font-medium transition-colors duration-300 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - Fixed Layout */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Left Content - Fixed Spacing */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium">
                <Sparkles size={16} />
                <span>AI-Powered Career Intelligence</span>
                <ChevronRight size={16} className="animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h1 className={`text-5xl lg:text-7xl font-bold leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Your AI Career
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                    Twin Awaits
                  </span>
                </h1>
              </div>
              
              <p className={`text-xl lg:text-2xl ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed max-w-2xl`}>
                Simulate your future in 10,000+ career paths with 99.2% accuracy. 
                Get personalized AI guidance that adapts to your unique DNA.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStartSurvey}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg hover:scale-105 group"
                >
                  <Rocket size={20} className="group-hover:translate-x-1 transition-transform" />
                  <span>Create AI Twin</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-8 py-4 rounded-xl border-2 flex items-center justify-center space-x-3 transition-all duration-300 font-semibold text-lg hover:scale-105 ${
                    isDark 
                      ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white' 
                      : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  <Play size={20} />
                  <span>Watch Demo</span>
                </a>
              </div>

              {/* Stats Grid - Fixed Layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
                {stats.slice(0, 6).map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      {stat.label}
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {stat.description}
                      </span>
                      {stat.trend && (
                        <span className="text-xs text-green-500 font-medium">{stat.trend}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Fixed Positioning */}
            <div className="relative">
              <div className={`relative p-8 rounded-2xl border-2 ${
                isDark 
                  ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/50' 
                  : 'bg-white/60 backdrop-blur-xl border-gray-200/50'
              }`}>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      92%
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Career Match Score
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-3 rounded-lg text-center ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'
                    }`}>
                      <Briefcase className="text-purple-600 mx-auto mb-1" size={20} />
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        AI/ML
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Top Match
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'
                    }`}>
                      <DollarSign className="text-green-600 mx-auto mb-1" size={20} />
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        $180K
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Avg Salary
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'
                    }`}>
                      <TrendingUp className="text-blue-600 mx-auto mb-1" size={20} />
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        +35%
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Growth Rate
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements - Fixed positioning */}
                <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center animate-pulse">
                  <BarChart3 className="text-white" size={32} />
                </div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl shadow-xl flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Fixed Layout */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Advanced AI Career
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Intelligence Tools
              </span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Cutting-edge AI technology that simulates, predicts, and guides your career journey with unprecedented accuracy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative ${
                  isDark 
                    ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/50 hover:border-purple-500/50' 
                    : 'bg-white/60 backdrop-blur-xl border-gray-200/50 hover:border-purple-300/50'
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Background gradient effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl transition-transform duration-500 ${
                  hoveredFeature === index ? 'scale-150' : 'scale-100'
                }`} />
                
                {/* Icon Container - Fixed positioning */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 ${feature.iconBg} rounded-xl flex items-center justify-center shadow-2xl transition-all duration-300 ${
                    hoveredFeature === index ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                  }`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                </div>
                
                {/* Title - Fixed spacing */}
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                
                {/* Description - Fixed spacing */}
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
                  {feature.description}
                </p>

                {/* Features list - Fixed layout */}
                <div className="space-y-3 mb-6">
                  {feature.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Footer - Fixed positioning */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                  <div>
                    <span className={`text-lg font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.stats}
                    </span>
                    {feature.pricing && (
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                        {feature.pricing}
                      </div>
                    )}
                  </div>
                  <ArrowRight className={`text-purple-600 transition-transform flex-shrink-0 ${
                    hoveredFeature === index ? 'translate-x-2' : 'translate-x-0'
                  }`} size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section - Fixed Layout */}
      <section id="careers" className={`py-20 px-6 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Explore High-Growth
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Career Paths
              </span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Discover trending careers with excellent future prospects and AI-powered insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative ${
                  isDark 
                    ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/50 hover:border-purple-500/50' 
                    : 'bg-white/60 backdrop-blur-xl border-gray-200/50 hover:border-purple-300/50'
                }`}
                onClick={() => setSelectedCareer(selectedCareer === index ? null : index)}
              >
                {/* Career Header - Fixed positioning */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${path.color} rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <path.icon className="text-white" size={40} />
                  </div>
                  <div className={`absolute -top-2 -right-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full`}>
                    {path.growth}
                  </div>
                </div>
                
                {/* Title - Fixed spacing */}
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {path.title}
                </h3>
                
                {/* Description - Fixed spacing */}
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
                  {path.description}
                </p>

                {/* Stats - Fixed layout */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-3 rounded-lg text-center ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'
                  }`}>
                    <DollarSign className="text-green-600 mx-auto mb-1" size={20} />
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {path.avgSalary}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Avg Salary
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg text-center ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'
                  }`}>
                    <Users className="text-blue-600 mx-auto mb-1" size={20} />
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {path.demand}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Demand
                    </div>
                  </div>
                </div>

                {/* Skills - Fixed layout */}
                <div className="mb-6">
                  <div className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Key Skills:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer - Fixed positioning */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                  <div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Timeline: {path.timeline}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      Difficulty: {path.difficulty}
                    </div>
                  </div>
                  <ChevronRight className={`text-purple-600 transition-transform flex-shrink-0 ${
                    selectedCareer === index ? 'rotate-90' : ''
                  }`} size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Fixed Layout */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Success Stories
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                From Our Users
              </span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              See how AI Career Twin has helped thousands achieve their dream careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/50' 
                    : 'bg-white/60 backdrop-blur-xl border-gray-200/50'
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={16} />
                  ))}
                </div>

                <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {testimonial.content}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonial.time}
                  </div>
                  <div className={`px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full`}>
                    {testimonial.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`p-12 rounded-3xl border-2 ${
            isDark 
              ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/50' 
              : 'bg-white/60 backdrop-blur-xl border-gray-200/50'
          }`}>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to Discover Your
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                Perfect Career Path?
              </span>
            </h2>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands who have found their dream careers with AI Career Twin
            </p>
            <button
              onClick={onStartSurvey}
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg hover:scale-105 mx-auto group"
            >
              <Rocket size={20} className="group-hover:translate-x-1 transition-transform" />
              <span>Create Your AI Twin</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FixedUltimateAIHomePage;

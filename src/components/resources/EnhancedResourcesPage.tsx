import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  BookOpen, ExternalLink, Download, Play, Star, Heart,
  Search, Filter, ChevronRight, Globe, Youtube,
  FileText, Award, Target, Brain, Code, Database,
  Cloud, Shield, Users, Briefcase, TrendingUp,
  Calendar, Clock, DollarSign, MapPin, Building,
  Mail, Phone, MessageSquare, ThumbsUp, Eye,
  Bookmark, Share2, Copy, Check, X, Loader,
  Linkedin, Twitter, Github, GitBranch, Microscope,
  Palette, Calculator, Music, Camera, PenTool
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'course' | 'article' | 'video' | 'tool' | 'book' | 'certification' | 'job' | 'website';
  url: string;
  provider: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  price: string;
  rating: number;
  reviews: number;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
}

const EnhancedResourcesPage: React.FC = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const resources: Resource[] = [
    // Learning Platforms
    {
      id: '1',
      title: 'Deep Learning Specialization',
      description: 'Comprehensive deep learning course by Andrew Ng covering neural networks, CNNs, RNNs, and more.',
      category: 'learning',
      type: 'course',
      url: 'https://www.coursera.org/specializations/deep-learning',
      provider: 'Coursera',
      difficulty: 'Intermediate',
      duration: '3 months',
      price: 'Free (Paid Certificate)',
      rating: 4.9,
      reviews: 15420,
      tags: ['Deep Learning', 'Neural Networks', 'AI', 'Machine Learning'],
      featured: true,
      isNew: false
    },
    {
      id: '2',
      title: 'Machine Learning A-Z',
      description: 'Complete machine learning bootcamp covering supervised and unsupervised learning.',
      category: 'learning',
      type: 'course',
      url: 'https://www.udemy.com/course/machinelearning/',
      provider: 'Udemy',
      difficulty: 'Beginner',
      duration: '44 hours',
      price: '$89.99',
      rating: 4.7,
      reviews: 128900,
      tags: ['Machine Learning', 'Python', 'Data Science'],
      featured: true,
      isNew: false
    },
    {
      id: '3',
      title: 'AWS Certified Machine Learning',
      description: 'Official AWS certification for machine learning specialty with hands-on labs.',
      category: 'certification',
      type: 'certification',
      url: 'https://aws.amazon.com/certification/machine-learning/',
      provider: 'Amazon Web Services',
      difficulty: 'Advanced',
      duration: 'Self-paced',
      price: '$300',
      rating: 4.6,
      reviews: 3420,
      tags: ['AWS', 'Cloud', 'Machine Learning', 'Certification'],
      featured: true
    },
    // Job Search Platforms
    {
      id: '4',
      title: 'LinkedIn Job Search',
      description: 'Professional networking and job search platform with AI-powered recommendations.',
      category: 'jobs',
      type: 'website',
      url: 'https://www.linkedin.com/jobs/',
      provider: 'LinkedIn',
      difficulty: 'All Levels',
      price: 'Free',
      rating: 4.5,
      reviews: 45000,
      tags: ['Job Search', 'Networking', 'Professional', 'Career'],
      featured: true
    },
    {
      id: '5',
      title: 'Indeed Career Guide',
      description: 'Comprehensive career advice, resume templates, and job search resources.',
      category: 'jobs',
      type: 'website',
      url: 'https://www.indeed.com/career-advice',
      provider: 'Indeed',
      difficulty: 'All Levels',
      price: 'Free',
      rating: 4.4,
      reviews: 23400,
      tags: ['Career Advice', 'Resume', 'Interview', 'Job Search']
    },
    {
      id: '6',
      title: 'Glassdoor',
      description: 'Company reviews, salary data, and interview questions for career research.',
      category: 'jobs',
      type: 'website',
      url: 'https://www.glassdoor.com',
      provider: 'Glassdoor',
      difficulty: 'All Levels',
      price: 'Free (Premium Available)',
      rating: 4.3,
      reviews: 18900,
      tags: ['Company Reviews', 'Salary', 'Interview', 'Research'],
      featured: true
    },
    // Technical Resources
    {
      id: '7',
      title: 'TensorFlow Documentation',
      description: 'Official TensorFlow documentation with tutorials and guides.',
      category: 'technical',
      type: 'website',
      url: 'https://www.tensorflow.org/tutorials',
      provider: 'Google',
      difficulty: 'Intermediate',
      price: 'Free',
      rating: 4.8,
      reviews: 8900,
      tags: ['TensorFlow', 'Deep Learning', 'Python', 'Documentation']
    },
    {
      id: '8',
      title: 'Kaggle Learn',
      description: 'Free data science and machine learning courses with hands-on projects.',
      category: 'technical',
      type: 'course',
      url: 'https://www.kaggle.com/learn',
      provider: 'Kaggle',
      difficulty: 'Beginner',
      price: 'Free',
      rating: 4.7,
      reviews: 15600,
      tags: ['Data Science', 'Machine Learning', 'Python', 'Projects'],
      featured: true,
      isNew: true
    },
    {
      id: '9',
      title: 'GitHub Learning Lab',
      description: 'Interactive GitHub courses for version control and collaboration.',
      category: 'technical',
      type: 'course',
      url: 'https://lab.github.com',
      provider: 'GitHub',
      difficulty: 'Beginner',
      price: 'Free',
      rating: 4.6,
      reviews: 6700,
      tags: ['Git', 'Version Control', 'Collaboration', 'Development']
    },
    // Books & Publications
    {
      id: '10',
      title: 'Hands-On Machine Learning',
      description: 'Practical guide to machine learning with scikit-learn, Keras, and TensorFlow.',
      category: 'books',
      type: 'book',
      url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
      provider: "O'Reilly",
      difficulty: 'Intermediate',
      price: '$49.99',
      rating: 4.8,
      reviews: 4200,
      tags: ['Machine Learning', 'Python', 'Scikit-learn', 'TensorFlow'],
      featured: true
    },
    {
      id: '11',
      title: 'Pattern Recognition and Machine Learning',
      description: 'Comprehensive textbook on pattern recognition and machine learning theory.',
      category: 'books',
      type: 'book',
      url: 'https://www.springer.com/gp/book/9780387310732',
      provider: 'Springer',
      difficulty: 'Advanced',
      price: '$89.99',
      rating: 4.7,
      reviews: 2100,
      tags: ['Pattern Recognition', 'Machine Learning', 'Theory', 'Mathematics']
    },
    // Video Content
    {
      id: '12',
      title: '3Blue1Brown - Neural Networks',
      description: 'Visual explanation of neural networks and deep learning concepts.',
      category: 'videos',
      type: 'video',
      url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000qM_Tj_4v_7p',
      provider: 'YouTube',
      difficulty: 'Beginner',
      duration: '4 hours',
      price: 'Free',
      rating: 4.9,
      reviews: 89000,
      tags: ['Neural Networks', 'Visualization', 'Mathematics', 'Deep Learning'],
      featured: true
    },
    {
      id: '13',
      title: 'StatQuest with Josh Starmer',
      description: 'Statistics and machine learning explained simply.',
      category: 'videos',
      type: 'video',
      url: 'https://www.youtube.com/c/statquest',
      provider: 'YouTube',
      difficulty: 'Beginner',
      price: 'Free',
      rating: 4.8,
      reviews: 45000,
      tags: ['Statistics', 'Machine Learning', 'Data Science', 'Tutorial']
    },
    // Tools & Software
    {
      id: '14',
      title: 'Google Colab',
      description: 'Free cloud-based Python environment with GPU support.',
      category: 'tools',
      type: 'tool',
      url: 'https://colab.research.google.com',
      provider: 'Google',
      difficulty: 'All Levels',
      price: 'Free',
      rating: 4.7,
      reviews: 12300,
      tags: ['Python', 'Jupyter', 'Cloud', 'GPU', 'Machine Learning'],
      featured: true
    },
    {
      id: '15',
      title: 'Jupyter Notebook',
      description: 'Interactive computing environment for data science and machine learning.',
      category: 'tools',
      type: 'tool',
      url: 'https://jupyter.org',
      provider: 'Jupyter',
      difficulty: 'All Levels',
      price: 'Free',
      rating: 4.6,
      reviews: 8900,
      tags: ['Python', 'Data Science', 'Notebook', 'Interactive']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: Globe },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'jobs', label: 'Job Search', icon: Briefcase },
    { id: 'technical', label: 'Technical', icon: Code },
    { id: 'books', label: 'Books', icon: FileText },
    { id: 'videos', label: 'Videos', icon: Play },
    { id: 'tools', label: 'Tools', icon: Database },
    { id: 'certification', label: 'Certifications', icon: Award }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'course', label: 'Courses' },
    { id: 'article', label: 'Articles' },
    { id: 'video', label: 'Videos' },
    { id: 'tool', label: 'Tools' },
    { id: 'book', label: 'Books' },
    { id: 'certification', label: 'Certifications' },
    { id: 'job', label: 'Jobs' },
    { id: 'website', label: 'Websites' }
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' }
  ];

  const sortOptions = [
    { id: 'rating', label: 'Highest Rated' },
    { id: 'reviews', label: 'Most Reviewed' },
    { id: 'newest', label: 'Newest' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'article': return FileText;
      case 'video': return Play;
      case 'tool': return Database;
      case 'book': return FileText;
      case 'certification': return Award;
      case 'job': return Briefcase;
      case 'website': return Globe;
      default: return FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'article': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'video': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'tool': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'book': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'certification': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300';
      case 'job': return 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300';
      case 'website': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  const copyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    const matchesFavorites = !showFavorites || favorites.includes(resource.id);

    return matchesSearch && matchesCategory && matchesType && matchesDifficulty && matchesFavorites;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'price-low':
        return (a.price === 'Free' ? 0 : parseFloat(a.price.replace(/[^0-9.]/g, '') || '0')) - 
               (b.price === 'Free' ? 0 : parseFloat(b.price.replace(/[^0-9.]/g, '') || '0'));
      case 'price-high':
        return (b.price === 'Free' ? 0 : parseFloat(b.price.replace(/[^0-9.]/g, '') || '0')) - 
               (a.price === 'Free' ? 0 : parseFloat(a.price.replace(/[^0-9.]/g, '') || '0'));
      default:
        return 0;
    }
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Career Resources
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Curated learning materials, job opportunities, and career tools
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2 ${
                showFavorites
                  ? 'bg-red-600 text-white'
                  : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart size={16} className={showFavorites ? 'fill-current' : ''} />
              <span>{favorites.length} Favorites</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Filters */}
        <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            const isFavorite = favorites.includes(resource.id);
            
            return (
              <div
                key={resource.id}
                className={`p-6 rounded-2xl border transition-all hover:shadow-xl ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } ${resource.featured ? 'ring-2 ring-blue-500' : ''}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                      <TypeIcon size={20} />
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {resource.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {resource.provider}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {resource.featured && (
                      <Star className="text-yellow-500 fill-current" size={16} />
                    )}
                    {resource.isNew && (
                      <span className={`px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300`}>
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{resource.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                    {resource.duration && (
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {resource.duration}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500 fill-current" size={12} />
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {resource.rating}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      ({resource.reviews})
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className={`text-lg font-bold mb-4 ${
                  resource.price === 'Free' ? 'text-green-600' : isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {resource.price}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExternalLink(resource.url)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center space-x-2 ${
                      isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <span>Access</span>
                    <ExternalLink size={16} />
                  </button>
                  <button
                    onClick={() => toggleFavorite(resource.id)}
                    className={`p-2 rounded-lg transition ${
                      isFavorite
                        ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                        : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={() => copyLink(resource.url, resource.id)}
                    className={`p-2 rounded-lg transition ${
                      copiedId === resource.id
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                        : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {copiedId === resource.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {sortedResources.length === 0 && (
          <div className={`p-12 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <Search className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
            <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No resources found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedResourcesPage;

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Bell, BellRing, CheckCircle, AlertCircle, Info, 
  X, ExternalLink, Calendar, Clock, TrendingUp,
  Award, Target, BookOpen, Users, Briefcase, Mail,
  ChevronRight, Filter, Search, Trash2, Archive,
  Star, Heart, MessageSquare, Download, Share2,
  Settings, UserPlus, FileText, Brain, Zap
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'career' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url?: string;
    handler?: () => void;
  };
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const NotificationsPage: React.FC = () => {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'career' | 'system'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Generate sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'career',
        title: 'New Career Match Found!',
        message: 'AI/ML Engineer position at Tech Corp matches your profile with 92% compatibility.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        action: {
          label: 'View Job',
          url: '/jobs/ai-ml-engineer'
        },
        priority: 'high',
        category: 'career'
      },
      {
        id: '2',
        type: 'achievement',
        title: 'Skill Assessment Completed!',
        message: 'You\'ve completed your technical skills assessment. Your overall score: 85/100.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: false,
        action: {
          label: 'View Results',
          url: '/assessment/results'
        },
        priority: 'medium',
        category: 'achievement'
      },
      {
        id: '3',
        type: 'info',
        title: 'New Learning Path Available',
        message: 'Advanced Machine Learning specialization course is now available based on your career goals.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        read: true,
        action: {
          label: 'Explore Course',
          url: '/learning/machine-learning'
        },
        priority: 'medium',
        category: 'learning'
      },
      {
        id: '4',
        type: 'success',
        title: 'Resume Analysis Complete',
        message: 'Your resume has been analyzed and optimized. Score improved by 15 points!',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        read: true,
        action: {
          label: 'View Report',
          url: '/resume/analysis'
        },
        priority: 'high',
        category: 'resume'
      },
      {
        id: '5',
        type: 'warning',
        title: 'Skill Gap Detected',
        message: 'Consider learning TensorFlow to improve your chances for AI/ML roles.',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        read: false,
        action: {
          label: 'Start Learning',
          url: '/learning/tensorflow'
        },
        priority: 'medium',
        category: 'skills'
      },
      {
        id: '6',
        type: 'system',
        title: 'Profile Update Reminder',
        message: 'Update your work experience to get better career recommendations.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        action: {
          label: 'Update Profile',
          url: '/profile'
        },
        priority: 'low',
        category: 'profile'
      },
      {
        id: '7',
        type: 'career',
        title: 'Salary Insights Updated',
        message: 'New salary data shows 15% increase for Data Science roles in your area.',
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
        read: false,
        action: {
          label: 'View Insights',
          url: '/salary/data-science'
        },
        priority: 'medium',
        category: 'salary'
      },
      {
        id: '8',
        type: 'achievement',
        title: 'Weekly Goal Achieved!',
        message: 'You completed 3 learning modules this week. Keep up the great work!',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        read: true,
        action: {
          label: 'View Progress',
          url: '/progress/weekly'
        },
        priority: 'low',
        category: 'achievement'
      }
    ];

    setNotifications(sampleNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleAction = (notification: Notification) => {
    if (notification.action?.url) {
      window.open(notification.action.url, '_blank');
    } else if (notification.action?.handler) {
      notification.action.handler();
    }
    markAsRead(notification.id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />;
      case 'warning': return <AlertCircle className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />;
      case 'info': return <Info className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />;
      case 'career': return <Briefcase className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" />;
      case 'achievement': return <Award className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />;
      case 'system': return <Settings className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <Bell className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return isDark ? 'bg-green-900/50 border-green-800' : 'bg-green-50 border-green-200';
      case 'warning': return isDark ? 'bg-yellow-900/50 border-yellow-800' : 'bg-yellow-50 border-yellow-200';
      case 'info': return isDark ? 'bg-blue-900/50 border-blue-800' : 'bg-blue-50 border-blue-200';
      case 'career': return isDark ? 'bg-purple-900/50 border-purple-800' : 'bg-purple-50 border-purple-200';
      case 'achievement': return isDark ? 'bg-yellow-900/50 border-yellow-800' : 'bg-yellow-50 border-yellow-200';
      case 'system': return isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200';
      default: return isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') return !notification.read && matchesSearch;
    if (filter === 'career') return notification.category === 'career' && matchesSearch;
    if (filter === 'system') return notification.type === 'system' && matchesSearch;
    return matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-3 sm:p-4 lg:p-6`}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className={`mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-5 lg:p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BellRing className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] sm:text-xs font-bold">{unreadCount}</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Notifications
                </h1>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={markAllAsRead}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mark All Read
              </button>
              <button
                onClick={() => window.history.back()}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-4 h-4 sm:w-5 sm:h-5`} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 rounded-lg text-sm sm:text-base ${
                  isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'unread', 'career', 'system'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  className={`px-2 sm:px-3 lg:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition capitalize whitespace-nowrap flex-shrink-0 ${
                    filter === filterOption
                      ? 'bg-blue-600 text-white'
                      : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className={`p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
              <Bell className={`mx-auto mb-3 sm:mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'} w-10 h-10 sm:w-12 sm:h-12`} />
              <h3 className={`text-base sm:text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No notifications found
              </h3>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {searchTerm ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 sm:p-4 rounded-2xl border transition-all ${
                  getNotificationColor(notification.type)
                } ${!notification.read ? 'border-l-4' : ''}`}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className={`font-medium mb-1 text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'} ${
                          !notification.read ? 'font-bold' : ''
                        }`}>
                          {notification.title}
                        </h3>
                        <p className={`text-xs sm:text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <span className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.action && (
                            <button
                              onClick={() => handleAction(notification)}
                              className={`text-xs font-medium flex items-center space-x-1 hover:underline ${
                                isDark ? 'text-blue-400' : 'text-blue-600'
                              }`}
                            >
                              <span>{notification.action.label}</span>
                              <ExternalLink size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600`}
                            title="Mark as read"
                          >
                            <CheckCircle size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600`}
                          title="Delete notification"
                        >
                          <X size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={clearAllNotifications}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                isDark ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

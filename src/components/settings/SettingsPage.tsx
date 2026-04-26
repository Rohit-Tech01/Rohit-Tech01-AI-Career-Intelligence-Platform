import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  User, Bell, Eye, Database, ExternalLink,
  Download, Trash2, RefreshCw, ChevronRight, LogOut
} from 'lucide-react';

interface SettingsSection {
  title: string;
  icon: any;
  items: SettingsItem[];
}

interface SettingsItem {
  label: string;
  description: string;
  type: 'toggle' | 'select' | 'input' | 'link' | 'button';
  value?: any;
  options?: string[];
  placeholder?: string;
  link?: string;
  action?: () => void;
}

const SettingsPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('UTC-5');
  const [autoSave, setAutoSave] = useState(true);

  const settingsSections: SettingsSection[] = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        {
          label: 'Email Preferences',
          description: 'Manage email notifications and communication settings',
          type: 'toggle',
          value: emailNotifications,
          action: () => setEmailNotifications(!emailNotifications)
        },
        {
          label: 'Privacy Settings',
          description: 'Control data sharing and privacy preferences',
          type: 'toggle',
          value: dataSharing,
          action: () => setDataSharing(!dataSharing)
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Push Notifications',
          description: 'Receive push notifications on your device',
          type: 'toggle',
          value: pushNotifications,
          action: () => setPushNotifications(!pushNotifications)
        },
        {
          label: 'Email Notifications',
          description: 'Get updates and alerts via email',
          type: 'toggle',
          value: emailNotifications,
          action: () => setEmailNotifications(!emailNotifications)
        },
        {
          label: 'Career Updates',
          description: 'Notifications about new career opportunities',
          type: 'toggle',
          value: notifications,
          action: () => setNotifications(!notifications)
        }
      ]
    },
    {
      title: 'Appearance',
      icon: Eye,
      items: [
        {
          label: 'Dark Mode',
          description: 'Toggle between light and dark theme',
          type: 'toggle',
          value: isDark,
          action: toggleTheme
        },
        {
          label: 'Language',
          description: 'Choose your preferred language',
          type: 'select',
          value: language,
          options: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']
        },
        {
          label: 'Timezone',
          description: 'Set your local timezone',
          type: 'select',
          value: timezone,
          options: ['UTC-8', 'UTC-5', 'UTC+0', 'UTC+5', 'UTC+8']
        }
      ]
    },
    {
      title: 'Data & Storage',
      icon: Database,
      items: [
        {
          label: 'Export Data',
          description: 'Download all your data and reports',
          type: 'button',
          action: () => handleExportData()
        },
        {
          label: 'Clear Cache',
          description: 'Clear temporary data and cache',
          type: 'button',
          action: () => handleClearCache()
        },
        {
          label: 'Auto-save Reports',
          description: 'Automatically save your analysis reports',
          type: 'toggle',
          value: autoSave,
          action: () => setAutoSave(!autoSave)
        }
      ]
    },
    {
      title: 'External Resources',
      icon: ExternalLink,
      items: [
        {
          label: 'LinkedIn Learning',
          description: 'Access professional courses and certifications',
          type: 'link',
          link: 'https://www.linkedin.com/learning'
        },
        {
          label: 'Coursera',
          description: 'Online courses from top universities',
          type: 'link',
          link: 'https://www.coursera.org'
        }
      ]
    }
  ];

  const handleExportData = () => {
    const exportData = {
      settings: {
        notifications,
        emailNotifications,
        pushNotifications,
        dataSharing,
        language,
        timezone,
        autoSave
      },
      timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `career-guidance-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleClearCache = () => {
    const keysToKeep = ['user', 'theme'];
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    alert('Cache cleared successfully!');
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-3 sm:p-4 lg:p-6`}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className={`mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-5 lg:p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Settings
                </h1>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Back
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4 sm:space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`p-4 sm:p-5 lg:p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <section.icon className={`text-lg sm:text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-1 mb-3 sm:mb-0">
                      <h3 className={`font-medium text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.label}
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>

                    <div className="ml-0 sm:ml-4">
                      {item.type === 'toggle' && (
                        <button
                          onClick={item.action}
                          className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full transition-colors ${
                            item.value ? 'bg-blue-600' : isDark ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white transition-transform ${
                              item.value ? 'translate-x-4 sm:translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                      {item.type === 'select' && (
                        <select
                          value={item.value}
                          onChange={(e) => {
                            if (item.label === 'Language') setLanguage(e.target.value);
                            if (item.label === 'Timezone') setTimezone(e.target.value);
                          }}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base border-2 ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {item.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {item.type === 'button' && (
                        <button
                          onClick={item.action}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition ${
                            isDark 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {item.label === 'Export Data' && <Download className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" />}
                          {item.label === 'Clear Cache' && <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" />}
                          {item.label}
                        </button>
                      )}
                      {item.type === 'link' && (
                        <button
                          onClick={() => handleExternalLink(item.link || '')}
                          className={`flex items-center text-sm sm:text-base font-medium transition ${
                            isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          {item.label}
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Account Management Section */}
        <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border-2 ${isDark ? 'border-red-500/30' : 'border-red-500/30'}`}>
          <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Account Management</h2>
          <p className={`text-xs sm:text-sm mb-4 sm:mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account with these options</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg flex flex-col items-center justify-center gap-2 sm:gap-2 bg-blue-600 text-white text-sm sm:text-base transition hover:bg-blue-700`}>
              <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium">Log Out</span>
            </button>
            <button onClick={() => { if(confirm('Are you sure you want to reset your account? This will clear all your data.')) { localStorage.clear(); window.location.reload(); }}} className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg flex flex-col items-center justify-center gap-2 sm:gap-2 bg-yellow-600 text-white text-sm sm:text-base transition hover:bg-yellow-700`}>
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium">Reset Account</span>
            </button>
            <button onClick={() => { if(confirm('Are you sure you want to delete your account? This action cannot be undone.')) { localStorage.clear(); window.location.reload(); }}} className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg flex flex-col items-center justify-center gap-2 sm:gap-2 bg-red-600 text-white text-sm sm:text-base transition hover:bg-red-700`}>
              <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium">Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

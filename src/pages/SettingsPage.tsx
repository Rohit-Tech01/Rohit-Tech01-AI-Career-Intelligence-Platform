import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Database } from '../supabase/config';
import { User, Camera, Mail, Briefcase, GraduationCap, MapPin, Globe, Github, Linkedin, LogOut, Save, X, Edit2, Check, Plus, Trash2 } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<Database['public']['Tables']['user_profiles']['Row'] | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    skills: [] as string[],
    interests: [] as string[],
    career_goal: '',
    education: '',
    experience: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfileData(data);
        if (data) {
          setFormData({
            bio: data.bio || '',
            location: data.location || '',
            website: data.website || '',
            linkedin: data.linkedin || '',
            github: data.github || '',
            skills: data.skills || [],
            interests: data.interests || [],
            career_goal: data.career_goal || '',
            education: data.education || '',
            experience: data.experience || ''
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const result = await updateProfile(formData);
      
      if (result.success) {
        setMessage({ type: 'success', content: 'Profile updated successfully!' });
        setEditMode(false);
        await fetchUserProfile();
      } else {
        setMessage({ type: 'error', content: result.error || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'An unexpected error occurred' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', content: '' }), 3000);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Manage your profile and account settings
          </p>
        </div>

        {/* Message */}
        {message.content && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-600 border border-green-200' 
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {message.content}
          </div>
        )}

        {/* Profile Section */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Profile Information
            </h2>
            <button
              onClick={() => editMode ? handleSave() : setEditMode(true)}
              disabled={saving}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                editMode
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } disabled:opacity-50`}
            >
              {saving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : editMode ? (
                <div className="flex items-center space-x-2">
                  <Save size={16} />
                  <span>Save</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Edit2 size={16} />
                  <span>Edit</span>
                </div>
              )}
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                {user?.name}
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                {user?.email}
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          {editMode && (
            <>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <MapPin size={16} className="inline mr-1" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <Globe size={16} className="inline mr-1" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <Github size={16} className="inline mr-1" />
                      GitHub
                    </label>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="username"
                      className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <Linkedin size={16} className="inline mr-1" />
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="username"
                      className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Display Fields */}
          {!editMode && (
            <div className="space-y-4">
              {formData.bio && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {formData.bio}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.location && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <MapPin size={16} className="inline mr-1" />
                      Location
                    </label>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      {formData.location}
                    </div>
                  </div>
                )}
                {formData.website && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <Globe size={16} className="inline mr-1" />
                      Website
                    </label>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {formData.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Career Information */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Career Information
          </h2>

          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Briefcase size={16} className="inline mr-1" />
                  Career Goal
                </label>
                <input
                  type="text"
                  name="career_goal"
                  value={formData.career_goal}
                  onChange={handleInputChange}
                  placeholder="What's your career goal?"
                  className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <GraduationCap size={16} className="inline mr-1" />
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Your education background"
                  className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Your work experience"
                  rows={3}
                  className={`w-full p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.career_goal && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Briefcase size={16} className="inline mr-1" />
                    Career Goal
                  </label>
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {formData.career_goal}
                  </div>
                </div>
              )}

              {formData.education && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <GraduationCap size={16} className="inline mr-1" />
                    Education
                  </label>
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {formData.education}
                  </div>
                </div>
              )}

              {formData.experience && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Experience
                  </label>
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {formData.experience}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Skills & Interests */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Skills & Interests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Skills
              </label>
              {editMode ? (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className={`flex-1 p-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    <button
                      onClick={addSkill}
                      className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interests */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Interests
              </label>
              {editMode ? (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add an interest"
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                      className={`flex-1 p-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    <button
                      onClick={addInterest}
                      className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, index) => (
                      <div
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{interest}</span>
                        <button
                          onClick={() => removeInterest(interest)}
                          className="hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Account Settings
          </h2>

          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className={`w-full p-3 rounded-xl font-medium border ${isDark ? 'bg-red-900/50 border-red-700 text-red-300 hover:bg-red-900/70' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'} focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200`}
            >
              <div className="flex items-center justify-center space-x-2">
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

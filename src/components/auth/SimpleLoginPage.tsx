import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Brain,
  Github, Chrome, AlertCircle, CheckCircle, Loader, Heart
} from 'lucide-react';

interface SimpleLoginPageProps {
  onLogin: () => void;
}

const SimpleLoginPage: React.FC<SimpleLoginPageProps> = ({ onLogin }) => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData(prev => ({ ...prev, password }));
    setPasswordStrength(calculatePasswordStrength(password));
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData(prev => ({ ...prev, email }));
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: validateEmail(formData.email) ? '' : 'Please enter a valid email address',
      password: formData.password.length >= 6 ? '' : 'Password must be at least 6 characters'
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      onLogin();
    }
  };

  const handleSocialLogin = async () => {
    setIsLoading(true);
    // Simulate social login
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLogin();
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-yellow-500';
    if (passwordStrength < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-pink-600 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '6s' }} />
      </div>

      <div className={`relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg ${isDark ? 'bg-gray-800/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'} rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 ${
        isDark ? 'border-purple-500/30' : 'border-purple-500/30'
      } animate-in fade-in slide-in-from-bottom-4 duration-500`}>
        {/* Logo/Branding */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-purple-500/30 animate-bounce">
            <Brain className="text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          </div>
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2`}>
            AI Career Intelligence
          </h1>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to discover your perfect career path
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <button
            onClick={() => handleSocialLogin()}
            disabled={isLoading}
            className={`
              relative w-full flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base
              transition-all duration-300 ease-out group
              ${isDark 
                ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }
              hover:scale-105 hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <Chrome className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Continue with Google</span>
            <span className="sm:hidden">Google</span>
            {isLoading && <Loader className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          <button
            onClick={() => handleSocialLogin()}
            disabled={isLoading}
            className={`
              relative w-full flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base
              transition-all duration-300 ease-out group
              ${isDark 
                ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }
              hover:scale-105 hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Continue with GitHub</span>
            <span className="sm:hidden">GitHub</span>
            {isLoading && <Loader className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-4 sm:mb-6">
          <div className={`absolute inset-0 flex items-center ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className={`px-3 sm:px-4 bg-inherit ${isDark ? 'bg-gray-800/80 text-gray-400' : 'bg-white/80 text-gray-500'}`}>
              Or continue with email
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3 flex items-center pointer-events-none">
                <Mail className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleEmailChange}
                className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20' 
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                } focus:outline-none`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {formData.email && !errors.email && (
                <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3 flex items-center pointer-events-none">
                <Lock className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handlePasswordChange}
                className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20' 
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                } focus:outline-none`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center transition-colors duration-300 hover:text-purple-500"
              >
                {showPassword ? (
                  <EyeOff className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <Eye className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Password strength
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {getStrengthText()}
                  </span>
                </div>
                <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}
            
            {errors.password && (
              <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500' 
                    : 'border-gray-300 bg-white text-purple-500 focus:ring-purple-500'
                }`}
              />
              <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Remember me
              </span>
            </label>
            <a href="#" className={`text-xs sm:text-sm font-medium transition-colors duration-300 hover:text-purple-500 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              relative w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg
              transition-all duration-300 ease-out
              group
              bg-gradient-to-r from-purple-600 to-pink-600 text-white
              shadow-lg shadow-purple-500/30
              hover:shadow-2xl hover:shadow-purple-500/40
              hover:scale-105
              active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            `}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
            
            {/* Icon */}
            {isLoading ? (
              <Loader className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Sparkles 
                className="transition-transform duration-300 group-hover:rotate-12 w-4 h-4 sm:w-5 sm:h-5" 
              />
            )}
            
            {/* Text */}
            <span className="relative z-10">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </span>
            
            {/* Arrow */}
            {!isLoading && (
              <ArrowRight 
                className="transition-transform duration-300 group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5" 
              />
            )}
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4 sm:mt-6">
          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <a href="#" className={`font-semibold transition-colors duration-300 hover:text-purple-500 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              Sign up for free
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className={`text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
          <div className="flex items-center justify-center space-x-1 mt-1.5 sm:mt-2">
            <span className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Made with
            </span>
            <Heart className="text-red-500 fill-red-500 animate-pulse w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              by AI Career Intelligence
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoginPage;

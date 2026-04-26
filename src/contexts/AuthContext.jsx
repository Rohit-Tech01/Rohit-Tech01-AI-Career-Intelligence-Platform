import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing user session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          apiService.setToken(token);
          const response = await apiService.getCurrentUser();
          if (response.success) {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        apiService.clearToken();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.login(credentials);
      
      if (response.success) {
        const { user: userData, token } = response.data;
        setUser(userData);
        apiService.setToken(token);
        localStorage.setItem('token', token);
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.signup(userData);
      
      if (response.success) {
        const { user: newUser, token } = response.data;
        setUser(newUser);
        apiService.setToken(token);
        localStorage.setItem('token', token);
        return { success: true, user: newUser };
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Google authentication
  const googleAuth = async (token) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.googleAuth(token);
      
      if (response.success) {
        const { user: userData, token: authToken } = response.data;
        setUser(userData);
        apiService.setToken(authToken);
        localStorage.setItem('token', authToken);
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'Google authentication failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Google authentication failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // GitHub authentication
  const githubAuth = async (code) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.githubAuth(code);
      
      if (response.success) {
        const { user: userData, token: authToken } = response.data;
        setUser(userData);
        apiService.setToken(authToken);
        localStorage.setItem('token', authToken);
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'GitHub authentication failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'GitHub authentication failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      apiService.clearToken();
      localStorage.removeItem('token');
      setError(null);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.updateProfile(profileData);
      
      if (response.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.changePassword(passwordData);
      
      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.message || 'Password change failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Password change failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async (password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.deleteAccount(password);
      
      if (response.success) {
        setUser(null);
        apiService.clearToken();
        localStorage.removeItem('token');
        return { success: true };
      } else {
        throw new Error(response.message || 'Account deletion failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Account deletion failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    googleAuth,
    githubAuth,
    logout,
    updateProfile,
    changePassword,
    deleteAccount,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

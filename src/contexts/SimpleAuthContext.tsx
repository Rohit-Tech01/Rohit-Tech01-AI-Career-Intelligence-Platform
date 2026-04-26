import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface SimpleAuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithGitHub: () => Promise<{ success: boolean; error?: string }>;
  signInWithLinkedIn: () => Promise<{ success: boolean; error?: string }>;
}

const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export const SimpleAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        profile_image: null,
        provider: 'email'
      };

      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        profile_image: null,
        provider: 'email'
      };

      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    // Clear state and localStorage
    setUser(null);
    localStorage.removeItem('user');
    
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user object
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: 'Google User',
        email: 'user@gmail.com',
        profile_image: 'https://ui-avatars.com/api/?name=Google&background=4285f4&color=fff',
        provider: 'google'
      };

      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Google sign in failed' };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    try {
      setLoading(true);
      
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user object
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: 'GitHub User',
        email: 'user@github.com',
        profile_image: 'https://ui-avatars.com/api/?name=GitHub&background=333&color=fff',
        provider: 'github'
      };

      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'GitHub sign in failed' };
    } finally {
      setLoading(false);
    }
  };

  const signInWithLinkedIn = async () => {
    try {
      setLoading(true);
      
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user object
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: 'LinkedIn User',
        email: 'user@linkedin.com',
        profile_image: 'https://ui-avatars.com/api/?name=LinkedIn&background=0077b5&color=fff',
        provider: 'linkedin'
      };

      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'LinkedIn sign in failed' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleAuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      signInWithGoogle,
      signInWithGitHub,
      signInWithLinkedIn
    }}>
      {children}
    </SimpleAuthContext.Provider>
  );
};

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
};

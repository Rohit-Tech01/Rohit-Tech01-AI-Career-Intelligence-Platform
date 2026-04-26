import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface MVPAuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const MVPAuthContext = createContext<MVPAuthContextType | undefined>(undefined);

export const MVPAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simple direct login - no complexity
  const login = (email: string, password: string) => {
    const newUser: User = {
      id: 'demo-user',
      name: email.split('@')[0] || 'Demo User',
      email: email,
      profile_image: null,
      provider: 'email'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <MVPAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </MVPAuthContext.Provider>
  );
};

export const useMVPAuth = () => {
  const context = useContext(MVPAuthContext);
  if (!context) {
    throw new Error('useMVPAuth must be used within MVPAuthProvider');
  }
  return context;
};

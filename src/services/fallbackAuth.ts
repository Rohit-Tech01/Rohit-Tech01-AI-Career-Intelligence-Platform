import { User } from '../types';

// Fallback authentication service for demo purposes
export class FallbackAuth {
  private static instance: FallbackAuth;
  private currentUser: User | null = null;
  private listeners: Array<(user: User | null) => void> = [];

  private constructor() {
    // Load user from localStorage on init
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  static getInstance(): FallbackAuth {
    if (!FallbackAuth.instance) {
      FallbackAuth.instance = new FallbackAuth();
    }
    return FallbackAuth.instance;
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    callback(this.currentUser);
    
    return {
      unsubscribe: () => {
        this.listeners = this.listeners.filter(listener => listener !== callback);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  async signInWithEmail(email: string, password: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const user: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        profile_image: null,
        provider: 'email'
      };

      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.notifyListeners();

      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Login failed' };
    }
  }

  async signUpWithEmail(name: string, email: string, password: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const user: User = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        profile_image: null,
        provider: 'email'
      };

      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.notifyListeners();

      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Signup failed' };
    }
  }

  async signInWithOAuth(provider: 'google' | 'github' | 'linkedin') {
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock user based on provider
      const user: User = {
        id: `user_${Date.now()}`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.com`,
        profile_image: `https://ui-avatars.com/api/?name=${provider}&background=random`,
        provider: provider
      };

      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.notifyListeners();

      return { user, error: null };
    } catch (error) {
      return { user: null, error: `${provider} sign in failed` };
    }
  }

  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.notifyListeners();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async getSession() {
    return {
      data: { session: this.currentUser ? { user: this.currentUser } : null },
      error: null
    };
  }
}

export const fallbackAuth = FallbackAuth.getInstance();

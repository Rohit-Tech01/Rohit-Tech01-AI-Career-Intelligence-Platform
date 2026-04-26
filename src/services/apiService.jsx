// API Service for Frontend-Backend Communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async googleAuth(token) {
    return this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async githubAuth(code) {
    return this.request('/auth/github', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // Analysis methods
  async createAnalysis(analysisData) {
    return this.request('/analysis', {
      method: 'POST',
      body: JSON.stringify(analysisData),
    });
  }

  async getAnalyses(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/analysis?${queryString}`);
  }

  async getLatestAnalysis() {
    return this.request('/analysis/latest');
  }

  async getAnalysis(id) {
    return this.request(`/analysis/${id}`);
  }

  async deleteAnalysis(id) {
    return this.request(`/analysis/${id}`, {
      method: 'DELETE',
    });
  }

  async getAnalysisStats() {
    return this.request('/analysis/stats/summary');
  }

  // Chat methods
  async sendMessage(message, sessionId) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    });
  }

  async getChatHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/chat/history?${queryString}`);
  }

  async getChatSession(sessionId) {
    return this.request(`/chat/session/${sessionId}`);
  }

  async deleteChatSession(sessionId) {
    return this.request(`/chat/session/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async clearChatHistory() {
    return this.request('/chat/clear', {
      method: 'POST',
    });
  }

  async getChatStats() {
    return this.request('/chat/stats');
  }

  // User methods
  async updateProfile(profileData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData) {
    return this.request('/user/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  async deleteAccount(password) {
    return this.request('/user/account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
  }

  async getDashboardData() {
    return this.request('/user/dashboard');
  }

  async getExports() {
    return this.request('/user/exports');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export singleton instance
const apiService = new ApiService();

export default apiService;

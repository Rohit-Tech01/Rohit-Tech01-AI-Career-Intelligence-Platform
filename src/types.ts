export interface User {
  id: string;
  name: string;
  email: string;
  profile_image?: string | null;
  provider?: 'email' | 'google' | 'github' | 'linkedin';
}

export interface UserProfile {
  id: string;
  user_id: string;
  skills: string[];
  interests: string[];
  career_goal: string;
  education: string;
  experience: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AnalysisReport {
  id: string;
  user_id: string;
  type: 'resume' | 'survey' | 'career';
  score: number;
  data_json: any;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  metadata?: any;
  created_at: string;
}

export interface WorkflowStep {
  LOGIN: 'login';
  SURVEY: 'survey';
  ANALYSIS: 'analysis';
  DASHBOARD: 'dashboard';
}

export interface HollandCode {
  Realistic: number;
  Investigative: number;
  Artistic: number;
  Social: number;
  Enterprising: number;
  Conventional: number;
}

export interface CareerReport {
  hollandCode: HollandCode;
  personalityType: string;
  recommendedCareers: Array<{
    title: string;
    match: number;
    description: string;
    skills: string[];
  }>;
  skillGaps: string[];
  learningPath: Array<{
    skill: string;
    level: string;
    resources: string[];
  }>;
}

export interface ResumeAnalysis {
  score: number;
  sections: {
    contact: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
  };
  suggestions: string[];
  keywords: string[];
  formatting: {
    issues: string[];
    recommendations: string[];
  };
}

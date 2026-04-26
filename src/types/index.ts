export interface User {
  id: string;
  name: string;
  email: string;
}

export interface HollandCode {
  Realistic: number;
  Investigative: number;
  Artistic: number;
  Social: number;
  Enterprising: number;
  Conventional: number;
  primary?: string;
  secondary?: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  requiredSkills: string[];
  averageSalary?: string;
  jobOutlook?: string;
  hollandMatch: string[];
}

export interface ResumeAnalysis {
  skills: string[];
  experience: string[];
  education: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface SkillGap {
  skill: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  importance: 'high' | 'medium' | 'low';
}

export interface LearningPath {
  id: string;
  careerTitle: string;
  steps: LearningStep[];
  estimatedTimeMonths: number;
}

export interface LearningStep {
  order: number;
  title: string;
  description: string;
  resources: string[];
  estimatedWeeks: number;
  skills: string[];
}

export interface CareerReport {
  id: string;
  userId: string;
  createdAt: string;
  resumeAnalysis: ResumeAnalysis;
  hollandCode: HollandCode;
  careerRecommendations: CareerRecommendation[];
  learningRoadmap: LearningPath[];
  skillGaps: SkillGap[];
}

export interface PersonalityQuestion {
  id: number;
  question: string;
  answers: {
    text: string;
    category: keyof HollandCode;
  }[];
}

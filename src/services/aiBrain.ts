// ULTRA-ADVANCED AI BRAIN - LLM-Powered Resume Intelligence
// Integrates OpenAI GPT for human-like resume understanding and analysis

import OpenAI from 'openai';
import { ParsedResume } from './pdfParser';

// Initialize OpenAI client (you'll need to set up API key)
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || 'your-api-key-here',
  dangerouslyAllowBrowser: true // For demo purposes - in production, use backend
});

export interface AIAnalysis {
  humanScore: number;
  insights: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    careerAdvice: string[];
  };
  personalizedFeedback: {
    tone: 'encouraging' | 'professional' | 'motivational';
    message: string;
    nextSteps: string[];
  };
  contextualUnderstanding: {
    careerLevel: string;
    industryFit: string;
    growthPotential: string;
    marketValue: string;
  };
  chatResponses: Record<string, string>;
}

export interface InterviewSimulation {
  questions: {
    question: string;
    type: 'behavioral' | 'technical' | 'situational';
    difficulty: 'easy' | 'medium' | 'hard';
    expectedAnswer: string;
    evaluationCriteria: string[];
  }[];
  feedback: {
    communication: number;
    technical: number;
    confidence: number;
    overall: number;
  };
  personalizedTips: string[];
}

export interface CareerPrediction {
  twoYearProjection: {
    likelyRole: string;
    salaryRange: string;
    confidence: number;
    requiredSkills: string[];
    riskFactors: string[];
  };
  fiveYearProjection: {
    potentialRoles: string[];
    salaryCeiling: string;
    leadershipPotential: number;
    industryTrends: string[];
  };
  skillEvolution: {
    currentSkills: string[];
    emergingSkills: string[];
    decliningSkills: string[];
    learningPriority: string[];
  };
}

export interface SkillDNAGraph {
  nodes: {
    id: string;
    name: string;
    category: 'technical' | 'soft' | 'domain';
    level: number;
    connections: number;
    marketDemand: number;
  }[];
  edges: {
    source: string;
    target: string;
    relationship: 'prerequisite' | 'enhances' | 'related';
    strength: number;
  }[];
  clusters: {
    name: string;
    skills: string[];
    description: string;
  }[];
}

export interface AutoResumeBuilder {
  optimizedContent: {
    summary: string;
    experience: string[];
    skills: string[];
    projects: string[];
  };
  atsOptimization: {
    keywords: string[];
    score: number;
    improvements: string[];
  };
  formats: {
    developer: string;
    dataScientist: string;
    manager: string;
    fresher: string;
  };
}

export interface CareerAssistantChat {
  conversation: {
    question: string;
    answer: string;
    timestamp: Date;
    category: string;
  }[];
  personalizedAdvice: {
    skillRecommendations: string[];
    careerPath: string[];
    marketInsights: string[];
    learningResources: string[];
  };
  contextMemory: {
    userGoals: string[];
    currentSkills: string[];
    targetRole: string;
    experience: string[];
  };
}

class UltraAdvancedAIBrain {
  private conversationHistory: Array<{role: string; content: string}> = [];
  
  async analyzeResumeWithAI(resumeText: string, resumeData: ParsedResume): Promise<AIAnalysis> {
    try {
      // Create comprehensive prompt for GPT analysis
      const analysisPrompt = `
        You are an expert career coach and technical recruiter with 15+ years of experience. 
        Analyze this resume and provide human-like, personalized feedback:

        RESUME TEXT:
        ${resumeText}

        EXTRACTED DATA:
        - Skills: ${resumeData.extractedSkills.join(', ')}
        - Experience: ${resumeData.workExperience.length} positions
        - Education: ${resumeData.education.length} degrees
        - Projects: ${resumeData.projects.length} projects
        - Certifications: ${resumeData.certifications.length} certifications

        Please provide:
        1. Overall score (0-100) based on real-world hiring standards
        2. Specific strengths that would impress recruiters
        3. Areas that need improvement with actionable advice
        4. Career advice based on current profile
        5. Personalized feedback in an encouraging tone
        6. Contextual understanding of career level and potential

        Format your response as JSON with these exact keys:
        {
          "humanScore": number,
          "insights": {
            "strengths": [string],
            "weaknesses": [string],
            "recommendations": [string],
            "careerAdvice": [string]
          },
          "personalizedFeedback": {
            "tone": "encouraging|professional|motivational",
            "message": string,
            "nextSteps": [string]
          },
          "contextualUnderstanding": {
            "careerLevel": string,
            "industryFit": string,
            "growthPotential": string,
            "marketValue": string
          }
        }
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert career coach and technical recruiter. Provide honest, constructive, and encouraging feedback. Always be specific and actionable."
          },
          {
            role: "user",
            content: analysisPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || '{}');
      
      // Generate chat responses for common questions
      const chatResponses = await this.generateChatResponses(resumeData, aiResponse);

      return {
        ...aiResponse,
        chatResponses
      };

    } catch (error) {
      console.error('Error in AI analysis:', error);
      // Fallback to basic analysis
      return this.getFallbackAnalysis(resumeData);
    }
  }

  async generateInterviewQuestions(resumeData: ParsedResume, targetRole: string): Promise<InterviewSimulation> {
    try {
      const prompt = `
        You are hiring for a ${targetRole} position. Based on this candidate's profile:
        
        SKILLS: ${resumeData.extractedSkills.join(', ')}
        EXPERIENCE: ${resumeData.workExperience.map(exp => exp.title + ' at ' + exp.company).join(', ')}
        PROJECTS: ${resumeData.projects.map(proj => proj.title).join(', ')}
        
        Generate 5 interview questions that would be asked for this role:
        - 2 behavioral questions
        - 2 technical questions  
        - 1 situational question
        
        For each question, provide:
        1. The question itself
        2. Type (behavioral/technical/situational)
        3. Difficulty (easy/medium/hard)
        4. What a good answer should include
        5. Evaluation criteria
        
        Format as JSON array with these exact keys for each question.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an experienced technical interviewer. Generate realistic, challenging questions that test both technical skills and cultural fit."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      });

      const questions = JSON.parse(response.choices[0].message.content || '[]');

      // Generate feedback framework
      const feedback = {
        communication: 85,
        technical: 75,
        confidence: 80,
        overall: 80
      };

      const personalizedTips = [
        "Research the company's recent projects and mention them in your answers",
        "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
        "Be prepared to discuss your projects in detail, including challenges faced",
        "Ask thoughtful questions about the role and team culture",
        "Practice explaining complex technical concepts simply"
      ];

      return {
        questions,
        feedback,
        personalizedTips
      };

    } catch (error) {
      console.error('Error generating interview questions:', error);
      return this.getFallbackInterview();
    }
  }

  async predictCareerTrajectory(resumeData: ParsedResume, currentRole: string): Promise<CareerPrediction> {
    try {
      const prompt = `
        Based on this candidate's profile, predict their career trajectory:
        
        CURRENT ROLE: ${currentRole}
        SKILLS: ${resumeData.extractedSkills.join(', ')}
        EXPERIENCE: ${resumeData.workExperience.length} years
        PROJECTS: ${resumeData.projects.length} completed projects
        
        Analyze and predict:
        1. Where they'll be in 2 years (role, salary, confidence)
        2. Where they'll be in 5 years (potential roles, salary ceiling, leadership potential)
        3. Skill evolution (current, emerging, declining skills)
        4. Learning priorities
        
        Consider current market trends and growth patterns. Be realistic but optimistic.
        
        Format as JSON with exact keys for twoYearProjection, fiveYearProjection, and skillEvolution.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a career prediction expert with deep knowledge of industry trends and skill evolution. Provide data-driven, realistic predictions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1200
      });

      return JSON.parse(response.choices[0].message.content || '{}');

    } catch (error) {
      console.error('Error predicting career trajectory:', error);
      return this.getFallbackCareerPrediction(resumeData);
    }
  }

  async generateSkillDNAGraph(skills: string[]): Promise<SkillDNAGraph> {
    // Define skill relationships and create network graph
    const skillRelationships = {
      'JavaScript': ['React', 'Node.js', 'TypeScript', 'Vue.js'],
      'Python': ['Machine Learning', 'Data Science', 'Django', 'Flask'],
      'React': ['JavaScript', 'Redux', 'Next.js', 'TypeScript'],
      'Machine Learning': ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
      'AWS': ['Cloud Computing', 'DevOps', 'Docker', 'Kubernetes'],
      'Data Science': ['Python', 'Statistics', 'Machine Learning', 'SQL'],
      'DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      'Node.js': ['JavaScript', 'Express', 'MongoDB', 'REST APIs'],
      'TypeScript': ['JavaScript', 'React', 'Node.js', 'Angular'],
      'Docker': ['Kubernetes', 'DevOps', 'AWS', 'Microservices']
    };

    const nodes: SkillDNAGraph['nodes'] = [];
    const edges: SkillDNAGraph['edges'] = [];
    const nodeMap = new Map<string, any>();

    // Create nodes
    skills.forEach(skill => {
      const node = {
        id: skill,
        name: skill,
        category: this.categorizeSkill(skill),
        level: this.assessSkillLevel(skill),
        connections: skillRelationships[skill]?.length || 0,
        marketDemand: this.getMarketDemand(skill)
      };
      nodes.push(node);
      nodeMap.set(skill, node);
    });

    // Create edges
    skills.forEach(skill => {
      const relationships = skillRelationships[skill] || [];
      relationships.forEach(related => {
        if (skills.includes(related)) {
          edges.push({
            source: skill,
            target: related,
            relationship: this.determineRelationship(skill, related),
            strength: Math.random() * 0.5 + 0.5
          });
        }
      });
    });

    // Create clusters
    const clusters = this.createSkillClusters(skills);

    return {
      nodes,
      edges,
      clusters
    };
  }

  async buildOptimizedResume(resumeData: ParsedResume, targetRole: string): Promise<AutoResumeBuilder> {
    try {
      const prompt = `
        Rewrite and optimize this resume for a ${targetRole} position:
        
        CURRENT CONTENT:
        - Experience: ${JSON.stringify(resumeData.workExperience)}
        - Skills: ${resumeData.extractedSkills.join(', ')}
        - Projects: ${JSON.stringify(resumeData.projects)}
        
        Create optimized content that:
        1. Uses industry-standard terminology
        2. Includes ATS-friendly keywords
        3. Highlights quantifiable achievements
        4. Shows impact and results
        5. Is tailored for ${targetRole} role
        
        Generate different versions:
        - Developer format
        - Data Scientist format  
        - Manager format
        - Fresher format
        
        Format as JSON with keys: optimizedContent, atsOptimization, formats
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer and ATS optimization specialist. Create compelling, keyword-optimized content that passes automated screening."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      return JSON.parse(response.choices[0].message.content || '{}');

    } catch (error) {
      console.error('Error building optimized resume:', error);
      return this.getFallbackResumeBuilder(resumeData);
    }
  }

  async chatWithCareerAssistant(question: string, context: any): Promise<string> {
    try {
      // Add context to conversation
      const contextPrompt = `
        USER CONTEXT:
        - Current Role: ${context.currentRole || 'Not specified'}
        - Skills: ${context.skills?.join(', ') || 'Not specified'}
        - Experience: ${context.experience || 'Not specified'}
        - Goals: ${context.goals?.join(', ') || 'Not specified'}
        
        PREVIOUS CONVERSATION:
        ${this.conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n')}
        
        USER QUESTION: ${question}
        
        As an expert career coach, provide a helpful, personalized response. Be encouraging but realistic. 
        If asking about skills, consider their current skill set. If asking about career path, consider their experience level.
      `;

      this.conversationHistory.push({ role: 'user', content: question });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a knowledgeable, supportive career coach. Provide personalized advice based on the user's context. Be encouraging and actionable."
          },
          {
            role: "user",
            content: contextPrompt
          }
        ],
        temperature: 0.8,
        max_tokens: 800
      });

      const answer = response.choices[0].message.content || "I'm here to help with your career questions!";
      
      this.conversationHistory.push({ role: 'assistant', content: answer });
      
      // Keep conversation history manageable
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      return answer;

    } catch (error) {
      console.error('Error in career assistant chat:', error);
      return "I'm experiencing some technical difficulties, but I'm here to help! Could you try rephrasing your question?";
    }
  }

  // Helper methods
  private async generateChatResponses(resumeData: ParsedResume, analysis: any): Promise<Record<string, string>> {
    const commonQuestions = [
      "Why is my score low?",
      "How can I improve my resume?",
      "What skills should I learn next?",
      "Am I ready for a senior role?",
      "What salary should I expect?"
    ];

    const responses: Record<string, string> = {};

    for (const question of commonQuestions) {
      try {
        const prompt = `
          Based on this resume analysis, answer this question: "${question}"
          
          ANALYSIS: ${JSON.stringify(analysis)}
          SKILLS: ${resumeData.extractedSkills.join(', ')}
          EXPERIENCE: ${resumeData.workExperience.length} positions
          
          Provide a helpful, specific answer in 2-3 sentences.
        `;

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 200
        });

        responses[question] = response.choices[0].message.content || "I'd be happy to help with that!";
      } catch (error) {
        responses[question] = "I can provide personalized advice on that topic!";
      }
    }

    return responses;
  }

  private categorizeSkill(skill: string): 'technical' | 'soft' | 'domain' {
    const technicalSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'SQL', 'MongoDB'];
    const softSkills = ['Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Time Management'];
    
    if (technicalSkills.some(tech => skill.toLowerCase().includes(tech.toLowerCase()))) {
      return 'technical';
    }
    if (softSkills.some(soft => skill.toLowerCase().includes(soft.toLowerCase()))) {
      return 'soft';
    }
    return 'domain';
  }

  private assessSkillLevel(skill: string): number {
    // Simplified assessment - in real implementation, would analyze context
    const advancedSkills = ['Machine Learning', 'Kubernetes', 'AWS', 'DevOps'];
    const intermediateSkills = ['React', 'Node.js', 'Python', 'TypeScript'];
    
    if (advancedSkills.some(adv => skill.toLowerCase().includes(adv.toLowerCase()))) return 4;
    if (intermediateSkills.some(int => skill.toLowerCase().includes(int.toLowerCase()))) return 3;
    return 2;
  }

  private getMarketDemand(skill: string): number {
    const highDemandSkills = ['Machine Learning', 'AWS', 'DevOps', 'React', 'Python'];
    const mediumDemandSkills = ['JavaScript', 'Node.js', 'Docker', 'TypeScript'];
    
    if (highDemandSkills.some(hd => skill.toLowerCase().includes(hd.toLowerCase()))) return 0.9;
    if (mediumDemandSkills.some(md => skill.toLowerCase().includes(md.toLowerCase()))) return 0.7;
    return 0.5;
  }

  private determineRelationship(skill1: string, skill2: string): 'prerequisite' | 'enhances' | 'related' {
    const prerequisites = {
      'JavaScript': ['React', 'Node.js', 'TypeScript'],
      'Python': ['Machine Learning', 'Data Science'],
      'AWS': ['DevOps', 'Kubernetes']
    };
    
    if (prerequisites[skill1]?.includes(skill2)) return 'prerequisite';
    if (prerequisites[skill2]?.includes(skill1)) return 'enhances';
    return 'related';
  }

  private createSkillClusters(skills: string[]): SkillDNAGraph['clusters'] {
    const clusters: SkillDNAGraph['clusters'] = [];
    
    const webDevSkills = skills.filter(s => ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS'].some(web => s.toLowerCase().includes(web.toLowerCase())));
    if (webDevSkills.length > 0) {
      clusters.push({
        name: 'Web Development',
        skills: webDevSkills,
        description: 'Frontend and backend web technologies'
      });
    }
    
    const dataSkills = skills.filter(s => ['Python', 'Machine Learning', 'Data Science', 'SQL', 'Pandas'].some(data => s.toLowerCase().includes(data.toLowerCase())));
    if (dataSkills.length > 0) {
      clusters.push({
        name: 'Data Science',
        skills: dataSkills,
        description: 'Data analysis and machine learning'
      });
    }
    
    const cloudSkills = skills.filter(s => ['AWS', 'Docker', 'Kubernetes', 'DevOps', 'Cloud'].some(cloud => s.toLowerCase().includes(cloud.toLowerCase())));
    if (cloudSkills.length > 0) {
      clusters.push({
        name: 'Cloud & DevOps',
        skills: cloudSkills,
        description: 'Cloud infrastructure and deployment'
      });
    }
    
    return clusters;
  }

  // Fallback methods for when AI is unavailable
  private getFallbackAnalysis(resumeData: ParsedResume): AIAnalysis {
    return {
      humanScore: 75,
      insights: {
        strengths: ['Good technical foundation', 'Relevant experience'],
        weaknesses: ['Limited quantifiable achievements', 'Few certifications'],
        recommendations: ['Add metrics to achievements', 'Get relevant certifications'],
        careerAdvice: ['Focus on skill development', 'Build portfolio projects']
      },
      personalizedFeedback: {
        tone: 'encouraging',
        message: 'You have a solid foundation with room for growth.',
        nextSteps: ['Enhance project descriptions', 'Add certifications']
      },
      contextualUnderstanding: {
        careerLevel: 'Mid-level',
        industryFit: 'Technology',
        growthPotential: 'High',
        marketValue: '$80,000 - $120,000'
      },
      chatResponses: {
        "Why is my score low?": "Your score is actually quite good! Focus on adding more specific achievements.",
        "How can I improve my resume?": "Add quantifiable metrics and obtain relevant certifications.",
        "What skills should I learn next?": "Based on your profile, consider learning cloud technologies.",
        "Am I ready for a senior role?": "You're on the right track! Gain more leadership experience.",
        "What salary should I expect?": "With your experience, expect $80,000-$120,000 depending on location."
      }
    };
  }

  private getFallbackInterview(): InterviewSimulation {
    return {
      questions: [
        {
          question: "Tell me about a challenging project you worked on.",
          type: 'behavioral',
          difficulty: 'medium',
          expectedAnswer: "Describe the project, challenges faced, and how you overcame them.",
          evaluationCriteria: ['Problem-solving skills', 'Communication', 'Technical knowledge']
        }
      ],
      feedback: {
        communication: 80,
        technical: 75,
        confidence: 85,
        overall: 80
      },
      personalizedTips: ['Be specific about your contributions', 'Show enthusiasm', 'Ask thoughtful questions']
    };
  }

  private getFallbackCareerPrediction(resumeData: ParsedResume): CareerPrediction {
    return {
      twoYearProjection: {
        likelyRole: 'Senior Developer',
        salaryRange: '$100,000 - $130,000',
        confidence: 75,
        requiredSkills: ['Leadership', 'System Design', 'Mentoring'],
        riskFactors: ['Rapid technological changes', 'Competition']
      },
      fiveYearProjection: {
        potentialRoles: ['Tech Lead', 'Engineering Manager', 'Solutions Architect'],
        salaryCeiling: '$150,000 - $200,000',
        leadershipPotential: 70,
        industryTrends: ['AI integration', 'Cloud computing', 'Remote work']
      },
      skillEvolution: {
        currentSkills: resumeData.extractedSkills,
        emergingSkills: ['AI/ML', 'Cloud Architecture', 'DevOps'],
        decliningSkills: ['Legacy technologies'],
        learningPriority: ['Cloud computing', 'AI/ML basics', 'Leadership skills']
      }
    };
  }

  private getFallbackResumeBuilder(resumeData: ParsedResume): AutoResumeBuilder {
    return {
      optimizedContent: {
        summary: "Experienced software developer with a passion for building scalable applications.",
        experience: ["Led development of key features", "Improved system performance"],
        skills: resumeData.extractedSkills,
        projects: ["Built full-stack applications", "Implemented machine learning models"]
      },
      atsOptimization: {
        keywords: resumeData.extractedSkills,
        score: 85,
        improvements: ['Add more keywords', 'Quantify achievements']
      },
      formats: {
        developer: "Technical resume focused on development skills",
        dataScientist: "Data-focused resume highlighting analytical skills",
        manager: "Leadership-focused resume",
        fresher: "Entry-level resume emphasizing potential"
      }
    };
  }
}

export const ultraAdvancedAIBrain = new UltraAdvancedAIBrain();

// AI INTERVIEW SIMULATOR - Voice-based Mock Interviews with Real-time Feedback
// Integrates speech recognition and synthesis for realistic interview practice

import { ultraAdvancedAIBrain, InterviewSimulation } from './aiBrain';

export interface VoiceInterviewSession {
  id: string;
  role: string;
  type: 'technical' | 'behavioral' | 'mixed';
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  responses: InterviewResponse[];
  realTimeFeedback: RealTimeFeedback;
  overallScore: number;
  startTime: Date;
  endTime?: Date;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedAnswer: string;
  evaluationCriteria: string[];
  timeLimit: number; // in seconds
  followUpQuestions?: string[];
}

export interface InterviewResponse {
  questionId: string;
  transcript: string;
  audioUrl?: string;
  duration: number;
  confidence: number;
  feedback: ResponseFeedback;
  followUpResponses?: InterviewResponse[];
}

export interface ResponseFeedback {
  content: {
    relevance: number;
    completeness: number;
    clarity: number;
    technicalAccuracy: number;
  };
  delivery: {
    pace: number;
    confidence: number;
    fillerWords: number;
    pauses: number;
  };
  overall: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

export interface RealTimeFeedback {
  currentMetrics: {
    speakingRate: number;
    confidenceLevel: number;
    keywordUsage: number;
    relevanceScore: number;
  };
  alerts: {
    type: 'pace' | 'confidence' | 'relevance' | 'time';
    message: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  encouragement: string[];
}

export interface InterviewAnalytics {
  sessionHistory: VoiceInterviewSession[];
  performanceTrends: {
    overallScore: number[];
    contentScores: number[];
    deliveryScores: number[];
    confidenceScores: number[];
  };
  skillGaps: string[];
  improvementAreas: string[];
  readinessLevel: 'beginner' | 'intermediate' | 'advanced' | 'ready';
}

class AIInterviewSimulator {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isRecording = false;
  private speechRecognition: any = null;
  private speechSynthesis: SpeechSynthesis | null = null;

  constructor() {
    this.initializeSpeechAPIs();
  }

  private initializeSpeechAPIs() {
    // Initialize Web Speech API for recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-US';
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis;
    }
  }

  async startInterviewSession(role: string, type: 'technical' | 'behavioral' | 'mixed'): Promise<VoiceInterviewSession> {
    try {
      // Generate interview questions using AI
      const resumeData = await this.getResumeData(); // Get user's resume data
      const interviewSimulation = await ultraAdvancedAIBrain.generateInterviewQuestions(resumeData, role);
      
      // Create structured questions
      const questions: InterviewQuestion[] = interviewSimulation.questions.map((q, index) => ({
        id: `q_${index}`,
        question: q.question,
        type: q.type,
        difficulty: q.difficulty,
        expectedAnswer: q.expectedAnswer,
        evaluationCriteria: q.evaluationCriteria,
        timeLimit: this.getTimeLimit(q.type, q.difficulty),
        followUpQuestions: this.generateFollowUpQuestions(q.type, q.difficulty)
      }));

      const session: VoiceInterviewSession = {
        id: `session_${Date.now()}`,
        role,
        type,
        questions,
        currentQuestionIndex: 0,
        responses: [],
        realTimeFeedback: this.initializeRealTimeFeedback(),
        overallScore: 0,
        startTime: new Date()
      };

      return session;
    } catch (error) {
      console.error('Error starting interview session:', error);
      throw new Error('Failed to start interview session');
    }
  }

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.processAudioResponse(audioBlob);
      };

      this.mediaRecorder.start();
      this.isRecording = true;

      // Start speech recognition for real-time feedback
      if (this.speechRecognition) {
        this.speechRecognition.start();
        this.setupRealTimeAnalysis();
      }

    } catch (error) {
      console.error('Error starting recording:', error);
      throw new Error('Failed to access microphone');
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;

      if (this.speechRecognition) {
        this.speechRecognition.stop();
      }
    }
  }

  async speakText(text: string): Promise<void> {
    if (!this.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => resolve();
      
      this.speechSynthesis.speak(utterance);
    });
  }

  private async processAudioResponse(audioBlob: Blob): Promise<void> {
    try {
      // Convert audio to text using speech recognition
      const transcript = await this.transcribeAudio(audioBlob);
      
      // Analyze response with AI
      const feedback = await this.analyzeResponse(transcript);
      
      // Generate real-time feedback
      const realTimeMetrics = this.calculateRealTimeMetrics(transcript);
      
      // Update session with response
      // This would be handled by the component managing the session
      
    } catch (error) {
      console.error('Error processing audio response:', error);
    }
  }

  private async transcribeAudio(audioBlob: Blob): Promise<string> {
    // In a real implementation, you would use:
    // - OpenAI Whisper API
    // - Google Speech-to-Text
    // - Azure Speech Services
    
    // For demo purposes, return a mock transcript
    return "This is a sample response from the user about their experience and skills.";
  }

  private async analyzeResponse(transcript: string): Promise<ResponseFeedback> {
    try {
      const prompt = `
        Analyze this interview response and provide detailed feedback:
        
        RESPONSE: "${transcript}"
        
        Evaluate on:
        1. Content quality (relevance, completeness, clarity, technical accuracy)
        2. Delivery quality (pace, confidence, filler words, pauses)
        3. Overall score (0-100)
        4. Strengths and areas for improvement
        5. Specific suggestions
        
        Format as JSON with keys: content, delivery, overall, strengths, improvements, suggestions
      `;

      // In a real implementation, call OpenAI API
      // For now, return mock feedback
      return {
        content: {
          relevance: 85,
          completeness: 75,
          clarity: 80,
          technicalAccuracy: 70
        },
        delivery: {
          pace: 75,
          confidence: 80,
          fillerWords: 15,
          pauses: 20
        },
        overall: 78,
        strengths: ['Good technical knowledge', 'Clear communication'],
        improvements: ['Add more specific examples', 'Reduce filler words'],
        suggestions: ['Use STAR method for behavioral questions', 'Practice technical explanations']
      };
    } catch (error) {
      console.error('Error analyzing response:', error);
      return this.getFallbackFeedback();
    }
  }

  private calculateRealTimeMetrics(transcript: string): RealTimeFeedback['currentMetrics'] {
    const words = transcript.split(' ').length;
    const estimatedDuration = words / 150; // Average speaking rate
    
    return {
      speakingRate: words / estimatedDuration,
      confidenceLevel: this.estimateConfidence(transcript),
      keywordUsage: this.countKeywords(transcript),
      relevanceScore: this.estimateRelevance(transcript)
    };
  }

  private setupRealTimeAnalysis(): void {
    if (!this.speechRecognition) return;

    let interimTranscript = '';
    
    this.speechRecognition.onresult = (event: any) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update real-time feedback
      const metrics = this.calculateRealTimeMetrics(finalTranscript + interimTranscript);
      this.updateRealTimeFeedback(metrics);
    };
  }

  private updateRealTimeFeedback(metrics: RealTimeFeedback['currentMetrics']): void {
    // Generate alerts based on metrics
    const alerts: RealTimeFeedback['alerts'] = [];
    
    if (metrics.speakingRate < 100) {
      alerts.push({
        type: 'pace',
        message: 'Try speaking a bit faster to maintain engagement',
        severity: 'medium'
      });
    }
    
    if (metrics.confidenceLevel < 60) {
      alerts.push({
        type: 'confidence',
        message: 'Speak more confidently - you know this material!',
        severity: 'high'
      });
    }
    
    if (metrics.relevanceScore < 70) {
      alerts.push({
        type: 'relevance',
        message: 'Focus on directly answering the question',
        severity: 'high'
      });
    }

    // Update feedback in real-time
    // This would be handled by the component
  }

  private getTimeLimit(type: string, difficulty: string): number {
    const baseTimes = {
      behavioral: { easy: 60, medium: 90, hard: 120 },
      technical: { easy: 90, medium: 120, hard: 180 },
      situational: { easy: 60, medium: 90, hard: 120 }
    };
    
    return baseTimes[type as keyof typeof baseTimes]?.[difficulty as keyof typeof baseTimes.behavioral] || 90;
  }

  private generateFollowUpQuestions(type: string, difficulty: string): string[] {
    const followUps = {
      behavioral: [
        "Can you provide more specific details about that situation?",
        "What was the exact impact of your actions?",
        "How did you measure the success of your approach?"
      ],
      technical: [
        "Can you explain the technical architecture in more detail?",
        "What challenges did you face during implementation?",
        "How would you optimize this solution further?"
      ],
      situational: [
        "What would be your first step in this scenario?",
        "How would you handle potential obstacles?",
        "What factors would influence your decision?"
      ]
    };
    
    return followUps[type as keyof typeof followUps] || [];
  }

  private estimateConfidence(transcript: string): number {
    const confidenceIndicators = ['absolutely', 'definitely', 'certainly', 'confident', 'sure'];
    const hesitationIndicators = ['maybe', 'perhaps', 'I think', 'probably', 'might'];
    
    const confidenceCount = confidenceIndicators.filter(indicator => 
      transcript.toLowerCase().includes(indicator)
    ).length;
    
    const hesitationCount = hesitationIndicators.filter(indicator => 
      transcript.toLowerCase().includes(indicator)
    ).length;
    
    return Math.max(0, Math.min(100, 70 + (confidenceCount * 10) - (hesitationCount * 15)));
  }

  private countKeywords(transcript: string): number {
    const technicalKeywords = ['developed', 'implemented', 'designed', 'optimized', 'led', 'created'];
    return technicalKeywords.filter(keyword => 
      transcript.toLowerCase().includes(keyword)
    ).length;
  }

  private estimateRelevance(transcript: string): number {
    // Simple relevance estimation based on length and keyword usage
    const words = transcript.split(' ').length;
    const keywords = this.countKeywords(transcript);
    
    if (words < 20) return 50;
    if (words > 200) return 60;
    
    return Math.min(100, 60 + (keywords * 8));
  }

  private initializeRealTimeFeedback(): RealTimeFeedback {
    return {
      currentMetrics: {
        speakingRate: 0,
        confidenceLevel: 0,
        keywordUsage: 0,
        relevanceScore: 0
      },
      alerts: [],
      encouragement: [
        "You're doing great! Keep going.",
        "Take your time and think through your answer.",
        "Remember to use specific examples.",
        "Speak clearly and confidently."
      ]
    };
  }

  private async getResumeData() {
    // Get user's resume data from storage or API
    // For demo purposes, return mock data
    return {
      extractedSkills: ['JavaScript', 'React', 'Node.js'],
      workExperience: [{ title: 'Developer', company: 'Tech Corp' }],
      projects: [{ title: 'Web Application' }]
    };
  }

  private getFallbackFeedback(): ResponseFeedback {
    return {
      content: {
        relevance: 70,
        completeness: 70,
        clarity: 70,
        technicalAccuracy: 70
      },
      delivery: {
        pace: 70,
        confidence: 70,
        fillerWords: 10,
        pauses: 15
      },
      overall: 70,
      strengths: ['Good effort', 'Relevant content'],
      improvements: ['Add more detail', 'Practice delivery'],
      suggestions: ['Be more specific', 'Speak more confidently']
    };
  }

  // Public methods for interview analytics
  async generateInterviewReport(session: VoiceInterviewSession): Promise<string> {
    const report = `
      # Interview Performance Report
      
      **Role:** ${session.role}
      **Type:** ${session.type}
      **Overall Score:** ${session.overallScore}/100
      
      ## Question-by-Question Analysis
      
      ${session.responses.map((response, index) => `
        ### Question ${index + 1}
        **Score:** ${response.feedback.overall}/100
        **Strengths:** ${response.feedback.strengths.join(', ')}
        **Improvements:** ${response.feedback.improvements.join(', ')}
      `).join('')}
      
      ## Overall Feedback
      **Content Score:** ${session.responses.reduce((sum, r) => sum + r.feedback.content.relevance, 0) / session.responses.length}/100
      **Delivery Score:** ${session.responses.reduce((sum, r) => sum + r.feedback.delivery.confidence, 0) / session.responses.length}/100
      
      ## Recommendations
      ${this.generateRecommendations(session)}
    `;
    
    return report;
  }

  private generateRecommendations(session: VoiceInterviewSession): string {
    const recommendations: string[] = [];
    
    const avgConfidence = session.responses.reduce((sum, r) => sum + r.feedback.delivery.confidence, 0) / session.responses.length;
    if (avgConfidence < 70) {
      recommendations.push('Practice speaking more confidently about your experience');
    }
    
    const avgCompleteness = session.responses.reduce((sum, r) => sum + r.feedback.content.completeness, 0) / session.responses.length;
    if (avgCompleteness < 75) {
      recommendations.push('Provide more complete answers with specific examples');
    }
    
    const fillerWordCount = session.responses.reduce((sum, r) => sum + r.feedback.delivery.fillerWords, 0) / session.responses.length;
    if (fillerWordCount > 15) {
      recommendations.push('Reduce filler words (um, uh, like) for more professional delivery');
    }
    
    return recommendations.join('\n- ');
  }
}

export const aiInterviewSimulator = new AIInterviewSimulator();

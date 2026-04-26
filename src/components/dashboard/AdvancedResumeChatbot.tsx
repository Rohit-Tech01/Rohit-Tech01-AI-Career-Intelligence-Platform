import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Send, Mic, Upload, FileText, Zap, BarChart3,
  Brain, Target, TrendingUp, Award, BookOpen,
  User, Bot, Copy, Check, Lightbulb,
  RefreshCw, ThumbsUp, ThumbsDown,
  Clock, Sparkles, Star, AlertCircle, CheckCircle,
  TrendingDown, ArrowUp, ArrowDown, Download,
  Eye, Edit, Trash2, Plus, X, Filter, Search,
  Calendar, MapPin, DollarSign, Users, Briefcase,
  Code, Database, Cloud, Shield, Settings,
  GraduationCap, Award as Trophy, Target as Goal,
  ChevronRight, ChevronDown, Info, HelpCircle
} from 'lucide-react';

interface AdvancedResumeChatbotProps {
  onStartSurvey?: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  feedback?: 'like' | 'dislike' | null;
  suggestions?: string[];
  resumeData?: ResumeAnalysis;
}

interface ResumeAnalysis {
  overallScore: number;
  sections: {
    personalInfo: SectionScore;
    experience: SectionScore;
    education: SectionScore;
    skills: SectionScore;
    projects: SectionScore;
    certifications: SectionScore;
  };
  skills: {
    technical: Skill[];
    soft: Skill[];
    languages: Skill[];
  };
  experience: {
    totalYears: number;
    relevantYears: number;
    leadership: boolean;
    achievements: Achievement[];
  };
  jobMatches: JobMatch[];
  skillGaps: SkillGap[];
  recommendations: Recommendation[];
  atsScore: number;
  formatting: FormattingScore;
}

interface SectionScore {
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
}

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years: number;
  projects?: number;
  certifications?: string[];
}

interface Achievement {
  description: string;
  impact: string;
  metrics?: string;
}

interface JobMatch {
  title: string;
  company: string;
  matchPercentage: number;
  salary: string;
  location: string;
  requiredSkills: string[];
  missingSkills: string[];
  skillsMatched: string[];
}

interface SkillGap {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  importance: 'Critical' | 'Important' | 'Nice to Have';
  timeToLearn: string;
  resources: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Recommendation {
  type: 'Skill' | 'Experience' | 'Education' | 'Certification' | 'Formatting';
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  actionItems: string[];
  impact: string;
  estimatedTime: string;
}

interface FormattingScore {
  readability: number;
  atsCompatibility: number;
  visualAppeal: number;
  length: number;
  structure: number;
}

const AdvancedResumeChatbot: React.FC<AdvancedResumeChatbotProps> = () => {
  const { isDark, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to **Advanced Resume Analysis System**! 🎯\n\nI provide comprehensive resume analysis with:\n\n📊 **Resume Rating & Scoring**\n• Overall resume score (0-100)\n• Section-by-section analysis\n• ATS compatibility check\n• Formatting assessment\n\n🎯 **Skill Enhancement Suggestions**\n• Job role-specific recommendations\n• Skill gap analysis\n• Learning path suggestions\n• Certification guidance\n\n💼 **Job Matching**\n• Personalized job matches\n• Salary expectations\n• Skill alignment analysis\n• Career path recommendations\n\n**Upload your resume now** to get started with detailed analysis!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ["Upload Resume", "Analyze Skills", "Job Matching", "Resume Tips"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState<string>('');
  const [analysisMode, setAnalysisMode] = useState<'comprehensive' | 'quick' | 'job-specific'>('comprehensive');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [currentResumeAnalysis, setCurrentResumeAnalysis] = useState<ResumeAnalysis | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Detect device and browser
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    detectDevice();
    const handleResize = () => detectDevice();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Job Roles Database
  const jobRoles = [
    'AI/ML Engineer', 'Data Scientist', 'Software Developer', 'Product Manager',
    'UX/UI Designer', 'DevOps Engineer', 'Cybersecurity Analyst', 'Cloud Architect',
    'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Mobile Developer',
    'Business Analyst', 'Project Manager', 'Marketing Manager', 'Sales Engineer'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const generateResumeAnalysis = useCallback((fileName: string, fileSize: number): ResumeAnalysis => {
    const baseScore = Math.floor(Math.random() * 30) + 60; // 60-90 base score
    
    return {
      overallScore: baseScore,
      sections: {
        personalInfo: {
          score: Math.floor(Math.random() * 20) + 80,
          maxScore: 100,
          feedback: "Contact information is well-presented with professional email format.",
          suggestions: ["Add LinkedIn profile URL", "Include GitHub/portfolio link", "Consider adding professional summary"]
        },
        experience: {
          score: Math.floor(Math.random() * 25) + 65,
          maxScore: 100,
          feedback: "Experience section shows good progression but lacks quantifiable achievements.",
          suggestions: ["Add specific metrics and KPIs", "Use action verbs", "Highlight leadership experiences"]
        },
        education: {
          score: Math.floor(Math.random() * 20) + 75,
          maxScore: 100,
          feedback: "Education is clearly listed with relevant coursework.",
          suggestions: ["Add GPA if above 3.0", "Include relevant projects", "Mention academic achievements"]
        },
        skills: {
          score: Math.floor(Math.random() * 30) + 60,
          maxScore: 100,
          feedback: "Skills section is comprehensive but needs better organization.",
          suggestions: ["Categorize technical skills", "Include proficiency levels", "Add emerging technologies"]
        },
        projects: {
          score: Math.floor(Math.random() * 35) + 45,
          maxScore: 100,
          feedback: "Projects demonstrate practical application but need more detail.",
          suggestions: ["Add project outcomes", "Include technical challenges", "Link to live demos"]
        },
        certifications: {
          score: Math.floor(Math.random() * 40) + 30,
          maxScore: 100,
          feedback: "Certifications are minimal for the target role.",
          suggestions: ["Add industry certifications", "Include online course completions", "Consider cloud certifications"]
        }
      },
      skills: {
        technical: [
          { name: 'Python', level: 'Advanced', years: 3, projects: 5 },
          { name: 'Machine Learning', level: 'Intermediate', years: 2, projects: 3 },
          { name: 'React', level: 'Advanced', years: 2, projects: 4 },
          { name: 'AWS', level: 'Intermediate', years: 1, projects: 2 },
          { name: 'SQL', level: 'Advanced', years: 3, projects: 6 }
        ],
        soft: [
          { name: 'Communication', level: 'Intermediate', years: 3 },
          { name: 'Leadership', level: 'Beginner', years: 1 },
          { name: 'Problem Solving', level: 'Advanced', years: 4 },
          { name: 'Teamwork', level: 'Advanced', years: 5 }
        ],
        languages: [
          { name: 'English', level: 'Advanced', years: 10 },
          { name: 'Spanish', level: 'Beginner', years: 1 }
        ]
      },
      experience: {
        totalYears: 4,
        relevantYears: 3,
        leadership: false,
        achievements: [
          { description: "Led team of 3 developers", impact: "Improved project delivery by 25%", metrics: "25% faster delivery" },
          { description: "Implemented ML model", impact: "Reduced manual processing time", metrics: "50% time reduction" }
        ]
      },
      jobMatches: [
        {
          title: 'AI/ML Engineer',
          company: 'Tech Corp',
          matchPercentage: 85,
          salary: '$120K - $180K',
          location: 'San Francisco, CA',
          requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'AWS'],
          missingSkills: ['TensorFlow', 'Deep Learning'],
          skillsMatched: ['Python', 'Machine Learning', 'AWS']
        },
        {
          title: 'Data Scientist',
          company: 'Data Analytics Inc',
          matchPercentage: 78,
          salary: '$100K - $150K',
          location: 'New York, NY',
          requiredSkills: ['Python', 'Statistics', 'SQL', 'Machine Learning'],
          missingSkills: ['Statistics', 'Advanced ML'],
          skillsMatched: ['Python', 'SQL', 'Machine Learning']
        },
        {
          title: 'Full Stack Developer',
          company: 'StartupXYZ',
          matchPercentage: 72,
          salary: '$90K - $130K',
          location: 'Remote',
          requiredSkills: ['React', 'Node.js', 'Python', 'Database'],
          missingSkills: ['Node.js', 'Database Design'],
          skillsMatched: ['React', 'Python']
        }
      ],
      skillGaps: [
        {
          skill: 'TensorFlow',
          currentLevel: 'Beginner',
          targetLevel: 'Advanced',
          importance: 'Critical',
          timeToLearn: '3-4 months',
          resources: ['TensorFlow Documentation', 'Coursera Deep Learning', 'Kaggle Projects'],
          difficulty: 'Medium'
        },
        {
          skill: 'Deep Learning',
          currentLevel: 'Beginner',
          targetLevel: 'Intermediate',
          importance: 'Critical',
          timeToLearn: '2-3 months',
          resources: ['Deep Learning Specialization', 'Fast.ai', 'Research Papers'],
          difficulty: 'Hard'
        },
        {
          skill: 'Leadership',
          currentLevel: 'Beginner',
          targetLevel: 'Intermediate',
          importance: 'Important',
          timeToLearn: '6-12 months',
          resources: ['Management Courses', 'Team Lead Experience', 'Leadership Books'],
          difficulty: 'Medium'
        }
      ],
      recommendations: [
        {
          type: 'Skill',
          priority: 'High',
          title: 'Master TensorFlow and Deep Learning',
          description: 'Critical for AI/ML roles and significantly increases job opportunities.',
          actionItems: [
            'Complete TensorFlow Developer Certificate',
            'Build 2-3 ML portfolio projects',
            'Contribute to open-source ML projects'
          ],
          impact: 'Increase job matches by 25%',
          estimatedTime: '3-4 months'
        },
        {
          type: 'Experience',
          priority: 'High',
          title: 'Add Quantifiable Achievements',
          description: 'Replace generic descriptions with specific metrics and outcomes.',
          actionItems: [
            'Add performance metrics to current role',
            'Include project impact with numbers',
            'Highlight cost savings or revenue increases'
          ],
          impact: 'Improve resume score by 15 points',
          estimatedTime: '1-2 weeks'
        },
        {
          type: 'Certification',
          priority: 'Medium',
          title: 'Get Cloud Certification',
          description: 'AWS or Azure certification adds credibility and opens more opportunities.',
          actionItems: [
            'Study for AWS Solutions Architect',
            'Complete hands-on labs',
            'Take practice exams'
          ],
          impact: 'Increase salary potential by 20%',
          estimatedTime: '2-3 months'
        }
      ],
      atsScore: Math.floor(Math.random() * 20) + 70,
      formatting: {
        readability: Math.floor(Math.random() * 15) + 80,
        atsCompatibility: Math.floor(Math.random() * 25) + 65,
        visualAppeal: Math.floor(Math.random() * 20) + 75,
        length: Math.floor(Math.random() * 10) + 85,
        structure: Math.floor(Math.random() * 15) + 80
      }
    };
  }, []);

  const generateResumeAnalysisMessage = useCallback((analysis: ResumeAnalysis, fileName: string, fileSize: number): string => {
    const scoreColor = analysis.overallScore >= 80 ? '🟢' : analysis.overallScore >= 60 ? '🟡' : '🔴';
    const atsColor = analysis.atsScore >= 80 ? '🟢' : analysis.atsScore >= 60 ? '🟡' : '🔴';
    
    return `📄 **Resume Analysis Complete** ${scoreColor}

**📁 File Information:**
• **Name:** ${fileName}
• **Size:** ${(fileSize / 1024).toFixed(2)} KB
• **Analysis Mode:** ${analysisMode}

---

## 🎯 **Overall Score: ${analysis.overallScore}/100** ${scoreColor}

**Rating:** ${analysis.overallScore >= 80 ? 'Excellent' : analysis.overallScore >= 60 ? 'Good' : 'Needs Improvement'}

---

## 📊 **Section-by-Section Analysis**

### 👤 **Personal Information** - ${analysis.sections.personalInfo.score}/100
${analysis.sections.personalInfo.feedback}
**Suggestions:** ${analysis.sections.personalInfo.suggestions.join(', ')}

### 💼 **Work Experience** - ${analysis.sections.experience.score}/100
${analysis.sections.experience.feedback}
**Suggestions:** ${analysis.sections.experience.suggestions.join(', ')}

### 🎓 **Education** - ${analysis.sections.education.score}/100
${analysis.sections.education.feedback}
**Suggestions:** ${analysis.sections.education.suggestions.join(', ')}

### 🛠️ **Skills** - ${analysis.sections.skills.score}/100
${analysis.sections.skills.feedback}
**Suggestions:** ${analysis.sections.skills.suggestions.join(', ')}

### 🚀 **Projects** - ${analysis.sections.projects.score}/100
${analysis.sections.projects.feedback}
**Suggestions:** ${analysis.sections.projects.suggestions.join(', ')}

### 🏆 **Certifications** - ${analysis.sections.certifications.score}/100
${analysis.sections.certifications.feedback}
**Suggestions:** ${analysis.sections.certifications.suggestions.join(', ')}

---

## 🔍 **ATS Compatibility** - ${analysis.atsScore}/100 ${atsColor}

**Formatting Score:** ${analysis.formatting.atsCompatibility}/100
**Readability:** ${analysis.formatting.readability}/100
**Structure:** ${analysis.formatting.structure}/100

---

## 💼 **Top Job Matches**

${analysis.jobMatches.slice(0, 3).map((job, index) => `
**${index + 1}. ${job.title}** at ${job.company}
• **Match:** ${job.matchPercentage}% • **Salary:** ${job.salary}
• **Location:** ${job.location}
• **Skills Matched:** ${job.skillsMatched.join(', ')}
• **Missing Skills:** ${job.missingSkills.join(', ')}
`).join('')}

---

## 🎯 **Critical Skill Gaps**

${analysis.skillGaps.slice(0, 3).map((gap, index) => `
**${index + 1}. ${gap.skill}** (${gap.importance})
• **Current:** ${gap.currentLevel} → **Target:** ${gap.targetLevel}
• **Time to Learn:** ${gap.timeToLearn}
• **Difficulty:** ${gap.difficulty}
• **Resources:** ${gap.resources.slice(0, 2).join(', ')}
`).join('')}

---

## 🚀 **Top Recommendations**

${analysis.recommendations.slice(0, 3).map((rec, index) => `
**${index + 1}. ${rec.title}** (${rec.priority} Priority)
${rec.description}
**Impact:** ${rec.impact} • **Time:** ${rec.estimatedTime}
**Actions:** ${rec.actionItems.slice(0, 2).join(', ')}
`).join('')}

---

**💡 Want detailed analysis for any specific section or skill enhancement plan?**`;
  }, [analysisMode]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Resume uploaded:', file.name, file.type, file.size);
      
      // Accept multiple file types for better compatibility
      const supportedTypes = [
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/rtf',
        'text/rtf'
      ];
      
      const fileExtensions = ['.pdf', '.txt', '.doc', '.docx', '.rtf'];
      const isSupported = supportedTypes.includes(file.type) || 
                         fileExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      
      if (isSupported) {
        setUploadedFile(file);
        setIsAnalyzing(true);
        
        // Simulate comprehensive resume analysis
        setTimeout(() => {
          const analysis = generateResumeAnalysis(file.name, file.size);
          setCurrentResumeAnalysis(analysis);
          
          const analysisMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: generateResumeAnalysisMessage(analysis, file.name, file.size),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: [
              "Detailed Skill Analysis",
              "Job Role Matching",
              "Skill Enhancement Plan",
              "Resume Optimization Tips"
            ],
            resumeData: analysis
          };
          
          setMessages(prev => [...prev, analysisMessage]);
          setIsAnalyzing(false);
          setUploadedFile(null);
          setShowDetailedAnalysis(true);
          
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      } else {
        // Show detailed error for unsupported file types
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `❌ **Resume Upload Error**

**📁 File Details:**
• **Name:** ${file.name}
• **Size:** ${(file.size / 1024).toFixed(2)} KB
• **Type:** ${file.type || 'Unknown'}

**❌ Unsupported Format**

**✅ Supported Formats:**
• 📄 PDF files (.pdf) - **Recommended**
• 📝 Text files (.txt)
• 📄 Word documents (.doc, .docx)
• 📊 Rich Text Format (.rtf)

**🔧 Solutions:**

**Option 1:** Convert to PDF
• Use online converters (Smallpdf, ILovePDF)
• Save as PDF from Word/Google Docs
• Print to PDF

**Option 2:** Copy and paste content
• Copy resume text
• Paste in chat with "Analyze this resume:"

**Option 3:** Try different file
• Ensure file is not corrupted
• Check file size (max 10MB)

**💡 Pro Tip:** PDF format works best for ATS systems and preserves formatting.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ["Convert to PDF", "Paste resume text", "Try different file", "Help with conversion"]
        };
        
        setMessages(prev => [...prev, errorMessage]);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  }, [generateResumeAnalysis, generateResumeAnalysisMessage]);

  const handleSkillEnhancement = useCallback(() => {
    if (!currentResumeAnalysis) {
      const noAnalysisMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "📋 **Skill Enhancement Analysis**\n\nPlease upload your resume first to get personalized skill enhancement recommendations.\n\n**How it works:**\n1. Upload your resume\n2. Get comprehensive analysis\n3. Receive skill gap analysis\n4. Get learning path recommendations\n5. Track your progress\n\n**Upload your resume now** to get started!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["Upload Resume", "Resume Analysis", "Skill Assessment", "Career Guidance"]
      };
      setMessages(prev => [...prev, noAnalysisMessage]);
      return;
    }

    const skillEnhancementMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `🎯 **Personalized Skill Enhancement Plan**

## 📊 **Current Skills Assessment**

### 🛠️ **Technical Skills**
${currentResumeAnalysis.skills.technical.map(skill => 
  `• **${skill.name}** - ${skill.level} (${skill.years} years, ${skill.projects} projects)`
).join('\n')}

### 🤝 **Soft Skills**
${currentResumeAnalysis.skills.soft.map(skill => 
  `• **${skill.name}** - ${skill.level} (${skill.years} years)`
).join('\n')}

---

## 🎯 **Skill Gap Analysis**

${currentResumeAnalysis.skillGaps.map((gap, index) => `
**${index + 1}. ${gap.skill}** (${gap.importance})
**Current Level:** ${gap.currentLevel} → **Target Level:** ${gap.targetLevel}
**Time to Learn:** ${gap.timeToLearn} • **Difficulty:** ${gap.difficulty}

**📚 Recommended Resources:**
${gap.resources.map(resource => `• ${resource}`).join('\n')}

**🎯 Learning Path:**
${gap.difficulty === 'Easy' ? '• Start with online tutorials and practice projects' : 
  gap.difficulty === 'Medium' ? '• Take structured courses + hands-on practice' :
  '• Comprehensive study plan with mentorship'}
`).join('\n')}

---

## 🚀 **Job-Specific Skill Enhancement**

### **For AI/ML Engineer Role:**
**Critical Skills to Develop:**
• **TensorFlow/PyTorch** - Advanced level required
• **Deep Learning** - CNNs, RNNs, Transformers
• **MLOps** - Model deployment and monitoring
• **Cloud Platforms** - AWS SageMaker, GCP AI Platform

**Learning Timeline:** 4-6 months
**Salary Impact:** +$30K-$50K

### **For Data Scientist Role:**
**Critical Skills to Develop:**
• **Advanced Statistics** - Hypothesis testing, A/B testing
• **Data Visualization** - Tableau, Power BI
• **Big Data Technologies** - Spark, Hadoop
• **Business Acumen** - Domain knowledge

**Learning Timeline:** 3-5 months
**Salary Impact:** +$25K-$40K

---

## 📈 **Skill Development Roadmap**

### **Month 1-2: Foundation Building**
• Complete TensorFlow Developer Certificate
• Build 2 ML portfolio projects
• Practice SQL optimization

### **Month 3-4: Advanced Topics**
• Deep Learning specialization
• Cloud certification (AWS/Azure)
• Contribute to open-source projects

### **Month 5-6: Specialization**
• Choose domain (NLP, Computer Vision, etc.)
• Advanced projects and competitions
• Networking and mentorship

---

## 🏆 **Success Metrics**

**Track Your Progress:**
• Complete 3 certifications
• Build 5 portfolio projects
• Contribute to 2 open-source projects
• Attend 3 tech meetups/conferences

**Expected Outcomes:**
• Resume score improvement: +20 points
• Job matches increase: +40%
• Salary potential: +$35K

---

**💡 Ready to start your skill enhancement journey? Choose your learning path!**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "Start TensorFlow Learning",
        "Get AWS Certification",
        "Build Portfolio Projects",
        "Create Learning Schedule"
      ]
    };

    setMessages(prev => [...prev, skillEnhancementMessage]);
  }, [currentResumeAnalysis]);

  const handleJobRoleAnalysis = useCallback(() => {
    if (!currentResumeAnalysis) {
      const noAnalysisMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "💼 **Job Role Analysis**\n\nPlease upload your resume first to get personalized job role recommendations.\n\n**What you'll get:**\n• Personalized job matches\n• Skill alignment analysis\n• Salary expectations\n• Career progression paths\n\n**Upload your resume** to discover your ideal career path!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["Upload Resume", "Career Matching", "Salary Analysis", "Job Search"]
      };
      setMessages(prev => [...prev, noAnalysisMessage]);
      return;
    }

    const jobAnalysisMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `💼 **Personalized Job Role Analysis**

## 🎯 **Your Top Career Matches**

${currentResumeAnalysis.jobMatches.map((job, index) => `
### **${index + 1}. ${job.title}** - ${job.matchPercentage}% Match
**Company:** ${job.company} • **Location:** ${job.location}
**Salary Range:** ${job.salary}

**✅ Skills You Have:**
${job.skillsMatched.map(skill => `• ${skill}`).join('\n')}

**⚠️ Skills to Develop:**
${job.missingSkills.map(skill => `• ${skill}`).join('\n')}

**🎯 Action Items:**
${job.missingSkills.map(skill => 
  `• Learn ${skill} to increase match to ${Math.min(job.matchPercentage + 15, 95)}%`
).join('\n')}
`).join('\n')}

---

## 📊 **Career Path Analysis**

### **AI/ML Engineer Path**
**Current Match:** 85%
**Potential Salary:** $120K - $180K
**Growth Trajectory:**
• Junior ML Engineer: $80K - $100K (1-2 years)
• ML Engineer: $120K - $150K (3-5 years)
• Senior ML Engineer: $150K - $200K (5+ years)
• ML Architect: $180K - $250K (8+ years)

**Key Milestones:**
• Master TensorFlow/PyTorch
• Build production ML systems
• Lead ML projects
• Publish research/papers

### **Data Scientist Path**
**Current Match:** 78%
**Potential Salary:** $100K - $150K
**Growth Trajectory:**
• Junior Data Scientist: $70K - $90K (1-2 years)
• Data Scientist: $100K - $130K (3-5 years)
• Senior Data Scientist: $130K - $180K (5+ years)
• Principal Data Scientist: $160K - $220K (8+ years)

**Key Milestones:**
• Advanced statistics knowledge
• Business domain expertise
• Leadership experience
• Strategic thinking

---

## 🎯 **Skill Investment ROI**

### **Highest ROI Skills:**
1. **TensorFlow/PyTorch** - +$25K salary potential
2. **AWS/Azure Certification** - +$20K salary potential
3. **Leadership Skills** - +$30K salary potential
4. **Deep Learning Specialization** - +$35K salary potential

### **Time Investment vs Return:**
• **3 months:** +$15K-$25K
• **6 months:** +$25K-$40K
• **12 months:** +$40K-$60K

---

## 🚀 **Next Steps**

**Immediate Actions (This Month):**
1. Start TensorFlow Developer Certificate
2. Apply to 5-10 target companies
3. Network with professionals in target roles
4. Update LinkedIn with new skills

**Short-term Goals (3 Months):**
1. Complete 2 key certifications
2. Build 2-3 portfolio projects
3. Get 3-5 interviews
4. Negotiate salary effectively

**Long-term Vision (1 Year):**
1. Land target role with 20%+ salary increase
2. Establish expertise in chosen domain
3. Build professional network
4. Plan career advancement

---

**💡 Which career path interests you most? I can create a detailed action plan!**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "AI/ML Engineer Path",
        "Data Scientist Path",
        "Salary Negotiation Tips",
        "Interview Preparation"
      ]
    };

    setMessages(prev => [...prev, jobAnalysisMessage]);
  }, [currentResumeAnalysis]);

  const handleDetailedAnalysis = useCallback(() => {
    if (!currentResumeAnalysis) {
      const noAnalysisMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "📊 **Detailed Resume Analysis**\n\nPlease upload your resume first to get comprehensive analysis.\n\n**Analysis includes:**\n• Section-by-section scoring\n• ATS compatibility check\n• Formatting assessment\n• Keyword optimization\n• Competitive analysis\n\n**Upload your resume** to get detailed insights!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["Upload Resume", "Quick Analysis", "ATS Check", "Formatting Tips"]
      };
      setMessages(prev => [...prev, noAnalysisMessage]);
      return;
    }

    const detailedMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `📊 **Comprehensive Resume Analysis Report**

---

## 🎯 **Executive Summary**

**Overall Score:** ${currentResumeAnalysis.overallScore}/100
**ATS Compatibility:** ${currentResumeAnalysis.atsScore}/100
**Experience Level:** ${currentResumeAnalysis.experience.totalYears} years total, ${currentResumeAnalysis.experience.relevantYears} years relevant
**Leadership Experience:** ${currentResumeAnalysis.experience.leadership ? 'Yes' : 'No'}

**Rating:** ${currentResumeAnalysis.overallScore >= 80 ? '🏆 Excellent - Ready for senior roles' : 
  currentResumeAnalysis.overallScore >= 60 ? '✅ Good - Competitive for mid-level roles' : 
  '⚠️ Needs Improvement - Focus on skill development'}

---

## 📋 **Detailed Section Analysis**

### 👤 **Personal Information** (${currentResumeAnalysis.sections.personalInfo.score}/100)
**Strengths:** ${currentResumeAnalysis.sections.personalInfo.feedback}

**Improvement Areas:**
${currentResumeAnalysis.sections.personalInfo.suggestions.map(s => `• ${s}`).join('\n')}

**Industry Benchmark:** 85/100
**Your Score:** ${currentResumeAnalysis.sections.personalInfo.score}/100

---

### 💼 **Work Experience** (${currentResumeAnalysis.sections.experience.score}/100)
**Strengths:** ${currentResumeAnalysis.sections.experience.feedback}

**Key Achievements:**
${currentResumeAnalysis.experience.achievements.map((achievement, index) => 
  `${index + 1}. ${achievement.description}\n   **Impact:** ${achievement.impact}\n   **Metrics:** ${achievement.metrics || 'Not specified'}`
).join('\n')}

**Improvement Areas:**
${currentResumeAnalysis.sections.experience.suggestions.map(s => `• ${s}`).join('\n')}

**Industry Benchmark:** 80/100
**Your Score:** ${currentResumeAnalysis.sections.experience.score}/100

---

### 🎓 **Education** (${currentResumeAnalysis.sections.education.score}/100)
**Strengths:** ${currentResumeAnalysis.sections.education.feedback}

**Improvement Areas:**
${currentResumeAnalysis.sections.education.suggestions.map(s => `• ${s}`).join('\n')}

**Industry Benchmark:** 75/100
**Your Score:** ${currentResumeAnalysis.sections.education.score}/100

---

### 🛠️ **Skills** (${currentResumeAnalysis.sections.skills.score}/100)
**Strengths:** ${currentResumeAnalysis.sections.skills.feedback}

**Technical Skills Breakdown:**
${currentResumeAnalysis.skills.technical.map(skill => 
  `• **${skill.name}** - ${skill.level} (${skill.years} years, ${skill.projects || 0} projects)`
).join('\n')}

**Soft Skills Breakdown:**
${currentResumeAnalysis.skills.soft.map(skill => 
  `• **${skill.name}** - ${skill.level} (${skill.years} years)`
).join('\n')}

**Improvement Areas:**
${currentResumeAnalysis.sections.skills.suggestions.map(s => `• ${s}`).join('\n')}

**Industry Benchmark:** 85/100
**Your Score:** ${currentResumeAnalysis.sections.skills.score}/100

---

### 🚀 **Projects** (${currentResumeAnalysis.sections.projects.score}/100)
**Strengths:** ${currentResumeAnalysis.sections.projects.feedback}

**Improvement Areas:**
${currentResumeAnalysis.sections.projects.suggestions.map(s => `• ${s}`).join('\n')}

**Industry Benchmark:** 70/100
**Your Score:** ${currentResumeAnalysis.sections.projects.score}/100

---

### 🏆 **Certifications** (${currentResumeAnalysis.sections.certifications.score}/100)
**Strengths:** ${currentResumeAnalysis.sections.certifications.feedback}

**Improvement Areas:**
${currentResumeAnalysis.sections.certifications.suggestions.map(s => `• ${s}`).join('\n')}

**Industry Benchmark:** 60/100
**Your Score:** ${currentResumeAnalysis.sections.certifications.score}/100

---

## 🔍 **ATS Optimization Analysis**

**Overall ATS Score:** ${currentResumeAnalysis.atsScore}/100

### **Formatting Analysis:**
• **Readability:** ${currentResumeAnalysis.formatting.readability}/100
• **ATS Compatibility:** ${currentResumeAnalysis.formatting.atsCompatibility}/100
• **Visual Appeal:** ${currentResumeAnalysis.formatting.visualAppeal}/100
• **Length:** ${currentResumeAnalysis.formatting.length}/100
• **Structure:** ${currentResumeAnalysis.formatting.structure}/100

### **Keyword Analysis:**
**Top Keywords Found:** Python, Machine Learning, React, AWS, SQL
**Missing Keywords:** TensorFlow, Deep Learning, Kubernetes, Docker
**Keyword Density:** Optimal

### **ATS Compatibility Issues:**
${currentResumeAnalysis.atsScore < 80 ? [
  '• Use standard section headings',
  '• Avoid tables and columns',
  '• Remove graphics and images',
  '• Use simple fonts (Arial, Calibri, Times New Roman)',
  '• Save as .txt or .pdf (no scanned images)'
].join('\n') : '• Good ATS compatibility - Minor optimizations possible'}

---

## 📈 **Competitive Analysis**

### **Your Position vs Industry Average:**
${currentResumeAnalysis.overallScore >= 80 ? '🏆 Top 20% - Highly competitive' :
  currentResumeAnalysis.overallScore >= 60 ? '✅ Top 50% - Competitive' :
  '⚠️ Bottom 50% - Needs improvement'}

### **Salary Expectations Based on Resume Score:**
${currentResumeAnalysis.overallScore >= 80 ? '• $120K - $180K (Senior roles)' :
  currentResumeAnalysis.overallScore >= 60 ? '• $80K - $120K (Mid-level roles)' :
  '• $60K - $90K (Entry-level roles)'}

### **Interview Call-Back Rate Prediction:**
${currentResumeAnalysis.overallScore >= 80 ? '• 60-80% call-back rate' :
  currentResumeAnalysis.overallScore >= 60 ? '• 40-60% call-back rate' :
  '• 20-40% call-back rate'}

---

## 🚀 **Action Plan**

### **Immediate Actions (1-2 weeks):**
1. **Fix ATS Issues:** ${currentResumeAnalysis.atsScore < 80 ? 'Address formatting problems' : 'Minor tweaks'}
2. **Add Quantifiable Metrics:** Include numbers in achievements
3. **Update Skills Section:** Add missing keywords

### **Short-term Goals (1-3 months):**
1. **Skill Development:** Focus on top 2 skill gaps
2. **Certification:** Complete 1 industry certification
3. **Portfolio Projects:** Build 2-3 relevant projects

### **Long-term Goals (3-6 months):**
1. **Leadership Experience:** Seek leadership opportunities
2. **Advanced Skills:** Master specialized technologies
3. **Network Building:** Expand professional network

---

**💡 Ready to implement these improvements? I can help you prioritize and create a timeline!**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "Fix ATS Issues",
        "Skill Development Plan",
        "Portfolio Building",
        "Certification Guidance"
      ]
    };

    setMessages(prev => [...prev, detailedMessage]);
  }, [currentResumeAnalysis]);

  const generateAIResponse = useCallback((userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('resume') || message.includes('upload') || message.includes('analysis')) {
      return "📄 **Resume Analysis System**\n\nUpload your resume to get:\n\n🎯 **Comprehensive Analysis**\n• Overall score (0-100)\n• Section-by-section breakdown\n• ATS compatibility check\n• Formatting assessment\n\n💼 **Job Matching**\n• Personalized job recommendations\n• Salary expectations\n• Skill alignment analysis\n• Career path suggestions\n\n🚀 **Skill Enhancement**\n• Skill gap identification\n• Learning path recommendations\n• Certification guidance\n• Timeline planning\n\n**Click the upload button** to analyze your resume now!";
    }

    if (message.includes('skill') || message.includes('enhancement') || message.includes('improve')) {
      return "🎯 **Skill Enhancement Program**\n\nI provide personalized skill development plans:\n\n📊 **Current Skills Assessment**\n• Technical skills evaluation\n• Soft skills analysis\n• Proficiency level assessment\n\n🎯 **Skill Gap Analysis**\n• Identify missing critical skills\n• Industry comparison\n• Learning difficulty assessment\n\n🚀 **Learning Path**\n• Structured learning timeline\n• Resource recommendations\n• Progress tracking\n• Certification guidance\n\n**Upload your resume** to get your personalized skill enhancement plan!";
    }

    if (message.includes('job') || message.includes('career') || message.includes('role')) {
      return "💼 **Job Role Analysis**\n\nDiscover your ideal career path:\n\n🎯 **Personalized Job Matches**\n• AI-powered job recommendations\n• Salary range analysis\n• Company culture fit\n• Growth potential\n\n📊 **Skill Alignment**\n• Skills vs job requirements\n• Gap analysis\n• Development timeline\n\n🚀 **Career Progression**\n• Growth trajectory planning\n• Milestone setting\n• Leadership development\n\n**Upload your resume** to get personalized job role analysis!";
    }

    return "I'm your **Advanced Resume Analysis Assistant**! I can help you with:\n\n📄 **Resume Analysis**\n• Comprehensive scoring (0-100)\n• Section-by-section evaluation\n• ATS compatibility check\n• Formatting optimization\n\n🎯 **Skill Enhancement**\n• Personalized learning paths\n• Skill gap analysis\n• Certification guidance\n• Career development\n\n💼 **Job Matching**\n• Personalized job recommendations\n• Salary insights\n• Career path planning\n\n**Upload your resume** to get started with detailed analysis!";
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsStreaming(true);

    // Simulate streaming response
    setTimeout(() => {
      const aiMessageId = (Date.now() + 1).toString();
      const fullResponse = generateAIResponse(inputValue);
      const words = fullResponse.split(' ');
      let currentText = '';

      const streamInterval = setInterval(() => {
        if (currentText.split(' ').length < words.length) {
          currentText += words[currentText.split(' ').length] + ' ';
          setMessages(prev => {
            const updated = [...prev];
            const existingIndex = updated.findIndex(m => m.id === aiMessageId);
            if (existingIndex > -1) {
              updated[existingIndex] = { ...updated[existingIndex], content: currentText, isStreaming: true };
            } else {
              updated.push({ id: aiMessageId, role: 'assistant', content: currentText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isStreaming: true });
            }
            return updated;
          });
        } else {
          clearInterval(streamInterval);
          setMessages(prev => prev.map(m => 
            m.id === aiMessageId ? { ...m, content: fullResponse, isStreaming: false, suggestions: ["Upload Resume", "Skill Analysis", "Job Matching", "Career Advice"] } : m
          ));
          setIsTyping(false);
          setIsStreaming(false);
        }
      }, 50);
    }, 500);
  }, [inputValue, isStreaming, generateAIResponse]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleCopyMessage = useCallback((messageId: string, content: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(content).then(() => {
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  }, []);

  const handleFeedback = useCallback((messageId: string, feedback: 'like' | 'dislike') => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, feedback } : m
    ));
  }, []);

  const startVoiceRecognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
        setIsListening(true);
        recognitionRef.current = recognition;
      } catch (error) {
        console.error('Speech recognition initialization error:', error);
        setIsListening(false);
      }
    }
  }, []);

  const stopVoiceRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
    }
  }, []);

  // Touch gesture support for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const target = e.currentTarget;
    target.style.transform = 'scale(0.95)';
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const target = e.currentTarget;
    target.style.transform = 'scale(1)';
  }, []);

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${
      isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    }`}>
      {/* Left Column - Chat Area */}
      <div className={`flex-1 flex flex-col p-2 sm:p-4 lg:p-6 ${
        isMobile ? 'w-full' : isTablet ? 'w-full lg:max-w-[70%]' : 'lg:max-w-[70%]'
      }`}>
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className={`rounded-t-2xl p-3 sm:p-4 border-b backdrop-blur-xl ${
            isDark 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="text-white" size={isMobile ? 16 : 24} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-pulse" />
                </div>
                <div>
                  <h2 className={`text-sm sm:text-lg lg:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Advanced Resume Analyzer
                  </h2>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI-Powered Career Intelligence
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={toggleTheme}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {isDark ? <Lightbulb size={isMobile ? 14 : 18} /> : <Zap size={isMobile ? 14 : 18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            className={`flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-xl ${
              isDark 
                ? 'bg-gray-800/90' 
                : 'bg-white/90'
            }`}
            style={{ 
              minHeight: isMobile ? '300px' : '400px', 
              maxHeight: isMobile ? 'calc(100vh - 280px)' : '600px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[70%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="text-white" size={isMobile ? 12 : 18} />
                    ) : (
                      <Bot className="text-white" size={isMobile ? 12 : 18} />
                    )}
                  </div>
                  
                  <div className="relative group">
                    <div
                      className={`px-2 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : isDark 
                            ? 'bg-gray-700 text-gray-100'
                            : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.isStreaming ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap break-words leading-relaxed text-xs sm:text-sm">
                          {message.content}
                        </div>
                      )}
                    </div>
                    
                    <div className={`absolute -bottom-4 sm:-bottom-6 text-xs ${
                      message.role === 'user' ? 'right-0' : 'left-0'
                    }`}>
                      <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                        {message.timestamp}
                      </span>
                    </div>
                    
                    {!message.isStreaming && !isMobile && (
                      <div className="absolute -top-2 right-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className={`p-1 rounded transition-colors ${
                            isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                          }`}
                        >
                          {copiedMessageId === message.id ? (
                            <Check size={14} className="text-green-500" />
                          ) : (
                            <Copy size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                          )}
                        </button>
                        
                        {message.role === 'assistant' && (
                          <>
                            <button
                              onClick={() => handleFeedback(message.id, 'like')}
                              className={`p-1 rounded transition-colors ${
                                message.feedback === 'like' ? 'text-green-500' : isDark ? 'text-gray-400 hover:text-green-500' : 'text-gray-600 hover:text-green-500'
                              }`}
                            >
                              <ThumbsUp size={14} />
                            </button>
                            <button
                              onClick={() => handleFeedback(message.id, 'dislike')}
                              className={`p-1 rounded transition-colors ${
                                message.feedback === 'dislike' ? 'text-red-500' : isDark ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-500'
                              }`}
                            >
                              <ThumbsDown size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <Bot className="text-white" size={isMobile ? 12 : 18} />
                  </div>
                  <div className={`px-2 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="ml-2 text-xs sm:text-sm italic">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length > 1 && messages[messages.length - 1].suggestions && messages[messages.length - 1].suggestions!.length > 0 && (
            <div className={`p-2 sm:p-4 border-t backdrop-blur-xl ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(suggestion)}
                    className={`px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className={`rounded-b-2xl p-2 sm:p-4 border-t backdrop-blur-xl ${
            isDark 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <Upload className="inline-block mr-1 sm:mr-2" size={isMobile ? 10 : 14} />
                {isMobile ? 'Upload' : 'Upload Resume'}
              </button>
              
              <button
                onClick={handleSkillEnhancement}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <Brain className="inline-block mr-1 sm:mr-2" size={isMobile ? 10 : 14} />
                {isMobile ? 'Skills' : 'Skill Enhancement'}
              </button>
              
              <button
                onClick={handleJobRoleAnalysis}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <Target className="inline-block mr-1 sm:mr-2" size={isMobile ? 10 : 14} />
                {isMobile ? 'Jobs' : 'Job Matching'}
              </button>
              
              <button
                onClick={handleDetailedAnalysis}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <BarChart3 className="inline-block mr-1 sm:mr-2" size={isMobile ? 10 : 14} />
                {isMobile ? 'Analysis' : 'Detailed Analysis'}
              </button>
            </div>

            <div className="flex items-end space-x-1 sm:space-x-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.txt,.doc,.docx,.rtf"
                className="hidden"
                id="resume-upload"
              />
              
              <button
                onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : isDark 
                      ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <Mic size={isMobile ? 14 : 18} />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about resume analysis, skill enhancement, or job matching..."
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-xs sm:text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                  rows={1}
                  style={{ 
                    minHeight: isMobile ? '40px' : '48px', 
                    maxHeight: isMobile ? '80px' : '120px'
                  }}
                />
                {uploadedFile && (
                  <div className={`absolute -top-2 right-2 px-2 py-1 rounded text-xs ${
                    isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    📄 {uploadedFile.name}
                  </div>
                )}
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isStreaming}
                className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-200 ${
                  inputValue.trim() && !isStreaming
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <Send size={isMobile ? 14 : 18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Resume Insights */}
      <div className={`w-full lg:w-[30%] p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {currentResumeAnalysis ? (
          <>
            {/* Resume Score Card */}
            <div className={`p-3 sm:p-6 rounded-2xl border-2 backdrop-blur-xl ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-sm sm:text-lg font-bold mb-3 sm:mb-6 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Star className="mr-2 text-yellow-500" size={isMobile ? 14 : 20} />
                Resume Score
              </h3>
              
              <div className="text-center mb-4 sm:mb-6">
                <div className={`text-3xl sm:text-5xl font-bold ${
                  currentResumeAnalysis.overallScore >= 80 ? 'text-green-500' :
                  currentResumeAnalysis.overallScore >= 60 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {currentResumeAnalysis.overallScore}/100
                </div>
                <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentResumeAnalysis.overallScore >= 80 ? '🏆 Excellent' :
                   currentResumeAnalysis.overallScore >= 60 ? '✅ Good' :
                   '⚠️ Needs Improvement'}
                </p>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ATS Score</span>
                  <span className={`text-xs sm:text-sm font-bold ${
                    currentResumeAnalysis.atsScore >= 80 ? 'text-green-500' :
                    currentResumeAnalysis.atsScore >= 60 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {currentResumeAnalysis.atsScore}/100
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div 
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-1000 ${
                      currentResumeAnalysis.atsScore >= 80 ? 'bg-green-500' :
                      currentResumeAnalysis.atsScore >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${currentResumeAnalysis.atsScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Skills Overview */}
            <div className={`p-3 sm:p-6 rounded-2xl border-2 backdrop-blur-xl ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-sm sm:text-lg font-bold mb-3 sm:mb-6 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Brain className="mr-2 text-blue-500" size={isMobile ? 14 : 20} />
                Skills Overview
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Technical Skills
                    </span>
                    <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentResumeAnalysis.skills.technical.length} skills
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentResumeAnalysis.skills.technical.slice(0, 3).map((skill, index) => (
                      <span key={index} className={`px-2 py-1 rounded text-xs ${
                        skill.level === 'Expert' ? 'bg-green-100 text-green-700' :
                        skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                        skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {skill.name}
                      </span>
                    ))}
                    {currentResumeAnalysis.skills.technical.length > 3 && (
                      <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        +{currentResumeAnalysis.skills.technical.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Soft Skills
                    </span>
                    <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentResumeAnalysis.skills.soft.length} skills
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentResumeAnalysis.skills.soft.slice(0, 3).map((skill, index) => (
                      <span key={index} className={`px-2 py-1 rounded text-xs ${
                        skill.level === 'Expert' ? 'bg-green-100 text-green-700' :
                        skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                        skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {skill.name}
                      </span>
                    ))}
                    {currentResumeAnalysis.skills.soft.length > 3 && (
                      <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        +{currentResumeAnalysis.skills.soft.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Job Matches */}
            <div className={`p-3 sm:p-6 rounded-2xl border-2 backdrop-blur-xl ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-sm sm:text-lg font-bold mb-3 sm:mb-6 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Target className="mr-2 text-green-500" size={isMobile ? 14 : 20} />
                Top Matches
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                {currentResumeAnalysis.jobMatches.slice(0, 3).map((job, index) => (
                  <div key={index} className={`p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer ${
                    isDark 
                      ? 'bg-gray-700/50 hover:bg-gray-700' 
                      : 'bg-gray-100/50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {job.title}
                      </span>
                      <span className={`text-xs sm:text-sm font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent`}>
                        {job.matchPercentage}%
                      </span>
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {job.company} • {job.salary}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Skill Gaps */}
            <div className={`p-3 sm:p-6 rounded-2xl border-2 backdrop-blur-xl ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-sm sm:text-lg font-bold mb-3 sm:mb-6 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <AlertCircle className="mr-2 text-orange-500" size={isMobile ? 14 : 20} />
                Skill Gaps
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                {currentResumeAnalysis.skillGaps.slice(0, 3).map((gap, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {gap.skill}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        gap.importance === 'Critical' ? 'bg-red-100 text-red-700' :
                        gap.importance === 'Important' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {gap.importance}
                      </span>
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {gap.currentLevel} → {gap.targetLevel} • {gap.timeToLearn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className={`p-3 sm:p-6 rounded-2xl border-2 backdrop-blur-xl ${
            isDark 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <h3 className={`text-sm sm:text-lg font-bold mb-3 sm:mb-6 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <FileText className="mr-2 text-purple-500" size={isMobile ? 14 : 20} />
              Resume Analysis
            </h3>
            
            <div className="text-center py-4 sm:py-8">
              <Upload className={`mx-auto mb-3 sm:mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} size={isMobile ? 24 : 32} />
              <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 sm:mb-4`}>
                Upload your resume to get comprehensive analysis
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                Upload Resume
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          input, textarea, button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          
          input[type="text"], input[type="email"], input[type="password"], textarea {
            font-size: 16px !important;
          }
        }

        @supports (-webkit-touch-callout: none) {
          .safari-fix {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }

        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  );
};

export default AdvancedResumeChatbot;

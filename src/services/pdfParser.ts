// PDF Parser Service for Resume Analysis
// This service handles PDF text extraction and analysis using pdf.js

import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ParsedResume {
  fileName: string;
  fileSize: string;
  text: string;
  sections: ResumeSections;
  extractedSkills: string[];
  contactInfo: ContactInfo;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}

export interface ResumeSections {
  personalInfo: { score: number; content: string; suggestions: string[] };
  workExperience: { score: number; content: string; suggestions: string[] };
  education: { score: number; content: string; suggestions: string[] };
  skills: { score: number; content: string; suggestions: string[] };
  projects: { score: number; content: string; suggestions: string[] };
  certifications: { score: number; content: string; suggestions: string[] };
}

export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface WorkExperience {
  company?: string;
  position?: string;
  duration?: string;
  description?: string;
  achievements?: string[];
}

export interface Education {
  institution?: string;
  degree?: string;
  field?: string;
  duration?: string;
  gpa?: string;
  projects?: string[];
}

export interface Project {
  name?: string;
  description?: string;
  technologies?: string[];
  duration?: string;
  link?: string;
}

export interface Certification {
  name?: string;
  issuer?: string;
  date?: string;
  duration?: string;
}

class PDFParserService {
  private skillKeywords = [
    // Programming Languages
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Swift',
    'PHP', 'Kotlin', 'Scala', 'Perl', 'R', 'MATLAB', 'Shell', 'Bash', 'PowerShell',
    
    // Web Technologies
    'HTML', 'CSS', 'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
    'Spring', 'Laravel', 'Ruby on Rails', 'Next.js', 'Nuxt.js', 'Svelte', 'Ember',
    
    // Databases
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Oracle', 'SQLite',
    'Cassandra', 'DynamoDB', 'Firebase', 'Supabase',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab',
    'CI/CD', 'Terraform', 'Ansible', 'Puppet', 'Chef', 'Vagrant', 'Nginx', 'Apache',
    
    // AI & Machine Learning
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn',
    'Pandas', 'NumPy', 'Jupyter', 'Data Science', 'AI', 'Natural Language Processing',
    'Computer Vision', 'Reinforcement Learning', 'Neural Networks',
    
    // Mobile Development
    'iOS', 'Android', 'React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Ionic',
    
    // Tools & Technologies
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Slack', 'Figma',
    'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'VS Code', 'IntelliJ', 'Eclipse',
    
    // Soft Skills
    'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Time Management', 'Project Management', 'Agile', 'Scrum', 'Kanban', 'Analytical',
    'Creativity', 'Innovation', 'Collaboration', 'Presentation', 'Negotiation'
  ];

  private jobDatabase = [
    {
      title: 'AI/ML Engineer',
      company: 'Tech Corp',
      requiredSkills: ['Python', 'Machine Learning', 'AWS', 'TensorFlow', 'Deep Learning'],
      salary: '$120K - $180K',
      location: 'San Francisco, CA'
    },
    {
      title: 'Data Scientist',
      company: 'Data Analytics Inc',
      requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Advanced ML'],
      salary: '$100K - $150K',
      location: 'New York, NY'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      requiredSkills: ['React', 'Python', 'Node.js', 'Database Design', 'JavaScript'],
      salary: '$90K - $130K',
      location: 'Remote'
    },
    {
      title: 'Frontend Developer',
      company: 'Web Solutions',
      requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript'],
      salary: '$80K - $120K',
      location: 'Austin, TX'
    },
    {
      title: 'Backend Developer',
      company: 'API Masters',
      requiredSkills: ['Node.js', 'Python', 'SQL', 'Docker', 'AWS'],
      salary: '$85K - $125K',
      location: 'Seattle, WA'
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudOps',
      requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
      salary: '$95K - $140K',
      location: 'Denver, CO'
    }
  ];

  async parsePDF(file: File): Promise<ParsedResume> {
    // For now, we'll simulate PDF parsing with mock data
    // In a real implementation, you would use a library like pdf.js or pdf-parse
    
    const text = await this.extractTextFromPDF(file);
    const sections = this.analyzeSections(text);
    const extractedSkills = this.extractSkills(text);
    const contactInfo = this.extractContactInfo(text);
    const workExperience = this.extractWorkExperience(text);
    const education = this.extractEducation(text);
    const projects = this.extractProjects(text);
    const certifications = this.extractCertifications(text);

    return {
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      text,
      sections,
      extractedSkills,
      contactInfo,
      workExperience,
      education,
      projects,
      certifications
    };
  }

  private async extractTextFromPDF(file: File): Promise<string> {
    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      // Extract text from all pages
      let fullText = '';
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Extract text items
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        fullText += pageText + '\n';
      }
      
      return fullText.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF document.');
    }
  }

  private analyzeSections(text: string): ResumeSections {
    const sections: ResumeSections = {
      personalInfo: this.analyzePersonalInfo(text),
      workExperience: this.analyzeWorkExperience(text),
      education: this.analyzeEducation(text),
      skills: this.analyzeSkills(text),
      projects: this.analyzeProjects(text),
      certifications: this.analyzeCertifications(text)
    };

    return sections;
  }

  private analyzePersonalInfo(text: string): { score: number; content: string; suggestions: string[] } {
    let score = 50;
    const suggestions: string[] = [];
    
    // Check for email
    const hasEmail = /\S+@\S+\.\S+/.test(text);
    if (hasEmail) score += 15;
    else suggestions.push('Add professional email address');
    
    // Check for phone
    const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
    if (hasPhone) score += 15;
    else suggestions.push('Add phone number');
    
    // Check for LinkedIn
    const hasLinkedin = /linkedin\.com/i.test(text);
    if (hasLinkedin) score += 10;
    else suggestions.push('Add LinkedIn profile URL');
    
    // Check for GitHub
    const hasGithub = /github\.com/i.test(text);
    if (hasGithub) score += 10;
    else suggestions.push('Include GitHub/portfolio link');
    
    const content = hasEmail && hasPhone 
      ? 'Contact information is well-presented with professional email format.'
      : 'Contact information needs improvement. Add missing details.';
    
    return { score, content, suggestions };
  }

  private analyzeWorkExperience(text: string): { score: number; content: string; suggestions: string[] } {
    let score = 60;
    const suggestions: string[] = [];
    
    // Check for quantifiable achievements
    const hasMetrics = /\d+%|\$\d+|\d+\s*(years?|months?)|\d+\s*(users?|projects?)/i.test(text);
    if (hasMetrics) score += 20;
    else suggestions.push('Add specific metrics and KPIs');
    
    // Check for action verbs
    const actionVerbs = /developed|implemented|led|created|built|designed|managed|improved|optimized/i;
    const hasActionVerbs = actionVerbs.test(text);
    if (hasActionVerbs) score += 15;
    else suggestions.push('Use strong action verbs');
    
    // Check for leadership experience
    const hasLeadership = /led|managed|supervised|coordinated|mentored/i.test(text);
    if (hasLeadership) score += 5;
    else suggestions.push('Highlight leadership experiences');
    
    const content = hasActionVerbs && hasMetrics
      ? 'Experience section shows good progression with quantifiable achievements.'
      : 'Experience section needs improvement with more specific details and metrics.';
    
    return { score, content, suggestions };
  }

  private analyzeEducation(text: string): { score: number; content: string; suggestions: string[] } {
    let score = 70;
    const suggestions: string[] = [];
    
    // Check for degree information
    const hasDegree = /bachelor|master|phd|associate|diploma/i.test(text);
    if (hasDegree) score += 10;
    else suggestions.push('Clearly list your degree');
    
    // Check for GPA
    const hasGPA = /gpa\s*:?\s*\d+\.\d+/i.test(text);
    if (hasGPA) score += 10;
    else suggestions.push('Add GPA if above 3.0');
    
    // Check for relevant coursework
    const hasCoursework = /coursework|relevant|courses/i.test(text);
    if (hasCoursework) score += 10;
    else suggestions.push('Include relevant coursework');
    
    const content = hasDegree && hasGPA
      ? 'Education is clearly listed with academic achievements.'
      : 'Education section needs more detail about academic performance.';
    
    return { score, content, suggestions };
  }

  private analyzeSkills(text: string): { score: number; content: string; suggestions: string[] } {
    let score = 60;
    const suggestions: string[] = [];
    
    // Count technical skills
    const technicalSkills = this.skillKeywords.filter(skill => 
      new RegExp(skill, 'i').test(text)
    ).length;
    
    if (technicalSkills >= 10) score += 20;
    else if (technicalSkills >= 5) score += 10;
    else suggestions.push('Add more technical skills');
    
    // Check for skill categorization
    const hasCategories = /technical\s*skills|soft\s*skills|programming|languages/i.test(text);
    if (hasCategories) score += 10;
    else suggestions.push('Categorize technical skills');
    
    // Check for proficiency levels
    const hasProficiency = /beginner|intermediate|advanced|expert|fluent|native/i.test(text);
    if (hasProficiency) score += 10;
    else suggestions.push('Include proficiency levels');
    
    const content = technicalSkills >= 5
      ? 'Skills section shows good technical knowledge.'
      : 'Skills section needs more comprehensive technical skills listing.';
    
    return { score, content, suggestions };
  }

  private analyzeProjects(text: string): { score: number; content: string; suggestions: string[] } {
    let score = 50;
    const suggestions: string[] = [];
    
    // Check for project outcomes
    const hasOutcomes = /achieved|resulted|improved|delivered|completed|launched/i.test(text);
    if (hasOutcomes) score += 20;
    else suggestions.push('Add project outcomes');
    
    // Check for technical details
    const hasTechDetails = /technologies|tools|frameworks|libraries/i.test(text);
    if (hasTechDetails) score += 15;
    else suggestions.push('Include technical challenges');
    
    // Check for project links
    const hasLinks = /github\.com|linkedin\.com|portfolio|demo/i.test(text);
    if (hasLinks) score += 15;
    else suggestions.push('Link to live demos');
    
    const content = hasOutcomes && hasTechDetails
      ? 'Projects demonstrate practical application with good detail.'
      : 'Projects need more detail about outcomes and technical implementation.';
    
    return { score, content, suggestions };
  }

  private analyzeCertifications(text: string): { score: number; content: string; suggestions: string[] } {
    let score = 40;
    const suggestions: string[] = [];
    
    // Check for industry certifications
    const hasCertifications = /certified|certificate|certification/i.test(text);
    if (hasCertifications) score += 30;
    else suggestions.push('Add industry certifications');
    
    // Check for online courses
    const hasCourses = /coursera|udemy|edx|udacity|pluralsight/i.test(text);
    if (hasCourses) score += 15;
    else suggestions.push('Include online course completions');
    
    // Check for cloud certifications
    const hasCloudCert = /aws|azure|gcp|google cloud|azure certified/i.test(text);
    if (hasCloudCert) score += 15;
    else suggestions.push('Consider cloud certifications');
    
    const content = hasCertifications
      ? 'Certifications show commitment to professional development.'
      : 'Certifications are minimal for the target role.';
    
    return { score, content, suggestions };
  }

  private extractSkills(text: string): string[] {
    const foundSkills: string[] = [];
    
    this.skillKeywords.forEach(skill => {
      if (new RegExp(`\\b${skill}\\b`, 'i').test(text)) {
        foundSkills.push(skill);
      }
    });
    
    return foundSkills;
  }

  private extractContactInfo(text: string): ContactInfo {
    const contactInfo: ContactInfo = {};
    
    // Extract email
    const emailMatch = text.match(/\S+@\S+\.\S+/);
    if (emailMatch) contactInfo.email = emailMatch[0];
    
    // Extract phone
    const phoneMatch = text.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) contactInfo.phone = phoneMatch[0];
    
    // Extract LinkedIn
    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) contactInfo.linkedin = linkedinMatch[0];
    
    // Extract GitHub
    const githubMatch = text.match(/github\.com\/[\w-]+/i);
    if (githubMatch) contactInfo.github = githubMatch[0];
    
    return contactInfo;
  }

  private extractWorkExperience(text: string): WorkExperience[] {
    // Simple extraction - in real implementation would be more sophisticated
    const experiences: WorkExperience[] = [];
    
    // Look for experience patterns
    const experiencePattern = /([A-Z][\w\s]+)\s*\|\s*([A-Z][\w\s]+)\s*\|\s*([A-Z][\w\s]+)/g;
    let match;
    
    while ((match = experiencePattern.exec(text)) !== null) {
      experiences.push({
        position: match[1].trim(),
        company: match[2].trim(),
        duration: match[3].trim()
      });
    }
    
    return experiences;
  }

  private extractEducation(text: string): Education[] {
    const education: Education[] = [];
    
    // Look for education patterns
    const educationPattern = /(Bachelor|Master|PhD|Associate)[\w\s]*\|\s*([A-Z][\w\s]+)\s*\|\s*(\d{4}\s*-\s*\d{4})/g;
    let match;
    
    while ((match = educationPattern.exec(text)) !== null) {
      education.push({
        degree: match[1].trim(),
        institution: match[2].trim(),
        duration: match[3].trim()
      });
    }
    
    return education;
  }

  private extractProjects(text: string): Project[] {
    const projects: Project[] = [];
    
    // Look for project patterns
    const projectPattern = /^([A-Z][\w\s]+)\s*\n\s*- (.+)$/gm;
    let match;
    
    while ((match = projectPattern.exec(text)) !== null) {
      projects.push({
        name: match[1].trim(),
        description: match[2].trim()
      });
    }
    
    return projects;
  }

  private extractCertifications(text: string): Certification[] {
    const certifications: Certification[] = [];
    
    // Look for certification patterns
    const certPattern = /([A-Z][\w\s]*Certified?[A-Z\s\w]*)\s*\|\s*([A-Z][\w\s]+)\s*\|\s*(\d{4})/g;
    let match;
    
    while ((match = certPattern.exec(text)) !== null) {
      certifications.push({
        name: match[1].trim(),
        issuer: match[2].trim(),
        date: match[3].trim()
      });
    }
    
    return certifications;
  }

  // Job matching algorithm
  findJobMatches(extractedSkills: string[], _experience: WorkExperience[]) {
    const matches = this.jobDatabase.map(job => {
      const matchedSkills = job.requiredSkills.filter(skill => 
        extractedSkills.some(extractedSkill => 
          extractedSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(extractedSkill.toLowerCase())
        )
      );
      
      const missingSkills = job.requiredSkills.filter(skill => 
        !matchedSkills.includes(skill)
      );
      
      const matchPercentage = Math.round((matchedSkills.length / job.requiredSkills.length) * 100);
      
      return {
        ...job,
        matchPercentage,
        skillsMatched: matchedSkills,
        missingSkills
      };
    });
    
    return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  // ATS compatibility scoring
  calculateATSScore(resumeText: string): number {
    let score = 50;
    
    // Check for standard sections
    const standardSections = ['experience', 'education', 'skills', 'projects', 'certifications'];
    const hasStandardSections = standardSections.every(section => 
      new RegExp(section, 'i').test(resumeText)
    );
    if (hasStandardSections) score += 20;
    
    // Check for formatting
    const hasGoodFormatting = resumeText.length > 500 && resumeText.length < 5000;
    if (hasGoodFormatting) score += 15;
    
    // Check for keywords
    const keywordCount = this.skillKeywords.filter(skill => 
      new RegExp(skill, 'i').test(resumeText)
    ).length;
    if (keywordCount >= 10) score += 15;
    
    return Math.min(score, 100);
  }

  // Generate skill gap analysis
  analyzeSkillGaps(extractedSkills: string[], targetJobs: any[]) {
    const allRequiredSkills = [...new Set(targetJobs.flatMap(job => job.requiredSkills))];
    const missingSkills = allRequiredSkills.filter(skill => 
      !extractedSkills.some(extracted => 
        extracted.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(extracted.toLowerCase())
      )
    );
    
    const skillGaps = missingSkills.map(skill => {
      const priority = this.determineSkillPriority(skill, targetJobs);
      const learningInfo = this.getLearningInfo(skill);
      
      return {
        skill,
        priority,
        currentLevel: 'Beginner',
        targetLevel: learningInfo.targetLevel,
        timeToLearn: learningInfo.timeToLearn,
        difficulty: learningInfo.difficulty,
        resources: learningInfo.resources
      };
    });
    
    return skillGaps.sort((a, b) => {
      const priorityOrder = { 'Critical': 3, 'Important': 2, 'Nice to Have': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private determineSkillPriority(skill: string, targetJobs: any[]): 'Critical' | 'Important' | 'Nice to Have' {
    const jobsRequiringSkill = targetJobs.filter(job => job.requiredSkills.includes(skill));
    const avgMatchPercentage = jobsRequiringSkill.reduce((sum, job) => sum + job.matchPercentage, 0) / jobsRequiringSkill.length;
    
    if (avgMatchPercentage >= 85) return 'Critical';
    if (avgMatchPercentage >= 75) return 'Important';
    return 'Nice to Have';
  }

  private getLearningInfo(skill: string) {
    const learningDatabase = {
      'TensorFlow': {
        targetLevel: 'Advanced',
        timeToLearn: '3-4 months',
        difficulty: 'Medium' as const,
        resources: ['TensorFlow Documentation', 'Coursera Deep Learning', 'Fast.ai']
      },
      'Deep Learning': {
        targetLevel: 'Intermediate',
        timeToLearn: '2-3 months',
        difficulty: 'Hard' as const,
        resources: ['Deep Learning Specialization', 'Fast.ai', 'Udacity Nanodegree']
      },
      'Leadership': {
        targetLevel: 'Intermediate',
        timeToLearn: '6-12 months',
        difficulty: 'Medium' as const,
        resources: ['Management Courses', 'Team Lead Experience', 'Leadership Books']
      },
      'AWS': {
        targetLevel: 'Intermediate',
        timeToLearn: '2-3 months',
        difficulty: 'Medium' as const,
        resources: ['AWS Documentation', 'AWS Training', 'A Cloud Guru']
      },
      'Node.js': {
        targetLevel: 'Advanced',
        timeToLearn: '2-3 months',
        difficulty: 'Easy' as const,
        resources: ['Node.js Documentation', 'Node.js Design Patterns', 'Udemy Courses']
      }
    };
    
    return learningDatabase[skill as keyof typeof learningDatabase] || {
      targetLevel: 'Intermediate',
      timeToLearn: '2-3 months',
      difficulty: 'Medium' as const,
      resources: ['Online Documentation', 'YouTube Tutorials', 'Practice Projects']
    };
  }
}

export const pdfParserService = new PDFParserService();

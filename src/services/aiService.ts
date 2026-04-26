import { HollandCode, CareerRecommendation, LearningPath, SkillGap, ResumeAnalysis } from '../types';
import { CAREER_DATABASE, LEARNING_PATHS } from '../data/mockData';

export class AIService {
  /**
   * Generate career recommendations based on Holland Code and skills
   */
  static async generateCareerRecommendations(
    hollandCode: HollandCode,
    skills: string[]
  ): Promise<CareerRecommendation[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recommendations = CAREER_DATABASE.map((career) => ({
          ...career,
          matchPercentage: this.calculateCareerMatch(career, hollandCode, skills),
        }))
          .sort((a, b) => b.matchPercentage - a.matchPercentage)
          .slice(0, 6);

        resolve(recommendations);
      }, 800);
    });
  }

  /**
   * Calculate match percentage between career and user profile
   */
  private static calculateCareerMatch(
    career: CareerRecommendation,
    hollandCode: HollandCode,
    skills: string[]
  ): number {
    let score = 0;

    // Skills match (40 points max)
    const skillMatches = career.requiredSkills.filter((requiredSkill) =>
      skills.some(
        (skill) =>
          skill.toLowerCase().includes(requiredSkill.toLowerCase()) ||
          requiredSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    score += (skillMatches.length / career.requiredSkills.length) * 40;

    // Holland Code match (30 points max)
    const hollandMatches = career.hollandMatch.filter(
      (type) => hollandCode[type as keyof HollandCode] > 50
    );
    score += (hollandMatches.length / career.hollandMatch.length) * 30;

    // Trending career bonus (20 points max)
    const trendingCareers = ['Data Scientist', 'AI/ML Engineer', 'Cybersecurity Specialist', 'Cloud Architect'];
    if (trendingCareers.includes(career.title)) {
      score += 15;
    }

    // Random variance (10 points)
    score += Math.random() * 10;

    return Math.min(Math.round(score), 100);
  }

  /**
   * Generate learning roadmap for a specific career
   */
  static async generateLearningRoadmap(careerTitle: string, skills: string[]): Promise<LearningPath> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const careerKey = Object.keys(LEARNING_PATHS).find((key) =>
          LEARNING_PATHS[key].careerTitle.toLowerCase() === careerTitle.toLowerCase()
        );

        if (careerKey && LEARNING_PATHS[careerKey]) {
          const roadmap = { ...LEARNING_PATHS[careerKey] };
          resolve(roadmap);
        } else {
          // Generate generic roadmap
          const genericRoadmap: LearningPath = {
            id: 'generic-path',
            careerTitle,
            estimatedTimeMonths: 12,
            steps: [
              {
                order: 1,
                title: 'Assess Current Skills',
                description: 'Evaluate your current expertise and identify gaps',
                resources: ['Self-assessment', 'Online tests', 'Peer feedback'],
                estimatedWeeks: 2,
                skills: ['Self-assessment'],
              },
              {
                order: 2,
                title: 'Core Technical Skills',
                description: 'Learn fundamental technologies required for the role',
                resources: ['Online courses', 'Tutorials', 'Documentation'],
                estimatedWeeks: 12,
                skills: ['Technical foundations'],
              },
              {
                order: 3,
                title: 'Advanced Topics',
                description: 'Master advanced concepts and best practices',
                resources: ['Advanced courses', 'Research papers', 'Expert blogs'],
                estimatedWeeks: 8,
                skills: ['Advanced expertise'],
              },
              {
                order: 4,
                title: 'Practical Projects',
                description: 'Build real-world projects to demonstrate skills',
                resources: ['GitHub', 'Portfolio projects', 'Hackathons'],
                estimatedWeeks: 12,
                skills: ['Project management', 'Practical application'],
              },
              {
                order: 5,
                title: 'Certifications',
                description: 'Obtain relevant industry certifications',
                resources: ['Certification programs', 'Exam prep', 'Study groups'],
                estimatedWeeks: 8,
                skills: ['Professional credentials'],
              },
            ],
          };
          resolve(genericRoadmap);
        }
      }, 600);
    });
  }

  /**
   * Analyze skill gaps and identify missing skills
   */
  static async analyzeSkillGaps(
    careerTitle: string,
    currentSkills: string[]
  ): Promise<SkillGap[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const career = CAREER_DATABASE.find(
          (c) => c.title.toLowerCase() === careerTitle.toLowerCase()
        );

        if (!career) {
          resolve([]);
          return;
        }

        const skillGaps: SkillGap[] = career.requiredSkills
          .filter(
            (requiredSkill) =>
              !currentSkills.some(
                (skill) =>
                  skill.toLowerCase().includes(requiredSkill.toLowerCase()) ||
                  requiredSkill.toLowerCase().includes(skill.toLowerCase())
              )
          )
          .map((skill, index) => ({
            skill,
            proficiency: 'beginner',
            importance: index < 2 ? 'high' : index < 4 ? 'medium' : 'low',
          }));

        resolve(skillGaps);
      }, 500);
    });
  }

  /**
   * Parse resume and extract skills (mock implementation)
   */
  static async parseResume(text: string): Promise<ResumeAnalysis> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const skillKeywords = [
          'Python', 'JavaScript', 'React', 'SQL', 'Data Analysis',
          'Machine Learning', 'Java', 'C++', 'AWS', 'Docker',
          'Communication', 'Leadership', 'Project Management', 'Agile',
        ];

        const detectedSkills = skillKeywords.filter((skill) =>
          text.toLowerCase().includes(skill.toLowerCase())
        );

        const analysis: ResumeAnalysis = {
          skills: detectedSkills.length > 0 ? detectedSkills : ['General Skills'],
          experience: ['3+ years of professional experience'],
          education: ['Bachelor of Science'],
          strengths: ['Problem-solving', 'Team collaboration', 'Quick learner'],
          weaknesses: ['Limited expertise in emerging technologies'],
        };

        resolve(analysis);
      }, 1000);
    });
  }

  /**
   * Calculate Holland Code from quiz answers
   */
  static calculateHollandCode(answers: { [key: number]: string }): { [key: string]: number } {
    const hollandCode: { [key: string]: number } = {
      Realistic: 0,
      Investigative: 0,
      Artistic: 0,
      Social: 0,
      Enterprising: 0,
      Conventional: 0,
    };

    // Map answer strength to points
    const pointsMap: { [key: string]: number } = {
      'Strongly Agree': 5,
      'Agree': 4,
      'Neutral': 3,
      'Disagree': 2,
      'Strongly Disagree': 1,
    };

    Object.values(answers).forEach((answer) => {
      const points = pointsMap[answer] || 3;
      // This would need proper mapping in a real implementation
      Object.keys(hollandCode).forEach((type) => {
        hollandCode[type] += Math.floor(Math.random() * (points + 1));
      });
    });

    // Normalize scores to 0-100
    const maxScore = Math.max(...Object.values(hollandCode));
    Object.keys(hollandCode).forEach((type) => {
      hollandCode[type] = Math.round((hollandCode[type] / maxScore) * 100);
    });

    return hollandCode;
  }
}

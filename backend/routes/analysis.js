const express = require('express');
const { body, validationResult } = require('express-validator');
const Analysis = require('../models/Analysis');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Mock AI Analysis Service (replace with real OpenAI API in production)
const generateAIAnalysis = async (userInput) => {
  const { skills, interests: userInterests, goals, experience, education } = userInput;
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock AI response based on input
  const careerMatches = {
    'Data Scientist': {
      match: 92,
      salary: '$80K-150K',
      growth: '+35%',
      description: 'Analyze complex data to help companies make better business decisions'
    },
    'AI/ML Engineer': {
      match: 88,
      salary: '$100K-180K',
      growth: '+40%',
      description: 'Design and implement artificial intelligence and machine learning systems'
    },
    'Software Developer': {
      match: 76,
      salary: '$70K-130K',
      growth: '+25%',
      description: 'Build and maintain software applications and systems'
    },
    'Product Manager': {
      match: 68,
      salary: '$90K-160K',
      growth: '+20%',
      description: 'Lead product development and strategy to meet market needs'
    },
    'UX Designer': {
      match: 72,
      salary: '$60K-120K',
      growth: '+15%',
      description: 'Create user-centered designs that are both beautiful and functional'
    }
  };

  // Find best match based on skills and interests
  let bestCareer = 'Data Scientist';
  let highestMatch = 0;
  
  for (const [career, data] of Object.entries(careerMatches)) {
    if (data.match > highestMatch) {
      highestMatch = data.match;
      bestCareer = career;
    }
  }

  // Generate skills gap
  const allSkills = ['Machine Learning', 'Python', 'Statistics', 'Data Analysis', 'Communication', 'Leadership', 'Cloud Computing', 'DevOps'];
  const userSkillsArray = skills ? skills.split(',').map(s => s.trim().toLowerCase()) : [];
  const skillsGap = allSkills.filter(skill => !userSkillsArray.includes(skill.toLowerCase())).map(skill => ({
    skill,
    priority: Math.random() > 0.5 ? 'High' : 'Medium',
    description: `Essential for ${bestCareer} role`
  }));

  // Generate roadmap
  const roadmap = [
    {
      step: 'Master Python and Data Science Libraries',
      duration: '3-4 months',
      resources: [
        { name: 'Python for Data Science', type: 'Course', url: 'https://example.com/python' },
        { name: 'NumPy and Pandas Mastery', type: 'Tutorial', url: 'https://example.com/numpy' }
      ]
    },
    {
      step: 'Learn Machine Learning Fundamentals',
      duration: '2-3 months',
      resources: [
        { name: 'Machine Learning Course', type: 'Course', url: 'https://example.com/ml' },
        { name: 'Hands-on ML Projects', type: 'Project', url: 'https://example.com/projects' }
      ]
    },
    {
      step: 'Build Portfolio Projects',
      duration: '2-3 months',
      resources: [
        { name: 'Real-world Datasets', type: 'Dataset', url: 'https://example.com/datasets' },
        { name: 'GitHub Portfolio', type: 'Platform', url: 'https://github.com' }
      ]
    },
    {
      step: 'Get Certifications and Network',
      duration: '1-2 months',
      resources: [
        { name: 'AWS Machine Learning', type: 'Certification', url: 'https://aws.amazon.com/ml/' },
        { name: 'LinkedIn Networking', type: 'Network', url: 'https://linkedin.com' }
      ]
    }
  ];

  // Generate personality traits (Holland Code)
  const personalityTraits = {
    Realistic: Math.floor(Math.random() * 30) + 60,
    Investigative: Math.floor(Math.random() * 30) + 70,
    Artistic: Math.floor(Math.random() * 30) + 50,
    Social: Math.floor(Math.random() * 30) + 60,
    Enterprising: Math.floor(Math.random() * 30) + 55,
    Conventional: Math.floor(Math.random() * 30) + 45
  };

  // Generate skills analysis
  const skillsAnalysis = [
    { name: 'Python', level: 'Advanced', category: 'Technical', score: 85 },
    { name: 'Machine Learning', level: 'Intermediate', category: 'Technical', score: 72 },
    { name: 'Data Analysis', level: 'Advanced', category: 'Technical', score: 88 },
    { name: 'Communication', level: 'Intermediate', category: 'Soft', score: 75 },
    { name: 'Problem Solving', level: 'Advanced', category: 'Soft', score: 90 },
    { name: 'Leadership', level: 'Beginner', category: 'Soft', score: 60 }
  ];

  // Generate interests
  const interests = [
    { area: 'Technology', score: 92 },
    { area: 'Science', score: 85 },
    { area: 'Business', score: 78 },
    { area: 'Arts', score: 65 },
    { area: 'Education', score: 80 }
  ];

  return {
    careerMatch: highestMatch,
    topCareer: bestCareer,
    skillsScore: Math.floor(Math.random() * 20) + 75,
    marketDemand: Math.floor(Math.random() * 20) + 80,
    personalityScore: Math.floor(Math.random() * 20) + 70,
    skillsGap,
    roadmap,
    salaryRange: careerMatches[bestCareer].salary,
    confidenceScore: Math.floor(Math.random() * 10) + 85,
    topCareers: Object.entries(careerMatches).map(([career, data]) => ({
      title: career,
      match: data.match,
      salary: data.salary,
      growth: data.growth,
      description: data.description
    })),
    skills: skillsAnalysis,
    personalityTraits,
    interests,
    marketInsights: {
      industryGrowth: '+28% annually',
      jobOpenings: '150K+ worldwide',
      competitionLevel: 'High',
      futureOutlook: 'Excellent'
    },
    learningRecommendations: [
      {
        course: 'Machine Learning Specialization',
        provider: 'Coursera',
        duration: '3 months',
        difficulty: 'Intermediate',
        rating: 4.8,
        url: 'https://coursera.org/ml'
      },
      {
        course: 'Data Science Professional Certificate',
        provider: 'IBM',
        duration: '6 months',
        difficulty: 'Beginner',
        rating: 4.7,
        url: 'https://coursera.org/ibm-data-science'
      },
      {
        course: 'AWS Certified Machine Learning',
        provider: 'AWS',
        duration: '2 months',
        difficulty: 'Advanced',
        rating: 4.6,
        url: 'https://aws.amazon.com/certification/'
      }
    ]
  };
};

// @route   POST /api/analysis
// @desc    Create new career analysis
// @access  Private
router.post('/', authenticateToken, [
  body('skills').optional().isString().withMessage('Skills must be a string'),
  body('interests').optional().isString().withMessage('Interests must be a string'),
  body('goals').optional().isString().withMessage('Goals must be a string'),
  body('experience').optional().isString().withMessage('Experience must be a string'),
  body('education').optional().isString().withMessage('Education must be a string'),
  body('analysisType').optional().isIn(['Comprehensive', 'Quick', 'Skills', 'Career']).withMessage('Invalid analysis type')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { skills, interests, goals, experience, education, analysisType = 'Comprehensive' } = req.body;

    // Check if user already has a recent analysis (within last 24 hours)
    const recentAnalysis = await Analysis.findOne({
      userId: req.user.id,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (recentAnalysis && analysisType === 'Comprehensive') {
      return res.status(429).json({
        success: false,
        message: 'Please wait 24 hours before running another comprehensive analysis',
        data: recentAnalysis
      });
    }

    // Generate AI analysis
    const aiAnalysis = await generateAIAnalysis({
      skills,
      interests,
      goals,
      experience,
      education
    });

    // Create new analysis record
    const analysis = new Analysis({
      userId: req.user.id,
      careerMatch: aiAnalysis.careerMatch,
      recommendedCareer: aiAnalysis.topCareer,
      skillsScore: aiAnalysis.skillsScore,
      marketDemand: aiAnalysis.marketDemand,
      personalityScore: aiAnalysis.personalityScore,
      skillsGap: aiAnalysis.skillsGap,
      roadmap: aiAnalysis.roadmap,
      salaryRange: aiAnalysis.salaryRange,
      confidenceScore: aiAnalysis.confidenceScore,
      topCareers: aiAnalysis.topCareers,
      skills: aiAnalysis.skills,
      personalityTraits: aiAnalysis.personalityTraits,
      interests: aiAnalysis.interests,
      marketInsights: aiAnalysis.marketInsights,
      learningRecommendations: aiAnalysis.learningRecommendations,
      analysisType,
      status: 'Completed'
    });

    await analysis.save();

    res.status(201).json({
      success: true,
      message: 'Career analysis completed successfully',
      data: analysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during analysis'
    });
  }
});

// @route   GET /api/analysis
// @desc    Get user's analysis history
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, analysisType } = req.query;
    
    const query = { userId: req.user.id };
    if (analysisType) {
      query.analysisType = analysisType;
    }

    const analyses = await Analysis.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Analysis.countDocuments(query);

    res.json({
      success: true,
      data: {
        analyses,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get analyses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analyses'
    });
  }
});

// @route   GET /api/analysis/latest
// @desc    Get user's latest analysis
// @access  Private
router.get('/latest', authenticateToken, async (req, res) => {
  try {
    const latestAnalysis = await Analysis.findOne({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .exec();

    if (!latestAnalysis) {
      return res.status(404).json({
        success: false,
        message: 'No analysis found. Please create an analysis first.'
      });
    }

    res.json({
      success: true,
      data: latestAnalysis
    });
  } catch (error) {
    console.error('Get latest analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching latest analysis'
    });
  }
});

// @route   GET /api/analysis/:id
// @desc    Get specific analysis by ID
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analysis'
    });
  }
});

// @route   DELETE /api/analysis/:id
// @desc    Delete analysis
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.json({
      success: true,
      message: 'Analysis deleted successfully'
    });
  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting analysis'
    });
  }
});

// @route   GET /api/analysis/stats
// @desc    Get user's analysis statistics
// @access  Private
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const stats = await Analysis.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: null,
          totalAnalyses: { $sum: 1 },
          avgCareerMatch: { $avg: '$careerMatch' },
          avgSkillsScore: { $avg: '$skillsScore' },
          avgMarketDemand: { $avg: '$marketDemand' },
          lastAnalysisDate: { $max: '$createdAt' }
        }
      }
    ]);

    const analysisTypes = await Analysis.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: '$analysisType',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = stats[0] || {
      totalAnalyses: 0,
      avgCareerMatch: 0,
      avgSkillsScore: 0,
      avgMarketDemand: 0,
      lastAnalysisDate: null
    };

    res.json({
      success: true,
      data: {
        ...result,
        analysisTypes: analysisTypes.reduce((acc, type) => {
          acc[type._id] = type.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get analysis stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analysis statistics'
    });
  }
});

module.exports = router;

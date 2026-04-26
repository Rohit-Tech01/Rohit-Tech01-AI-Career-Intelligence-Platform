const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  personalityScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  skillsScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  marketDemand: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  careerMatch: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  recommendedCareer: {
    type: String,
    required: [true, 'Recommended career is required'],
    trim: true
  },
  topCareers: [{
    title: {
      type: String,
      required: true
    },
    match: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    salary: {
      type: String,
      required: true
    },
    growth: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  skillsGap: [{
    skill: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  roadmap: [{
    step: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    resources: [{
      name: String,
      type: String,
      url: String
    }]
  }],
  salaryRange: {
    type: String,
    required: true
  },
  confidenceScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      required: true
    },
    category: {
      type: String,
      enum: ['Technical', 'Soft', 'Domain'],
      required: true
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    }
  }],
  personalityTraits: {
    Realistic: Number,
    Investigative: Number,
    Artistic: Number,
    Social: Number,
    Enterprising: Number,
    Conventional: Number
  },
  interests: [{
    area: String,
    score: Number
  }],
  marketInsights: {
    industryGrowth: String,
    jobOpenings: String,
    competitionLevel: String,
    futureOutlook: String
  },
  learningRecommendations: [{
    course: String,
    provider: String,
    duration: String,
    difficulty: String,
    rating: Number,
    url: String
  }],
  analysisType: {
    type: String,
    enum: ['Comprehensive', 'Quick', 'Skills', 'Career'],
    default: 'Comprehensive'
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Failed'],
    default: 'Completed'
  }
}, {
  timestamps: true
});

// Index for faster queries
analysisSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Analysis', analysisSchema);

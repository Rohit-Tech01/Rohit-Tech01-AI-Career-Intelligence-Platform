const express = require('express');
const { body, validationResult } = require('express-validator');
const ChatHistory = require('../models/ChatHistory');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Mock AI Chat Service (replace with real OpenAI API in production)
const generateAIResponse = async (userMessage, context = {}) => {
  const message = userMessage.toLowerCase();
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate contextual responses based on message content
  let response = '';
  let category = 'general';
  let suggestions = [];
  
  if (message.includes('career') || message.includes('job') || message.includes('work')) {
    category = 'career';
    response = `Based on current market trends and your profile, here are some career insights:

🎯 **Top Growing Careers:**
• AI/ML Engineer - 35% growth, $120K-180K salary
• Data Scientist - 28% growth, $100K-150K salary  
• Full Stack Developer - 22% growth, $90K-130K salary

💡 **Career Development Tips:**
• Focus on developing technical skills like Python and machine learning
• Build a strong portfolio with real projects
• Network with professionals in your target field
• Stay updated with industry trends and technologies

📊 **Market Analysis:**
The tech job market is currently strong with high demand for data professionals. Remote work opportunities have increased significantly, offering more flexibility in career choices.`;
    suggestions = [
      'What skills are most in-demand?',
      'How to switch careers successfully?',
      'Salary negotiation tips',
      'Best learning resources'
    ];
  } else if (message.includes('skill') || message.includes('learn') || message.includes('education')) {
    category = 'skills';
    response = `🛠️ **Skill Development Strategy:**

**Technical Skills Priority:**
1. **Python Programming** - Essential for data science and AI
2. **Machine Learning** - Core skill for modern tech roles
3. **Data Analysis** - Critical for business decisions
4. **Cloud Computing** - AWS/Azure skills are highly valued

**Learning Resources:**
• **Coursera** - University-level courses and specializations
• **edX** - Free courses from top universities
• **Kaggle** - Hands-on data science projects
• **GitHub** - Build and showcase your portfolio

**Timeline Suggestions:**
• **3-6 months** - Learn fundamentals and build basic projects
• **6-12 months** - Advanced skills and specialized knowledge
• **12+ months** - Expertise and professional certifications

🎯 **Action Plan:**
Start with Python fundamentals, then move to data analysis, and gradually specialize in machine learning or cloud technologies.`;
    suggestions = [
      'Best Python learning path',
      'Machine learning roadmap',
      'Free learning resources',
      'Project ideas for portfolio'
    ];
  } else if (message.includes('salary') || message.includes('pay') || message.includes('income')) {
    category = 'salary';
    response = `💰 **Salary & Compensation Insights:**

**Current Market Data (2024):**
• **Data Scientist**: $80K-150K (avg: $110K)
• **AI/ML Engineer**: $100K-180K (avg: $140K)
• **Software Developer**: $70K-130K (avg: $95K)
• **Product Manager**: $90K-160K (avg: $120K)

**Factors Affecting Salary:**
• **Experience Level**: +$20-40K for senior roles
• **Location**: Tech hubs pay 30-50% more
• **Skills**: AI/ML skills command premium salaries
• **Company Size**: Large companies typically pay more

**Negotiation Tips:**
• Research market rates for your role/experience
• Highlight unique skills and achievements
• Consider total compensation (benefits, equity)
• Be prepared to walk away if underpaid

📈 **Growth Potential:**
Tech salaries typically grow 8-15% annually with job changes. Internal promotions usually offer 3-8% increases.`;
    suggestions = [
      'Salary for my specific role',
      'Negotiation strategies',
      'Remote work salaries',
      'Career progression impact'
    ];
  } else if (message.includes('resume') || message.includes('interview') || message.includes('cv')) {
    category = 'resume';
    response = `📄 **Resume & Interview Excellence:**

**Resume Optimization:**
• **ATS-Friendly Format**: Use standard section headers and simple formatting
• **Quantifiable Achievements**: "Increased efficiency by 35%" instead of "Improved efficiency"
• **Keywords**: Include relevant skills and terms from job descriptions
• **Clean Layout**: Professional, easy-to-read design with proper spacing

**Key Resume Sections:**
1. **Professional Summary** - 2-3 sentences highlighting your value
2. **Skills Section** - Technical and soft skills with proficiency levels
3. **Experience** - Achievements with metrics and results
4. **Education** - Relevant coursework and certifications
5. **Projects** - 2-3 significant projects with outcomes

**Interview Preparation:**
• **Research**: Study the company, role, and industry
• **STAR Method**: Structure answers with Situation, Task, Action, Result
• **Practice**: Rehearse common questions and your responses
• **Questions**: Prepare thoughtful questions to ask the interviewer

**Common Questions:**
• "Tell me about yourself"
• "Why do you want this role?"
• "What are your strengths/weaknesses?"
• "Describe a challenging project"

🎯 **Success Tips:**
Follow up with thank-you notes within 24 hours, and always research salary ranges before discussing compensation.`;
    suggestions = [
      'Review my resume',
      'Practice interview questions',
      'Technical interview prep',
      'Follow-up strategies'
    ];
  } else {
    response = `🤖 **AI Career Assistant**

I'm here to help you navigate your career journey! I can provide guidance on:

🎯 **Career Planning**
• Career path recommendations
• Industry insights and trends
• Job market analysis
• Career transition strategies

🛠️ **Skill Development**
• Learning roadmaps and timelines
• In-demand skills identification
• Resource recommendations
• Project ideas for practice

💼 **Job Search & Application**
• Resume and cover letter optimization
• Interview preparation
• Salary negotiation
• Job search strategies

📊 **Market Intelligence**
• Salary benchmarks
• Industry growth trends
• Remote work opportunities
• Company insights

💡 **Ask me about:**
• "What careers suit my background?"
• "How much can I earn in [field]?"
• "What skills should I learn next?"
• "Help me prepare for interviews"
• "Best learning resources for [skill]"

What specific aspect of your career journey would you like to explore today?`;
    suggestions = [
      'Career path recommendations',
      'Skills development plan',
      'Salary information',
      'Interview preparation',
      'Learning resources'
    ];
  }
  
  return {
    content: response,
    category,
    confidence: Math.floor(Math.random() * 20) + 80,
    suggestions
  };
};

// @route   POST /api/chat
// @desc    Send a message and get AI response
// @access  Private
router.post('/', authenticateToken, [
  body('message').trim().isLength({ min: 1, max: 1000 }).withMessage('Message must be between 1 and 1000 characters'),
  body('sessionId').optional().isString().withMessage('Session ID must be a string')
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

    const { message, sessionId } = req.body;

    // Find or create chat session
    let chatSession = await ChatHistory.findOne({
      userId: req.user.id,
      sessionId: sessionId || new Date().toISOString()
    });

    if (!chatSession) {
      chatSession = new ChatHistory({
        userId: req.user.id,
        sessionId: sessionId || new Date().toISOString(),
        messages: []
      });
    }

    // Add user message
    chatSession.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(message, {
      userId: req.user.id,
      sessionId: chatSession.sessionId
    });

    // Add AI response
    chatSession.messages.push({
      role: 'assistant',
      content: aiResponse.content,
      timestamp: new Date(),
      metadata: {
        category: aiResponse.category,
        confidence: aiResponse.confidence,
        suggestions: aiResponse.suggestions
      }
    });

    await chatSession.save();

    res.json({
      success: true,
      data: {
        message: aiResponse.content,
        sessionId: chatSession.sessionId,
        metadata: aiResponse
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing chat message'
    });
  }
});

// @route   GET /api/chat/history
// @desc    Get chat history
// @access  Private
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, sessionId } = req.query;
    
    const query = { userId: req.user.id };
    if (sessionId) {
      query.sessionId = sessionId;
    }

    const chatSessions = await ChatHistory.find(query)
      .sort({ lastMessageAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await ChatHistory.countDocuments(query);

    res.json({
      success: true,
      data: {
        chatSessions,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching chat history'
    });
  }
});

// @route   GET /api/chat/session/:sessionId
// @desc    Get specific chat session
// @access  Private
router.get('/session/:sessionId', authenticateToken, async (req, res) => {
  try {
    const chatSession = await ChatHistory.findOne({
      userId: req.user.id,
      sessionId: req.params.sessionId
    });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.json({
      success: true,
      data: chatSession
    });
  } catch (error) {
    console.error('Get chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching chat session'
    });
  }
});

// @route   DELETE /api/chat/session/:sessionId
// @desc    Delete chat session
// @access  Private
router.delete('/session/:sessionId', authenticateToken, async (req, res) => {
  try {
    const chatSession = await ChatHistory.findOneAndDelete({
      userId: req.user.id,
      sessionId: req.params.sessionId
    });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.json({
      success: true,
      message: 'Chat session deleted successfully'
    });
  } catch (error) {
    console.error('Delete chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting chat session'
    });
  }
});

// @route   POST /api/chat/clear
// @desc    Clear all chat history
// @access  Private
router.post('/clear', authenticateToken, async (req, res) => {
  try {
    await ChatHistory.deleteMany({ userId: req.user.id });

    res.json({
      success: true,
      message: 'Chat history cleared successfully'
    });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error clearing chat history'
    });
  }
});

// @route   GET /api/chat/stats
// @desc    Get chat statistics
// @access  Private
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await ChatHistory.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalMessages: { $sum: '$messageCount' },
          avgMessagesPerSession: { $avg: '$messageCount' },
          lastChatAt: { $max: '$lastMessageAt' }
        }
      }
    ]);

    const categoryStats = await ChatHistory.aggregate([
      { $match: { userId: req.user.id } },
      { $unwind: '$messages' },
      { $match: { 'messages.role': 'assistant' } },
      { $group: { _id: '$messages.metadata.category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const result = stats[0] || {
      totalSessions: 0,
      totalMessages: 0,
      avgMessagesPerSession: 0,
      lastChatAt: null
    };

    res.json({
      success: true,
      data: {
        ...result,
        categoryStats: categoryStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get chat stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching chat statistics'
    });
  }
});

module.exports = router;

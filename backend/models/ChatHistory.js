const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  sessionId: {
    type: String,
    required: true,
    default: () => new Date().toISOString()
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      category: String,
      confidence: Number,
      suggestions: [String]
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  messageCount: {
    type: Number,
    default: 0
  },
  context: {
    careerAnalysis: mongoose.Schema.Types.ObjectId,
    currentTopic: String,
    userGoals: [String],
    skillLevel: String
  }
}, {
  timestamps: true
});

// Index for faster queries
chatHistorySchema.index({ userId: 1, lastMessageAt: -1 });
chatHistorySchema.index({ sessionId: 1 });

// Pre-save middleware to update messageCount and lastMessageAt
chatHistorySchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.messageCount = this.messages.length;
    this.lastMessageAt = new Date();
  }
  next();
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);

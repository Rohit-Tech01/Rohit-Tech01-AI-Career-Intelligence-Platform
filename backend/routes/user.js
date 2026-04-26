const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('linkedin').optional().isURL().withMessage('Please provide a valid LinkedIn URL'),
  body('github').optional().isURL().withMessage('Please provide a valid GitHub URL'),
  body('website').optional().isURL().withMessage('Please provide a valid website URL')
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

    const { name, phone, location, bio, linkedin, github, website } = req.body;

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name || req.user.name,
        profile: {
          phone: phone || req.user.profile?.phone,
          location: location || req.user.profile?.location,
          bio: bio || req.user.profile?.bio,
          linkedin: linkedin || req.user.profile?.linkedin,
          github: github || req.user.profile?.github,
          website: website || req.user.profile?.website
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
});

// @route   POST /api/user/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', authenticateToken, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
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

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id);
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error changing password'
    });
  }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', authenticateToken, [
  body('password').notEmpty().withMessage('Password is required for account deletion')
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

    const { password } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id);
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    // Delete user account
    await User.findByIdAndDelete(req.user.id);

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting account'
    });
  }
});

// @route   GET /api/user/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const User = require('../models/User');
    const Analysis = require('../models/Analysis');
    const ChatHistory = require('../models/ChatHistory');

    // Get user info
    const user = await User.findById(req.user.id).select('-password');

    // Get latest analysis
    const latestAnalysis = await Analysis.findOne({ userId: req.user.id })
      .sort({ createdAt: -1 });

    // Get analysis statistics
    const analysisStats = await Analysis.aggregate([
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

    // Get chat statistics
    const chatStats = await ChatHistory.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalMessages: { $sum: '$messageCount' },
          lastChatAt: { $max: '$lastMessageAt' }
        }
      }
    ]);

    const stats = analysisStats[0] || {
      totalAnalyses: 0,
      avgCareerMatch: 0,
      avgSkillsScore: 0,
      avgMarketDemand: 0,
      lastAnalysisDate: null
    };

    const chatData = chatStats[0] || {
      totalSessions: 0,
      totalMessages: 0,
      lastChatAt: null
    };

    res.json({
      success: true,
      data: {
        user,
        latestAnalysis,
        stats: {
          ...stats,
          ...chatData
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard data'
    });
  }
});

// @route   GET /api/user/exports
// @desc    Get user's export history
// @access  Private
router.get('/exports', authenticateToken, async (req, res) => {
  try {
    // This would track file exports - for now return mock data
    res.json({
      success: true,
      data: {
        exports: [],
        totalExports: 0
      }
    });
  } catch (error) {
    console.error('Get exports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching export history'
    });
  }
});

module.exports = router;

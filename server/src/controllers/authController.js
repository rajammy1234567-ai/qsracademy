const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const { isDbConnected } = require('../config/db');
const store = require('../services/store');

const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET || 'qsr_academy_super_secret_production_jwt_key_2026_secure',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '2h',
    }
  );
};

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 2 * 60 * 60 * 1000,
  };
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public (Rate limited)
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    let admin = null;
    let isMatch = false;

    if (isDbConnected()) {
      admin = await AdminUser.findOne({ email: cleanEmail });
      if (admin) {
        isMatch = await admin.comparePassword(password);
      }
    } else {
      admin = store.adminUsers.find((u) => u.email === cleanEmail);
      if (admin) {
        isMatch = await admin.comparePassword(password);
      }
    }

    if (!admin || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.',
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    if (isDbConnected() && typeof admin.save === 'function') {
      await admin.save({ validateBeforeSave: false });
    }

    // Generate JWT
    const token = generateToken(admin._id, admin.email);

    // Set secure cookie
    res.cookie('token', token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in admin user
// @route   GET /api/auth/me
// @access  Private (Admin)
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
      lastLogin: req.admin.lastLogin,
    },
  });
};

// @desc    Admin logout
// @route   POST /api/auth/logout
// @access  Public
const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = {
  login,
  getMe,
  logout,
};

const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const { isDbConnected } = require('../config/db');
const store = require('../services/store');

const protectAdmin = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check httpOnly cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2. Fallback to Authorization Header if supplied
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.',
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'qsr_academy_super_secret_production_jwt_key_2026_secure'
    );

    let admin = null;
    if (isDbConnected()) {
      admin = await AdminUser.findById(decoded.id).select('-passwordHash');
    } else {
      admin = store.adminUsers.find(
        (u) => String(u._id) === String(decoded.id) || u.email === decoded.email
      );
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account no longer exists or invalid token.',
      });
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Admin privileges required.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.',
    });
  }
};

module.exports = {
  protectAdmin,
};

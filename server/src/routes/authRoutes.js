const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/auth');
const { adminLoginLimiter } = require('../middleware/rateLimiter');
const { loginValidationRules } = require('../middleware/validate');

// Public route with brute-force rate limiter & validation
router.post('/login', adminLoginLimiter, loginValidationRules, login);

// Admin-only route to check current session
router.get('/me', protectAdmin, getMe);

// Logout route
router.post('/logout', logout);

module.exports = router;

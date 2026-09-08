const rateLimit = require('express-rate-limit');

// Rate limiting for public enquiry forms
const publicFormLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions from this IP address. Please wait 10 minutes before submitting again.',
  },
});

// Strict rate limit for admin login attempts (5 in prod to block brute-force, higher in dev)
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. For security reasons, this IP is temporarily locked out for 15 minutes.',
  },
});

// General API limiter
const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

module.exports = {
  publicFormLimiter,
  adminLoginLimiter,
  generalApiLimiter,
};

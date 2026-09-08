const { body, validationResult } = require('express-validator');

// Bot Honeypot Check: if bot fills hidden trap field, return fake 200 without saving
const checkHoneypot = (req, res, next) => {
  const honeypot = req.body._trap_hp || req.body.website_url_hp || req.body.bot_field;
  if (honeypot && honeypot.trim() !== '') {
    // Silently deceive bot
    return res.status(200).json({
      success: true,
      message: 'Enquiry received successfully! Our team will get in touch with you shortly.',
    });
  }
  next();
};

// Check validation results helper
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      message: extractedErrors[0]?.message || 'Validation failed',
      errors: extractedErrors,
    });
  }
  next();
};

// Indian & General Phone Regex (allows optional +91 or 0 prefix, followed by 10 digits)
const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

// Validation Rules for Admission
const admissionValidationRules = [
  checkHoneypot,
  body('fullName').trim().notEmpty().withMessage('Full Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('phone')
    .trim()
    .matches(phoneRegex)
    .withMessage('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9'),
  body('city').trim().notEmpty().withMessage('City is required').isLength({ max: 100 }),
  body('qualification').trim().notEmpty().withMessage('Highest qualification is required'),
  body('courseInterested').optional().isString(),
  body('message').optional().trim().isLength({ max: 1000 }),
  handleValidationErrors,
];

// Validation Rules for Franchise Enquiry
const franchiseValidationRules = [
  checkHoneypot,
  body('fullName').trim().notEmpty().withMessage('Full Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('phone')
    .trim()
    .matches(phoneRegex)
    .withMessage('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9'),
  body('city').trim().notEmpty().withMessage('City/Preferred location is required'),
  body('occupation').trim().notEmpty().withMessage('Occupation/Background is required'),
  body('preferredModel')
    .isIn(['FOFO', 'FOCO', 'Not Sure'])
    .withMessage('Preferred model must be FOFO, FOCO, or Not Sure'),
  body('investmentReadiness')
    .isIn(['Ready to invest now', 'Exploring', 'Just enquiring'])
    .withMessage('Please choose a valid investment readiness option'),
  body('message').optional().trim().isLength({ max: 1000 }),
  handleValidationErrors,
];

// Validation Rules for Hiring Enquiry
const hiringValidationRules = [
  checkHoneypot,
  body('companyName').trim().notEmpty().withMessage('Company Name is required'),
  body('contactPerson').trim().notEmpty().withMessage('Contact Person name is required'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('phone')
    .trim()
    .matches(phoneRegex)
    .withMessage('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9'),
  body('city').trim().notEmpty().withMessage('Company city/location is required'),
  body('staffRequired')
    .isInt({ min: 1 })
    .withMessage('Please enter a valid number of staff required (at least 1)'),
  body('rolesRequired')
    .isArray({ min: 1 })
    .withMessage('Please select at least one role'),
  body('message').optional().trim().isLength({ max: 1000 }),
  handleValidationErrors,
];

// Validation Rules for Contact Message
const contactValidationRules = [
  checkHoneypot,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('phone').optional().trim(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
  handleValidationErrors,
];

// Admin Login Validation
const loginValidationRules = [
  body('email').trim().isEmail().withMessage('Please provide a valid admin email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

module.exports = {
  checkHoneypot,
  admissionValidationRules,
  franchiseValidationRules,
  hiringValidationRules,
  contactValidationRules,
  loginValidationRules,
};

const express = require('express');
const router = express.Router();
const {
  submitAdmission,
  submitFranchise,
  submitHiring,
  submitContact,
} = require('../controllers/enquiryController');
const { publicFormLimiter } = require('../middleware/rateLimiter');
const {
  admissionValidationRules,
  franchiseValidationRules,
  hiringValidationRules,
  contactValidationRules,
} = require('../middleware/validate');

// Public endpoints with rate limiters and express-validator
router.post('/admission', publicFormLimiter, admissionValidationRules, submitAdmission);
router.post('/franchise', publicFormLimiter, franchiseValidationRules, submitFranchise);
router.post('/hiring', publicFormLimiter, hiringValidationRules, submitHiring);
router.post('/contact', publicFormLimiter, contactValidationRules, submitContact);

module.exports = router;

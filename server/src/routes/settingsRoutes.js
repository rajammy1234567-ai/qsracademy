const express = require('express');
const router = express.Router();
const { getSettings } = require('../controllers/settingsController');

// Public route to get site contact and configuration
router.get('/', getSettings);

module.exports = router;

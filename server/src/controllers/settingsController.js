const SiteSettings = require('../models/SiteSettings');
const { isDbConnected } = require('../config/db');
const store = require('../services/store');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(store.siteSettings);
      }
      return res.status(200).json({ success: true, data: settings });
    }

    res.status(200).json({
      success: true,
      data: store.siteSettings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/admin/settings
// @access  Private (Admin)
const updateSettings = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(req.body);
      } else {
        settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
      }
      return res.status(200).json({ success: true, message: 'Updated successfully', data: settings });
    }

    store.siteSettings = {
      ...store.siteSettings,
      ...req.body,
      updatedAt: new Date(),
    };

    res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: store.siteSettings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};

const Course = require('../models/Course');
const { isDbConnected } = require('../config/db');
const store = require('../services/store');

// @desc    Get all active courses for public catalog
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res, next) => {
  try {
    let courses = [];
    if (isDbConnected()) {
      courses = await Course.find({ isActive: true }).sort({ createdAt: 1 });
    } else {
      courses = store.courses.filter((c) => c.isActive);
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get course by slug
// @route   GET /api/courses/:slug
// @access  Public
const getCourseBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    let course = null;

    if (isDbConnected()) {
      course = await Course.findOne({ slug, isActive: true });
    } else {
      course = store.courses.find((c) => c.slug.toLowerCase() === slug && c.isActive);
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseBySlug,
};

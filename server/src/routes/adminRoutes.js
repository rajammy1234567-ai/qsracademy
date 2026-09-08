const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const {
  getDashboardStats,
  getAdmissions,
  updateAdmissionStatus,
  deleteAdmission,
  getFranchiseEnquiries,
  updateFranchiseStatus,
  deleteFranchiseEnquiry,
  getHiringEnquiries,
  updateHiringStatus,
  deleteHiringEnquiry,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
  exportLeadsCSV,
  getAllAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/adminController');
const { updateSettings } = require('../controllers/settingsController');

// All routes in this router require valid admin token and role
router.use(protectAdmin);

// Dashboard overview
router.get('/stats', getDashboardStats);

// Admissions
router.get('/admissions', getAdmissions);
router.patch('/admissions/:id', updateAdmissionStatus);
router.delete('/admissions/:id', deleteAdmission);

// Franchise Enquiries
router.get('/franchise', getFranchiseEnquiries);
router.patch('/franchise/:id', updateFranchiseStatus);
router.delete('/franchise/:id', deleteFranchiseEnquiry);

// Hiring Enquiries
router.get('/hiring', getHiringEnquiries);
router.patch('/hiring/:id', updateHiringStatus);
router.delete('/hiring/:id', deleteHiringEnquiry);

// Contact Messages
router.get('/contacts', getContactMessages);
router.patch('/contacts/:id', updateContactStatus);
router.delete('/contacts/:id', deleteContactMessage);

// CSV Export
router.get('/export/:type', exportLeadsCSV);

// Course Management (CRUD)
router.get('/courses', getAllAdminCourses);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

// Site Settings
router.put('/settings', updateSettings);

module.exports = router;

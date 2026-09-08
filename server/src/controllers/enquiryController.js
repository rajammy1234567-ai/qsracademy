const Admission = require('../models/Admission');
const FranchiseEnquiry = require('../models/FranchiseEnquiry');
const HiringEnquiry = require('../models/HiringEnquiry');
const ContactMessage = require('../models/ContactMessage');
const Course = require('../models/Course');
const { isDbConnected } = require('../config/db');
const store = require('../services/store');
const { sendLeadNotification } = require('../services/emailService');

// @desc    Submit Student Admission Enquiry
// @route   POST /api/enquiries/admission
// @access  Public (Rate Limited)
const submitAdmission = async (req, res, next) => {
  try {
    const { fullName, email, phone, city, courseInterested, courseName, qualification, message } = req.body;

    let resolvedCourseName = courseName;
    if (courseInterested) {
      if (isDbConnected()) {
        const found = await Course.findById(courseInterested);
        if (found) resolvedCourseName = found.title;
      } else {
        const found = store.courses.find((c) => String(c._id) === String(courseInterested));
        if (found) resolvedCourseName = found.title;
      }
    }

    const newRecord = {
      _id: `adm_${Date.now()}`,
      fullName,
      email,
      phone,
      city,
      courseInterested: courseInterested || undefined,
      courseName: resolvedCourseName || 'Certificate in Quick Service Restaurant Operations',
      qualification,
      message: message || '',
      status: 'new',
      notes: '',
      ipAddress: req.ip || req.connection.remoteAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isDbConnected()) {
      await Admission.create(newRecord);
    } else {
      store.admissions.unshift(newRecord);
    }

    // Dispatch email alert to academyqsr@gmail.com (await for serverless lifecycle)
    await sendLeadNotification({ type: 'ADMISSION', data: newRecord }).catch((err) =>
      console.error('[EmailService] Admission notification error:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for your admission enquiry! Our admissions counsellor will contact you shortly.',
      data: {
        id: newRecord._id,
        fullName: newRecord.fullName,
        createdAt: newRecord.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit Franchise / Business Enquiry
// @route   POST /api/enquiries/franchise
// @access  Public (Rate Limited)
const submitFranchise = async (req, res, next) => {
  try {
    const { fullName, email, phone, city, occupation, preferredModel, investmentReadiness, message } = req.body;

    const newRecord = {
      _id: `fra_${Date.now()}`,
      fullName,
      email,
      phone,
      city,
      occupation,
      preferredModel,
      investmentReadiness,
      message: message || '',
      status: 'new',
      notes: '',
      ipAddress: req.ip || req.connection.remoteAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isDbConnected()) {
      await FranchiseEnquiry.create(newRecord);
    } else {
      store.franchiseEnquiries.unshift(newRecord);
    }

    // Dispatch email alert to academyqsr@gmail.com (await for serverless lifecycle)
    await sendLeadNotification({ type: 'FRANCHISE', data: newRecord }).catch((err) =>
      console.error('[EmailService] Franchise notification error:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for your franchise enquiry! Our franchise expansion team will reach out to you within 24 hours.',
      data: {
        id: newRecord._id,
        fullName: newRecord.fullName,
        createdAt: newRecord.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit Manpower / Hiring Enquiry
// @route   POST /api/enquiries/hiring
// @access  Public (Rate Limited)
const submitHiring = async (req, res, next) => {
  try {
    const { companyName, contactPerson, email, phone, city, staffRequired, rolesRequired, message } = req.body;

    const newRecord = {
      _id: `hir_${Date.now()}`,
      companyName,
      contactPerson,
      email,
      phone,
      city,
      staffRequired: Number(staffRequired),
      rolesRequired: Array.isArray(rolesRequired) ? rolesRequired : [rolesRequired],
      message: message || '',
      status: 'new',
      notes: '',
      ipAddress: req.ip || req.connection.remoteAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isDbConnected()) {
      await HiringEnquiry.create(newRecord);
    } else {
      store.hiringEnquiries.unshift(newRecord);
    }

    // Dispatch email alert to academyqsr@gmail.com (await for serverless lifecycle)
    await sendLeadNotification({ type: 'HIRING', data: newRecord }).catch((err) =>
      console.error('[EmailService] Hiring notification error:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for your hiring enquiry! Our corporate placement cell will contact you to discuss trained QSR talent.',
      data: {
        id: newRecord._id,
        companyName: newRecord.companyName,
        createdAt: newRecord.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit General Contact Message
// @route   POST /api/enquiries/contact
// @access  Public (Rate Limited)
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newRecord = {
      _id: `cnt_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'new',
      notes: '',
      ipAddress: req.ip || req.connection.remoteAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isDbConnected()) {
      await ContactMessage.create(newRecord);
    } else {
      store.contactMessages.unshift(newRecord);
    }

    // Dispatch email alert to academyqsr@gmail.com (await for serverless lifecycle)
    await sendLeadNotification({ type: 'CONTACT', data: newRecord }).catch((err) =>
      console.error('[EmailService] Contact notification error:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting QSR ACADEMY. We have received your message and will respond promptly.',
      data: {
        id: newRecord._id,
        name: newRecord.name,
        createdAt: newRecord.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitAdmission,
  submitFranchise,
  submitHiring,
  submitContact,
};

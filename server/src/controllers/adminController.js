const Admission = require('../models/Admission');
const FranchiseEnquiry = require('../models/FranchiseEnquiry');
const HiringEnquiry = require('../models/HiringEnquiry');
const ContactMessage = require('../models/ContactMessage');
const Course = require('../models/Course');
const { isDbConnected } = require('../config/db');
const store = require('../services/store');

// Helper to calculate date ranges
const getDateRanges = () => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  return { now, sevenDaysAgo, fourteenDaysAgo };
};

// @desc    Get dashboard metrics & overview stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res, next) => {
  try {
    const { sevenDaysAgo, fourteenDaysAgo } = getDateRanges();

    if (isDbConnected()) {
      const [totalAdmissions, totalFranchise, totalHiring, totalContact] = await Promise.all([
        Admission.countDocuments(),
        FranchiseEnquiry.countDocuments(),
        HiringEnquiry.countDocuments(),
        ContactMessage.countDocuments(),
      ]);

      const [admissionsThisWeek, franchiseThisWeek, hiringThisWeek, contactThisWeek] = await Promise.all([
        Admission.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
        FranchiseEnquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
        HiringEnquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
        ContactMessage.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      ]);

      const [admissionsLastWeek, franchiseLastWeek, hiringLastWeek, contactLastWeek] = await Promise.all([
        Admission.countDocuments({ createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } }),
        FranchiseEnquiry.countDocuments({ createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } }),
        HiringEnquiry.countDocuments({ createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } }),
        ContactMessage.countDocuments({ createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } }),
      ]);

      const recentAdmissions = await Admission.find().sort({ createdAt: -1 }).limit(5);

      return res.status(200).json({
        success: true,
        data: {
          summary: {
            admissions: {
              total: totalAdmissions,
              thisWeek: admissionsThisWeek,
              lastWeek: admissionsLastWeek,
              growth: admissionsLastWeek === 0 ? 100 : Math.round(((admissionsThisWeek - admissionsLastWeek) / admissionsLastWeek) * 100),
            },
            franchise: {
              total: totalFranchise,
              thisWeek: franchiseThisWeek,
              lastWeek: franchiseLastWeek,
              growth: franchiseLastWeek === 0 ? 100 : Math.round(((franchiseThisWeek - franchiseLastWeek) / franchiseLastWeek) * 100),
            },
            hiring: {
              total: totalHiring,
              thisWeek: hiringThisWeek,
              lastWeek: hiringLastWeek,
              growth: hiringLastWeek === 0 ? 100 : Math.round(((hiringThisWeek - hiringLastWeek) / hiringLastWeek) * 100),
            },
            contact: {
              total: totalContact,
              thisWeek: contactThisWeek,
              lastWeek: contactLastWeek,
              growth: contactLastWeek === 0 ? 100 : Math.round(((contactThisWeek - contactLastWeek) / contactLastWeek) * 100),
            },
          },
          recentAdmissions,
        },
      });
    }

    // In-memory fallback stats calculation
    const countThisWeek = (arr) => arr.filter((x) => new Date(x.createdAt) >= sevenDaysAgo).length;
    const countLastWeek = (arr) =>
      arr.filter((x) => new Date(x.createdAt) >= fourteenDaysAgo && new Date(x.createdAt) < sevenDaysAgo).length;

    const admTot = store.admissions.length;
    const admTW = countThisWeek(store.admissions);
    const admLW = countLastWeek(store.admissions);

    const fraTot = store.franchiseEnquiries.length;
    const fraTW = countThisWeek(store.franchiseEnquiries);
    const fraLW = countLastWeek(store.franchiseEnquiries);

    const hirTot = store.hiringEnquiries.length;
    const hirTW = countThisWeek(store.hiringEnquiries);
    const hirLW = countLastWeek(store.hiringEnquiries);

    const cntTot = store.contactMessages.length;
    const cntTW = countThisWeek(store.contactMessages);
    const cntLW = countLastWeek(store.contactMessages);

    res.status(200).json({
      success: true,
      data: {
        summary: {
          admissions: {
            total: admTot,
            thisWeek: admTW,
            lastWeek: admLW,
            growth: admLW === 0 ? 100 : Math.round(((admTW - admLW) / admLW) * 100),
          },
          franchise: {
            total: fraTot,
            thisWeek: fraTW,
            lastWeek: fraLW,
            growth: fraLW === 0 ? 100 : Math.round(((fraTW - fraLW) / fraLW) * 100),
          },
          hiring: {
            total: hirTot,
            thisWeek: hirTW,
            lastWeek: hirLW,
            growth: hirLW === 0 ? 100 : Math.round(((hirTW - hirLW) / hirLW) * 100),
          },
          contact: {
            total: cntTot,
            thisWeek: cntTW,
            lastWeek: cntLW,
            growth: cntLW === 0 ? 100 : Math.round(((cntTW - cntLW) / cntLW) * 100),
          },
        },
        recentAdmissions: store.admissions.slice(0, 5),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Generic list fetcher
const fetchRecords = async (Model, memoryArray, req, searchFields) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 15;
  const status = req.query.status;
  const search = (req.query.search || '').trim().toLowerCase();

  if (isDbConnected()) {
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      }));
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Model.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Model.countDocuments(query),
    ]);
    return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 } };
  }

  // Fallback filtering on memory array
  let filtered = [...memoryArray];
  if (status && status !== 'all') {
    filtered = filtered.filter((item) => item.status === status);
  }
  if (search) {
    filtered = filtered.filter((item) => {
      return searchFields.some((field) => {
        const val = item[field];
        return val && String(val).toLowerCase().includes(search);
      });
    });
  }

  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const total = filtered.length;
  const skip = (page - 1) * limit;
  const items = filtered.slice(skip, skip + limit);

  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 } };
};

// --- ADMISSIONS ---
const getAdmissions = async (req, res, next) => {
  try {
    const data = await fetchRecords(Admission, store.admissions, req, ['fullName', 'email', 'phone', 'city', 'qualification', 'courseName']);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const updateAdmissionStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    if (isDbConnected()) {
      const rec = await Admission.findByIdAndUpdate(req.params.id, { ...(status && { status }), ...(notes !== undefined && { notes }) }, { new: true });
      return res.status(200).json({ success: true, data: rec });
    }
    const rec = store.admissions.find((x) => String(x._id) === String(req.params.id));
    if (rec) {
      if (status) rec.status = status;
      if (notes !== undefined) rec.notes = notes;
      rec.updatedAt = new Date();
    }
    res.status(200).json({ success: true, data: rec });
  } catch (error) {
    next(error);
  }
};

const deleteAdmission = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await Admission.findByIdAndDelete(req.params.id);
    } else {
      store.admissions = store.admissions.filter((x) => String(x._id) !== String(req.params.id));
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- FRANCHISE ENQUIRIES ---
const getFranchiseEnquiries = async (req, res, next) => {
  try {
    const data = await fetchRecords(FranchiseEnquiry, store.franchiseEnquiries, req, ['fullName', 'email', 'phone', 'city', 'occupation']);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const updateFranchiseStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    if (isDbConnected()) {
      const rec = await FranchiseEnquiry.findByIdAndUpdate(req.params.id, { ...(status && { status }), ...(notes !== undefined && { notes }) }, { new: true });
      return res.status(200).json({ success: true, data: rec });
    }
    const rec = store.franchiseEnquiries.find((x) => String(x._id) === String(req.params.id));
    if (rec) {
      if (status) rec.status = status;
      if (notes !== undefined) rec.notes = notes;
      rec.updatedAt = new Date();
    }
    res.status(200).json({ success: true, data: rec });
  } catch (error) {
    next(error);
  }
};

const deleteFranchiseEnquiry = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await FranchiseEnquiry.findByIdAndDelete(req.params.id);
    } else {
      store.franchiseEnquiries = store.franchiseEnquiries.filter((x) => String(x._id) !== String(req.params.id));
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- HIRING ENQUIRIES ---
const getHiringEnquiries = async (req, res, next) => {
  try {
    const data = await fetchRecords(HiringEnquiry, store.hiringEnquiries, req, ['companyName', 'contactPerson', 'email', 'phone', 'city']);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const updateHiringStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    if (isDbConnected()) {
      const rec = await HiringEnquiry.findByIdAndUpdate(req.params.id, { ...(status && { status }), ...(notes !== undefined && { notes }) }, { new: true });
      return res.status(200).json({ success: true, data: rec });
    }
    const rec = store.hiringEnquiries.find((x) => String(x._id) === String(req.params.id));
    if (rec) {
      if (status) rec.status = status;
      if (notes !== undefined) rec.notes = notes;
      rec.updatedAt = new Date();
    }
    res.status(200).json({ success: true, data: rec });
  } catch (error) {
    next(error);
  }
};

const deleteHiringEnquiry = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await HiringEnquiry.findByIdAndDelete(req.params.id);
    } else {
      store.hiringEnquiries = store.hiringEnquiries.filter((x) => String(x._id) !== String(req.params.id));
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- CONTACT MESSAGES ---
const getContactMessages = async (req, res, next) => {
  try {
    const data = await fetchRecords(ContactMessage, store.contactMessages, req, ['name', 'email', 'phone', 'subject', 'message']);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    if (isDbConnected()) {
      const rec = await ContactMessage.findByIdAndUpdate(req.params.id, { ...(status && { status }), ...(notes !== undefined && { notes }) }, { new: true });
      return res.status(200).json({ success: true, data: rec });
    }
    const rec = store.contactMessages.find((x) => String(x._id) === String(req.params.id));
    if (rec) {
      if (status) rec.status = status;
      if (notes !== undefined) rec.notes = notes;
      rec.updatedAt = new Date();
    }
    res.status(200).json({ success: true, data: rec });
  } catch (error) {
    next(error);
  }
};

const deleteContactMessage = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await ContactMessage.findByIdAndDelete(req.params.id);
    } else {
      store.contactMessages = store.contactMessages.filter((x) => String(x._id) !== String(req.params.id));
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- CSV EXPORT ---
const exportLeadsCSV = async (req, res, next) => {
  try {
    const { type } = req.params;
    let records = [];
    let fields = [];
    let filename = `qsr_${type}_export_${Date.now()}.csv`;

    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const escaped = String(str).replace(/"/g, '""');
      return `"${escaped}"`;
    };

    if (type === 'admissions') {
      records = isDbConnected() ? await Admission.find().sort({ createdAt: -1 }) : store.admissions;
      fields = ['Full Name', 'Email', 'Phone', 'City', 'Course', 'Qualification', 'Status', 'Notes', 'Message', 'Date'];
      const rows = records.map((r) => [
        escapeCsv(r.fullName),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.city),
        escapeCsv(r.courseName),
        escapeCsv(r.qualification),
        escapeCsv(r.status),
        escapeCsv(r.notes),
        escapeCsv(r.message),
        escapeCsv(new Date(r.createdAt).toLocaleString('en-IN')),
      ]);
      const csv = [fields.join(','), ...rows.map((row) => row.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.status(200).send(csv);
    } else if (type === 'franchise') {
      records = isDbConnected() ? await FranchiseEnquiry.find().sort({ createdAt: -1 }) : store.franchiseEnquiries;
      fields = ['Full Name', 'Email', 'Phone', 'City', 'Occupation', 'Model', 'Investment Readiness', 'Status', 'Notes', 'Message', 'Date'];
      const rows = records.map((r) => [
        escapeCsv(r.fullName),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.city),
        escapeCsv(r.occupation),
        escapeCsv(r.preferredModel),
        escapeCsv(r.investmentReadiness),
        escapeCsv(r.status),
        escapeCsv(r.notes),
        escapeCsv(r.message),
        escapeCsv(new Date(r.createdAt).toLocaleString('en-IN')),
      ]);
      const csv = [fields.join(','), ...rows.map((row) => row.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.status(200).send(csv);
    } else if (type === 'hiring') {
      records = isDbConnected() ? await HiringEnquiry.find().sort({ createdAt: -1 }) : store.hiringEnquiries;
      fields = ['Company Name', 'Contact Person', 'Email', 'Phone', 'City', 'Staff Required', 'Roles', 'Status', 'Notes', 'Message', 'Date'];
      const rows = records.map((r) => [
        escapeCsv(r.companyName),
        escapeCsv(r.contactPerson),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.city),
        escapeCsv(r.staffRequired),
        escapeCsv(Array.isArray(r.rolesRequired) ? r.rolesRequired.join('; ') : r.rolesRequired),
        escapeCsv(r.status),
        escapeCsv(r.notes),
        escapeCsv(r.message),
        escapeCsv(new Date(r.createdAt).toLocaleString('en-IN')),
      ]);
      const csv = [fields.join(','), ...rows.map((row) => row.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.status(200).send(csv);
    } else if (type === 'contacts') {
      records = isDbConnected() ? await ContactMessage.find().sort({ createdAt: -1 }) : store.contactMessages;
      fields = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Notes', 'Date'];
      const rows = records.map((r) => [
        escapeCsv(r.name),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.subject),
        escapeCsv(r.message),
        escapeCsv(r.status),
        escapeCsv(r.notes),
        escapeCsv(new Date(r.createdAt).toLocaleString('en-IN')),
      ]);
      const csv = [fields.join(','), ...rows.map((row) => row.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.status(200).send(csv);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid export type specified' });
    }
  } catch (error) {
    next(error);
  }
};

// --- COURSE MANAGEMENT CMS (CRUD) ---
const getAllAdminCourses = async (req, res, next) => {
  try {
    let courses = [];
    if (isDbConnected()) {
      courses = await Course.find().sort({ createdAt: -1 });
    } else {
      courses = store.courses;
    }
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    let { title, slug, overview, curriculum, learningOutcomes, careerOpportunities, duration, eligibility, fee, badge, isActive } = req.body;

    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const newCourseData = {
      title,
      slug,
      overview,
      curriculum: Array.isArray(curriculum) ? curriculum : (curriculum || '').split('\n').filter(Boolean),
      learningOutcomes: Array.isArray(learningOutcomes) ? learningOutcomes : (learningOutcomes || '').split('\n').filter(Boolean),
      careerOpportunities: Array.isArray(careerOpportunities) ? careerOpportunities : (careerOpportunities || '').split('\n').filter(Boolean),
      duration: duration || '2 Months',
      eligibility: eligibility || '10th pass and above',
      fee: fee || '₹20,000/-',
      badge: badge || 'Certification',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let created;
    if (isDbConnected()) {
      created = await Course.create(newCourseData);
    } else {
      created = { _id: `crs_${Date.now()}`, ...newCourseData };
      store.courses.unshift(created);
    }

    res.status(201).json({ success: true, message: 'Course created successfully', data: created });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json({ success: true, data: course });
    }
    const idx = store.courses.findIndex((c) => String(c._id) === String(req.params.id));
    if (idx !== -1) {
      store.courses[idx] = { ...store.courses[idx], ...req.body, updatedAt: new Date() };
      return res.status(200).json({ success: true, data: store.courses[idx] });
    }
    res.status(404).json({ success: false, message: 'Course not found' });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await Course.findByIdAndDelete(req.params.id);
    } else {
      store.courses = store.courses.filter((c) => String(c._id) !== String(req.params.id));
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};

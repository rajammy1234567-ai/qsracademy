const mongoose = require('mongoose');

const franchiseEnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City or preferred location is required'],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, 'Occupation is required'],
      trim: true,
    },
    preferredModel: {
      type: String,
      required: [true, 'Preferred business model is required'],
      enum: ['FOFO', 'FOCO', 'Not Sure'],
      default: 'Not Sure',
    },
    investmentReadiness: {
      type: String,
      required: [true, 'Investment readiness is required'],
      enum: ['Ready to invest now', 'Exploring', 'Just enquiring'],
      default: 'Exploring',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'rejected'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FranchiseEnquiry', franchiseEnquirySchema);

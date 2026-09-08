const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Course slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
    },
    curriculum: {
      type: [String],
      default: [],
    },
    learningOutcomes: {
      type: [String],
      default: [],
    },
    careerOpportunities: {
      type: [String],
      default: [],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      default: '2 Months',
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility is required'],
      default: '10th pass and above',
    },
    fee: {
      type: String,
      required: [true, 'Fee is required'],
      default: '₹20,000/-',
    },
    badge: {
      type: String,
      default: 'Flagship Certification',
    },
    journey: {
      type: [String],
      default: ['Learn', 'Train', 'Perform', 'Grow', 'Lead'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);

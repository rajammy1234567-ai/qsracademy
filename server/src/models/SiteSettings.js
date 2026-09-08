const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    academyName: {
      type: String,
      default: 'QSR ACADEMY',
    },
    legalName: {
      type: String,
      default: 'QSR Academy (Certificate in Quick Service Restaurant Operations)',
    },
    tagline: {
      type: String,
      default: 'Build. Train. Grow. Lead the Next Generation of QSR Professionals.',
    },
    phone: {
      type: String,
      default: '+91 98765 43210',
    },
    email: {
      type: String,
      default: 'academyqsr@gmail.com',
    },
    admissionsEmail: {
      type: String,
      default: 'academyqsr@gmail.com',
    },
    franchiseEmail: {
      type: String,
      default: 'academyqsr@gmail.com',
    },
    address: {
      type: String,
      default:
        'SCO-35, Ground Floor, Opp. VIP Road, High Street Market, Near IDBI Bank, Zirakpur, Punjab 140603, India',
    },
    googleMapUrl: {
      type: String,
      default:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.259972322527!2d76.81846467623912!3d30.64069798979313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb418f773663%3A0x89ad09559e2b17f5!2sHigh%20Street%20Market%20Zirakpur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    },
    socialLinks: {
      facebook: { type: String, default: '#' },
      instagram: { type: String, default: '#' },
      youtube: { type: String, default: '#' },
      linkedin: { type: String, default: '#' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);

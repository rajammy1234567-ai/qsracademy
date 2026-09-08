require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');

// Pre-hashed default password for AdminQSR@2026#Secure!
const defaultPassword = process.env.ADMIN_SEED_PASSWORD || 'AdminQSR@2026#Secure!';
const defaultPasswordHash = bcrypt.hashSync(defaultPassword, 10);

const store = {
  adminUsers: [
    {
      _id: '65e900000000000000000001',
      name: process.env.ADMIN_SEED_NAME || 'QSR Academy Admin',
      email: (process.env.ADMIN_SEED_EMAIL || 'academyqsr@gmail.com').toLowerCase(),
      passwordHash: defaultPasswordHash,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      comparePassword: async function (candidate) {
        return bcrypt.compare(candidate, this.passwordHash);
      },
    },
    {
      _id: '65e900000000000000000002',
      name: 'QSR Academy Admin',
      email: 'admin@qsracademy.com',
      passwordHash: defaultPasswordHash,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      comparePassword: async function (candidate) {
        return bcrypt.compare(candidate, this.passwordHash);
      },
    },
  ],

  courses: [
    {
      _id: '65e900000000000000000002',
      title: 'Certificate in Quick Service Restaurant Operations',
      slug: 'certificate-in-quick-service-restaurant-operations',
      badge: 'Flagship Certification',
      duration: '2 Months',
      eligibility: '10th pass and above',
      fee: '₹20,000/-',
      journey: ['Learn', 'Train', 'Perform', 'Grow', 'Lead'],
      overview:
        'A practical, career-oriented certification programme designed to develop job-ready professionals for the rapidly growing Quick Service Restaurant (QSR) industry. Combines QSR operations, food production, customer service, food safety, inventory management, cost control, team management, sales, and outlet operations with practical industry exposure.',
      curriculum: [
        'Module 1: Introduction to QSR Industry Dynamics, Formats & Brand Standards',
        'Module 2: Commercial Kitchen Operations, Food Preparation & Equipment Handling',
        'Module 3: Front-of-House (FOH) Guest Service, Order Taking & POS Billing Systems',
        'Module 4: Food Safety Standards, FSSAI / HACCP Guidelines & Hygiene Protocols',
        'Module 5: Inventory, Store Management, Stock Rotation (FIFO) & Cold-Chain',
        'Module 6: Cost Control, Food Cost Calculations, Wastage Minimisation & Portions',
        'Module 7: Shift Management, Peak Hour Rush Handling & Team Coordination',
        'Module 8: Sales Growth, Suggestive Selling, Upselling & Customer Retention',
        'Module 9: QSR Business Fundamentals & Franchise Operating Procedures',
        'Module 10: Real-World Outlet Simulation, Mock Drills & Interview Grooming',
      ],
      learningOutcomes: [
        'Learn the Operations: Master end-to-end fast-food kitchen workflow and service mechanics.',
        'Master the Standards: Comply strictly with food hygiene, safety laws, and global brand SOPs.',
        'Build Professional Skills: Command point-of-sale systems, handle high pressure, and resolve guest queries with finesse.',
        'Prepare for Your Career: Acquire leadership and analytical skills to manage shifts and reduce food waste from Day One.',
      ],
      careerOpportunities: [
        'QSR Outlet Operations',
        'Kitchen & Food Production',
        'Front-of-House Operations',
        'Customer Service',
        'Shift Supervision',
        'Inventory & Store Management',
        'Restaurant Management',
        'Sales & Business Development',
        'QSR Franchise Operations',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  admissions: [
    {
      _id: '65e900000000000000000010',
      fullName: 'Aman Sharma',
      email: 'aman.sharma@example.com',
      phone: '9812345678',
      city: 'Chandigarh',
      courseName: 'Certificate in Quick Service Restaurant Operations',
      qualification: '12th Pass',
      message: 'Interested in the upcoming batch starting next month.',
      status: 'new',
      notes: 'Called once, requested callback after 5 PM.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '65e900000000000000000011',
      fullName: 'Pooja Verma',
      email: 'pooja.verma@example.com',
      phone: '9876543211',
      city: 'Mohali',
      courseName: 'Certificate in Quick Service Restaurant Operations',
      qualification: 'Graduate',
      message: 'Looking for a career shift into QSR front-of-house management.',
      status: 'contacted',
      notes: 'Counselled regarding 2-month practical kitchen and POS training.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      _id: '65e900000000000000000012',
      fullName: 'Rahul Preet Singh',
      email: 'rahul.preet@example.com',
      phone: '9988776655',
      city: 'Zirakpur',
      courseName: 'Certificate in Quick Service Restaurant Operations',
      qualification: '10th Pass',
      message: 'Want to apply for retail outlet operations.',
      status: 'converted',
      notes: 'Enrolled in Batch A-04.',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  ],

  franchiseEnquiries: [
    {
      _id: '65e900000000000000000020',
      fullName: 'Vikram Malhotra',
      email: 'vikram.malhotra@example.com',
      phone: '9876501234',
      city: 'Ludhiana',
      occupation: 'Entrepreneur',
      preferredModel: 'FOFO',
      investmentReadiness: 'Ready to invest now',
      message: 'Have 800 sq ft commercial space in central market. Ready for 4L investment.',
      status: 'new',
      notes: 'High potential franchise lead. Meeting scheduled.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '65e900000000000000000021',
      fullName: 'Sunita Rao',
      email: 'sunita.rao@example.com',
      phone: '9845123654',
      city: 'Ambala',
      occupation: 'Hospitality Professional',
      preferredModel: 'FOCO',
      investmentReadiness: 'Exploring',
      message: 'Interested in company operated model in Haryana region.',
      status: 'contacted',
      notes: 'Sent detailed franchise deck.',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  ],

  hiringEnquiries: [
    {
      _id: '65e900000000000000000030',
      companyName: 'Roll Express Outlets Ltd',
      contactPerson: 'Harpreet Singh',
      email: 'harpreet@rollexpress.com',
      phone: '9876598765',
      city: 'Chandigarh Tri-city',
      staffRequired: 8,
      rolesRequired: ['Outlet Staff', 'Kitchen Staff', 'Shift Supervisor'],
      message: 'Opening 2 new quick service locations in Panchkula and Zirakpur.',
      status: 'contacted',
      notes: 'Sent profiles of recent batch graduates.',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  ],

  contactMessages: [
    {
      _id: '65e900000000000000000040',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '9876511223',
      subject: 'Visiting Zirakpur Campus',
      message: 'Can I visit the SCO-35 campus this Saturday to check the demonstration kitchen?',
      status: 'new',
      notes: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  siteSettings: {
    _id: '65e900000000000000000050',
    academyName: 'QSR ACADEMY',
    legalName: 'QSR Academy (Certificate in Quick Service Restaurant Operations)',
    tagline: 'Build. Train. Grow. Lead the Next Generation of QSR Professionals.',
    phone: '+91 98765 43210',
    email: 'academyqsr@gmail.com',
    admissionsEmail: 'academyqsr@gmail.com',
    franchiseEmail: 'academyqsr@gmail.com',
    address:
      'SCO-35, Ground Floor, Opp. VIP Road, High Street Market, Near IDBI Bank, Zirakpur, Punjab 140603, India',
    googleMapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.259972322527!2d76.81846467623912!3d30.64069798979313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb418f773663%3A0x89ad09559e2b17f5!2sHigh%20Street%20Market%20Zirakpur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    },
    updatedAt: new Date(),
  },
};

module.exports = store;

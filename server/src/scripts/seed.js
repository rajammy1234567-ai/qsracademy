require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const Course = require('../models/Course');
const SiteSettings = require('../models/SiteSettings');
const Admission = require('../models/Admission');
const FranchiseEnquiry = require('../models/FranchiseEnquiry');
const HiringEnquiry = require('../models/HiringEnquiry');
const ContactMessage = require('../models/ContactMessage');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/qsr_academy';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB.');

    // 1. Seed or Update Admin User
    const adminEmail = (process.env.ADMIN_SEED_EMAIL || 'academyqsr@gmail.com').toLowerCase();
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'AdminQSR@2026#Secure!';
    const adminName = process.env.ADMIN_SEED_NAME || 'QSR Academy Admin';

    let admin = await AdminUser.findOne({ email: adminEmail });
    const passwordHash = await AdminUser.hashPassword(adminPassword);

    if (!admin) {
      admin = await AdminUser.create({
        name: adminName,
        email: adminEmail,
        passwordHash,
        role: 'admin',
      });
      console.log(`[Seed] Created admin account: ${adminEmail}`);
    } else {
      admin.name = adminName;
      admin.passwordHash = passwordHash;
      await admin.save();
      console.log(`[Seed] Updated admin password for: ${adminEmail}`);
    }

    // 2. Seed Flagship Course
    const flagshipSlug = 'certificate-in-quick-service-restaurant-operations';
    const flagshipData = {
      title: 'Certificate in Quick Service Restaurant Operations',
      slug: flagshipSlug,
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
    };

    let flagship = await Course.findOne({ slug: flagshipSlug });
    if (!flagship) {
      flagship = await Course.create(flagshipData);
      console.log('[Seed] Created flagship course.');
    } else {
      await Course.updateOne({ slug: flagshipSlug }, flagshipData);
      console.log('[Seed] Updated flagship course.');
    }

    // 3. Seed Site Settings
    const settingsData = {
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
    };

    let settings = await SiteSettings.findOne();
    if (!settings) {
      await SiteSettings.create(settingsData);
      console.log('[Seed] Created default site settings.');
    } else {
      await SiteSettings.updateOne({}, settingsData);
      console.log('[Seed] Updated site settings.');
    }

    // 4. Seed initial sample leads if collections are empty (for rich dashboard presentation)
    const admissionCount = await Admission.countDocuments();
    if (admissionCount === 0) {
      await Admission.create([
        {
          fullName: 'Aman Sharma',
          email: 'aman.sharma@example.com',
          phone: '9812345678',
          city: 'Chandigarh',
          courseInterested: flagship._id,
          courseName: flagship.title,
          qualification: '12th Pass',
          message: 'Interested in the upcoming batch starting next month.',
          status: 'new',
          notes: 'Called once, requested callback after 5 PM.',
        },
        {
          fullName: 'Pooja Verma',
          email: 'pooja.verma@example.com',
          phone: '9876543211',
          city: 'Mohali',
          courseInterested: flagship._id,
          courseName: flagship.title,
          qualification: 'Graduate',
          message: 'Looking for a career shift into QSR front-of-house management.',
          status: 'contacted',
          notes: 'Counselled regarding 2-month practical kitchen and POS training.',
        },
        {
          fullName: 'Rahul Preet Singh',
          email: 'rahul.preet@example.com',
          phone: '9988776655',
          city: 'Zirakpur',
          courseInterested: flagship._id,
          courseName: flagship.title,
          qualification: '10th Pass',
          message: 'Want to apply for retail outlet operations.',
          status: 'converted',
          notes: 'Enrolled in Batch A-04.',
        },
      ]);
      console.log('[Seed] Seeded sample admissions.');
    }

    const franchiseCount = await FranchiseEnquiry.countDocuments();
    if (franchiseCount === 0) {
      await FranchiseEnquiry.create([
        {
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
        },
        {
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
        },
      ]);
      console.log('[Seed] Seeded sample franchise enquiries.');
    }

    const hiringCount = await HiringEnquiry.countDocuments();
    if (hiringCount === 0) {
      await HiringEnquiry.create([
        {
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
        },
      ]);
      console.log('[Seed] Seeded sample hiring enquiries.');
    }

    const contactCount = await ContactMessage.countDocuments();
    if (contactCount === 0) {
      await ContactMessage.create([
        {
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@example.com',
          phone: '9876511223',
          subject: 'Visiting Zirakpur Campus',
          message: 'Can I visit the SCO-35 campus this Saturday to check the demonstration kitchen?',
          status: 'new',
        },
      ]);
      console.log('[Seed] Seeded sample contact messages.');
    }

    console.log('\n==========================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY');
    console.log('==========================================');
    console.log(`Admin Email:    ${adminEmail}`);
    console.log(`Admin Password: ${adminPassword}`);
    console.log('==========================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();

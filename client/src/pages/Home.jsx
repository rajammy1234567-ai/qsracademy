import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandMarquee from '../components/BrandMarquee';
import { api } from '../services/api';
import {
  GraduationCap,
  Store,
  Briefcase,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  IndianRupee,
  ShieldCheck,
  ChefHat,
  Users,
  Building2,
  Sparkles,
  MapPin,
  Flame,
  Coffee,
  Utensils,
  Layers,
  Check,
} from 'lucide-react';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getCourses();
        if (res.success) {
          setCourses(res.data);
        }
      } catch (err) {
        console.error('Error loading courses:', err);
      } finally {
        setLoadingCourses(false);
      }
    }
    load();
  }, []);

  const careerPaths = [
    { title: 'QSR Outlet Operations', desc: 'Master store workflow, opening/closing checklists, and floor supervision.', icon: Store },
    { title: 'Kitchen & Food Production', desc: 'Commercial equipment handling, recipe standardization, and speed of service.', icon: Flame },
    { title: 'Front-of-House Operations', desc: 'Guest hospitality, order dispatch, counter cleanliness, and customer smiles.', icon: Users },
    { title: 'Customer Service & Relations', desc: 'Guest satisfaction, query handling, conflict resolution, and brand loyalty.', icon: Coffee },
    { title: 'Shift Supervision', desc: 'Managing teams during peak rush hours, motivating crews, and shift handovers.', icon: Clock },
    { title: 'Inventory & Store Management', desc: 'Cold chain monitoring, FIFO rotation, stock audits, and wastage control.', icon: Layers },
    { title: 'Restaurant Management', desc: 'P&L basics, daily sales reports, staff scheduling, and KPI tracking.', icon: Building2 },
    { title: 'Sales & Business Development', desc: 'Suggestive upselling, local store marketing, and combo promotions.', icon: TrendingUp },
    { title: 'QSR Franchise Operations', desc: 'Understanding multi-unit scaling, FOFO/FOCO SOP compliance, and audit standards.', icon: Award },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-24 md:pb-32">
        {/* Decorative Grid and Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>India's Premier QSR Training Academy</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.15]">
                Build. Train. Grow.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 block mt-1">
                  Lead the Next Generation of QSR Professionals.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Empowering India's booming Quick Service Restaurant industry with job-ready talent, practical commercial kitchen training, and lucrative franchise business opportunities.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/courses"
                  className="px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group text-center"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/franchise"
                  className="px-6 sm:px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-amber-500/50 shadow-sm transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Store className="w-4 h-4 text-amber-400" />
                  <span>Become a Franchise Partner (₹4L)</span>
                </Link>
              </div>

              {/* Hero Badges */}
              <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-slate-800/80 text-left">
                <div className="flex items-center gap-2.5 p-2 sm:p-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm">2 Months</div>
                    <div className="text-slate-400 text-[11px] sm:text-xs">Fast-Track</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 sm:p-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm">100% Practical</div>
                    <div className="text-slate-400 text-[11px] sm:text-xs">Kitchen Setup</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 sm:p-0 col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm">₹4 Lakhs</div>
                    <div className="text-slate-400 text-[11px] sm:text-xs">Franchise Model</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-5 sm:p-6 md:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Admissions Open Now
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                    SCO-35 Zirakpur Campus
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      Flagship Certification
                    </span>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug">
                      Certificate in Quick Service Restaurant Operations
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Learn the operations, master global hygiene standards, and step into leading food retail chains Day One.
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span><strong>Eligibility:</strong> 10th pass and above</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span><strong>Course Fee:</strong> ₹20,000/- (All Inclusive)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span><strong>Journey:</strong> Learn → Train → Perform → Grow → Lead</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    <Link
                      to="/admission"
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-center text-xs tracking-wide shadow-md transition-colors"
                    >
                      Enrol for Certification
                    </Link>
                    <Link
                      to="/courses/certificate-in-quick-service-restaurant-operations"
                      className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center text-xs tracking-wide border border-slate-600 transition-colors"
                    >
                      View Syllabus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PARTNER BRANDS MARQUEE */}
      <BrandMarquee />

      {/* 3. ABOUT US SNAPSHOT */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                About QSR Academy
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                Bridging the Critical Manpower Gap in India's Rapidly Expanding QSR Industry
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  India's Quick Service Restaurant (QSR) industry is growing exceptionally fast, creating tremendous opportunities for individuals looking to build a successful career in the food and hospitality sector.
                </p>
                <p>
                  However, the industry faces a major challenge — a significant shortage of skilled and professionally trained manpower. Despite the rapid growth of the QSR sector, there are very few specialised training institutes focused specifically on Quick Service Restaurant Management and Operations.
                </p>
                <p>
                  Recognising this gap, a group of experienced professionals from the QSR industry came together with a common vision — to establish a dedicated Quick Service Restaurant Training Academy that provides practical, industry-focused training to aspiring professionals.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-sm group"
                >
                  <span>Read our full story and vision</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Feature Boxes */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                  Practical Kitchen Training
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real hands-on food assembly, fryers, griddles, espresso equipment, and hygiene SOP compliance.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                  Day One Job Readiness
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Save restaurant brands time and onboarding costs with graduates trained to contribute immediately.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                  Structured Career Path
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  From outlet staff to shift supervisor, store manager, and franchise operations leadership.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                  Industry Alliances
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Direct hiring pipeline with top national burger, pizza, café, dessert, and roll franchise chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLAGSHIP COURSE CARD HIGHLIGHT */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              Industry Certification
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900">
              Certificate in Quick Service Restaurant Operations
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600">
              A practical, career-oriented certification programme designed to develop job-ready professionals for the rapidly growing Quick Service Restaurant (QSR) industry.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-6 sm:p-8 md:p-12 space-y-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    Flagship Course
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    2 Months Duration • 10 Modules • Hands-on Lab
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-slate-900">
                  What You Will Gain
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Learn the Operations
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Hands-on mastery of restaurant kitchens, equipment operation, and speed of service.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Master the Standards
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Strict adherence to hygiene, FSSAI regulations, FIFO stock control, and food safety.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Build Professional Skills
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      POS billing proficiency, guest interaction, conflict handling, and suggestive upselling.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Prepare for Your Career
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Shift coordination, wastage minimization, team leadership, and Day One productivity.
                    </p>
                  </div>
                </div>

                {/* The 5-Step Journey (Responsive Grid) */}
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Your Professional Growth Pathway:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center text-xs font-bold">
                    {['Learn', 'Train', 'Perform', 'Grow', 'Lead'].map((step, i) => (
                      <div
                        key={step}
                        className="py-2.5 px-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        <div className="text-[10px] text-amber-600 mb-0.5">0{i + 1}</div>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Summary Column */}
              <div className="lg:col-span-4 bg-slate-900 text-white p-6 sm:p-8 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
                <div className="space-y-5 sm:space-y-6">
                  <div className="border-b border-slate-800 pb-3 sm:pb-4">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Course Duration</span>
                    <div className="text-xl sm:text-2xl font-bold font-heading text-white mt-0.5">2 Months</div>
                  </div>

                  <div className="border-b border-slate-800 pb-3 sm:pb-4">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Minimum Eligibility</span>
                    <div className="text-base sm:text-lg font-semibold text-white mt-0.5">10th pass and above</div>
                  </div>

                  <div className="border-b border-slate-800 pb-3 sm:pb-4">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Certification Fee</span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400 mt-0.5">
                      ₹20,000/-
                    </div>
                    <span className="text-[11px] text-slate-400">All-inclusive of practical kitchen lab sessions</span>
                  </div>
                </div>

                <div className="pt-6 sm:pt-8 space-y-2.5">
                  <Link
                    to="/admission"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/courses/certificate-in-quick-service-restaurant-operations"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-center text-xs border border-slate-700 block transition-colors"
                  >
                    Explore Complete Syllabus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FRANCHISE OPPORTUNITY HIGHLIGHT BANNER */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                Franchise Partner in Training
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Investment Starts From <span className="text-amber-400">₹4 Lakhs</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                We are building a nationwide network of professional QSR training centres to bridge the gap between industry demand and skilled manpower. Limited franchise opportunities available for selected locations across India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Setup Cost:</span>
                  <span className="font-heading font-bold text-white text-base">₹3 Lakhs</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Franchise Fee:</span>
                  <span className="font-heading font-bold text-white text-base">₹1 Lakh</span>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40">
                  <span className="text-[11px] text-amber-300 block">Total Initial:</span>
                  <span className="font-heading font-bold text-amber-400 text-base">₹4 Lakhs</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/franchise"
                  className="px-6 sm:px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Store className="w-4 h-4" />
                  <span>Enquire Now | Become a Partner</span>
                </Link>
                <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Models: FOFO & FOCO Available</span>
                </div>
              </div>
            </div>

            {/* Franchise Specification Preview */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 md:p-8 space-y-4 backdrop-blur">
              <h3 className="font-heading font-bold text-white text-base sm:text-lg border-b border-slate-800 pb-3">
                Space & Facility Requirement
              </h3>
              <p className="text-xs text-slate-300">
                Minimum <strong>500 Sq. Ft. Carpet Area</strong> accommodating:
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Professional Training Classroom</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Small Practical Kitchen Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Student Learning & Demonstration Area</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Basic Office & Reception Area</span>
                </li>
              </ul>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-400 font-medium">
                Full academic curriculum, trainer SOPs, launch assistance & marketing provided by Academy.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAREER OPPORTUNITIES ICON GRID */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              Career Horizons
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900">
              Where Can Your QSR Academy Certification Take You?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              The QSR industry in India offers rapid promotions and high career mobility for trained professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {careerPaths.map((career, idx) => {
              const Icon = career.icon;
              return (
                <div
                  key={career.title}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-400/60 shadow-xs hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                    Track 0{idx + 1}
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1.5 sm:mb-2">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {career.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SAMPLE TESTIMONIALS */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              Real Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900">
              What Our Students & Partners Say
            </h2>
            <p className="text-xs text-slate-500 italic">
              (Sample reviews from our training cohorts and corporate brand managers)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "The practical kitchen lab and POS training gave me the exact skills needed on the job. Within one week of completing my 2-month certification, I was hired as a shift supervisor."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <h4 className="font-heading font-bold text-slate-900 text-sm">Gurpreet Singh</h4>
                <p className="text-[11px] text-slate-500">Graduated Candidate • Placed at Café Chain</p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Finding trained manpower who understand hygiene, FSSAI protocols, and customer speed was our biggest pain point. QSR Academy candidates are productive from Day One."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <h4 className="font-heading font-bold text-slate-900 text-sm">Ankush Narang</h4>
                <p className="text-[11px] text-slate-500">Operations Head • Regional Food Brand</p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "The ₹4 Lakhs franchise model is clear and well-structured. The academy provides complete SOPs, course materials, and student placement assistance."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <h4 className="font-heading font-bold text-slate-900 text-sm">Sunil Mehta</h4>
                <p className="text-[11px] text-slate-500">Franchise Centre Partner • Punjab Region</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CALL TO ACTION */}
      <section className="py-12 sm:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading">
            Ready to Start Your Career or Launch Your Academy Centre?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Speak to our academic counsellors or franchise expansion directors today. Visit our campus at SCO-35 Zirakpur or submit an enquiry online.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              to="/admission"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-all text-center"
            >
              Enrol for Admission
            </Link>
            <Link
              to="/contact"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all text-center"
            >
              Contact Campus (SCO-35)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Toast from '../components/Toast';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  Send,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

export default function Admission() {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    courseInterested: '',
    courseName: preselectedCourse || 'Certificate in Quick Service Restaurant Operations',
    qualification: '12th Pass',
    message: '',
    _trap_hp: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await api.getCourses();
        if (res.success && res.data.length > 0) {
          setCourses(res.data);
          // If preselected course matches by title or slug
          if (preselectedCourse) {
            const found = res.data.find(
              (c) => c.title.toLowerCase() === preselectedCourse.toLowerCase() || c.slug === preselectedCourse
            );
            if (found) {
              setFormData((prev) => ({
                ...prev,
                courseInterested: found._id,
                courseName: found.title,
              }));
            }
          } else {
            setFormData((prev) => ({
              ...prev,
              courseInterested: res.data[0]._id,
              courseName: res.data[0].title,
            }));
          }
        }
      } catch (err) {
        console.error('Error loading courses:', err);
      }
    }
    loadCourses();
  }, [preselectedCourse]);

  const qualificationOptions = [
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Graduate (Any Stream)',
    'Hotel Management / Hospitality Graduate',
    'Post Graduate',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'courseSelect') {
      const selected = courses.find((c) => c._id === value);
      setFormData({
        ...formData,
        courseInterested: value,
        courseName: selected ? selected.title : '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await api.submitAdmission(formData);
      if (res.success) {
        setToast({
          type: 'success',
          message: res.message || 'Application submitted successfully! Our admissions counsellor will contact you shortly.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          courseInterested: courses[0]?._id || '',
          courseName: courses[0]?.title || 'Certificate in Quick Service Restaurant Operations',
          qualification: '12th Pass',
          message: '',
          _trap_hp: '',
        });
      } else {
        setToast({ type: 'error', message: res.message || 'Submission failed' });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.message || 'An error occurred while submitting your application. Please verify your details.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-10 sm:py-14 md:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Enrollment</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Apply for Admission
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto mt-3">
            Take the first step toward a thriving career in India's leading restaurant and hospitality chains.
          </p>
        </div>
      </section>

      {/* Form Section with Campus Info */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 md:p-10 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mb-1.5 sm:mb-2">
                Student Admission Form
              </h2>
              <p className="text-xs text-slate-500 mb-6 sm:mb-8">
                Please provide accurate contact information so our admissions team can schedule your counselling call.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="_trap_hp"
                  value={formData._trap_hp}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Phone Number (10 Digits) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Your City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {/* Highest Qualification */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Highest Qualification *
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      {qualificationOptions.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Course Interested In */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Course Interested In *
                  </label>
                  <select
                    name="courseSelect"
                    value={formData.courseInterested}
                    onChange={handleChange}
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title} ({c.duration} - {c.fee})
                      </option>
                    ))}
                    {courses.length === 0 && (
                      <option value="">Certificate in Quick Service Restaurant Operations (2 Months)</option>
                    )}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Questions or Special Inquiries (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your questions or preferred batch timing (optional)..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 min-h-[52px] rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Submit Admission Application</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 sm:space-y-5 border border-slate-800 shadow-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Why Choose QSR Academy</span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                  Learn Directly from Industry Practitioners
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Practical Exposure:</strong> Practice live in demonstration kitchens with commercial fast-food equipment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>FSSAI & Hygiene Mastery:</strong> Become certified in critical food safety, HACCP protocols, and stock management.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Placement Support:</strong> Direct interview opportunities with partner cafés, burger chains, and dessert brands.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Affordable Fee:</strong> Complete 2-month certification at ₹20,000/- with flexible batch timings.</span>
                  </li>
                </ul>
              </div>

              {/* Campus Contact Box */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-heading font-bold text-slate-900 text-base">
                  Admissions Office & Campus
                </h4>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <address className="not-italic leading-relaxed">
                      SCO-35, Ground Floor, Opp. VIP Road, High Street Market, Near IDBI Bank, Zirakpur, Punjab 140603, India
                    </address>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <a href="tel:+919876543210" className="hover:text-amber-600 font-semibold">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <a href="mailto:academyqsr@gmail.com" className="hover:text-amber-600 font-medium">
                      academyqsr@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

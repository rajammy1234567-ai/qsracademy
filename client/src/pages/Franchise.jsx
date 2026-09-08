import React, { useState } from 'react';
import { api } from '../services/api';
import Toast from '../components/Toast';
import BrandMarquee from '../components/BrandMarquee';
import {
  Store,
  Building2,
  CheckCircle2,
  DollarSign,
  Send,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Layout,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function Franchise() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    occupation: 'Entrepreneur',
    preferredModel: 'FOFO',
    investmentReadiness: 'Ready to invest now',
    message: '',
    _trap_hp: '', // honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const occupationOptions = [
    'Entrepreneur',
    'QSR Professional',
    'Food Industry Professional',
    'Education Entrepreneur',
    'Hospitality Professional',
    'Investor',
    'Other',
  ];

  const modelOptions = ['FOFO', 'FOCO', 'Not Sure'];

  const readinessOptions = [
    'Ready to invest now',
    'Exploring',
    'Just enquiring',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await api.submitFranchise(formData);
      if (res.success) {
        setToast({
          type: 'success',
          message: res.message || 'Franchise enquiry submitted successfully! Our expansion team will contact you shortly.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          occupation: 'Entrepreneur',
          preferredModel: 'FOFO',
          investmentReadiness: 'Ready to invest now',
          message: '',
          _trap_hp: '',
        });
      } else {
        setToast({ type: 'error', message: res.message || 'Submission failed' });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.message || 'An error occurred while submitting your enquiry. Please check your network and inputs.',
      });
    } finally {
      setLoading(false);
    }
  };

  const partnerBenefits = [
    'Established QSR training concept',
    'Professional course curriculum',
    'Industry-oriented practical training',
    'Training methodology & academic framework',
    'Trainer guidance & support',
    'Standard Operating Procedures (SOPs)',
    'Academic learning materials',
    'Centre launch assistance',
    'Branding & marketing support',
    'Operational guidance',
    'Ongoing franchise support',
    'Industry-focused training ecosystem',
  ];

  const whoCanApplyList = [
    'Entrepreneurs',
    'QSR Professionals',
    'Food Industry Professionals',
    'Education Entrepreneurs',
    'Hospitality Professionals',
    'Investors',
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nationwide Training Expansion</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Build. Train. Grow.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 block">
              Lead the Next Generation of QSR Professionals.
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal">
            India's QSR industry is expanding rapidly, creating growing demand for trained, job-ready professionals. We are building a nationwide network of professional QSR training centres to bridge the gap between industry demand and skilled manpower.
          </p>
        </div>
      </section>

      {/* Investment Breakdown: ₹4 LAKH OPPORTUNITY */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Transparent Financial Model
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
              ₹4 LAKH OPPORTUNITY
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Low capital expenditure with high ROI in India's booming food service vocational education market.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-8 gap-2">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                    Training Centre Setup Cost
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Classroom setup, demonstration counters, and basic practical kitchen facilities.
                  </p>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900">
                  ₹3 Lakhs
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-8 gap-2">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                    Franchise Fee
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Brand usage, comprehensive curriculum, trainer manuals, and launch support.
                  </p>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900">
                  ₹1 Lakh
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-8 gap-2 bg-amber-500/10 border-t-2 border-amber-500">
                <div>
                  <h3 className="font-heading font-extrabold text-slate-950 text-base sm:text-xl">
                    Total Initial Investment
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    *Investment may vary depending on location, interiors, equipment, infrastructure and local requirements.
                  </p>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-600">
                  ₹4 Lakhs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Models: FOFO vs FOCO */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Flexible Business Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Choose the operational structure that matches your entrepreneurial goals and bandwidth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* FOFO */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-3 sm:space-y-4 relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs sm:text-sm">
                FOFO
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                Franchise Owned • Franchise Operated
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Partner owns and operates the centre; company provides brand, curriculum, SOPs, academic support, trainer guidance, marketing support, and operational systems.
              </p>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-xs font-semibold text-amber-900">
                Ideal for entrepreneurs who want to actively run and scale their education business.
              </div>
            </div>

            {/* FOCO */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-3 sm:space-y-4 relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs sm:text-sm">
                FOCO
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                Franchise Owned • Company Operated
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Partner invests and owns the facility; academy's professional team manages day-to-day operations, trainer deployments, and academics.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800">
                Ideal for investors who prefer a professionally managed, hands-off business model.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Space & Partner Deliverables Grid */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Space Requirement */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Infrastructure
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mt-1">
                  Space Required: Minimum 500 Sq. Ft.
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 sm:mt-2">
                  Carpet area accommodating complete training and demonstration facilities:
                </p>
              </div>

              <div className="space-y-2.5 sm:space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Professional Training Classroom for Theory & Lectures</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Small Practical Kitchen Setup (Griddle, Fryer, Workstation)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Student Learning & Demonstration Area</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Basic Office & Reception Area</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Training & Practical Demonstration Facilities</span>
                </div>
              </div>

              {/* Who Can Apply */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="font-heading font-bold text-slate-900 text-sm mb-2.5">
                  Who Can Apply?
                </h4>
                <div className="flex flex-wrap gap-2">
                  {whoCanApplyList.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What Franchise Partners Get */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Comprehensive Support
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mt-1">
                  What Franchise Partners Get
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 sm:mt-2">
                  Complete end-to-end framework and operational guidance to ensure centre profitability:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {partnerBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Enquiry Form Section */}
      <section className="py-14 sm:py-20 bg-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              Take the First Step
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white">
              Franchise Partner Application
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Fill out this confidential enquiry. Our franchise expansion team will reach out within 24 hours with the detailed prospectus.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-slate-950/80 rounded-3xl border border-slate-800 p-5 sm:p-8 md:p-12 shadow-2xl backdrop-blur space-y-5 sm:space-y-6"
          >
            {/* Honeypot trap */}
            <input
              type="text"
              name="_trap_hp"
              value={formData._trap_hp}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Phone Number (10 Digits) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  City / Preferred Location *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city / preferred location"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Occupation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Occupation / Professional Background *
                </label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {occupationOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Model */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Preferred Business Model *
                </label>
                <select
                  name="preferredModel"
                  value={formData.preferredModel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {modelOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900">
                      {opt === 'FOFO'
                        ? 'FOFO (Franchise Owned • Franchise Operated)'
                        : opt === 'FOCO'
                        ? 'FOCO (Franchise Owned • Company Operated)'
                        : 'Not Sure (Need Advice)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Investment Readiness */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">
                  Investment Readiness (₹4 Lakhs) *
                </label>
                <select
                  name="investmentReadiness"
                  value={formData.investmentReadiness}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {readinessOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">
                  Additional Details / Proposed Location / Space Available
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter additional details, proposed space or location..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enquire Now | Become a Franchise Partner</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <BrandMarquee />
    </div>
  );
}

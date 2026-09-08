import React, { useState } from 'react';
import { api } from '../services/api';
import Toast from '../components/Toast';
import BrandMarquee from '../components/BrandMarquee';
import {
  Users,
  Building2,
  CheckCircle2,
  Send,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function HireTalent() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    staffRequired: 5,
    rolesRequired: ['Outlet Staff'],
    message: '',
    _trap_hp: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const availableRoles = [
    'Outlet Staff',
    'Kitchen Staff',
    'Shift Supervisor',
    'Restaurant Manager',
    'Front-of-House',
    'Cashier & POS Operator',
    'Store & Inventory Keeper',
    'Other',
  ];

  const handleRoleToggle = (role) => {
    setFormData((prev) => {
      const exists = prev.rolesRequired.includes(role);
      const updated = exists
        ? prev.rolesRequired.filter((r) => r !== role)
        : [...prev.rolesRequired, role];
      return { ...prev, rolesRequired: updated };
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rolesRequired.length === 0) {
      setToast({ type: 'error', message: 'Please select at least one role required.' });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const res = await api.submitHiring(formData);
      if (res.success) {
        setToast({
          type: 'success',
          message: res.message || 'Manpower enquiry submitted successfully! Our placement cell will contact you shortly.',
        });
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          city: '',
          staffRequired: 5,
          rolesRequired: ['Outlet Staff'],
          message: '',
          _trap_hp: '',
        });
      } else {
        setToast({ type: 'error', message: res.message || 'Submission failed' });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.message || 'Error submitting hiring request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-10 sm:py-16 md:py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Corporate Talent Solutions</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Hire Trained QSR Manpower
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mt-3 sm:mt-4 font-normal">
            Eliminate high turnover, reduce induction time, and recruit certified professionals groomed specifically for Quick Service Restaurant operations.
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-8 sm:py-12 md:py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />
              <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                Zero Onboarding Lag
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Candidates arrive equipped with commercial kitchen discipline, HACCP hygiene, and speed-of-service standards.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />
              <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                POS & Floor Mastery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proficient in modern touch-billing systems, cash control, guest etiquette, and suggestive upselling.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 sm:col-span-2 md:col-span-1">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />
              <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                Turnkey Batch Requisitions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hire complete store opening crews (from kitchen staff to shift supervisors) tailored to your brand's menu format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 md:p-12 shadow-xl space-y-6 sm:space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-3xl font-heading font-bold text-slate-900">
                Corporate Manpower Requisition Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Submit your hiring requirement below. Our placement director will review and schedule candidate interviews.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Honeypot */}
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
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company / brand name"
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Enter contact person name & designation"
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter official email address"
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Store Location / City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter store location or city"
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Staff Required */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Number of Staff Positions *
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="staffRequired"
                    required
                    value={formData.staffRequired}
                    onChange={handleChange}
                    placeholder="Enter number of staff positions"
                    className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Roles Multi-select Badges */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Roles Required (Select all that apply) *
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {availableRoles.map((role) => {
                    const isSelected = formData.rolesRequired.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => handleRoleToggle(role)}
                        className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-amber-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Outlet Concept / Specific Requirements / Shift Timings
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter outlet opening date, salary range, or specific requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
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
                    <span>Submitting Requisition...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Manpower Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <BrandMarquee />
    </div>
  );
}

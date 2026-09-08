import React, { useState } from 'react';
import { api } from '../services/api';
import Toast from '../components/Toast';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  Building,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    _trap_hp: '', // Honeypot trap
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setToast({
          type: 'success',
          message: res.message || 'Thank you for reaching out! We will respond shortly.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          _trap_hp: '',
        });
      } else {
        setToast({ type: 'error', message: res.message || 'Submission failed' });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.message || 'Error submitting message. Please check your details.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 sm:py-16 md:py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Building className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Contact QSR ACADEMY
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mt-3 sm:mt-4 font-normal">
            Visit our training campus at SCO-35 Zirakpur, call our counselling lines, or drop us a query online.
          </p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
            {/* Campus Info & Direct Details */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Official Academy Campus
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mt-1">
                    QSR ACADEMY
                  </h3>
                </div>

                <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <address className="not-italic leading-relaxed">
                      SCO-35, Ground Floor, Opp. VIP Road,<br />
                      High Street Market, Near IDBI Bank,<br />
                      Zirakpur, Punjab 140603, India
                    </address>
                  </div>

                  <div className="flex items-center gap-3 pt-1 sm:pt-2">
                    <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <a href="tel:+919876543210" className="hover:text-amber-600 font-semibold">
                      +91 98765 43210
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <a href="mailto:academyqsr@gmail.com" className="hover:text-amber-600 font-medium">
                      academyqsr@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Mon - Sat: 9:30 AM – 6:30 PM IST</span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <strong>Landmark note:</strong> Located in High Street Market directly opposite VIP Road, right beside IDBI Bank on the Ground Floor.
                </div>
              </div>

              {/* Department Contact Directory */}
              <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl space-y-3 sm:space-y-4">
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  Direct Contact Emails
                </h4>
                <div className="space-y-2.5 sm:space-y-3 text-xs">
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 border-b border-slate-800 gap-1">
                    <span className="text-slate-400">Student Admissions:</span>
                    <a href="mailto:academyqsr@gmail.com" className="text-amber-400 hover:underline">
                      academyqsr@gmail.com
                    </a>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 border-b border-slate-800 gap-1">
                    <span className="text-slate-400">Franchise Inquiries:</span>
                    <a href="mailto:academyqsr@gmail.com" className="text-amber-400 hover:underline">
                      academyqsr@gmail.com
                    </a>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 gap-1">
                    <span className="text-slate-400">Placement & Hiring:</span>
                    <a href="mailto:academyqsr@gmail.com" className="text-amber-400 hover:underline">
                      academyqsr@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* General Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 md:p-10 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mb-1.5 sm:mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mb-5 sm:mb-6">
                Have a general query, media inquiry, or need assistance? Drop your details below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

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
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter query subject"
                      className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message here..."
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
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Embedded Google Map Section */}
          <div className="mt-10 sm:mt-14 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-md">
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                  Visit the Campus in Person
                </h3>
                <p className="text-xs text-slate-500">
                  SCO-35, Ground Floor, Opp. VIP Road, High Street Market, Near IDBI Bank, Zirakpur
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=SCO-35+High+Street+Market+Zirakpur+Punjab"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="w-full h-64 sm:h-80 md:h-96">
              <iframe
                title="QSR Academy Zirakpur Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.259972322527!2d76.81846467623912!3d30.64069798979313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb418f773663%3A0x89ad09559e2b17f5!2sHigh%20Street%20Market%20Zirakpur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

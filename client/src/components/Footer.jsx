import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Sparkles,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Official Legal Entity */}
          <div className="space-y-4">
            <Logo variant="dark" size="lg" />
            <p className="text-xs text-amber-400/90 font-medium">
              Build. Train. Grow. Lead the Next Generation of QSR Professionals.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier training academy dedicated to Quick Service Restaurant management, practical kitchen operations, and operational leadership.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-slate-200 font-semibold block mb-0.5">Registered Certification:</span>
              QSR Academy (Certificate in Quick Service Restaurant Operations)
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Academic Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/courses/certificate-in-quick-service-restaurant-operations"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Flagship QSR Certification (2 Mos)</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-400 transition-colors">
                  All Specialized Courses
                </Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-amber-400 transition-colors">
                  Student Admissions & Eligibility
                </Link>
              </li>
              <li>
                <Link to="/hire-talent" className="hover:text-amber-400 transition-colors">
                  Hire Trained Manpower (For Brands)
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-amber-400 transition-colors">
                  Partner Brand Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Franchise & Opportunities */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Franchise Opportunities
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Partner with India's fastest-growing QSR vocational training network. Start your academy centre from ₹4 Lakhs.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-slate-300 font-medium">Initial Investment:</span>
                <span className="text-amber-400 font-bold">₹4 Lakhs</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-slate-300 font-medium">Models:</span>
                <span className="text-slate-200">FOFO & FOCO</span>
              </div>
            </div>
            <Link
              to="/franchise"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Download Franchise Prospectus</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Col 4: Campus Contact & Address */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Academy Campus
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  <strong className="text-white block font-semibold">QSR ACADEMY</strong>
                  SCO-35, Ground Floor, Opp. VIP Road,<br />
                  High Street Market, Near IDBI Bank,<br />
                  Zirakpur, Punjab 140603, India
                </address>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-amber-400 transition-colors">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="mailto:academyqsr@gmail.com" className="hover:text-amber-400 transition-colors">
                  academyqsr@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2">
              <div className="text-[11px] text-slate-400 font-medium mb-2">Connect with us:</div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {currentYear} QSR Academy. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              About
            </Link>
            <Link to="/courses" className="hover:text-slate-300 transition-colors">
              Curriculum
            </Link>
            <Link to="/franchise" className="hover:text-slate-300 transition-colors">
              Franchise
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Campus Location
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

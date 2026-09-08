import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  GraduationCap,
  Store,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Franchise (₹4L)', path: '/franchise', highlight: true },
    { label: 'Admission', path: '/admission' },
    { label: 'Hire Talent', path: '/hire-talent' },
    { label: 'Partners', path: '/partners' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Quick-Contact Bar (Fully Responsive) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          {/* Left contact links */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-slate-700 hidden xs:inline">|</span>
            <a
              href="mailto:academyqsr@gmail.com"
              className="hidden xs:inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors truncate"
            >
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 flex-shrink-0" />
              <span className="truncate">academyqsr@gmail.com</span>
            </a>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="truncate">SCO-35, High Street Market, Zirakpur</span>
            </span>
          </div>

          {/* Right badge / quick link */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden lg:inline text-[11px] text-amber-400/90 font-medium">
              ★ Admissions Open for Next QSR Batch
            </span>
            <Link
              to="/franchise"
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded hover:bg-amber-400 transition-colors"
            >
              <Store className="w-3 h-3" />
              <span>Franchise (₹4L)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-amber-600 bg-amber-50/80 font-bold'
                      : link.highlight
                      ? 'text-amber-700 font-bold hover:text-amber-800 hover:bg-amber-50/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-sm hover:shadow transition-all group"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Apply Now</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[100px] sm:top-[116px] z-50 lg:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-3 shadow-2xl overflow-y-auto max-h-[85vh] animate-fade-in">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-amber-600 bg-amber-50 font-bold'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </NavLink>
              ))}
            </div>

            {/* Mobile Action CTAs */}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <Link
                to="/admission"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-sm active:scale-[0.99] transition-transform"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Apply for Admission</span>
              </Link>
              <Link
                to="/franchise"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm active:scale-[0.99] transition-transform"
              >
                <Store className="w-4 h-4" />
                <span>Explore Franchise (₹4 Lakhs)</span>
              </Link>
            </div>

            {/* Direct Mobile Quick Call */}
            <div className="pt-2 text-center">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-600 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Need urgent help? Call +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

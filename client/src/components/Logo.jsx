import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'default', size = 'md', className = '' }) {
  const isDark = variant === 'dark';

  const sizeStyles = {
    sm: {
      svgClass: 'w-7 h-7 sm:w-8 sm:h-8',
      text: 'text-base sm:text-lg',
      sub: 'text-[8px] sm:text-[9px]',
    },
    md: {
      svgClass: 'w-8 h-8 sm:w-10 sm:h-10',
      text: 'text-lg sm:text-xl md:text-2xl',
      sub: 'text-[9px] sm:text-[10px] md:text-xs',
    },
    lg: {
      svgClass: 'w-10 h-10 sm:w-12 sm:h-12',
      text: 'text-xl sm:text-2xl md:text-3xl',
      sub: 'text-[10px] sm:text-xs md:text-sm',
    },
  }[size] || {
    svgClass: 'w-8 h-8 sm:w-10 sm:h-10',
    text: 'text-lg sm:text-xl',
    sub: 'text-[9px] sm:text-xs',
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-2 sm:gap-3 group select-none ${className}`}>
      {/* Precision Scalable SVG Icon */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeStyles.svgClass} transition-transform duration-300 group-hover:scale-105 drop-shadow-sm flex-shrink-0`}
      >
        <defs>
          <linearGradient id="logoNavyGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F2747" />
            <stop offset="1" stopColor="#0A192F" />
          </linearGradient>
          <linearGradient id="logoGoldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Outer shield / tray hexagon backdrop */}
        <rect x="6" y="6" width="88" height="88" rx="20" fill="url(#logoNavyGrad)" />
        <rect x="6" y="6" width="88" height="88" rx="20" stroke="#F59E0B" strokeWidth="2.5" strokeOpacity="0.4" />

        {/* Stylized Chef Hat / Cloche Tray Base */}
        <path
          d="M26 64 H74 C75.5 64 76 66 74.5 67 L68 73 C66.5 74.5 64.5 75.5 62.5 75.5 H37.5 C35.5 75.5 33.5 74.5 32 73 L25.5 67 C24 66 24.5 64 26 64 Z"
          fill="url(#logoGoldGrad)"
        />

        {/* Chef Hat Puffs / Rising Operations Crest */}
        <circle cx="37" cy="46" r="11" fill="#FBBF24" />
        <circle cx="63" cy="46" r="11" fill="#FBBF24" />
        <circle cx="50" cy="38" r="13" fill="#F59E0B" />
        <rect x="35" y="44" width="30" height="18" fill="#F59E0B" rx="3" />

        {/* Growth Arrow / QSR Spark inside */}
        <path
          d="M50 22 L55 31 H45 Z"
          fill="#FFFFFF"
        />
        <circle cx="50" cy="51" r="3" fill="#0A192F" />
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span
            className={`font-heading font-extrabold tracking-tight ${sizeStyles.text} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            QSR <span className="text-amber-500">ACADEMY</span>
          </span>
        </div>
        <span
          className={`font-semibold tracking-widest uppercase mt-0.5 ${sizeStyles.sub} ${
            isDark ? 'text-amber-400/90' : 'text-slate-600'
          }`}
        >
          Operations & Excellence
        </span>
      </div>
    </Link>
  );
}

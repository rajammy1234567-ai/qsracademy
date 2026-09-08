import React from 'react';
import { Link } from 'react-router-dom';
import BrandMarquee from '../components/BrandMarquee';
import {
  Target,
  Award,
  Users,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function About() {
  const whyPoints = [
    'Restaurant Operations',
    'Food Preparation',
    'Kitchen Management',
    'Food Safety & Hygiene',
    'Customer Service',
    'Inventory Management',
    'Cost Control',
    'Team Management',
    'Outlet Operations',
    'QSR Business Practices',
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Profile & Purpose</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            About QSR ACADEMY
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed font-normal">
            India's dedicated vocational training academy committed to transforming food service operations through structured, practical education.
          </p>
        </div>
      </section>

      {/* Main About Story */}
      <section className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base md:text-lg">
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-amber-50/60 border border-amber-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mb-3 sm:mb-4">
              Our Founding Story
            </h2>
            <p className="mb-3 sm:mb-4">
              India's Quick Service Restaurant (QSR) industry is growing exceptionally fast, creating tremendous opportunities for individuals looking to build a successful career in the food and hospitality sector.
            </p>
            <p className="mb-3 sm:mb-4">
              However, the industry faces a major challenge — <strong>a significant shortage of skilled and professionally trained manpower</strong>. Despite the rapid growth of the QSR sector, there are very few specialised training institutes focused specifically on Quick Service Restaurant Management and Operations.
            </p>
            <p>
              Recognising this gap, a group of experienced professionals from the QSR industry came together with a common vision — to establish a dedicated Quick Service Restaurant Training Academy that provides practical, industry-focused training to aspiring professionals.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Our Core Mission & Objectives
            </h3>
            <p>
              Our objective is not only to train and groom candidates, but also to help them understand the career opportunities, growth potential, and long-term future available within the QSR industry. At the same time, we aim to support QSR companies by providing them with trained, skilled, and job-ready manpower who can contribute effectively from Day One.
            </p>
            <p>
              By reducing the need for extensive initial training, our academy can help businesses save time, reduce training costs, improve operational efficiency, and build stronger teams.
            </p>
          </div>

          {/* Vision Callout */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span>Our Vision</span>
            </div>
            <blockquote className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-amber-300 leading-snug">
              “To become a leading specialised training academy for the QSR industry and create a skilled workforce that drives excellence, efficiency, and sustainable growth.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Why QSR Training */}
      <section className="py-10 sm:py-16 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              Industry Imperative
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-900">
              Why Specialized QSR Training?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600">
              The QSR industry is growing but trained, industry-ready manpower remains a major challenge. Restaurants urgently need professionals skilled in these critical domains:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {whyPoints.map((point, index) => (
              <div
                key={point}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-[11px] sm:text-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  0{index + 1}
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                  {point}
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all group active:scale-[0.99]"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Explore How We Train Candidates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Marquee */}
      <BrandMarquee />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  GraduationCap,
  Clock,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award,
  ChevronRight,
  UserCheck,
  Building,
} from 'lucide-react';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await api.getCourseBySlug(slug);
        if (res.success && res.data) {
          setCourse(res.data);
        } else {
          setError('Course details not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load course details');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-heading font-bold text-slate-900">
          Course Not Found
        </h2>
        <p className="text-sm text-slate-600">{error || 'The requested course could not be located.'}</p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold"
        >
          <span>Return to All Courses</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <Link to="/courses" className="hover:text-white">Courses</Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="text-amber-400 font-medium truncate max-w-[200px] sm:max-w-none">{course.title}</span>
          </div>

          <div className="max-w-4xl space-y-3 sm:space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider inline-block">
              {course.badge || 'Professional Certification'}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
              {course.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Sidebar */}
      <section className="py-10 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Detailed Content */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-12">
              {/* 1. Programme Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
                  <span>Programme Overview</span>
                </h2>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-base">
                  {course.overview}
                </p>

                {/* Responsive Journey */}
                {course.journey && course.journey.length > 0 && (
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                      Development Pathway
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center text-xs font-bold">
                      {course.journey.map((step, i) => (
                        <div key={step} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                          <div className="text-[10px] text-amber-600">Step {i + 1}</div>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Structured Curriculum Modules */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-5 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
                    <span>Curriculum & Module Syllabus</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Structured hands-on instruction covering back-of-house, front-of-house, and store leadership.
                  </p>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {course.curriculum && course.curriculum.length > 0 ? (
                    course.curriculum.map((mod, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 hover:border-amber-400 transition-colors"
                      >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-900 text-amber-400 font-bold text-[11px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {mod}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">Curriculum details available upon request.</p>
                  )}
                </div>
              </div>

              {/* 3. Learning Outcomes */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
                    <span>What You Will Gain</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                    {course.learningOutcomes.map((item, idx) => (
                      <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                            {item}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Career Opportunities */}
              {course.careerOpportunities && course.careerOpportunities.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
                    <span>Career Opportunities</span>
                  </h2>
                  <p className="text-xs text-slate-600">
                    Graduates of this programme qualify for diverse frontline and supervisory roles across regional & global food chains:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                    {course.careerOpportunities.map((op, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>{op}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar Details & Admission CTA */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-5 sm:space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Total Course Fee
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1">
                      {course.fee}
                    </div>
                    <span className="text-[11px] text-slate-500">All practical kit and certificate included</span>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Duration:</span>
                      <span className="text-slate-900 font-bold">{course.duration}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Eligibility:</span>
                      <span className="text-slate-900 font-bold">{course.eligibility}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Training Mode:</span>
                      <span className="text-slate-900 font-bold">Practical Lab & Classroom</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Location:</span>
                      <span className="text-slate-900 font-bold">SCO-35, Zirakpur Campus</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2.5 sm:space-y-3">
                    <Link
                      to={`/admission?course=${encodeURIComponent(course.title)}`}
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Apply for Admission</span>
                    </Link>

                    <a
                      href="tel:+919876543210"
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-center text-xs tracking-wide block transition-colors"
                    >
                      Call Admissions Helpline
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

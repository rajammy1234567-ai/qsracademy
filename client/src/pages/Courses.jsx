import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  IndianRupee,
} from 'lucide-react';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await api.getCourses();
        if (res.success && res.data.length > 0) {
          setCourses(res.data);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Programs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Industry-Focused QSR Courses
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed font-normal">
            Master the operations, food safety standards, and customer service techniques demanded by India's leading restaurant chains.
          </p>
        </div>
      </section>

      {/* Course List from DB */}
      <section className="py-10 sm:py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl sm:rounded-3xl border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No courses listed at this moment</h3>
              <p className="text-xs text-slate-500 mt-1">Please check back soon or contact admissions.</p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col lg:flex-row"
                >
                  <div className="p-5 sm:p-8 md:p-10 flex-1 space-y-4 sm:space-y-5">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 font-bold text-xs uppercase tracking-wider">
                        {course.badge || 'Certified Programme'}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {course.duration} • Practical Labs Included
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-slate-900 leading-snug">
                      {course.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {course.overview}
                    </p>

                    {/* Key takeaways */}
                    {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Core Competencies You Will Build:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {course.learningOutcomes.slice(0, 4).map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Journey steps */}
                    {course.journey && course.journey.length > 0 && (
                      <div className="pt-2 flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs">
                        <span className="font-semibold text-slate-500">Milestones:</span>
                        {course.journey.map((step) => (
                          <span
                            key={step}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] sm:text-xs"
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Action Box */}
                  <div className="bg-slate-900 text-white p-6 sm:p-8 md:p-10 lg:w-80 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-slate-400 block uppercase tracking-wider">Course Fee</span>
                        <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400 mt-0.5">
                          {course.fee}
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-3">
                        <span className="text-xs text-slate-400 block uppercase tracking-wider">Eligibility</span>
                        <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                          {course.eligibility}
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-3">
                        <span className="text-xs text-slate-400 block uppercase tracking-wider">Duration</span>
                        <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                          {course.duration}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 space-y-2.5">
                      <Link
                        to={`/courses/${course.slug}`}
                        className="w-full py-3.5 min-h-[46px] rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-center text-xs tracking-wide shadow-md transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
                      >
                        <span>View Curriculum</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/admission"
                        className="w-full py-3.5 min-h-[46px] rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-center text-xs tracking-wide border border-slate-700 flex items-center justify-center transition-colors active:scale-[0.99]"
                      >
                        Apply for Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

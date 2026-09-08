import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Logo from '../../components/Logo';
import Toast from '../../components/Toast';
import {
  Users,
  Store,
  Briefcase,
  Mail,
  GraduationCap,
  Settings,
  LogOut,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  FileText,
  X,
  Save,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, admissions, franchise, hiring, contacts, courses, settings
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [toast, setToast] = useState(null);

  // Table Data & Pagination State
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loadingTable, setLoadingTable] = useState(false);

  // Notes Modal State
  const [activeLeadForNotes, setActiveLeadForNotes] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Course Modal State
  const [coursesList, setCoursesList] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    slug: '',
    duration: '2 Months',
    eligibility: '10th pass and above',
    fee: '₹20,000/-',
    badge: 'Certification',
    overview: '',
    curriculum: '',
    learningOutcomes: '',
    careerOpportunities: '',
    isActive: true,
  });

  // Settings State
  const [settingsData, setSettingsData] = useState({
    phone: '',
    email: '',
    address: '',
    socialLinks: { facebook: '', instagram: '', youtube: '', linkedin: '' },
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // Protect Route
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  // Load Dashboard Stats
  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const res = await api.getStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  // Load Active Tab Data
  const loadTabData = async () => {
    if (!user) return;
    setLoadingTable(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        status: statusFilter,
      };

      let res;
      if (activeTab === 'admissions') {
        res = await api.getAdmissions(params);
      } else if (activeTab === 'franchise') {
        res = await api.getFranchise(params);
      } else if (activeTab === 'hiring') {
        res = await api.getHiring(params);
      } else if (activeTab === 'contacts') {
        res = await api.getContacts(params);
      } else if (activeTab === 'courses') {
        res = await api.getAdminCourses();
        if (res.success) {
          setCoursesList(res.data);
        }
        setLoadingTable(false);
        return;
      } else if (activeTab === 'settings') {
        res = await api.getSettings();
        if (res.success) {
          setSettingsData(res.data);
        }
        setLoadingTable(false);
        return;
      }

      if (res && res.success) {
        setTableData(res.items || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Error loading records' });
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'overview') {
      loadTabData();
    }
  }, [activeTab, pagination.page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadTabData();
  };

  // Status Updater
  const handleStatusChange = async (id, newStatus) => {
    try {
      if (activeTab === 'admissions') {
        await api.updateAdmission(id, { status: newStatus });
      } else if (activeTab === 'franchise') {
        await api.updateFranchise(id, { status: newStatus });
      } else if (activeTab === 'hiring') {
        await api.updateHiring(id, { status: newStatus });
      } else if (activeTab === 'contacts') {
        await api.updateContact(id, { status: newStatus });
      }

      setToast({ type: 'success', message: `Lead status updated to "${newStatus}"` });
      loadTabData();
      loadStats();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to update status' });
    }
  };

  // Delete Record
  const handleDeleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this entry?')) return;

    try {
      if (activeTab === 'admissions') await api.deleteAdmission(id);
      else if (activeTab === 'franchise') await api.deleteFranchise(id);
      else if (activeTab === 'hiring') await api.deleteHiring(id);
      else if (activeTab === 'contacts') await api.deleteContact(id);

      setToast({ type: 'success', message: 'Record deleted successfully' });
      loadTabData();
      loadStats();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Delete failed' });
    }
  };

  // Save Notes
  const handleSaveNotes = async () => {
    if (!activeLeadForNotes) return;
    try {
      const id = activeLeadForNotes._id;
      if (activeTab === 'admissions') await api.updateAdmission(id, { notes: noteText });
      else if (activeTab === 'franchise') await api.updateFranchise(id, { notes: noteText });
      else if (activeTab === 'hiring') await api.updateHiring(id, { notes: noteText });
      else if (activeTab === 'contacts') await api.updateContact(id, { notes: noteText });

      setToast({ type: 'success', message: 'Internal notes saved' });
      setActiveLeadForNotes(null);
      loadTabData();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to save notes' });
    }
  };

  // Course Management Handlers
  const handleOpenCourseModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setCourseFormData({
        title: course.title,
        slug: course.slug,
        duration: course.duration,
        eligibility: course.eligibility,
        fee: course.fee,
        badge: course.badge || 'Certification',
        overview: course.overview,
        curriculum: (course.curriculum || []).join('\n'),
        learningOutcomes: (course.learningOutcomes || []).join('\n'),
        careerOpportunities: (course.careerOpportunities || []).join('\n'),
        isActive: course.isActive,
      });
    } else {
      setEditingCourse(null);
      setCourseFormData({
        title: '',
        slug: '',
        duration: '2 Months',
        eligibility: '10th pass and above',
        fee: '₹20,000/-',
        badge: 'Certification',
        overview: '',
        curriculum: '',
        learningOutcomes: '',
        careerOpportunities: '',
        isActive: true,
      });
    }
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...courseFormData,
        curriculum: courseFormData.curriculum.split('\n').filter(Boolean),
        learningOutcomes: courseFormData.learningOutcomes.split('\n').filter(Boolean),
        careerOpportunities: courseFormData.careerOpportunities.split('\n').filter(Boolean),
      };

      if (editingCourse) {
        await api.updateCourse(editingCourse._id, payload);
        setToast({ type: 'success', message: 'Course updated successfully' });
      } else {
        await api.createCourse(payload);
        setToast({ type: 'success', message: 'New course created successfully' });
      }

      setIsCourseModalOpen(false);
      loadTabData();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Error saving course' });
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course from the public catalog?')) return;
    try {
      await api.deleteCourse(id);
      setToast({ type: 'success', message: 'Course removed' });
      loadTabData();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Delete failed' });
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      await api.updateSettings(settingsData);
      setToast({ type: 'success', message: 'Site settings updated live across the website' });
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to update settings' });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const statusColors = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    converted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Admin Navbar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="dark" size="sm" />
            <span className="hidden md:inline px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs uppercase font-bold">
              Console v1.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{user.name}</div>
              <div className="text-[10px] text-slate-400">{user.email}</div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 py-1.5 border-t border-slate-800/80 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'admissions', label: 'Admissions', icon: GraduationCap, count: stats?.summary?.admissions?.total },
            { id: 'franchise', label: 'Franchise Enquiries', icon: Store, count: stats?.summary?.franchise?.total },
            { id: 'hiring', label: 'Hiring Enquiries', icon: Briefcase, count: stats?.summary?.hiring?.total },
            { id: 'contacts', label: 'Contact Messages', icon: Mail, count: stats?.summary?.contact?.total },
            { id: 'courses', label: 'Course CMS', icon: FileText },
            { id: 'settings', label: 'Site Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm('');
                  setStatusFilter('all');
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- 1. OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading font-extrabold text-slate-900">
                  Dashboard Executive Overview
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time pipeline performance and intake inquiries.
                </p>
              </div>
              <button
                onClick={loadStats}
                disabled={loadingStats}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingStats ? 'animate-spin text-amber-500' : ''}`} />
                <span>Refresh Metrics</span>
              </button>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Admissions */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      (stats?.summary?.admissions?.growth || 0) >= 0
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {(stats?.summary?.admissions?.growth || 0) >= 0 ? '+' : ''}
                    {stats?.summary?.admissions?.growth || 0}% vs last week
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Total Student Admissions</span>
                  <div className="text-3xl font-extrabold font-heading text-slate-900 mt-0.5">
                    {stats?.summary?.admissions?.total || 0}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 flex justify-between">
                  <span>This week: <strong>{stats?.summary?.admissions?.thisWeek || 0}</strong></span>
                  <button onClick={() => setActiveTab('admissions')} className="text-amber-600 hover:underline">
                    View list →
                  </button>
                </div>
              </div>

              {/* Franchise */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      (stats?.summary?.franchise?.growth || 0) >= 0
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {(stats?.summary?.franchise?.growth || 0) >= 0 ? '+' : ''}
                    {stats?.summary?.franchise?.growth || 0}%
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Franchise (₹4L) Leads</span>
                  <div className="text-3xl font-extrabold font-heading text-slate-900 mt-0.5">
                    {stats?.summary?.franchise?.total || 0}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 flex justify-between">
                  <span>This week: <strong>{stats?.summary?.franchise?.thisWeek || 0}</strong></span>
                  <button onClick={() => setActiveTab('franchise')} className="text-amber-600 hover:underline">
                    View list →
                  </button>
                </div>
              </div>

              {/* Hiring */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Corporate
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Manpower Requisitions</span>
                  <div className="text-3xl font-extrabold font-heading text-slate-900 mt-0.5">
                    {stats?.summary?.hiring?.total || 0}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 flex justify-between">
                  <span>This week: <strong>{stats?.summary?.hiring?.thisWeek || 0}</strong></span>
                  <button onClick={() => setActiveTab('hiring')} className="text-amber-600 hover:underline">
                    View list →
                  </button>
                </div>
              </div>

              {/* Contacts */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Messages
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">General Contact Enquiries</span>
                  <div className="text-3xl font-extrabold font-heading text-slate-900 mt-0.5">
                    {stats?.summary?.contact?.total || 0}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 flex justify-between">
                  <span>This week: <strong>{stats?.summary?.contact?.thisWeek || 0}</strong></span>
                  <button onClick={() => setActiveTab('contacts')} className="text-amber-600 hover:underline">
                    View list →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Leads */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-heading font-bold text-slate-900">
                  Recent Admission Submissions
                </h3>
                <button
                  onClick={() => setActiveTab('admissions')}
                  className="text-xs text-amber-600 font-bold hover:underline"
                >
                  View All Admissions →
                </button>
              </div>

              {stats?.recentAdmissions && stats.recentAdmissions.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {stats.recentAdmissions.map((lead) => (
                    <div key={lead._id} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{lead.fullName}</span>
                        <span className="text-slate-400 ml-2">({lead.city})</span>
                        <div className="text-slate-500 text-[11px]">{lead.email} • {lead.phone}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                        <span className="text-slate-400 text-[11px] hidden sm:inline">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500 py-4">No recent admissions found.</div>
              )}
            </div>
          </div>
        )}

        {/* --- 2, 3, 4, 5. LEAD DATA TABLES (Admissions, Franchise, Hiring, Contacts) --- */}
        {['admissions', 'franchise', 'hiring', 'contacts'].includes(activeTab) && (
          <div className="space-y-6">
            {/* Header with Search, Filter & CSV Export */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 capitalize">
                  {activeTab === 'admissions' && 'Student Admissions'}
                  {activeTab === 'franchise' && 'Franchise Partner Enquiries'}
                  {activeTab === 'hiring' && 'Corporate Manpower Requisitions'}
                  {activeTab === 'contacts' && 'General Contact Queries'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {pagination.total} total submissions recorded in database.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:flex-initial">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, email, phone..."
                    className="pl-9 pr-3 py-2.5 min-h-[42px] rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-800 focus:outline-none focus:border-amber-500 w-full sm:w-60"
                  />
                </form>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPagination((p) => ({ ...p, page: 1 }));
                  }}
                  className="px-3 py-2.5 min-h-[42px] rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="rejected">Rejected</option>
                </select>

                {/* CSV Export Button */}
                <a
                  href={api.getExportUrl(activeTab)}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-4 py-2.5 min-h-[42px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export CSV</span>
                </a>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[780px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-4 px-5">Lead / Contact</th>
                      <th className="py-4 px-4">Contact Details</th>
                      {activeTab === 'admissions' && <th className="py-4 px-4">Course & Qualification</th>}
                      {activeTab === 'franchise' && <th className="py-4 px-4">Model & Readiness</th>}
                      {activeTab === 'hiring' && <th className="py-4 px-4">Roles & Staff Required</th>}
                      {activeTab === 'contacts' && <th className="py-4 px-4">Subject & Message</th>}
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4">Notes</th>
                      <th className="py-4 px-4">Date</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingTable ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500 mb-2" />
                          <div>Loading records...</div>
                        </td>
                      </tr>
                    ) : tableData.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No matching records found.
                        </td>
                      </tr>
                    ) : (
                      tableData.map((row) => (
                        <tr key={row._id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Col 1: Name / Company */}
                          <td className="py-4 px-5">
                            <div className="font-bold text-slate-900">
                              {row.fullName || row.name || row.companyName}
                            </div>
                            {row.contactPerson && (
                              <div className="text-[11px] text-slate-500">
                                Contact: {row.contactPerson}
                              </div>
                            )}
                            <div className="text-[11px] text-slate-400">
                              📍 {row.city || 'Not specified'}
                            </div>
                          </td>

                          {/* Col 2: Email & Phone */}
                          <td className="py-4 px-4 space-y-0.5">
                            <div className="text-slate-800 font-medium">{row.phone}</div>
                            <div className="text-[11px] text-slate-500">{row.email}</div>
                          </td>

                          {/* Col 3: Context Specific */}
                          {activeTab === 'admissions' && (
                            <td className="py-4 px-4">
                              <div className="font-medium text-slate-900">{row.courseName}</div>
                              <div className="text-[11px] text-slate-500">Edu: {row.qualification}</div>
                            </td>
                          )}

                          {activeTab === 'franchise' && (
                            <td className="py-4 px-4">
                              <div className="font-bold text-amber-600">Model: {row.preferredModel}</div>
                              <div className="text-[11px] text-slate-600">{row.investmentReadiness}</div>
                              <div className="text-[10px] text-slate-400">Prof: {row.occupation}</div>
                            </td>
                          )}

                          {activeTab === 'hiring' && (
                            <td className="py-4 px-4">
                              <div className="font-bold text-slate-900">{row.staffRequired} Positions</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {(row.rolesRequired || []).map((r, i) => (
                                  <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </td>
                          )}

                          {activeTab === 'contacts' && (
                            <td className="py-4 px-4 max-w-xs">
                              <div className="font-semibold text-slate-900">{row.subject}</div>
                              <div className="text-[11px] text-slate-500 truncate">{row.message}</div>
                            </td>
                          )}

                          {/* Col 4: Status Selector */}
                          <td className="py-4 px-4">
                            <select
                              value={row.status}
                              onChange={(e) => handleStatusChange(row._id, e.target.value)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border focus:outline-none ${statusColors[row.status] || 'bg-slate-100'}`}
                            >
                              <option value="new">NEW</option>
                              <option value="contacted">CONTACTED</option>
                              <option value="converted">CONVERTED</option>
                              <option value="rejected">REJECTED</option>
                            </select>
                          </td>

                          {/* Col 5: Notes Button */}
                          <td className="py-4 px-4">
                            <button
                              onClick={() => {
                                setActiveLeadForNotes(row);
                                setNoteText(row.notes || '');
                              }}
                              className={`px-2 py-1 rounded-md text-[11px] border font-medium transition-colors ${
                                row.notes
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              {row.notes ? 'View Note' : '+ Note'}
                            </button>
                          </td>

                          {/* Col 6: Date */}
                          <td className="py-4 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                            {new Date(row.createdAt).toLocaleDateString('en-IN')}
                          </td>

                          {/* Col 7: Actions */}
                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteRecord(row._id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>
                  Page {pagination.page} of {pagination.pages} ({pagination.total} total leads)
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 6. COURSE MANAGEMENT CMS TAB --- */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                  Course Management System
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dynamically create, update, or archive academic courses on the public website.
                </p>
              </div>

              <button
                onClick={() => handleOpenCourseModal()}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coursesList.map((c) => (
                <div key={c._id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase">
                        {c.badge || 'Course'}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Archived'}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-slate-900">
                      {c.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {c.overview}
                    </p>

                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Fee:</span>
                        <strong className="text-slate-900">{c.fee}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Duration:</span>
                        <strong className="text-slate-900">{c.duration}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Modules:</span>
                        <strong className="text-slate-900">{c.curriculum?.length || 0}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`/courses/${c.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Public URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCourseModal(c)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(c._id)}
                        className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 7. SITE SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                Site Contact & Social Media Settings
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update the public phone number, official address, and social links without changing any code.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Campus Phone</label>
                  <input
                    type="text"
                    value={settingsData.phone || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Official Email</label>
                  <input
                    type="email"
                    value={settingsData.email || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Campus Address</label>
                <textarea
                  rows={2}
                  value={settingsData.address || ''}
                  onChange={(e) => setSettingsData({ ...settingsData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-xs text-slate-900">Social Media Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['facebook', 'instagram', 'youtube', 'linkedin'].map((net) => (
                    <div key={net} className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600 capitalize">{net} URL</label>
                      <input
                        type="text"
                        value={settingsData.socialLinks?.[net] || ''}
                        onChange={(e) =>
                          setSettingsData({
                            ...settingsData,
                            socialLinks: { ...settingsData.socialLinks, [net]: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-xs flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* --- MODAL: INTERNAL NOTES & DETAILS --- */}
      {activeLeadForNotes && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-600">Lead Interaction Note</span>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
                  {activeLeadForNotes.fullName || activeLeadForNotes.name || activeLeadForNotes.companyName}
                </h3>
              </div>
              <button
                onClick={() => setActiveLeadForNotes(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeLeadForNotes.message && (
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <span className="font-semibold block text-[11px] text-slate-500 mb-1">Customer Message:</span>
                "{activeLeadForNotes.message}"
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Internal Team Notes</label>
              <textarea
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter counseling updates, call remarks, or meeting results..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveLeadForNotes(null)}
                className="px-4 py-2.5 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: COURSE CMS ADD / EDIT --- */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl border border-slate-200 my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
                  {editingCourse ? 'Edit Academic Course' : 'Create New Academic Course'}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in syllabus and eligibility. Changes immediately publish to the public courses directory.
                </p>
              </div>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.title}
                    onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Badge Label</label>
                  <input
                    type="text"
                    value={courseFormData.badge}
                    onChange={(e) => setCourseFormData({ ...courseFormData, badge: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Duration *</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.duration}
                    onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Fee *</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.fee}
                    onChange={(e) => setCourseFormData({ ...courseFormData, fee: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Eligibility *</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.eligibility}
                    onChange={(e) => setCourseFormData({ ...courseFormData, eligibility: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Overview Description *</label>
                <textarea
                  rows={3}
                  required
                  value={courseFormData.overview}
                  onChange={(e) => setCourseFormData({ ...courseFormData, overview: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Curriculum Modules (1 per line)</label>
                <textarea
                  rows={4}
                  value={courseFormData.curriculum}
                  onChange={(e) => setCourseFormData({ ...courseFormData, curriculum: e.target.value })}
                  placeholder="Enter curriculum modules (1 per line)..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Learning Outcomes (1 per line)</label>
                <textarea
                  rows={3}
                  value={courseFormData.learningOutcomes}
                  onChange={(e) => setCourseFormData({ ...courseFormData, learningOutcomes: e.target.value })}
                  placeholder="Enter key learning outcomes (1 per line)..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Career Opportunities (1 per line)</label>
                <textarea
                  rows={3}
                  value={courseFormData.careerOpportunities}
                  onChange={(e) => setCourseFormData({ ...courseFormData, careerOpportunities: e.target.value })}
                  placeholder="Enter job roles & career opportunities (1 per line)..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveCourse"
                  checked={courseFormData.isActive}
                  onChange={(e) => setCourseFormData({ ...courseFormData, isActive: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <label htmlFor="isActiveCourse" className="text-slate-700 font-medium">
                  Course is active and publicly visible
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

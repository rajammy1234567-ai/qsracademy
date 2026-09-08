const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  let token = null;
  try {
    token = typeof window !== 'undefined' ? sessionStorage.getItem('qsr_admin_token') : null;
  } catch {
    // Ignore storage errors in restricted iframes
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include', // Ensures httpOnly JWT cookies are transmitted
    ...options,
  };

  // If body is object, stringify
  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
  }
}

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '64224096-cb27-45db-a2f0-7529eef24d6e';

/**
 * Direct browser-to-email dispatcher using Web3Forms.
 * Delivers lead notification immediately from client browser to academyqsr@gmail.com
 * bypassing all cloud data center IP blocks and preflight restrictions.
 */
async function dispatchBrowserNotification(category, data) {
  // Silent discard if spam bot honeypot is triggered
  if (data && data._trap_hp) return;
  if (!WEB3FORMS_ACCESS_KEY) return;

  try {
    const fd = new FormData();
    fd.append('access_key', WEB3FORMS_ACCESS_KEY);
    fd.append('from_name', `QSR ACADEMY (${category})`);

    if (category === 'Student Admission') {
      fd.append('subject', `[QSR ACADEMY] 🎓 Admission: ${data.fullName || 'New Student'}`);
      fd.append('name', data.fullName || '');
      fd.append('email', data.email || '');
      fd.append('replyto', data.email || '');
      fd.append('Category', 'Student Admission Application');
      fd.append('Student Name', data.fullName || '');
      fd.append('Phone Number', data.phone || '');
      fd.append('Email Address', data.email || '');
      fd.append('City', data.city || '');
      fd.append('Course Interested', data.courseName || data.courseInterested || 'QSR Operations');
      fd.append('Highest Qualification', data.qualification || 'Not specified');
      if (data.message) fd.append('Message / Questions', data.message);
    } else if (category === 'Franchise Partner') {
      fd.append('subject', `[QSR ACADEMY] 🏢 Franchise Lead: ${data.fullName || 'New Lead'}`);
      fd.append('name', data.fullName || '');
      fd.append('email', data.email || '');
      fd.append('replyto', data.email || '');
      fd.append('Category', 'Franchise Partner Lead');
      fd.append('Investor Name', data.fullName || '');
      fd.append('Phone Number', data.phone || '');
      fd.append('Email Address', data.email || '');
      fd.append('Target City', data.city || '');
      fd.append('Preferred Model', data.preferredModel || 'QSR Express Model (₹4 Lakhs)');
      fd.append('Investment Readiness', data.investmentReadiness || 'Ready to invest');
      fd.append('Current Occupation', data.occupation || 'Entrepreneur');
      if (data.message) fd.append('Message / Experience', data.message);
    } else if (category === 'Corporate Talent') {
      fd.append('subject', `[QSR ACADEMY] 🤝 Manpower Request: ${data.companyName || 'Corporate Client'}`);
      fd.append('name', data.contactPerson || data.companyName || '');
      fd.append('email', data.email || '');
      fd.append('replyto', data.email || '');
      fd.append('Category', 'Corporate Hiring Request');
      fd.append('Company / Brand', data.companyName || '');
      fd.append('Contact Person', data.contactPerson || '');
      fd.append('Phone Number', data.phone || '');
      fd.append('Official Email', data.email || '');
      fd.append('Store City', data.city || '');
      fd.append('Staff Count Required', `${data.staffRequired || 1} candidates`);
      if (data.rolesRequired) {
        fd.append('Roles Required', Array.isArray(data.rolesRequired) ? data.rolesRequired.join(', ') : data.rolesRequired);
      }
      if (data.message) fd.append('Specific Needs', data.message);
    } else if (category === 'Contact Query') {
      fd.append('subject', `[QSR ACADEMY] ✉️ Contact Message: ${data.name || 'Website Visitor'}`);
      fd.append('name', data.name || '');
      fd.append('email', data.email || '');
      fd.append('replyto', data.email || '');
      fd.append('Category', 'General Contact Query');
      fd.append('Sender Name', data.name || '');
      fd.append('Email Address', data.email || '');
      fd.append('Phone Number', data.phone || 'Not provided');
      fd.append('Subject', data.subject || 'Website Query');
      fd.append('Message', data.message || '');
    }

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: fd,
    });
  } catch (clientErr) {
    console.warn('[Web3Forms Direct Browser Dispatch Warning]:', clientErr);
  }
}

export const api = {
  // Public Courses
  getCourses: () => request('/courses'),
  getCourseBySlug: (slug) => request(`/courses/${slug}`),

  // Public Enquiries (Dual dispatch: DB Storage + Direct Browser Email Notification)
  submitAdmission: (data) => {
    dispatchBrowserNotification('Student Admission', data);
    return request('/enquiries/admission', { method: 'POST', body: data });
  },
  submitFranchise: (data) => {
    dispatchBrowserNotification('Franchise Partner', data);
    return request('/enquiries/franchise', { method: 'POST', body: data });
  },
  submitHiring: (data) => {
    dispatchBrowserNotification('Corporate Talent', data);
    return request('/enquiries/hiring', { method: 'POST', body: data });
  },
  submitContact: (data) => {
    dispatchBrowserNotification('Contact Query', data);
    return request('/enquiries/contact', { method: 'POST', body: data });
  },

  // Site Settings
  getSettings: () => request('/settings'),

  // Admin Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  getMe: () => request('/auth/me'),
  logout: () => request('/auth/logout', { method: 'POST' }),

  // Admin Operations
  getStats: () => request('/admin/stats'),
  
  getAdmissions: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/admissions${query ? `?${query}` : ''}`);
  },
  updateAdmission: (id, data) => request(`/admin/admissions/${id}`, { method: 'PATCH', body: data }),
  deleteAdmission: (id) => request(`/admin/admissions/${id}`, { method: 'DELETE' }),

  getFranchise: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/franchise${query ? `?${query}` : ''}`);
  },
  updateFranchise: (id, data) => request(`/admin/franchise/${id}`, { method: 'PATCH', body: data }),
  deleteFranchise: (id) => request(`/admin/franchise/${id}`, { method: 'DELETE' }),

  getHiring: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/hiring${query ? `?${query}` : ''}`);
  },
  updateHiring: (id, data) => request(`/admin/hiring/${id}`, { method: 'PATCH', body: data }),
  deleteHiring: (id) => request(`/admin/hiring/${id}`, { method: 'DELETE' }),

  getContacts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/contacts${query ? `?${query}` : ''}`);
  },
  updateContact: (id, data) => request(`/admin/contacts/${id}`, { method: 'PATCH', body: data }),
  deleteContact: (id) => request(`/admin/contacts/${id}`, { method: 'DELETE' }),

  getExportUrl: (type) => `${API_BASE}/admin/export/${type}`,

  // Course Management
  getAdminCourses: () => request('/admin/courses'),
  createCourse: (data) => request('/admin/courses', { method: 'POST', body: data }),
  updateCourse: (id, data) => request(`/admin/courses/${id}`, { method: 'PUT', body: data }),
  deleteCourse: (id) => request(`/admin/courses/${id}`, { method: 'DELETE' }),

  // Settings
  updateSettings: (data) => request('/admin/settings', { method: 'PUT', body: data }),
};

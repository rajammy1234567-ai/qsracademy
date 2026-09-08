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

export const api = {
  // Public Courses
  getCourses: () => request('/courses'),
  getCourseBySlug: (slug) => request(`/courses/${slug}`),

  // Public Enquiries
  submitAdmission: (data) => request('/enquiries/admission', { method: 'POST', body: data }),
  submitFranchise: (data) => request('/enquiries/franchise', { method: 'POST', body: data }),
  submitHiring: (data) => request('/enquiries/hiring', { method: 'POST', body: data }),
  submitContact: (data) => request('/enquiries/contact', { method: 'POST', body: data }),

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

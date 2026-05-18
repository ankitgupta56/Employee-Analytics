import api from './api';

// Auth endpoints
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Employee endpoints
export const employeeService = {
  addEmployee: (employeeData) => api.post('/employees', employeeData),
  getAllEmployees: () => api.get('/employees'),
  searchEmployees: (params) => api.get('/employees/search', { params }),
  getEmployee: (id) => api.get(`/employees/${id}`),
  updateEmployee: (id, data) => api.put(`/employees/${id}`, data),
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
  getStats: () => api.get('/employees/stats/summary'),
};

// AI endpoints
export const aiService = {
  getRecommendation: (employeeId) =>
    api.post('/ai/recommend', { employeeId }),
  getBatchRecommendations: (employeeIds) =>
    api.post('/ai/recommend-batch', { employeeIds }),
};

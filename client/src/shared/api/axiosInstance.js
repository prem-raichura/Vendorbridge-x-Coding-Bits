import axios from 'axios';

const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const LEGACY_TOKEN_KEY = 'vendorbridge_token';
const LEGACY_ROLE_KEY = 'vendorbridge_role';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';

    if (error.response && error.response.status === 401 && !requestUrl.includes('/auth/login')) {
      // Clear local storage and redirect to login
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      localStorage.removeItem(LEGACY_ROLE_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

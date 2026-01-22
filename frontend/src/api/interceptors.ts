import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import apiClient from './axios.config';

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    console.log('Token:', token); // ← Añade esto
    console.log('Es FormData:', config.data instanceof FormData); // ← Y esto
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => {
    
    // Manage global errors
    if (error.response?.status === 401) {

      // Expired token
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      console.error('You do not have authorization');
    }
    
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
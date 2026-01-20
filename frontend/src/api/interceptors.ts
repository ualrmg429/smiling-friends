import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import apiClient from './axios.config';

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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
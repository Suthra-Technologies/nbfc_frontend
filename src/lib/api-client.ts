import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useTenantStore } from '@/store/tenantStore';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 30000; // 30 seconds

// Create Axios Instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const { token, currentBranch, isSuperAdmin } = useAuthStore.getState();

    // Add Authorization Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add Tenant Context (Subdomain) for multi-tenancy support
    const { subdomain, isBranch } = useTenantStore.getState();
    if (subdomain && isBranch) {
      config.headers['X-Tenant-Id'] = subdomain;
    }

    // Add Branch Context (ID)
    if (!isSuperAdmin() && currentBranch) {
      config.headers['X-Branch-Id'] = currentBranch.id;
    }

    // Allow explicit branch override in request config
    if (config.headers && config.headers['X-Branch-Id']) {
      // Keep the explicitly set branch ID
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const { refreshToken } = useAuthStore.getState();

        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { token: newToken } = response.data;

          // Update token in store
          useAuthStore.setState({ token: newToken });

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle "User not found" (Stale Token) - Force Logout
    const errorData = error.response?.data as any;
    if (errorData?.message === 'User not found or inactive') {
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 403 Forbidden (Insufficient Permissions)
    if (error.response?.status === 403) {
      console.error('Permission denied:', error.response.data);
      // You can show a toast notification here
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config?.url);
    }

    // Handle Network Errors
    if (!error.response) {
      console.error('Network error - server may be down');
      // You can show a toast notification here
    }

    return Promise.reject(error);
  }
);

// API Helper Methods
const unwrap = (res: AxiosResponse) => {
  if (res.data && typeof res.data === 'object' && 'success' in res.data && 'data' in res.data) {
    return res.data.data;
  }
  return res.data;
};

export const api = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get(url, config).then(unwrap);
  },

  // POST request
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post(url, data, config).then(unwrap);
  },

  // PUT request
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put(url, data, config).then(unwrap);
  },

  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch(url, data, config).then(unwrap);
  },

  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete(url, config).then(unwrap);
  },
};

export default apiClient;

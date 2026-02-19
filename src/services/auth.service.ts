import { api } from '@/lib/api-client';
import type { LoginCredentials, LoginResponse, User } from '@/types/auth.types';
export const authService = {
  /**
   * Login user with credentials
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/auth/login', credentials);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    return api.post('/auth/logout');
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    return api.post<{ token: string }>('/auth/refresh', { refreshToken });
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    return api.get<User>('/auth/profile');
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return api.patch<User>('/auth/profile', data);
  },

  /**
   * Change password
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    return api.post('/auth/change-password', { oldPassword, newPassword });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<void> => {
    return api.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string): Promise<void> => {
    return api.post('/auth/verify-email', { token });
  },
};

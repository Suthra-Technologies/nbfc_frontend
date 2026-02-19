import { api } from '@/lib/api-client';

export interface TenantResolution {
  name: string;
  logo?: string;
  subdomain: string;
}

export const tenantService = {
  /**
   * Resolve tenant (bank) from current subdomain
   */
  resolve: async (): Promise<TenantResolution | null> => {
    try {
      // The backend detects subdomain from the 'host' header automatically
      const response = await api.get<TenantResolution>('/banks/tenant-info');
      return response;
    } catch (error) {
      console.error('Tenant resolution failed:', error);
      return null;
    }
  },

  /**
   * Validate if a subdomain is available
   * @param subdomain - Proposed subdomain
   */
  checkAvailability: async (subdomain: string): Promise<boolean> => {
    try {
      // This might need a backend endpoint if not already existing
      // For now, keeping as is but pointing to possible bank utility
      const response = await api.get<{ available: boolean }>(
        `/banks/check-availability/${subdomain}`
      );
      return response.available;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get tenant branding/theme
   */
  getBranding: async (): Promise<any> => {
    try {
      return await api.get('/banks/tenant-info');
    } catch (error) {
      return null;
    }
  },
};

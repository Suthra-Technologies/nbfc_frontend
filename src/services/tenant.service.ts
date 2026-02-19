import { api } from '@/lib/api-client';
import type { Branch } from '@/types/auth.types';

export interface TenantResolution {
  branch: Branch;
  isActive: boolean;
  settings: any;
}
export const tenantService = {
  /**
   * Resolve tenant (branch) from subdomain
   * @param subdomain - Branch subdomain (e.g., 'vijayawada')
   */
  resolve: async (subdomain: string): Promise<TenantResolution | null> => {
    try {
      const response = await api.post<TenantResolution>('/tenant/resolve', {
        subdomain,
      });
      
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
      const response = await api.get<{ available: boolean }>(
        `/tenant/check-availability/${subdomain}`
      );
      return response.available;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get tenant branding/theme
   * @param subdomain - Branch subdomain
   */
  getBranding: async (subdomain: string): Promise<any> => {
    try {
      return await api.get(`/tenant/${subdomain}/branding`);
    } catch (error) {
      return null;
    }
  },
};

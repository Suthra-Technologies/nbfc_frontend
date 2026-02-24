import { api } from '@/lib/api-client';
import { useTenantStore } from '@/store/tenantStore';

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
    const { subdomain, isLocal } = useTenantStore.getState();
    
    try {
      if (!subdomain || subdomain === 'admin') {
        return null;
      }

      const response = await api.get<TenantResolution>('/banks/tenant-info', {
        headers: {
          'X-Tenant-Id': subdomain
        }
      });
      return response;
    } catch (error: any) {
      // For local development, always provide a fallback if a subdomain is present
      if (isLocal && subdomain && subdomain !== 'admin') {
        console.warn('Tenant Resolution failed - Using Local Development Fallback for:', subdomain);
        return {
          name: `${subdomain.replace(/-/g, ' ').toUpperCase()}`,
          subdomain: subdomain,
          logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png'
        };
      }

      if (error?.response?.status === 404 || !error.response) {
        return {
          name: subdomain ? `${subdomain.toUpperCase()} Bank` : 'Finware Central Bank',
          subdomain: subdomain || 'axis-bank',
          logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png'
        };
      }
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

import { useTenantStore } from '@/store/tenantStore';
import { tenantService } from '@/services/tenant.service';

/**
 * Custom hook for tenant/bank management
 */
export const useTenant = () => {
  const {
    bank,
    subdomain,
    isResolved,
    isResolving,
    error,
    isAdmin,
    isBranch,
    isLocal,
    setBank,
    setError,
    setResolving,
    setResolved,
    reset,
  } = useTenantStore();

  /**
   * Resolve tenant from subdomain
   */
  const resolveTenant = async (): Promise<void> => {
    if (isResolved || isResolving) {
      return;
    }

    // Skip resolution for super admin portal
    if (isAdmin) {
      setResolved(true);
      return;
    }

    try {
      setResolving(true);
      setError(null);

      const resolution = await tenantService.resolve();

      if (!resolution) {
        throw new Error('Bank not found for this subdomain');
      }

      setBank(resolution);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to resolve bank portal';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    // Bank Info
    bank,
    bankName: bank?.name,
    bankLogo: bank?.logo,
    subdomain,

    // Status
    isResolved,
    isResolving,
    error,

    // Type
    isAdmin,
    isBranch,
    isLocal,

    // Actions
    resolveTenant,
    setBank,
    setError,
    reset,

    // Utilities
    getBankDisplayName: () => {
      if (isAdmin) return 'Super Admin Portal';
      return bank ? bank.name : 'Loading...';
    },
  };
};

import { useTenantStore } from '@/store/tenantStore';
import { tenantService } from '@/services/tenant.service';
import type { Branch } from '@/types/auth.types';

/**
 * Custom hook for tenant/branch management
 */
export const useTenant = () => {
  const {
    branch,
    subdomain,
    isResolved,
    isResolving,
    error,
    isAdmin,
    isBranch,
    isLocal,
    setBranch,
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

    // Skip resolution for admin portal
    if (isAdmin) {
      setResolved(true);
      return;
    }

    try {
      setResolving(true);
      setError(null);

      const resolution = await tenantService.resolve(subdomain);

      if (!resolution) {
        throw new Error('Branch not found');
      }

      if (!resolution.isActive) {
        throw new Error('This branch is currently inactive. Please contact support.');
      }

      setBranch(resolution.branch);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to resolve branch';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    // Branch Info
    branch,
    branchId: branch?.id,
    branchName: branch?.name,
    branchCode: branch?.code,
    branchCity: branch?.address?.city,
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
    setBranch,
    setError,
    reset,

    // Utilities
    getBranchDisplayName: () => {
      if (isAdmin) return 'Super Admin Portal';
      return branch ? `${branch.name} Branch` : 'Loading...';
    },

    // Settings
    businessDate: branch?.settings?.businessDate,
    isDateLocked: branch?.settings?.isDateLocked || false,
    currency: branch?.settings?.currency || 'INR',
  };
};

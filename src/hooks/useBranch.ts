import { useAuthStore } from '@/store/authStore';
import type { Branch } from '@/types/auth.types';

/**
 * Custom hook for branch management and context
 */
export const useBranch = () => {
  const {
    currentBranch,
    branches,
    switchBranch,
    setCurrentBranch,
    setBranches,
    isSuperAdmin,
  } = useAuthStore();

  return {
    // Current Branch
    currentBranch,
    branchId: currentBranch?.id,
    branchName: currentBranch?.name,
    branchCode: currentBranch?.code,
    
    // All Branches
    branches,
    hasMult ipleBranches: branches.length > 1,
    branchCount: branches.length,
    
    // Actions
    switchBranch,
    setCurrentBranch,
    setBranches,
    
    // Utilities
    isSuperAdmin,
    canAccessMultipleBranches: () => isSuperAdmin() || branches.length > 1,
    
    // Get branch by ID
    getBranchById: (branchId: string): Branch | undefined => {
      return branches.find(b => b.id === branchId);
    },
    
    // Check if user has access to a specific branch
    hasAccessToBranch: (branchId: string): boolean => {
      return isSuperAdmin() || branches.some(b => b.id === branchId);
    },
    
    // Branch Settings
    businessDate: currentBranch?.settings?.businessDate,
    isDateLocked: currentBranch?.settings?.isDateLocked || false,
    currency: currentBranch?.settings?.currency || 'INR',
  };
};

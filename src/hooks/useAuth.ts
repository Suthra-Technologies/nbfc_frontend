import { useAuthStore } from '@/store/authStore';
import { Permission } from '@/constants/permissions';
import { UserRole } from '@/constants/roles';

/**
 * Custom hook for authentication and user management
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    permissions,
    setAuth,
    updateUser,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isSuperAdmin,
    isBranchAdmin,
  } = useAuthStore();

  return {
    // User State
    user,
    token,
    isAuthenticated,
    isLoading,
    permissions,
    
    // User Info
    userName: user ? `${user.firstName} ${user.lastName}` : '',
    userEmail: user?.email || '',
    userRole: user?.role || UserRole.STAFF,
    
    // Actions
    setAuth,
    updateUser,
    logout,
    
    // Permission Checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Role Checks
    isSuperAdmin,
    isBranchAdmin,
    isStaff: () => !isSuperAdmin() && !isBranchAdmin(),
    
    // Computed Properties
    canManageBranches: () => hasPermission(Permission.CREATE_BRANCH),
    canManageStaff: () => hasPermission(Permission.CREATE_STAFF),
    canApproveLoans: () => hasPermission(Permission.APPROVE_LOAN),
    canViewReports: () => hasAnyPermission([
      Permission.VIEW_BRANCH_REPORTS,
      Permission.VIEW_GLOBAL_REPORTS,
    ]),
  };
};

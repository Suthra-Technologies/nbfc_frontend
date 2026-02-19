import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState, Branch, LoginResponse } from '@/types/auth.types';
import { Permission } from '@/constants/permissions';
import { UserRole } from '@/constants/roles';

interface AuthStore extends AuthState {
  // User & Auth
  setAuth: (data: LoginResponse) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
  
  // Branch Management
  branches: Branch[];
  currentBranch: Branch | null;
  setBranches: (branches: Branch[]) => void;
  setCurrentBranch: (branch: Branch) => void;
  switchBranch: (branchId: string) => void;
  
  // Permissions
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  isSuperAdmin: () => boolean;
  isBranchAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      permissions: [],
      branches: [],
      currentBranch: null,

      // Set Authentication Data
      setAuth: (data: any) => {
        const { user, token, refreshToken, branches = [], permissions = [] } = data;
        
        // Decoding token to get role if not provided in user object
        let decodedRole = user?.role || 'USER';
        try {
          if (token && typeof token === 'string' && !user?.role) {
            const base64Url = token.split('.')[1];
            if (base64Url) {
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
              const payload = JSON.parse(jsonPayload);
              decodedRole = payload.role || 'USER';
            }
          }
        } catch (e) {
          console.error('Failed to decode token payload:', e);
        }

        // Ensure user object has expected fields for the UI
        const normalizedUser = {
          ...user,
          id: user?.id || user?.userId || user?._id || 'unknown',
          role: user?.role || decodedRole,
          firstName: user?.firstName || user?.name?.split(' ')[0] || 'User',
          lastName: user?.lastName || user?.name?.split(' ')[1] || '',
          isSuperAdmin: user?.isSuperAdmin || user?.role === UserRole.SUPER_ADMIN || decodedRole === UserRole.SUPER_ADMIN
        };

        // Set active branch
        let currentBranch: Branch | null = null;
        if (branches && branches.length > 0) {
          // If user has activeBranchId, use that
          if (normalizedUser.activeBranchId) {
            currentBranch = branches.find((b: Branch) => b.id === normalizedUser.activeBranchId) || branches[0];
          } else {
            currentBranch = branches[0];
          }
        }

        set({
          user: normalizedUser as User,
          token,
          refreshToken: refreshToken || null,
          isAuthenticated: true,
          permissions: permissions || [],
          branches: branches || [],
          currentBranch,
        });
      },

      // Update User
      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },

      // Logout
      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          permissions: [],
          branches: [],
          currentBranch: null,
        });
      },

      // Set Branches
      setBranches: (branches: Branch[]) => {
        set({ branches });
      },

      // Set Current Branch
      setCurrentBranch: (branch: Branch) => {
        set({ currentBranch: branch });
      },

      // Switch Branch
      switchBranch: (branchId: string) => {
        const { branches, user } = get();
        const branch = branches.find(b => b.id === branchId);
        
        if (branch) {
          set({ 
            currentBranch: branch,
            user: user ? { ...user, activeBranchId: branchId } : null,
          });
        }
      },

      // Check Permission
      hasPermission: (permission: Permission) => {
        const { permissions } = get();
        return permissions.includes(permission);
      },

      // Check Any Permission
      hasAnyPermission: (permissionsToCheck: Permission[]) => {
        const { permissions } = get();
        return permissionsToCheck.some(p => permissions.includes(p));
      },

      // Check All Permissions
      hasAllPermissions: (permissionsToCheck: Permission[]) => {
        const { permissions } = get();
        return permissionsToCheck.every(p => permissions.includes(p));
      },

      // Is Super Admin
      isSuperAdmin: () => {
        const { user } = get();
        return user?.role === UserRole.SUPER_ADMIN || user?.isSuperAdmin === true;
      },

      // Is Branch Admin
      isBranchAdmin: () => {
        const { user } = get();
        return user?.role === UserRole.BRANCH_ADMIN;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions,
        branches: state.branches,
        currentBranch: state.currentBranch,
      }),
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTenantFromHostname } from '@/utils/tenant.utils';

export interface Bank {
  name: string;
  logo?: string;
  subdomain: string;
}

export interface TenantState {
  // Current Bank/Tenant
  bank: Bank | null;
  subdomain: string;
  isResolved: boolean;
  isResolving: boolean;
  error: string | null;

  // Tenant Type
  isAdmin: boolean;
  isBranch: boolean;
  isLocal: boolean;

  // Actions
  setBank: (bank: Bank) => void;
  setError: (error: string | null) => void;
  setResolving: (isResolving: boolean) => void;
  setResolved: (isResolved: boolean) => void;
  reset: () => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set, get) => ({
      // Initial State
      bank: null,
      subdomain: '',
      isResolved: false,
      isResolving: false,
      error: null,
      isAdmin: false,
      isBranch: false,
      isLocal: false,

      // Set Bank
      setBank: (bank: Bank) => {
        set({
          bank,
          isResolved: true,
          isResolving: false,
          error: null,
        });
      },

      // Set Error
      setError: (error: string | null) => {
        set({
          error,
          isResolving: false,
          isResolved: error === null,
        });
      },

      // Set Resolving
      setResolving: (isResolving: boolean) => {
        set({ isResolving });
      },

      // Set Resolved
      setResolved: (isResolved: boolean) => {
        set({ isResolved });
      },

      // Reset
      reset: () => {
        set({
          bank: null,
          subdomain: '',
          isResolved: false,
          isResolving: false,
          error: null,
          isAdmin: false,
          isBranch: false,
          isLocal: false,
        });
      },
    }),
    {
      name: 'tenant-storage',
      partialize: (state) => ({
        bank: state.bank,
        subdomain: state.subdomain,
        isAdmin: state.isAdmin,
        isBranch: state.isBranch,
        isResolved: state.isResolved,
      }),
    }
  )
);

/**
 * Initialize tenant context on app load
 */
export const initializeTenant = () => {
  const { subdomain, isAdmin, isBranch, isLocal } = getTenantFromHostname();
  const currentState = useTenantStore.getState();

  // If subdomain has changed, reset resolution status to force re-resolution
  if (currentState.subdomain !== subdomain) {
    useTenantStore.setState({
      subdomain,
      isAdmin,
      isBranch,
      isLocal,
      isResolved: false,
      bank: null,
      error: null,
    });
  } else {
    useTenantStore.setState({
      subdomain,
      isAdmin,
      isBranch,
      isLocal,
    });
  }
};

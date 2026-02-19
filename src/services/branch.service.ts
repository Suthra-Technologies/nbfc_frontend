import { api } from '@/lib/api-client';
import type { 
  Branch, 
  CreateBranchDTO, 
  UpdateBranchDTO,
  BranchStats 
} from '@/types/auth.types';
import { getAllBranches, createBranch as mockCreateBranch, updateBranch as mockUpdateBranch, deactivateBranch } from './mock-auth.service';

// Use mock service for demo
const USE_MOCK = true;

export const branchService = {
  /**
   * Get all branches (Super Admin only)
   */
  getAll: async (): Promise<Branch[]> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return getAllBranches();
    }
    return api.get<Branch[]>('/branches');
  },

  /**
   * Get branch by ID
   */
  getById: async (id: string): Promise<Branch> => {
    if (USE_MOCK) {
      const branches = getAllBranches();
      const branch = branches.find(b => b.id === id);
      if (!branch) throw new Error('Branch not found');
      return branch;
    }
    return api.get<Branch>(`/branches/${id}`);
  },

  /**
   * Create a new branch (Super Admin only)
   */
  create: async (data: CreateBranchDTO): Promise<Branch> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockCreateBranch(data);
    }
    return api.post<Branch>('/branches', data);
  },

  /**
   * Update branch
   */
  update: async (id: string, data: UpdateBranchDTO): Promise<Branch> => {
    return api.patch<Branch>(`/branches/${id}`, data);
  },

  /**
   * Delete/deactivate branch (Super Admin only)
   */
  delete: async (id: string): Promise<void> => {
    return api.delete(`/branches/${id}`);
  },

  /**
   * Get branch statistics
   */
  getStats: async (branchId: string): Promise<BranchStats> => {
    return api.get<BranchStats>(`/branches/${branchId}/stats`);
  },

  /**
   * Get branches accessible to current user
   */
  getMyBranches: async (): Promise<Branch[]> => {
    return api.get<Branch[]>('/branches/my-branches');
  },

  /**
   * Update branch settings
   */
  updateSettings: async (branchId: string, settings: any): Promise<Branch> => {
    return api.patch<Branch>(`/branches/${branchId}/settings`, settings);
  },

  /**
   * Lock/unlock business date
   */
  toggleDateLock: async (branchId: string, isLocked: boolean): Promise<void> => {
    return api.post(`/branches/${branchId}/date-lock`, { isLocked });
  },
};

import { api } from '@/lib/api-client';

export interface CreateBankDTO {
  name: string;
  email: string;
  phone: string;
  logo?: string;
  maxBranches: number;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  adminName: string;
  adminEmail: string;
  adminMobile: string;
  adminPassword?: string;
  branchName: string;
  branchCode: string;
}

export interface Bank {
  id: string;
  name: string;
  email: string;
  phone: string;
  logo: string;
  maxBranches: number;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  isActive: boolean;
  subdomain?: string;
  dbName?: string;
  createdAt: string;
}

export const bankService = {
  /**
   * Create a new bank
   */
  create: async (data: CreateBankDTO): Promise<Bank> => {
    return api.post<Bank>('/banks', data);
  },

  /**
   * Get all banks
   */
  getAll: async (): Promise<Bank[]> => {
    return api.get<Bank[]>('/banks');
  },

  /**
   * Get bank by ID
   */
  getById: async (id: string): Promise<Bank> => {
    return api.get<Bank>(`/banks/${id}`);
  },

  getProfile: async (): Promise<Bank> => {
    return api.get<Bank>('/banks/profile');
  }
};

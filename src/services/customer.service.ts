import { api } from '@/lib/api-client';

export interface Customer {
  _id: string;
  customerId: string;
  bankId: string;
  branchId: string;
  personalInfo: {
    fullName: string;
    mobile: string;
    email?: string;
    dob?: string;
    gender?: string;
  };
  kyc: {
    panNumber?: string;
    aadhaarMasked?: string;
    idProofUrl?: string;
    addressProofUrl?: string;
  };
  financialInfo?: {
    occupation?: string;
    monthlyIncome?: number;
  };
  riskProfile?: {
    score?: number;
    category?: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  isActive: boolean;
  createdAt: string;
}

export const customerService = {
  getAll: async (params?: any): Promise<Customer[]> => {
    return api.get<Customer[]>('/customers', { params });
  },

  getById: async (id: string): Promise<Customer> => {
    return api.get<Customer>(`/customers/${id}`);
  },

  create: async (data: any): Promise<Customer> => {
    return api.post<Customer>('/customers', data);
  },

  update: async (id: string, data: any): Promise<Customer> => {
    return api.put<Customer>(`/customers/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/customers/${id}`);
  }
};

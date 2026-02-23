import { api } from '@/lib/api-client';
import type { Customer } from './customer.service';

export interface Loan {
  _id: string;
  loanId: string;
  bankId: string;
  branchId: string;
  customerId: string | Customer;
  principalAmount: number;
  interestRate: number;
  tenureMonths: number;
  interestType: 'FLAT' | 'REDUCING';
  totalInterest: number;
  totalPayable: number;
  emiAmount: number;
  outstandingAmount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'CLOSED' | 'NPA';
  createdAt: string;
}

export const loanService = {
  getAll: async (params?: any): Promise<Loan[]> => {
    return api.get<Loan[]>('/loans', { params });
  },

  getById: async (id: string): Promise<Loan> => {
    return api.get<Loan>(`/loans/${id}`);
  },

  create: async (data: any): Promise<Loan> => {
    return api.post<Loan>('/loans', data);
  },

  approve: async (id: string): Promise<Loan> => {
    return api.patch<Loan>(`/loans/${id}/approve`);
  },

  reject: async (id: string): Promise<Loan> => {
    return api.patch<Loan>(`/loans/${id}/reject`);
  },

  disburse: async (id: string): Promise<Loan> => {
    return api.patch<Loan>(`/loans/${id}/disburse`);
  }
};

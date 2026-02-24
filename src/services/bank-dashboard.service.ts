import { api } from '@/lib/api-client';

export interface BankStats {
  totalBranches: number;
  totalCustomers: number;
  totalLoans: number;
  totalDisbursed: number;
  bankName?: string;
  bankLogo?: string;
}

export const bankDashboardService = {
  getStats: async (): Promise<BankStats> => {
    return api.get<BankStats>('/dashboard/bank');
  },
};

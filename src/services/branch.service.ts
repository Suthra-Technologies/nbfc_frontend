import { api } from '@/lib/api-client';

export interface Branch {
  _id: string;
  branchCode: string;
  name: string;
  bankId: string;
  address?: {
    line1?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  status: 'ACTIVE' | 'INACTIVE';
  managerId?: {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
  };
  createdAt: string;
}

export interface CreateBranchDTO {
  name: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  manager?: {
    fullName: string;
    email: string;
    mobile: string;
    password?: string;
  };
}

export const branchService = {
  getAll: async (): Promise<Branch[]> => {
    return api.get<Branch[]>('/branches');
  },

  getById: async (id: string): Promise<Branch> => {
    return api.get<Branch>(`/branches/${id}`);
  },

  create: async (data: CreateBranchDTO): Promise<Branch> => {
    return api.post<Branch>('/branches', data);
  },

  update: async (id: string, data: Partial<CreateBranchDTO> & { status?: string }): Promise<Branch> => {
    return api.put<Branch>(`/branches/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/branches/${id}`);
  },
};

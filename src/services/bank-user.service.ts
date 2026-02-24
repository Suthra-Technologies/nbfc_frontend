import { api } from '@/lib/api-client';

export interface BankUser {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  mobile: string;
  isActive: boolean;
  createdAt: string;
  roleId?: { _id: string; code: string; name: string };
  branchId?: { _id: string; name: string } | null;
}

export interface CreateUserDTO {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  roleId: string;
  branchId?: string;
}

export interface BankRole {
  _id: string;
  code: string;
  name: string;
}

export const bankUserService = {
  getAll: async (params?: { role?: string; branchId?: string }): Promise<BankUser[]> => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return api.get<BankUser[]>(`/users${q ? '?' + q : ''}`);
  },

  getById: async (id: string): Promise<BankUser> => {
    return api.get<BankUser>(`/users/${id}`);
  },

  create: async (data: CreateUserDTO): Promise<BankUser> => {
    return api.post<BankUser>('/users', data);
  },

  update: async (id: string, data: Partial<CreateUserDTO> & { isActive?: boolean }): Promise<BankUser> => {
    return api.put<BankUser>(`/users/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/users/${id}`);
  },
};

export const bankRoleService = {
  getAll: async (): Promise<BankRole[]> => {
    return api.get<BankRole[]>('/roles');
  },
};

import { api } from '@/lib/api-client';

export interface DemoRequest {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  message?: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'rejected';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDemoRequestDTO {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  message?: string;
}

export const demoRequestService = {
  /**
   * Book a new demo (public)
   */
  create: async (data: CreateDemoRequestDTO): Promise<DemoRequest> => {
    return api.post<DemoRequest>('/demo-requests', data);
  },

  /**
   * Get all demo requests (super admin only)
   */
  getAll: async (): Promise<DemoRequest[]> => {
    return api.get<DemoRequest[]>('/demo-requests');
  },

  /**
   * Get a single demo request by ID
   */
  getById: async (id: string): Promise<DemoRequest> => {
    return api.get<DemoRequest>(`/demo-requests/${id}`);
  },

  /**
   * Update status of a demo request
   */
  updateStatus: async (id: string, status: DemoRequest['status']): Promise<DemoRequest> => {
    return api.put<DemoRequest>(`/demo-requests/${id}`, { status });
  },

  /**
   * Mark a demo request as read
   */
  markAsRead: async (id: string): Promise<DemoRequest> => {
    return api.patch<DemoRequest>(`/demo-requests/${id}/read`, {});
  },

  /**
   * Delete a demo request
   */
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(`/demo-requests/${id}`);
  },

  /**
   * Get unread count
   */
  getUnreadCount: async (): Promise<number> => {
    const res = await api.get<{ count: number }>('/demo-requests/unread-count');
    return res.count;
  },
};

import { api } from '@/lib/api-client';

export interface ShareIssue {
    _id?: string;
    bankId?: string;
    branchId?: string;
    memberId: any; // Can be string ID or populated Member object
    admissionNo?: string;
    sharesEachOf: number;
    noOfSharesHeld: number;
    totalAmount: number;
    issuedDate: string;
    distinctiveNos?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'SURRENDERED';
    createdAt?: string;
}

export const shareService = {
    // Create a new share issue
    createShareIssue: async (data: Partial<ShareIssue>): Promise<ShareIssue> => {
        return api.post<ShareIssue>('/producer-company/shares', data);
    },

    // Get all share issues
    getAllShareIssues: async (filters?: any): Promise<ShareIssue[]> => {
        const params = new URLSearchParams(filters);
        return api.get<ShareIssue[]>(`/producer-company/shares?${params.toString()}`);
    },

    // Get a single share issue by ID
    getShareIssueById: async (id: string): Promise<ShareIssue> => {
        return api.get<ShareIssue>(`/producer-company/shares/${id}`);
    },
};

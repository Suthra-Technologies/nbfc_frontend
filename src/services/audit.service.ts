// import { api } from '@/lib/api-client';

export interface AuditLog {
    id: string;
    userId: string;
    userName: string;
    userRole: string;
    action: string;
    resource: string;
    resourceId?: string;
    details: any;
    ipAddress: string;
    userAgent: string;
    status: 'success' | 'failure';
    createdAt: string;
}

export const auditService = {
    /**
     * Get all audit logs with optional filtering
     */
    getAll: async (): Promise<{ logs: AuditLog[]; total: number }> => {
        // In a real app, this would be:
        // return api.get('/audit-logs');

        // Mocking response for now to ensure professional UI development
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockLogs: AuditLog[] = [
                    {
                        id: '1',
                        userId: 'admin_1',
                        userName: 'System Architect',
                        userRole: 'SUPER_ADMIN',
                        action: 'UPDATE_BANK_POLICY',
                        resource: 'BankConfig',
                        details: { field: 'max_branches', old: 10, new: 25 },
                        ipAddress: '192.168.1.1',
                        userAgent: 'Mozilla/5.0...',
                        status: 'success',
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: '2',
                        userId: 'admin_2',
                        userName: 'Regional Manager',
                        userRole: 'BANK_ADMIN',
                        action: 'CREATE_BRANCH',
                        resource: 'Branch',
                        details: { branchName: 'Downtown Hub', city: 'Mumbai' },
                        ipAddress: '103.21.54.12',
                        userAgent: 'Chrome/121...',
                        status: 'success',
                        createdAt: new Date(Date.now() - 3600000).toISOString()
                    },
                    {
                        id: '3',
                        userId: 'guest_4',
                        userName: 'Unknown Entity',
                        userRole: 'GUEST',
                        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
                        resource: 'AdminPanel',
                        details: { attempt: 'SSH Brute Force', target: '/api/v1/secure' },
                        ipAddress: '45.12.98.22',
                        userAgent: 'Python-requests/2.31',
                        status: 'failure',
                        createdAt: new Date(Date.now() - 7200000).toISOString()
                    }
                ];
                resolve({ logs: mockLogs, total: 3 });
            }, 800);
        });
    }
};

// import { api } from '@/lib/api-client';

export interface GlobalSettings {
    platformName: string;
    supportEmail: string;
    defaultCurrency: string;
    maxBanks: number;
    globalInterestRateCap: number;
    maintenanceMode: boolean;
    mfaRequired: boolean;
    sessionTimeout: number; // in minutes
    smtpConfig: {
        host: string;
        port: number;
        user: string;
    };
}

export const settingsService = {
    getGlobalConfig: async (): Promise<GlobalSettings> => {
        // In a real app: return api.get('/settings/global');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    platformName: 'NBFC Core Multi-Bank SaaS',
                    supportEmail: 'ops@nbfc-saas.com',
                    defaultCurrency: 'USD',
                    maxBanks: 50,
                    globalInterestRateCap: 24.5,
                    maintenanceMode: false,
                    mfaRequired: true,
                    sessionTimeout: 60,
                    smtpConfig: {
                        host: 'smtp.sendgrid.net',
                        port: 587,
                        user: 'apikey'
                    }
                });
            }, 600);
        });
    },

    updateGlobalConfig: async (config: Partial<GlobalSettings>): Promise<boolean> => {
        // In a real app: return api.patch('/settings/global', config);
        console.log('Updating global config:', config);
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000);
        });
    }
};

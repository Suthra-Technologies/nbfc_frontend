import { useEffect, useState } from 'react';
import {
    ShieldCheck,
    Mail,
    CreditCard,
    Save,
    Layout,
    AlertCircle
} from 'lucide-react';
import { settingsService } from '@/services/settings.service';
import type { GlobalSettings } from '@/services/settings.service';
import { cn } from '@/lib/utils';
import './Settings.css';

type SettingTab = 'general' | 'banking' | 'security' | 'integration';

export function PlatformSettings() {
    const [config, setConfig] = useState<GlobalSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<SettingTab>('general');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setIsLoading(true);
            const data = await settingsService.getGlobalConfig();
            setConfig(data);
        } catch (error) {
            console.error('Failed to load settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!config) return;
        try {
            setIsSaving(true);
            await settingsService.updateGlobalConfig(config);
            alert('Platform configuration updated successfully.');
        } catch (error) {
            alert('Failed to update config.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loader-container" style={{ minHeight: '80vh' }}>
                <div className="spinner"></div>
                <p>Retrieving platform orchestrator config...</p>
            </div>
        );
    }

    return (
        <div className="settings-wrapper">
            <header className="settings-header">
                <div className="settings-header-inner">
                    <div className="settings-title-group">
                        <h1>Platform Governance</h1>
                        <p>Configure global parameters for the Multi-Bank SaaS Ecosystem.</p>
                    </div>
                </div>
            </header>

            <main className="settings-main">
                <aside className="settings-nav">
                    <button
                        className={cn("nav-item", activeTab === 'general' && "active")}
                        onClick={() => setActiveTab('general')}
                    >
                        <Layout size={18} /> General Identity
                    </button>
                    <button
                        className={cn("nav-item", activeTab === 'banking' && "active")}
                        onClick={() => setActiveTab('banking')}
                    >
                        <CreditCard size={18} /> Banking Compliance
                    </button>
                    <button
                        className={cn("nav-item", activeTab === 'security' && "active")}
                        onClick={() => setActiveTab('security')}
                    >
                        <ShieldCheck size={18} /> Security & Access
                    </button>
                    <button
                        className={cn("nav-item", activeTab === 'integration' && "active")}
                        onClick={() => setActiveTab('integration')}
                    >
                        <Mail size={18} /> Mail & Integrations
                    </button>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(241, 132, 34, 0.05)', borderRadius: '12px', border: '1px solid rgba(241, 132, 34, 0.1)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--set-secondary)', marginBottom: '0.5rem' }}>
                            <AlertCircle size={14} />
                            <b style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>System Health</b>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--set-muted)', margin: 0 }}>
                            All regional nodes reporting healthy. Maintenance mode is currently <b>inactive</b>.
                        </p>
                    </div>
                </aside>

                <div className="settings-content-card">
                    {activeTab === 'general' && config && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>General Identity</h2>
                                <p>Set your platform branding and default regional localization.</p>
                            </div>
                            <div className="settings-form">
                                <div className="field-group">
                                    <label>Platform Master Name</label>
                                    <input
                                        type="text"
                                        value={config.platformName}
                                        onChange={(e) => setConfig({ ...config, platformName: e.target.value })}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="field-group">
                                        <label>Global Support Email</label>
                                        <input
                                            type="email"
                                            value={config.supportEmail}
                                            onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
                                        />
                                    </div>
                                    <div className="field-group">
                                        <label>Accounting Currency</label>
                                        <select
                                            value={config.defaultCurrency}
                                            onChange={(e) => setConfig({ ...config, defaultCurrency: e.target.value })}
                                        >
                                            <option value="USD">USD - United States Dollar</option>
                                            <option value="INR">INR - Indian Rupee</option>
                                            <option value="EUR">EUR - Euro</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'banking' && config && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>Banking Compliance</h2>
                                <p>Configure global limits and regulatory constraints for all tenant banks.</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-row">
                                    <div className="field-group">
                                        <label>Global Node Limit</label>
                                        <input
                                            type="number"
                                            value={config.maxBanks}
                                            onChange={(e) => setConfig({ ...config, maxBanks: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="field-group">
                                        <label>Max APR Interest Cap (%)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={config.globalInterestRateCap}
                                            onChange={(e) => setConfig({ ...config, globalInterestRateCap: parseFloat(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <div className="switch-container">
                                    <div className="switch-info">
                                        <b>Global Maintenance Override</b>
                                        <span>Put all banking nodes into read-only mode for platform updates.</span>
                                    </div>
                                    <div
                                        className={cn("actual-switch", config.maintenanceMode && "on")}
                                        onClick={() => setConfig({ ...config, maintenanceMode: !config.maintenanceMode })}
                                    >
                                        <div className="switch-knob"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && config && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>Security & Access</h2>
                                <p>Enforce global security protocols across the entire Multi-Bank architecture.</p>
                            </div>
                            <div className="settings-form">
                                <div className="switch-container">
                                    <div className="switch-info">
                                        <b>Enforce Platform-wide MFA</b>
                                        <span>Mandatory two-factor authentication for all administrative levels.</span>
                                    </div>
                                    <div
                                        className={cn("actual-switch", config.mfaRequired && "on")}
                                        onClick={() => setConfig({ ...config, mfaRequired: !config.mfaRequired })}
                                    >
                                        <div className="switch-knob"></div>
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label>Administrative Session Timeout (Minutes)</label>
                                    <input
                                        type="number"
                                        value={config.sessionTimeout}
                                        onChange={(e) => setConfig({ ...config, sessionTimeout: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integration' && config && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>Mail & SMTP Integrations</h2>
                                <p>Configure global SMTP settings for system-generated alerts and notifications.</p>
                            </div>
                            <div className="settings-form">
                                <div className="field-group">
                                    <label>SMTP Relay Host</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. smtp.sendgrid.net"
                                        value={config.smtpConfig.host}
                                        onChange={(e) => setConfig({ ...config, smtpConfig: { ...config.smtpConfig, host: e.target.value } })}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="field-group">
                                        <label>SMTP Port</label>
                                        <input
                                            type="number"
                                            value={config.smtpConfig.port}
                                            onChange={(e) => setConfig({ ...config, smtpConfig: { ...config.smtpConfig, port: parseInt(e.target.value) } })}
                                        />
                                    </div>
                                    <div className="field-group">
                                        <label>Relay Auth Username</label>
                                        <input
                                            type="text"
                                            value={config.smtpConfig.user}
                                            onChange={(e) => setConfig({ ...config, smtpConfig: { ...config.smtpConfig, user: e.target.value } })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="settings-actions">
                        <button className="save-btn" disabled={isSaving} onClick={handleSave}>
                            {isSaving ? 'Synchronizing Config...' : (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Save size={18} /> Update Platform Parameters
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

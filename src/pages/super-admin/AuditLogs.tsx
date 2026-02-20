import { useEffect, useState, useMemo } from 'react';
import {
    ShieldCheck,
    Search,
    Download,
    Server,
    Globe,
    Activity
} from 'lucide-react';
import { auditService } from '@/services/audit.service';
import type { AuditLog } from '@/services/audit.service';
import { cn } from '@/lib/utils';
import './AuditLogs.css';

export function AuditLogs() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            setIsLoading(true);
            const data = await auditService.getAll();
            setLogs(data.logs);
        } catch (error) {
            console.error('Failed to fetch audit logs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const matchesSearch =
                log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.resource.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [logs, searchTerm, statusFilter]);

    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="audit-container">
            {/* Clean Page Title Bar */}
            <div className="audit-title-bar">
                <div className="header-inner">
                    <div className="title-area">
                        <div className="header-icon-box">
                            <ShieldCheck size={28} />
                        </div>
                        <div className="header-title-text">
                            <h1>Security Audit Ledger</h1>
                            <p>Immutable record of all administrative and system-level operations.</p>
                        </div>
                    </div>

                    <div className="header-controls">
                        <div className="filter-group">
                            {(['all', 'success', 'failure'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={cn("filter-btn", statusFilter === status && "active")}
                                >
                                    {status === 'all' ? 'All Events' : status === 'success' ? 'Authorized' : 'Denied'}
                                </button>
                            ))}
                        </div>
                        <div className="search-bar">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search by activity, operator or entity..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="export-btn" onClick={() => alert('Preparing secure archive...')}>
                            <Download size={18} />
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="audit-main">
                {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Decrypting Audit Data...</p>
                    </div>
                ) : (
                    <div className="audit-table-card">
                        <table className="logs-table">
                            <thead>
                                <tr>
                                    <th>Security Operator</th>
                                    <th>Operation / Action</th>
                                    <th>Target Resource</th>
                                    <th>Status & Origin</th>
                                    <th>Timestamp</th>
                                    <th>Payload Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '4rem' }}>
                                            <Activity size={48} style={{ color: 'var(--audit-primary-soft)', marginBottom: '1rem' }} />
                                            <p style={{ color: 'var(--audit-text-muted)', fontWeight: 600 }}>No security events matched your query.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLogs.map((log, index) => (
                                        <tr key={log.id} className="log-row" style={{ animation: `fadeInAudit 0.4s ease-out backwards ${index * 0.04}s` }}>
                                            <td>
                                                <div className="user-identity">
                                                    <div className="user-avatar">
                                                        {log.userName.charAt(0)}
                                                    </div>
                                                    <div className="user-info-text">
                                                        <b>{log.userName}</b>
                                                        <span>{log.userRole.replace('_', ' ')}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="action-pill">{log.action}</span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--audit-text-main)' }}>
                                                    <Server size={14} color="var(--audit-primary)" />
                                                    {log.resource}
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cn("status-indicator", log.status)}>
                                                    <div className="status-dot"></div>
                                                    {log.status === 'success' ? 'Authorized' : 'Denied'}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: 'var(--audit-text-muted)', marginTop: '4px' }}>
                                                    <Globe size={10} />
                                                    {log.ipAddress}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="time-stamp">
                                                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    <span className="time-relative">{formatRelativeTime(log.createdAt)}</span>
                                                </div>
                                            </td>
                                            <td className="details-cell">
                                                <div className="details-snippet">
                                                    {JSON.stringify(log.details)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

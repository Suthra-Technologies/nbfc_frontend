import { useNavigate } from 'react-router-dom';
import { Building2, Users, IndianRupee, TrendingUp, Plus, CreditCard, Briefcase, Activity } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import './BankAdminDashboard.css';

export function BankAdminDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const stats = [
        { label: 'Branches', value: '4', icon: Building2, trend: '+1' },
        { label: 'Total Staff', value: '28', icon: Users, trend: 'Stable' },
        { label: 'Customers', value: '1,240', icon: Users, trend: '+12%' },
        { label: 'Deposits', value: '₹42.5 Cr', icon: IndianRupee, trend: '+2.4%' },
    ];

    return (
        <div className="bank-dashboard-container">
            <header className="bank-dashboard-header">
                <div className="welcome-section">
                    <h1>{user?.firstName} Overview</h1>
                    <p>Managing institutional operations</p>
                </div>
                <div className="header-actions">
                    <button
                        onClick={() => navigate('/bank-admin/branches/create')}
                        className="bank-primary-btn"
                    >
                        <Plus size={14} /> Add Branch
                    </button>
                </div>
            </header>

            <div className="bank-stats-grid">
                {stats.map((stat, i) => (
                    <div key={i} className="bank-stat-card">
                        <div className="bank-stat-label">{stat.label}</div>
                        <div className="bank-stat-value">{stat.value}</div>
                        <div className="bank-stat-trend">
                            <TrendingUp size={10} style={{ marginRight: 4 }} />
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bank-dashboard-grid">
                <div className="bank-card">
                    <h2 className="bank-card-title">Performance Metrics</h2>
                    <div className="placeholder-viz">
                        <Activity size={24} style={{ opacity: 0.2, marginBottom: 8 }} />
                        <p>Analytics initialization in progress</p>
                    </div>
                </div>

                <div className="bank-card">
                    <h2 className="bank-card-title">Quick Actions</h2>
                    <div className="quick-actions-list">
                        <button className="action-item" onClick={() => navigate('/bank-admin/staff')}>
                            <Users size={14} /> Staff Operations
                        </button>
                        <button className="action-item" onClick={() => navigate('/bank-admin/customers')}>
                            <Plus size={14} /> New Customer
                        </button>
                        <button className="action-item" onClick={() => navigate('/bank-admin/loans')}>
                            <Briefcase size={14} /> Loan Registry
                        </button>
                        <button className="action-item" onClick={() => navigate('/bank-admin/accounts')}>
                            <CreditCard size={14} /> Asset Management
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

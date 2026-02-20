import { useNavigate } from 'react-router-dom';
import {
    Building2, Users, IndianRupee,
    Plus, Search, Bell,
    TrendingUp,
    Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const GROWTH_DATA = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
];

const RECENT_BANKS = [
    { id: '1', name: 'Global Finance Corp', status: 'Active', growth: '+12.5%' },
    { id: '2', name: 'Apex Banking Solutions', status: 'Active', growth: '+8.2%' },
    { id: '3', name: 'Zion Savings & Loans', status: 'Active', growth: '+15.1%' },
];

export function AdminDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
        

            <main className="dashboard-main">
                {/* Stats Grid */}
                <div className="stats-grid">
                    {[
                        { label: 'Registered Banks', value: '42', icon: Building2 },
                        { label: 'Portfolio Volume', value: '₹2,845 Cr', icon: IndianRupee },
                        { label: 'Active Users', value: '184.5k', icon: Users },
                        { label: 'System Uptime', value: '99.98%', icon: Shield },
                    ].map((stat, i) => (
                        <div key={i} className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon-wrapper">
                                    <stat.icon size={16} />
                                </div>
                                <div className="stat-trend">
                                    <TrendingUp size={10} />
                                </div>
                            </div>
                            <h3 className="stat-label">{stat.label}</h3>
                            <p className="stat-value">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="dashboard-grid">
                    {/* Activity Chart */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <div className="chart-info">
                                <h2>Network Growth</h2>
                                <p>Monthly transaction volume aggregation</p>
                            </div>
                            <select className="chart-select">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={GROWTH_DATA}>
                                    <defs>
                                        <linearGradient id="colorMinimal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', fontSize: '12px' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMinimal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Side Stack */}
                    <div className="sidebar-stack">
                        <div className="glass-card">
                            <h2>Top Institutions</h2>
                            <div className="side-list">
                                {RECENT_BANKS.map((bank) => (
                                    <div key={bank.id} className="side-item">
                                        <div className="side-item-main">
                                            <div className="token-icon">
                                                <Building2 size={14} />
                                            </div>
                                            <p className="side-item-name">{bank.name}</p>
                                        </div>
                                        <span className="growth-indicator">{bank.growth}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="highlight-card">
                            <p className="highlight-label">Systems Health</p>
                            <h3 className="highlight-value">Optimal Protocol</h3>
                            <div className="health-metrics">
                                <div className="metric-unit">
                                    <p>12</p>
                                    <p>Regions</p>
                                </div>
                                <div className="metric-divider"></div>
                                <div className="metric-unit">
                                    <p>0</p>
                                    <p>Critical</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

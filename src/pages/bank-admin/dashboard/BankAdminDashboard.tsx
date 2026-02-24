import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2,
    Users,
    IndianRupee,
    TrendingUp,
    Plus,
    Briefcase,
    Activity,
    Loader2,
    ArrowRight,
    Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { bankDashboardService, type BankStats } from '@/services/bank-dashboard.service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import './BankAdminDashboard.css';

export function BankAdminDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { currentBranch } = useAuthStore();
    const { toast } = useToast();
    const [stats, setStats] = useState<BankStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const data = await bankDashboardService.getStats();
            setStats(data);
        } catch (error) {
            toast({
                title: 'Sync Error',
                description: 'Failed to retrieve real-time operational data',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const dashboardStats = [
        { label: 'Network Nodes', value: stats?.totalBranches || '0', icon: Building2, trend: 'Branches' },
        { label: 'Workforce', value: 'Active', icon: Users, trend: 'Staff' },
        { label: 'Client Base', value: stats?.totalCustomers || '0', icon: Users, trend: 'Customers' },
        { label: 'Capital Outflow', value: `₹${((stats?.totalDisbursed || 0) / 10000000).toFixed(2)} Cr`, icon: IndianRupee, trend: 'Disbursements' },
    ];

    return (
        <div className="bank-dashboard-container animate-fade-in">
            <header className="bank-dashboard-header">
                <div className="welcome-section">
                    <div className="flex items-center gap-3">
                        <div className="user-initials">
                            {stats?.bankLogo ? (
                                <img src={stats.bankLogo} alt="Bank Logo" className="w-full h-full object-contain p-1" />
                            ) : (
                                user?.firstName?.charAt(0) || 'B'
                            )}
                        </div>
                        <div>
                            <h1>{stats?.bankName || 'Institution Control'}</h1>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
                                Logged in as <span className="text-[#009BB0] font-bold">{user?.firstName} {user?.lastName}</span>
                                {currentBranch && (
                                    <span className="ml-2 border-l border-slate-200 pl-2">
                                        Active Node: <span className="text-[#F18422] font-bold">{currentBranch.name}</span>
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={14} className="text-slate-400" />
                        <input type="text" placeholder="Search operations..." />
                    </div>
                    <button
                        onClick={() => navigate('/bank-admin/branches')}
                        className="bank-primary-btn"
                    >
                        <Plus size={14} /> New Node
                    </button>
                </div>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                    <Loader2 size={48} className="animate-spin mb-4 opacity-10" />
                    <p className="text-sm font-bold tracking-widest uppercase opacity-40">Syncing Cryptographic Ledger...</p>
                </div>
            ) : (
                <>
                    <div className="bank-stats-grid">
                        {dashboardStats.map((stat, i) => (
                            <div key={i} className="bank-stat-card group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="stat-icon-bg group-hover:bg-[#009BB0]/10 transition-colors">
                                        <stat.icon size={18} className="text-[#009BB0]" />
                                    </div>
                                    <div className="stat-trend-tag">
                                        <TrendingUp size={10} />
                                        <span>Live</span>
                                    </div>
                                </div>
                                <div className="bank-stat-label">{stat.label}</div>
                                <div className="bank-stat-value">{stat.value}</div>
                                <div className="bank-stat-caption">{stat.trend} tracked in current cycle</div>
                            </div>
                        ))}
                    </div>

                    <div className="bank-dashboard-grid">
                        <div className="bank-card p-0 overflow-hidden">
                            <div className="p-6 border-b border-slate-50">
                                <h2 className="bank-card-title flex items-center justify-between">
                                    Operating Performance
                                    <Badge variant="outline" className="text-[10px] border-[#009BB0]/20 text-[#009BB0] bg-[#009BB0]/5">H1 REGISTRY</Badge>
                                </h2>
                            </div>
                            <div className="p-8 flex flex-col items-center justify-center min-h-[280px] bg-slate-50/30">
                                <div className="viz-circle">
                                    <Activity size={32} className="text-[#009BB0] opacity-20" />
                                </div>
                                <p className="text-slate-400 text-sm font-medium mt-4">Aggregation of system metadata...</p>
                                <Button variant="link" className="text-[#009BB0] mt-2 text-xs font-bold uppercase tracking-widest">
                                    Refresh Visualizer
                                </Button>
                            </div>
                        </div>

                        <div className="bank-card">
                            <h2 className="bank-card-title">Institutional Control</h2>
                            <div className="quick-actions-list">
                                <div className="action-row" onClick={() => navigate('/bank-admin/staff')}>
                                    <div className="action-info">
                                        <div className="action-icon text-indigo-500 bg-indigo-50">
                                            <Users size={16} />
                                        </div>
                                        <div>
                                            <p className="action-name">Workforce Management</p>
                                            <p className="action-desc">Employee hierarchy & access control</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300" />
                                </div>

                                <div className="action-row" onClick={() => navigate('/bank-admin/branches')}>
                                    <div className="action-info">
                                        <div className="action-icon text-[#009BB0] bg-[#009BB0]/5">
                                            <Building2 size={16} />
                                        </div>
                                        <div>
                                            <p className="action-name">Node Infrastructure</p>
                                            <p className="action-desc">Configure branch points & hubs</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300" />
                                </div>

                                <div className="action-row" onClick={() => navigate('/bank-admin/customers')}>
                                    <div className="action-info">
                                        <div className="action-icon text-emerald-500 bg-emerald-50">
                                            <Plus size={16} />
                                        </div>
                                        <div>
                                            <p className="action-name">Client Onboarding</p>
                                            <p className="action-desc">Register new retail customers</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300" />
                                </div>

                                <div className="action-row" onClick={() => navigate('/bank-admin/loans')}>
                                    <div className="action-info">
                                        <div className="action-icon text-[#F18422] bg-[#F18422]/5">
                                            <Briefcase size={16} />
                                        </div>
                                        <div>
                                            <p className="action-name">Credit Portfolio</p>
                                            <p className="action-desc">Manage loan assets & risk</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

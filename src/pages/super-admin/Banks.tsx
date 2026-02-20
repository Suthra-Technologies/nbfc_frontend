import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2, MapPin,
    Search,
    LayoutGrid, List,
    ArrowRight,
    Users,
    Activity,
    Plus,
    Target
} from 'lucide-react';
import { bankService } from '@/services/bank.service';
import type { Bank } from '@/services/bank.service';
import { cn } from '@/lib/utils';
import './Banks.css';

type FilterStatus = 'all' | 'active' | 'offline';

export function Banks() {
    const navigate = useNavigate();
    const [banks, setBanks] = useState<Bank[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

    useEffect(() => {
        loadBanks();
    }, []);

    const loadBanks = async () => {
        try {
            setIsLoading(true);
            const data = await bankService.getAll();
            setBanks(data || []);
        } catch (error) {
            console.error('Failed to load banks:', error);
            setBanks([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredBanks = useMemo(() => {
        return banks.filter(bank => {
            const matchesSearch =
                bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bank.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bank.address.city.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'active' && bank.isActive) ||
                (statusFilter === 'offline' && !bank.isActive);

            return matchesSearch && matchesStatus;
        });
    }, [banks, searchTerm, statusFilter]);

    return (
        <div className="banks-container">
            {/* Page Header - Clean Sub-Section */}
            <div className="banks-title-bar">
                <div className="header-content">
                    <div className="header-title-section">
                        <h1 className="header-title">Institution Registry</h1>
                        <p className="header-subtitle">
                            Global orchestration of banking networks and financial nodes.
                        </p>
                    </div>

                    <div className="header-actions">
                        <div className="search-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Find institution, ID or region..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => navigate('/super-admin/banks/create')}
                            className="register-btn"
                        >
                            <Plus size={18} />
                            Register Node
                        </button>
                    </div>
                </div>

                <div className="header-bottom">
                    <div className="filter-group">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={cn("filter-btn", statusFilter === 'all' && "active")}
                        >
                            Complete Hierarchy
                        </button>
                        <button
                            onClick={() => setStatusFilter('active')}
                            className={cn("filter-btn", statusFilter === 'active' && "active")}
                        >
                            Operational Nodes
                        </button>
                        <button
                            onClick={() => setStatusFilter('offline')}
                            className={cn("filter-btn", statusFilter === 'offline' && "active")}
                        >
                            Offline Entities
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="view-controls">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn("view-btn", viewMode === 'grid' && "active")}
                                title="Grid View"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn("view-btn", viewMode === 'list' && "active")}
                                title="List View"
                            >
                                <List size={18} />
                            </button>
                        </div>
                        <div className="entity-count">
                            <Target size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--bank-secondary)' }} />
                            {filteredBanks.length} Entities in Current Scope
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="banks-main">
                {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Synchronizing Regional Registry...</p>
                    </div>
                ) : filteredBanks.length === 0 ? (
                    <div className="empty-state">
                        <Building2 className="empty-icon" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>No matching institutions</h2>
                        <p style={{ color: 'var(--bank-text-muted)', marginBottom: '1.5rem' }}>
                            Adjust your filters or initiate a new node registration.
                        </p>
                        <button
                            className="register-btn"
                            style={{ margin: '0 auto' }}
                            onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                        >
                            Reset Scope
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="banks-grid">
                        {filteredBanks.map((bank, index) => (
                            <div key={bank.id} className="bank-card" style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className="card-top">
                                    <div className="bank-logo-box">
                                        {bank.logo ? (
                                            <img src={bank.logo} alt={bank.name} className="bank-logo-img" />
                                        ) : (
                                            <Building2 size={24} style={{ color: 'var(--bank-primary)' }} />
                                        )}
                                    </div>
                                    <div className={cn(
                                        "status-pill",
                                        bank.isActive ? "active-pill" : "offline-pill"
                                    )}>
                                        {bank.isActive ? 'Operational' : 'Maintenance'}
                                    </div>
                                </div>
                                <div className="bank-info">
                                    <h3>{bank.name}</h3>
                                    <p className="bank-email">{bank.email}</p>
                                </div>
                                <div className="bank-meta">
                                    <div className="meta-item">
                                        <MapPin className="meta-icon" />
                                        {bank.address.city}, {bank.address.state}
                                    </div>
                                    <div className="meta-item">
                                        <Users className="meta-icon" />
                                        {bank.maxBranches} Sub-Nodes Max
                                    </div>
                                </div>
                                <button className="details-btn">
                                    Access Management <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="banks-list-wrapper">
                        <table className="banks-table">
                            <thead>
                                <tr>
                                    <th>Institution Profile</th>
                                    <th>Operations HQ</th>
                                    <th>Network Scale</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBanks.map((bank) => (
                                    <tr key={bank.id} className="table-row">
                                        <td>
                                            <div className="bank-name-cell">
                                                <div className="table-logo">
                                                    {bank.logo ? <img src={bank.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <Building2 size={20} color="var(--bank-primary)" />}
                                                </div>
                                                <div>
                                                    <p className="table-bank-name">{bank.name}</p>
                                                    <p className="table-bank-email">{bank.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="meta-item">
                                                <MapPin size={12} style={{ color: 'var(--bank-primary)' }} />
                                                <span style={{ fontSize: '0.8125rem' }}>{bank.address.city}, {bank.address.state}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="capacity-badge">
                                                {bank.maxBranches} Sub-Nodes
                                            </span>
                                        </td>
                                        <td>
                                            <div className={cn(
                                                "status-pill",
                                                bank.isActive ? "active-pill" : "offline-pill"
                                            )} style={{ display: 'inline-block' }}>
                                                {bank.isActive ? 'Live' : 'Inactive'}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="view-btn active" style={{ width: 'auto', padding: '0 1rem', height: '36px' }}>
                                                Configure <ArrowRight size={14} style={{ marginLeft: '8px' }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

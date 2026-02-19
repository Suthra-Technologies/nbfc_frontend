import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2, MapPin,
    Search,
    LayoutGrid, List,
    ArrowUpRight,
    ArrowRight
} from 'lucide-react';
import { bankService } from '@/services/bank.service';
import type { Bank } from '@/services/bank.service';
import { cn } from '@/lib/utils';
import './Banks.css';

export function Banks() {
    const navigate = useNavigate();
    const [banks, setBanks] = useState<Bank[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    useEffect(() => {
        loadBanks();
    }, []);

    const loadBanks = async () => {
        try {
            setIsLoading(true);
            const data = await bankService.getAll();
            setBanks(data);
        } catch (error) {
            console.error('Failed to load banks:', error);
            setBanks([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="banks-container">
            {/* Header */}
            <header className="banks-header">
                <div className="header-content">
                    <div className="header-title-section">
                        <h1 className="header-title">Institution Registry</h1>
                        <p className="header-subtitle">
                            Manage registered banking institutions.
                        </p>
                    </div>

                    <div className="header-actions">
                        <div className="search-wrapper">
                            <Search size={14} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/super-admin/banks/create')}
                            className="register-btn"
                        >
                            Register Bank
                        </button>
                    </div>
                </div>

                <div className="header-bottom">
                    <div className="view-controls">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn("view-btn", viewMode === 'grid' && "active")}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn("view-btn", viewMode === 'list' && "active")}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="entity-count">
                        {banks.length} Entities Registered
                    </div>
                </div>
            </header>

            <main className="banks-main">
                {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : banks.length === 0 ? (
                    <div className="empty-state">
                        <Building2 className="empty-icon" />
                        <h2 className="empty-title">No institutions found</h2>
                        <p className="empty-desc">Start by registering your first banking node to initialize the network.</p>
                        <button
                            onClick={() => navigate('/super-admin/banks/create')}
                            className="register-btn"
                        >
                            + Register Initial Bank
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="banks-grid">
                        {banks.map((bank) => (
                            <div key={bank.id} className="bank-card">
                                <div className="bank-card-content">
                                    <div className="card-top">
                                        <div className="bank-logo-box">
                                            {bank.logo ? (
                                                <img src={bank.logo} alt="" className="bank-logo-img" />
                                            ) : (
                                                <Building2 className="w-6 h-6 text-slate-400" />
                                            )}
                                        </div>
                                        <div className={cn(
                                            "status-indicator",
                                            bank.isActive ? "status-active" : "status-offline"
                                        )}></div>
                                    </div>
                                    <div className="bank-info">
                                        <h3>{bank.name}</h3>
                                        <p className="bank-email">{bank.email}</p>
                                    </div>
                                    <div className="bank-meta">
                                        <div className="meta-item">
                                            <MapPin className="meta-icon" />
                                            {bank.address.city}
                                        </div>
                                        <div className="meta-item">
                                            <ArrowUpRight className="meta-icon" />
                                            {bank.maxBranches} Nodes
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="details-btn">
                                        Manage Details <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="banks-list-container">
                        <table className="banks-table">
                            <thead>
                                <tr>
                                    <th>Institution Name</th>
                                    <th>Location</th>
                                    <th>Capacity</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {banks.map((bank) => (
                                    <tr key={bank.id} className="table-row">
                                        <td>
                                            <div className="bank-name-cell">
                                                <div className="bank-logo-box" style={{ width: '40px', height: '40px', borderRadius: '10px' }}>
                                                    {bank.logo ? (
                                                        <img src={bank.logo} alt="" className="bank-logo-img" />
                                                    ) : (
                                                        <Building2 className="w-4 h-4 text-slate-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="bank-name-text">{bank.name}</p>
                                                    <p className="bank-email-text">{bank.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="location-text">
                                                {bank.address.city}, {bank.address.state}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="capacity-badge">
                                                {bank.maxBranches} Nodes
                                            </span>
                                        </td>
                                        <td>
                                            <span className={cn(
                                                "status-badge",
                                                bank.isActive ? "active" : "offline"
                                            )}>
                                                {bank.isActive ? 'Active' : 'Offline'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="details-btn">
                                                <ArrowRight size={18} />
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

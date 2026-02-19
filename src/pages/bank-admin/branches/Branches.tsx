import { Building2, MapPin, Plus, Search, ArrowRight } from 'lucide-react';
import './Branches.css';

const MOCK_BRANCHES = [
    { id: '1', name: 'Main Street Branch', city: 'Mumbai', code: 'MSB001', status: 'Active' },
    { id: '2', name: 'West End Hub', city: 'Pune', code: 'WEH002', status: 'Active' },
    { id: '3', name: 'North Corridor', city: 'Mumbai', code: 'NCR003', status: 'Active' },
];

export function Branches() {
    return (
        <div className="branches-container">
            <header className="branches-header">
                <div className="header-info">
                    <h1>Branch Management</h1>
                    <p>Operational nodes for your institution.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={14} />
                        <input type="text" placeholder="Search branches..." />
                    </div>
                    <button className="primary-btn">
                        <Plus size={14} /> New Branch
                    </button>
                </div>
            </header>

            <div className="branches-list">
                {MOCK_BRANCHES.map(branch => (
                    <div key={branch.id} className="branch-row">
                        <div className="branch-identity">
                            <div className="branch-icon">
                                <Building2 size={16} />
                            </div>
                            <div>
                                <h3 className="branch-name">{branch.name}</h3>
                                <p className="branch-code">{branch.code}</p>
                            </div>
                        </div>
                        <div className="branch-meta">
                            <MapPin size={12} />
                            {branch.city}
                        </div>
                        <div className="branch-status">
                            <span className="status-dot"></span>
                            {branch.status}
                        </div>
                        <button className="view-btn">
                            <ArrowRight size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

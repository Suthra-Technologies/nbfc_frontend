import { Plus, Search, ShieldCheck } from 'lucide-react';
import './Staff.css';

const MOCK_STAFF = [
    { id: '1', name: 'John Doe', role: 'Branch Manager', email: 'john@bank.com', branch: 'Main Street' },
    { id: '2', name: 'Sarah Smith', role: 'Assistant Manager', email: 'sarah@bank.com', branch: 'West End' },
    { id: '3', name: 'Mike Johnson', role: 'Cashier', email: 'mike@bank.com', branch: 'Main Street' },
];

export function Staff() {
    return (
        <div className="staff-container">
            <header className="staff-header">
                <div className="header-info">
                    <h1>Staff Management</h1>
                    <p>Manage access and permissions for bank employees.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={14} />
                        <input type="text" placeholder="Search staff..." />
                    </div>
                    <button className="primary-btn">
                        <Plus size={14} /> Add Member
                    </button>
                </div>
            </header>

            <div className="staff-list">
                {MOCK_STAFF.map(member => (
                    <div key={member.id} className="staff-row">
                        <div className="staff-identity">
                            <div className="staff-avatar">
                                {member.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="staff-name">{member.name}</h3>
                                <p className="staff-email">{member.email}</p>
                            </div>
                        </div>
                        <div className="staff-role">
                            <ShieldCheck size={12} />
                            {member.role}
                        </div>
                        <div className="staff-branch">
                            {member.branch}
                        </div>
                        <button className="manage-btn">Manage</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

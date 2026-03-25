import React, { useState } from 'react';
import {
    Save,
    RefreshCcw,
    Info,
    FileText,
    Settings
} from 'lucide-react';
import '../producer-company/producer.css';

const DMS: React.FC = () => {
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="pc-container animate-in fade-in duration-500">
            {/* Header / Toolbar */}
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Document Management System</h1>
                    <p>Process and track loan-related documentation.</p>
                </div>
                <div className="flex gap-2">
                    <button type="button" className="pc-btn-primary flex items-center gap-2" onClick={handleSave}>
                        <Save size={14} /> Save
                    </button>
                    <button type="button" className="pc-btn-ghost flex items-center gap-2" onClick={() => window.location.reload()}>
                        <RefreshCcw size={14} /> Refresh
                    </button>
                </div>
            </div>

            {/* Additional Information Section */}
            <div className="pc-card">
                <div className="pc-card-header">
                    <div className="pc-card-icon"><Settings size={14} /></div>
                    <p className="pc-card-title">Additional Information</p>
                </div>
                <div className="pc-form">
                    <div className="pc-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)', maxWidth: '600px' }}>
                        <div className="pc-field" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: '1rem' }}>
                            <label className="pc-label" style={{ textAlign: 'right', marginBottom: 0 }}>Nature of loan: *</label>
                            <select className="pc-select">
                                <option value="">Select Loan type</option>
                                <option value="personal">Personal Loan</option>
                                <option value="business">Business Loan</option>
                                <option value="vehicle">Vehicle Loan</option>
                                <option value="gold">Gold Loan</option>
                            </select>
                        </div>

                        <div className="pc-field" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: '1rem' }}>
                            <label className="pc-label" style={{ textAlign: 'right', marginBottom: 0 }}>Loan account No.: *</label>
                            <select className="pc-select">
                                <option value="">Select Loan account No.</option>
                                <option value="la001">LA-2024-001 - John Doe</option>
                                <option value="la002">LA-2024-002 - Jane Smith</option>
                                <option value="la003">LA-2024-003 - Robert Johnson</option>
                            </select>
                        </div>

                        <div className="pc-field" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: '1rem' }}>
                            <label className="pc-label" style={{ textAlign: 'right', marginBottom: 0 }}>Collection Executive: *</label>
                            <select className="pc-select">
                                <option value="">Select Collection Executive</option>
                                <option value="ex001">Amit Sharma (EXEC-01)</option>
                                <option value="ex002">Priya Verma (EXEC-02)</option>
                                <option value="ex003">Suresh Kumar (EXEC-03)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default DMS;
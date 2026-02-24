import { useState } from 'react';
import { UserCheck, Save, RotateCcw, Search, UserPlus, Users } from 'lucide-react';
// import './producer.css';

const EMPTY = {
    memberId: '',
    introducerId: '',
    introducerName: '',
    relation: '',
    durationKnown: '',
    remarks: '',
};

const RECORDS = [
    { id: 'INTRO-001', member: 'Ramesh Kumar', introducer: 'Suresh Raina', relation: 'Friend', duration: '5 Years', date: '2024-01-15' },
    { id: 'INTRO-002', member: 'Sunita Devi', introducer: 'Anita Singh', relation: 'Neighbor', duration: '2 Years', date: '2024-02-10' },
];

export function IntroducedDetails() {
    const [form, setForm] = useState(EMPTY);
    const [saved, setSaved] = useState(false);
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Introduced Details</h1>
                    <p>Manage and track member introductions and references.</p>
                    <span className="pc-badge"><UserPlus size={11} /> Referrals</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><UserCheck size={18} /></div>
                        <div>
                            <p className="pc-card-title">Introducer Reference Form</p>
                            <p className="pc-card-sub">Link a new member with an existing introducer</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <p className="pc-section-label"><Search size={12} /> Member Lookup</p>
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member ID *</label>
                                <input className="pc-input" placeholder="e.g. MBR-001" value={form.memberId} onChange={e => set('memberId', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Introducer ID *</label>
                                <input className="pc-input" placeholder="e.g. MBR-005" value={form.introducerId} onChange={e => set('introducerId', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Introducer Name</label>
                                <input className="pc-input" placeholder="Auto-filled on ID lookup" value={form.introducerName} readOnly style={{ background: '#f1f5f9' }} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation with Member *</label>
                                <select className="pc-select" value={form.relation} onChange={e => set('relation', e.target.value)} required>
                                    <option value="">Select relation</option>
                                    <option>Friend</option>
                                    <option>Relative</option>
                                    <option>Neighbor</option>
                                    <option>Colleague</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Duration Known *</label>
                                <input className="pc-input" placeholder="e.g. 3 years" value={form.durationKnown} onChange={e => set('durationKnown', e.target.value)} required />
                            </div>
                            <div className="pc-field pc-grid-full">
                                <label className="pc-label">Introduction Remarks</label>
                                <textarea className="pc-textarea" placeholder="Notes about the introduction..." value={form.remarks} onChange={e => set('remarks', e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="pc-submit-bar">
                        <span className="pc-submit-info">{saved ? '✅ Introduction recorded!' : '* Introduction must be verified by admin'}</span>
                        <div className="pc-submit-actions">
                            <button type="button" className="pc-btn-ghost" onClick={() => setForm(EMPTY)}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />Reset</button>
                            <button type="submit" className="pc-btn-primary"><Save size={14} /> Save Introduction</button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="pc-card">
                <div className="pc-card-header">
                    <div className="pc-card-icon"><Users size={18} /></div>
                    <div><p className="pc-card-title">Recent Introductions</p><p className="pc-card-sub">Member reference tracking</p></div>
                </div>
                <div className="pc-table-wrap">
                    <table className="pc-table">
                        <thead><tr><th>Sl No</th><th>Member Name</th><th>Introducer</th><th>Relation</th><th>Known For</th><th>Date</th></tr></thead>
                        <tbody>
                            {RECORDS.map((r, i) => (
                                <tr key={r.id}>
                                    <td>{i + 1}</td>
                                    <td><strong>{r.member}</strong></td>
                                    <td>{r.introducer}</td>
                                    <td>{r.relation}</td>
                                    <td>{r.duration}</td>
                                    <td>{r.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

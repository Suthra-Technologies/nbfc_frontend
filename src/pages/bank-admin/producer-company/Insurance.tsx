import { useState } from 'react';
import { Shield, Save, RotateCcw, Heart } from 'lucide-react';
// import './producer.css';

const EMPTY = {
    memberId: '',
    policyType: 'LIFE',
    sumAssured: '',
    premiumAmount: '',
    nominee: '',
    tenureYears: '1',
};

export function Insurance() {
    const [form, setForm] = useState(EMPTY);
    const [saved, setSaved] = useState(false);
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Insurance Services</h1>
                    <p>Protect members and their assets with curated insurance policies.</p>
                    <span className="pc-badge"><Heart size={11} /> Member Protection</span>
                </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }}>
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Shield size={18} /></div>
                        <div>
                            <p className="pc-card-title">Policy Issuance Form</p>
                            <p className="pc-card-sub">Link insurance protection to member profiles</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member ID *</label>
                                <input className="pc-input" placeholder="e.g. MBR-001" value={form.memberId} onChange={e => set('memberId', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Policy Type *</label>
                                <select className="pc-select" value={form.policyType} onChange={e => set('policyType', e.target.value)} required>
                                    <option value="LIFE">Term Life Insurance</option>
                                    <option value="HEALTH">Health Protection</option>
                                    <option value="CROP">Crop / Agri Insurance</option>
                                    <option value="LIVESTOCK">Livestock Insurance</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Sum Assured (₹) *</label>
                                <input type="number" className="pc-input" placeholder="e.g. 100000" value={form.sumAssured} onChange={e => set('sumAssured', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Premium Payable (₹) *</label>
                                <input type="number" className="pc-input" value={form.premiumAmount} onChange={e => set('premiumAmount', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Nominee Full Name *</label>
                                <input className="pc-input" value={form.nominee} onChange={e => set('nominee', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Policy Tenure (Years)</label>
                                <input type="number" className="pc-input" value={form.tenureYears} onChange={e => set('tenureYears', e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="pc-submit-bar">
                        <span className="pc-submit-info">{saved ? '✅ Policy application submitted!' : '* Premiums are non-refundable after grace period'}</span>
                        <div className="pc-submit-actions">
                            <button type="button" className="pc-btn-ghost" onClick={() => setForm(EMPTY)}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />Reset</button>
                            <button type="submit" className="pc-btn-primary"><Save size={14} /> Issue Policy</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

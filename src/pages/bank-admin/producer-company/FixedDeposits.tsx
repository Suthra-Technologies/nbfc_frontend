import { useState } from 'react';
import { Briefcase, Save, RotateCcw, Percent } from 'lucide-react';
// import './producer.css';

const EMPTY = {
    memberId: '',
    amount: '',
    tenureMonths: '',
    roi: '8.5',
    interestPayout: 'MATURITY',
    nominee: '',
};

export function FixedDeposits() {
    const [form, setForm] = useState(EMPTY);
    const [saved, setSaved] = useState(false);
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const maturityAmount = Number(form.amount || 0) * (1 + (Number(form.roi) / 100) * (Number(form.tenureMonths) / 12));

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Fixed Deposits (FD)</h1>
                    <p>Secure long-term investments with competitive interest rates for members.</p>
                    <span className="pc-badge"><Percent size={11} /> High Yield</span>
                </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }}>
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Briefcase size={18} /></div>
                        <div>
                            <p className="pc-card-title">FD Booking Form</p>
                            <p className="pc-card-sub">Generate fixed term deposit receipts</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member ID *</label>
                                <input className="pc-input" placeholder="e.g. MBR-001" value={form.memberId} onChange={e => set('memberId', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Principal Amount (₹) *</label>
                                <input type="number" className="pc-input" placeholder="e.g. 10000" value={form.amount} onChange={e => set('amount', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Tenure (Months) *</label>
                                <input type="number" className="pc-input" placeholder="12, 24, 36..." value={form.tenureMonths} onChange={e => set('tenureMonths', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Rate of Interest (%)</label>
                                <input type="number" className="pc-input" value={form.roi} onChange={e => set('roi', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Payout</label>
                                <select className="pc-select" value={form.interestPayout} onChange={e => set('interestPayout', e.target.value)}>
                                    <option value="MATURITY">At Maturity</option>
                                    <option value="MONTHLY">Monthly</option>
                                    <option value="QUARTERLY">Quarterly</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Estimated Maturity (₹)</label>
                                <input className="pc-input" readOnly value={maturityAmount > 0 ? `₹ ${maturityAmount.toFixed(2)}` : ''} style={{ background: '#f0fdf4', color: '#166534', fontWeight: 800 }} />
                            </div>
                        </div>
                    </div>
                    <div className="pc-submit-bar">
                        <span className="pc-submit-info">{saved ? '✅ FD booked successfully!' : '* Calculate maturity value before booking'}</span>
                        <div className="pc-submit-actions">
                            <button type="button" className="pc-btn-ghost" onClick={() => setForm(EMPTY)}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />Reset</button>
                            <button type="submit" className="pc-btn-primary"><Save size={14} /> Book Deposit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

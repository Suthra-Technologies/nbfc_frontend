import { useState } from 'react';
import { Calendar, Save, RotateCcw, Clock } from 'lucide-react';
// import './producer.css';

const EMPTY = {
    memberId: '',
    monthlyInstallment: '',
    tenureMonths: '',
    roi: '7.5',
    startDate: '',
};

export function RecurringDeposits() {
    const [form, setForm] = useState(EMPTY);
    const [saved, setSaved] = useState(false);
    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Recurring Deposits (RD)</h1>
                    <p>Help members save consistently every month with guaranteed returns.</p>
                    <span className="pc-badge"><Clock size={11} /> Systematic Saving</span>
                </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }}>
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Calendar size={18} /></div>
                        <div>
                            <p className="pc-card-title">RD Subscription Form</p>
                            <p className="pc-card-sub">Setup systematic monthly savings plan</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member ID *</label>
                                <input className="pc-input" placeholder="e.g. MBR-001" value={form.memberId} onChange={e => set('memberId', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Monthly Installment (₹) *</label>
                                <input type="number" className="pc-input" placeholder="e.g. 500" value={form.monthlyInstallment} onChange={e => set('monthlyInstallment', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Tenure (Months) *</label>
                                <input type="number" className="pc-input" placeholder="12, 24, 36..." value={form.tenureMonths} onChange={e => set('tenureMonths', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Rate (%)</label>
                                <input type="number" className="pc-input" value={form.roi} onChange={e => set('roi', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Start Date *</label>
                                <input type="date" className="pc-input" value={form.startDate} onChange={e => set('startDate', e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="pc-submit-bar">
                        <span className="pc-submit-info">{saved ? '✅ RD setup completed!' : '* Installments will be auto-debited if configured'}</span>
                        <div className="pc-submit-actions">
                            <button type="button" className="pc-btn-ghost" onClick={() => setForm(EMPTY)}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />Reset</button>
                            <button type="submit" className="pc-btn-primary"><Save size={14} /> Start RD</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

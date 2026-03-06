import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import '../producer.css';

export default function ShareCapitalWithdrawal() {
    const [form, setForm] = useState({
        memberId: '',
        shareCapital: '',
        paymentMode: 'Cash',
        bankName: '',
        branch: '',
        chequeNo: '',
        chequeDate: '',
        paidDate: new Date().toISOString().split('T')[0]
    });

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const needsBankDetails = ['Cheque', 'Neft', 'Transfer'].includes(form.paymentMode);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Share Capital Withdrawal processed successfully!');
    };

    return (
        <div className="pc-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Share Capital Withdrawal</h1>
                    <p>Process share capital withdrawal for producer company members</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="pc-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' }}>Withdrawal Details</div>

                        <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                            <label className="pc-label" style={{ width: '140px', marginBottom: 0 }}>Member ID.:*</label>
                            <input className="pc-input" placeholder="Enter Member ID" value={form.memberId} onChange={e => set('memberId', e.target.value)} required />
                        </div>
                        <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                            <label className="pc-label" style={{ width: '140px', marginBottom: 0 }}>Share Capital:*</label>
                            <input type="number" className="pc-input" placeholder="Enter Amount" value={form.shareCapital} onChange={e => set('shareCapital', e.target.value)} required />
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div style={{ border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '8px', position: 'relative', background: '#fafafa', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'absolute', top: '-10px', left: '15px', background: 'white', padding: '0 5px', fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>
                        Payment Details
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Mode of payment :</div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            {['Cash', 'Cheque', 'Neft', 'Transfer'].map(mode => (
                                <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="paymentMode"
                                        value={mode}
                                        checked={form.paymentMode === mode}
                                        onChange={e => set('paymentMode', e.target.value)}
                                        style={{ accentColor: '#005f73', width: '16px', height: '16px', cursor: 'pointer', margin: 0 }}
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                    </div>

                    {needsBankDetails && (
                        <div className="pc-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '600px', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '100px', marginBottom: 0 }}>Bank name:</label>
                                <select className="pc-select" value={form.bankName} onChange={e => set('bankName', e.target.value)}>
                                    <option value="">Select Bank name</option>
                                    <option value="HDFC">HDFC Bank</option>
                                    <option value="SBI">State Bank of India</option>
                                    <option value="ICICI">ICICI Bank</option>
                                </select>
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '80px', marginBottom: 0 }}>Branch:</label>
                                <input className="pc-input" placeholder="Enter Branch" value={form.branch} onChange={e => set('branch', e.target.value)} />
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '100px', marginBottom: 0 }}>Cheque No.:</label>
                                <input className="pc-input" placeholder="Enter Cheque No." value={form.chequeNo} onChange={e => set('chequeNo', e.target.value)} />
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '80px', marginBottom: 0 }}>Date:</label>
                                <input type="date" className="pc-input" value={form.chequeDate} onChange={e => set('chequeDate', e.target.value)} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Action */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
                    <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label className="pc-label" style={{ width: '80px', marginBottom: 0 }}>Paid Date:</label>
                        <input type="date" className="pc-input" value={form.paidDate} onChange={e => set('paidDate', e.target.value)} required />
                    </div>
                    <button type="submit" className="pc-btn" style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.6rem 1.5rem' }}>
                        <PlusCircle size={16} /> Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
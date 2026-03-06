import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import '../producer.css';

export default function FDMonthlyPayment() {
    const [form, setForm] = useState({
        fdId: '',
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
        alert('Payment processed successfully!');
    };

    return (
        <div className="pc-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>FD Monthly Payment</h1>
                    <p>Process monthly interest payments for Fixed Deposits</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="pc-card" style={{ padding: '1.5rem' }}>
                {/* FD ID Selection */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <label className="pc-label" style={{ width: '100px', marginBottom: 0 }}>FD ID.:</label>
                    <select className="pc-select" value={form.fdId} onChange={e => set('fdId', e.target.value)} style={{ width: '300px' }}>
                        <option value="">Select FD ID.</option>
                        {/* Placeholder options can go here */}
                    </select>
                </div>

                {/* Table Section */}
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                            <thead>
                                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                                    <th style={{ padding: '0.6rem', width: '30px' }}><input type="checkbox" /></th>
                                    <th style={{ padding: '0.6rem' }}>Date</th>
                                    <th style={{ padding: '0.6rem' }}>Customer Name</th>
                                    <th style={{ padding: '0.6rem' }}>FD ID</th>
                                    <th style={{ padding: '0.6rem' }}>Deposit Date</th>
                                    <th style={{ padding: '0.6rem' }}>Payment Mode</th>
                                    <th style={{ padding: '0.6rem' }}>Period</th>
                                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Deposit Amount</th>
                                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Payable Interest</th>
                                    <th style={{ padding: '0.6rem' }}>Introducer Code</th>
                                    <th style={{ padding: '0.6rem' }}>Saving Account no</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty row representation for initial state */}
                                <tr>
                                    <td colSpan={11} style={{ height: '150px', backgroundColor: '#ffffff' }}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Total */}
                <div style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '2rem' }}>
                    Total Amount: 0
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
                        <PlusCircle size={16} /> Payment
                    </button>
                </div>
            </form>
        </div>
    );
}

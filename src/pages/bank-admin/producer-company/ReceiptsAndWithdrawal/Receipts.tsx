import { useState } from 'react';
import { Save, RefreshCcw } from 'lucide-react';
import '../producer.css';

export default function Receipts() {
    const [form, setForm] = useState({
        paymentType: 'Select',
        date: new Date().toISOString().split('T')[0],
        memberType: 'Select MemberType',
        membershipNo: 'Select',
        fdRdId: 'Select',
        customerName: '',
        nomineeName: '',
        age: '',
        mobileNo: '',
        relation: '',
        amount: '',
        narration: '',
        paymentMode: 'Cash',
        bankName: '',
        branch: '',
        chequeNo: '',
        chequeDate: new Date().toISOString().split('T')[0]
    });

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Saved successfully!');
    };

    const needsBankDetails = ['Cheque', 'Transfer'].includes(form.paymentMode);

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Receipts & Vouchers</h1>
                    <p>Process receipts, withdrawals and other cash entries.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pc-card">
                    <div className="pc-form">

                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Payment Type: *</label>
                                <select className="pc-select" value={form.paymentType} onChange={e => set('paymentType', e.target.value)} required>
                                    <option>Select</option>
                                    <option>Receipt</option>
                                    <option>Withdrawal</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date : *</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} required />
                            </div>
                        </div>

                        <div className="pc-divider"></div>
                        <h3 className="pc-section-title">Member Details</h3>
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type : *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)} required>
                                    <option>Select MemberType</option>
                                    <option>MEMBER</option>
                                    <option>ASSOCIATE MEMBER</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Membership No. : *</label>
                                <select className="pc-select" value={form.membershipNo} onChange={e => set('membershipNo', e.target.value)} required>
                                    <option>Select</option>
                                    <option>1001</option>
                                    <option>1002</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">FD/RD ID : *</label>
                                <select className="pc-select" value={form.fdRdId} onChange={e => set('fdRdId', e.target.value)} required>
                                    <option>Select</option>
                                </select>
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Customer Name: *</label>
                                <input className="pc-input" placeholder="Customer Name" value={form.customerName} onChange={e => set('customerName', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Nominee Name : *</label>
                                <input className="pc-input" placeholder="Nominee Name" value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Age : *</label>
                                <input className="pc-input" placeholder="Age" value={form.age} onChange={e => set('age', e.target.value.replace(/\D/g, ''))} required />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Mobile No. : *</label>
                                <input className="pc-input" placeholder="Mobile No" value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation. : *</label>
                                <input className="pc-input" placeholder="Relation" value={form.relation} onChange={e => set('relation', e.target.value)} required />
                            </div>
                        </div>

                        <div className="pc-divider"></div>
                        <h3 className="pc-section-title">Entries</h3>
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Received amount:*</label>
                                <input className="pc-input" placeholder="Enter Received amount" value={form.amount} onChange={e => set('amount', e.target.value.replace(/\D/g, ''))} required />
                            </div>
                        </div>
                        <div className="pc-grid-full" style={{ marginTop: '0.75rem' }}>
                            <div className="pc-field">
                                <label className="pc-label">Narration:</label>
                                <textarea className="pc-input" style={{ minHeight: '80px', resize: 'vertical' }} placeholder="Enter Narration" value={form.narration} onChange={e => set('narration', e.target.value)} />
                            </div>
                        </div>

                        <div className="pc-divider"></div>
                        <h3 className="pc-section-title">Payment Details</h3>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mode of payment :</div>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                {['Cash', 'Cheque', 'Transfer', 'Direct'].map(mode => (
                                    <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value={mode}
                                            checked={form.paymentMode === mode}
                                            onChange={e => set('paymentMode', e.target.value)}
                                            style={{ accentColor: '#009BB0', width: '16px', height: '16px', cursor: 'pointer', margin: 0 }}
                                        />
                                        {mode}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {needsBankDetails && (
                            <div className="pc-grid" style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <div className="pc-field">
                                    <label className="pc-label">Bank name:</label>
                                    <input className="pc-input" placeholder="Enter Bank name" value={form.bankName} onChange={e => set('bankName', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Branch:</label>
                                    <input className="pc-input" placeholder="Enter Branch" value={form.branch} onChange={e => set('branch', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Cheque No.:</label>
                                    <input className="pc-input" placeholder="Enter Cheque No." value={form.chequeNo} onChange={e => set('chequeNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Date:</label>
                                    <input type="date" className="pc-input" value={form.chequeDate} onChange={e => set('chequeDate', e.target.value)} />
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <div className="pc-actions">
                    <button type="submit" className="pc-btn primary">
                        <Save size={16} /> Save & Process
                    </button>
                    <button type="button" className="pc-btn secondary" onClick={() => window.location.reload()}>
                        <RefreshCcw size={16} /> Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

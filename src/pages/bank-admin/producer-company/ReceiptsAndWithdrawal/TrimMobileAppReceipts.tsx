import { useState } from 'react';
import { Save, RefreshCcw } from 'lucide-react';
import '../producer.css';

export default function TrimMobileAppReceipts() {
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        receiptType: '',
        accountNo: '',
        emiAmount: '',
        lateFee: '',
        narration: '',
        paymentMode: 'Cash',
        noOfCheques: '',
        bankName: '',
        branch: '',
        chequeNo: '',
        chequeDate: ''
    });

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const needsBankDetails = form.paymentMode === 'Cheque';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Receipt processed successfully!');
    };

    return (
        <div className="pc-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Trim / Mobile App Receipts</h1>
                    <p>Process receipts from Trim or Mobile Application</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pc-card">
                    <div className="pc-form">

                        {/* Top Filters */}
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', alignItems: 'center' }}>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 0 }}>
                                <label className="pc-label" style={{ width: '60px', marginBottom: 0 }}>Date:</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} required />
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 0 }}>
                                <label className="pc-label" style={{ width: '100px', marginBottom: 0 }}>Receipt Type:</label>
                                <select className="pc-select" value={form.receiptType} onChange={e => set('receiptType', e.target.value)} style={{ width: '250px' }}>
                                    <option value="">Select</option>
                                    <option value="Type1">Type 1</option>
                                    <option value="Type2">Type 2</option>
                                </select>
                            </div>
                        </div>

                        {/* Trim Receipts Table */}
                        <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#334155', color: 'white', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>Trim Receipts</div>
                            <div style={{ overflowX: 'auto', minHeight: '150px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                    <thead>
                                        <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                                            <th style={{ padding: '0.5rem' }}>Tr No.</th>
                                            <th style={{ padding: '0.5rem' }}>Tr Date</th>
                                            <th style={{ padding: '0.5rem' }}>Loan Id</th>
                                            <th style={{ padding: '0.5rem' }}>Applicant Name</th>
                                            <th style={{ padding: '0.5rem' }}>Mobile No.</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Receipt Amount</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Disbursed A...</th>
                                            <th style={{ padding: '0.5rem' }}>Pay Mode</th>
                                            <th style={{ padding: '0.5rem' }}>Cheque No.</th>
                                            <th style={{ padding: '0.5rem' }}>Cheque Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Empty state for the screenshot UI */}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Account No & RD Dues Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem', alignItems: 'start' }}>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '90px', marginBottom: 0 }}>Account No.:</label>
                                <select className="pc-select" value={form.accountNo} onChange={e => set('accountNo', e.target.value)}>
                                    <option value="">Select Account No.</option>
                                </select>
                            </div>

                            <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ background: '#334155', color: 'white', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>RD Dues</div>
                                <div style={{ overflowX: 'auto', minHeight: '100px' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                <th style={{ padding: '0.4rem', textAlign: 'center' }}>EMI NO.</th>
                                                <th style={{ padding: '0.4rem', textAlign: 'center' }}>Month</th>
                                                <th style={{ padding: '0.4rem', textAlign: 'right' }}>Instalme...</th>
                                                <th style={{ padding: '0.4rem', textAlign: 'right' }}>Penalty</th>
                                                <th style={{ padding: '0.4rem', textAlign: 'right' }}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Empty rows as per screenshot */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Info Ribbon */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#334155', padding: '0 1rem' }}>
                            <span>TRReceipt No.:</span>
                            <span>Receipt Amount:</span>
                            <span>Total:</span>
                        </div>

                        {/* Entries Section */}
                        <div className="pc-divider"></div>
                        <h3 className="pc-section-title">Entries</h3>
                        <div className="pc-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', alignItems: 'center' }}>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '100px', marginBottom: 0 }}>EMI Amount:*</label>
                                <input className="pc-input" placeholder="Enter EMI amount" value={form.emiAmount} onChange={e => set('emiAmount', e.target.value.replace(/\D/g, ''))} style={{ flex: 1 }} />
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '80px', marginBottom: 0, textAlign: 'right', paddingRight: '10px' }}>Late Fee :</label>
                                <input className="pc-input" placeholder="Enter Penal interest" value={form.lateFee} onChange={e => set('lateFee', e.target.value.replace(/\D/g, ''))} style={{ flex: 1 }} />
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '120px', marginBottom: 0, textAlign: 'right', paddingRight: '10px' }}>Total Amount:</label>
                                <input className="pc-input" value={Number(form.emiAmount || 0) + Number(form.lateFee || 0) || ''} readOnly style={{ background: '#f1f5f9', fontWeight: 700, color: '#009BB0', flex: 1 }} />
                            </div>
                        </div>
                        <div className="pc-grid-full" style={{ marginTop: '1rem' }}>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <label className="pc-label" style={{ width: '100px', marginBottom: 0, marginTop: '8px' }}>Narration:*</label>
                                <textarea className="pc-input" placeholder="Enter Narration" value={form.narration} onChange={e => set('narration', e.target.value)} style={{ minHeight: '60px', resize: 'vertical', flex: 1 }} required />
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div style={{ border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '8px', position: 'relative', background: '#fafafa', marginTop: '1.5rem' }}>
                            <div style={{ position: 'absolute', top: '-10px', left: '15px', background: 'white', padding: '0 5px', fontSize: '0.9rem', fontWeight: 800, color: '#005f73' }}>
                                Payment Details
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Mode of payment :</div>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        {['Cash', 'Cheque', 'Swipe'].map(mode => (
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

                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                                    No.Of Cheques : {form.noOfCheques || ''}
                                </div>
                            </div>

                            {needsBankDetails && (
                                <div className="pc-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '600px', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label className="pc-label" style={{ width: '100px', marginBottom: 0 }}>Bank name:</label>
                                        <input className="pc-input" placeholder="Enter Bank name" value={form.bankName} onChange={e => set('bankName', e.target.value)} />
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

                    </div>
                </div>

                <div className="pc-actions" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button type="submit" className="pc-btn primary">
                        <Save size={16} /> Save
                    </button>
                    <button type="button" className="pc-btn secondary" onClick={() => window.location.reload()}>
                        <RefreshCcw size={16} /> Refresh
                    </button>
                </div>
            </form>
        </div>
    );
}

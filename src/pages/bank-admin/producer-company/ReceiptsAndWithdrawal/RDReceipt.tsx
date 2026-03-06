import { useState } from 'react';
import { Save, RefreshCcw } from 'lucide-react';
import '../producer.css';

export default function RDReceipt() {
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        memberType: 'MEMBER',
        rdNo: '',
        maturityDate: '',
        instalmentDate: '',
        emiAmount: '',
        lateFee: '',
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
                    <h1>Recurring Deposit Receipt</h1>
                    <p>Process RD installments and late fees.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pc-card">
                    <div className="pc-form">

                        {/* Top Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.5fr)', gap: '2rem', alignItems: 'start' }}>
                            <div className="pc-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
                                <div className="pc-field">
                                    <label className="pc-label">Date :</label>
                                    <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} required />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Member Type :</label>
                                    <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)}>
                                        <option>MEMBER</option>
                                        <option>ASSOCIATE MEMBER</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">RD No. :</label>
                                    <select className="pc-select" value={form.rdNo} onChange={e => set('rdNo', e.target.value)}>
                                        <option value="">Select RD No</option>
                                        <option value="MSRDMGC00001">MSRDMGC00001_VULLAS PADMAVATHI</option>
                                    </select>
                                </div>
                            </div>

                            {/* Dues Table */}
                            <div style={{ flex: '2', minWidth: '400px' }}>
                                <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ background: '#334155', color: 'white', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>Dues</div>
                                    <div style={{ overflowX: 'auto' }}>
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
                                                {form.rdNo ? (
                                                    // Placeholder data when RD is selected
                                                    <>
                                                        <tr>
                                                            <td style={{ padding: '0.4rem', textAlign: 'center' }}>8</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'center' }}>22-12-2025</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>4,000.00</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>360.00</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>4,360.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: '0.4rem', textAlign: 'center' }}>9</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'center' }}>22-01-2026</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>4,000.00</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>240.00</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>4,240.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: '0.4rem', textAlign: 'center' }}>10</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'center' }}>22-02-2026</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>4,000.00</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>0.00</td>
                                                            <td style={{ padding: '0.4rem', textAlign: 'right' }}>4,000.00</td>
                                                        </tr>
                                                    </>
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8' }}>Select RD No. to view dues</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pc-divider"></div>
                        <h3 className="pc-section-title">Recurring Deposit Details</h3>
                        <div className="pc-grid" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '1.5rem' }}>
                            <div className="pc-field">
                                <label className="pc-label">Customer Name :</label>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>{form.rdNo ? 'VULLAS PADMAVATHI' : '-'}</div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Deposit Date :</label>
                                <div style={{ fontSize: '0.9rem', color: '#334155' }}>{form.rdNo ? '22-May-2025' : '-'}</div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Date :</label>
                                <input className="pc-input" value={form.rdNo ? '22-May-2028' : ''} readOnly style={{ background: '#f1f5f9' }} />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Deposit Amount :</label>
                                <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>{form.rdNo ? '₹ 1,44,000.00' : '-'}</div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Instalment Mode :</label>
                                <div style={{ fontSize: '0.9rem', color: '#334155' }}>{form.rdNo ? 'Monthly' : '-'}</div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Instalment Amount :</label>
                                <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>{form.rdNo ? '₹ 4,000.00' : '-'}</div>
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Guardian Name :</label>
                                <div style={{ fontSize: '0.9rem', color: '#334155' }}>-</div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Introducer Code :</label>
                                <div style={{ fontSize: '0.9rem', color: '#334155' }}>-</div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Introducer Name :</label>
                                <div style={{ fontSize: '0.9rem', color: '#334155' }}>-</div>
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Period (Months) :</label>
                                <div style={{ fontSize: '0.9rem', color: '#334155' }}>{form.rdNo ? '36' : '-'}</div>
                            </div>
                        </div>

                        <div className="pc-divider"></div>
                        <h3 className="pc-section-title">Entries</h3>
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">EMI amount:</label>
                                <input className="pc-input" placeholder="0.00" style={{ textAlign: 'right' }} value={form.emiAmount} onChange={e => set('emiAmount', e.target.value.replace(/\D/g, ''))} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Late Fee (Till date):</label>
                                <input className="pc-input" placeholder="0.00" style={{ textAlign: 'right' }} value={form.lateFee} onChange={e => set('lateFee', e.target.value.replace(/\D/g, ''))} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Total amount:</label>
                                <input className="pc-input" style={{ textAlign: 'right', background: '#f1f5f9', fontWeight: 700, color: '#009BB0' }} value={Number(form.emiAmount || 0) + Number(form.lateFee || 0) || '0.00'} readOnly />
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
                            <div className="pc-grid" style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
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

                        {/* Last Transactions Table */}
                        <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', marginTop: '1.5rem' }}>
                            <div style={{ background: '#334155', color: 'white', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>Last Transactions</div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '0.5rem', textAlign: 'left' }}>RD NO.</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Customer Name</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'center' }}>Date</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Instalment A...</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Penalty Amount</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {form.rdNo ? (
                                            <>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '0.5rem' }}>MSRDMGC00001</td>
                                                    <td style={{ padding: '0.5rem' }}>VULLAS PADMAVATHI</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>25/11/2025</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>12,000.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>0.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>12,000.00</td>
                                                </tr>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '0.5rem' }}>MSRDMGC00001</td>
                                                    <td style={{ padding: '0.5rem' }}>VULLAS PADMAVATHI</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>11/08/2025</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>0.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                </tr>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '0.5rem' }}>MSRDMGC00001</td>
                                                    <td style={{ padding: '0.5rem' }}>VULLAS PADMAVATHI</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>03/07/2025</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>0.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                </tr>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '0.5rem' }}>MSRDMGC00001</td>
                                                    <td style={{ padding: '0.5rem' }}>VULLAS PADMAVATHI</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>09/06/2025</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>0.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '0.5rem' }}>MSRDMGC00001</td>
                                                    <td style={{ padding: '0.5rem' }}>VULLAS PADMAVATHI</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>22/05/2025</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>0.00</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>4,000.00</td>
                                                </tr>
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Select an RD No. to view transactions</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

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

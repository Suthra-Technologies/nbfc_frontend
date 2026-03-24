import { useState, useEffect } from 'react';
import { Save, RefreshCcw, Landmark, CreditCard, ChevronRight, Info, FileText } from 'lucide-react';
import '../producer.css';

export default function RDReceipt() {
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        memberType: 'Select Member Type',
        rdNo: 'Select RD No.',
        maturityDate: '',
        instalmentAmount: '',
        emiAmount: '',
        lateFee: '',
        totalAmount: '',
        narration: '',
        paymentMode: 'Cash',
        bankName: '',
        branch: '',
        chequeNo: '',
        chequeDate: new Date().toISOString().split('T')[0]
    });

    // Auto-calculate total amount
    useEffect(() => {
        const emi = parseFloat(form.emiAmount) || 0;
        const fee = parseFloat(form.lateFee) || 0;
        setForm(f => ({ ...f, totalAmount: (emi + fee).toFixed(2) }));
    }, [form.emiAmount, form.lateFee]);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('RD Receipt successfully processed!');
    };

    const needsBankDetails = ['Cheque', 'Transfer'].includes(form.paymentMode);

    return (
        <div className="pc-container" style={{ minHeight: '100vh', padding: '1rem', background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)' }}>

            {/* Action Bar Header */}
            <div className="pc-header" style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                boxShadow: '0 4px 15px -1px rgba(0, 0, 0, 0.05)',
                marginBottom: '1rem',
                border: '1px solid white'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="pc-card-icon" style={{ borderRadius: '8px', padding: '0.5rem', background: 'linear-gradient(45deg, #009BB0, #00a3ad)' }}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Recurring Deposit Receipt</h1>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Efficiently process RD installments and penalties.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" onClick={handleSubmit} className="pc-action-btn primary" style={{ height: '36px', padding: '0 1.25rem', borderRadius: '8px', background: 'linear-gradient(to right, #009BB0, #00a3ad)', transition: 'all 0.3s ease' }}>
                        <Save size={16} /> Save Receipt
                    </button>
                    <button type="button" onClick={() => window.location.reload()} className="pc-action-btn secondary" style={{ height: '36px', padding: '0 1rem', borderRadius: '8px', transition: 'all 0.3s ease' }}>
                        <RefreshCcw size={16} /> Reset
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 2fr', gap: '1rem', marginBottom: '1rem' }}>

                    {/* Identification Card */}
                    <div className="pc-card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                            <div className="pc-field">
                                <label className="pc-label" style={{ color: '#64748b', fontWeight: 800, fontSize: '0.65rem' }}>Current Date</label>
                                <input type="date" className="pc-input" style={{ fontSize: '0.85rem', fontWeight: 600, border: '1px solid #e2e8f0', padding: '0.5rem', height: '34px' }} value={form.date} onChange={e => set('date', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label" style={{ color: '#64748b', fontWeight: 800, fontSize: '0.65rem' }}>Member Category</label>
                                <select className="pc-select" style={{ fontSize: '0.85rem', fontWeight: 600, border: '1px solid #e2e8f0', padding: '0.25rem 0.5rem', height: '34px' }} value={form.memberType} onChange={e => set('memberType', e.target.value)}>
                                    <option>Select Member Type</option>
                                    <option>MEMBER</option>
                                    <option>ASSOCIATE MEMBER</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label" style={{ color: '#64748b', fontWeight: 800, fontSize: '0.65rem' }}>Select RD Account</label>
                                <select className="pc-select" style={{ fontSize: '0.85rem', fontWeight: 600, border: '1px solid #e2e8f0', padding: '0.25rem 0.5rem', height: '34px', background: '#f8fafc' }} value={form.rdNo} onChange={e => set('rdNo', e.target.value)}>
                                    <option>Select RD No.</option>
                                    <option>MSRD00123 - John Doe</option>
                                    <option>MSRD00456 - Alice Smith</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Dues Tracking Panel */}
                    <div className="pc-card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', background: 'white' }}>
                        <div style={{ background: 'linear-gradient(to right, #009BB0, #00a3ad)', color: 'white', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CreditCard size={16} /> Pending Installments (Dues)
                            </span>
                        </div>
                        <div style={{ height: '140px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <th style={{ padding: '0.6rem', textAlign: 'center', fontWeight: 700, color: '#64748b' }}>EMI NO.</th>
                                        <th style={{ padding: '0.6rem', textAlign: 'center', fontWeight: 700, color: '#64748b' }}>Due Month</th>
                                        <th style={{ padding: '0.6rem', textAlign: 'right', fontWeight: 700, color: '#64748b' }}>Amount</th>
                                        <th style={{ padding: '0.6rem', textAlign: 'right', fontWeight: 700, color: '#64748b' }}>Penalty</th>
                                        <th style={{ padding: '0.6rem', textAlign: 'right', fontWeight: 700, color: '#64748b', paddingRight: '1rem' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>12</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>Sept 2025</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right' }}>500.00</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right' }}>50.00</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', paddingRight: '1rem', fontWeight: 700 }}>550.00</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>13</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>Oct 2025</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right' }}>500.00</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right' }}>0.00</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', paddingRight: '1rem', fontWeight: 700 }}>500.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ padding: '0.75rem 1.5rem', background: '#f1f5f9', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
                            <span style={{ color: '#64748b', fontWeight: 600, fontSize: '0.8rem' }}>Aggregate Dues: </span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#009BB0' }}>₹ 1,050.00</span>
                        </div>
                    </div>
                </div>

                {/* Account Details Section */}
                <div className="pc-card" style={{ borderRadius: '12px', padding: '1.5rem', background: '#fff', border: '1px solid #e2e8f0', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                        <Info size={18} className="text-teal-600" />
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RD Master Details</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem 2rem' }}>
                        <div className="pc-field">
                            <label className="pc-label">Customer Name</label>
                            <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>John Wick Doe</div>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Opening Date</label>
                            <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>01-Jan-2024</div>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Maturity Date</label>
                            <input className="pc-input" style={{ height: '36px', borderRadius: '6px', fontWeight: 600 }} value={form.maturityDate} placeholder="e.g. 01-Jan-2026" onChange={e => set('maturityDate', e.target.value)} />
                        </div>

                        <div className="pc-field">
                            <label className="pc-label">Booking Amount</label>
                            <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#009BB0' }}>₹ 12,000.00</div>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Payment Mode</label>
                            <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Monthly</div>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Instalment Amount</label>
                            <input className="pc-input" style={{ height: '36px', borderRadius: '6px', fontWeight: 700, color: '#0f172a' }} value={form.instalmentAmount} placeholder="₹ 500.00" onChange={e => set('instalmentAmount', e.target.value)} />
                        </div>

                        <div className="pc-field">
                            <label className="pc-label">Guardian / Relation</label>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>None Specified</div>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Introducer Details</label>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>INT009 - Branch Manager</div>
                        </div>
                        <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', background: '#ecfdf5', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                            <label className="pc-label" style={{ color: '#059669', marginBottom: 0 }}>Term (Months):</label>
                            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#065f46' }}>24</span>
                        </div>
                    </div>
                </div>

                {/* Entry & Payment Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                    <div className="pc-card" style={{ borderRadius: '12px', padding: '1.5rem', background: 'white', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                            <ChevronRight size={18} className="text-teal-600" />
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Transaction Entry</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div className="pc-field">
                                <label className="pc-label">EMI Base</label>
                                <input className="pc-input" placeholder="0.00" style={{ height: '38px', borderRadius: '8px', border: '1.5px solid #e2e8f0', textAlign: 'right', fontWeight: 700 }} value={form.emiAmount} onChange={e => set('emiAmount', e.target.value.replace(/\D/g, ''))} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Late Fee / Panelty</label>
                                <input className="pc-input" placeholder="0.00" style={{ height: '38px', borderRadius: '8px', border: '1.5px solid #e2e8f0', textAlign: 'right', color: '#ef4444', fontWeight: 700 }} value={form.lateFee} onChange={e => set('lateFee', e.target.value.replace(/\D/g, ''))} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label" style={{ color: '#009BB0' }}>Total Amount</label>
                                <input className="pc-input" style={{ height: '38px', borderRadius: '8px', background: '#f0fdfa', border: '1.5px solid #009BB0', textAlign: 'right', fontWeight: 900, fontSize: '1rem', color: '#009BB0' }} value={`₹ ${form.totalAmount}`} readOnly />
                            </div>
                        </div>

                        <div className="pc-field">
                            <label className="pc-label">Remarks / Narration</label>
                            <textarea className="pc-input" placeholder="Describe the transaction..." style={{ minHeight: '80px', borderRadius: '8px', padding: '0.75rem', fontSize: '0.85rem' }} value={form.narration} onChange={e => set('narration', e.target.value)} />
                        </div>
                    </div>

                    <div className="pc-card" style={{ borderRadius: '12px', padding: '1.5rem', background: 'white', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                            <Landmark size={18} className="text-teal-600" />
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Mode</h3>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {['Cash', 'Cheque', 'Transfer', 'Direct'].map(mode => (
                                <label key={mode} style={{
                                    flex: '1',
                                    minWidth: '70px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 0.5rem',
                                    borderRadius: '10px',
                                    border: form.paymentMode === mode ? '2px solid #009BB0' : '1px solid #e2e8f0',
                                    background: form.paymentMode === mode ? '#f0fdfa' : '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}>
                                    <input
                                        type="radio"
                                        name="paymentMode"
                                        value={mode}
                                        checked={form.paymentMode === mode}
                                        onChange={e => set('paymentMode', e.target.value)}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: form.paymentMode === mode ? '#009BB0' : '#64748b' }}>{mode.toUpperCase()}</span>
                                </label>
                            ))}
                        </div>

                        {needsBankDetails && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', animation: 'fadeIn 0.3s ease' }}>
                                <div className="pc-field">
                                    <input className="pc-input" placeholder="Bank Name" style={{ borderRadius: '6px' }} value={form.bankName} onChange={e => set('bankName', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <input className="pc-input" placeholder="Branch" style={{ borderRadius: '6px' }} value={form.branch} onChange={e => set('branch', e.target.value)} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <input className="pc-input" placeholder="Ref/Chq No." style={{ borderRadius: '6px' }} value={form.chequeNo} onChange={e => set('chequeNo', e.target.value)} />
                                    <input type="date" className="pc-input" style={{ borderRadius: '6px' }} value={form.chequeDate} onChange={e => set('chequeDate', e.target.value)} />
                                </div>
                            </div>
                        )}

                        {!needsBankDetails && (
                            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #e2e8f0' }}>
                                <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>Processing via Cash (櫃檯收款)</p>
                            </div>
                        )}
                    </div>
                </div>
            </form>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .pc-input:focus {
                    border-color: #009BB0 !important;
                    box-shadow: 0 0 0 3px rgba(0, 155, 176, 0.1) !important;
                }
            `}</style>
        </div>
    );
}

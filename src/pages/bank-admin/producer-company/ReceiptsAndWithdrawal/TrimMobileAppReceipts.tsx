import { useState } from 'react';
import { Save, RefreshCcw } from 'lucide-react';
import '../producer.css';

export default function TrimMobileAppReceipts() {
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        receiptType: 'Select',
        accountNo: 'Select Account No.',
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

    const sectionBorderStyle = '2px solid #009BB0';

    const headerStyle: React.CSSProperties = {
        background: '#009BB0',
        color: 'white',
        padding: '0.35rem 0.75rem',
        fontSize: '0.65rem',
        fontWeight: 700,
        borderRadius: '2px 2px 0 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        textTransform: 'uppercase'
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '0.6rem',
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase',
        marginBottom: '0.15rem'
    };

    const inputStyle: React.CSSProperties = {
        fontSize: '0.75rem',
        padding: '0.25rem 0.5rem',
        height: '30px',
        border: '1.5px solid #cbd5e1',
        borderRadius: '3px'
    };

    const tableHeaderStyle: React.CSSProperties = {
        padding: '0.5rem 0.4rem',
        fontSize: '0.65rem',
        textAlign: 'left',
        color: '#334155',
        fontWeight: 700,
        borderBottom: '2px solid #009BB0',
        borderRight: '1px solid #e2e8f0',
        background: '#f8fafc'
    };

    const tableCellStyle: React.CSSProperties = {
        padding: '0.4rem',
        fontSize: '0.75rem',
        borderBottom: '1px solid #e2e8f0',
        borderRight: '1px solid #e2e8f0',
        color: '#475569',
        height: '28px'
    };

    const renderEmptyRows = (count: number, colSpan: number) => {
        return Array.from({ length: count }).map((_, i) => (
            <tr key={i}>
                {Array.from({ length: colSpan }).map((_, j) => (
                    <td key={j} style={tableCellStyle}>&nbsp;</td>
                ))}
            </tr>
        ));
    };

    return (
        <div className="pc-container" style={{ maxWidth: '1400px', backgroundColor: '#fff', padding: '1rem' }}>
            {/* Header Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                <button type="submit" form="receipt-form" className="pc-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
                    <Save size={14} /> Save
                </button>
                <button type="button" className="pc-btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.75rem' }} onClick={() => window.location.reload()}>
                    <RefreshCcw size={14} /> Refresh
                </button>
            </div>

            <form id="receipt-form" onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Top Filters */}
                    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <label style={{ ...labelStyle, margin: 0 }}>Date:</label>
                            <input type="date" className="pc-input" style={{ ...inputStyle, width: '140px' }} value={form.date} onChange={e => set('date', e.target.value)} required />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <label style={{ ...labelStyle, margin: 0 }}>Receipt Type:</label>
                            <select className="pc-select" style={{ ...inputStyle, width: '280px' }} value={form.receiptType} onChange={e => set('receiptType', e.target.value)}>
                                <option>Select</option>
                                <option>Trim Receipt</option>
                                <option>Mobile App Receipt</option>
                            </select>
                        </div>
                    </div>

                    {/* Trim Receipts Section */}
                    <div style={{ border: sectionBorderStyle, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={headerStyle}>Trim Receipts</div>
                        <div style={{ overflowX: 'auto', maxHeight: '300px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Tr No.</th>
                                        <th style={tableHeaderStyle}>Tr Date</th>
                                        <th style={tableHeaderStyle}>Loan Id</th>
                                        <th style={tableHeaderStyle}>Applicant Name</th>
                                        <th style={tableHeaderStyle}>Mobile No.</th>
                                        <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Receipt Amount</th>
                                        <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Disbursed Amt</th>
                                        <th style={tableHeaderStyle}>Pay Mode</th>
                                        <th style={tableHeaderStyle}>Cheque No.</th>
                                        <th style={{ ...tableHeaderStyle, borderRight: 'none' }}>Cheque Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderEmptyRows(8, 10)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Account No & RD Dues Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Account No.:</label>
                            <select className="pc-select" style={{ ...inputStyle, width: '100%' }} value={form.accountNo} onChange={e => set('accountNo', e.target.value)}>
                                <option>Select Account No.</option>
                            </select>
                        </div>

                        <div style={{ border: sectionBorderStyle, borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={headerStyle}>RD Dues</div>
                            <div style={{ overflowX: 'auto', maxHeight: '200px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
                                    <thead>
                                        <tr>
                                            <th style={tableHeaderStyle}>EMI NO.</th>
                                            <th style={tableHeaderStyle}>Month</th>
                                            <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Instalment</th>
                                            <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Penalty</th>
                                            <th style={{ ...tableHeaderStyle, textAlign: 'right', borderRight: 'none' }}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderEmptyRows(5, 5)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Info Ribbon */}
                    <div style={{ display: 'flex', gap: '5rem', padding: '0.75rem 1rem', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#64748b' }}>TR Receipt No.:</span> -</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#64748b' }}>Receipt Amount:</span> 0.00</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#64748b' }}>Total:</span> 0.00</div>
                    </div>

                    {/* Double Column for Entries and Payment Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Entries Section */}
                        <div style={{ border: sectionBorderStyle, borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={headerStyle}>Entries</div>
                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <label style={labelStyle}>EMI Amount:*</label>
                                        <input className="pc-input" style={inputStyle} placeholder="0.00" value={form.emiAmount} onChange={e => set('emiAmount', e.target.value.replace(/\D/g, ''))} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <label style={labelStyle}>Late Fee:</label>
                                        <input className="pc-input" style={inputStyle} placeholder="0.00" value={form.lateFee} onChange={e => set('lateFee', e.target.value.replace(/\D/g, ''))} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <label style={labelStyle}>Total Amount:</label>
                                    <input className="pc-input" style={{ ...inputStyle, background: '#f1f5f9', fontWeight: 700, color: '#009BB0' }} value={Number(form.emiAmount || 0) + Number(form.lateFee || 0) || '0.00'} readOnly />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <label style={labelStyle}>Narration:*</label>
                                    <textarea className="pc-input" style={{ ...inputStyle, minHeight: '70px', height: 'auto', resize: 'vertical' }} placeholder="Enter Narration" value={form.narration} onChange={e => set('narration', e.target.value)} required />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details Section */}
                        <div style={{ border: sectionBorderStyle, borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={headerStyle}>Payment Details</div>
                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <label style={{ ...labelStyle, margin: 0 }}>Mode of payment:</label>
                                    <div style={{ display: 'flex', gap: '1.25rem' }}>
                                        {['Cash', 'Cheque', 'Swipe'].map(mode => (
                                            <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    name="paymentMode"
                                                    value={mode}
                                                    checked={form.paymentMode === mode}
                                                    onChange={e => set('paymentMode', e.target.value)}
                                                    style={{ accentColor: '#009BB0', width: '15px', height: '15px' }}
                                                />
                                                {mode}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {needsBankDetails ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <label style={labelStyle}>Bank name:</label>
                                            <input className="pc-input" style={inputStyle} placeholder="Bank name" value={form.bankName} onChange={e => set('bankName', e.target.value)} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <label style={labelStyle}>Branch:</label>
                                            <input className="pc-input" style={inputStyle} placeholder="Branch" value={form.branch} onChange={e => set('branch', e.target.value)} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <label style={labelStyle}>Cheque No.:</label>
                                            <input className="pc-input" style={inputStyle} placeholder="Cheque No." value={form.chequeNo} onChange={e => set('chequeNo', e.target.value)} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <label style={labelStyle}>Date:</label>
                                            <input type="date" className="pc-input" style={inputStyle} value={form.chequeDate} onChange={e => set('chequeDate', e.target.value)} />
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.75rem', border: '1px dashed #e2e8f0', borderRadius: '4px', padding: '1rem' }}>
                                        No further details required for {form.paymentMode} mode
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

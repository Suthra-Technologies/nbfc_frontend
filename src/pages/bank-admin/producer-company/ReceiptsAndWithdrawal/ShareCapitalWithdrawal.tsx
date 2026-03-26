import { useState } from 'react';
import { Save, XCircle } from 'lucide-react';
import '../producer.css';

export default function ShareCapitalWithdrawal() {
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        shareId: 'Select Share Id',
        customerName: '',
        membershipId: '',
        sharesEachOf: '',
        mobileNo: '',
        noOfSharesHeld: '',
        totalAmount: '',
        paidAmount: '',
        narration: '',
        paymentMode: 'Cash',
        bankName: '',
        chequeNo: ''
    });

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const needsInnerBox = form.paymentMode === 'Cheque' || form.paymentMode === 'Adjustment';

    const handleClear = () => {
        setForm({
            date: new Date().toISOString().split('T')[0],
            shareId: 'Select Share Id',
            customerName: '',
            membershipId: '',
            sharesEachOf: '',
            mobileNo: '',
            noOfSharesHeld: '',
            totalAmount: '',
            paidAmount: '',
            narration: '',
            paymentMode: 'Cash',
            bankName: '',
            chequeNo: ''
        });
    };

    const sectionBorderStyle = '2px solid #009BB0';

    const cardHeaderStyle: React.CSSProperties = {
        background: '#009BB0',
        color: 'white',
        padding: '0.35rem 0.75rem',
        fontSize: '0.65rem',
        fontWeight: 700,
        borderRadius: '2px 2px 0 0',
        textTransform: 'uppercase'
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '0.6rem',
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase',
        marginBottom: '0.15rem',
        display: 'block'
    };

    const inputStyle: React.CSSProperties = {
        fontSize: '0.75rem',
        padding: '0.25rem 0.5rem',
        height: '30px',
        border: '1.5px solid #cbd5e1',
        borderRadius: '3px',
        width: '100%'
    };

    return (
        <div className="pc-container" style={{ maxWidth: '1200px', backgroundColor: '#fff', padding: '1.5rem' }}>
            <form onSubmit={e => { e.preventDefault(); alert('Withdrawal saved!'); }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Top Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <label style={{ ...labelStyle, margin: 0, width: '80px' }}>Date :</label>
                            <input type="date" className="pc-input" style={{ ...inputStyle, width: '160px' }} value={form.date} onChange={e => set('date', e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <label style={{ ...labelStyle, margin: 0, width: '80px' }}>Share Ids :</label>
                            <select className="pc-select" style={{ ...inputStyle, width: '320px' }} value={form.shareId} onChange={e => set('shareId', e.target.value)}>
                                <option>Select Share Id</option>
                            </select>
                        </div>
                    </div>

                    {/* Member Details Card */}
                    <div style={{ border: sectionBorderStyle, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={cardHeaderStyle}>Member Details</div>
                        <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                            <div className="pc-field">
                                <label style={labelStyle}>Customer Name :</label>
                                <input className="pc-input" style={inputStyle} value={form.customerName} readOnly />
                            </div>
                            <div className="pc-field">
                                <label style={labelStyle}>MemberShipId :</label>
                                <input className="pc-input" style={inputStyle} value={form.membershipId} readOnly />
                            </div>
                            <div className="pc-field">
                                <label style={labelStyle}>Shares Each Of :</label>
                                <input className="pc-input" style={inputStyle} value={form.sharesEachOf} readOnly />
                            </div>
                            <div className="pc-field">
                                <label style={labelStyle}>Mobile No. :</label>
                                <input className="pc-input" style={inputStyle} value={form.mobileNo} readOnly />
                            </div>
                            <div className="pc-field">
                                <label style={labelStyle}>No. Of Shares Held :</label>
                                <input className="pc-input" style={inputStyle} value={form.noOfSharesHeld} readOnly />
                            </div>
                            <div className="pc-field">
                                <label style={labelStyle}>Total Amount :</label>
                                <input className="pc-input" style={inputStyle} value={form.totalAmount} readOnly />
                            </div>
                            <div className="pc-field">
                                <label style={labelStyle}>Paid Amount :</label>
                                <input className="pc-input" style={inputStyle} value={form.paidAmount} readOnly />
                            </div>
                            <div className="pc-field" style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Narration:</label>
                                <textarea className="pc-input" style={{ ...inputStyle, height: '60px', resize: 'none' }} placeholder="Enter Narration" value={form.narration} onChange={e => set('narration', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Payment Details Card */}
                    <div style={{ border: sectionBorderStyle, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={cardHeaderStyle}>Payment Details</div>
                        <div style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                                <label style={{ ...labelStyle, margin: 0 }}>Mode of payment :</label>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    {['Cash', 'Cheque', 'Adjustment'].map(mode => (
                                        <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                value={mode}
                                                checked={form.paymentMode === mode}
                                                onChange={e => set('paymentMode', e.target.value)}
                                                style={{ accentColor: '#009BB0' }}
                                            />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {needsInnerBox && (
                                <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '1rem', width: '350px' }}>
                                    <div style={{ borderBottom: '1px solid #cbd5e1', marginBottom: '1rem', fontSize: '0.65rem', fontWeight: 700, color: '#64748b', paddingBottom: '0.25rem' }}>
                                        Cheque/Neft
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <label style={{ ...labelStyle, margin: 0, width: '100px' }}>Bank name:</label>
                                            <select className="pc-select" style={inputStyle} value={form.bankName} onChange={e => set('bankName', e.target.value)}>
                                                <option>Select Bank name</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <label style={{ ...labelStyle, margin: 0, width: '100px' }}>Cheque No.:</label>
                                            <select className="pc-select" style={inputStyle} value={form.chequeNo} onChange={e => set('chequeNo', e.target.value)}>
                                                <option>Select Cheque No.</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                        <button type="submit" className="pc-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#475569' }}>
                            <Save size={14} /> Save
                        </button>
                        <button type="button" className="pc-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#475569' }} onClick={handleClear}>
                            <XCircle size={14} /> Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
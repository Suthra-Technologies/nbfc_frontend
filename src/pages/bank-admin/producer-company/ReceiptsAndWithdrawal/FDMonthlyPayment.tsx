import { useState, useMemo } from 'react';
import '../producer.css';

interface InterestPayment {
    id: string;
    date: string;
    customerName: string;
    fdId: string;
    depositDate: string;
    mode: string;
    period: string;
    amount: number;
    interest: number;
    introducer: string;
    savingsAc: string;
    jointAc: string;
}

const MOCK_DATA: InterestPayment[] = [
    { id: '1', date: '01-Mar-2026', customerName: 'John Doe', fdId: 'FD00123', depositDate: '01-Jan-2024', mode: 'Monthly', period: '24m', amount: 50000, interest: 450.00, introducer: 'INT001', savingsAc: 'SB1001', jointAc: '-' },
    { id: '2', date: '01-Apr-2026', customerName: 'John Doe', fdId: 'FD00123', depositDate: '01-Jan-2024', mode: 'Monthly', period: '24m', amount: 50000, interest: 450.00, introducer: 'INT001', savingsAc: 'SB1001', jointAc: '-' },
    { id: '3', date: '01-May-2026', customerName: 'John Doe', fdId: 'FD00123', depositDate: '01-Jan-2024', mode: 'Monthly', period: '24m', amount: 50000, interest: 450.00, introducer: 'INT001', savingsAc: 'SB1001', jointAc: '-' },
];

export default function FDMonthlyPayment() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [paidDate, setPaidDate] = useState(new Date().toISOString().split('T')[0]);
    const [fdId, setFdId] = useState('');
    const [bankName, setBankName] = useState('');
    const [branch, setBranch] = useState('');
    const [chequeNo, setChequeNo] = useState('');
    const [chequeDate, setChequeDate] = useState('');

    const totalPayable = useMemo(() => {
        return MOCK_DATA
            .filter(item => selectedIds.includes(item.id))
            .reduce((sum, item) => sum + item.interest, 0);
    }, [selectedIds]);

    const toggleSelectAll = () => {
        if (selectedIds.length === MOCK_DATA.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(MOCK_DATA.map(i => i.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedIds.length === 0) {
            alert('Please select at least one interest payment.');
            return;
        }
        alert(`Payment of ₹${totalPayable.toFixed(2)} processed successfully!`);
    };

    const isNonCash = ['Cheque', 'Neft', 'Transfer'].includes(paymentMode);

    const tealColor = '#008B9B';

    return (
        <div className="pc-container" style={{ minHeight: '100vh', padding: '10px', background: '#e2e8f0', fontFamily: 'Arial, sans-serif' }}>
            
            {/* Header / Selection Area */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '15px 0', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#000', whiteSpace: 'nowrap' }}>FD ID.:</label>
                <div style={{ position: 'relative', width: '250px' }}>
                    <select 
                        className="pc-select" 
                        style={{ width: '100%', height: '28px', padding: '0 5px', border: '1px solid #999', fontSize: '0.75rem', color: '#000', backgroundColor: '#fff' }}
                        value={fdId} 
                        onChange={e => setFdId(e.target.value)}
                    >
                        <option value="">Select FD ID.</option>
                        <option value="FD00123">FD00123 - John Doe</option>
                    </select>
                </div>
            </div>

            {/* Interest Payments Data Table Section */}
            <div style={{ background: 'white', border: '1px solid #999', padding: '2px', marginBottom: '15px' }}>
                <div style={{ overflowX: 'auto', maxHeight: '300px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#cbd5e1', borderBottom: '1px solid #999' }}>
                                <th style={{ padding: '6px', border: '1px solid #999', width: '30px', textAlign: 'center' }}>
                                    <input type="checkbox" checked={selectedIds.length === MOCK_DATA.length && MOCK_DATA.length > 0} onChange={toggleSelectAll} />
                                </th>
                                {['Date', 'Customer Name', 'FD ID', 'Deposit Date', 'Payment Mode', 'Period', 'Deposit Amount', 'Payable Interest', 'Introducer Code', 'Saving Account no', 'Joint Account no'].map(h => (
                                    <th key={h} style={{ padding: '6px', border: '1px solid #999', textAlign: 'left', color: '#000', fontWeight: 'bold', fontSize: '0.65rem' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '0.75rem', color: '#000' }}>
                            {MOCK_DATA.length > 0 ? MOCK_DATA.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ padding: '4px', border: '1px solid #999', textAlign: 'center' }}>
                                        <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                                    </td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.date}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.customerName}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.fdId}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.depositDate}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.mode}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.period}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999', textAlign: 'right' }}>{item.amount}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999', textAlign: 'right' }}>{item.interest.toFixed(2)}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.introducer}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.savingsAc}</td>
                                    <td style={{ padding: '4px', border: '1px solid #999' }}>{item.jointAc}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={12} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Total Amount Label */}
            <div style={{ textAlign: 'center', marginBottom: '15px', fontSize: '0.75rem', fontWeight: 'bold', color: '#000' }}>
                Total Amount: {totalPayable}
            </div>

            {/* Payment Details Box */}
            <div style={{ background: 'white', border: '1px solid #999', borderRadius: '2px', padding: '20px', position: 'relative', marginTop: '10px' }}>
                <span style={{ position: 'absolute', top: '-10px', left: '15px', background: 'white', padding: '0 8px', fontSize: '0.75rem', fontWeight: 'bold', color: '#000', border: '1px solid #999', borderRadius: '4px' }}>Payment Details</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#000' }}>Mode of payment :</label>
                    {['Cash', 'Cheque', 'Neft', 'Transfer'].map(mode => (
                        <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', cursor: 'pointer', color: '#000' }}>
                            <input type="radio" value={mode} checked={paymentMode === mode} onChange={e => setPaymentMode(e.target.value)} /> {mode}
                        </label>
                    ))}
                </div>

                <div style={{ border: '1px solid #999', padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 30px', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ width: '80px', fontSize: '0.6rem', textAlign: 'right', color: '#000', fontWeight: 'bold' }}>Bank name:</label>
                        <select 
                            className="pc-select"
                            style={{ flex: 1, height: '28px', border: '1px solid #999', color: '#000', backgroundColor: '#fff', padding: '0 5px', fontSize: '0.75rem' }}
                            value={bankName}
                            onChange={e => setBankName(e.target.value)}
                            disabled={!isNonCash}
                        >
                            <option value="">Select Bank name</option>
                            <option value="HDFC">HDFC Bank</option>
                            <option value="SBI">SBI Bank</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ width: '80px', fontSize: '0.6rem', textAlign: 'right', color: '#000', fontWeight: 'bold' }}>Branch:</label>
                        <input 
                            type="text" 
                            placeholder="Enter Branch" 
                            style={{ flex: 1, height: '28px', border: '1px solid #999', padding: '0 8px', color: '#000', backgroundColor: '#fff', fontSize: '0.75rem' }}
                            value={branch}
                            onChange={e => setBranch(e.target.value)}
                            disabled={!isNonCash}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ width: '80px', fontSize: '0.6rem', textAlign: 'right', color: '#000', fontWeight: 'bold' }}>Cheque No.:</label>
                        <select 
                            className="pc-select"
                            style={{ flex: 1, height: '28px', border: '1px solid #999', color: '#000', backgroundColor: '#fff', padding: '0 5px', fontSize: '0.75rem' }}
                            value={chequeNo}
                            onChange={e => setChequeNo(e.target.value)}
                            disabled={!isNonCash}
                        >
                            <option value="">Select Cheque No.</option>
                            <option value="CHQ001">CHQ001</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ width: '80px', fontSize: '0.6rem', textAlign: 'right', color: '#000', fontWeight: 'bold' }}>Date:</label>
                        <input 
                            type="date" 
                            style={{ flex: 1, height: '28px', border: '1px solid #999', padding: '0 8px', color: '#000', backgroundColor: '#fff', fontSize: '0.75rem' }}
                            value={chequeDate}
                            onChange={e => setChequeDate(e.target.value)}
                            disabled={!isNonCash}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px', padding: '15px 0', borderTop: '1px solid #999', backgroundColor: '#cbd5e1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#000' }}>Paid Date:</label>
                    <input 
                        type="date" 
                        style={{ height: '28px', border: '1px solid #999', padding: '0 8px', color: '#000', backgroundColor: '#fff', fontSize: '0.75rem' }}
                        value={paidDate} 
                        onChange={e => setPaidDate(e.target.value)} 
                    />
                </div>
                <button 
                    onClick={handleSubmit}
                    style={{ 
                        background: tealColor, 
                        color: 'white', 
                        border: 'none', 
                        padding: '6px 20px', 
                        fontSize: '0.75rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}
                >
                    <div style={{ background: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: tealColor, fontSize: '12px', fontWeight: 'bold' }}>+</span>
                    </div>
                    Payment
                </button>
            </div>

            <style>{`
                .pc-select {
                    appearance: auto !important;
                }
                table thead th {
                    font-weight: normal;
                    color: #333;
                }
                input[type="radio"] {
                    accent-color: ${tealColor};
                }
                input::placeholder {
                    font-size: 0.6rem !important;
                    color: #94a3b8 !important;
                }
            `}</style>
        </div>
    );
}

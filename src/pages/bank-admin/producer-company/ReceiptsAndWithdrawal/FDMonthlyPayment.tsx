import { useState, useMemo } from 'react';
import { Save, RefreshCcw, Landmark, CreditCard, Info, Table, CheckSquare, Square } from 'lucide-react';
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

    const needsBankInfo = ['Cheque', 'Neft', 'Transfer'].includes(paymentMode);

    return (
        <div className="pc-container" style={{ minHeight: '100vh', padding: '1.5rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>

            {/* Header / Selection Area */}
            <div className="pc-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="pc-card-icon" style={{ background: 'linear-gradient(45deg, #009BB0, #00a3ad)', width: '40px', height: '40px' }}>
                        <Table size={20} color="white" />
                    </div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>FD Monthly Payment</h1>
                </div>

                <div style={{ flex: 1, maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Select FD ID:</label>
                    <select className="pc-select" style={{ height: '38px', borderRadius: '8px' }} value={fdId} onChange={e => setFdId(e.target.value)}>
                        <option value="">Select FD ID.</option>
                        <option value="FD00123">FD00123 - John Doe</option>
                    </select>
                </div>
            </div>

            {/* Interest Payments Data Table */}
            <div className="pc-card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={16} className="text-teal-600" /> Pending Interest Installments
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{selectedIds.length} items selected</span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                        <thead>
                            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'center', width: '40px' }}>
                                    <button type="button" onClick={toggleSelectAll} style={{ background: 'none', border: 'none', color: '#009BB0', cursor: 'pointer' }}>
                                        {selectedIds.length === MOCK_DATA.length ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800 }}>DATE</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800 }}>CUSTOMER NAME</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800 }}>FD ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800 }}>DEP. DATE</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800 }}>MODE</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 800 }}>DEP. AMOUNT</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 800, color: '#009BB0' }}>PAYABLE INT.</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800 }}>SAVINGS AC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_DATA.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', background: selectedIds.includes(item.id) ? '#f0fdfa' : 'transparent', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                        <button type="button" onClick={() => toggleSelect(item.id)} style={{ background: 'none', border: 'none', color: selectedIds.includes(item.id) ? '#009BB0' : '#cbd5e1', cursor: 'pointer' }}>
                                            {selectedIds.includes(item.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </button>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>{item.date}</td>
                                    <td style={{ padding: '0.75rem', fontWeight: 700 }}>{item.customerName}</td>
                                    <td style={{ padding: '0.75rem' }}>{item.fdId}</td>
                                    <td style={{ padding: '0.75rem' }}>{item.depositDate}</td>
                                    <td style={{ padding: '0.75rem' }}>{item.mode}</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>₹ {item.amount.toLocaleString()}</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 800, color: '#009BB0' }}>₹ {item.interest.toFixed(2)}</td>
                                    <td style={{ padding: '0.75rem' }}>{item.savingsAc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '2px solid #e2e8f0', textAlign: 'right' }}>
                    <span style={{ color: '#64748b', fontWeight: 700, fontSize: '0.85rem', marginRight: '1rem' }}>TOTAL PAYABLE AMOUNT:</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#009BB0', letterSpacing: '0.05em' }}>₹ {totalPayable.toFixed(2)}</span>
                </div>
            </div>

            {/* Payment Processing Section */}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
                <div className="pc-card" style={{ gridColumn: 'span 8', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                        <Landmark size={18} className="text-teal-600" />
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>Payment Details</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div className="pc-field">
                            <label className="pc-label" style={{ fontWeight: 800 }}>Mode of Payment:</label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                                {['Cash', 'Cheque', 'Neft', 'Transfer'].map(mode => (
                                    <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                                        <input type="radio" value={mode} checked={paymentMode === mode} onChange={e => setPaymentMode(e.target.value)} style={{ accentColor: '#009BB0' }} /> {mode}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {needsBankInfo && (
                            <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', animation: 'fadeIn 0.3s ease' }}>
                                <div className="pc-field">
                                    <label className="pc-label">Bank Name / Ref.</label>
                                    <input className="pc-input" placeholder="Enter bank name or NEFT ID" style={{ height: '36px' }} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Branch</label>
                                    <input className="pc-input" placeholder="Enter branch" style={{ height: '36px' }} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Cheque / Ref No.</label>
                                    <input className="pc-input" placeholder="Ref No." style={{ height: '36px' }} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Ref Date</label>
                                    <input type="date" className="pc-input" style={{ height: '36px' }} defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pc-card" style={{ gridColumn: 'span 4', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                        <CreditCard size={18} className="text-teal-600" />
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>Complete Payment</h3>
                    </div>

                    <div className="pc-field" style={{ marginBottom: '1.5rem' }}>
                        <label className="pc-label">Paid Date:</label>
                        <input type="date" className="pc-input" style={{ height: '40px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700 }} value={paidDate} onChange={e => setPaidDate(e.target.value)} />
                    </div>

                    <button type="submit" className="pc-action-btn primary" style={{ width: '100%', height: '48px', borderRadius: '10px', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: 'linear-gradient(to right, #009BB0, #00a3ad)', boxShadow: '0 4px 12px rgba(0, 155, 176, 0.2)' }}>
                        <Save size={20} /> PROCESS PAYMENT
                    </button>

                    <button type="button" onClick={() => window.location.reload()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem', cursor: 'pointer' }}>
                        <RefreshCcw size={12} /> Reset Form
                    </button>
                </div>
            </form>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .pc-input:focus, .pc-select:focus {
                    border-color: #009BB0 !important;
                    box-shadow: 0 0 0 3px rgba(0, 155, 176, 0.1) !important;
                }
                table tbody tr:hover {
                    background-color: #f8fafc !important;
                }
            `}</style>
        </div>
    );
}

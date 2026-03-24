import { useState } from 'react';
import { RefreshCcw, X, User } from 'lucide-react';
import '../producer.css';

export default function PassbookCancellation() {
    const [status, setStatus] = useState('Active');
    const [form, setForm] = useState({
        accountNo: '',
        date: new Date().toISOString().split('T')[0],
        balance: '',
        memberType: '',
        membershipNo: '',
        joiningDate: '',
        customerName: '',
        nomineeName: '',
        age: '',
        mobileNo: '',
        relation: '',
        narration: ''
    });

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleRefresh = () => {
        setForm({
            accountNo: '',
            date: new Date().toISOString().split('T')[0],
            balance: '',
            memberType: '',
            membershipNo: '',
            joiningDate: '',
            customerName: '',
            nomineeName: '',
            age: '',
            mobileNo: '',
            relation: '',
            narration: ''
        });
        setStatus('Active');
    };

    const handleCancel = () => {
        window.history.back();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.accountNo) {
            alert('Please select an Account Number');
            return;
        }
        alert('Passbook Cancellation Request Submitted!');
    };

    return (
        <div className="pc-container" style={{ minHeight: '100vh', padding: '1rem', background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)' }}>

            {/* Top Action Bar */}
            <div style={{
                background: '#009BB0',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                gap: '1rem',
                fontSize: '0.8rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <button onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', transition: 'color 0.2s' }}>
                    <div style={{ background: '#22c55e', borderRadius: '50%', padding: '2px' }}><X size={10} color="white" /></div> Cancel
                </button>
                <button onClick={handleRefresh} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}>
                    <div style={{ background: '#22c55e', borderRadius: '50%', padding: '2px' }}><RefreshCcw size={10} color="white" /></div> Refresh
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '1.5rem', borderRadius: '0 0 12px 12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>

                {/* Header Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem', padding: '0.5rem 0' }}>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Active', 'InActive'].map(opt => (
                            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    checked={status === opt}
                                    onChange={() => setStatus(opt)}
                                    style={{ accentColor: '#009BB0', width: '16px', height: '16px' }}
                                />
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>{opt}</span>
                            </label>
                        ))}
                    </div>

                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="pc-field">
                            <label className="pc-label" style={{ fontWeight: 800 }}>Account No. : *</label>
                            <select
                                className="pc-select"
                                style={{ height: '34px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                                value={form.accountNo}
                                onChange={e => set('accountNo', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="SB001">SB001 - John Doe</option>
                                <option value="SB002">SB002 - Jane Smith</option>
                            </select>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label" style={{ fontWeight: 800 }}>Date : *</label>
                            <input
                                type="date"
                                className="pc-input"
                                style={{ height: '34px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                                value={form.date}
                                onChange={e => set('date', e.target.value)}
                            />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label" style={{ fontWeight: 800 }}>Account Balance:*</label>
                            <input
                                type="text"
                                className="pc-input"
                                style={{ height: '34px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#f8fafc' }}
                                value={form.balance}
                                onChange={e => set('balance', e.target.value)}
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                {/* Member Details Group */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', position: 'relative', marginTop: '1rem', background: '#f8fafc' }}>
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '12px',
                        background: '#f8fafc',
                        padding: '0 8px',
                        fontSize: '0.85rem',
                        fontWeight: 900,
                        color: '#1e40af',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}>
                        <User size={14} /> Member Details
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem 2rem', paddingTop: '0.5rem' }}>
                        <div className="pc-field">
                            <label className="pc-label">Member Type : *</label>
                            <input className="pc-input" style={{ height: '34px' }} value={form.memberType} onChange={e => set('memberType', e.target.value)} />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Membership No. : *</label>
                            <input className="pc-input" style={{ height: '34px' }} value={form.membershipNo} onChange={e => set('membershipNo', e.target.value)} />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Joining Date. : *</label>
                            <input type="date" className="pc-input" style={{ height: '34px' }} value={form.joiningDate} onChange={e => set('joiningDate', e.target.value)} />
                        </div>

                        <div className="pc-field">
                            <label className="pc-label">Customer Name:*</label>
                            <input className="pc-input" style={{ height: '34px' }} value={form.customerName} onChange={e => set('customerName', e.target.value)} />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Nommiee Name : *</label>
                            <input className="pc-input" style={{ height: '34px' }} value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Age : *</label>
                            <input className="pc-input" style={{ height: '34px' }} value={form.age} onChange={e => set('age', e.target.value)} />
                        </div>

                        <div className="pc-field">
                            <label className="pc-label">Mobile No. : *</label>
                            <input className="pc-input" style={{ height: '34px' }} value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Relation. : *</label>
                            <input className="pc-input" style={{ height: '34px' }} value={form.relation} onChange={e => set('relation', e.target.value)} />
                        </div>
                    </div>

                    <div className="pc-field" style={{ marginTop: '1.25rem' }}>
                        <label className="pc-label">Narration:</label>
                        <textarea
                            className="pc-input"
                            style={{ minHeight: '80px', padding: '0.75rem', borderRadius: '6px' }}
                            placeholder="Enter Narration"
                            value={form.narration}
                            onChange={e => set('narration', e.target.value)}
                        />
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button type="button" onClick={handleCancel} className="pc-action-btn secondary" style={{
                        background: '#009BB0',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.25rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        <div style={{ background: '#22c55e', borderRadius: '50%', padding: '2px' }}><X size={10} color="white" /></div> Cancel
                    </button>
                    <button type="submit" className="pc-action-btn primary" style={{
                        background: '#009BB0',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.25rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        <div style={{ background: '#22c55e', borderRadius: '50%', padding: '2px' }}><RefreshCcw size={10} color="white" /></div> Refresh
                    </button>
                </div>
            </form>

            <style>{`
                .pc-field { display: flex; flex-direction: column; gap: 0.4rem; }
                .pc-label { font-size: 0.75rem; color: #475569; font-weight: 700; margin: 0; }
                .pc-input, .pc-select { transition: all 0.2s; border: 1px solid #cbd5e1; }
                .pc-input:focus, .pc-select:focus { border-color: #009BB0; outline: none; box-shadow: 0 0 0 3px rgba(0, 155, 176, 0.1); }
            `}</style>
        </div>
    );
}

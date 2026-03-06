import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import '../producer.css';

export default function PassbookCancellation() {
    const [status, setStatus] = useState<'Active' | 'InActive'>('Active');
    const [form, setForm] = useState({
        accountNo: '',
        date: new Date().toISOString().split('T')[0],
        accountBalance: '',
        memberType: '',
        membershipNo: '',
        joiningDate: new Date().toISOString().split('T')[0],
        customerName: '',
        nomineeName: '',
        age: '',
        mobileNo: '',
        relation: '',
        narration: ''
    });

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleAccountChange = (val: string) => {
        set('accountNo', val);
        if (val === '1001') {
            setForm(prev => ({
                ...prev,
                accountNo: '1001',
                accountBalance: '318.00',
                memberType: 'MEMBER',
                membershipNo: 'MSGC00001',
                joiningDate: '09-05-2025',
                customerName: 'KORNEPATI VEERANJANEYULU',
                nomineeName: 'MALLESWARI',
                age: '42',
                mobileNo: '8762655644',
                relation: 'WIFE'
            }));
        } else {
            setForm({
                accountNo: '',
                date: new Date().toISOString().split('T')[0],
                accountBalance: '',
                memberType: '',
                membershipNo: '',
                joiningDate: new Date().toISOString().split('T')[0],
                customerName: '',
                nomineeName: '',
                age: '',
                mobileNo: '',
                relation: '',
                narration: ''
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(status === 'Active' ? 'Account Cancelled!' : 'Account Activated!');
    };

    return (
        <div className="pc-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Passbook Cancellation</h1>
                    <p>Manage passbook activation and cancellation</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pc-card">
                    <div className="pc-form">

                        {/* Top Radio Buttons */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Active"
                                    checked={status === 'Active'}
                                    onChange={() => setStatus('Active')}
                                    style={{ accentColor: '#005f73', width: '16px', height: '16px', cursor: 'pointer', margin: 0 }}
                                />
                                Active
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="InActive"
                                    checked={status === 'InActive'}
                                    onChange={() => setStatus('InActive')}
                                    style={{ accentColor: '#005f73', width: '16px', height: '16px', cursor: 'pointer', margin: 0 }}
                                />
                                InActive
                            </label>
                        </div>

                        {/* Top Controls */}
                        <div className="pc-grid" style={{ marginBottom: '1.5rem', alignItems: 'center', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '100px', marginBottom: 0 }}>Account No. : *</label>
                                <select className="pc-select" value={form.accountNo} onChange={e => handleAccountChange(e.target.value)} required>
                                    <option value="">Select</option>
                                    <option value="1001">1001_KORNEPATI VEERANJANEYULU</option>
                                </select>
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '60px', marginBottom: 0, textAlign: 'right', paddingRight: '10px' }}>Date : *</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} required />
                            </div>
                            <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label className="pc-label" style={{ width: '130px', marginBottom: 0, textAlign: 'right', paddingRight: '10px' }}>Account Balance: *</label>
                                <input className="pc-input" value={form.accountBalance} readOnly style={{ background: '#f1f5f9' }} />
                            </div>
                        </div>

                        {/* Member Details Group */}
                        <div style={{ border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '8px', position: 'relative', background: '#fafafa' }}>
                            <div style={{ position: 'absolute', top: '-10px', left: '15px', background: 'white', padding: '0 5px', fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>
                                Member Details
                            </div>

                            <div className="pc-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', rowGap: '1rem' }}>
                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Member Type : *</label>
                                    <input className="pc-input" value={form.memberType} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Membership No. : *</label>
                                    <input className="pc-input" value={form.membershipNo} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Joining Date. : *</label>
                                    <input type="text" className="pc-input" value={form.joiningDate} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>

                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Customer Name:*</label>
                                    <input className="pc-input" value={form.customerName} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Nominee Name :*</label>
                                    <input className="pc-input" value={form.nomineeName} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Age : *</label>
                                    <input className="pc-input" value={form.age} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>

                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Mobile No. :*</label>
                                    <input className="pc-input" value={form.mobileNo} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0 }}>Relation. :*</label>
                                    <input className="pc-input" value={form.relation} readOnly style={{ background: '#ffffff', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div className="pc-field" style={{ visibility: 'hidden' }}>
                                </div>
                            </div>

                            <div className="pc-grid-full" style={{ marginTop: '1rem' }}>
                                <div className="pc-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <label className="pc-label" style={{ width: '120px', marginBottom: 0, marginTop: '5px' }}>Narration:</label>
                                    <textarea className="pc-input" style={{ minHeight: '80px', resize: 'vertical' }} placeholder="Enter Narration" value={form.narration} onChange={e => set('narration', e.target.value)} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="pc-actions" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
                    {status === 'Active' ? (
                        <button type="submit" className="pc-btn" style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.6rem 1.5rem' }}>
                            <XCircle size={16} /> Cancel
                        </button>
                    ) : (
                        <button type="submit" className="pc-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.6rem 1.5rem' }}>
                            <CheckCircle size={16} /> Activate
                        </button>
                    )}
                    <button type="button" className="pc-btn secondary" onClick={() => window.location.reload()} style={{ padding: '0.6rem 1.5rem' }}>
                        <RefreshCcw size={16} /> Refresh
                    </button>
                </div>
            </form>
        </div>
    );
}

import { useState } from 'react';
import { Save, RotateCcw, Coins, Table } from 'lucide-react';
import './producer.css';

const EMPTY_FORM = {
    memberType: '',
    membershipId: '',
    admissionNo: '',
    customerName: '',
    nomineeAge: '',
    sharesEachOf: '100',
    noOfSharesHeld: '',
    mobileNo: '',
    customerAge: '',
    nomineeName: '',
    relation: '',
    issuedDate: '24/02/2026',
    totalAmount: '',
};

const SAMPLE_DATA = [
    { id: 1, certNo: 'MSSCGC00001', name: 'KORNEPATI VEERANJANEYULU', mobile: '8762655844', shares: 1, distinctive: '1To1' },
    { id: 2, certNo: 'MSSCGC00002', name: 'NALLAMOPU SRINIVASARAO', mobile: '9000919844', shares: 1, distinctive: '2To2' },
    { id: 3, certNo: 'MSSCGC00003', name: 'KOYA RAJARAO', mobile: '7330622633', shares: 1, distinctive: '3To3' },
    { id: 4, certNo: 'MSSCGC00004', name: 'KUKKALA CHINANAGARAJU', mobile: '9573155962', shares: 1, distinctive: '4To4' },
    { id: 5, certNo: 'MSSCGC00005', name: 'KUKKALA THIRUPALU REDDY', mobile: '7013794030', shares: 1, distinctive: '5To5' },
    { id: 6, certNo: 'MSSCGC00006', name: 'PERAKAM MANIKANTA KUMAR', mobile: '8096030333', shares: 1, distinctive: '6To6' },
    { id: 7, certNo: 'MSSCGC00007', name: 'KUNCHALA RAVI', mobile: '9160069102', shares: 1, distinctive: '7To7' },
];

export function ShareCapital() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="pc-container animate-fade-in">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Share Capital</h1>
                    <p>Issue and manage shares for Producer Company members.</p>
                    <span className="pc-badge"><Coins size={11} /> Member Shares</span>
                </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }}>
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Coins size={18} /></div>
                        <div>
                            <p className="pc-card-title">Share Issue Form</p>
                            <p className="pc-card-sub">Allocate new shares to registered members</p>
                        </div>
                    </div>

                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)} required>
                                    <option value="">Select Member Type</option>
                                    <option value="A_CLASS">A Class</option>
                                    <option value="B_CLASS">B Class</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Membership No. / ID *</label>
                                <select className="pc-select" value={form.membershipId} onChange={e => set('membershipId', e.target.value)} required>
                                    <option value="">Select</option>
                                    <option value="MBR-001">MBR-001</option>
                                    <option value="MBR-002">MBR-002</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Admission No.</label>
                                <input className="pc-input" placeholder="e.g. ADM1024" value={form.admissionNo} onChange={e => set('admissionNo', e.target.value)} />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Customer Name *</label>
                                <input className="pc-input" placeholder="Full Name" value={form.customerName} onChange={e => set('customerName', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Customer Age *</label>
                                <input type="number" className="pc-input" placeholder="Years" value={form.customerAge} onChange={e => set('customerAge', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile Number *</label>
                                <input type="tel" className="pc-input" placeholder="10-digit number" value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} required />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Issued Date *</label>
                                <input type="date" className="pc-input" value={form.issuedDate} onChange={e => set('issuedDate', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Shares Each Of (₹) *</label>
                                <input type="number" className="pc-input" value={form.sharesEachOf} onChange={e => {
                                    const val = e.target.value;
                                    set('sharesEachOf', val);
                                    if (form.noOfSharesHeld && val) {
                                        set('totalAmount', (Number(form.noOfSharesHeld) * Number(val)).toString());
                                    }
                                }} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">No. Of Shares Held *</label>
                                <input type="number" className="pc-input" value={form.noOfSharesHeld} onChange={e => {
                                    const num = e.target.value;
                                    set('noOfSharesHeld', num);
                                    if (num && form.sharesEachOf) {
                                        set('totalAmount', (Number(num) * Number(form.sharesEachOf)).toString());
                                    }
                                }} required />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Nominee's Name *</label>
                                <input className="pc-input" placeholder="Nominee Full Name" value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation *</label>
                                <input className="pc-input" placeholder="e.g. Spouse, Son" value={form.relation} onChange={e => set('relation', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Nominee's Age *</label>
                                <input type="number" className="pc-input" placeholder="Years" value={form.nomineeAge} onChange={e => set('nomineeAge', e.target.value)} required />
                            </div>

                            <div className="pc-field pc-grid-full">
                                <label className="pc-label">Total Amount (₹) *</label>
                                <input type="text" className="pc-input"
                                    value={form.totalAmount ? `₹ ${form.totalAmount}` : ''}
                                    readOnly
                                    placeholder="Calculated automatically"
                                    style={{ background: '#f8fafc', color: '#0f172a', fontWeight: 600, maxWidth: '300px' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pc-submit-bar" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 'bold' }}>
                            {saved ? '✅ Share capital saved successfully!' : ''}
                        </span>
                        <div className="pc-submit-actions">
                            <button type="button" className="pc-btn-ghost" style={{ backgroundColor: '#f1f5f9', color: '#dc2626', border: '1px solid #e2e8f0' }} onClick={() => setForm(EMPTY_FORM)}>
                                <RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} /> Clear
                            </button>
                            <button type="submit" className="pc-btn-primary" style={{ backgroundColor: '#16a34a' }}>
                                <Save size={14} /> Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* List Table */}
            <div className="pc-card" style={{ marginTop: '24px' }}>
                <div className="pc-card-header" style={{ padding: '16px 20px', backgroundColor: '#334155' }}>
                    <div className="pc-card-icon" style={{ backgroundColor: 'transparent', color: 'white', marginRight: '8px' }}><Table size={18} /></div>
                    <div>
                        <p className="pc-card-title" style={{ color: 'white', fontSize: '14px', margin: 0 }}>Share Capital</p>
                    </div>
                </div>

                <div style={{ padding: '16px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                                <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>S.No.</th>
                                <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Certificate No.</th>
                                <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Customer Name</th>
                                <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Mobile No.</th>
                                <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>No.Of Shares</th>
                                <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Distinctive No's.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SAMPLE_DATA.map((row, i) => (
                                <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                                    <td style={{ padding: '12px', color: '#0f172a' }}>{row.id}</td>
                                    <td style={{ padding: '12px', color: '#0f172a', fontWeight: 500 }}>{row.certNo}</td>
                                    <td style={{ padding: '12px', color: '#0f172a' }}>{row.name}</td>
                                    <td style={{ padding: '12px', color: '#0f172a' }}>{row.mobile}</td>
                                    <td style={{ padding: '12px', color: '#0f172a' }}>{row.shares}</td>
                                    <td style={{ padding: '12px', color: '#0f172a' }}>{row.distinctive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom CSS overrides for this component to match the legacy look slightly */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .pc-field span {
                    color: red;
                    margin-left: 2px;
                }
                .pc-field {
                    margin-bottom: 8px;
                }
                .pc-grid {
                    row-gap: 12px;
                    column-gap: 20px;
                }
            `}} />
        </div>
    );
}

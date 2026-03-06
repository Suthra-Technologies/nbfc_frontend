import { useState } from 'react';
import {
    Briefcase,
    Save,
    RotateCcw,
    User,
    MapPin,
    Heart,
    Shield,
    Link,
    Plus,
    Trash2,
    Clock
} from 'lucide-react';
import './producer.css';

const INITIAL_FORM = {
    // Header
    memberType: 'Select',
    membershipId: '',
    rdAccountType: 'Select RD Account Type',
    date: new Date().toISOString().split('T')[0],

    // Individual Details
    customerName: '',
    fatherName: '',
    motherName: '',
    gender: '',
    dob: '',
    age: '',
    mobileNo: '',
    occupation: '',
    husbandName: '',

    // Permanent Address
    p_houseNo: '', p_street: '', p_village: '', p_district: '', p_state: '', p_country: '', p_postOffice: '', p_pincode: '', p_mandal: '',

    // Correspondence Address
    c_houseNo: '', c_street: '', c_village: '', c_district: '', c_state: '', c_country: '', c_postOffice: '', c_pincode: '', c_mandal: '',

    // Nominee Details
    n_name: '', n_relation: '', n_age: '', n_houseNo: '', n_street: '', n_village: '', n_district: '', n_state: '', n_country: '', n_postOffice: '', n_pincode: '', n_mobile: '', n_mandal: '',

    // KYC
    kyc_idType: '',
    kyc_addressProof: '',
    kyc_otherDoc: '',

    // RD Details
    installmentMode: 'Select',
    installmentAmount: '',
    period: 'Select',
    category: 'Select Category',
    interestRate: '',
    depositAmount: '',
    depositDate: new Date().toISOString().split('T')[0],
    maturityDate: '',
    maturityAmount: '',
    interestPayable: '',

    // Introducer
    introducer: 'Direct',
    introducerCode: '',
    commissionPercentage: 'Select Comm',
};

export function RecurringDeposits() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [introducers, setIntroducers] = useState<any[]>([]);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const addIntroducer = () => {
        if (form.introducer !== '') {
            const newIntr = {
                id: Date.now(),
                code: form.introducerCode,
                name: form.introducer,
                commission: form.commissionPercentage
            };
            setIntroducers([...introducers, newIntr]);
            setForm(f => ({ ...f, introducer: 'Direct', introducerCode: '', commissionPercentage: 'Select Comm' }));
        }
    };

    const removeIntroducer = (id: number) => {
        setIntroducers(introducers.filter(i => i.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Recurring Deposits (RD) Creation</h1>
                    <p>Register new systematic recurring investment accounts for members.</p>
                </div>
                <div className="flex gap-2">
                    <span className="pc-badge"><Clock size={11} /> Recurring Deposit</span>
                    <span className="pc-badge">Systematic Saving</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Header Configuration */}
                <div className="pc-card">
                    <div className="pc-form" style={{ padding: '0.75rem' }}>
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type: *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)}>
                                    <option>Select</option><option>MEMBER</option><option>CLASS B</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">MemberShip No/ID: *</label>
                                <select className="pc-select" value={form.membershipId} onChange={e => set('membershipId', e.target.value)}>
                                    <option value="">Select Member ID</option><option value="M001">M001</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">RD Account Type: *</label>
                                <select className="pc-select" value={form.rdAccountType} onChange={e => set('rdAccountType', e.target.value)}>
                                    <option>Select RD Account Type</option><option>Standard RD</option><option>Flexi RD</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date: *</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Individual/Group Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><User size={14} /></div>
                        <p className="pc-card-title">Individual/Group Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">Customer Name:*</label><input className="pc-input" placeholder="Enter Customer Name" value={form.customerName} onChange={e => set('customerName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Father's Name:*</label><input className="pc-input" placeholder="Enter Father's Name" value={form.fatherName} onChange={e => set('fatherName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mother Name:*</label><input className="pc-input" placeholder="Enter Mother Name" value={form.motherName} onChange={e => set('motherName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Gender :</label><input className="pc-input" placeholder="Enter Gender" value={form.gender} onChange={e => set('gender', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Date Of Birth :</label><input className="pc-input" placeholder="Enter Date Of Birth" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Age:</label><input className="pc-input" placeholder="Enter Age" value={form.age} onChange={e => set('age', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile Number :*</label><input className="pc-input" placeholder="Enter Mobile Number" value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Occupation :</label><input className="pc-input" placeholder="Enter Occupation" value={form.occupation} onChange={e => set('occupation', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Husband Name :</label><input className="pc-input" placeholder="Enter Husband Name" value={form.husbandName} onChange={e => set('husbandName', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Permanent Address */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><MapPin size={14} /></div>
                        <p className="pc-card-title">Permanet Address</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">House No. :*</label><input className="pc-input" placeholder="Enter House No." value={form.p_houseNo} onChange={e => set('p_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street :*</label><input className="pc-input" placeholder="Enter Street" value={form.p_street} onChange={e => set('p_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village :*</label><input className="pc-input" placeholder="Enter Village" value={form.p_village} onChange={e => set('p_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter District" value={form.p_district} onChange={e => set('p_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :</label><input className="pc-input" placeholder="Enter State" value={form.p_state} onChange={e => set('p_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter Country" value={form.p_country} onChange={e => set('p_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office :*</label><input className="pc-input" placeholder="Enter Post Office" value={form.p_postOffice} onChange={e => set('p_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :</label><input className="pc-input" placeholder="Enter Pincode" value={form.p_pincode} onChange={e => set('p_pincode', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mandal :</label><input className="pc-input" placeholder="Enter Mandal" value={form.p_mandal} onChange={e => set('p_mandal', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Correspondence Address */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><MapPin size={14} /></div>
                        <p className="pc-card-title">Correspondence Address</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">House No :*</label><input className="pc-input" placeholder="Enter House No." value={form.c_houseNo} onChange={e => set('c_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street :*</label><input className="pc-input" placeholder="Enter Street" value={form.c_street} onChange={e => set('c_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village :*</label><input className="pc-input" placeholder="Enter Village" value={form.c_village} onChange={e => set('c_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter District" value={form.c_district} onChange={e => set('c_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :</label><input className="pc-input" placeholder="Enter State" value={form.c_state} onChange={e => set('c_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter Country" value={form.c_country} onChange={e => set('c_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office :*</label><input className="pc-input" placeholder="Enter Post Office" value={form.c_postOffice} onChange={e => set('c_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :</label><input className="pc-input" placeholder="Enter Pincode" value={form.c_pincode} onChange={e => set('c_pincode', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mandal :</label><input className="pc-input" placeholder="Enter Mandal" value={form.c_mandal} onChange={e => set('c_mandal', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Nominee Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Heart size={14} /></div>
                        <p className="pc-card-title">Nommiee Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">Nommiee Name :*</label><input className="pc-input" placeholder="Enter Nominee Name" value={form.n_name} onChange={e => set('n_name', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Relation :*</label><input className="pc-input" placeholder="Enter Relation" value={form.n_relation} onChange={e => set('n_relation', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Age :*</label><input className="pc-input" placeholder="Enter Age" value={form.n_age} onChange={e => set('n_age', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">House No :*</label><input className="pc-input" placeholder="Enter House No." value={form.n_houseNo} onChange={e => set('n_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street :*</label><input className="pc-input" placeholder="Enter Street" value={form.n_street} onChange={e => set('n_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village :*</label><input className="pc-input" placeholder="Enter Village" value={form.n_village} onChange={e => set('n_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter District" value={form.n_district} onChange={e => set('n_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :</label><input className="pc-input" placeholder="Enter State" value={form.n_state} onChange={e => set('n_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter Country" value={form.n_country} onChange={e => set('n_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office :*</label><input className="pc-input" placeholder="Enter Post Office" value={form.n_postOffice} onChange={e => set('n_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :</label><input className="pc-input" placeholder="Enter Pincode" value={form.n_pincode} onChange={e => set('n_pincode', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile No. :*</label><input className="pc-input" placeholder="Enter Mobile No." value={form.n_mobile} onChange={e => set('n_mobile', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mandal :</label><input className="pc-input" placeholder="Enter Mandal" value={form.n_mandal} onChange={e => set('n_mandal', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* KYC & RD Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Shield size={14} /></div>
                        <p className="pc-card-title">KYC Status</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">Id Proof Type :</label><input className="pc-input" placeholder="Enter Id Proof Type" value={form.kyc_idType} onChange={e => set('kyc_idType', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Address Proof :</label><input className="pc-input" placeholder="Enter Address Proof" value={form.kyc_addressProof} onChange={e => set('kyc_addressProof', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Other Document :</label><input className="pc-input" placeholder="Enter Other Document" value={form.kyc_otherDoc} onChange={e => set('kyc_otherDoc', e.target.value)} /></div>
                        </div>
                    </div>

                    <div className="pc-divider-h" />

                    <div className="pc-card-header" style={{ borderTop: '1px solid #f1f5f9', borderBottom: 'none' }}>
                        <div className="pc-card-icon"><Clock size={14} /></div>
                        <p className="pc-card-title">RD Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Installment Mode :</label>
                                <select className="pc-select" value={form.installmentMode} onChange={e => set('installmentMode', e.target.value)}>
                                    <option>Select</option><option>Monthly</option><option>Quarterly</option>
                                </select>
                            </div>
                            <div className="pc-field"><label className="pc-label">Installment Amount:</label><input className="pc-input" placeholder="Enter Amount" value={form.installmentAmount} onChange={e => set('installmentAmount', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Period:</label>
                                <select className="pc-select" value={form.period} onChange={e => set('period', e.target.value)}>
                                    <option>Select</option><option>12 Months</option><option>24 Months</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Category :</label>
                                <select className="pc-select" value={form.category} onChange={e => set('category', e.target.value)}>
                                    <option>Select Category</option><option>General</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Rate :*</label>
                                <select className="pc-select" value={form.interestRate} onChange={e => set('interestRate', e.target.value)}>
                                    <option value="">Select Rate</option><option value="7.5">7.5 %</option>
                                </select>
                            </div>
                            <div className="pc-field"><label className="pc-label">Deposit Amount :</label><input className="pc-input" placeholder="Enter Deposit Amount" value={form.depositAmount} onChange={e => set('depositAmount', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Deposit Date :</label><input type="date" className="pc-input" value={form.depositDate} onChange={e => set('depositDate', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Maturity Date :</label><input type="date" className="pc-input" value={form.maturityDate} onChange={e => set('maturityDate', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Maturity Amount :</label><input className="pc-input" placeholder="Enter Maturity Amount" value={form.maturityAmount} onChange={e => set('maturityAmount', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Interest Payable :</label><input className="pc-input" placeholder="Enter Interest Payable" value={form.interestPayable} onChange={e => set('interestPayable', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Introducer Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Link size={14} /></div>
                        <p className="pc-card-title">Introducer Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid" style={{ alignItems: 'flex-end' }}>
                            <div className="pc-field">
                                <label className="pc-label">Introducer :*</label>
                                <select className="pc-select" value={form.introducer} onChange={e => set('introducer', e.target.value)}>
                                    <option>Direct</option><option>Agent 001</option>
                                </select>
                            </div>
                            <div className="pc-field"><label className="pc-label">Introducer Code:</label><input className="pc-input" placeholder="Enter Code" value={form.introducerCode} onChange={e => set('introducerCode', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Commission Percentage:</label>
                                <select className="pc-select" value={form.commissionPercentage} onChange={e => set('commissionPercentage', e.target.value)}>
                                    <option>Select Comm</option><option>1%</option><option>2%</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <button type="button" className="pc-btn-primary" style={{ height: '28px', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={addIntroducer}>
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                        </div>

                        {introducers.length > 0 && (
                            <div style={{ marginTop: '1rem', border: '1px solid #f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                <table className="pc-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc' }}>
                                        <tr>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>S.No.</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>Introducer Code</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>Introducer Name</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>Commission Percentage</th>
                                            <th style={{ textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {introducers.map((intr, idx) => (
                                            <tr key={intr.id}>
                                                <td>{idx + 1}</td>
                                                <td>{intr.code}</td>
                                                <td>{intr.name}</td>
                                                <td>{intr.commission}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <button type="button" onClick={() => removeIntroducer(intr.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pc-submit-bar" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{saved ? '✅ RD Successfully Booked!' : '* Please ensure all mandatory fields are filled'}</span>
                    <div className="pc-submit-actions">
                        <button type="button" className="pc-btn-ghost" onClick={() => setForm(INITIAL_FORM)}>Reset Form</button>
                        <button type="submit" className="pc-btn-primary" style={{ minWidth: '150px' }}>
                            Save & Book RD
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


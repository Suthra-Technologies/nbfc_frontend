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
    Trash2
} from 'lucide-react';
import './producer.css';

const INITIAL_FORM = {
    // Header
    memberType: 'Select',
    membershipId: '',
    fdAccountType: 'Select',
    date: new Date().toISOString().split('T')[0],

    // Individual Details
    customerName: '',
    fatherHusbandName: '',
    motherName: '',
    gender: '',
    dob: '',
    age: '',
    occupation: '',
    husbandName: '',
    mobile1: '',
    mobile2: '',
    mobile3: '',
    mobile4: '',

    // Addresses
    p_houseNo: '', p_area: '', p_rural: '', p_country: '', p_state: '', p_district: '', p_mandal: '', p_city: '', p_landMark: '', p_ruralArea: '', p_cityArea: '', p_pincode: '',
    c_houseNo: '', c_area: '', c_rural: '', c_country: '', c_state: '', c_district: '', c_mandal: '', c_city: '', c_landMark: '', c_ruralArea: '', c_cityArea: '', c_pincode: '',

    // Nominee
    n_name: '', n_relation: '', n_age: '', n_houseNo: '', n_area: '', n_rural: '', n_country: '', n_state: '', n_district: '', n_mandal: '', n_city: '', n_landMark: '', n_ruralArea: '', n_cityArea: '', n_pincode: '', n_mobile: '',

    // KYC
    kyc_idType: '',
    kyc_addressProof: '',
    kyc_otherDoc: '',

    // FD Details
    fdType: 'Select',
    period: 'Select',
    category: 'Select Category',
    fdAmount: '',
    interestRate: '',
    depositDate: new Date().toISOString().split('T')[0],
    maturityDate: '',
    maturityAmount: '',
    interestPayable: '',

    // Introducer
    introducer: 'Select',
    introducerCode: '',
    commissionPercentage: 'Select',
};

export function FixedDeposits() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [introducers, setIntroducers] = useState<any[]>([]);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const addIntroducer = () => {
        if (form.introducer !== 'Select') {
            const newIntr = {
                id: Date.now(),
                code: form.introducerCode,
                name: form.introducer,
                commission: form.commissionPercentage
            };
            setIntroducers([...introducers, newIntr]);
            // Clear introducer fields
            setForm(f => ({ ...f, introducer: 'Select', introducerCode: '', commissionPercentage: 'Select' }));
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
                    <h1>Fixed Deposits (FD) Creation</h1>
                    <p>Register new fixed term investment accounts for members.</p>
                </div>
                <div className="flex gap-2">
                    <span className="pc-badge">Fixed Deposit</span>
                    <span className="pc-badge">Term Investment</span>
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
                                <label className="pc-label">FD Account Type: *</label>
                                <select className="pc-select" value={form.fdAccountType} onChange={e => set('fdAccountType', e.target.value)}>
                                    <option>Select FD Account Type</option><option>Regular FD</option><option>Senior Citizen FD</option>
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
                            <div className="pc-field"><label className="pc-label">Customer Name:*</label><input className="pc-input" placeholder="Enter The Customer Name" value={form.customerName} onChange={e => set('customerName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Father / Husband Name:</label><input className="pc-input" placeholder="Enter The Father Name" value={form.fatherHusbandName} onChange={e => set('fatherHusbandName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mother Name:*</label><input className="pc-input" placeholder="Enter The Mother Name" value={form.motherName} onChange={e => set('motherName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Gender :</label><input className="pc-input" placeholder="Enter The Gender" value={form.gender} onChange={e => set('gender', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Date Of Birth :</label><input className="pc-input" placeholder="Enter The D.O.B" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Age:</label><input className="pc-input" placeholder="Enter The Age" value={form.age} onChange={e => set('age', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Occupation :</label><input className="pc-input" placeholder="Enter The Occupation" value={form.occupation} onChange={e => set('occupation', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Husband Name :</label><input className="pc-input" placeholder="Enter The Husband Name" value={form.husbandName} onChange={e => set('husbandName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile Number1 :*</label><input className="pc-input" placeholder="Enter The Mobile No." value={form.mobile1} onChange={e => set('mobile1', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile Number2 :</label><input className="pc-input" placeholder="Enter The Mobile No." value={form.mobile2} onChange={e => set('mobile2', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile Number3 :</label><input className="pc-input" placeholder="Enter The Mobile No." value={form.mobile3} onChange={e => set('mobile3', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile Number4 :</label><input className="pc-input" placeholder="Enter The Mobile No." value={form.mobile4} onChange={e => set('mobile4', e.target.value)} /></div>
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
                            <div className="pc-field"><label className="pc-label">House No. :</label><input className="pc-input" placeholder="Enter The House No." value={form.p_houseNo} onChange={e => set('p_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Area:</label><input className="pc-input" placeholder="Enter The Street" value={form.p_area} onChange={e => set('p_area', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Rural :</label><input className="pc-input" placeholder="Enter The Village" value={form.p_rural} onChange={e => set('p_rural', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter The Country" value={form.p_country} onChange={e => set('p_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :*</label><input className="pc-input" placeholder="Enter The State" value={form.p_state} onChange={e => set('p_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter The District" value={form.p_district} onChange={e => set('p_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mandal :</label><input className="pc-input" placeholder="Enter The Mandal" value={form.p_mandal} onChange={e => set('p_mandal', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">City:*</label><input className="pc-input" placeholder="Enter City" value={form.p_city} onChange={e => set('p_city', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Land Mark :</label><input className="pc-input" placeholder="Enter Land Mark" value={form.p_landMark} onChange={e => set('p_landMark', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Rural Area :</label><input className="pc-input" placeholder="Enter Rural Area" value={form.p_ruralArea} onChange={e => set('p_ruralArea', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">City Area :</label><input className="pc-input" placeholder="Enter City Area" value={form.p_cityArea} onChange={e => set('p_cityArea', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :*</label><input className="pc-input" placeholder="Enter Pincode" value={form.p_pincode} onChange={e => set('p_pincode', e.target.value)} /></div>
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
                            <div className="pc-field"><label className="pc-label">House No :</label><input className="pc-input" placeholder="Enter The House No." value={form.c_houseNo} onChange={e => set('c_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Area :</label><input className="pc-input" placeholder="Enter The Street" value={form.c_area} onChange={e => set('c_area', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Rural :</label><input className="pc-input" placeholder="Enter The Village" value={form.c_rural} onChange={e => set('c_rural', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter The Country" value={form.c_country} onChange={e => set('c_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :</label><input className="pc-input" placeholder="Enter The State" value={form.c_state} onChange={e => set('c_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter The District" value={form.c_district} onChange={e => set('c_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mandal :</label><input className="pc-input" placeholder="Enter The Mandal" value={form.c_mandal} onChange={e => set('c_mandal', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">City :*</label><input className="pc-input" placeholder="Enter City" value={form.c_city} onChange={e => set('c_city', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Land Mark :</label><input className="pc-input" placeholder="Enter Land Mark" value={form.c_landMark} onChange={e => set('c_landMark', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Rural Area :</label><input className="pc-input" placeholder="Enter Rural Area" value={form.c_ruralArea} onChange={e => set('c_ruralArea', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">City Area :</label><input className="pc-input" placeholder="Enter City Area" value={form.c_cityArea} onChange={e => set('c_cityArea', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :*</label><input className="pc-input" placeholder="Enter Pincode" value={form.c_pincode} onChange={e => set('c_pincode', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Nominee Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Heart size={14} /></div>
                        <p className="pc-card-title">Nomminee Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">Nomminee Name :</label><input className="pc-input" placeholder="Enter The Nominne Name" value={form.n_name} onChange={e => set('n_name', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Relation :</label><input className="pc-input" placeholder="Enter The Relation" value={form.n_relation} onChange={e => set('n_relation', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Age :</label><input className="pc-input" placeholder="Enter The Age" value={form.n_age} onChange={e => set('n_age', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">House No :</label><input className="pc-input" placeholder="Enter The House No." value={form.n_houseNo} onChange={e => set('n_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Area :</label><input className="pc-input" placeholder="Enter The Street" value={form.n_area} onChange={e => set('n_area', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Rural :</label><input className="pc-input" placeholder="Enter The Village" value={form.n_rural} onChange={e => set('n_rural', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter The Country" value={form.n_country} onChange={e => set('n_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter The District" value={form.n_district} onChange={e => set('n_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :</label><input className="pc-input" placeholder="Enter The State" value={form.n_state} onChange={e => set('n_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mandal :</label><input className="pc-input" placeholder="Enter The Mandal" value={form.n_mandal} onChange={e => set('n_mandal', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">City :</label><input className="pc-input" placeholder="Enter City" value={form.n_city} onChange={e => set('n_city', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Land Mark :</label><input className="pc-input" placeholder="Enter Land Mark" value={form.n_landMark} onChange={e => set('n_landMark', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Rural Area :</label><input className="pc-input" placeholder="Enter Rural Area" value={form.n_ruralArea} onChange={e => set('n_ruralArea', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">City Area :</label><input className="pc-input" placeholder="Enter City Area" value={form.n_cityArea} onChange={e => set('n_cityArea', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :</label><input className="pc-input" placeholder="Enter The Pincode" value={form.n_pincode} onChange={e => set('n_pincode', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile No. :</label><input className="pc-input" placeholder="Enter The Mobile No." value={form.n_mobile} onChange={e => set('n_mobile', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* KYC & FD Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Shield size={14} /></div>
                        <p className="pc-card-title">KYC Status</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">Id Proof Type :</label><input className="pc-input" placeholder="Enter The Id Proof Type" value={form.kyc_idType} onChange={e => set('kyc_idType', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Address Proof :</label><input className="pc-input" placeholder="Enter The Address Proof" value={form.kyc_addressProof} onChange={e => set('kyc_addressProof', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Other Document :</label><input className="pc-input" placeholder="Enter The Other Document" value={form.kyc_otherDoc} onChange={e => set('kyc_otherDoc', e.target.value)} /></div>
                        </div>
                    </div>

                    <div className="pc-divider-h" />

                    <div className="pc-card-header" style={{ borderTop: '1px solid #f1f5f9', borderBottom: 'none' }}>
                        <div className="pc-card-icon"><Briefcase size={14} /></div>
                        <p className="pc-card-title">FD Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">FD Type :*</label>
                                <select className="pc-select" value={form.fdType} onChange={e => set('fdType', e.target.value)}>
                                    <option>Select</option><option>Cumulative</option><option>Non-Cumulative</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Period :*</label>
                                <select className="pc-select" value={form.period} onChange={e => set('period', e.target.value)}>
                                    <option>Select</option><option>12 Months</option><option>24 Months</option><option>36 Months</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Category :</label>
                                <select className="pc-select" value={form.category} onChange={e => set('category', e.target.value)}>
                                    <option>Select Category</option><option>General</option>
                                </select>
                            </div>
                            <div className="pc-field"><label className="pc-label">FD Amount :*</label><input className="pc-input" value={form.fdAmount} onChange={e => set('fdAmount', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Rate :*</label>
                                <select className="pc-select" value={form.interestRate} onChange={e => set('interestRate', e.target.value)}>
                                    <option value="">Select Rate</option><option value="8.5">8.5 %</option><option value="9.0">9.0 %</option>
                                </select>
                            </div>
                            <div className="pc-field"><label className="pc-label">Deposit Date :</label><input type="date" className="pc-input" value={form.depositDate} onChange={e => set('depositDate', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Maturity Date :</label><input type="date" className="pc-input" value={form.maturityDate} onChange={e => set('maturityDate', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Maturity Amount :*</label><input className="pc-input" value={form.maturityAmount} onChange={e => set('maturityAmount', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Interest Payable :*</label><input className="pc-input" value={form.interestPayable} onChange={e => set('interestPayable', e.target.value)} /></div>
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
                                    <option>Select</option><option>John Doe</option><option>Jane Smith</option>
                                </select>
                            </div>
                            <div className="pc-field"><label className="pc-label">Introducer Code:</label><input className="pc-input" value={form.introducerCode} onChange={e => set('introducerCode', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Commission Percentage:</label>
                                <select className="pc-select" value={form.commissionPercentage} onChange={e => set('commissionPercentage', e.target.value)}>
                                    <option>Select</option><option>1%</option><option>2%</option>
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
                    <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{saved ? '✅ FD Successfully Booked!' : '* Please ensure all mandatory fields are filled'}</span>
                    <div className="pc-submit-actions">
                        <button type="button" className="pc-btn-ghost" onClick={() => setForm(INITIAL_FORM)}>Reset Form</button>
                        <button type="submit" className="pc-btn-primary" style={{ minWidth: '150px' }}>
                            Save & Book FD
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


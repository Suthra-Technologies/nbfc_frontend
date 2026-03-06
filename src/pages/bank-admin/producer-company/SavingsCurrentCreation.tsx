import { useState } from 'react';
import {
    User,
    MapPin,
    Heart,
    Link,
    Briefcase,
    Shield,
    Users,
    Save
} from 'lucide-react';
import './producer.css';

const INITIAL_FORM = {
    // Header Info
    memberType: 'Select',
    accountType: 'Select Account Type',
    membershipId: 'Select',
    date: '',
    openingBalance: '',
    bankAccountType: 'Select Bank Account Type',

    // Personal Details
    customerName: '',
    fatherHusbandName: '',
    motherName: '',
    gender: 'Select',
    dob: '',
    age: '',
    mobileNo: '',
    occupation: '',

    // Permanent Address
    p_houseNo: '',
    p_street: '',
    p_village: '',
    p_district: '',
    p_state: '',
    p_country: '',
    p_postOffice: '',
    p_pincode: '',

    // Correspondence Address
    c_houseNo: '',
    c_street: '',
    c_village: '',
    c_district: '',
    c_state: '',
    c_country: '',
    c_postOffice: '',
    c_pincode: '',

    // Nominee Details
    n_name: '',
    n_relation: '',
    n_age: '',
    n_houseNo: '',
    n_street: '',
    n_village: '',
    n_district: '',
    n_state: '',
    n_country: '',
    n_postOffice: '',
    n_pincode: '',
    n_mobileNo: '',

    // KYC Status
    kyc_idProof: '',
    kyc_addressProof: '',
    kyc_otherDoc: '',

    // Bank Introducer Details
    intr_memberType: 'Select',
    intr_membershipId: 'Select',
    intr_accountNumber: '',
    intr_name: '',
    intr_modeOfAccount: 'Select',

    // Assets Details
    asset_vehicle: 'Select',
    asset_residence: 'Select',
    asset_existingLoans: 'Select',

    // Family Details
    spouse_name: '',
    spouse_occ: '',
    spouse_dob: '',
    spouse_gender: 'Select',
    child1_name: '',
    child1_occ: '',
    child1_dob: '',
    child1_gender: 'Select',
    child2_name: '',
    child2_occ: '',
    child2_dob: '',
    child2_gender: 'Select',
};

export function SavingsCurrentCreation() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Savings/Current Account Creation</h1>
                    <p>Enter all details below to register a new bank account.</p>
                </div>
                <div className="flex gap-2">
                    <span className="pc-badge">Saving</span>
                    <span className="pc-badge">Current</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Account Type Header */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Briefcase size={14} /></div>
                        <p className="pc-card-title">Initial Account Configuration</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type: *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)}>
                                    <option>Select</option><option>MEMBER</option><option>CLASS B</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Account Type: *</label>
                                <select className="pc-select" value={form.accountType} onChange={e => set('accountType', e.target.value)}>
                                    <option>Select Account Type</option><option>Savings</option><option>Current</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Membership No/ID: *</label>
                                <select className="pc-select" value={form.membershipId} onChange={e => set('membershipId', e.target.value)}>
                                    <option>Select</option><option>M001</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date: *</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">A/C Opening Balance: *</label>
                                <input className="pc-input" placeholder="Enter A/C Opening Balance" value={form.openingBalance} onChange={e => set('openingBalance', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Bank Account Type: *</label>
                                <select className="pc-select" value={form.bankAccountType} onChange={e => set('bankAccountType', e.target.value)}>
                                    <option>Select Bank Account Type</option><option>Standard</option><option>Premium</option>
                                </select>
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
                            <div className="pc-field"><label className="pc-label">Father/Husband:*</label><input className="pc-input" placeholder="Enter The Father Name" value={form.fatherHusbandName} onChange={e => set('fatherHusbandName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mother Name:*</label><input className="pc-input" placeholder="Enter The Mother Name" value={form.motherName} onChange={e => set('motherName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Gender</label><select className="pc-select" value={form.gender} onChange={e => set('gender', e.target.value)}><option>Select</option><option>Male</option><option>Female</option></select></div>
                            <div className="pc-field"><label className="pc-label">DOB:*</label><input type="date" className="pc-input" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Age</label><input className="pc-input" placeholder="Enter Age" value={form.age} readOnly /></div>
                            <div className="pc-field"><label className="pc-label">Mobile:*</label><input className="pc-input" placeholder="Enter Mobile No." value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Occupation</label><input className="pc-input" placeholder="Enter Occupation" value={form.occupation} onChange={e => set('occupation', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Permanet Address */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><MapPin size={14} /></div>
                        <p className="pc-card-title">Permanet Address</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">House No:*</label><input className="pc-input" placeholder="Enter House No." value={form.p_houseNo} onChange={e => set('p_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street:*</label><input className="pc-input" placeholder="Enter Street" value={form.p_street} onChange={e => set('p_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village:*</label><input className="pc-input" placeholder="Enter Village" value={form.p_village} onChange={e => set('p_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District:*</label><input className="pc-input" placeholder="Enter District" value={form.p_district} onChange={e => set('p_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State:*</label><input className="pc-input" placeholder="Enter State" value={form.p_state} onChange={e => set('p_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:*</label><input className="pc-input" placeholder="Enter Country" value={form.p_country} onChange={e => set('p_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office:*</label><input className="pc-input" placeholder="Enter Post Office" value={form.p_postOffice} onChange={e => set('p_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode:*</label><input className="pc-input" placeholder="Enter Pincode" value={form.p_pincode} onChange={e => set('p_pincode', e.target.value)} /></div>
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
                            <div className="pc-field"><label className="pc-label">House No:*</label><input className="pc-input" placeholder="Enter House No." value={form.c_houseNo} onChange={e => set('c_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street:*</label><input className="pc-input" placeholder="Enter Street" value={form.c_street} onChange={e => set('c_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village:*</label><input className="pc-input" placeholder="Enter Village" value={form.c_village} onChange={e => set('c_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District:*</label><input className="pc-input" placeholder="Enter District" value={form.c_district} onChange={e => set('c_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State:*</label><input className="pc-input" placeholder="Enter State" value={form.c_state} onChange={e => set('c_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:*</label><input className="pc-input" placeholder="Enter Country" value={form.c_country} onChange={e => set('c_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office:*</label><input className="pc-input" placeholder="Enter Post Office" value={form.c_postOffice} onChange={e => set('c_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode:*</label><input className="pc-input" placeholder="Enter Pincode" value={form.c_pincode} onChange={e => set('c_pincode', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Nominee Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Heart size={14} /></div>
                        <p className="pc-card-title">Nomnee Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">Nominee Name:*</label><input className="pc-input" placeholder="Enter Nominne Name" value={form.n_name} onChange={e => set('n_name', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Relation:*</label><input className="pc-input" placeholder="Enter Relation" value={form.n_relation} onChange={e => set('n_relation', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Age:*</label><input className="pc-input" placeholder="Enter Age" value={form.n_age} onChange={e => set('n_age', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">House No:*</label><input className="pc-input" placeholder="Enter House No." value={form.n_houseNo} onChange={e => set('n_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street:*</label><input className="pc-input" placeholder="Enter Street" value={form.n_street} onChange={e => set('n_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village:*</label><input className="pc-input" placeholder="Enter Village" value={form.n_village} onChange={e => set('n_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District:*</label><input className="pc-input" placeholder="Enter District" value={form.n_district} onChange={e => set('n_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State:*</label><input className="pc-input" placeholder="Enter State" value={form.n_state} onChange={e => set('n_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:*</label><input className="pc-input" placeholder="Enter Country" value={form.n_country} onChange={e => set('n_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office:*</label><input className="pc-input" placeholder="Enter Post Office" value={form.n_postOffice} onChange={e => set('n_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode:*</label><input className="pc-input" placeholder="Enter Pincode" value={form.n_pincode} onChange={e => set('n_pincode', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile No:*</label><input className="pc-input" placeholder="Enter Mobile No." value={form.n_mobileNo} onChange={e => set('n_mobileNo', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* KYC Status */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Shield size={14} /></div>
                        <p className="pc-card-title">KYC Status</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field"><label className="pc-label">Id Proof Type :</label><input className="pc-input" placeholder="Enter Id Proof Type" value={form.kyc_idProof} onChange={e => set('kyc_idProof', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Address Proof :</label><input className="pc-input" placeholder="Enter Address Proof" value={form.kyc_addressProof} onChange={e => set('kyc_addressProof', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Other Document :</label><input className="pc-input" placeholder="Enter Other Document" value={form.kyc_otherDoc} onChange={e => set('kyc_otherDoc', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                {/* Bank Introducer Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Link size={14} /></div>
                        <p className="pc-card-title">Bank Introducer Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type</label>
                                <select className="pc-select" value={form.intr_memberType} onChange={e => set('intr_memberType', e.target.value)}>
                                    <option>Select</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">MemberShip No/ID : *</label>
                                <select className="pc-select" value={form.intr_membershipId} onChange={e => set('intr_membershipId', e.target.value)}>
                                    <option>Select</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Account Number :</label>
                                <input className="pc-input" placeholder="Enter Account Number" value={form.intr_accountNumber} onChange={e => set('intr_accountNumber', e.target.value)} />
                            </div>
                            <div className="pc-field"><label className="pc-label">Introducer :</label><input className="pc-input" placeholder="Enter Introducer Name" value={form.intr_name} onChange={e => set('intr_name', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Mode of Account : *</label>
                                <select className="pc-select" value={form.intr_modeOfAccount} onChange={e => set('intr_modeOfAccount', e.target.value)}>
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assets Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Briefcase size={14} /></div>
                        <p className="pc-card-title">Assets Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Vehicle :</label>
                                <select className="pc-select" value={form.asset_vehicle} onChange={e => set('asset_vehicle', e.target.value)}><option>-Select-</option></select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Residence :</label>
                                <select className="pc-select" value={form.asset_residence} onChange={e => set('asset_residence', e.target.value)}><option>-Select-</option></select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Existing Loans :</label>
                                <select className="pc-select" value={form.asset_existingLoans} onChange={e => set('asset_existingLoans', e.target.value)}><option>-Select-</option></select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Family Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Users size={14} /></div>
                        <p className="pc-card-title">Family Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            {/* Spouse */}
                            <div className="pc-field"><label className="pc-label">Spouse Name :</label><input className="pc-input" placeholder="Enter Spouse Name" value={form.spouse_name} onChange={e => set('spouse_name', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">occupation:</label><input className="pc-input" placeholder="Enter Occupation" value={form.spouse_occ} onChange={e => set('spouse_occ', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Date Of Birth :</label><input type="date" className="pc-input" value={form.spouse_dob} onChange={e => set('spouse_dob', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Gender :</label>
                                <select className="pc-select" value={form.spouse_gender} onChange={e => set('spouse_gender', e.target.value)}>
                                    <option>Select</option><option>Male</option><option>Female</option>
                                </select>
                            </div>

                            {/* Child 1 */}
                            <div className="pc-field"><label className="pc-label">Children-1 Name :</label><input className="pc-input" placeholder="Enter Child 1 Name" value={form.child1_name} onChange={e => set('child1_name', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">occupation:</label><input className="pc-input" placeholder="Enter Occupation" value={form.child1_occ} onChange={e => set('child1_occ', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Date Of Birth :</label><input type="date" className="pc-input" value={form.child1_dob} onChange={e => set('child1_dob', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Gender :</label>
                                <select className="pc-select" value={form.child1_gender} onChange={e => set('child1_gender', e.target.value)}>
                                    <option>Select</option><option>Male</option><option>Female</option>
                                </select>
                            </div>

                            {/* Child 2 */}
                            <div className="pc-field"><label className="pc-label">Children-2 Name :</label><input className="pc-input" placeholder="Enter Child 2 Name" value={form.child2_name} onChange={e => set('child2_name', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">occupation:</label><input className="pc-input" placeholder="Enter Occupation" value={form.child2_occ} onChange={e => set('child2_occ', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Date Of Birth :</label><input type="date" className="pc-input" value={form.child2_dob} onChange={e => set('child2_dob', e.target.value)} /></div>
                            <div className="pc-field">
                                <label className="pc-label">Gender :</label>
                                <select className="pc-select" value={form.child2_gender} onChange={e => set('child2_gender', e.target.value)}>
                                    <option>Select</option><option>Male</option><option>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pc-submit-bar" style={{ marginTop: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{saved ? '✅ Account Successfully Created!' : '* Please ensure all mandatory fields are filled'}</span>
                    <div className="pc-submit-actions">
                        <button type="button" className="pc-btn-ghost" onClick={() => setForm(INITIAL_FORM)}>Reset Form</button>
                        <button type="submit" className="pc-btn-primary" style={{ minWidth: '150px' }}>
                            <Save size={14} style={{ marginRight: '8px' }} /> Save & Create Account
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


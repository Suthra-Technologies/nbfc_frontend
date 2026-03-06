import { useState } from 'react';
import {
    Shield,
    Save,
    RotateCcw,
    User,
    MapPin,
    Heart,
    Link,
    Briefcase
} from 'lucide-react';
import './producer.css';

const INITIAL_FORM = {
    // Header
    date: new Date().toISOString().split('T')[0],
    memberType: 'Select',
    membershipId: 'Select',

    // Individual Details
    customerName: '',
    fatherHusbandName: '',
    motherName: '',
    gender: '',
    dob: '',
    age: '',
    mobileNo: '',
    occupation: '',
    adharNo: '',
    panNo: '',

    // Permanent Address
    p_houseNo: '', p_street: '', p_village: '', p_district: '', p_state: '', p_country: '', p_postOffice: '', p_pincode: '',

    // Correspondence Address
    c_houseNo: '', c_street: '', c_village: '', c_district: '', c_state: '', c_country: '', c_postOffice: '', c_pincode: '',

    // Nominee Details
    n_name: '', n_relation: '', n_age: '', n_houseNo: '', n_street: '', n_village: '', n_district: '', n_state: '', n_country: '', n_postOffice: '', n_pincode: '', n_mobile: '',

    // Introducer
    introducerName: 'Select',
    introducerCode: '',
};

export function Insurance() {
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
                    <h1>Insurance Services</h1>
                    <p>Protect members and their assets with curated insurance policies.</p>
                </div>
                <div className="flex gap-2">
                    <span className="pc-badge"><Shield size={11} /> Member Protection</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Header Configuration */}
                <div className="pc-card">
                    <div className="pc-form" style={{ padding: '0.75rem' }}>
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Date : *</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Member Type : *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)}>
                                    <option>Select</option><option>MEMBER</option><option>CLASS B</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Membership No/ID : *</label>
                                <select className="pc-select" value={form.membershipId} onChange={e => set('membershipId', e.target.value)}>
                                    <option>Select</option><option value="M001">M001</option>
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
                            <div className="pc-field"><label className="pc-label">Customer Name :*</label><input className="pc-input" placeholder="Enter The Customer Name" value={form.customerName} onChange={e => set('customerName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Father's/Husband Name:*</label><input className="pc-input" placeholder="Enter The Father's Name" value={form.fatherHusbandName} onChange={e => set('fatherHusbandName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mother Name :*</label><input className="pc-input" placeholder="Enter The Mother Name" value={form.motherName} onChange={e => set('motherName', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Gender :</label><input className="pc-input" placeholder="Enter The Gender" value={form.gender} onChange={e => set('gender', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Date of Birth :</label><input className="pc-input" placeholder="Enter The D.O.B" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Age:</label><input className="pc-input" placeholder="Enter The Age" value={form.age} onChange={e => set('age', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Mobile Number :*</label><input className="pc-input" placeholder="Enter The Mobile No." value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Occupation :</label><input className="pc-input" placeholder="Enter The Occupation" value={form.occupation} onChange={e => set('occupation', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">AdharCard No. :*</label><input className="pc-input" placeholder="Enter AdharCard no." value={form.adharNo} onChange={e => set('adharNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">PAN No. :</label><input className="pc-input" placeholder="ENTER PAN NO." value={form.panNo} onChange={e => set('panNo', e.target.value)} /></div>
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
                            <div className="pc-field"><label className="pc-label">House No. :*</label><input className="pc-input" placeholder="Enter The House No." value={form.p_houseNo} onChange={e => set('p_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street :*</label><input className="pc-input" placeholder="Enter The Street" value={form.p_street} onChange={e => set('p_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village :*</label><input className="pc-input" placeholder="Enter The Village" value={form.p_village} onChange={e => set('p_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter The District" value={form.p_district} onChange={e => set('p_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :</label><input className="pc-input" placeholder="Enter The State" value={form.p_state} onChange={e => set('p_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter The Country" value={form.p_country} onChange={e => set('p_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office :*</label><input className="pc-input" placeholder="Enter The Post Office" value={form.p_postOffice} onChange={e => set('p_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :</label><input className="pc-input" placeholder="Enter The Pincode" value={form.p_pincode} onChange={e => set('p_pincode', e.target.value)} /></div>
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
                            <div className="pc-field"><label className="pc-label">House No :*</label><input className="pc-input" placeholder="Enter The House No." value={form.c_houseNo} onChange={e => set('c_houseNo', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Street :*</label><input className="pc-input" placeholder="Enter The Street" value={form.c_street} onChange={e => set('c_street', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Village :*</label><input className="pc-input" placeholder="Enter The Village" value={form.c_village} onChange={e => set('c_village', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">District :</label><input className="pc-input" placeholder="Enter The District" value={form.c_district} onChange={e => set('c_district', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">State :</label><input className="pc-input" placeholder="Enter The State" value={form.c_state} onChange={e => set('c_state', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Country:</label><input className="pc-input" placeholder="Enter The Country" value={form.c_country} onChange={e => set('c_country', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Post Office :*</label><input className="pc-input" placeholder="Enter The Post Office" value={form.c_postOffice} onChange={e => set('c_postOffice', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">Pincode :</label><input className="pc-input" placeholder="Enter The Pincode" value={form.c_pincode} onChange={e => set('c_pincode', e.target.value)} /></div>
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
                            <div className="pc-field"><label className="pc-label">Nomminee Name :*</label><input className="pc-input" placeholder="Enter Nominne Name" value={form.n_name} onChange={e => set('n_name', e.target.value)} /></div>
                            <div className="pc-field"><label className="pc-label">RELATION :*</label><input className="pc-input" placeholder="Enter Relation" value={form.n_relation} onChange={e => set('n_relation', e.target.value)} /></div>
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
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Introducer Name:</label>
                                <select className="pc-select" value={form.introducerName} onChange={e => set('introducerName', e.target.value)}>
                                    <option>Select</option><option>Direct</option>
                                </select>
                            </div>
                            <div className="pc-field"><label className="pc-label">Introducer Code:</label><input className="pc-input" placeholder="Enter Introducer Code" value={form.introducerCode} onChange={e => set('introducerCode', e.target.value)} /></div>
                        </div>
                    </div>
                </div>

                <div className="pc-submit-bar" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{saved ? '✅ Insurance Policy Issued!' : '* Please ensure all mandatory fields are filled'}</span>
                    <div className="pc-submit-actions">
                        <button type="button" className="pc-btn-ghost" onClick={() => setForm(INITIAL_FORM)}>Reset Form</button>
                        <button type="submit" className="pc-btn-primary" style={{ minWidth: '150px' }}>
                            <Shield size={14} style={{ marginRight: '8px' }} /> Save & Issue Policy
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

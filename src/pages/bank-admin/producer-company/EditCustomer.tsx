import { useState } from 'react';
import {
    Save,
    RefreshCcw,
    Trash2,
    User,
    MapPin,
    Users,
    Shield,
    Eye
} from 'lucide-react';
import './producer.css';

const ADDRESS_INITIAL = {
    houseNo: '', area: '', rural: '',
    country: 'India', state: '', district: '',
    mandal: '', city: '', landmark: '',
    ruralArea: '', cityArea: '', pincode: ''
};

const INITIAL_FORM = {
    memberType: '',
    membershipId: '',
    joiningDate: new Date().toISOString().split('T')[0],

    // Customer Details
    customerName: '',
    fatherName: '',
    motherName: '',
    gender: '',
    dob: '',
    age: '',
    occupation: '',
    aadhar: '',
    pan: '',
    mobile: '',
    photo: null as any,
    signature: null as any,

    // Addresses
    permanent: { ...ADDRESS_INITIAL },
    correspondence: { ...ADDRESS_INITIAL },
    sameCorrespondence: false,

    // Nominee
    nomineeName: '',
    relation: '',
    nomineeAge: '',
    nomineeMobile: '',
    nomineeAddress: { ...ADDRESS_INITIAL },
    sameNominee: false,

    // KYC
    kyc: {
        idType: '', idNo: '', idFile: null as any,
        addressType: '', addressNo: '', addressFile: null as any,
        otherType: '', otherNo: '', otherFile: null as any
    }
};

export function EditCustomer() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
    
    const setAddr = (type: 'permanent' | 'correspondence' | 'nomineeAddress', k: string, v: string) => {
        setForm(f => ({
            ...f,
            [type]: { ...f[type], [k]: v }
        }));
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleRefresh = () => setForm(INITIAL_FORM);
    const handleDelete = () => { if(window.confirm("Confirm delete?")) setForm(INITIAL_FORM); };

    const renderAddressFields = (type: 'permanent' | 'correspondence' | 'nomineeAddress') => (
        <div className="pc-grid">
            <div className="pc-field">
                <label className="pc-label">House No.:</label>
                <input className="pc-input" placeholder="Enter House No." value={form[type].houseNo} onChange={e => setAddr(type, 'houseNo', e.target.value)} />
            </div>
            <div className="pc-field">
                <label className="pc-label">Area :</label>
                <input className="pc-input" placeholder="Enter Street" value={form[type].area} onChange={e => setAddr(type, 'area', e.target.value)} />
            </div>
            <div className="pc-field">
                <label className="pc-label">Rural :</label>
                <input className="pc-input" placeholder="Enter Village" value={form[type].rural} onChange={e => setAddr(type, 'rural', e.target.value)} />
            </div>
            <div className="pc-field">
                <label className="pc-label">Country:</label>
                <select className="pc-select" value={form[type].country} onChange={e => setAddr(type, 'country', e.target.value)}>
                    <option value="India">India</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">State : *</label>
                <select className="pc-select" value={form[type].state} onChange={e => setAddr(type, 'state', e.target.value)}>
                    <option value="">Select State</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">District :</label>
                <select className="pc-select" value={form[type].district} onChange={e => setAddr(type, 'district', e.target.value)}>
                    <option value="">Select District</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">Mandal :</label>
                <select className="pc-select" value={form[type].mandal} onChange={e => setAddr(type, 'mandal', e.target.value)}>
                    <option value="">Select Mandal</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">City : *</label>
                <input className="pc-input" placeholder="Enter City" value={form[type].city} onChange={e => setAddr(type, 'city', e.target.value)} />
            </div>
            <div className="pc-field">
                <label className="pc-label">Land Mark :</label>
                <input className="pc-input" placeholder="Enter Land Mark" value={form[type].landmark} onChange={e => setAddr(type, 'landmark', e.target.value)} />
            </div>
            <div className="pc-field">
                <label className="pc-label">Rural Area :</label>
                <input className="pc-input" placeholder="Enter Rural Area" value={form[type].ruralArea} onChange={e => setAddr(type, 'ruralArea', e.target.value)} />
            </div>
            <div className="pc-field">
                <label className="pc-label">City Area :</label>
                <input className="pc-input" placeholder="Enter City Area" value={form[type].cityArea} onChange={e => setAddr(type, 'cityArea', e.target.value)} />
            </div>
            <div className="pc-field">
                <label className="pc-label">Pincode : *</label>
                <input className="pc-input" placeholder="Enter Pincode" value={form[type].pincode} onChange={e => setAddr(type, 'pincode', e.target.value)} />
            </div>
        </div>
    );

    return (
        <div className="pc-container pb-20">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Edit Customer</h1>
                    <p>Modify existing customer profiles and membership details.</p>
                </div>
                <div className="flex gap-2">
                    <button type="button" className="pc-btn-primary flex items-center gap-2" onClick={handleUpdate}>
                        <Save size={14} /> Update
                    </button>
                    <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition-colors flex items-center gap-2 text-sm font-medium" onClick={handleDelete}>
                        <Trash2 size={14} /> Delete
                    </button>
                    <button type="button" className="pc-btn-ghost flex items-center gap-2" onClick={handleRefresh}>
                        <RefreshCcw size={14} /> Refresh
                    </button>
                </div>
            </div>

            <form onSubmit={handleUpdate}>
                {/* Header Selection */}
                <div className="pc-card">
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type: *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)}>
                                    <option value="">Select Member</option>
                                    <option value="MEMBER">MEMBER</option>
                                    <option value="CLASS B">CLASS B</option>
                                </select>
                            </div>
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">Membership ID: *</label>
                                <select className="pc-select" value={form.membershipId} onChange={e => set('membershipId', e.target.value)}>
                                    <option value="">Select MemberShip ID</option>
                                    <option value="M001">M001 - John Doe</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Joining Date : *</label>
                                <input type="date" className="pc-input" value={form.joiningDate} onChange={e => set('joiningDate', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><User size={14} /></div>
                        <p className="pc-card-title">Customer Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Customer Name : *</label>
                                <input className="pc-input" placeholder="Enter Customer Name" value={form.customerName} onChange={e => set('customerName', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Father Name :</label>
                                <input className="pc-input" placeholder="Enter Father Name" value={form.fatherName} onChange={e => set('fatherName', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mother Name :</label>
                                <input className="pc-input" placeholder="Enter Mother Name" value={form.motherName} onChange={e => set('motherName', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Gender : *</label>
                                <select className="pc-select" value={form.gender} onChange={e => set('gender', e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date Of Birth :</label>
                                <input type="date" className="pc-input" value={form.dob} onChange={e => set('dob', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Age :</label>
                                <input className="pc-input" value={form.age} onChange={e => set('age', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Occupation :</label>
                                <input className="pc-input" value={form.occupation} onChange={e => set('occupation', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">AadharCard No. :</label>
                                <input className="pc-input" placeholder="Enter AadharCard no." value={form.aadhar} onChange={e => set('aadhar', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">PAN No. :</label>
                                <input className="pc-input" placeholder="ENTER PAN NO." value={form.pan} onChange={e => set('pan', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile Number : *</label>
                                <input className="pc-input" placeholder="Enter Mobile No." value={form.mobile} onChange={e => set('mobile', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Customer Photo :</label>
                                <div className="flex gap-2">
                                    <input type="file" className="hidden" id="photo-upload" />
                                    <label htmlFor="photo-upload" className="pc-btn-ghost px-3 py-1 text-xs cursor-pointer">Browse...</label>
                                </div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Customer Signature :</label>
                                <div className="flex gap-2">
                                     <input type="file" className="hidden" id="sign-upload" />
                                    <label htmlFor="sign-upload" className="pc-btn-ghost px-3 py-1 text-xs cursor-pointer">Browse...</label>
                                    <button type="button" className="pc-btn-primary px-3 py-1 text-xs flex items-center gap-1">
                                        <Eye size={12} /> View Documents
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permanent Address */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><MapPin size={14} /></div>
                        <p className="pc-card-title">Permanent Address</p>
                    </div>
                    <div className="pc-form">
                        {renderAddressFields('permanent')}
                    </div>
                </div>

                {/* Correspondence Address */}
                <div className="pc-card">
                    <div className="pc-card-header flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="pc-card-icon"><MapPin size={14} /></div>
                            <p className="pc-card-title">Correspondence Address</p>
                        </div>
                        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                            <input type="checkbox" checked={form.sameCorrespondence} onChange={e => set('sameCorrespondence', e.target.checked)} /> Same As Above
                        </label>
                    </div>
                    {!form.sameCorrespondence && (
                        <div className="pc-form animate-in fade-in duration-300">
                            {renderAddressFields('correspondence')}
                        </div>
                    )}
                </div>

                {/* Nominee Details */}
                <div className="pc-card">
                    <div className="pc-card-header flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="pc-card-icon"><Users size={14} /></div>
                            <p className="pc-card-title">Nominee Details</p>
                        </div>
                        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                            <input type="checkbox" checked={form.sameNominee} onChange={e => set('sameNominee', e.target.checked)} /> Same As Above
                        </label>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid mb-4">
                            <div className="pc-field">
                                <label className="pc-label">Nominee Name : *</label>
                                <input className="pc-input" placeholder="Enter Nominee Name" value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation : *</label>
                                <select className="pc-select" value={form.relation} onChange={e => set('relation', e.target.value)}>
                                    <option value="">Select Relation</option>
                                    <option value="FATHER">FATHER</option>
                                    <option value="MOTHER">MOTHER</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Age : *</label>
                                <input className="pc-input" placeholder="Enter Age" value={form.nomineeAge} onChange={e => set('nomineeAge', e.target.value)} />
                            </div>
                        </div>
                        {!form.sameNominee && (
                            <div className="animate-in fade-in duration-300">
                                {renderAddressFields('nomineeAddress')}
                                <div className="pc-grid mt-4">
                                    <div className="pc-field">
                                        <label className="pc-label">Mobile No. :</label>
                                        <input className="pc-input" placeholder="Enter Mobile no." value={form.nomineeMobile} onChange={e => set('nomineeMobile', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* KYC Status */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Shield size={14} /></div>
                        <p className="pc-card-title">KYC Status</p>
                    </div>
                    <div className="pc-form">
                        <div className="space-y-4">
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">Id Proof Type :</label>
                                    <select className="pc-select" value={form.kyc.idType} onChange={e => set('kyc', {...form.kyc, idType: e.target.value})}>
                                        <option value="">Select Id Proof Type</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">&nbsp;</label>
                                    <input className="pc-input" value={form.kyc.idNo} onChange={e => set('kyc', {...form.kyc, idNo: e.target.value})} />
                                </div>
                                <div className="pc-field flex items-end">
                                    <button type="button" className="pc-btn-ghost text-xs px-4 py-1.5 h-[34px]">Browse...</button>
                                </div>
                            </div>
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">Address Proof Type :</label>
                                    <select className="pc-select" value={form.kyc.addressType} onChange={e => set('kyc', {...form.kyc, addressType: e.target.value})}>
                                        <option value="">Select Address Proof Type</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">&nbsp;</label>
                                    <input className="pc-input" value={form.kyc.addressNo} onChange={e => set('kyc', {...form.kyc, addressNo: e.target.value})} />
                                </div>
                                <div className="pc-field flex items-end">
                                    <button type="button" className="pc-btn-ghost text-xs px-4 py-1.5 h-[34px]">Browse...</button>
                                </div>
                            </div>
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">Other Document :</label>
                                    <input className="pc-input" placeholder="Enter Other Document" value={form.kyc.otherType} onChange={e => set('kyc', {...form.kyc, otherType: e.target.value})} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">&nbsp;</label>
                                    <input className="pc-input" value={form.kyc.otherNo} onChange={e => set('kyc', {...form.kyc, otherNo: e.target.value})} />
                                </div>
                                <div className="pc-field flex items-end">
                                    <button type="button" className="pc-btn-ghost text-xs px-4 py-1.5 h-[34px]">Browse...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button type="submit" className="pc-btn-primary px-10 py-2.5 flex items-center gap-2">
                        <Save size={16} /> Update Details
                    </button>
                    <button type="button" className="pc-btn-ghost px-10 py-2.5 flex items-center gap-2" onClick={handleRefresh}>
                        <RefreshCcw size={16} /> Reset Form
                    </button>
                </div>

                {saved && (
                    <div className="pc-alert fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-in fade-in slide-in-from-bottom-4">
                        Customer Details Updated Successfully!
                    </div>
                )}
            </form>
        </div>
    );
}
export default EditCustomer;

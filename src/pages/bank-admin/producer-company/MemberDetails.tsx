import { useState, useEffect } from 'react';
import { UserPlus, Save, RotateCcw, Image, FileText, MapPin, Phone, Users, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';
import './producer.css';
import { memberService } from '@/services/member.service';

const INITIAL_ADDRESS = {
    houseNo: '',
    area: '',
    rural: '',
    country: 'India',
    state: 'ANDHRA PRADESH',
    district: '',
    mandal: '',
    city: '',
    landmark: '',
    ruralArea: '',
    cityArea: '',
    pincode: ''
};

const EMPTY_FORM = {
    memberType: 'MEMBER',
    registrationDate: new Date().toISOString().split('T')[0],
    membershipFee: '50',
    // Customer Details
    name: '',
    fatherHusbandName: '',
    motherName: '',
    gender: '',
    dob: '',
    age: '',
    occupation: '',
    aadharNo: '',
    panNo: '',
    // Mobile Details
    mobile1: '',
    landline: '',
    alternateMobile: '',
    mobile4: '',
    // Addresses
    permanentAddress: { ...INITIAL_ADDRESS },
    correspondenceAddress: { ...INITIAL_ADDRESS },
    sameAsPermanent: false,
    // Nominee
    nominee: {
        name: '',
        relation: '',
        age: '',
        mobileNo: '',
        address: { ...INITIAL_ADDRESS },
        sameAsPermanent: false
    },
    // KYC
    kyc: {
        idProofType: '',
        addressProofType: '',
        otherDocumentLabel: ''
    }
};

export default function MemberDetails() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 4000);
    };

    // Handle nested field updates
    const updateField = (path: string, value: any) => {
        setForm(prev => {
            const newForm = JSON.parse(JSON.stringify(prev));
            const parts = path.split('.');
            let current = newForm;
            for (let i = 0; i < parts.length - 1; i++) {
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
            return newForm;
        });
    };

    // Calculate age from DOB
    useEffect(() => {
        if (form.dob) {
            const birth = new Date(form.dob);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            updateField('age', age > 0 ? age.toString() : '0');
        }
    }, [form.dob]);

    // Handle "Same as Above" for Correspondence Address
    useEffect(() => {
        if (form.sameAsPermanent) {
            updateField('correspondenceAddress', { ...form.permanentAddress });
        }
    }, [form.sameAsPermanent, form.permanentAddress]);

    // Handle "Same as Above" for Nominee Address
    useEffect(() => {
        if (form.nominee.sameAsPermanent) {
            updateField('nominee.address', { ...form.permanentAddress });
        }
    }, [form.nominee.sameAsPermanent, form.permanentAddress]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [key]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await memberService.createMember({
                ...form,
                membershipFee: Number(form.membershipFee),
                age: Number(form.age),
                nominee: {
                    ...form.nominee,
                    age: Number(form.nominee.age)
                }
            });
            showToast('success', 'Member registered successfully! Member ID assigned.');
            setForm(EMPTY_FORM);
            setPreviews({});
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Failed to save member. Please try again.';
            showToast('error', msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderAddressFields = (prefix: string) => (
        <div className="pc-grid">
            <div className="pc-field">
                <label className="pc-label">House No. / Street</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.houseNo : prefix === 'correspondenceAddress' ? form.correspondenceAddress.houseNo : form.nominee.address.houseNo} onChange={e => updateField(`${prefix}.houseNo`, e.target.value)} placeholder="Enter House No." />
            </div>
            <div className="pc-field">
                <label className="pc-label">Area</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.area : prefix === 'correspondenceAddress' ? form.correspondenceAddress.area : form.nominee.address.area} onChange={e => updateField(`${prefix}.area`, e.target.value)} placeholder="Enter Street" />
            </div>
            <div className="pc-field">
                <label className="pc-label">Rural / Village</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.rural : prefix === 'correspondenceAddress' ? form.correspondenceAddress.rural : form.nominee.address.rural} onChange={e => updateField(`${prefix}.rural`, e.target.value)} placeholder="Enter Village" />
            </div>
            <div className="pc-field">
                <label className="pc-label">Country</label>
                <select className="pc-select" value={prefix === 'permanentAddress' ? form.permanentAddress.country : prefix === 'correspondenceAddress' ? form.correspondenceAddress.country : form.nominee.address.country} onChange={e => updateField(`${prefix}.country`, e.target.value)}>
                    <option>India</option>
                    <option>Other</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">State *</label>
                <select className="pc-select" value={prefix === 'permanentAddress' ? form.permanentAddress.state : prefix === 'correspondenceAddress' ? form.correspondenceAddress.state : form.nominee.address.state} onChange={e => updateField(`${prefix}.state`, e.target.value)}>
                    <option>ANDHRA PRADESH</option>
                    <option>TELANGANA</option>
                    <option>TAMIL NADU</option>
                    <option>KARNATAKA</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">District</label>
                <select className="pc-select" value={prefix === 'permanentAddress' ? form.permanentAddress.district : prefix === 'correspondenceAddress' ? form.correspondenceAddress.district : form.nominee.address.district} onChange={e => updateField(`${prefix}.district`, e.target.value)}>
                    <option value="">Select District</option>
                    <option>Kurnool</option>
                    <option>Guntur</option>
                    <option>Nellore</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">Mandal</label>
                <select className="pc-select" value={prefix === 'permanentAddress' ? form.permanentAddress.mandal : prefix === 'correspondenceAddress' ? form.correspondenceAddress.mandal : form.nominee.address.mandal} onChange={e => updateField(`${prefix}.mandal`, e.target.value)}>
                    <option value="">Select Mandal</option>
                </select>
            </div>
            <div className="pc-field">
                <label className="pc-label">City *</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.city : prefix === 'correspondenceAddress' ? form.correspondenceAddress.city : form.nominee.address.city} onChange={e => updateField(`${prefix}.city`, e.target.value)} placeholder="Enter City" />
            </div>
            <div className="pc-field">
                <label className="pc-label">Land Mark</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.landmark : prefix === 'correspondenceAddress' ? form.correspondenceAddress.landmark : form.nominee.address.landmark} onChange={e => updateField(`${prefix}.landmark`, e.target.value)} placeholder="Enter Land Mark" />
            </div>
            <div className="pc-field">
                <label className="pc-label">Rural Area</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.ruralArea : prefix === 'correspondenceAddress' ? form.correspondenceAddress.ruralArea : form.nominee.address.ruralArea} onChange={e => updateField(`${prefix}.ruralArea`, e.target.value)} placeholder="Enter Rural Area" />
            </div>
            <div className="pc-field">
                <label className="pc-label">City Area</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.cityArea : prefix === 'correspondenceAddress' ? form.correspondenceAddress.cityArea : form.nominee.address.cityArea} onChange={e => updateField(`${prefix}.cityArea`, e.target.value)} placeholder="Enter City Area" />
            </div>
            <div className="pc-field">
                <label className="pc-label">Pincode *</label>
                <input className="pc-input" value={prefix === 'permanentAddress' ? form.permanentAddress.pincode : prefix === 'correspondenceAddress' ? form.correspondenceAddress.pincode : form.nominee.address.pincode} onChange={e => updateField(`${prefix}.pincode`, e.target.value)} placeholder="Enter Pincode" />
            </div>
        </div>
    );

    return (
        <div className="pc-container">
            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 1.5rem', borderRadius: '0.75rem',
                    background: toast.type === 'success' ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${toast.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                    color: toast.type === 'success' ? '#166534' : '#991b1b',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    fontWeight: 600, fontSize: '0.925rem'
                }}>
                    {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {toast.message}
                </div>
            )}

            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Member Details</h1>
                    <p>Registration and management of producer company members.</p>
                    <span className="pc-badge"><UserPlus size={11} /> New Registration</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* General Info */}
                <div className="pc-card">
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => updateField('memberType', e.target.value)}>
                                    <option>MEMBER</option>
                                    <option>ASSOCIATE</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date *</label>
                                <input type="date" className="pc-input" value={form.registrationDate} onChange={e => updateField('registrationDate', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Membership Fee</label>
                                <input type="number" className="pc-input" value={form.membershipFee} onChange={e => updateField('membershipFee', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Users size={18} /></div>
                        <div>
                            <p className="pc-card-title">Customer Details</p>
                            <p className="pc-card-sub">Personal information of the member</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Customer Name *</label>
                                <input className="pc-input" value={form.name} onChange={e => updateField('name', e.target.value.toUpperCase())} placeholder="ENTER CUSTOMER NAME" required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Father / Husband Name</label>
                                <input className="pc-input" value={form.fatherHusbandName} onChange={e => updateField('fatherHusbandName', e.target.value.toUpperCase())} placeholder="ENTER FATHER NAME" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mother Name</label>
                                <input className="pc-input" value={form.motherName} onChange={e => updateField('motherName', e.target.value.toUpperCase())} placeholder="ENTER MOTHER NAME" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Gender :*</label>
                                <select className="pc-select" value={form.gender} onChange={e => updateField('gender', e.target.value)} required>
                                    <option value="">Select Gender</option>
                                    <option>MALE</option>
                                    <option>FEMALE</option>
                                    <option>OTHER</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date Of Birth :</label>
                                <input type="date" className="pc-input" value={form.dob} onChange={e => updateField('dob', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Age:</label>
                                <input className="pc-input" value={form.age} readOnly style={{ background: '#f1f5f9' }} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Occupation :</label>
                                <input className="pc-input" value={form.occupation} onChange={e => updateField('occupation', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">AadharCard No. :</label>
                                <input className="pc-input" value={form.aadharNo} onChange={e => updateField('aadharNo', e.target.value)} placeholder="Enter AdharCard no." />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">PAN No. :</label>
                                <input className="pc-input" value={form.panNo} onChange={e => updateField('panNo', e.target.value.toUpperCase())} placeholder="ENTER PAN NO." />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Customer Photo :</label>
                                <div className="pc-file-wrapper">
                                    <label className="pc-file-btn">
                                        <Image size={14} /> Browse...
                                        <input type="file" className="pc-file-input" accept="image/*" onChange={e => handleFileChange(e, 'photo')} />
                                    </label>
                                    {previews.photo && <img src={previews.photo} alt="Preview" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />}
                                </div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Customer Signature :</label>
                                <div className="pc-file-wrapper">
                                    <label className="pc-file-btn">
                                        <FileText size={14} /> Browse...
                                        <input type="file" className="pc-file-input" accept="image/*" onChange={e => handleFileChange(e, 'signature')} />
                                    </label>
                                    {previews.signature && <img src={previews.signature} alt="Preview" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Phone size={18} /></div>
                        <div>
                            <p className="pc-card-title">Mobile No. Details</p>
                            <p className="pc-card-sub">Contact information</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Mobile Number1 :*</label>
                                <input className="pc-input" value={form.mobile1} onChange={e => updateField('mobile1', e.target.value)} placeholder="Enter Mobile No1." required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Land No. :</label>
                                <input className="pc-input" value={form.landline} onChange={e => updateField('landline', e.target.value)} placeholder="Enter Mobile No." />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Alternate No. :</label>
                                <input className="pc-input" value={form.alternateMobile} onChange={e => updateField('alternateMobile', e.target.value)} placeholder="Enter Mobile No3." />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile Number4 :</label>
                                <input className="pc-input" value={form.mobile4} onChange={e => updateField('mobile4', e.target.value)} placeholder="Enter Mobile No4." />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permanent Address */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><MapPin size={18} /></div>
                        <div>
                            <p className="pc-card-title">Permanent Address</p>
                            <p className="pc-card-sub">The official residential address</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        {renderAddressFields('permanentAddress')}
                    </div>
                </div>

                {/* Correspondence Address */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><MapPin size={18} /></div>
                        <div>
                            <p className="pc-card-title">Correspondence Address</p>
                            <p className="pc-card-sub">The address for communication</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-checkbox-group">
                            <input type="checkbox" className="pc-checkbox" checked={form.sameAsPermanent} onChange={e => updateField('sameAsPermanent', e.target.checked)} />
                            <label className="pc-label" style={{ margin: 0 }}>Same As Above</label>
                        </div>
                        {!form.sameAsPermanent && renderAddressFields('correspondenceAddress')}
                        {form.sameAsPermanent && (
                            <div className="pc-grid opacity-50 pointer-events-none">
                                {renderAddressFields('correspondenceAddress')}
                            </div>
                        )}
                    </div>
                </div>

                {/* Nominee Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Users size={18} /></div>
                        <div>
                            <p className="pc-card-title">Nominee Details</p>
                            <p className="pc-card-sub">Inheritance / Beneficiary information</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid" style={{ marginBottom: '1.5rem' }}>
                            <div className="pc-field">
                                <label className="pc-label">Nominee Name :*</label>
                                <input className="pc-input" value={form.nominee.name} onChange={e => updateField('nominee.name', e.target.value.toUpperCase())} placeholder="Enter Nominee Name" required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation :*</label>
                                <select className="pc-select" value={form.nominee.relation} onChange={e => updateField('nominee.relation', e.target.value)} required>
                                    <option value="">Select Relation</option>
                                    <option>FATHER</option>
                                    <option>MOTHER</option>
                                    <option>WIFE</option>
                                    <option>HUSBAND</option>
                                    <option>SON</option>
                                    <option>DAUGHTER</option>
                                    <option>BROTHER</option>
                                    <option>SISTER</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Age :*</label>
                                <input type="number" className="pc-input" value={form.nominee.age} onChange={e => updateField('nominee.age', e.target.value)} placeholder="Enter Age" required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile No. :</label>
                                <input className="pc-input" value={form.nominee.mobileNo} onChange={e => updateField('nominee.mobileNo', e.target.value)} placeholder="Enter Mobile no." />
                            </div>
                        </div>

                        <div className="pc-checkbox-group">
                            <input type="checkbox" className="pc-checkbox" checked={form.nominee.sameAsPermanent} onChange={e => updateField('nominee.sameAsPermanent', e.target.checked)} />
                            <label className="pc-label" style={{ margin: 0 }}>Same As Above</label>
                        </div>
                        {!form.nominee.sameAsPermanent && renderAddressFields('nominee.address')}
                        {form.nominee.sameAsPermanent && (
                            <div className="pc-grid opacity-50 pointer-events-none">
                                {renderAddressFields('nominee.address')}
                            </div>
                        )}
                    </div>
                </div>

                {/* KYC Status */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><ShieldCheck size={18} /></div>
                        <div>
                            <p className="pc-card-title">KYC Status</p>
                            <p className="pc-card-sub">Verification and document upload</p>
                        </div>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">Id Proof Type :</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select className="pc-select" value={form.kyc.idProofType} onChange={e => updateField('kyc.idProofType', e.target.value)}>
                                        <option value="">Select Id Proof Type</option>
                                        <option>AADHAR CARD</option>
                                        <option>VOTER ID</option>
                                        <option>DRIVING LICENSE</option>
                                        <option>PASSPORT</option>
                                    </select>
                                    <label className="pc-file-btn">
                                        <FileText size={14} /> Browse...
                                        <input type="file" className="pc-file-input" onChange={e => handleFileChange(e, 'idProof')} />
                                    </label>
                                </div>
                            </div>
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">Address Proof Type :</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select className="pc-select" value={form.kyc.addressProofType} onChange={e => updateField('kyc.addressProofType', e.target.value)}>
                                        <option value="">Select Address Proof Type</option>
                                        <option>RATION CARD</option>
                                        <option>ELECTRICITY BILL</option>
                                        <option>TELEPHONE BILL</option>
                                    </select>
                                    <label className="pc-file-btn">
                                        <FileText size={14} /> Browse...
                                        <input type="file" className="pc-file-input" onChange={e => handleFileChange(e, 'addressProof')} />
                                    </label>
                                </div>
                            </div>
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">Other Document :</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input className="pc-input" value={form.kyc.otherDocumentLabel} onChange={e => updateField('kyc.otherDocumentLabel', e.target.value)} placeholder="Enter Other Document." />
                                    <label className="pc-file-btn">
                                        <FileText size={14} /> Browse...
                                        <input type="file" className="pc-file-input" onChange={e => handleFileChange(e, 'otherDoc')} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="pc-submit-bar">
                    <span className="pc-submit-info">* Ensure all mandatory fields marked with asterisk are filled.</span>
                    <div className="pc-submit-actions">
                        <button type="button" className="pc-btn-ghost" onClick={() => setForm(EMPTY_FORM)}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} /> Reset Form</button>
                        <button type="submit" className="pc-btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : <><Save size={14} /> Save Member Details</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

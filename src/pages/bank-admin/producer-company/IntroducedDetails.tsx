import { useState, useRef } from 'react';
import {
    UserPlus,
    ChevronRight,
    Briefcase,
    Layout,
    Heart,
    UserCheck,
    ChevronLeft,
    Image as ImageIcon,
    Camera,
    FileText,
    Loader2,
    X
} from 'lucide-react';
import './producer.css';


const TABS = [
    "Particulars Of Freelance Employee",
    "Family Details",
    "Other Details",
    "Details of Past Experience"
];

const INITIAL_FORM = {
    // Particulars
    postAppliedFor: 'If any Others',
    employeeName: '',
    rural: '',
    country: 'Select',
    gender: 'Select',
    poSubCity: '',
    pincode: '',
    houseNo: '',
    district: '',
    residenceNo: '',
    area: '',
    state: 'Select',
    mobileNo: '',
    ruralArea: '',
    cityArea: '',
    landMark: '',
    mandal: '',
    dob: '',
    age: '',

    // Family Details
    fatherHusbandName: '',
    motherMaidenName: '',
    nomineeName: '',
    familyRelation: '',
    familyRuralArea: '',
    familyState: 'Select',
    familyMandal: '',
    nomineeHouseNo: '',
    nomineeRural: '',
    nomineeDistrict: '',
    nomineeCityArea: '',
    nomineeCountry: 'Select',
    nomineeMobileNo: '',
    nomineeArea: '',
    nomineePoSubCity: '',
    nomineePincode: '',
    nomineeLandMark: '',
    nomineeAge: '',

    // Other Details
    bankName: '',
    branch: '',
    branchCode: '',
    accountNo: '',
    idProofType: 'Select',
    bankAddress: '',
    ifscCode: '',
    relateCode: '',
    proposedArea: '',
    introducerName: 'Select',
    introducerDesigCode: '',
    issuedOn: '',
    validUpto: '',
    bloodGroup: 'Select',
    occupation: '',
    qualification: 'Select',
    introducerAadhar: '',

    // Past Experience
    prevCompanyName: '',
    joiningDate: '',
    currentGrade: '',
    operationArea: '',
    joiningGrade: '',
};

export function IntroducedDetails() {
    const [activeTab, setActiveTab] = useState(0);
    const [form, setForm] = useState(INITIAL_FORM);
    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState({ photo: false, signature: false });
    const [previews, setPreviews] = useState({ photo: '', signature: '' });

    // Camera State
    const [showCamera, setShowCamera] = useState(false);
    const [captureField, setCaptureField] = useState<'photo' | 'signature' | null>(null);
    const [cameraLoading, setCameraLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const videoCallbackRef = (node: HTMLVideoElement | null) => {
        videoRef.current = node;
        if (node && streamRef.current && node.srcObject !== streamRef.current) {
            node.srcObject = streamRef.current;
            node.play().catch(e => console.error('Camera play error:', e));
        }
    };

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'signature') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(prev => ({ ...prev, [type]: true }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
            setUploading(prev => ({ ...prev, [type]: false }));
        };
        reader.readAsDataURL(file);
    };

    const startCamera = async (type: 'photo' | 'signature') => {
        setCaptureField(type);
        setCameraLoading(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
            });
            streamRef.current = stream;
            setShowCamera(true);
        } catch (err) {
            console.error("Camera error:", err);
            alert("Could not access camera");
            setCameraLoading(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCamera(false);
        setCaptureField(null);
        setCameraLoading(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current && captureField) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                setPreviews(prev => ({ ...prev, [captureField]: dataUrl }));
                stopCamera();
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab < TABS.length - 1) {
            setActiveTab(activeTab + 1);
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
    };

    const handlePrev = () => {
        if (activeTab > 0) setActiveTab(activeTab - 1);
    };

    return (
        <div className="pc-container">
            {/* Camera Capture Dialog */}
            {showCamera && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 10000,
                    background: 'rgba(0,0,0,0.75)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        background: 'white', borderRadius: '12px',
                        padding: '1.5rem', width: '480px', maxWidth: '95vw',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: 32, height: 32, background: '#009BB0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Camera size={16} color="white" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                                        {captureField === 'photo' ? 'Take Employee Photo' : 'Capture Signature'}
                                    </p>
                                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>Position and click Capture</p>
                                </div>
                            </div>
                            <button type="button" onClick={stopCamera} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: 'rgba(100, 116, 139, 1)' }}>
                                <X size={18} />
                            </button>
                        </div>
                        <div style={{ position: 'relative', background: '#0f172a', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', aspectRatio: '4/3' }}>
                            {cameraLoading && (
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', gap: '0.75rem' }}>
                                    <Loader2 size={32} className="animate-spin" />
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Initializing camera...</span>
                                </div>
                            )}
                            <video
                                ref={videoCallbackRef}
                                autoPlay
                                playsInline
                                muted
                                onLoadedMetadata={() => setCameraLoading(false)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: cameraLoading ? 0 : 1, transition: 'opacity 0.2s' }}
                            />
                            {!cameraLoading && captureField === 'photo' && (
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    width: '140px', height: '170px',
                                    border: '2px solid rgba(255,255,255,0.6)',
                                    borderRadius: '4px',
                                    pointerEvents: 'none'
                                }} />
                            )}
                        </div>
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                type="button"
                                onClick={stopCamera}
                                style={{
                                    flex: 1, padding: '0.6rem', background: 'white',
                                    border: '1px solid #e2e8f0', borderRadius: '8px',
                                    fontSize: '0.8rem', fontWeight: 700, color: '#64748b', cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={capturePhoto}
                                disabled={cameraLoading}
                                style={{
                                    flex: 2, padding: '0.6rem', background: cameraLoading ? '#94a3b8' : '#009BB0',
                                    border: 'none', borderRadius: '8px',
                                    fontSize: '0.8rem', fontWeight: 700, color: 'white', cursor: cameraLoading ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    boxShadow: '0 4px 12px rgba(0,155,176,0.3)'
                                }}
                            >
                                <Camera size={16} />
                                {captureField === 'photo' ? 'Capture Photo' : 'Capture Signature'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Applications</h1>
                    <p>Register freelance employee applications.</p>
                </div>
                <span className="pc-badge"><UserPlus size={10} /> New</span>
            </div>

            <div className="pc-tabs">
                {TABS.map((tab, idx) => (
                    <button
                        key={tab}
                        className={`pc-tab ${activeTab === idx ? 'active' : ''}`}
                        onClick={() => setActiveTab(idx)}
                    >
                        {tab.split(' ').slice(0, 2).join(' ')}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pc-card" style={{ marginBottom: '0.5rem' }}>
                    <div className="pc-form" style={{ padding: '0.5rem 0.75rem' }}>
                        <div className="pc-grid">
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">Post Applied For: *</label>
                                <select
                                    className="pc-select"
                                    value={form.postAppliedFor}
                                    onChange={e => set('postAppliedFor', e.target.value)}
                                >
                                    <option>Select</option>
                                    <option>If any Others</option>
                                    <option>Board of Directors</option>
                                    <option>Existing Members</option>
                                    <option>Marketing Executive Manager</option>
                                    <option>Marketing Zonal Officer</option>
                                    <option>Marketing Group Officer</option>
                                    <option>Marketing Group Executive</option>
                                    <option>Marketing Group Program Officer</option>
                                    <option>Marketing Group Trainer</option>
                                    <option>Marketing Trainer</option>
                                    <option>Marketing Advisor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 0 && (
                    <div className="pc-card">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><Layout size={14} /></div>
                            <div>
                                <p className="pc-card-title">Particulars</p>
                                <p className="pc-card-sub">Employee identification</p>
                            </div>
                        </div>

                        <div className="pc-form">
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">Name: *</label>
                                    <input className="pc-input" placeholder="Enter Full Name" value={form.employeeName} onChange={e => set('employeeName', e.target.value)} required />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Rural :</label>
                                    <input className="pc-input" placeholder="Enter Village" value={form.rural} onChange={e => set('rural', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Country: *</label>
                                    <select className="pc-select" value={form.country} onChange={e => set('country', e.target.value)}>
                                        <option>Select</option><option>India</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Gender: *</label>
                                    <select className="pc-select" value={form.gender} onChange={e => set('gender', e.target.value)}>
                                        <option>Select</option><option>Male</option><option>Female</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Sub-City: *</label>
                                    <input className="pc-input" placeholder="Enter Post Office" value={form.poSubCity} onChange={e => set('poSubCity', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Pincode:</label>
                                    <input className="pc-input" placeholder="Enter Pincode" value={form.pincode} onChange={e => set('pincode', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">House No:</label>
                                    <input className="pc-input" placeholder="Enter House No" value={form.houseNo} onChange={e => set('houseNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">District:</label>
                                    <input className="pc-input" placeholder="Enter District" value={form.district} onChange={e => set('district', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Res No.:</label>
                                    <input className="pc-input" placeholder="Enter Residence No." value={form.residenceNo} onChange={e => set('residenceNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Area:</label>
                                    <input className="pc-input" placeholder="Enter Street" value={form.area} onChange={e => set('area', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">State: *</label>
                                    <select className="pc-select" value={form.state} onChange={e => set('state', e.target.value)}>
                                        <option>Select</option><option>Telangana</option><option>AP</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Mobile: *</label>
                                    <input className="pc-input" placeholder="Enter Mobile No." value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Rural Area:</label>
                                    <input className="pc-input" placeholder="Enter Rural Area" value={form.ruralArea} onChange={e => set('ruralArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">City Area:</label>
                                    <input className="pc-input" placeholder="Enter City Area" value={form.cityArea} onChange={e => set('cityArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Land Mark:</label>
                                    <input className="pc-input" placeholder="Enter Land Mark" value={form.landMark} onChange={e => set('landMark', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Mandal:</label>
                                    <input className="pc-input" placeholder="Enter Mandal" value={form.mandal} onChange={e => set('mandal', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">DOB:</label>
                                    <input type="date" className="pc-input" value={form.dob} onChange={e => set('dob', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Age:</label>
                                    <input className="pc-input" placeholder="Enter Age" value={form.age} readOnly style={{ background: '#f8fafc' }} />
                                </div>
                                <div className="pc-field" style={{ gridColumn: '1 / span 2' }}>
                                    <label className="pc-label">Employee Photo :</label>
                                    <div className="pc-photo-upload-area">
                                        <div className="pc-photo-frame">
                                            {previews.photo ? (
                                                <img src={previews.photo} alt="Preview" />
                                            ) : (
                                                <div className="pc-photo-placeholder">
                                                    <ImageIcon size={24} />
                                                    <span>PHOTO</span>
                                                </div>
                                            )}
                                            {uploading.photo && <div className="pc-photo-overlay"><Loader2 size={20} className="animate-spin" /></div>}
                                        </div>
                                        <div className="pc-photo-actions">
                                            <button type="button" className="pc-action-btn primary" onClick={() => startCamera('photo')} disabled={uploading.photo}>
                                                <Camera size={14} /> Take Photo
                                            </button>
                                            <label className={`pc-action-btn secondary ${uploading.photo ? 'disabled' : ''}`}>
                                                <ImageIcon size={14} /> Browse
                                                <input type="file" className="pc-file-input" accept="image/*" onChange={e => handleFileChange(e, 'photo')} disabled={uploading.photo} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="pc-field" style={{ gridColumn: '3 / span 2' }}>
                                    <label className="pc-label">Employee Signature :</label>
                                    <div className="pc-photo-upload-area">
                                        <div className="pc-sig-frame">
                                            {previews.signature ? (
                                                <img src={previews.signature} alt="Preview" />
                                            ) : (
                                                <div className="pc-photo-placeholder">
                                                    <FileText size={24} />
                                                    <span>SIGNATURE</span>
                                                </div>
                                            )}
                                            {uploading.signature && <div className="pc-photo-overlay"><Loader2 size={20} className="animate-spin" /></div>}
                                        </div>
                                        <div className="pc-photo-actions">
                                            <button type="button" className="pc-action-btn primary" onClick={() => startCamera('signature')} disabled={uploading.signature}>
                                                <Camera size={14} /> Capture
                                            </button>
                                            <label className={`pc-action-btn secondary ${uploading.signature ? 'disabled' : ''}`}>
                                                <FileText size={14} /> Browse
                                                <input type="file" className="pc-file-input" accept="image/*" onChange={e => handleFileChange(e, 'signature')} disabled={uploading.signature} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="pc-card">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><Heart size={14} /></div>
                            <div><p className="pc-card-title">Family</p></div>
                        </div>
                        <div className="pc-form">
                            <div className="pc-grid">
                                <div className="pc-field"><label className="pc-label">Father/Husband Name:*</label><input className="pc-input" placeholder="Enter Father/Husband Name" value={form.fatherHusbandName} onChange={e => set('fatherHusbandName', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Mother Maiden:*</label><input className="pc-input" placeholder="Enter Mother's Maiden Name" value={form.motherMaidenName} onChange={e => set('motherMaidenName', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Nominee Name</label><input className="pc-input" placeholder="Enter Nominee Name" value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Relation</label><input className="pc-input" placeholder="Enter Relation" value={form.familyRelation} onChange={e => set('familyRelation', e.target.value)} /></div>
                                <div className="pc-divider-h pc-grid-full" />
                                <div className="pc-field"><label className="pc-label">Nominee House</label><input className="pc-input" placeholder="Enter House No." value={form.nomineeHouseNo} onChange={e => set('nomineeHouseNo', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Nominee Rural</label><input className="pc-input" placeholder="Enter Village" value={form.nomineeRural} onChange={e => set('nomineeRural', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Nominee Dist</label><input className="pc-input" placeholder="Enter District" value={form.nomineeDistrict} onChange={e => set('nomineeDistrict', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Nominee Mobile:*</label><input className="pc-input" placeholder="Enter Mobile No." value={form.nomineeMobileNo} onChange={e => set('nomineeMobileNo', e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="pc-card">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><UserCheck size={14} /></div>
                            <div><p className="pc-card-title">Other Details</p></div>
                        </div>
                        <div className="pc-form">
                            <div className="pc-grid">
                                <div className="pc-field"><label className="pc-label">Bank Name</label><input className="pc-input" placeholder="Enter Bank Name" value={form.bankName} onChange={e => set('bankName', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Acc No</label><input className="pc-input" placeholder="Enter Account No." value={form.accountNo} onChange={e => set('accountNo', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">IFSC</label><input className="pc-input" placeholder="Enter IFSC Code" value={form.ifscCode} onChange={e => set('ifscCode', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Blood Group</label><select className="pc-select" value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}><option>Select</option><option>A+</option><option>B+</option><option>O+</option></select></div>
                                <div className="pc-field"><label className="pc-label">Introducer:*</label><select className="pc-select" value={form.introducerName} onChange={e => set('introducerName', e.target.value)}><option>Select</option><option>Admin</option></select></div>
                                <div className="pc-field"><label className="pc-label">Qualification</label><select className="pc-select" value={form.qualification} onChange={e => set('qualification', e.target.value)}><option>Select</option><option>Grad</option><option>Post-Grad</option></select></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 3 && (
                    <div className="pc-card">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><Briefcase size={14} /></div>
                            <div><p className="pc-card-title">Experience</p></div>
                        </div>
                        <div className="pc-form">
                            <div className="pc-grid">
                                <div className="pc-field pc-grid-double"><label className="pc-label">Company Name</label><input className="pc-input" placeholder="Enter Company Name" value={form.prevCompanyName} onChange={e => set('prevCompanyName', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Join Date</label><input type="date" className="pc-input" value={form.joiningDate} onChange={e => set('joiningDate', e.target.value)} /></div>
                                <div className="pc-field"><label className="pc-label">Operation Area</label><input className="pc-input" placeholder="Enter Operation Area" value={form.operationArea} onChange={e => set('operationArea', e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="pc-submit-bar" style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem' }}>{saved ? '✅ Saved!' : '* Mandatory'}</span>
                    <div className="pc-submit-actions">
                        {activeTab > 0 && <button type="button" className="pc-btn-ghost" onClick={handlePrev}><ChevronLeft size={12} /></button>}
                        <button type="button" className="pc-btn-ghost" onClick={() => setForm(INITIAL_FORM)}>Reset</button>
                        <button type="submit" className="pc-btn-primary">
                            {activeTab === TABS.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={12} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

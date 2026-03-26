import { useState, useRef, useEffect } from 'react';
import { UserPlus, ChevronRight, Briefcase, Layout, Heart, UserCheck, ChevronLeft, Image as ImageIcon, Camera, FileText, Loader2, X } from 'lucide-react';
import './producer.css';
import { introducerService } from '@/services/introducer.service';
import { uploadService } from '@/services/upload.service';
import { useNotification } from '@/components/common/NotificationProvider';


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
    familyRuralArea: '',
    familyState: 'Select',
    familyMandal: '',
    nominee: {
        name: '',
        relation: '',
        age: '',
        mobileNo: '',
        address: {
            houseNo: '',
            area: '',
            rural: '',
            country: 'Select',
            state: 'Select',
            district: '',
            cityArea: '',
            landMark: '',
            poSubCity: '',
            pincode: ''
        }
    },
    
    // Other Details
    bankAccount: {
        bankName: '',
        branch: '',
        branchCode: '',
        accountNo: '',
        bankAddress: '',
        ifscCode: '',
    },
    idProofType: 'Select',
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
    experience: {
        companyName: '',
        joiningDate: '',
        currentGrade: '',
        operationArea: '',
        joiningGrade: '',
    }
};

export function IntroducedDetails() {
    const [activeTab, setActiveTab] = useState(0);
    const [form, setForm] = useState(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const { success: notifySuccess, error: notifyError } = useNotification();

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

    const updateField = (path: string, value: any) => {
        setForm(prev => {
            const newForm = JSON.parse(JSON.stringify(prev));
            const parts = path.split('.');
            let current = newForm;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!current[parts[i]]) current[parts[i]] = {};
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
            return newForm;
        });
    };



    // Age calculation
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        uploadFile(file, key);
    };

    const uploadFile = async (file: File | Blob, key: string) => {
        // Local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviews(prev => ({ ...prev, [key]: reader.result as string }));
        };
        reader.readAsDataURL(file);

        // Upload to S3
        setUploading(prev => ({ ...prev, [key]: true }));
        try {
            const fileToUpload = file instanceof File ? file : new File([file], `${key}_${Date.now()}.jpg`, { type: 'image/jpeg' });
            const data = await uploadService.uploadSingle(fileToUpload);
            
            if (key === 'photo') updateField('photoUrl', data.url);
            else if (key === 'signature') updateField('signatureUrl', data.url);
            
            notifySuccess('Upload Successful', `${key} uploaded successfully`);
        } catch (error) {
            notifyError('Upload Failed', `Failed to upload ${key}.`);
        } finally {
            setUploading(prev => ({ ...prev, [key]: false }));
        }
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
            console.error("Camera error..:", err);
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
                canvas.toBlob((blob) => {
                    if (blob) uploadFile(blob, captureField);
                }, 'image/jpeg', 0.9);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab < TABS.length - 1) {
            setActiveTab(activeTab + 1);
        } else {
            setIsSubmitting(true);
            try {
                await introducerService.createIntroducer(form as any);
                notifySuccess('Registration Successful', 'Freelance Employee registered successfully');
                setForm(INITIAL_FORM);
                setPreviews({});
                setActiveTab(0);
            } catch (err: any) {
                const msg = err?.response?.data?.message || 'Failed to save details';
                notifyError('Error', msg);
            } finally {
                setIsSubmitting(false);
            }
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
                                    onChange={e => updateField('postAppliedFor', e.target.value)}
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
                                    <input className="pc-input" placeholder="Enter Full Name" value={form.employeeName} onChange={e => updateField('employeeName', e.target.value)} required />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Rural :</label>
                                    <input className="pc-input" placeholder="Enter Village" value={form.rural} onChange={e => updateField('rural', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Country: *</label>
                                    <select className="pc-select" value={form.country} onChange={e => updateField('country', e.target.value)}>
                                        <option>Select</option><option>India</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Gender: *</label>
                                    <select className="pc-select" value={form.gender} onChange={e => updateField('gender', e.target.value)}>
                                        <option>Select</option><option>Male</option><option>Female</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Sub-City: *</label>
                                    <input className="pc-input" placeholder="Enter Post Office" value={form.poSubCity} onChange={e => updateField('poSubCity', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Pincode:</label>
                                    <input className="pc-input" placeholder="Enter Pincode" value={form.pincode} onChange={e => updateField('pincode', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">House No:</label>
                                    <input className="pc-input" placeholder="Enter House No" value={form.houseNo} onChange={e => updateField('houseNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">District:</label>
                                    <input className="pc-input" placeholder="Enter District" value={form.district} onChange={e => updateField('district', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Res No.:</label>
                                    <input className="pc-input" placeholder="Enter Residence No." value={form.residenceNo} onChange={e => updateField('residenceNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Area:</label>
                                    <input className="pc-input" placeholder="Enter Street" value={form.area} onChange={e => updateField('area', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">State: *</label>
                                    <select className="pc-select" value={form.state} onChange={e => updateField('state', e.target.value)}>
                                        <option>Select</option><option>Telangana</option><option>AP</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Mobile: *</label>
                                    <input className="pc-input" placeholder="Enter Mobile No." value={form.mobileNo} onChange={e => updateField('mobileNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Rural Area:</label>
                                    <input className="pc-input" placeholder="Enter Rural Area" value={form.ruralArea} onChange={e => updateField('ruralArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">City Area:</label>
                                    <input className="pc-input" placeholder="Enter City Area" value={form.cityArea} onChange={e => updateField('cityArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Land Mark:</label>
                                    <input className="pc-input" placeholder="Enter Land Mark" value={form.landMark} onChange={e => updateField('landMark', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Mandal:</label>
                                    <input className="pc-input" placeholder="Enter Mandal" value={form.mandal} onChange={e => updateField('mandal', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">DOB:</label>
                                    <input type="date" className="pc-input" value={form.dob} onChange={e => updateField('dob', e.target.value)} />
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
                            <div>
                                <p className="pc-card-title">Family Details</p>
                                <p className="pc-card-sub">Family & Nominee Information</p>
                            </div>
                        </div>
                        <div className="pc-form">
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">Father's/Husband Name:</label>
                                    <input className="pc-input" placeholder="ENTER FATHER'S/HUSBAND" value={form.fatherHusbandName} onChange={e => updateField('fatherHusbandName', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Mother's Maiden Name:</label>
                                    <input className="pc-input" placeholder="ENTER MOTHER'S MAIDEN" value={form.motherMaidenName} onChange={e => updateField('motherMaidenName', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Nominee's Name:</label>
                                    <input className="pc-input" placeholder="ENTER NOMINEE'S NAME" value={form.nominee.name} onChange={e => updateField('nominee.name', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Relation:</label>
                                    <input className="pc-input" placeholder="Enter Relation" value={form.nominee.relation} onChange={e => updateField('nominee.relation', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Rural Area:</label>
                                    <input className="pc-input" placeholder="Enter Rural Area" value={form.familyRuralArea} onChange={e => updateField('familyRuralArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">State: *</label>
                                    <select className="pc-select" value={form.familyState} onChange={e => updateField('familyState', e.target.value)}>
                                        <option>Select State</option><option>Telangana</option><option>Andhra Pradesh</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Mandal:</label>
                                    <input className="pc-input" placeholder="Enter Mandal" value={form.familyMandal} onChange={e => updateField('familyMandal', e.target.value)} />
                                </div>
                            </div>

                            <div className="pc-divider-h" style={{ margin: '1.5rem 0' }} />
                            
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>Nominee's Address:</h4>
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">House No:</label>
                                    <input className="pc-input" placeholder="Enter House No" value={form.nominee.address.houseNo} onChange={e => updateField('nominee.address.houseNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Area:</label>
                                    <input className="pc-input" placeholder="Enter Street" value={form.nominee.address.area} onChange={e => updateField('nominee.address.area', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Rural :</label>
                                    <input className="pc-input" placeholder="Enter Village/Colony" value={form.nominee.address.rural} onChange={e => updateField('nominee.address.rural', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Post Office/Sub-City: *</label>
                                    <input className="pc-input" placeholder="Enter Post Office/Sub-City" value={form.nominee.address.poSubCity} onChange={e => updateField('nominee.address.poSubCity', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">District:</label>
                                    <input className="pc-input" placeholder="Enter District" value={form.nominee.address.district} onChange={e => updateField('nominee.address.district', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Pincode:</label>
                                    <input className="pc-input" placeholder="Enter Pincode" value={form.nominee.address.pincode} onChange={e => updateField('nominee.address.pincode', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">City Area :</label>
                                    <input className="pc-input" placeholder="Enter City Area" value={form.nominee.address.cityArea} onChange={e => updateField('nominee.address.cityArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Land Mark :</label>
                                    <input className="pc-input" placeholder="Enter Land Mark" value={form.nominee.address.landMark} onChange={e => updateField('nominee.address.landMark', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Country: *</label>
                                    <select className="pc-select" value={form.nominee.address.country} onChange={e => updateField('nominee.address.country', e.target.value)}>
                                        <option>Select Country</option><option>India</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Nominee Age:</label>
                                    <input className="pc-input" placeholder="Enter Age" value={form.nominee.age} onChange={e => updateField('nominee.age', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Mobile No.: *</label>
                                    <input className="pc-input" placeholder="Enter Mobile No" value={form.nominee.mobileNo} onChange={e => updateField('nominee.mobileNo', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="pc-card">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><UserCheck size={14} /></div>
                            <div>
                                <p className="pc-card-title">Other Details</p>
                                <p className="pc-card-sub">Bank, Introducer, & Additional Information</p>
                            </div>
                        </div>
                        <div className="pc-form">
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">Bank Name:</label>
                                    <input className="pc-input" placeholder="Enter Bank Name" value={form.bankAccount.bankName} onChange={e => updateField('bankAccount.bankName', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Relate Code(if any):</label>
                                    <input className="pc-input" placeholder="Enter Relate Code(if any)" value={form.relateCode} onChange={e => updateField('relateCode', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Blood Group:</label>
                                    <select className="pc-select" value={form.bloodGroup} onChange={e => updateField('bloodGroup', e.target.value)}>
                                        <option>Select Blood Group</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                                    </select>
                                </div>

                                <div className="pc-field">
                                    <label className="pc-label">Branch:</label>
                                    <input className="pc-input" placeholder="Enter Branch" value={form.bankAccount.branch} onChange={e => updateField('bankAccount.branch', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Proposed Area of Work:</label>
                                    <input className="pc-input" placeholder="Enter Proposed Area of Work" value={form.proposedArea} onChange={e => updateField('proposedArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Occupation:</label>
                                    <input className="pc-input" placeholder="Enter Occupation" value={form.occupation} onChange={e => updateField('occupation', e.target.value)} />
                                </div>

                                <div className="pc-field">
                                    <label className="pc-label">Branch Code</label>
                                    <input className="pc-input" placeholder="Enter Branch Code" value={form.bankAccount.branchCode} onChange={e => updateField('bankAccount.branchCode', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Name Of The Introducer: *</label>
                                    <select className="pc-select" value={form.introducerName} onChange={e => updateField('introducerName', e.target.value)}>
                                        <option>Select Name:</option><option>Admin</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Qualification:</label>
                                    <select className="pc-select" value={form.qualification} onChange={e => updateField('qualification', e.target.value)}>
                                        <option>Select Qualification</option><option>Graduation</option><option>Post-Graduation</option>
                                    </select>
                                </div>

                                <div className="pc-field">
                                    <label className="pc-label">Bank A/c no.</label>
                                    <input className="pc-input" placeholder="Enter Bank A/c no." value={form.bankAccount.accountNo} onChange={e => updateField('bankAccount.accountNo', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Introducer Desig Code:</label>
                                    <input className="pc-input" value={form.introducerDesigCode} onChange={e => updateField('introducerDesigCode', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Introducer Aadhar No.:</label>
                                    <input className="pc-input" value={form.introducerAadhar} onChange={e => updateField('introducerAadhar', e.target.value)} />
                                </div>

                                <div className="pc-field">
                                    <label className="pc-label">ID Proof Type:</label>
                                    <select className="pc-select" value={form.idProofType} onChange={e => updateField('idProofType', e.target.value)}>
                                        <option>-Select-</option><option>Aadhar</option><option>PAN</option><option>Passport</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Issued On :</label>
                                    <input type="date" className="pc-input" value={form.issuedOn} onChange={e => updateField('issuedOn', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Valid Upto :</label>
                                    <input type="date" className="pc-input" value={form.validUpto} onChange={e => updateField('validUpto', e.target.value)} />
                                </div>

                                <div className="pc-field">
                                    <label className="pc-label">Bank Address:</label>
                                    <input className="pc-input" placeholder="Enter Bank Address" value={form.bankAccount.bankAddress} onChange={e => updateField('bankAccount.bankAddress', e.target.value)} />
                                </div>
                                <div className="pc-field" style={{ gridColumn: 'span 2' }}></div> {/* Empty space to align remaining fields to left column */}

                                <div className="pc-field">
                                    <label className="pc-label">IFSC Code :</label>
                                    <input className="pc-input" placeholder="Enter IFSC Code" value={form.bankAccount.ifscCode} onChange={e => updateField('bankAccount.ifscCode', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 3 && (
                    <div className="pc-card">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><Briefcase size={14} /></div>
                            <div>
                                <p className="pc-card-title">Details of Past Experience</p>
                                <p className="pc-card-sub">Previous employment and grading information</p>
                            </div>
                        </div>
                        <div className="pc-form">
                            <div className="pc-grid">
                                <div className="pc-field">
                                    <label className="pc-label">Name of company/organization:</label>
                                    <input className="pc-input" placeholder="Enter Name of company" value={form.experience.companyName} onChange={e => updateField('experience.companyName', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Grade at present:</label>
                                    <input className="pc-input" placeholder="Enter Grade at present" value={form.experience.currentGrade} onChange={e => updateField('experience.currentGrade', e.target.value)} />
                                </div>
                                <div className="pc-field" style={{ gridColumn: 'span 1' }}></div> {/* Spacer to match layout if needed, though grid will auto-flow */}

                                <div className="pc-field">
                                    <label className="pc-label">Date of Joining:</label>
                                    <input type="date" className="pc-input" value={form.experience.joiningDate} onChange={e => updateField('experience.joiningDate', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Area of operation:</label>
                                    <input className="pc-input" placeholder="Enter Area of operation" value={form.experience.operationArea} onChange={e => updateField('experience.operationArea', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Grade on date of joining:</label>
                                    <input className="pc-input" placeholder="Enter Grade on date of joining" value={form.experience.joiningGrade} onChange={e => updateField('experience.joiningGrade', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="pc-submit-bar" style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem' }}>{isSubmitting ? 'Saving...' : '* Mandatory'}</span>
                    <div className="pc-submit-actions">
                        {activeTab > 0 && <button type="button" className="pc-btn-ghost" onClick={handlePrev}><ChevronLeft size={12} /></button>}
                        <button type="button" className="pc-btn-ghost" onClick={() => setForm(INITIAL_FORM)}>Reset</button>
                        <button 
                            type="submit" 
                            className="pc-btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : (activeTab === TABS.length - 1 ? 'Finish' : 'Next')} 
                            {!isSubmitting && <ChevronRight size={12} />}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

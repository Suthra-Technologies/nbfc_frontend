import { useState } from 'react';
import {
    User,
    Home,
    Phone,
    ShieldCheck,
    Image as ImageIcon,
    FileText,
    MapPin,
    Users,
    Save,
    RefreshCw,
    Upload,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import './AccountOpening.css';

export function AccountOpening() {
    const [step, setStep] = useState(1);
    const [formData] = useState({
        membership: {
            type: '',
            date: new Date().toISOString().split('T')[0],
            fee: '50'
        },
        personal: {
            fullName: '',
            fatherHusbandName: '',
            motherName: '',
            gender: '',
            dob: '',
            age: '',
            occupation: '',
            aadharNo: '',
            panNo: ''
        },
        contact: {
            mobile1: '',
            mobile2: '',
            landline: '',
            alternate: ''
        },
        address: {
            permanent: {
                houseNo: '',
                area: '',
                village: '',
                country: 'India',
                state: 'Andhra Pradesh',
                district: '',
                mandal: '',
                city: '',
                landmark: '',
                pincode: ''
            },
            isSameAsPermanent: false,
            correspondence: {
                houseNo: '',
                area: '',
                village: '',
                country: 'India',
                state: 'Andhra Pradesh',
                district: '',
                mandal: '',
                city: '',
                landmark: '',
                pincode: ''
            }
        },
        nominee: {
            name: '',
            relation: '',
            age: '',
            houseNo: '',
            area: '',
            village: '',
            state: 'Andhra Pradesh',
            city: '',
            pincode: '',
            mobile: ''
        },
        kyc: {
            idProofType: '',
            addressProofType: '',
            otherDoc: ''
        }
    });

    const steps = [
        { id: 1, label: 'Applicant Details', icon: User },
        { id: 2, label: 'Contact & Address', icon: Home },
        { id: 3, label: 'Nominee & KYC', icon: ShieldCheck },
    ];

    return (
        <div className="account-opening-container animate-fade-in">
            <header className="page-header">
                <div className="header-content">
                    <div className="title-wrapper">
                        <div className="icon-badge">
                            <Users size={24} className="text-[#009BB0]" />
                        </div>
                        <div>
                            <h1>Account Opening</h1>
                            <p>Register a new member and initialize their financial profile.</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <Button variant="outline" className="gap-2 h-11 px-6 rounded-xl border-slate-200">
                            <RefreshCw size={16} /> Reset
                        </Button>
                        <Button className="bg-[#009BB0] hover:bg-[#008aa0] text-white gap-2 h-11 px-8 rounded-xl font-bold transition-all shadow-lg shadow-[#009BB0]/20">
                            <Save size={16} /> Save Application
                        </Button>
                    </div>
                </div>

                <div className="stepper-wrapper">
                    {steps.map((s) => (
                        <div
                            key={s.id}
                            className={cn("step-item", step === s.id && "active", step > s.id && "completed")}
                            onClick={() => setStep(s.id)}
                        >
                            <div className="step-icon">
                                {step > s.id ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
                            </div>
                            <span className="step-label">{s.label}</span>
                            {s.id < steps.length && <div className="step-connector" />}
                        </div>
                    ))}
                </div>
            </header>

            <main className="form-content">
                <div className="glass-card main-form-card">
                    {step === 1 && (
                        <div className="step-content animate-slide-up">
                            <section className="form-section">
                                <div className="section-header">
                                    <div className="section-dot" />
                                    <h3>Basic Membership</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label>Member Type</Label>
                                        <Select>
                                            <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50/50">
                                                <SelectValue placeholder="Select Member Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="regular">Regular Member</SelectItem>
                                                <SelectItem value="associate">Associate Member</SelectItem>
                                                <SelectItem value="nominal">Nominal Member</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date</Label>
                                        <Input type="date" value={formData.membership.date} className="h-12 rounded-xl border-slate-200 bg-slate-50/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Membership Fee (₹)</Label>
                                        <Input value={formData.membership.fee} className="h-12 rounded-xl border-slate-200 bg-slate-50/50 font-mono font-bold text-[#009BB0]" />
                                    </div>
                                </div>
                            </section>

                            <section className="form-section mt-10">
                                <div className="section-header">
                                    <div className="section-dot" />
                                    <h3>Personal Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input placeholder="Enter Applicant Name" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Father / Husband Name</Label>
                                        <Input placeholder="Enter Father/Husband Name" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mother Name</Label>
                                        <Input placeholder="Enter Mother Name" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <Select>
                                            <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date of Birth</Label>
                                        <Input type="date" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Occupation</Label>
                                        <Input placeholder="Current Profession" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Aadhar Card No.</Label>
                                        <Input placeholder="12-digit UID" className="h-12 rounded-xl border-slate-200" maxLength={12} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>PAN Card No.</Label>
                                        <Input placeholder="10-digit PAN" className="h-12 rounded-xl border-slate-200 uppercase" maxLength={10} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                    <div className="upload-box group">
                                        <div className="upload-preview">
                                            <ImageIcon size={32} className="text-slate-300 group-hover:text-[#009BB0] transition-colors" />
                                        </div>
                                        <div className="upload-info">
                                            <h4>Applicant Photo</h4>
                                            <p>PNG or JPG upto 2MB</p>
                                            <Button variant="ghost" className="h-8 px-3 text-[#009BB0] hover:bg-[#009BB0]/10 rounded-lg text-xs font-bold gap-2">
                                                <Upload size={14} /> Upload Image
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="upload-box group">
                                        <div className="upload-preview">
                                            <FileText size={32} className="text-slate-300 group-hover:text-[#009BB0] transition-colors" />
                                        </div>
                                        <div className="upload-info">
                                            <h4>Specimen Signature</h4>
                                            <p>Scan clear signature on white paper</p>
                                            <Button variant="ghost" className="h-8 px-3 text-[#009BB0] hover:bg-[#009BB0]/10 rounded-lg text-xs font-bold gap-2">
                                                <Upload size={14} /> Upload Scan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-content animate-slide-up">
                            <section className="form-section">
                                <div className="section-header">
                                    <div className="section-dot" />
                                    <h3>Contact Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="space-y-2">
                                        <Label>Primary Mobile</Label>
                                        <div className="relative">
                                            <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <Input placeholder="+91" className="h-12 rounded-xl border-slate-200 pl-11" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alternate Mobile</Label>
                                        <Input placeholder="+91" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Landline No.</Label>
                                        <Input placeholder="STD Code - Number" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Work Contact</Label>
                                        <Input placeholder="+91" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                </div>
                            </section>

                            <section className="form-section mt-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="section-header mb-0">
                                        <div className="section-dot" />
                                        <h3>Permanent Residence</h3>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                        <MapPin size={14} className="text-[#009BB0]" />
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Geo-Verified</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    <div className="space-y-2">
                                        <Label>House / Flat No.</Label>
                                        <Input placeholder="E.g. #12-4" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Street / Area</Label>
                                        <Input placeholder="Locality Name" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Village / Colony</Label>
                                        <Input placeholder="Village Name" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Country</Label>
                                        <Select defaultValue="india">
                                            <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="india">India</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>State</Label>
                                        <Select defaultValue="ap">
                                            <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ap">Andhra Pradesh</SelectItem>
                                                <SelectItem value="ts">Telangana</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>District</Label>
                                        <Input placeholder="Enter District" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>City / Town</Label>
                                        <Input placeholder="Enter City" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Pincode</Label>
                                        <Input placeholder="6-digit ZIP" className="h-12 rounded-xl border-slate-200" maxLength={6} />
                                    </div>
                                </div>
                            </section>

                            <div className="mt-10 pt-10 border-t border-slate-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <Checkbox id="sameAsAbove" />
                                    <Label htmlFor="sameAsAbove" className="text-sm font-bold text-slate-700 cursor-pointer">Correspondence address is same as permanent address</Label>
                                </div>

                                <section className="form-section opacity-50 blur-[1px] pointer-events-none transition-all">
                                    <div className="section-header">
                                        <div className="section-dot" />
                                        <h3>Correspondence Address</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <Label>House No.</Label>
                                            <Input className="h-12 rounded-xl border-slate-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Area</Label>
                                            <Input className="h-12 rounded-xl border-slate-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>City</Label>
                                            <Input className="h-12 rounded-xl border-slate-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Pincode</Label>
                                            <Input className="h-12 rounded-xl border-slate-200" />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-content animate-slide-up">
                            <section className="form-section">
                                <div className="section-header">
                                    <div className="section-dot" />
                                    <h3>Nominee Assignment</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label>Nominee Full Name</Label>
                                        <Input placeholder="Enter Nominee Name" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Relationship</Label>
                                        <Select>
                                            <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                                <SelectValue placeholder="Select Relation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="spouse">Spouse</SelectItem>
                                                <SelectItem value="parent">Parent</SelectItem>
                                                <SelectItem value="sibling">Sibling</SelectItem>
                                                <SelectItem value="child">Child</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nominee Age</Label>
                                        <Input placeholder="Years" className="h-12 rounded-xl border-slate-200" />
                                    </div>
                                </div>
                            </section>

                            <section className="form-section mt-10">
                                <div className="section-header">
                                    <div className="section-dot" />
                                    <h3>KYC Compliance</h3>
                                </div>
                                <div className="p-6 bg-[#009BB0]/5 rounded-3xl border border-[#009BB0]/10 border-dashed">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[#009BB0] font-black uppercase text-[10px] tracking-widest">Identification Proof</Label>
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <Select>
                                                            <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white text-left">
                                                                <SelectValue placeholder="Select ID Type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="passport">Passport</SelectItem>
                                                                <SelectItem value="voter">Voter ID</SelectItem>
                                                                <SelectItem value="dl">Driving License</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-dashed border-[#009BB0]/30 text-[#009BB0]">
                                                        <Upload size={18} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[#009BB0] font-black uppercase text-[10px] tracking-widest">Address Proof</Label>
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <Select>
                                                            <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white text-left">
                                                                <SelectValue placeholder="Select Address Proof" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="electric">Electricity Bill</SelectItem>
                                                                <SelectItem value="ration">Ration Card</SelectItem>
                                                                <SelectItem value="rental">Rental Agreement</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-dashed border-[#009BB0]/30 text-[#009BB0]">
                                                        <Upload size={18} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-8 bg-white/50 rounded-2xl border border-white">
                                            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4 shadow-inner">
                                                <ShieldCheck size={32} />
                                            </div>
                                            <h4 className="font-bold text-slate-800">Compliance Verified</h4>
                                            <p className="text-xs text-center text-slate-500 mt-2 px-6">Ensure all documents are original scans. Tampered documents will be rejected by the auditing engine.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    <div className="form-footer mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                        <Button
                            variant="ghost"
                            disabled={step === 1}
                            onClick={() => setStep(prev => prev - 1)}
                            className="font-bold text-slate-400 hover:text-slate-600 h-12 px-8 rounded-xl"
                        >
                            Back
                        </Button>
                        <div className="flex gap-3">
                            {step < 3 ? (
                                <Button
                                    onClick={() => setStep(prev => prev + 1)}
                                    className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-12 px-8 rounded-xl font-bold transition-all"
                                >
                                    Continue <ArrowRight size={16} />
                                </Button>
                            ) : (
                                <Button className="bg-[#009BB0] hover:bg-[#008aa0] text-white gap-2 h-12 px-10 rounded-xl font-black transition-all shadow-xl shadow-[#009BB0]/30 hover:scale-[1.02] active:scale-[0.98]">
                                    Complete Onboarding
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

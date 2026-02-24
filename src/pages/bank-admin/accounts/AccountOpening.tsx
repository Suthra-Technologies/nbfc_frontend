import { useState } from 'react';
import {
    CreditCard, User, ShieldCheck, Phone, Home, Users, Save,
    RefreshCw, Upload, Image as ImageIcon, FileSignature,
    AlertCircle, CheckCircle2, Building2, Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import './AccountOpening.css';

const INDIAN_STATES = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
];

interface SectionProps {
    icon: React.ElementType;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    required?: boolean;
}

function Section({ icon: Icon, title, subtitle, children, required }: SectionProps) {
    return (
        <div className="ao-section">
            <div className="ao-section-header">
                <div className="ao-section-icon">
                    <Icon size={18} />
                </div>
                <div>
                    <h3 className="ao-section-title">
                        {title}
                        {required && <span className="ao-required-badge">Required</span>}
                    </h3>
                    {subtitle && <p className="ao-section-subtitle">{subtitle}</p>}
                </div>
            </div>
            <div className="ao-section-body">
                {children}
            </div>
        </div>
    );
}

function Field({ label, required, children, colSpan = 1 }: {
    label: string; required?: boolean; children: React.ReactNode; colSpan?: number;
}) {
    return (
        <div className={cn("ao-field", colSpan === 2 && "ao-field-span2")}>
            <label className="ao-label">
                {label}
                {required && <span className="ao-asterisk">*</span>}
            </label>
            {children}
        </div>
    );
}

export function AccountOpening() {
    const [sameAddress, setSameAddress] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    if (submitted) {
        return (
            <div className="ao-success animate-fade-in">
                <div className="ao-success-card">
                    <div className="ao-success-icon">
                        <CheckCircle2 size={56} />
                    </div>
                    <h2>Application Submitted!</h2>
                    <p>Account opening application has been recorded. The applicant will be notified once their KYC is verified and account is activated.</p>
                    <div className="ao-success-ref">
                        <span>Reference No.</span>
                        <strong>ACC{Date.now().toString().slice(-8)}</strong>
                    </div>
                    <Button
                        onClick={() => setSubmitted(false)}
                        className="ao-btn-primary mt-6"
                    >
                        Open Another Account
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="ao-container animate-fade-in">
            {/* Page Header */}
            <div className="ao-header">
                <div className="ao-header-left">
                    <div className="ao-header-icon">
                        <CreditCard size={22} />
                    </div>
                    <div>
                        <h1 className="ao-page-title">Account Opening Form</h1>
                        <p className="ao-page-subtitle">Fill all required details and submit to open a new savings / current account</p>
                    </div>
                </div>
                <div className="ao-header-actions">
                    <Button variant="outline" className="ao-btn-outline" onClick={() => window.location.reload()}>
                        <RefreshCw size={15} /> Reset Form
                    </Button>
                    <Button className="ao-btn-primary" onClick={() => setSubmitted(true)}>
                        <Save size={15} /> Submit Application
                    </Button>
                </div>
            </div>

            {/* Required note */}
            <div className="ao-info-bar">
                <AlertCircle size={14} />
                <span>Fields marked with <strong>*</strong> are mandatory as per RBI KYC guidelines.</span>
            </div>

            <div className="ao-form-body">

                {/* ── SECTION 1: Account Details ── */}
                <Section icon={Building2} title="Account Details" subtitle="Choose account type and branch" required>
                    <div className="ao-grid ao-grid-4">
                        <Field label="Account Type" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="savings">Savings Account</SelectItem>
                                    <SelectItem value="current">Current Account</SelectItem>
                                    <SelectItem value="salary">Salary Account</SelectItem>
                                    <SelectItem value="fd">Fixed Deposit (FD)</SelectItem>
                                    <SelectItem value="rd">Recurring Deposit (RD)</SelectItem>
                                    <SelectItem value="nri">NRI Account</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Date of Application" required>
                            <Input type="date" defaultValue={today} className="ao-input" />
                        </Field>
                        <Field label="Branch" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="main">Main Branch</SelectItem>
                                    <SelectItem value="north">North Branch</SelectItem>
                                    <SelectItem value="south">South Branch</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Initial Deposit (₹)" required>
                            <Input type="number" placeholder="Min ₹500" className="ao-input ao-mono" />
                        </Field>
                        <Field label="Mode of Operation" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="joint_either">Joint – Either or Survivor</SelectItem>
                                    <SelectItem value="joint_both">Joint – Both to Sign</SelectItem>
                                    <SelectItem value="joint_former">Joint – Former or Survivor</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Currency">
                            <Select defaultValue="inr">
                                <SelectTrigger className="ao-input">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inr">INR – Indian Rupee</SelectItem>
                                    <SelectItem value="usd">USD – US Dollar</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </Section>

                {/* ── SECTION 2: Personal Details ── */}
                <Section icon={User} title="Personal Details" subtitle="As per government-issued identity proof" required>
                    <div className="ao-grid ao-grid-3">
                        <Field label="Title">
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Mr / Ms / Dr" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mr">Mr.</SelectItem>
                                    <SelectItem value="ms">Ms.</SelectItem>
                                    <SelectItem value="mrs">Mrs.</SelectItem>
                                    <SelectItem value="dr">Dr.</SelectItem>
                                    <SelectItem value="prof">Prof.</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Full Name (as in Aadhaar)" required colSpan={2}>
                            <Input placeholder="Enter Full Legal Name" className="ao-input ao-uppercase" />
                        </Field>

                        <Field label="Father's Name" required>
                            <Input placeholder="Father's Full Name" className="ao-input" />
                        </Field>
                        <Field label="Mother's Name" required>
                            <Input placeholder="Mother's Full Name" className="ao-input" />
                        </Field>
                        <Field label="Spouse Name">
                            <Input placeholder="If applicable" className="ao-input" />
                        </Field>

                        <Field label="Date of Birth" required>
                            <Input type="date" className="ao-input" />
                        </Field>
                        <Field label="Gender" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other / Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Marital Status">
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single / Unmarried</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                    <SelectItem value="divorced">Divorced</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field label="Nationality" required>
                            <Select defaultValue="indian">
                                <SelectTrigger className="ao-input">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="indian">Indian</SelectItem>
                                    <SelectItem value="nri">NRI</SelectItem>
                                    <SelectItem value="foreign">Foreign National</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Occupation / Profession" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Occupation" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="salaried">Salaried – Private</SelectItem>
                                    <SelectItem value="salaried_govt">Salaried – Government</SelectItem>
                                    <SelectItem value="business">Business / Self-employed</SelectItem>
                                    <SelectItem value="professional">Professional (CA/Doctor/Lawyer)</SelectItem>
                                    <SelectItem value="agriculturist">Agriculturist</SelectItem>
                                    <SelectItem value="retired">Retired</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="housewife">Homemaker</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Annual Income (₹)">
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lt1">Below ₹1 Lakh</SelectItem>
                                    <SelectItem value="1to3">₹1 – ₹3 Lakhs</SelectItem>
                                    <SelectItem value="3to5">₹3 – ₹5 Lakhs</SelectItem>
                                    <SelectItem value="5to10">₹5 – ₹10 Lakhs</SelectItem>
                                    <SelectItem value="10to25">₹10 – ₹25 Lakhs</SelectItem>
                                    <SelectItem value="agt25">Above ₹25 Lakhs</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </Section>

                {/* ── SECTION 3: Identity Documents ── */}
                <Section icon={ShieldCheck} title="Identity & KYC Documents" subtitle="Mandatory under RBI KYC norms" required>
                    <div className="ao-grid ao-grid-3">
                        <Field label="Aadhaar Number" required>
                            <Input placeholder="XXXX XXXX XXXX" className="ao-input ao-mono" maxLength={12} />
                        </Field>
                        <Field label="PAN Card Number" required>
                            <Input placeholder="ABCDE1234F" className="ao-input ao-mono ao-uppercase" maxLength={10} />
                        </Field>
                        <Field label="Form 60 (if no PAN)">
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Submitted?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="na">N/A – PAN Provided</SelectItem>
                                    <SelectItem value="yes">Yes – Form 60 Enclosed</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field label="ID Proof Type" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Document" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                                    <SelectItem value="passport">Passport</SelectItem>
                                    <SelectItem value="voter">Voter ID Card</SelectItem>
                                    <SelectItem value="dl">Driving License</SelectItem>
                                    <SelectItem value="nrega">NREGA Job Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="ID Document Number" required>
                            <Input placeholder="Enter document number" className="ao-input ao-mono ao-uppercase" />
                        </Field>
                        <Field label="ID Expiry Date">
                            <Input type="date" className="ao-input" />
                        </Field>

                        <Field label="Address Proof Type" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Document" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                                    <SelectItem value="passport">Passport</SelectItem>
                                    <SelectItem value="utility">Utility Bill (≤ 3 months)</SelectItem>
                                    <SelectItem value="ration">Ration Card</SelectItem>
                                    <SelectItem value="rental">Rental Agreement</SelectItem>
                                    <SelectItem value="bank_stmt">Bank Statement</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Address Proof Number">
                            <Input placeholder="Number on document" className="ao-input ao-mono" />
                        </Field>
                        <Field label="Tax Residency Status">
                            <Select defaultValue="india">
                                <SelectTrigger className="ao-input">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="india">India Only</SelectItem>
                                    <SelectItem value="us">United States (FATCA)</SelectItem>
                                    <SelectItem value="other">Other Country (CRS)</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </Section>

                {/* ── SECTION 4: Contact Information ── */}
                <Section icon={Phone} title="Contact Information" required>
                    <div className="ao-grid ao-grid-4">
                        <Field label="Mobile Number" required>
                            <Input placeholder="+91 98765 43210" className="ao-input ao-mono" maxLength={10} />
                        </Field>
                        <Field label="Alternate Mobile">
                            <Input placeholder="+91" className="ao-input ao-mono" maxLength={10} />
                        </Field>
                        <Field label="Landline / Telephone">
                            <Input placeholder="STD code + Number" className="ao-input ao-mono" />
                        </Field>
                        <Field label="Email Address" required>
                            <Input type="email" placeholder="example@email.com" className="ao-input" />
                        </Field>
                    </div>
                </Section>

                {/* ── SECTION 5: Permanent Address ── */}
                <Section icon={Home} title="Permanent Address" subtitle="As per Aadhaar / ID proof" required>
                    <div className="ao-grid ao-grid-3">
                        <Field label="House / Flat / Plot No." required>
                            <Input placeholder="e.g. 15-2/A" className="ao-input" />
                        </Field>
                        <Field label="Street / Locality" required colSpan={2}>
                            <Input placeholder="Street name, area, locality" className="ao-input" />
                        </Field>
                        <Field label="Village / Town">
                            <Input placeholder="Village or Colony name" className="ao-input" />
                        </Field>
                        <Field label="Landmark">
                            <Input placeholder="Near / Opposite" className="ao-input" />
                        </Field>
                        <Field label="Post Office">
                            <Input placeholder="Post Office name" className="ao-input" />
                        </Field>
                        <Field label="State" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                    {INDIAN_STATES.map(s => (
                                        <SelectItem key={s} value={s.toLowerCase().replace(/ /g, '_')}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="District" required>
                            <Input placeholder="Enter District" className="ao-input" />
                        </Field>
                        <Field label="City / Town" required>
                            <Input placeholder="Enter City" className="ao-input" />
                        </Field>
                        <Field label="Pincode" required>
                            <Input placeholder="6-digit PIN" className="ao-input ao-mono" maxLength={6} />
                        </Field>
                    </div>

                    {/* Correspondence Address */}
                    <div className="ao-same-address-toggle">
                        <Checkbox
                            id="sameAddr"
                            checked={sameAddress}
                            onCheckedChange={(v) => setSameAddress(v as boolean)}
                        />
                        <label htmlFor="sameAddr" className="ao-same-addr-label">
                            Mailing / Correspondence address is the same as Permanent address
                        </label>
                    </div>

                    {!sameAddress && (
                        <div className="ao-subsection animate-slide-up">
                            <h4 className="ao-subsection-title">Correspondence (Mailing) Address</h4>
                            <div className="ao-grid ao-grid-3 mt-4">
                                <Field label="House / Flat No." required>
                                    <Input placeholder="e.g. 15-2/A" className="ao-input" />
                                </Field>
                                <Field label="Street / Locality" required colSpan={2}>
                                    <Input placeholder="Street name, area, locality" className="ao-input" />
                                </Field>
                                <Field label="State" required>
                                    <Select>
                                        <SelectTrigger className="ao-input">
                                            <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {INDIAN_STATES.map(s => (
                                                <SelectItem key={s} value={s.toLowerCase().replace(/ /g, '_')}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field label="City / Town" required>
                                    <Input placeholder="Enter City" className="ao-input" />
                                </Field>
                                <Field label="Pincode" required>
                                    <Input placeholder="6-digit PIN" className="ao-input ao-mono" maxLength={6} />
                                </Field>
                            </div>
                        </div>
                    )}
                </Section>

                {/* ── SECTION 6: Nominee ── */}
                <Section icon={Users} title="Nominee Details" subtitle="Person entitled to funds in case of account holder's demise">
                    <div className="ao-grid ao-grid-3">
                        <Field label="Nominee Full Name" required>
                            <Input placeholder="Full legal name of nominee" className="ao-input" />
                        </Field>
                        <Field label="Relationship with Applicant" required>
                            <Select>
                                <SelectTrigger className="ao-input">
                                    <SelectValue placeholder="Select Relation" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="spouse">Spouse</SelectItem>
                                    <SelectItem value="son">Son</SelectItem>
                                    <SelectItem value="daughter">Daughter</SelectItem>
                                    <SelectItem value="father">Father</SelectItem>
                                    <SelectItem value="mother">Mother</SelectItem>
                                    <SelectItem value="brother">Brother</SelectItem>
                                    <SelectItem value="sister">Sister</SelectItem>
                                    <SelectItem value="grandchild">Grandchild</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Nominee Date of Birth" required>
                            <Input type="date" className="ao-input" />
                        </Field>
                        <Field label="Nominee Mobile">
                            <Input placeholder="+91" className="ao-input ao-mono" />
                        </Field>
                        <Field label="Nominee Address" colSpan={2}>
                            <Input placeholder="House No., Street, City, PIN" className="ao-input" />
                        </Field>
                    </div>
                    <div className="ao-nominee-guardian mt-4 p-4 bg-amber-50/60 border border-amber-100 rounded-xl text-sm text-amber-700">
                        <strong>Note:</strong> If nominee is a minor, please provide guardian details on a separate form (Form G-1) at the branch.
                    </div>
                </Section>

                {/* ── SECTION 7: Photo & Signature ── */}
                <Section icon={FileSignature} title="Photo & Signature" subtitle="Applicant's recent passport photo and specimen signature">
                    <div className="ao-grid ao-grid-2">
                        <div className="ao-upload-card">
                            <div className="ao-upload-area">
                                <ImageIcon size={36} className="ao-upload-icon" />
                            </div>
                            <div className="ao-upload-info">
                                <h4>Recent Photograph</h4>
                                <ul className="ao-upload-rules">
                                    <li>Passport-size, white background</li>
                                    <li>Taken within last 6 months</li>
                                    <li>JPG / PNG, max 500 KB</li>
                                </ul>
                                <label className="ao-upload-btn">
                                    <Upload size={14} /> Browse File
                                    <input type="file" accept="image/*" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div className="ao-upload-card">
                            <div className="ao-upload-area">
                                <FileSignature size={36} className="ao-upload-icon" />
                            </div>
                            <div className="ao-upload-info">
                                <h4>Specimen Signature</h4>
                                <ul className="ao-upload-rules">
                                    <li>Sign on plain white paper</li>
                                    <li>Scan at minimum 200 DPI</li>
                                    <li>JPG / PNG, max 200 KB</li>
                                </ul>
                                <label className="ao-upload-btn">
                                    <Upload size={14} /> Browse File
                                    <input type="file" accept="image/*" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ── SECTION 8: Declaration ── */}
                <Section icon={Banknote} title="Applicant Declaration">
                    <div className="ao-declaration-box">
                        <p>
                            I / We hereby declare that the details furnished above are true and correct to the best of my / our knowledge and belief, and I / we undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading, I / We am / are aware that I / We may be held liable therefor.
                        </p>
                        <div className="ao-declaration-check">
                            <Checkbox id="declAgree" />
                            <label htmlFor="declAgree" className="ao-same-addr-label font-semibold text-slate-700">
                                I agree to the above declaration and consent to share my KYC data with the bank and regulatory authorities.
                            </label>
                        </div>
                    </div>
                </Section>

                {/* ── SUBMIT ── */}
                <div className="ao-form-footer">
                    <Button variant="outline" className="ao-btn-outline" onClick={() => window.location.reload()}>
                        <RefreshCw size={15} /> Clear Form
                    </Button>
                    <Button className="ao-btn-primary ao-btn-submit" onClick={() => setSubmitted(true)}>
                        <Save size={16} /> Submit Account Opening Request
                    </Button>
                </div>

            </div>
        </div>
    );
}

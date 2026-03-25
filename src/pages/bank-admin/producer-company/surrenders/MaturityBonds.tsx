import { useState } from 'react';
import {
    Save,
    RefreshCcw,
    User,
    Briefcase,
    MessageSquare
} from 'lucide-react';
import '../producer.css';

const INITIAL_FORM = {
    // Header Info
    memberType: '',
    paymentType: '',
    maturityType: '',
    fdRdId: '',
    date: new Date().toISOString().split('T')[0],

    // Member Details
    customerName: '',
    membershipId: '',
    nomineeName: '',
    age: '',
    mobileNo: '',
    relation: '',
    interestPayable1: '',
    fdType: '',
    memberName: '',

    // FD/RD Details
    instalmentMode: '',
    depositAmount: '',
    interestAmount: '',
    period: '',
    depositDate: '',
    maturityDate: '',
    maturityAmount: '',
    actualInterestPayable: '',

    // Narration
    narration: ''
};

export function MaturityBonds() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleRefresh = () => {
        setForm(INITIAL_FORM);
    };

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Maturity Bonds</h1>
                    <p>Process maturity bonds for FD/RD accounts.</p>
                </div>
                <div className="flex gap-2">
                    <button type="button" className="pc-btn-primary flex items-center gap-2" onClick={handleSubmit}>
                        <Save size={14} /> Save
                    </button>
                    <button type="button" className="pc-btn-ghost flex items-center gap-2" onClick={handleRefresh}>
                        <RefreshCcw size={14} /> Refresh
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Selection Header */}
                <div className="pc-card">
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type: *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)}>
                                    <option value="">Select MemberType</option>
                                    <option value="MEMBER">MEMBER</option>
                                    <option value="CLASS B">CLASS B</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Payment Type: *</label>
                                <select className="pc-select" value={form.paymentType} onChange={e => set('paymentType', e.target.value)}>
                                    <option value="">Select Payment Type</option>
                                    <option value="CASH">CASH</option>
                                    <option value="BANK">BANK</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Type: *</label>
                                <select className="pc-select" value={form.maturityType} onChange={e => set('maturityType', e.target.value)}>
                                    <option value="">Select Maturity Type</option>
                                    <option value="FULL">FULL</option>
                                    <option value="PARTIAL">PARTIAL</option>
                                </select>
                            </div>
                        </div>
                        <div className="pc-divider-h" />
                        <div className="pc-grid">
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">FD/RD ID : *</label>
                                <select className="pc-select" value={form.fdRdId} onChange={e => set('fdRdId', e.target.value)}>
                                    <option value="">Select MembershipID</option>
                                    <option value="FD001">FD001 - John Doe</option>
                                    <option value="RD001">RD001 - Jane Smith</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date: *</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => set('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Member Details */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><User size={14} /></div>
                        <p className="pc-card-title">Member Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Customer Name:</label>
                                <input className="pc-input" value={form.customerName} onChange={e => set('customerName', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Membership ID :</label>
                                <input className="pc-input" value={form.membershipId} onChange={e => set('membershipId', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Nominee Name :</label>
                                <input className="pc-input" value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Age :</label>
                                <input className="pc-input" value={form.age} onChange={e => set('age', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile No. :</label>
                                <input className="pc-input" value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation :</label>
                                <input className="pc-input" value={form.relation} onChange={e => set('relation', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Payable1</label>
                                <input className="pc-input" value={form.interestPayable1} onChange={e => set('interestPayable1', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">FD type</label>
                                <input className="pc-input" value={form.fdType} onChange={e => set('fdType', e.target.value)} />
                            </div>
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">MemberName</label>
                                <input className="pc-input" value={form.memberName} onChange={e => set('memberName', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FD/RD Section */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Briefcase size={14} /></div>
                        <p className="pc-card-title">FD/RD</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Instalment Mode:</label>
                                <input className="pc-input" value={form.instalmentMode} onChange={e => set('instalmentMode', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Deposit Amount :</label>
                                <input className="pc-input" value={form.depositAmount} onChange={e => set('depositAmount', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Amount:</label>
                                <input className="pc-input" value={form.interestAmount} onChange={e => set('interestAmount', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Period:</label>
                                <input className="pc-input" value={form.period} onChange={e => set('period', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Deposit Date:</label>
                                <input type="date" className="pc-input" value={form.depositDate} onChange={e => set('depositDate', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Date:</label>
                                <input type="date" className="pc-input" value={form.maturityDate} onChange={e => set('maturityDate', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Amount:</label>
                                <input className="pc-input" value={form.maturityAmount} onChange={e => set('maturityAmount', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Actual Interest Payable:</label>
                                <input className="pc-input" value={form.actualInterestPayable} onChange={e => set('actualInterestPayable', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Narration */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><MessageSquare size={14} /></div>
                        <p className="pc-card-title">Narration</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-field">
                            <label className="pc-label">Narration:</label>
                            <textarea 
                                className="pc-input" 
                                style={{ height: '80px', paddingTop: '8px' }}
                                placeholder="Enter Narration" 
                                value={form.narration} 
                                onChange={e => set('narration', e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-6 mb-10">
                    <button type="submit" className="pc-btn-primary flex items-center gap-2 px-8 py-2">
                        <Save size={16} /> Save
                    </button>
                    <button type="button" className="pc-btn-ghost flex items-center gap-2 px-8 py-2" onClick={handleRefresh}>
                        <RefreshCcw size={16} /> Refresh
                    </button>
                </div>

                {saved && (
                    <div className="pc-alert fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-in fade-in slide-in-from-bottom-4">
                        Maturity Bond Details Saved Successfully!
                    </div>
                )}
            </form>
        </div>
    );
}
export default MaturityBonds;

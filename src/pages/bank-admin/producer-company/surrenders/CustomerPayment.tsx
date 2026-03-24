import { useState } from 'react';
import {
    Save,
    RefreshCcw,
    User,
    Briefcase,
    MessageSquare,
    CreditCard,
    PenTool
} from 'lucide-react';
import '../producer.css';

const INITIAL_FORM = {
    // Header Info
    fdRdId: '',
    date: new Date().toISOString().split('T')[0],

    // Member Details
    customerName: '',
    membershipId: '',
    nomineeName: '',
    memberType: '',
    paymentType: '',
    maturityType: '',
    age: '',
    mobileNo: '',
    relation: '',

    // FD/RD Details
    instalmentMode: '',
    depositAmount: '',
    period: '',
    depositDate: '',
    maturityDate: '',
    maturityAmount: '',
    interestPayable: '',
    prematurityCharges: '',
    outstandingAmount: '',

    // Narration & Signature
    narration: '',
    signature: null as string | null,

    // Payment Through
    modeOfPayment: 'Cash',
    bankName: '',
    chqDate: new Date().toISOString().split('T')[0],
    chequeNo: ''
};

export function CustomerPayment() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

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
                    <h1>Customer Payment</h1>
                    <p>Process payments for surrendered or matured accounts.</p>
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
                                <label className="pc-label">Member Type: *</label>
                                <input className="pc-input" value={form.memberType} onChange={e => set('memberType', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Payment Type: *</label>
                                <input className="pc-input" value={form.paymentType} onChange={e => set('paymentType', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Type: *</label>
                                <input className="pc-input" value={form.maturityType} onChange={e => set('maturityType', e.target.value)} />
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
                                <label className="pc-label">Interest Payable:</label>
                                <input className="pc-input" value={form.interestPayable} onChange={e => set('interestPayable', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Prematurity Charges:</label>
                                <input className="pc-input" value={form.prematurityCharges} onChange={e => set('prematurityCharges', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Outstanding Amount:</label>
                                <input className="pc-input" value={form.outstandingAmount} onChange={e => set('outstandingAmount', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 mb-6">
                    {/* Narration */}
                    <div className="pc-card flex-[2]">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><MessageSquare size={14} /></div>
                            <p className="pc-card-title">Narration</p>
                        </div>
                        <div className="pc-form">
                            <div className="pc-field">
                                <label className="pc-label">Narration:</label>
                                <textarea 
                                    className="pc-input" 
                                    style={{ height: '100px', paddingTop: '8px' }}
                                    placeholder="Enter Narration" 
                                    value={form.narration} 
                                    onChange={e => set('narration', e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Member Signature */}
                    <div className="pc-card flex-1">
                        <div className="pc-card-header">
                            <div className="pc-card-icon"><PenTool size={14} /></div>
                            <p className="pc-card-title">Member Signature</p>
                        </div>
                        <div className="pc-form flex items-center justify-center h-[120px]">
                            <div className="w-full h-full border-2 border-dashed border-slate-200 rounded flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                                <PenTool size={24} className="mb-2 opacity-50" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Signature Space</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Through */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><CreditCard size={14} /></div>
                        <p className="pc-card-title">Payment Through</p>
                    </div>
                    <div className="pc-form">
                        <div className="flex gap-6 mb-4">
                            <label className="pc-label flex items-center gap-2" style={{ color: '#475569' }}>
                                <input type="radio" name="mode" checked={form.modeOfPayment === 'Cash'} onChange={() => set('modeOfPayment', 'Cash')} /> Cash
                            </label>
                            <label className="pc-label flex items-center gap-2" style={{ color: '#475569' }}>
                                <input type="radio" name="mode" checked={form.modeOfPayment === 'Cheque'} onChange={() => set('modeOfPayment', 'Cheque')} /> Cheque
                            </label>
                            <label className="pc-label flex items-center gap-2" style={{ color: '#475569' }}>
                                <input type="radio" name="mode" checked={form.modeOfPayment === 'Transfer'} onChange={() => set('modeOfPayment', 'Transfer')} /> Transfer
                            </label>
                            <label className="pc-label flex items-center gap-2" style={{ color: '#475569' }}>
                                <input type="radio" name="mode" checked={form.modeOfPayment === 'Neft'} onChange={() => set('modeOfPayment', 'Neft')} /> Neft
                            </label>
                        </div>

                        {form.modeOfPayment !== 'Cash' && (
                            <div className="pc-grid animate-in fade-in duration-300">
                                <div className="pc-field">
                                    <label className="pc-label">Bank name :</label>
                                    <select className="pc-select" value={form.bankName} onChange={e => set('bankName', e.target.value)}>
                                        <option value="">Select Bank name</option>
                                        <option value="SBI">SBI</option>
                                        <option value="HDFC">HDFC</option>
                                    </select>
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Chq.Date :</label>
                                    <input type="date" className="pc-input" value={form.chqDate} onChange={e => set('chqDate', e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">Cheque No. :</label>
                                    <select className="pc-select" value={form.chequeNo} onChange={e => set('chequeNo', e.target.value)}>
                                        <option value="">Select Cheque No.</option>
                                    </select>
                                </div>
                            </div>
                        )}
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
                        Customer Payment Details Saved Successfully!
                    </div>
                )}
            </form>
        </div>
    );
}
export default CustomerPayment;

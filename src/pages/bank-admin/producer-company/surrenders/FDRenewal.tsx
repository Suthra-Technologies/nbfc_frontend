import { useState } from 'react';
import {
    Save,
    RefreshCcw,
    Plus,
    Briefcase,
    FileText,
    Users
} from 'lucide-react';
import '../producer.css';

const INITIAL_FORM = {
    // Header Info
    memberType: 'MEMBER',
    paymentType: '',
    fdRdId: '',
    date: new Date().toISOString().split('T')[0],

    // FD/RD (Current)
    current: {
        memberId: '',
        customerName: '',
        instalmentMode: '',
        depositAmount: '',
        period: '',
        depositDate: '',
        maturityDate: '',
        maturityAmount: '',
        interestPayable: ''
    },

    // FD Details (New)
    newFD: {
        fdType: '',
        category: '',
        depositDate: new Date().toISOString().split('T')[0],
        interestPayable: '',
        period: '',
        fdAmount: '',
        maturityDate: '',
        interestRate: '',
        maturityAmount: ''
    },

    // Introducer
    introducer: {
        name: '',
        code: '',
        commission: '1'
    }
};

export function FDRenewal() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [introducers, setIntroducers] = useState<any[]>([]);
    const [saved, setSaved] = useState(false);

    const setHeader = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
    const setCurrent = (k: string, v: string) => setForm(f => ({ ...f, current: { ...f.current, [k]: v } }));
    const setNewFD = (k: string, v: string) => setForm(f => ({ ...f, newFD: { ...f.newFD, [k]: v } }));
    const setIntroducer = (k: string, v: string) => setForm(f => ({ ...f, introducer: { ...f.introducer, [k]: v } }));

    const handleAddIntroducer = () => {
        if (!form.introducer.name) return;
        setIntroducers([...introducers, {
            sNo: introducers.length + 1,
            code: form.introducer.code,
            name: form.introducer.name,
            commission: form.introducer.commission
        }]);
        setIntroducer('name', '');
        setIntroducer('code', '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleRefresh = () => {
        setForm(INITIAL_FORM);
        setIntroducers([]);
    };

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>FD Renewal</h1>
                    <p>Renew existing FD/RD accounts into new Fixed Deposits.</p>
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
                                <select className="pc-select" value={form.memberType} onChange={e => setHeader('memberType', e.target.value)}>
                                    <option value="MEMBER">MEMBER</option>
                                    <option value="CLASS B">CLASS B</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Payment Type: *</label>
                                <select className="pc-select" value={form.paymentType} onChange={e => setHeader('paymentType', e.target.value)}>
                                    <option value="">Select Payment Type</option>
                                    <option value="CASH">CASH</option>
                                    <option value="BANK">BANK</option>
                                </select>
                            </div>
                        </div>
                        <div className="pc-divider-h" />
                        <div className="pc-grid">
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">FD/RD ID : *</label>
                                <select className="pc-select" value={form.fdRdId} onChange={e => setHeader('fdRdId', e.target.value)}>
                                    <option value="">Select MembershipID</option>
                                    <option value="FD001">FD001 - John Doe</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date: *</label>
                                <input type="date" className="pc-input" value={form.date} onChange={e => setHeader('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* current FD/RD Section */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Briefcase size={14} /></div>
                        <p className="pc-card-title">FD/RD (Current Info)</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">MemberId :</label>
                                <input className="pc-input" value={form.current.memberId} onChange={e => setCurrent('memberId', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Customer Name :</label>
                                <input className="pc-input" value={form.current.customerName} onChange={e => setCurrent('customerName', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Instalment Mode:</label>
                                <input className="pc-input" value={form.current.instalmentMode} onChange={e => setCurrent('instalmentMode', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Deposit Amount :</label>
                                <input className="pc-input" value={form.current.depositAmount} onChange={e => setCurrent('depositAmount', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Period:</label>
                                <input className="pc-input" value={form.current.period} onChange={e => setCurrent('period', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Deposit Date:</label>
                                <input className="pc-input" value={form.current.depositDate} onChange={e => setCurrent('depositDate', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Date:</label>
                                <input className="pc-input" value={form.current.maturityDate} onChange={e => setCurrent('maturityDate', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Amount:</label>
                                <input className="pc-input" value={form.current.maturityAmount} onChange={e => setCurrent('maturityAmount', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Payable:</label>
                                <input className="pc-input" value={form.current.interestPayable} onChange={e => setCurrent('interestPayable', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FD Details Section */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><FileText size={14} /></div>
                        <p className="pc-card-title">New FD Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">FD Type :*</label>
                                <select className="pc-select" value={form.newFD.fdType} onChange={e => setNewFD('fdType', e.target.value)}>
                                    <option value="">Select FD Type</option>
                                    <option value="CUMULATIVE">CUMULATIVE</option>
                                    <option value="NON-CUMULATIVE">NON-CUMULATIVE</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Period :*</label>
                                <input className="pc-input" placeholder="Enter Period" value={form.newFD.period} onChange={e => setNewFD('period', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Category :</label>
                                <select className="pc-select" value={form.newFD.category} onChange={e => setNewFD('category', e.target.value)}>
                                    <option value="">Select Category</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">FD Amount :*</label>
                                <input className="pc-input" value={form.newFD.fdAmount} onChange={e => setNewFD('fdAmount', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Deposit Date :</label>
                                <input type="date" className="pc-input" value={form.newFD.depositDate} onChange={e => setNewFD('depositDate', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Date:</label>
                                <input type="date" className="pc-input" value={form.newFD.maturityDate} onChange={e => setNewFD('maturityDate', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Rate :*</label>
                                <select className="pc-select" value={form.newFD.interestRate} onChange={e => setNewFD('interestRate', e.target.value)}>
                                    <option value="">Select Rate</option>
                                    <option value="8">8%</option>
                                    <option value="9">9%</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Interest Payable :*</label>
                                <input className="pc-input" value={form.newFD.interestPayable} onChange={e => setNewFD('interestPayable', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Maturity Amount :*</label>
                                <input className="pc-input" value={form.newFD.maturityAmount} onChange={e => setNewFD('maturityAmount', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Introducer Details Section */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Users size={14} /></div>
                        <p className="pc-card-title">Introducer Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Introducer :*</label>
                                <select className="pc-select" value={form.introducer.name} onChange={e => setIntroducer('name', e.target.value)}>
                                    <option value="">Select Introducer</option>
                                    <option value="Agent 001">Agent 001</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Introducer Code:</label>
                                <input className="pc-input" value={form.introducer.code} onChange={e => setIntroducer('code', e.target.value)} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Commission Percentage:</label>
                                <div className="flex gap-2">
                                    <input className="pc-input" value={form.introducer.commission} onChange={e => setIntroducer('commission', e.target.value)} />
                                    <button type="button" className="pc-btn-primary flex items-center gap-1" onClick={handleAddIntroducer}>
                                        <Plus size={14} /> Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mt-6 border rounded overflow-hidden">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 border-b">
                                    <tr>
                                        <th className="p-2 font-bold uppercase text-slate-500">S.No.</th>
                                        <th className="p-2 font-bold uppercase text-slate-500">Introducer Code</th>
                                        <th className="p-2 font-bold uppercase text-slate-500">Introducer Name</th>
                                        <th className="p-2 font-bold uppercase text-slate-500">Commission %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {introducers.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-4 text-center text-slate-400 italic">No introducers added yet</td>
                                        </tr>
                                    ) : (
                                        introducers.map((item, i) => (
                                            <tr key={i} className="border-b last:border-0">
                                                <td className="p-2">{item.sNo}</td>
                                                <td className="p-2">{item.code}</td>
                                                <td className="p-2">{item.name}</td>
                                                <td className="p-2">{item.commission}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
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
                        FD Renewal Details Saved Successfully!
                    </div>
                )}
            </form>
        </div>
    );
}
export default FDRenewal;

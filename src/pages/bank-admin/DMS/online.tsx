import React, { useState } from 'react';
import { 
    Save, 
    XOctagon, 
    User, 
    Truck, 
    FileText, 
    Calendar,
    Briefcase,
    CreditCard
} from 'lucide-react';
import '../producer-company/producer.css';

const Online: React.FC = () => {
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleClear = () => {
        window.location.reload();
    };

    return (
        <div className="pc-container animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Online Record Entry</h1>
                    <p>Enter and manage delivery orders and vehicle details.</p>
                </div>
                <div className="flex gap-2">
                    <button type="button" className="pc-btn-primary flex items-center gap-2" onClick={handleSave}>
                        <Save size={14} /> Save
                    </button>
                    <button type="button" className="pc-btn-ghost flex items-center gap-2 text-red-500 border-red-100 hover:bg-red-50" onClick={handleClear}>
                        <XOctagon size={14} /> Clear
                    </button>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
                {/* Top Section - Agreement Info */}
                <div className="pc-card">
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">ShowRoom Name : *</label>
                                <select className="pc-select">
                                    <option value="">Select ShowRoom</option>
                                    <option value="main">Main Showroom</option>
                                    <option value="branch">Branch Showroom</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Date : *</label>
                                <input type="date" className="pc-input" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile No. :</label>
                                <input type="text" className="pc-input" placeholder="Enter Mobile Number" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">AGMT NO : *</label>
                                <input type="text" className="pc-input" placeholder="Enter AGMT Number" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Email Id. :</label>
                                <input type="email" className="pc-input" placeholder="Enter Email Id" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">DOB : *</label>
                                <input type="date" className="pc-input" />
                            </div>
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">Address :</label>
                                <textarea className="pc-input" style={{ height: '64px', paddingTop: '4px' }} placeholder="Enter Address" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Age : *</label>
                                <input type="number" className="pc-input" placeholder="Enter AGE" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Nominee : *</label>
                                <input type="text" className="pc-input" placeholder="Enter Nominee Name" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation : *</label>
                                <input type="text" className="pc-input" placeholder="Enter Relation" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile : *</label>
                                <input type="text" className="pc-input" placeholder="Enter Mobile Number" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Order Section */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Briefcase size={14} /></div>
                        <p className="pc-card-title">Delivery Order</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Executive: *</label>
                                <select className="pc-select">
                                    <option value="">Select Executive</option>
                                    <option value="ex1">Executive 01</option>
                                    <option value="ex2">Executive 02</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Assert : *</label>
                                <input type="text" className="pc-input" placeholder="Enter The Assert" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Name : *</label>
                                <input type="text" className="pc-input" placeholder="Enter The Name" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">S/o, W/o, M/s : *</label>
                                <input type="text" className="pc-input" placeholder="Enter The S/o, D.o" />
                            </div>
                            <div className="pc-field pc-grid-double">
                                <label className="pc-label">Residing at : *</label>
                                <textarea className="pc-input" style={{ height: '64px', paddingTop: '4px' }} placeholder="Residing At" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Price : *</label>
                                <input type="number" className="pc-input" placeholder="Enter The Price" />
                            </div>

                            <div className="pc-divider-h pc-grid-full" />

                            <div className="pc-field">
                                <label className="pc-label">Cheque Number :</label>
                                <input type="text" className="pc-input" placeholder="Enter The Cheque Number" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Cheque Dated :</label>
                                <input type="date" className="pc-input" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Drawn Bank :</label>
                                <input type="text" className="pc-input" placeholder="Enter The Drawn Bank" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Drawn Dated :</label>
                                <input type="date" className="pc-input" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Amount :</label>
                                <input type="number" className="pc-input" placeholder="Enter The Amount" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Branch :</label>
                                <input type="text" className="pc-input" placeholder="Enter The Branch" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Details Section */}
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Truck size={14} /></div>
                        <p className="pc-card-title">Vehicle Details</p>
                    </div>
                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">On Road Price: *</label>
                                <input type="number" className="pc-input" placeholder="Enter The Road Price" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Engine Number: *</label>
                                <input type="text" className="pc-input" placeholder="Enter The Engine Number" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Down Payment: *</label>
                                <input type="number" className="pc-input" placeholder="Enter The Down Payment" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Chasis Number: *</label>
                                <input type="text" className="pc-input" placeholder="Enter The Chasis Number" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Cheque/DD: *</label>
                                <input type="text" className="pc-input" placeholder="Enter The Cheque Number" />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Year of Make: *</label>
                                <input type="text" className="pc-input" placeholder="Enter The Year of Making" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex justify-end gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                    <button type="submit" className="pc-btn-primary flex items-center gap-2 px-10 py-2 text-sm shadow-lg shadow-cyan-500/20">
                        <Save size={16} /> Save Information
                    </button>
                    <button type="button" className="pc-btn-ghost flex items-center gap-2 px-10 py-2 text-sm hover:bg-slate-50" onClick={handleClear}>
                        <XOctagon size={16} /> Clear Fields
                    </button>
                </div>
            </form>

            {/* Alert for Save */}
            {saved && (
                <div className="pc-alert fixed bottom-20 right-4 bg-[#009BB0] text-white px-8 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-right-4 flex items-center gap-3 z-[60]">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Save size={20} />
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs">Online Record Entry Saved!</span>
                </div>
            )}
        </div>
    );
};

export default Online;
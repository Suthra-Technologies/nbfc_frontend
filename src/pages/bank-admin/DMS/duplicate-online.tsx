import React, { useState } from 'react';
import { 
    Printer, 
    FileSearch
} from 'lucide-react';
import '../producer-company/producer.css';

const PrintDO: React.FC = () => {
    const [doNumber, setDoNumber] = useState('');

    const handlePrint = () => {
        if (doNumber.trim()) {
            window.print();
        }
    };

    return (
        <div className="pc-container min-h-screen bg-white animate-in fade-in duration-500">
            {/* Simple Toolbar Header */}
            <div className="pc-header" style={{ marginBottom: '1.5rem', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <div className="flex items-center gap-6 flex-1">
                    <div className="flex items-center gap-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">DO Number :</label>
                        <input
                            type="text"
                            value={doNumber}
                            onChange={e => setDoNumber(e.target.value)}
                            placeholder="Enter DO Number"
                            className="pc-input"
                            style={{ width: '220px', height: '26px' }}
                        />
                    </div>
                    
                    <button 
                        type="button" 
                        className="pc-btn-primary flex items-center gap-2 px-6" 
                        onClick={handlePrint}
                        style={{ height: '26px', background: '#009bb0' }}
                    >
                        <Printer size={12} /> Print
                    </button>
                </div>
            </div>

            {/* Print Body Space */}
            <div className="border-2 border-dashed border-slate-100 rounded-xl p-8 bg-slate-50/10 min-h-[80vh] flex flex-col items-center justify-center">
                {!doNumber.trim() ? (
                    <div className="text-center opacity-30 select-none">
                        <FileSearch size={64} className="mx-auto mb-4 text-slate-300" />
                        <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Enter a Delivery Order number above to proceed</p>
                    </div>
                ) : (
                    <div className="bg-white shadow-2xl p-12 w-full max-w-[800px] min-h-[1000px] border border-slate-200 animate-in zoom-in-95 duration-300">
                        {/* Mock Document */}
                        <div className="flex justify-between border-b-2 border-slate-900 pb-4 mb-10">
                            <div>
                                <h1 className="text-2xl font-black uppercase text-slate-900">Delivery Order</h1>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Duplicate Copy</p>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-xl text-slate-800 tracking-tighter">#{doNumber}</p>
                                <p className="text-[10px] text-slate-400 font-medium">Generated: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                        
                        <div className="py-20 flex flex-col items-center justify-center border border-dashed border-slate-100 rounded-lg">
                            <FileSearch size={32} className="text-slate-200 mb-2" />
                            <p className="text-slate-400 italic text-sm">Preview of DO #{doNumber} is ready for printing...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrintDO;

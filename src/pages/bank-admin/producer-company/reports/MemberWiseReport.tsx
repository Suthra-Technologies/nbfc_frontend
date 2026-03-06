import { useState, useRef, useEffect } from 'react';
import {
    Printer,
    Eye,
    Search,
    User,
    Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../producer.css';

const MEMBERS = [
    { id: 'MSGC00001', name: 'KORNEPATI VEERANJANEYULU', father: 'RAMAIAH', mobile: '8762655644' },
    { id: 'MSGC00002', name: 'CHINTA LAKSHMI', father: 'C. VENKATAIAH', mobile: '9848012345' },
];

export function MemberWiseReport() {
    const [memberId, setMemberId] = useState(MEMBERS[0].id);
    const [renderType, setRenderType] = useState('PDF');
    const [isGenerating, setIsGenerating] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const reportRef = useRef<HTMLDivElement>(null);

    // Cleanup blob URL on unmount
    useEffect(() => {
        return () => {
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [pdfUrl]);

    const generatePDFBlob = async () => {
        if (!reportRef.current) return;
        setIsGenerating(true);
        try {
            // Give a small timeout for React to render the hidden report content
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 13.5 * 96 // 13.5 inches at 96 DPI
            });

            const imgData = canvas.toDataURL('image/png');
            // Custom Size: 13.50 x 8.26 in (Landscape)
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'in',
                format: [13.50, 8.26]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, 13.50, 8.26);

            const blob = pdf.output('blob');
            const url = URL.createObjectURL(blob);

            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
            setPdfUrl(url);
        } catch (error) {
            console.error('PDF Generation Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAction = async () => {
        if (renderType === 'PDF') {
            generatePDFBlob();
        } else {
            downloadExcel();
        }
    };

    const downloadExcel = () => {
        const member = MEMBERS.find(m => m.id === memberId) || MEMBERS[0];
        let csv = "Member Details Report\n";
        csv += `Member ID,${member.id}\nCustomer Name,${member.name}\nFather Name,${member.father}\nMobile,${member.mobile}\n`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MemberReport_${memberId}.csv`;
        a.click();
    };

    const selectedMember = MEMBERS.find(m => m.id === memberId) || MEMBERS[0];

    return (
        <div className="pc-container" style={{ padding: '0.5rem' }}>
            {/* Top Control Bar */}
            <div className="pc-card no-print" style={{ marginBottom: '0.5rem', borderRadius: 0, border: 'none', borderBottom: '1px solid #d1d5db' }}>
                <div className="flex items-center gap-6 p-2 bg-[#f0f4f8]">
                    <div className="flex items-center gap-2">
                        <label style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Member Id : *</label>
                        <select
                            className="pc-select"
                            style={{ width: '250px', height: '26px', fontSize: '11px', padding: '0 4px' }}
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                        >
                            {MEMBERS.map(m => (
                                <option key={m.id} value={m.id}>{m.id}_{m.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Render Type : *</label>
                        <select
                            className="pc-select"
                            style={{ width: '80px', height: '26px', fontSize: '11px', padding: '0 4px' }}
                            value={renderType}
                            onChange={(e) => setRenderType(e.target.value)}
                        >
                            <option>PDF</option>
                            <option>EXCEL</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            className="flex items-center gap-1 px-4 py-1 text-white text-[11px] rounded transition-all active:scale-95 disabled:opacity-50"
                            style={{ background: 'linear-gradient(to bottom, #7da1c2, #5c7c9c)', border: '1px solid #4a6a8a' }}
                            onClick={handleAction}
                            disabled={isGenerating}
                        >
                            {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Printer size={12} />}
                            {isGenerating ? 'Generating...' : 'Print'}
                        </button>
                        <button
                            className="flex items-center gap-1 px-4 py-1 text-white text-[11px] rounded transition-all active:scale-95 disabled:opacity-50"
                            style={{ background: 'linear-gradient(to bottom, #7da1c2, #5c7c9c)', border: '1px solid #4a6a8a' }}
                            onClick={generatePDFBlob}
                            disabled={isGenerating}
                        >
                            <Eye size={12} /> View
                        </button>
                    </div>
                </div>
            </div>

            {/* Hidden Report Content for Capturing */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                <div className="pdf-actual-page" ref={reportRef} style={{ width: '13.5in', minHeight: '8.26in', padding: '0.5in', background: 'white', color: 'black', fontFamily: "'Times New Roman', serif" }}>
                    <div className="print-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '13pt', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem', margin: 0 }}>THE MAHA MAHA MUTUALLY AIDED CO-OPERATIVE THRIFT AND CREDIT SOCIETY LTD</h2>
                        <p style={{ fontSize: '9pt', fontWeight: 700, margin: '2px 0' }}>Reg.No:-AMC/PKM/DCO/2024/25,</p>
                        <p style={{ fontSize: '9pt', fontWeight: 700, margin: '2px 0' }}>GROUTH CENTER,A.P-523211</p>
                        <h3 style={{ fontSize: '11pt', fontWeight: 700, textDecoration: 'underline', marginTop: '1.2rem' }}>Member Details Report Of : {selectedMember.name}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: '9pt', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                        <div>Printed On : {new Date().toLocaleDateString('en-GB')}  {new Date().toLocaleTimeString('en-GB')}</div>
                        <div style={{ textAlign: 'right' }}>Branch Name : GROUTH CENTER</div>
                    </div>
                    <div style={{ borderTop: '1.5px solid black', margin: '4px 0 10px 0' }} />

                    <div style={{ textAlign: 'right', fontSize: '9pt', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        JoiningDate : 09-May-2025
                    </div>

                    <h4 style={{ fontSize: '10pt', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '0.8rem' }}>Member Details</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: '20px' }}>
                        <div style={{ display: 'grid', gap: '5px' }}>
                            {[
                                { l: 'Member ID', v: selectedMember.id },
                                { l: 'Customer Name', v: selectedMember.name },
                                { l: 'Member Type', v: 'MEMBER' },
                                { l: 'Gender', v: 'M' },
                                { l: 'Father Name', v: selectedMember.father },
                                { l: 'Aadhar No.', v: '917177401017' },
                                { l: 'DOB', v: '01-Jan-1983' },
                                { l: 'Land Mark', v: '' },
                                { l: 'Mobile Number', v: selectedMember.mobile },
                                { l: 'House No.', v: '1-110A' },
                                { l: 'Mandal', v: '' },
                                { l: 'Pincode', v: '523225' },
                                { l: 'Rural Area', v: 'CHANDRAPALEM' },
                                { l: 'State', v: 'ANDHRA PRADESH' }
                            ].map((row, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr', fontSize: '8.5pt', lineHeight: 1.2 }}>
                                    <span style={{ fontWeight: 'bold' }}>{row.l}</span>
                                    <span>:</span>
                                    <span>{row.v}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gap: '5px', alignContent: 'start' }}>
                            {[
                                { l: 'Mother Name', v: '' },
                                { l: 'PAN No.', v: '' },
                                { l: 'Age', v: '42' },
                                { l: 'Occupation', v: '' },
                                { l: 'Area', v: 'CHANDRAPALEM' },
                                { l: 'Rural', v: 'CHANDRAPALEM' },
                                { l: 'City Area', v: 'CHANDRAPALEM' },
                                { l: 'PostOffice', v: 'SANTHANUTHALAPADU' },
                                { l: 'District', v: 'PRAKASAM' },
                                { l: 'Country', v: 'India' }
                            ].map((row, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 10px 1fr', fontSize: '8.5pt', lineHeight: 1.2 }}>
                                    <span style={{ fontWeight: 'bold' }}>{row.l}</span>
                                    <span>:</span>
                                    <span>{row.v}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '100px', height: '120px', border: '1px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                                <User size={40} className="text-slate-300" />
                                <span style={{ fontSize: '7pt', fontWeight: 'bold', color: '#94a3b8', marginTop: '5px' }}>PHOTO</span>
                            </div>
                        </div>
                    </div>

                    <h4 style={{ fontSize: '10pt', fontWeight: 'bold', textDecoration: 'underline', marginTop: '2.5rem', marginBottom: '0.8rem' }}>Nominee Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div style={{ display: 'grid', gap: '5px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr', fontSize: '8.5pt' }}>
                                <span style={{ fontWeight: 'bold' }}>Name</span><span>:</span><span>MALLESWARI</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr', fontSize: '8.5pt' }}>
                                <span style={{ fontWeight: 'bold' }}>Relation</span><span>:</span><span>WIFE</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: '5px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr', fontSize: '8.5pt' }}>
                                <span style={{ fontWeight: 'bold' }}>Age</span><span>:</span><span>36</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr', fontSize: '8.5pt' }}>
                                <span style={{ fontWeight: 'bold' }}>Mobile Number</span><span>:</span><span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real PDF Iframe Viewer */}
            {pdfUrl ? (
                <div className="pdf-viewer-container animate-in fade-in zoom-in duration-300">
                    <iframe
                        src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                        width="100%"
                        height="100%"
                        title="PDF Viewer"
                        style={{ border: 'none', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                    />
                </div>
            ) : !isGenerating && (
                <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50 mt-4 no-print">
                    <Search size={48} className="text-slate-200 mb-4" />
                    <p className="text-slate-400 font-medium text-sm">Select a member and click View or Print to seeing the PDF report</p>
                </div>
            )}

            {isGenerating && !pdfUrl && (
                <div className="flex flex-col items-center justify-center p-20 mt-4 h-[60vh]">
                    <Loader2 size={48} className="text-[#009BB0] animate-spin mb-4" />
                    <p className="text-slate-500 font-medium italic">Generating High-Quality PDF Report...</p>
                </div>
            )}

            <style>{`
                .pdf-viewer-container {
                    height: calc(100vh - 120px);
                    width: 100%;
                    background: #525659;
                    padding: 0;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                @media print {
                    .no-print { display: none !important; }
                    .pdf-viewer-container { display: none !important; }
                    .pdf-actual-page { position: static !important; display: block !important; margin: 0 auto !important; }
                }
            `}</style>
        </div>
    );
}

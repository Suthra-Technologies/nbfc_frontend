import React, { useState, useRef, useEffect } from 'react';
import {
    Printer,
    Search,
    Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../producer.css';

const DUMMY_DATA = [
    {
        category: 'MEMBER',
        members: [
            {
                sno: 1,
                memberId: 'MSGC000293',
                name: 'EMANI SUNITHA',
                date: '05-Mar-2026',
                mobile: '8008347000',
                aadhar: '486782065434',
                pan: 'MPCPS4076R',
                nominee: 'EMANI PRASADA RAO',
                address: '00, SANTHANUTHALAPADU, SANTHANUTHALAPADU, PRAKASAM, ANDHRA PRADESH, India',
                glNo: ''
            }
        ]
    }
];

export function MemberDetailsReport() {
    const [fromDate, setFromDate] = useState('2026-03-05');
    const [toDate, setToDate] = useState('2026-03-05');
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
            // Give a small timeout for React to render the hidden report content if needed
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

    const handlePrintClick = () => {
        if (renderType === 'PDF') {
            generatePDFBlob();
        } else {
            downloadExcel();
        }
    };

    const downloadExcel = () => {
        let csv = "S. No.,Member ID,Member Name,Date,Mobile No.,Aadhar No.,PAN No.,Nominee Name,Address,GL No.\n";
        DUMMY_DATA.forEach(cat => {
            cat.members.forEach(m => {
                csv += `${m.sno},${m.memberId},${m.name},${m.date},${m.mobile},${m.aadhar},${m.pan},${m.nominee},"${m.address}",${m.glNo}\n`;
            });
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Member_Details_Report.csv';
        a.click();
    };

    return (
        <div className="pc-container" style={{ padding: '0.5rem' }}>
            {/* Header Controls */}
            <div className="pc-card no-print" style={{ marginBottom: '0.5rem', borderRadius: 0, border: 'none', borderBottom: '1px solid #d1d5db' }}>
                <div className="flex items-center gap-6 p-2 bg-[#e5eef5]">
                    <div className="flex items-center gap-1">
                        <label style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>From Date:</label>
                        <input type="date" className="pc-input" value={fromDate} onChange={e => setFromDate(e.target.value)} style={{ padding: '2px 4px', fontSize: '11px', height: '24px', width: '110px' }} />
                    </div>
                    <div className="flex items-center gap-1">
                        <label style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>To Date:</label>
                        <input type="date" className="pc-input" value={toDate} onChange={e => setToDate(e.target.value)} style={{ padding: '2px 4px', fontSize: '11px', height: '24px', width: '110px' }} />
                    </div>
                    <div className="flex items-center gap-1">
                        <label style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>Render Type:</label>
                        <select className="pc-select" value={renderType} onChange={e => setRenderType(e.target.value)} style={{ padding: '2px 20px 2px 4px', fontSize: '11px', height: '24px', width: '80px' }}>
                            <option>PDF</option>
                            <option>EXCEL</option>
                        </select>
                    </div>
                    <button
                        onClick={handlePrintClick}
                        className="flex items-center gap-1 px-3 py-1 text-white text-[11px] rounded transition-all active:scale-95"
                        disabled={isGenerating}
                        style={{ background: 'linear-gradient(to bottom, #7da1c2, #5c7c9c)', border: '1px solid #4a6a8a', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                    >
                        {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Printer size={12} />}
                        {isGenerating ? 'Generating...' : 'Print'}
                    </button>
                </div>
            </div>

            {/* Hidden Report Content for Capturing */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                <div className="pdf-actual-page" ref={reportRef} style={{ width: '13.5in', minHeight: '8.26in', padding: '0.5in', background: 'white' }}>
                    <div className="report-header-print" style={{ textAlign: 'center', marginBottom: '15px' }}>
                        <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '0 0 2px 0' }}>THE MAHA MAHA MUTUALLY AIDED CO-OPERATIVE THRIFT AND CREDIT SOCIETY LTD</h2>
                        <p style={{ fontSize: '11pt', fontWeight: 'bold', margin: '0 0 1px 0' }}>Reg.No:-AMC/PKM/DCO/2024/25,</p>
                        <p style={{ fontSize: '11pt', fontWeight: 'bold', margin: '0 0 1px 0' }}>GROUTH CENTER,A.P-523211</p>
                        <h3 style={{ fontSize: '12pt', fontWeight: 'bold', marginTop: '10px' }}>Memberwise Details Report Between {fromDate} And {toDate}</h3>
                    </div>

                    <div className="report-meta-print" style={{ borderBottom: '1px solid black', paddingBottom: '4px', marginBottom: '10px', fontSize: '10pt', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                        <span><strong>Printed On :</strong> {new Date().toLocaleString()}</span>
                        <span><strong>Branch :</strong> GROUTH CENTER</span>
                    </div>

                    <table className="report-print-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>S. No.</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>Member ID</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>Member Name</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>Date</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>Mobile No.</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>Aadhar No.</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>PAN No.</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>Nominee Name</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>Address</th>
                                <th style={{ borderBottom: '1px solid black', fontSize: '9pt', fontWeight: 'bold', textAlign: 'left', padding: '4px' }}>GL No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DUMMY_DATA.map((group, groupIdx) => (
                                <React.Fragment key={groupIdx}>
                                    <tr>
                                        <td colSpan={10} style={{ textAlign: 'center', padding: '10px 0', color: '#000080', fontWeight: 'bold', fontSize: '9pt' }}>
                                            .......... {group.category} ..........
                                        </td>
                                    </tr>
                                    {group.members.map((member, mIdx) => (
                                        <tr key={mIdx}>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.sno}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.memberId}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px', fontWeight: 'bold' }}>{member.name}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.date}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.mobile}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.aadhar}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.pan}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.nominee}</td>
                                            <td style={{ fontSize: '7pt', padding: '4px', maxWidth: '200px', lineHeight: 1.1 }}>{member.address}</td>
                                            <td style={{ fontSize: '8pt', padding: '4px' }}>{member.glNo}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
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
                <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50 mt-4">
                    <Search size={48} className="text-slate-200 mb-4" />
                    <p className="text-slate-400 font-medium text-sm">Select dates and click Print to viewing the PDF report</p>
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

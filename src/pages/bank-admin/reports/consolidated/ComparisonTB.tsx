import { useState } from 'react';
import { Printer, Download, Filter, Search, Building2, Calendar, ChevronDown, TrendingUp } from 'lucide-react';
import '../../producer-company/producer.css';

interface ComparisonRow {
    id: string;
    particulars: string;
    isGroup: boolean;
    p1Dr: number;
    p1Cr: number;
    p2Dr: number;
    p2Cr: number;
    subRows?: ComparisonRow[];
}

const MOCK_DATA: ComparisonRow[] = [
    {
        id: '1',
        particulars: 'LIABILITIES',
        isGroup: true,
        p1Dr: 0,
        p1Cr: 5000000,
        p2Dr: 0,
        p2Cr: 5600000,
        subRows: [
            { id: '1.1', particulars: 'Share Capital', isGroup: false, p1Dr: 0, p1Cr: 1000000, p2Dr: 0, p2Cr: 1100000 },
            { id: '1.2', particulars: 'Fixed Deposits', isGroup: false, p1Dr: 0, p1Cr: 2500000, p2Dr: 0, p2Cr: 2850000 },
            { id: '1.3', particulars: 'Recurring Deposits', isGroup: false, p1Dr: 0, p1Cr: 1500000, p2Dr: 0, p2Cr: 1650000 },
        ]
    },
    {
        id: '2',
        particulars: 'ASSETS',
        isGroup: true,
        p1Dr: 4500000,
        p1Cr: 0,
        p2Dr: 5200000,
        p2Cr: 0,
        subRows: [
            { id: '2.1', particulars: 'Gold Loans', isGroup: false, p1Dr: 2000000, p1Cr: 0, p2Dr: 2300000, p2Cr: 0 },
            { id: '2.2', particulars: 'Personal Loans', isGroup: false, p1Dr: 1500000, p1Cr: 0, p2Dr: 1700000, p2Cr: 0 },
            { id: '2.3', particulars: 'Cash In Hand', isGroup: false, p1Dr: 500000, p1Cr: 0, p2Dr: 650000, p2Cr: 0 },
            { id: '2.4', particulars: 'Bank Balances', isGroup: false, p1Dr: 500000, p1Cr: 0, p2Dr: 550000, p2Cr: 0 },
        ]
    },
    {
        id: '3',
        particulars: 'INCOME',
        isGroup: true,
        p1Dr: 0,
        p1Cr: 400000,
        p2Dr: 0,
        p2Cr: 450000,
        subRows: [
            { id: '3.1', particulars: 'Interest on Loans', isGroup: false, p1Dr: 0, p1Cr: 350000, p2Dr: 0, p2Cr: 400000 },
            { id: '3.2', particulars: 'Processing Fees', isGroup: false, p1Dr: 0, p1Cr: 50000, p2Dr: 0, p2Cr: 50000 },
        ]
    },
    {
        id: '4',
        particulars: 'EXPENDITURE',
        isGroup: true,
        p1Dr: 300000,
        p1Cr: 0,
        p2Dr: 350000,
        p2Cr: 0,
        subRows: [
            { id: '4.1', particulars: 'Interest on Deposits', isGroup: false, p1Dr: 150000, p1Cr: 0, p2Dr: 200000, p2Cr: 0 },
            { id: '4.2', particulars: 'Staff Salaries', isGroup: false, p1Dr: 100000, p1Cr: 0, p2Dr: 100000, p2Cr: 0 },
            { id: '4.3', particulars: 'Office Rent', isGroup: false, p1Dr: 50000, p1Cr: 0, p2Dr: 50000, p2Cr: 0 },
        ]
    }
];

export default function ComparisonTB() {
    const [asOnDateChecked, setAsOnDateChecked] = useState(false);
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [grouping, setGrouping] = useState(true);
    const [exportType, setExportType] = useState('PDF');
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('ALL');
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ '1': true, '2': true });

    const toggleGroup = (id: string) => {
        setExpandedGroups((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
    };

    const formatCurrency = (num: number) => {
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const calculateVariance = (p1Val: number, p2Val: number) => {
        const diff = p1Val - p2Val;
        const percent = p2Val !== 0 ? (diff / p2Val) * 100 : 0;
        return { diff, percent };
    };

    // Calculate totals
    const totals = {
        p1Dr: MOCK_DATA.reduce((acc, curr) => acc + curr.p1Dr, 0),
        p1Cr: MOCK_DATA.reduce((acc, curr) => acc + curr.p1Cr, 0),
        p2Dr: MOCK_DATA.reduce((acc, curr) => acc + curr.p2Dr, 0),
        p2Cr: MOCK_DATA.reduce((acc, curr) => acc + curr.p2Cr, 0),
    };

    const totalVarianceDr = calculateVariance(totals.p1Dr, totals.p2Dr);
    const totalVarianceCr = calculateVariance(totals.p1Cr, totals.p2Cr);

    return (
        <div className="pc-container">
            <style>{`
                .pc-label { font-size: 0.6rem !important; }
                .pc-input, .pc-select { font-size: 0.75rem !important; height: 28px !important; }
                .pc-table th { font-size: 0.65rem !important; padding: 0.4rem 0.5rem !important; }
                .pc-table td { font-size: 0.75rem !important; padding: 0.4rem 0.5rem !important; }
                .variance-cell { font-size: 0.65rem !important; font-weight: 700; }
                .group-row { background-color: #f8fafc; font-weight: 800; border-bottom: 2px solid #e2e8f0; }
                .positive-variance { color: #10b981; }
                .negative-variance { color: #ef4444; }
            `}</style>

            <div className="pc-header">
                <div className="pc-header-left">
                    <div className="flex items-center gap-3">
                        <div className="pc-card-icon" style={{ backgroundColor: '#009BB0', marginBottom: 0 }}>
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.1rem' }}>Comparison Trial Balance</h1>
                            <p style={{ fontSize: '0.7rem' }}>Multi-period financial analysis across branches (REAL MACTS Standard)</p>
                        </div>
                    </div>
                </div>
                <div className="pc-header-right flex gap-2">
                    <button className="pc-action-btn secondary"><Download size={14} /> Export</button>
                    <button className="pc-action-btn secondary"><Printer size={14} /> Print</button>
                    <span className="pc-badge success">Consolidated</span>
                </div>
            </div>

            {/* Standardized Filters */}
            <div className="bg-[#e8ecef] border border-slate-300 px-4 py-3 flex flex-wrap items-center gap-6 text-[11px] font-semibold text-slate-800 rounded-sm shadow-sm mb-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" checked={asOnDateChecked} onChange={(e) => setAsOnDateChecked(e.target.checked)} />
                    As On Date
                </label>
                
                <div className="flex items-center gap-1.5">
                    <span>From Date:</span>
                    <input type="date" className="border border-slate-300 rounded px-2 py-1 bg-white font-mono text-[11px]" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>

                <div className="flex items-center gap-1.5">
                    <span>To Date:</span>
                    <input type="date" className="border border-slate-300 rounded px-2 py-1 bg-white font-mono text-[11px]" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>

                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" checked={grouping} onChange={(e) => setGrouping(e.target.checked)} />
                    Grouping
                </label>
                
                <div className="flex items-center gap-1.5 ml-auto">
                    <span>Export type:</span>
                    <select className="border border-slate-300 rounded px-2 py-1 bg-white" value={exportType} onChange={(e) => setExportType(e.target.value)}>
                        <option value="PDF">PDF</option>
                        <option value="Excel">Excel</option>
                    </select>
                    
                    <button className="flex items-center gap-1.5 bg-[#64748b] text-white px-3 py-1.5 rounded text-[11px] font-bold hover:bg-[#475569] ml-2 border border-transparent shadow hover:shadow-md transition-all">
                        <Printer size={13} /> Print
                    </button>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="pc-card overflow-hidden">
                <div className="pc-table-container">
                    <table className="pc-table">
                        <thead>
                            <tr className="text-white" style={{ backgroundColor: '#009BB0' }}>
                                <th rowSpan={2} style={{ width: '40px' }}>#</th>
                                <th rowSpan={2} style={{ textAlign: 'left' }}>Particulars (Ledger Groups / Names)</th>
                                <th colSpan={2} className="text-center border-l border-slate-700">Period 1 (Selected)</th>
                                <th colSpan={2} className="text-center border-l border-slate-700">Period 2 (Selected)</th>
                                <th colSpan={2} className="text-center border-l border-slate-700 bg-teal-800/50">Variance Analysis</th>
                            </tr>
                            <tr className="text-white" style={{ backgroundColor: '#008294' }}>
                                <th className="text-right border-l border-slate-700">Debit</th>
                                <th className="text-right">Credit</th>
                                <th className="text-right border-l border-slate-700">Debit</th>
                                <th className="text-right">Credit</th>
                                <th className="text-right border-l border-slate-700">Amount (Diff)</th>
                                <th className="text-right">Growth %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_DATA.map((row, index) => {
                                const vDr = calculateVariance(row.p1Dr, row.p2Dr);
                                const vCr = calculateVariance(row.p1Cr, row.p2Cr);
                                const mainV = row.p1Dr > 0 ? vDr : vCr;

                                return (
                                    <div key={row.id} style={{ display: 'contents' }}>
                                        <tr className="group-row">
                                            <td className="text-center font-bold">{index + 1}</td>
                                            <td className="font-bold flex items-center gap-2 cursor-pointer" onClick={() => toggleGroup(row.id)}>
                                                <ChevronDown size={14} className={`transition-transform duration-200 ${expandedGroups[row.id] ? '' : '-rotate-90'}`} />
                                                {row.particulars}
                                            </td>
                                            <td className="text-right font-bold">{row.p1Dr > 0 ? formatCurrency(row.p1Dr) : '-'}</td>
                                            <td className="text-right font-bold">{row.p1Cr > 0 ? formatCurrency(row.p1Cr) : '-'}</td>
                                            <td className="text-right font-bold text-slate-500">{row.p2Dr > 0 ? formatCurrency(row.p2Dr) : '-'}</td>
                                            <td className="text-right font-bold text-slate-500">{row.p2Cr > 0 ? formatCurrency(row.p2Cr) : '-'}</td>
                                            <td className={`text-right font-bold ${mainV.diff >= 0 ? 'positive-variance' : 'negative-variance'}`}>
                                                {formatCurrency(mainV.diff)}
                                            </td>
                                            <td className={`text-right font-bold ${mainV.percent >= 0 ? 'positive-variance' : 'negative-variance'}`}>
                                                {mainV.percent.toFixed(2)}%
                                            </td>
                                        </tr>
                                        {expandedGroups[row.id] && row.subRows?.map((sub, sIdx) => {
                                            const svDr = calculateVariance(sub.p1Dr, sub.p2Dr);
                                            const svCr = calculateVariance(sub.p1Cr, sub.p2Cr);
                                            const subV = sub.p1Dr > 0 ? svDr : svCr;
                                            
                                            return (
                                                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="text-center text-[10px] text-slate-400">{index + 1}.{sIdx + 1}</td>
                                                    <td className="pl-8 text-slate-600 font-medium">{sub.particulars}</td>
                                                    <td className="text-right text-[#009BB0] font-medium">{sub.p1Dr > 0 ? formatCurrency(sub.p1Dr) : '-'}</td>
                                                    <td className="text-right text-[#009BB0] font-medium">{sub.p1Cr > 0 ? formatCurrency(sub.p1Cr) : '-'}</td>
                                                    <td className="text-right text-slate-400">{sub.p2Dr > 0 ? formatCurrency(sub.p2Dr) : '-'}</td>
                                                    <td className="text-right text-slate-400">{sub.p2Cr > 0 ? formatCurrency(sub.p2Cr) : '-'}</td>
                                                    <td className={`text-right variance-cell ${subV.diff >= 0 ? 'positive-variance' : 'negative-variance'}`}>
                                                        {formatCurrency(subV.diff)}
                                                    </td>
                                                    <td className={`text-right variance-cell ${subV.percent >= 0 ? 'positive-variance' : 'negative-variance'}`}>
                                                        {subV.percent.toFixed(1)}%
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </tbody>
                        <tfoot className="text-white font-bold" style={{ backgroundColor: '#009BB0' }}>
                            <tr className="h-10">
                                <td colSpan={2} className="text-right uppercase tracking-wider">Grand Totals</td>
                                <td className="text-right">{formatCurrency(totals.p1Dr)}</td>
                                <td className="text-right">{formatCurrency(totals.p1Cr)}</td>
                                <td className="text-right opacity-80">{formatCurrency(totals.p2Dr)}</td>
                                <td className="text-right opacity-80">{formatCurrency(totals.p2Cr)}</td>
                                <td className="text-right border-l border-white/20">{formatCurrency(totalVarianceDr.diff + totalVarianceCr.diff)}</td>
                                <td className="text-right">Analytics</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Quick Analytics */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="pc-card p-3 border-l-4 border-l-[#009BB0]">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="pc-label">P1 Balance Status</p>
                            <h3 className="text-sm font-bold text-slate-800">Balanced</h3>
                        </div>
                        <CheckCircle size={16} className="text-green-500" />
                    </div>
                </div>
                <div className="pc-card p-3 border-l-4 border-l-blue-500">
                    <p className="pc-label">Growth Index</p>
                    <div className="flex items-center gap-2">
                        <TrendingUp size={14} className="text-green-500" />
                        <h3 className="text-sm font-bold text-slate-800">+12.4%</h3>
                    </div>
                </div>
                <div className="pc-card p-3 border-l-4 border-l-indigo-500">
                    <p className="pc-label">Volume Diff</p>
                    <h3 className="text-sm font-bold text-slate-800">₹{formatCurrency(totalVarianceDr.diff)}</h3>
                </div>
                <div className="pc-card p-3 border-l-4 border-l-teal-500">
                    <p className="pc-label">System Health</p>
                    <h3 className="text-sm font-bold text-teal-600">Stable</h3>
                </div>
            </div>
        </div>
    );
}

// Sub-components as icons for variance
const CheckCircle = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

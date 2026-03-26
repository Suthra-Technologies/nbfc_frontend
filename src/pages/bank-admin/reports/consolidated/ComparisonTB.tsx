import { useState } from 'react';
import { Printer, Download, FileSpreadsheet, Filter, Search, Building2, Calendar, ChevronDown, TrendingUp } from 'lucide-react';
import '../../producer-company/producer.css';
import { exportPDF, exportExcel } from './exportUtils';

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
    // Period 1 (Current Year/Month)
    const [p1From, setP1From] = useState('2026-03-01');
    const [p1To, setP1To] = useState('2026-03-31');
    // Period 2 (Previous Year/Month)
    const [p2From, setP2From] = useState('2025-03-01');
    const [p2To, setP2To] = useState('2025-03-31');

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

    const fmt = (n: number) => n > 0 ? formatCurrency(n) : '-';

    const getFlatRows = () => {
        const rows: (string | number)[][] = [];
        MOCK_DATA.forEach((group, gi) => {
            const vDr = calculateVariance(group.p1Dr, group.p2Dr);
            const vCr = calculateVariance(group.p1Cr, group.p2Cr);
            rows.push([`${gi + 1}`, group.particulars, fmt(group.p1Dr), fmt(group.p1Cr), fmt(group.p2Dr), fmt(group.p2Cr), fmt(Math.abs(vDr.diff || vCr.diff)), `${(vDr.percent || vCr.percent).toFixed(1)}%`]);
            group.subRows?.forEach((sub, si) => {
                const svDr = calculateVariance(sub.p1Dr, sub.p2Dr);
                const svCr = calculateVariance(sub.p1Cr, sub.p2Cr);
                rows.push([`${gi + 1}.${si + 1}`, `  ${sub.particulars}`, fmt(sub.p1Dr), fmt(sub.p1Cr), fmt(sub.p2Dr), fmt(sub.p2Cr), fmt(Math.abs(svDr.diff || svCr.diff)), `${(svDr.percent || svCr.percent).toFixed(1)}%`]);
            });
        });
        rows.push(['', 'GRAND TOTALS', fmt(totals.p1Dr), fmt(totals.p1Cr), fmt(totals.p2Dr), fmt(totals.p2Cr), '', '']);
        return rows;
    };

    const EXPORT_HEADERS = ['Sl.No', 'Particulars', 'P1 Debit', 'P1 Credit', 'P2 Debit', 'P2 Credit', 'Variance', 'Variance %'];
    const dateRange = `P1: ${p1From} to ${p1To} | P2: ${p2From} to ${p2To}`;

    const handleExportPDF = () => exportPDF('Comparison Trial Balance', dateRange, EXPORT_HEADERS, getFlatRows(), 'comparison_tb');
    const handleExportExcel = () => exportExcel('Comparison Trial Balance', dateRange, EXPORT_HEADERS, getFlatRows(), 'comparison_tb');
    const handlePrint = () => window.print();

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
                    <button onClick={handleExportPDF} className="pc-action-btn secondary"><Download size={14} /> Export PDF</button>
                    <button onClick={handleExportExcel} className="pc-action-btn secondary"><FileSpreadsheet size={14} /> Export Excel</button>
                    <button onClick={handlePrint} className="pc-action-btn secondary"><Printer size={14} /> Print</button>
                    <span className="pc-badge success">Consolidated</span>
                </div>
            </div>

            {/* Comparison Filters */}
            <div className="pc-card">
                <div className="pc-form p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Period 1 Analysis */}
                        <div className="bg-slate-50/50 p-3 rounded border border-slate-100">
                            <h4 className="text-[10px] font-bold text-[#009BB0] uppercase mb-3 flex items-center gap-2">
                                <Calendar size={12} /> Period 1 (Target Period)
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="pc-field">
                                    <label className="pc-label">From Date</label>
                                    <input type="date" className="pc-input" value={p1From} onChange={(e) => setP1From(e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">To Date</label>
                                    <input type="date" className="pc-input" value={p1To} onChange={(e) => setP1To(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Period 2 Analysis */}
                        <div className="bg-slate-50/50 p-3 rounded border border-slate-100">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                                <Calendar size={12} /> Period 2 (Baseline Period)
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="pc-field">
                                    <label className="pc-label">From Date</label>
                                    <input type="date" className="pc-input" value={p2From} onChange={(e) => setP2From(e.target.value)} />
                                </div>
                                <div className="pc-field">
                                    <label className="pc-label">To Date</label>
                                    <input type="date" className="pc-input" value={p2To} onChange={(e) => setP2To(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="pc-field">
                            <label className="pc-label flex items-center gap-2"><Building2 size={13} /> Select Branch</label>
                            <select className="pc-select" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                                <option value="ALL">ALL BRANCHES (CONSOLIDATED)</option>
                                <option value="B001">MAIN BRANCH - KURNOOL</option>
                                <option value="B002">GUNTUR BRANCH</option>
                            </select>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label flex items-center gap-2"><Search size={13} /> Search Ledger</label>
                            <div className="relative">
                                <input className="pc-input pr-8" placeholder="Filter by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="pc-action-btn primary px-8" style={{ background: '#009BB0' }}>
                                <Filter size={14} /> Compare Periods
                            </button>
                        </div>
                    </div>
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

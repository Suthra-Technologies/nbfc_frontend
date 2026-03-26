import { useState } from 'react';
import { Printer, Download, FileSpreadsheet, Filter, Search, Building2, Calendar, LayoutDashboard, ChevronDown } from 'lucide-react';
import '../../producer-company/producer.css';
import { exportPDF, exportExcel } from './exportUtils';

interface TrialBalanceRow {
    id: string;
    particulars: string;
    isGroup: boolean;
    openingDr: number;
    openingCr: number;
    transactionDr: number;
    transactionCr: number;
    closingDr: number;
    closingCr: number;
    subRows?: TrialBalanceRow[];
}

const MOCK_DATA: TrialBalanceRow[] = [
    {
        id: '1',
        particulars: 'LIABILITIES',
        isGroup: true,
        openingDr: 0,
        openingCr: 5000000,
        transactionDr: 200000,
        transactionCr: 800000,
        closingDr: 0,
        closingCr: 5600000,
        subRows: [
            { id: '1.1', particulars: 'Share Capital', isGroup: false, openingDr: 0, openingCr: 1000000, transactionDr: 0, transactionCr: 100000, closingDr: 0, closingCr: 1100000 },
            { id: '1.2', particulars: 'Fixed Deposits', isGroup: false, openingDr: 0, openingCr: 2500000, transactionDr: 150000, transactionCr: 500000, closingDr: 0, closingCr: 2850000 },
            { id: '1.3', particulars: 'Recurring Deposits', isGroup: false, openingDr: 0, openingCr: 1500000, transactionDr: 50000, transactionCr: 200000, closingDr: 0, closingCr: 1650000 },
        ]
    },
    {
        id: '2',
        particulars: 'ASSETS',
        isGroup: true,
        openingDr: 4500000,
        openingCr: 0,
        transactionDr: 1200000,
        transactionCr: 500000,
        closingDr: 5200000,
        closingCr: 0,
        subRows: [
            { id: '2.1', particulars: 'Gold Loans', isGroup: false, openingDr: 2000000, openingCr: 0, transactionDr: 500000, transactionCr: 200000, closingDr: 2300000, closingCr: 0 },
            { id: '2.2', particulars: 'Personal Loans', isGroup: false, openingDr: 1500000, openingCr: 0, transactionDr: 400000, transactionCr: 200000, closingDr: 1700000, closingCr: 0 },
            { id: '2.3', particulars: 'Cash In Hand', isGroup: false, openingDr: 500000, openingCr: 0, transactionDr: 200000, transactionCr: 50000, closingDr: 650000, closingCr: 0 },
            { id: '2.4', particulars: 'Bank Balances', isGroup: false, openingDr: 500000, openingCr: 0, transactionDr: 100000, transactionCr: 50000, closingDr: 550000, closingCr: 0 },
        ]
    },
    {
        id: '3',
        particulars: 'INCOME',
        isGroup: true,
        openingDr: 0,
        openingCr: 0,
        transactionDr: 0,
        transactionCr: 450000,
        closingDr: 0,
        closingCr: 450000,
        subRows: [
            { id: '3.1', particulars: 'Interest on Loans', isGroup: false, openingDr: 0, openingCr: 0, transactionDr: 0, transactionCr: 400000, closingDr: 0, closingCr: 400000 },
            { id: '3.2', particulars: 'Processing Fees', isGroup: false, openingDr: 0, openingCr: 0, transactionDr: 0, transactionCr: 50000, closingDr: 0, closingCr: 50000 },
        ]
    },
    {
        id: '4',
        particulars: 'EXPENDITURE',
        isGroup: true,
        openingDr: 0,
        openingCr: 0,
        transactionDr: 350000,
        transactionCr: 0,
        closingDr: 350000,
        closingCr: 0,
        subRows: [
            { id: '4.1', particulars: 'Interest on Deposits', isGroup: false, openingDr: 0, openingCr: 0, transactionDr: 200000, transactionCr: 0, closingDr: 200000, closingCr: 0 },
            { id: '4.2', particulars: 'Staff Salaries', isGroup: false, openingDr: 0, openingCr: 0, transactionDr: 100000, transactionCr: 0, closingDr: 100000, closingCr: 0 },
            { id: '4.3', particulars: 'Office Rent', isGroup: false, openingDr: 0, openingCr: 0, transactionDr: 50000, transactionCr: 0, closingDr: 50000, closingCr: 0 },
        ]
    }
];

export default function TrialBalance() {
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('ALL');
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ '1': true, '2': true });

    const toggleGroup = (id: string) => {
        setExpandedGroups((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
    };

    const formatCurrency = (num: number) => {
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const fmt = (n: number) => n > 0 ? formatCurrency(n) : '-';

    // Flatten rows for export
    const getFlatRows = () => {
        const rows: (string | number)[][] = [];
        MOCK_DATA.forEach((group, gi) => {
            rows.push([`${gi + 1}`, group.particulars, fmt(group.openingDr), fmt(group.openingCr), fmt(group.transactionDr), fmt(group.transactionCr), fmt(group.closingDr), fmt(group.closingCr)]);
            group.subRows?.forEach((sub, si) => {
                rows.push([`${gi + 1}.${si + 1}`, `  ${sub.particulars}`, fmt(sub.openingDr), fmt(sub.openingCr), fmt(sub.transactionDr), fmt(sub.transactionCr), fmt(sub.closingDr), fmt(sub.closingCr)]);
            });
        });
        rows.push(['', 'GRAND TOTALS', fmt(totals.openingDr), fmt(totals.openingCr), fmt(totals.transactionDr), fmt(totals.transactionCr), fmt(totals.closingDr), fmt(totals.closingCr)]);
        return rows;
    };

    const EXPORT_HEADERS = ['Sl.No', 'Particulars', 'Opening Dr', 'Opening Cr', 'Trans. Dr', 'Trans. Cr', 'Closing Dr', 'Closing Cr'];
    const dateRange = `${fromDate} to ${toDate}`;

    const handleExportPDF = () => exportPDF('Consolidated Trial Balance', dateRange, EXPORT_HEADERS, getFlatRows(), 'trial_balance');
    const handleExportExcel = () => exportExcel('Consolidated Trial Balance', dateRange, EXPORT_HEADERS, getFlatRows(), 'trial_balance');
    const handlePrint = () => window.print();

    // Calculate totals
    const totals = {
        openingDr: MOCK_DATA.reduce((acc, curr) => acc + curr.openingDr, 0),
        openingCr: MOCK_DATA.reduce((acc, curr) => acc + curr.openingCr, 0),
        transactionDr: MOCK_DATA.reduce((acc, curr) => acc + curr.transactionDr, 0),
        transactionCr: MOCK_DATA.reduce((acc, curr) => acc + curr.transactionCr, 0),
        closingDr: MOCK_DATA.reduce((acc, curr) => acc + curr.closingDr, 0),
        closingCr: MOCK_DATA.reduce((acc, curr) => acc + curr.closingCr, 0),
    };

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <div className="flex items-center gap-3">
                        <div className="pc-card-icon" style={{ marginBottom: 0 }}>
                            <LayoutDashboard size={20} />
                        </div>
                        <div>
                            <h1>Consolidated Trial Balance</h1>
                            <p>Real-time financial position across all branches (REAL MACTS Standard)</p>
                        </div>
                    </div>
                </div>
                <div className="pc-header-right flex gap-2">
                    <button onClick={handleExportPDF} className="pc-action-btn secondary">
                        <Download size={14} /> Export PDF
                    </button>
                    <button onClick={handleExportExcel} className="pc-action-btn secondary">
                        <FileSpreadsheet size={14} /> Export Excel
                    </button>
                    <button onClick={handlePrint} className="pc-action-btn secondary">
                        <Printer size={14} /> Print
                    </button>
                    <span className="pc-badge success">Consolidated</span>
                </div>
            </div>

            {/* Filters */}
            <div className="pc-card">
                <div className="pc-form p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="pc-field">
                            <label className="pc-label flex items-center gap-2">
                                <Calendar size={13} /> From Date
                            </label>
                            <input
                                type="date"
                                className="pc-input"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label flex items-center gap-2">
                                <Calendar size={13} /> To Date
                            </label>
                            <input
                                type="date"
                                className="pc-input"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label flex items-center gap-2">
                                <Building2 size={13} /> Branch
                            </label>
                            <select
                                className="pc-select"
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                            >
                                <option value="ALL">ALL BRANCHES (CONSOLIDATED)</option>
                                <option value="B001">MAIN BRANCH - KURNOOL</option>
                                <option value="B002">GUNTUR BRANCH</option>
                                <option value="B003">NELLORE BRANCH</option>
                            </select>
                        </div>
                        <div className="pc-field">
                            <label className="pc-label flex items-center gap-2">
                                <Search size={13} /> Search Ledger
                            </label>
                            <div className="relative">
                                <input
                                    className="pc-input pr-8"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="pc-action-btn primary px-8">
                            <Filter size={14} /> Generate Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Trial Balance Table */}
            <div className="pc-card overflow-hidden">
                <div className="pc-table-container">
                    <table className="pc-table">
                        <thead>
                            <tr>
                                <th rowSpan={2} style={{ width: '60px' }}>SL.No</th>
                                <th rowSpan={2} style={{ textAlign: 'left' }}>Particulars (Ledger Groups / Names)</th>
                                <th colSpan={2} className="text-center bg-slate-50/50">Opening Balance</th>
                                <th colSpan={2} className="text-center">Transactions</th>
                                <th colSpan={2} className="text-center bg-teal-50/30">Closing Balance</th>
                            </tr>
                            <tr>
                                <th className="text-right text-[10px] py-1 border-t border-slate-200">Debit</th>
                                <th className="text-right text-[10px] py-1 border-t border-slate-200">Credit</th>
                                <th className="text-right text-[10px] py-1 border-t border-slate-200">Debit</th>
                                <th className="text-right text-[10px] py-1 border-t border-slate-200">Credit</th>
                                <th className="text-right text-[10px] py-1 border-t border-slate-200">Debit</th>
                                <th className="text-right text-[10px] py-1 border-t border-slate-200">Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_DATA.map((row, index) => (
                                <div key={row.id} style={{ display: 'contents' }}>
                                    <tr className={`group-row ${expandedGroups[row.id] ? 'expanded' : ''}`} style={{ backgroundColor: '#f8fafc', fontWeight: 800 }}>
                                        <td className="text-center font-bold text-slate-500">{index + 1}</td>
                                        <td className="font-bold text-[#009BB0] flex items-center gap-2 cursor-pointer" onClick={() => toggleGroup(row.id)}>
                                            <ChevronDown size={14} className={`transition-transform duration-200 ${expandedGroups[row.id] ? '' : '-rotate-90'}`} />
                                            {row.particulars}
                                        </td>
                                        <td className="text-right font-bold">{row.openingDr > 0 ? formatCurrency(row.openingDr) : '-'}</td>
                                        <td className="text-right font-bold">{row.openingCr > 0 ? formatCurrency(row.openingCr) : '-'}</td>
                                        <td className="text-right font-bold text-blue-600">{row.transactionDr > 0 ? formatCurrency(row.transactionDr) : '-'}</td>
                                        <td className="text-right font-bold text-orange-600">{row.transactionCr > 0 ? formatCurrency(row.transactionCr) : '-'}</td>
                                        <td className="text-right font-bold bg-teal-50/20">{row.closingDr > 0 ? formatCurrency(row.closingDr) : '-'}</td>
                                        <td className="text-right font-bold bg-teal-50/20">{row.closingCr > 0 ? formatCurrency(row.closingCr) : '-'}</td>
                                    </tr>
                                    {expandedGroups[row.id] && row.subRows?.map((sub, sIdx) => (
                                        <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="text-center text-slate-400 text-[10px]">{index + 1}.{sIdx + 1}</td>
                                            <td className="pl-8 text-slate-600 font-medium">{sub.particulars}</td>
                                            <td className="text-right text-slate-500">{sub.openingDr > 0 ? formatCurrency(sub.openingDr) : '-'}</td>
                                            <td className="text-right text-slate-500">{sub.openingCr > 0 ? formatCurrency(sub.openingCr) : '-'}</td>
                                            <td className="text-right text-blue-500/80">{sub.transactionDr > 0 ? formatCurrency(sub.transactionDr) : '-'}</td>
                                            <td className="text-right text-orange-500/80">{sub.transactionCr > 0 ? formatCurrency(sub.transactionCr) : '-'}</td>
                                            <td className="text-right font-semibold bg-teal-50/10">{sub.closingDr > 0 ? formatCurrency(sub.closingDr) : '-'}</td>
                                            <td className="text-right font-semibold bg-teal-50/10">{sub.closingCr > 0 ? formatCurrency(sub.closingCr) : '-'}</td>
                                        </tr>
                                    ))}
                                </div>
                            ))}
                        </tbody>
                        <tfoot className="text-white font-bold" style={{ backgroundColor: '#009BB0' }}>
                            <tr>
                                <td colSpan={2} className="text-right font-extrabold uppercase tracking-wider h-10">Grand Totals</td>
                                <td className="text-right">{formatCurrency(totals.openingDr)}</td>
                                <td className="text-right">{formatCurrency(totals.openingCr)}</td>
                                <td className="text-right">{formatCurrency(totals.transactionDr)}</td>
                                <td className="text-right">{formatCurrency(totals.transactionCr)}</td>
                                <td className="text-right">{formatCurrency(totals.closingDr)}</td>
                                <td className="text-right">{formatCurrency(totals.closingCr)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Summary Modal or Info */}
            <div className="mt-6 flex flex-wrap gap-4">
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-[#009BB0]">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Trial Balance Status</p>
                        <h3 className="text-lg font-bold text-slate-800">Balanced</h3>
                        <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                            Difference: ₹0.00 (Out of Balance)
                        </p>
                    </div>
                </div>
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-blue-500">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Total Transactions</p>
                        <h3 className="text-lg font-bold text-slate-800">₹{formatCurrency(totals.transactionDr)}</h3>
                        <p className="text-xs text-slate-400 mt-1">For selected date range</p>
                    </div>
                </div>
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-teal-500">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Total Liability/Assets</p>
                        <h3 className="text-lg font-bold text-slate-800">₹{formatCurrency(totals.closingCr)}</h3>
                        <p className="text-xs text-slate-400 mt-1">Current Book Balance</p>
                    </div>
                </div>
            </div>

            <style>{`
                .group-row td {
                    border-bottom: 2px solid #e2e8f0 !important;
                }
                .group-row.expanded td {
                    border-bottom: 1px solid #009BB0/20 !important;
                }
                .pc-table tfoot td {
                    border-top: 2px solid white !important;
                }
            `}</style>
        </div>
    );
}

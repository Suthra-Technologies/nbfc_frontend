import { useState } from 'react';
import { Printer, Download, FileSpreadsheet, Filter, Building2, Calendar, LayoutDashboard, ChevronDown } from 'lucide-react';
import '../../producer-company/producer.css';
import { exportPDF, exportExcel } from './exportUtils';

interface BalanceSheetNode {
    id: string;
    particulars: string;
    amount: number;
    isGroup: boolean;
    subNodes?: BalanceSheetNode[];
}

const LIABILITIES_DATA: BalanceSheetNode[] = [
    {
        id: 'L1',
        particulars: 'Share Capital',
        amount: 2500000,
        isGroup: true,
        subNodes: [
            { id: 'L1.1', particulars: 'Authorized Capital', amount: 5000000, isGroup: false },
            { id: 'L1.2', particulars: 'Subscribed & Paid-up Capital', amount: 2500000, isGroup: false },
        ]
    },
    {
        id: 'L2',
        particulars: 'Reserves & Surplus',
        amount: 850000,
        isGroup: true,
        subNodes: [
            { id: 'L2.1', particulars: 'Statutory Reserve', amount: 350000, isGroup: false },
            { id: 'L2.2', particulars: 'General Reserve', amount: 300000, isGroup: false },
            { id: 'L2.3', particulars: 'Profit & Loss A/c', amount: 200000, isGroup: false },
        ]
    },
    {
        id: 'L3',
        particulars: 'Deposits',
        amount: 15500000,
        isGroup: true,
        subNodes: [
            { id: 'L3.1', particulars: 'Fixed Deposits', amount: 8500000, isGroup: false },
            { id: 'L3.2', particulars: 'Recurring Deposits', amount: 4500000, isGroup: false },
            { id: 'L3.3', particulars: 'Savings Deposits', amount: 2500000, isGroup: false },
        ]
    },
    {
        id: 'L4',
        particulars: 'Current Liabilities & Provisions',
        amount: 350000,
        isGroup: true,
        subNodes: [
            { id: 'L4.1', particulars: 'Interest Payable', amount: 150000, isGroup: false },
            { id: 'L4.2', particulars: 'Salary Payable', amount: 100000, isGroup: false },
            { id: 'L4.3', particulars: 'Other Payables', amount: 100000, isGroup: false },
        ]
    }
];

const ASSETS_DATA: BalanceSheetNode[] = [
    {
        id: 'A1',
        particulars: 'Cash & Bank Balances',
        amount: 3200000,
        isGroup: true,
        subNodes: [
            { id: 'A1.1', particulars: 'Cash in Hand', amount: 800000, isGroup: false },
            { id: 'A1.2', particulars: 'Balances with Banks', amount: 2400000, isGroup: false },
        ]
    },
    {
        id: 'A2',
        particulars: 'Investments',
        amount: 4500000,
        isGroup: true,
        subNodes: [
            { id: 'A2.1', particulars: 'Government Securities', amount: 2500000, isGroup: false },
            { id: 'A2.2', particulars: 'Other Approved Securities', amount: 2000000, isGroup: false },
        ]
    },
    {
        id: 'A3',
        particulars: 'Loans & Advances',
        amount: 10500000,
        isGroup: true,
        subNodes: [
            { id: 'A3.1', particulars: 'Gold Loans', amount: 6500000, isGroup: false },
            { id: 'A3.2', particulars: 'Personal Loans', amount: 2500000, isGroup: false },
            { id: 'A3.3', particulars: 'Mortgage Loans', amount: 1500000, isGroup: false },
        ]
    },
    {
        id: 'A4',
        particulars: 'Fixed Assets',
        amount: 1000000,
        isGroup: true,
        subNodes: [
            { id: 'A4.1', particulars: 'Computers & Equipments', amount: 400000, isGroup: false },
            { id: 'A4.2', particulars: 'Furniture & Fixtures', amount: 500000, isGroup: false },
            { id: 'A4.3', particulars: 'Software', amount: 100000, isGroup: false },
        ]
    }
];

export default function BalanceSheet() {
    const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedBranch, setSelectedBranch] = useState('ALL');
    const [expandedLiabilities, setExpandedLiabilities] = useState<Record<string, boolean>>({ 'L1': true, 'L3': true });
    const [expandedAssets, setExpandedAssets] = useState<Record<string, boolean>>({ 'A1': true, 'A3': true });

    const toggleLiability = (id: string) => {
        setExpandedLiabilities(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleAsset = (id: string) => {
        setExpandedAssets(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const formatCurrency = (num: number) => {
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const totalLiabilities = LIABILITIES_DATA.reduce((acc, curr) => acc + curr.amount, 0);
    const totalAssets = ASSETS_DATA.reduce((acc, curr) => acc + curr.amount, 0);

    const fmt = (n: number) => n > 0 ? formatCurrency(n) : '-';

    const flattenSection = (nodes: typeof LIABILITIES_DATA): (string | number)[][] =>
        nodes.flatMap(node => [
            [node.particulars, fmt(node.amount)],
            ...(node.subNodes?.map(sub => [`  ${sub.particulars}`, fmt(sub.amount)]) ?? [])
        ]);

    const getExportRows = (): (string | number)[][] => [
        ['--- CAPITAL AND LIABILITIES ---', ''],
        ...flattenSection(LIABILITIES_DATA),
        ['TOTAL LIABILITIES', fmt(totalLiabilities)],
        ['', ''],
        ['--- PROPERTY AND ASSETS ---', ''],
        ...flattenSection(ASSETS_DATA),
        ['TOTAL ASSETS', fmt(totalAssets)],
    ];

    const EXPORT_HEADERS = ['Particulars', 'Amount (INR)'];
    const dateRange = `As on ${asOnDate} | Branch: ${selectedBranch}`;

    const handleExportPDF = () => exportPDF('Consolidated Balance Sheet', dateRange, EXPORT_HEADERS, getExportRows(), 'balance_sheet');
    const handleExportExcel = () => exportExcel('Consolidated Balance Sheet', dateRange, EXPORT_HEADERS, getExportRows(), 'balance_sheet');
    const handlePrint = () => window.print();

    return (
        <div className="pc-container">
            <div className="pc-header">
                <div className="pc-header-left">
                    <div className="flex items-center gap-3">
                        <div className="pc-card-icon" style={{ marginBottom: 0 }}>
                            <LayoutDashboard size={20} />
                        </div>
                        <div>
                            <h1>Consolidated Balance Sheet</h1>
                            <p>Statement of Assets and Liabilities (MACTS Standard)</p>
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
                                <Calendar size={13} /> As On Date
                            </label>
                            <input 
                                type="date" 
                                className="pc-input" 
                                value={asOnDate} 
                                onChange={(e) => setAsOnDate(e.target.value)} 
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
                        <div className="col-span-2 flex items-end justify-end">
                            <button className="pc-action-btn primary px-8">
                                <Filter size={14} /> Generate Balance Sheet
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Balance Sheet Tables container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                
                {/* Liabilities Table */}
                <div className="pc-card overflow-hidden flex flex-col">
                    <div className="bg-[#009BB0] text-white p-3 font-bold text-center tracking-wider text-sm">
                        CAPITAL AND LIABILITIES
                    </div>
                    <div className="pc-table-container flex-1">
                        <table className="pc-table w-full">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', width: '70%' }}>Particulars</th>
                                    <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LIABILITIES_DATA.map((node) => (
                                    <div key={node.id} style={{ display: 'contents' }}>
                                        <tr className={`group-row ${expandedLiabilities[node.id] ? 'expanded' : ''}`} style={{ backgroundColor: '#f8fafc' }}>
                                            <td className="font-bold text-[#009BB0] flex items-center gap-2 cursor-pointer py-3" onClick={() => toggleLiability(node.id)}>
                                                <ChevronDown size={14} className={`transition-transform duration-200 ${expandedLiabilities[node.id] ? '' : '-rotate-90'}`} />
                                                {node.particulars}
                                            </td>
                                            <td className="text-right font-bold text-slate-700">{formatCurrency(node.amount)}</td>
                                        </tr>
                                        {expandedLiabilities[node.id] && node.subNodes?.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="pl-8 text-slate-600 font-medium py-2">{sub.particulars}</td>
                                                <td className="text-right text-slate-600">{formatCurrency(sub.amount)}</td>
                                            </tr>
                                        ))}
                                    </div>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-slate-100 p-3 border-t-2 border-[#009BB0] flex justify-between items-center">
                        <span className="font-extrabold text-[#009BB0] uppercase">Total Liabilities</span>
                        <span className="font-extrabold text-lg text-slate-800">₹ {formatCurrency(totalLiabilities)}</span>
                    </div>
                </div>

                {/* Assets Table */}
                <div className="pc-card overflow-hidden flex flex-col">
                    <div className="bg-[#009BB0] text-white p-3 font-bold text-center tracking-wider text-sm">
                        PROPERTY AND ASSETS
                    </div>
                    <div className="pc-table-container flex-1">
                        <table className="pc-table w-full">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', width: '70%' }}>Particulars</th>
                                    <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ASSETS_DATA.map((node) => (
                                    <div key={node.id} style={{ display: 'contents' }}>
                                        <tr className={`group-row ${expandedAssets[node.id] ? 'expanded' : ''}`} style={{ backgroundColor: '#f8fafc' }}>
                                            <td className="font-bold text-[#009BB0] flex items-center gap-2 cursor-pointer py-3" onClick={() => toggleAsset(node.id)}>
                                                <ChevronDown size={14} className={`transition-transform duration-200 ${expandedAssets[node.id] ? '' : '-rotate-90'}`} />
                                                {node.particulars}
                                            </td>
                                            <td className="text-right font-bold text-slate-700">{formatCurrency(node.amount)}</td>
                                        </tr>
                                        {expandedAssets[node.id] && node.subNodes?.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="pl-8 text-slate-600 font-medium py-2">{sub.particulars}</td>
                                                <td className="text-right text-slate-600">{formatCurrency(sub.amount)}</td>
                                            </tr>
                                        ))}
                                    </div>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-slate-100 p-3 border-t-2 border-[#009BB0] flex justify-between items-center">
                        <span className="font-extrabold text-[#009BB0] uppercase">Total Assets</span>
                        <span className="font-extrabold text-lg text-slate-800">₹ {formatCurrency(totalAssets)}</span>
                    </div>
                </div>

            </div>

            {/* Summary Statistics */}
            <div className="mt-6 flex flex-wrap gap-4">
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-[#009BB0]">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Balance Sheet Status</p>
                        {totalLiabilities === totalAssets ? (
                            <>
                                <h3 className="text-lg font-bold text-green-600">Matched</h3>
                                <p className="text-xs text-slate-500 mt-1">Difference: ₹0.00</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-red-500">Unmatched</h3>
                                <p className="text-xs text-red-500 mt-1">Difference: ₹{formatCurrency(Math.abs(totalLiabilities - totalAssets))}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-orange-500">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Working Capital</p>
                        <h3 className="text-lg font-bold text-slate-800">₹{formatCurrency(3200000 - 350000)}</h3>
                        <p className="text-xs text-slate-400 mt-1">Current Assets - Current Liabilities</p>
                    </div>
                </div>
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-blue-500">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Net Worth</p>
                        <h3 className="text-lg font-bold text-slate-800">₹{formatCurrency(2500000 + 850000)}</h3>
                        <p className="text-xs text-slate-400 mt-1">Share Capital + Reserves</p>
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
                .pc-table tbody tr:last-child td {
                    border-bottom: none !important;
                }
            `}</style>
        </div>
    );
}

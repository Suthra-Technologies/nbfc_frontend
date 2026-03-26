import { useState } from 'react';
import { Download, FileSpreadsheet, Printer, Filter, Building2, Calendar, LayoutDashboard, ChevronDown } from 'lucide-react';
import '../../producer-company/producer.css';
import { exportPDF, exportExcel } from './exportUtils';

interface PLNode {
    id: string;
    particulars: string;
    amount: number;
    isGroup: boolean;
    subNodes?: PLNode[];
}

const EXPENDITURE_DATA: PLNode[] = [
    {
        id: 'E1',
        particulars: 'Interest Expended',
        amount: 3500000,
        isGroup: true,
        subNodes: [
            { id: 'E1.1', particulars: 'Interest on Deposits', amount: 2500000, isGroup: false },
            { id: 'E1.2', particulars: 'Interest on Borrowings', amount: 1000000, isGroup: false },
        ]
    },
    {
        id: 'E2',
        particulars: 'Operating Expenses',
        amount: 1200000,
        isGroup: true,
        subNodes: [
            { id: 'E2.1', particulars: 'Payments to and provisions for employees', amount: 800000, isGroup: false },
            { id: 'E2.2', particulars: 'Rent, taxes and lighting', amount: 200000, isGroup: false },
            { id: 'E2.3', particulars: 'Printing and stationery', amount: 100000, isGroup: false },
            { id: 'E2.4', particulars: 'Depreciation on property', amount: 100000, isGroup: false },
        ]
    },
    {
        id: 'E3',
        particulars: 'Provisions and Contingencies',
        amount: 300000,
        isGroup: true,
        subNodes: [
            { id: 'E3.1', particulars: 'Provision for NPA', amount: 200000, isGroup: false },
            { id: 'E3.2', particulars: 'Other Provisions', amount: 100000, isGroup: false },
        ]
    }
];

const INCOME_DATA: PLNode[] = [
    {
        id: 'I1',
        particulars: 'Interest Earned',
        amount: 5500000,
        isGroup: true,
        subNodes: [
            { id: 'I1.1', particulars: 'Interest/discount on advances/bills', amount: 4500000, isGroup: false },
            { id: 'I1.2', particulars: 'Income on investments', amount: 1000000, isGroup: false },
        ]
    },
    {
        id: 'I2',
        particulars: 'Other Income',
        amount: 450000,
        isGroup: true,
        subNodes: [
            { id: 'I2.1', particulars: 'Commission, exchange and brokerage', amount: 250000, isGroup: false },
            { id: 'I2.2', particulars: 'Profit on sale of investments', amount: 100000, isGroup: false },
            { id: 'I2.3', particulars: 'Miscellaneous income', amount: 100000, isGroup: false },
        ]
    }
];

export default function ProfitLoss() {
    // Standard Filter States
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    
    // Expand States
    const [expandedExp, setExpandedExp] = useState<Record<string, boolean>>({ 'E1': true, 'E2': true });
    const [expandedInc, setExpandedInc] = useState<Record<string, boolean>>({ 'I1': true, 'I2': true });

    const toggleExp = (id: string) => setExpandedExp(prev => ({ ...prev, [id]: !prev[id] }));
    const toggleInc = (id: string) => setExpandedInc(prev => ({ ...prev, [id]: !prev[id] }));

    const formatCurrency = (num: number) => {
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const totalExpenditure = EXPENDITURE_DATA.reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncome = INCOME_DATA.reduce((acc, curr) => acc + curr.amount, 0);
    const netProfit = totalIncome - totalExpenditure;

    const fmt = (n: number) => formatCurrency(n);

    const getExportRows = (): (string | number)[][] => {
        const rows: (string | number)[][] = [];
        rows.push(['--- EXPENDITURE ---', '', '--- INCOME ---', '']);
        const maxLen = Math.max(EXPENDITURE_DATA.length, INCOME_DATA.length);
        for (let i = 0; i < maxLen; i++) {
            const exp = EXPENDITURE_DATA[i];
            const inc = INCOME_DATA[i];
            rows.push([exp?.particulars ?? '', exp ? fmt(exp.amount) : '', inc?.particulars ?? '', inc ? fmt(inc.amount) : '']);
            const expSubs = exp?.subNodes ?? [];
            const incSubs = inc?.subNodes ?? [];
            const subLen = Math.max(expSubs.length, incSubs.length);
            for (let j = 0; j < subLen; j++) {
                rows.push([`  ${expSubs[j]?.particulars ?? ''}`, expSubs[j] ? fmt(expSubs[j].amount) : '', `  ${incSubs[j]?.particulars ?? ''}`, incSubs[j] ? fmt(incSubs[j].amount) : '']);
            }
        }
        rows.push(['TOTAL EXPENDITURE', fmt(totalExpenditure), 'TOTAL INCOME', fmt(totalIncome)]);
        rows.push([netProfit > 0 ? 'NET PROFIT' : 'NET LOSS', fmt(Math.abs(netProfit)), '', '']);
        return rows;
    };

    const EXPORT_HEADERS = ['Expenditure', 'Amount (INR)', 'Income', 'Amount (INR)'];
    const dateRange = `${fromDate} to ${toDate}`;
    const handleExportPDF = () => exportPDF('Profit & Loss Statement', dateRange, EXPORT_HEADERS, getExportRows(), 'profit_loss');
    const handleExportExcel = () => exportExcel('Profit & Loss Statement', dateRange, EXPORT_HEADERS, getExportRows(), 'profit_loss');
    const handlePrint = () => window.print();

    return (
        <div className="pc-container flex flex-col pt-2">
            
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
                            >
                                <option value="ALL">ALL BRANCHES (CONSOLIDATED)</option>
                                <option value="B001">MAIN BRANCH - KURNOOL</option>
                                <option value="B002">GUNTUR BRANCH</option>
                                <option value="B003">NELLORE BRANCH</option>
                            </select>
                        </div>
                        <div className="col-span-1 flex items-end justify-end">
                            <button className="pc-action-btn primary px-8">
                                <Filter size={14} /> Generate Statement
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pc-header">
                <div className="pc-header-left">
                    <div className="flex items-center gap-3">
                        <div className="pc-card-icon" style={{ marginBottom: 0 }}>
                            <LayoutDashboard size={20} />
                        </div>
                        <div>
                            <h1>Profit & Loss Statement</h1>
                            <p>Income and Expenditure Account for the period</p>
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

            {/* P&L Tables container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                
                {/* Expenditure Table */}
                <div className="pc-card overflow-hidden flex flex-col">
                    <div className="bg-[#009BB0] text-white p-3 font-bold text-center tracking-wider text-sm">
                        EXPENDITURE
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
                                {EXPENDITURE_DATA.map((node) => (
                                    <div key={node.id} style={{ display: 'contents' }}>
                                        <tr className={`group-row ${expandedExp[node.id] ? 'expanded' : ''}`} style={{ backgroundColor: '#f8fafc' }}>
                                            <td className="font-bold text-[#009BB0] flex items-center gap-2 cursor-pointer py-3" onClick={() => toggleExp(node.id)}>
                                                <ChevronDown size={14} className={`transition-transform duration-200 ${expandedExp[node.id] ? '' : '-rotate-90'}`} />
                                                {node.particulars}
                                            </td>
                                            <td className="text-right font-bold text-slate-700">{formatCurrency(node.amount)}</td>
                                        </tr>
                                        {expandedExp[node.id] && node.subNodes?.map((sub) => (
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
                        <span className="font-extrabold text-[#009BB0] uppercase">Total Expenditure</span>
                        <span className="font-extrabold text-lg text-slate-800">₹ {formatCurrency(totalExpenditure)}</span>
                    </div>
                    {netProfit > 0 && (
                        <div className="bg-green-50 p-3 flex justify-between items-center border-t border-green-200">
                            <span className="font-extrabold text-green-700 uppercase">Net Profit</span>
                            <span className="font-extrabold text-lg text-green-700">₹ {formatCurrency(netProfit)}</span>
                        </div>
                    )}
                </div>

                {/* Income Table */}
                <div className="pc-card overflow-hidden flex flex-col">
                    <div className="bg-[#009BB0] text-white p-3 font-bold text-center tracking-wider text-sm">
                        INCOME
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
                                {INCOME_DATA.map((node) => (
                                    <div key={node.id} style={{ display: 'contents' }}>
                                        <tr className={`group-row ${expandedInc[node.id] ? 'expanded' : ''}`} style={{ backgroundColor: '#f8fafc' }}>
                                            <td className="font-bold text-[#009BB0] flex items-center gap-2 cursor-pointer py-3" onClick={() => toggleInc(node.id)}>
                                                <ChevronDown size={14} className={`transition-transform duration-200 ${expandedInc[node.id] ? '' : '-rotate-90'}`} />
                                                {node.particulars}
                                            </td>
                                            <td className="text-right font-bold text-slate-700">{formatCurrency(node.amount)}</td>
                                        </tr>
                                        {expandedInc[node.id] && node.subNodes?.map((sub) => (
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
                        <span className="font-extrabold text-[#009BB0] uppercase">Total Income</span>
                        <span className="font-extrabold text-lg text-slate-800">₹ {formatCurrency(totalIncome)}</span>
                    </div>
                    {netProfit < 0 && (
                        <div className="bg-red-50 p-3 flex justify-between items-center border-t border-red-200">
                            <span className="font-extrabold text-red-700 uppercase">Net Loss</span>
                            <span className="font-extrabold text-lg text-red-700">₹ {formatCurrency(Math.abs(netProfit))}</span>
                        </div>
                    )}
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

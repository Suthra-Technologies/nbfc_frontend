import { useState } from 'react';
import { Printer, Download, Filter, Building2, Calendar, LayoutDashboard, ChevronDown } from 'lucide-react';
import '../../producer-company/producer.css';

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
    const [asOnDateChecked, setAsOnDateChecked] = useState(false);
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [grouping, setGrouping] = useState(true);
    const [exportType, setExportType] = useState('PDF');
    
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

    return (
        <div className="pc-container flex flex-col pt-2">
            
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
                
                <div className="flex items-center gap-1.5 ml-8">
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

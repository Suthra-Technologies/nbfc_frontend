import { useState } from 'react';
import { Printer, Download, FileSpreadsheet, Filter, Search, Building2, Calendar, LayoutDashboard, ChevronDown } from 'lucide-react';
import '../../producer-company/producer.css';
import { exportPDF, exportExcel } from './exportUtils';

interface ScheduleRow {
    id: string;
    particulars: string;
    scheduleNo?: string;
    isGroup: boolean;
    openingBalance: number;
    transactionDr: number;
    transactionCr: number;
    closingBalance: number;
    subRows?: ScheduleRow[];
}

// MACTS standard schedules mock data
const MOCK_DATA: ScheduleRow[] = [
    {
        id: '1',
        particulars: 'LIABILITIES',
        isGroup: true,
        openingBalance: 5000000,
        transactionDr: 200000,
        transactionCr: 800000,
        closingBalance: 5600000,
        subRows: [
            {
                id: '1.1', particulars: 'Share Capital', scheduleNo: '1', isGroup: true, openingBalance: 1000000, transactionDr: 0, transactionCr: 100000, closingBalance: 1100000, subRows: [
                    { id: '1.1.1', particulars: 'Members Share Capital', isGroup: false, openingBalance: 800000, transactionDr: 0, transactionCr: 80000, closingBalance: 880000 },
                    { id: '1.1.2', particulars: 'Associate Members Share Capital', isGroup: false, openingBalance: 200000, transactionDr: 0, transactionCr: 20000, closingBalance: 220000 },
                ]
            },
            {
                id: '1.2', particulars: 'Reserves and Surplus', scheduleNo: '2', isGroup: true, openingBalance: 500000, transactionDr: 50000, transactionCr: 100000, closingBalance: 550000, subRows: [
                    { id: '1.2.1', particulars: 'Statutory Reserve', isGroup: false, openingBalance: 300000, transactionDr: 0, transactionCr: 50000, closingBalance: 350000 },
                    { id: '1.2.2', particulars: 'General Reserve', isGroup: false, openingBalance: 200000, transactionDr: 50000, transactionCr: 50000, closingBalance: 200000 },
                ]
            },
            {
                id: '1.3', particulars: 'Deposits', scheduleNo: '3', isGroup: true, openingBalance: 3500000, transactionDr: 150000, transactionCr: 600000, closingBalance: 3950000, subRows: [
                    { id: '1.3.1', particulars: 'Fixed Deposits', isGroup: false, openingBalance: 2000000, transactionDr: 100000, transactionCr: 400000, closingBalance: 2300000 },
                    { id: '1.3.2', particulars: 'Recurring Deposits', isGroup: false, openingBalance: 1000000, transactionDr: 50000, transactionCr: 150000, closingBalance: 1100000 },
                    { id: '1.3.3', particulars: 'Savings Deposits', isGroup: false, openingBalance: 500000, transactionDr: 0, transactionCr: 50000, closingBalance: 550000 },
                ]
            }
        ]
    },
    {
        id: '2',
        particulars: 'ASSETS',
        isGroup: true,
        openingBalance: 4500000,
        transactionDr: 1200000,
        transactionCr: 500000,
        closingBalance: 5200000,
        subRows: [
            {
                id: '2.1', particulars: 'Cash and Bank Balances', scheduleNo: '4', isGroup: true, openingBalance: 1000000, transactionDr: 300000, transactionCr: 100000, closingBalance: 1200000, subRows: [
                    { id: '2.1.1', particulars: 'Cash in Hand', isGroup: false, openingBalance: 500000, transactionDr: 200000, transactionCr: 50000, closingBalance: 650000 },
                    { id: '2.1.2', particulars: 'Balances with Banks', isGroup: false, openingBalance: 500000, transactionDr: 100000, transactionCr: 50000, closingBalance: 550000 },
                ]
            },
            {
                id: '2.2', particulars: 'Loans and Advances', scheduleNo: '5', isGroup: true, openingBalance: 3500000, transactionDr: 900000, transactionCr: 400000, closingBalance: 4000000, subRows: [
                    { id: '2.2.1', particulars: 'Gold Loans', isGroup: false, openingBalance: 2000000, transactionDr: 500000, transactionCr: 200000, closingBalance: 2300000 },
                    { id: '2.2.2', particulars: 'Personal Loans', isGroup: false, openingBalance: 1500000, transactionDr: 400000, transactionCr: 200000, closingBalance: 1700000 },
                ]
            }
        ]
    }
];

export default function ScheduleTB() {
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('ALL');

    // By default expand top-level groups and schedules
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        '1': true, '1.1': true, '1.2': true, '1.3': true,
        '2': true, '2.1': true, '2.2': true
    });

    const toggleGroup = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setExpandedGroups((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
    };

    const formatCurrency = (num: number) => {
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Calculate totals
    const totals = {
        openingBalanceCr: MOCK_DATA[0].openingBalance, // Liabilities
        openingBalanceDr: MOCK_DATA[1].openingBalance, // Assets
        transactionDr: MOCK_DATA.reduce((acc, curr) => acc + curr.transactionDr, 0),
        transactionCr: MOCK_DATA.reduce((acc, curr) => acc + curr.transactionCr, 0),
        closingBalanceCr: MOCK_DATA[0].closingBalance, // Liabilities closing
        closingBalanceDr: MOCK_DATA[1].closingBalance, // Assets closing
    };

    const fmt = (n: number) => n > 0 ? formatCurrency(n) : '-';

    const flattenRows = (rows: ScheduleRow[], prefix = ''): (string | number)[][] => {
        const result: (string | number)[][] = [];
        rows.forEach((row, i) => {
            const label = prefix ? `  ${'  '.repeat(prefix.split('.').length - 1)}${row.particulars}` : row.particulars;
            result.push([row.scheduleNo || '', label, fmt(row.openingBalance), fmt(row.transactionDr), fmt(row.transactionCr), fmt(row.closingBalance)]);
            if (row.subRows) result.push(...flattenRows(row.subRows, `${prefix || (i + 1)}`));
        });
        return result;
    };

    const EXPORT_HEADERS = ['Sch.No', 'Particulars', 'Opening Balance', 'Trans. Dr', 'Trans. Cr', 'Closing Balance'];
    const dateRange = `${fromDate} to ${toDate}`;
    const exportRows = () => [
        ...flattenRows(MOCK_DATA),
        ['', 'GRAND TOTAL (LIABILITIES-CR)', fmt(totals.openingBalanceCr), '', fmt(totals.transactionCr), fmt(totals.closingBalanceCr)],
        ['', 'GRAND TOTAL (ASSETS-DR)', fmt(totals.openingBalanceDr), fmt(totals.transactionDr), '', fmt(totals.closingBalanceDr)],
    ];

    const handleExportPDF = () => exportPDF('Schedule Trial Balance', dateRange, EXPORT_HEADERS, exportRows(), 'schedule_tb');
    const handleExportExcel = () => exportExcel('Schedule Trial Balance', dateRange, EXPORT_HEADERS, exportRows(), 'schedule_tb');
    const handlePrint = () => window.print();

    const renderRows = (rows: ScheduleRow[], level = 0) => {
        return rows.map((row, index) => {
            const isTopLevel = level === 0;
            const isSchedule = level === 1;
            const isDetail = level > 1;

            return (
                <div key={row.id} style={{ display: 'contents' }}>
                    <tr className={`group-row ${expandedGroups[row.id] ? 'expanded' : ''}`}
                        style={{
                            backgroundColor: isTopLevel ? '#f8fafc' : isSchedule ? '#ffffff' : 'transparent',
                            fontWeight: isTopLevel ? 800 : isSchedule ? 700 : 500,
                            color: isTopLevel ? '#009BB0' : isSchedule ? '#334155' : '#475569',
                            transition: 'all 0.2s'
                        }}
                    >
                        <td className={`text-center ${isTopLevel ? 'font-bold text-slate-500' : 'text-slate-400 text-[10px]'}`}>
                            {isTopLevel ? index + 1 : ''}
                        </td>
                        <td className="text-center font-bold text-slate-500">
                            {row.scheduleNo || '-'}
                        </td>
                        <td
                            className="flex items-center gap-2 cursor-pointer"
                            style={{
                                paddingLeft: isSchedule ? '2rem' : isDetail ? '3.5rem' : '1rem',
                                color: isTopLevel ? '#009BB0' : 'inherit'
                            }}
                            onClick={(e) => row.isGroup ? toggleGroup(row.id, e) : undefined}
                        >
                            {row.isGroup && (
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${expandedGroups[row.id] ? '' : '-rotate-90'}`}
                                />
                            )}
                            {!row.isGroup && <span className="w-[14px]"></span>}
                            {row.particulars}
                        </td>
                        <td className="text-right font-medium">
                            {row.openingBalance > 0 ? formatCurrency(row.openingBalance) : '-'}
                        </td>
                        <td className="text-right font-medium text-blue-600/90">
                            {row.transactionDr > 0 ? formatCurrency(row.transactionDr) : '-'}
                        </td>
                        <td className="text-right font-medium text-orange-600/90">
                            {row.transactionCr > 0 ? formatCurrency(row.transactionCr) : '-'}
                        </td>
                        <td className={`text-right font-semibold ${isTopLevel ? 'bg-teal-50/30' : 'bg-teal-50/10'}`}>
                            {row.closingBalance > 0 ? formatCurrency(row.closingBalance) : '-'}
                        </td>
                    </tr>
                    {row.isGroup && expandedGroups[row.id] && row.subRows && (
                        renderRows(row.subRows, level + 1)
                    )}
                </div>
            );
        });
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
                            <h1>Schedule Trial Balance</h1>
                            <p>Detailed consolidated schedule breakdown (REAL MACTS Standard)</p>
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
                                <Search size={13} /> Search Schedule
                            </label>
                            <div className="relative">
                                <input
                                    className="pc-input pr-8"
                                    placeholder="Search by name or number..."
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

            {/* Schedule TB Table */}
            <div className="pc-card overflow-hidden">
                <div className="pc-table-container">
                    <table className="pc-table">
                        <thead>
                            <tr>
                                <th rowSpan={2} style={{ width: '60px' }}>SL.No</th>
                                <th rowSpan={2} style={{ width: '80px', textAlign: 'center' }}>Sch.No</th>
                                <th rowSpan={2} style={{ textAlign: 'left' }}>Particulars (Groups / Schedules / Ledgers)</th>
                                <th rowSpan={2} className="text-right bg-slate-50/50">Opening Balance</th>
                                <th colSpan={2} className="text-center border-l border-slate-200">Transactions</th>
                                <th rowSpan={2} className="text-right bg-teal-50/30">Closing Balance</th>
                            </tr>
                            <tr>
                                <th className="text-right text-[10px] py-1 border-t border-l border-slate-200">Debit</th>
                                <th className="text-right text-[10px] py-1 border-t border-slate-200">Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows(MOCK_DATA)}
                        </tbody>
                        <tfoot className="text-white font-bold" style={{ backgroundColor: '#009BB0' }}>
                            <tr>
                                <td colSpan={3} className="text-right font-extrabold uppercase tracking-wider h-10">Total Liabilities</td>
                                <td className="text-right">{formatCurrency(totals.openingBalanceCr)}</td>
                                <td className="text-right">{formatCurrency(MOCK_DATA[0].transactionDr)}</td>
                                <td className="text-right">{formatCurrency(MOCK_DATA[0].transactionCr)}</td>
                                <td className="text-right">{formatCurrency(totals.closingBalanceCr)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="text-right font-extrabold uppercase tracking-wider h-10 border-t border-white/20">Total Assets</td>
                                <td className="text-right border-t border-white/20">{formatCurrency(totals.openingBalanceDr)}</td>
                                <td className="text-right border-t border-white/20">{formatCurrency(MOCK_DATA[1].transactionDr)}</td>
                                <td className="text-right border-t border-white/20">{formatCurrency(MOCK_DATA[1].transactionCr)}</td>
                                <td className="text-right border-t border-white/20">{formatCurrency(totals.closingBalanceDr)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Summary Information */}
            <div className="mt-6 flex flex-wrap gap-4">
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-[#009BB0]">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Schedule TB Status</p>
                        <h3 className="text-lg font-bold text-slate-800">Balanced</h3>
                        <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                            Assets = Liabilities
                        </p>
                    </div>
                </div>
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-blue-500">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Total Deposit Obligations</p>
                        {/* Assuming 1.3 is Deposits and its closing balance is the value we want here */}
                        <h3 className="text-lg font-bold text-slate-800">₹{formatCurrency(3950000)}</h3>
                        <p className="text-xs text-slate-400 mt-1">As per Schedule 3</p>
                    </div>
                </div>
                <div className="pc-card flex-1 min-w-[250px] border-l-4 border-l-teal-500">
                    <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Total Loan Assets</p>
                        {/* Assuming 2.2 is Loans & Advances */}
                        <h3 className="text-lg font-bold text-slate-800">₹{formatCurrency(4000000)}</h3>
                        <p className="text-xs text-slate-400 mt-1">As per Schedule 5</p>
                    </div>
                </div>
            </div>

            <style>{`
                .group-row td {
                    border-bottom: 1px solid #e2e8f0 !important;
                }
                .group-row.expanded td {
                    border-bottom: 1px solid #009BB0/10 !important;
                }
                .pc-table tbody tr:hover td {
                    background-color: #f8fafc;
                }
            `}</style>
        </div>
    );
}

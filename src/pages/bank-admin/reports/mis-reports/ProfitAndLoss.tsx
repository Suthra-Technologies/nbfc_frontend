import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Printer, Filter } from 'lucide-react';

export default function ProfitAndLoss() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const expenses = [
        { id: 1, particular: 'Interest Expended', amount: 350000 },
        { id: 2, particular: 'Operating Expenses', amount: 150000 },
        { id: 3, particular: 'Provisions & Contingencies', amount: 50000 },
        { id: 4, particular: 'Rent, Taxes & Lighting', amount: 75000 },
        { id: 5, particular: 'Depreciation on Property', amount: 25000 },
    ];

    const income = [
        { id: 1, particular: 'Interest Earned', amount: 800000 },
        { id: 2, particular: 'Other Income', amount: 120000 },
        { id: 3, particular: 'Commission & Exchange', amount: 30000 },
        { id: 4, particular: 'Profit on Sale of Investments', amount: 0 },
        { id: 5, particular: 'Miscellaneous Income', amount: 15000 },
    ];

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

    const netProfit = totalIncome - totalExpenses;

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Profit & Loss Statement</h1>
                    <p className="text-slate-500 text-sm mt-1">View the company's financial performance over a specific accounting period.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Printer size={16} /> Print
                    </Button>
                    <Button variant="outline" className="gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200">
                        <Download size={16} /> Export
                    </Button>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">From Date</label>
                                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">To Date</label>
                                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full sm:w-auto mt-6">
                            <Button className="w-full sm:w-auto gap-2 bg-[#009BB0] hover:bg-[#007D8E] text-white">
                                <Filter size={16} /> Generate Report
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex flex-col xl:flex-row">
                        {/* Expenses Side */}
                        <div className="flex-1 border-b xl:border-b-0 xl:border-r border-slate-200">
                            <div className="bg-rose-50/50 p-3 border-b text-center border-slate-200">
                                <h2 className="font-semibold text-rose-800">Expenditure</h2>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="font-medium text-slate-600 border-r">Particulars</TableHead>
                                        <TableHead className="text-right font-medium text-slate-600 w-[150px]">Amount (₹)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {expenses.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell className="font-medium text-slate-900 border-r">{item.particular}</TableCell>
                                            <TableCell className="text-right text-slate-700 font-medium">
                                                {item.amount === 0 ? '-' : item.amount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-t-2 border-slate-200 bg-slate-50/80">
                                        <TableCell className="text-right font-bold text-slate-900 border-r">Total Expenses</TableCell>
                                        <TableCell className="text-right font-bold text-rose-600">{totalExpenses.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-transparent">
                                        <TableCell className="text-right font-bold text-slate-900 border-r py-6">Net Profit</TableCell>
                                        <TableCell className="text-right font-bold text-emerald-600 text-lg py-6">{netProfit.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-t border-slate-300 bg-slate-100/50">
                                        <TableCell className="text-right font-bold text-slate-900 border-r">Grand Total</TableCell>
                                        <TableCell className="text-right font-bold text-slate-900">{(totalExpenses + netProfit).toLocaleString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        {/* Income Side */}
                        <div className="flex-1">
                            <div className="bg-emerald-50/50 p-3 border-b text-center border-slate-200">
                                <h2 className="font-semibold text-emerald-800">Income</h2>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="font-medium text-slate-600 border-r">Particulars</TableHead>
                                        <TableHead className="text-right font-medium text-slate-600 w-[150px]">Amount (₹)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {income.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell className="font-medium text-slate-900 border-r">{item.particular}</TableCell>
                                            <TableCell className="text-right text-slate-700 font-medium">
                                                {item.amount === 0 ? '-' : item.amount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-t-2 border-slate-200 bg-slate-50/80">
                                        <TableCell className="text-right font-bold text-slate-900 border-r">Total Income</TableCell>
                                        <TableCell className="text-right font-bold text-emerald-600">{totalIncome.toLocaleString()}</TableCell>
                                    </TableRow>
                                    {/* Empty row for spacing */}
                                    <TableRow className="border-transparent">
                                        <TableCell className="text-right font-bold text-slate-900 border-r py-6">&nbsp;</TableCell>
                                        <TableCell className="text-right font-bold py-6">&nbsp;</TableCell>
                                    </TableRow>
                                    <TableRow className="border-t border-slate-300 bg-slate-100/50">
                                        <TableCell className="text-right font-bold text-slate-900 border-r">Grand Total</TableCell>
                                        <TableCell className="text-right font-bold text-slate-900">{totalIncome.toLocaleString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

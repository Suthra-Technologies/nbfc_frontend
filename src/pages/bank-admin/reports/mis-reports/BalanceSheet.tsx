import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Printer, Filter } from 'lucide-react';

export default function BalanceSheet() {
    const [asOfDate, setAsOfDate] = useState('');

    const assets = [
        { id: 1, schedule: '6', particular: 'Cash & Balances', amount: 300000 },
        { id: 2, schedule: '7', particular: 'Balances with Banks', amount: 250000 },
        { id: 3, schedule: '8', particular: 'Investments', amount: 450000 },
        { id: 4, schedule: '9', particular: 'Advances', amount: 800000 },
        { id: 5, schedule: '10', particular: 'Fixed Assets', amount: 125000 },
        { id: 6, schedule: '11', particular: 'Other Assets', amount: 0 },
    ];

    const liabilities = [
        { id: 1, schedule: '1', particular: 'Share Capital', amount: 500000 },
        { id: 2, schedule: '2', particular: 'Reserves & Surplus', amount: 150000 },
        { id: 3, schedule: '3', particular: 'Deposits', amount: 1200000 },
        { id: 4, schedule: '4', particular: 'Borrowings', amount: 0 },
        { id: 5, schedule: '5', particular: 'Other Liabilities & Provisions', amount: 75000 },
    ];

    const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0);
    const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Balance Sheet</h1>
                    <p className="text-slate-500 text-sm mt-1">Generate a financial statement of assets, liabilities, and capital.</p>
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
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">As Of Date</label>
                                <Input type="date" value={asOfDate} onChange={(e) => setAsOfDate(e.target.value)} />
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
                        {/* Liabilities Side */}
                        <div className="flex-1 border-b xl:border-b-0 xl:border-r border-slate-200">
                            <div className="bg-emerald-50/50 p-3 border-b text-center border-slate-200">
                                <h2 className="font-semibold text-emerald-800">Capital & Liabilities</h2>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="w-[80px] text-center border-r font-medium text-slate-600">Sch No.</TableHead>
                                        <TableHead className="font-medium text-slate-600 border-r">Particulars</TableHead>
                                        <TableHead className="text-right font-medium text-slate-600 w-[150px]">Amount (₹)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {liabilities.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell className="text-center font-medium text-slate-500 border-r">{item.schedule}</TableCell>
                                            <TableCell className="font-medium text-slate-900 border-r">{item.particular}</TableCell>
                                            <TableCell className="text-right text-slate-700 font-medium">
                                                {item.amount === 0 ? '-' : item.amount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {/* Padding rows to match height if needed */}
                                    <TableRow className="border-t-2 border-slate-200 bg-slate-50/80">
                                        <TableCell colSpan={2} className="text-right font-bold text-slate-900 border-r">Total Liabilities</TableCell>
                                        <TableCell className="text-right font-bold text-slate-900">{totalLiabilities.toLocaleString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        {/* Assets Side */}
                        <div className="flex-1">
                            <div className="bg-indigo-50/50 p-3 border-b text-center border-slate-200">
                                <h2 className="font-semibold text-indigo-800">Assets</h2>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="w-[80px] text-center border-r font-medium text-slate-600">Sch No.</TableHead>
                                        <TableHead className="font-medium text-slate-600 border-r">Particulars</TableHead>
                                        <TableHead className="text-right font-medium text-slate-600 w-[150px]">Amount (₹)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assets.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell className="text-center font-medium text-slate-500 border-r">{item.schedule}</TableCell>
                                            <TableCell className="font-medium text-slate-900 border-r">{item.particular}</TableCell>
                                            <TableCell className="text-right text-slate-700 font-medium">
                                                {item.amount === 0 ? '-' : item.amount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-t-2 border-slate-200 bg-slate-50/80">
                                        <TableCell colSpan={2} className="text-right font-bold text-slate-900 border-r">Total Assets</TableCell>
                                        <TableCell className="text-right font-bold text-slate-900">{totalAssets.toLocaleString()}</TableCell>
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

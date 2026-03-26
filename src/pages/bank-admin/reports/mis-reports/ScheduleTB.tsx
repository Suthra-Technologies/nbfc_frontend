import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Printer, Filter } from 'lucide-react';

export default function ScheduleTB() {
    const [asOfDate, setAsOfDate] = useState('');

    const mockData = [
        { id: 1, schedule: 'Schedule 1', particular: 'Share Capital', debit: 0, credit: 500000 },
        { id: 2, schedule: 'Schedule 2', particular: 'Reserves & Surplus', debit: 0, credit: 150000 },
        { id: 3, schedule: 'Schedule 3', particular: 'Deposits', debit: 0, credit: 1200000 },
        { id: 4, schedule: 'Schedule 4', particular: 'Borrowings', debit: 0, credit: 0 },
        { id: 5, schedule: 'Schedule 5', particular: 'Other Liabilities', debit: 0, credit: 75000 },
        { id: 6, schedule: 'Schedule 6', particular: 'Cash & Balances', debit: 300000, credit: 0 },
        { id: 7, schedule: 'Schedule 7', particular: 'Balances with Banks', debit: 250000, credit: 0 },
        { id: 8, schedule: 'Schedule 8', particular: 'Investments', debit: 450000, credit: 0 },
        { id: 9, schedule: 'Schedule 9', particular: 'Advances', debit: 800000, credit: 0 },
        { id: 10, schedule: 'Schedule 10', particular: 'Fixed Assets', debit: 125000, credit: 0 },
        { id: 11, schedule: 'Schedule 11', particular: 'Other Assets', debit: 0, credit: 0 },
    ];

    const totalDebit = mockData.reduce((acc, curr) => acc + curr.debit, 0);
    const totalCredit = mockData.reduce((acc, curr) => acc + curr.credit, 0);

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Schedule Trial Balance</h1>
                    <p className="text-slate-500 text-sm mt-1">View trial balances categorized by schedules.</p>
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
                                <Filter size={16} /> Generate Schedule
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="rounded-md border-0">
                        <Table>
                            <TableHeader className="bg-slate-50/80">
                                <TableRow>
                                    <TableHead className="font-semibold text-slate-700 border-r w-[150px]">Schedule No.</TableHead>
                                    <TableHead className="font-semibold text-slate-700 border-r text-left">Particulars</TableHead>
                                    <TableHead className="font-semibold text-slate-700 border-r text-right w-[200px]">Debit Balance (₹)</TableHead>
                                    <TableHead className="font-semibold text-slate-700 text-right w-[200px]">Credit Balance (₹)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockData.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-500 border-r">{row.schedule}</TableCell>
                                        <TableCell className="font-medium text-slate-900 border-r">{row.particular}</TableCell>
                                        <TableCell className="text-right font-medium text-slate-700 border-r">
                                            {row.debit === 0 ? '-' : row.debit.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-slate-700">
                                            {row.credit === 0 ? '-' : row.credit.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="bg-slate-100/50 font-bold border-t-2 border-slate-200">
                                    <TableCell colSpan={2} className="text-right text-slate-900 border-r">Total</TableCell>
                                    <TableCell className="text-right text-slate-900 border-r">{totalDebit.toLocaleString()}</TableCell>
                                    <TableCell className="text-right text-slate-900">{totalCredit.toLocaleString()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

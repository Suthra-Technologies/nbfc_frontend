import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Printer, Filter } from 'lucide-react';

export default function ComparisonTB() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const mockData = [
        { id: 1, particular: 'Share Capital', openingDr: 0, openingCr: 500000, currentDr: 0, currentCr: 100000, closingDr: 0, closingCr: 600000 },
        { id: 2, particular: 'Cash in Hand', openingDr: 250000, openingCr: 0, currentDr: 50000, currentCr: 10000, closingDr: 290000, closingCr: 0 },
        { id: 3, particular: 'Bank Accounts', openingDr: 150000, openingCr: 0, currentDr: 200000, currentCr: 50000, closingDr: 300000, closingCr: 0 },
        { id: 4, particular: 'Fixed Assets', openingDr: 100000, openingCr: 0, currentDr: 0, currentCr: 0, closingDr: 100000, closingCr: 0 },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Comparison Trial Balance</h1>
                    <p className="text-slate-500 text-sm mt-1">Compare trial balances across different periods.</p>
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
                                <Filter size={16} /> Filter
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="rounded-md border-0">
                        <Table>
                            <TableHeader className="bg-slate-50/80">
                                <TableRow>
                                    <TableHead rowSpan={2} className="border-r font-semibold text-slate-700 min-w-[200px]">Particulars</TableHead>
                                    <TableHead colSpan={2} className="text-center border-r font-semibold text-slate-700">Opening Balance</TableHead>
                                    <TableHead colSpan={2} className="text-center border-r font-semibold text-slate-700">Current Balance</TableHead>
                                    <TableHead colSpan={2} className="text-center font-semibold text-slate-700">Closing Balance</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="text-right border-r font-medium text-slate-600">Debit (₹)</TableHead>
                                    <TableHead className="text-right border-r font-medium text-slate-600">Credit (₹)</TableHead>
                                    <TableHead className="text-right border-r font-medium text-slate-600">Debit (₹)</TableHead>
                                    <TableHead className="text-right border-r font-medium text-slate-600">Credit (₹)</TableHead>
                                    <TableHead className="text-right border-r font-medium text-slate-600">Debit (₹)</TableHead>
                                    <TableHead className="text-right font-medium text-slate-600">Credit (₹)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockData.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-900 border-r">{row.particular}</TableCell>
                                        <TableCell className="text-right border-r">{row.openingDr.toLocaleString()}</TableCell>
                                        <TableCell className="text-right border-r">{row.openingCr.toLocaleString()}</TableCell>
                                        <TableCell className="text-right border-r">{row.currentDr.toLocaleString()}</TableCell>
                                        <TableCell className="text-right border-r">{row.currentCr.toLocaleString()}</TableCell>
                                        <TableCell className="text-right font-semibold border-r">{row.closingDr.toLocaleString()}</TableCell>
                                        <TableCell className="text-right font-semibold">{row.closingCr.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

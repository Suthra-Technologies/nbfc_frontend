import { useState } from "react";
import { Calendar as CalendarIcon, Printer, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function AccountLedger() {
    const [exportType, setExportType] = useState('pdf');
    const [narration, setNarration] = useState(false);
    const [pageSize, setPageSize] = useState("18");

    const handlePrint = () => {
        if (exportType === 'pdf') {
            import('jspdf').then(({ default: jsPDF }) => {
                const doc = new jsPDF();
                doc.setFontSize(18);
                doc.text("Account Ledger Report", 14, 20);
                
                doc.setFontSize(12);
                doc.text("---------------------------------------------------------", 14, 25);
                doc.text("Date: 30/03/2026 to 30/03/2026", 14, 35);
                doc.text(`Narration Included: ${narration ? 'Yes' : 'No'}`, 14, 45);
                
                doc.setFontSize(14);
                doc.text("Sample Ledger Entries:", 14, 60);
                
                doc.setFontSize(10);
                doc.text("Date       | Voucher | Narration                  | Debit   | Credit  | Balance", 14, 75);
                doc.text("--------------------------------------------------------------------------------", 14, 80);
                doc.text("30/03/2026 | V-001   | Opening Balance            | 0.00    | 5000.00 | 5000.00 Cr", 14, 88);
                
                if (narration) {
                    doc.text("           |         | * Brought forward          |         |         |", 14, 94);
                    doc.text("30/03/2026 | V-002   | Payment Received           | 2000.00 | 0.00    | 3000.00 Cr", 14, 104);
                    doc.text("           |         | * Towards INV-001          |         |         |", 14, 110);
                } else {
                    doc.text("30/03/2026 | V-002   | Payment Received           | 2000.00 | 0.00    | 3000.00 Cr", 14, 96);
                }
                
                doc.text("--------------------------------------------------------------------------------", 14, narration ? 120 : 106);
                doc.setFontSize(12);
                doc.text("Closing Balance: 3000.00 Cr", 14, narration ? 130 : 116);
                
                window.open(doc.output('bloburl'), '_blank');
            });
        } else {
            // Simple CSV data for Excel file
            const content = `Date,Voucher,Narration,Debit,Credit,Balance\n30/03/2026,V-001,Opening Balance${narration ? ' (Brought forward)' : ''},0.00,5000.00,5000.00 Cr\n30/03/2026,V-002,Payment Received${narration ? ' (Towards INV-001)' : ''},2000.00,0.00,3000.00 Cr`;
            const mimeType = 'text/csv';

            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            setTimeout(() => URL.revokeObjectURL(url), 100);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-4 max-w-[1700px] mx-auto w-full flex-1 flex flex-col">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-4 space-y-4">
                        
                        {/* Top Row */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3 w-96">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap w-24">Account head:</Label>
                                <div className="flex-1">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Account head" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="cash">Cash Account</SelectItem>
                                            <SelectItem value="bank">Bank Account</SelectItem>
                                            <SelectItem value="sales">Sales Account</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">From Date:</Label>
                                <div className="relative group w-36">
                                    <Input 
                                        type="date"
                                        defaultValue="2026-03-30" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">To Date:</Label>
                                <div className="relative group w-36">
                                    <Input 
                                        type="date"
                                        defaultValue="2026-03-30" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex flex-wrap items-center gap-6">
                            
                            <div className="flex items-center gap-3 w-96">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap w-24">Subcategory:</Label>
                                <div className="flex-1">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Subcategory" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="sub1">Subcategory 1</SelectItem>
                                            <SelectItem value="sub2">Subcategory 2</SelectItem>
                                            <SelectItem value="sub3">Subcategory 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="narration" 
                                    checked={narration}
                                    onCheckedChange={(checked) => setNarration(checked as boolean)}
                                    className="border-[#64748b] data-[state=checked]:bg-[#009bb0] data-[state=checked]:border-[#009bb0] w-3.5 h-3.5"
                                />
                                <Label htmlFor="narration" className="text-xs font-bold text-[#475569] cursor-pointer whitespace-nowrap">Narration</Label>
                            </div>

                            <div className="flex items-center gap-3 ml-2">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Export type:</Label>
                                <div className="w-40">
                                    <Select value={exportType} onValueChange={setExportType}>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium hover:border-[#009bb0]">
                                            <SelectValue placeholder="PDF" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center ml-2">
                                <Button 
                                    onClick={handlePrint}
                                    className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                    <span>Print</span>
                                </Button>
                            </div>
                            
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Table Section */}
                <Card className="flex-1 border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md flex flex-col min-h-[500px]">
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <Table className="border-collapse border-[#e2e8f0]">
                            <TableHeader className="bg-[#f1f5f9] sticky top-0 z-10 shadow-sm text-xs font-bold text-[#475569]">
                                <TableRow className="hover:bg-transparent border-[#e2e8f0]">
                                    <TableHead className="h-8 px-4 border-r border-[#e2e8f0]">Date</TableHead>
                                    <TableHead className="h-8 px-4 border-r border-[#e2e8f0]">Particulars</TableHead>
                                    <TableHead className="h-8 px-4 border-r border-[#e2e8f0]">Voucher Type</TableHead>
                                    <TableHead className="h-8 px-4 border-r border-[#e2e8f0]">Voucher No.</TableHead>
                                    <TableHead className="h-8 px-4 border-r border-[#e2e8f0] text-right">Debit</TableHead>
                                    <TableHead className="h-8 px-4 border-r border-[#e2e8f0] text-right">Credit</TableHead>
                                    <TableHead className="h-8 px-4 text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={7} className="h-96 text-center text-[#94a3b8] italic text-xs">
                                        No data to display
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="h-10 bg-[#475569] text-white flex items-center justify-between px-3 text-xs flex-none">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center border-r border-[#ffffff33] pr-2 gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-[#ffffff22] hover:text-white p-0">
                                    <ChevronsLeft className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-[#ffffff22] hover:text-white p-0">
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                            
                            <div className="flex items-center gap-2 px-2 border-r border-[#ffffff33] h-full">
                                <span>Page</span>
                                <Input defaultValue="1" className="h-5 w-10 bg-white text-[#1e293b] border-none text-[10px] text-center p-0 rounded-sm font-bold" />
                                <span>of 1</span>
                            </div>

                            <div className="flex items-center border-r border-[#ffffff33] pr-2 gap-1 px-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-[#ffffff22] hover:text-white p-0">
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-[#ffffff22] hover:text-white p-0">
                                    <ChevronsRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>

                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-[#ffffff22] hover:text-white p-0">
                                <RefreshCw className="h-3.5 w-3.5" />
                            </Button>

                            <div className="flex items-center gap-2 pl-2 border-l border-[#ffffff33]">
                                <span>Page size:</span>
                                <div className="w-16">
                                    <Select value={pageSize} onValueChange={setPageSize}>
                                        <SelectTrigger className="h-5 bg-white text-[#1e293b] border-none text-[10px] font-bold py-0 rounded-sm px-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="18">18</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span>No data to display</span>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}

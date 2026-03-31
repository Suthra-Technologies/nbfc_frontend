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

export function LoanWiseDayClosingReport() {
    const [renderType, setRenderType] = useState('pdf');
    const [asOnDate, setAsOnDate] = useState(false);
    const [pageSize, setPageSize] = useState("18");

    const handlePrint = () => {
        if (renderType === 'pdf') {
            import('jspdf').then(({ default: jsPDF }) => {
                const doc = new jsPDF();
                doc.setFontSize(18);
                doc.text("Loan Wise Day Closing Report", 14, 20);
                
                doc.setFontSize(12);
                doc.text("---------------------------------------------------------", 14, 25);
                doc.text("Date Range: 26/03/2026 to 26/03/2026", 14, 35);
                doc.text(`As On Date Filter: ${asOnDate ? 'Enabled' : 'Disabled'}`, 14, 45);
                doc.text("Nature Of Loan: All", 14, 55);
                
                doc.setFontSize(14);
                doc.text("Sample Data:", 14, 70);
                
                doc.setFontSize(12);
                doc.text("1. Account: John Doe   | Closing Balance: 15000", 14, 85);
                doc.text("2. Account: Jane Smith | Closing Balance: 25000", 14, 95);
                
                doc.text("---------------------------------------------------------", 14, 110);
                doc.setFontSize(14);
                doc.text("Total Closing Balance: 40000 INR", 14, 120);
                
                window.open(doc.output('bloburl'), '_blank');
            });
        } else {
            // Simple CSV data for Excel file
            const content = 'Date,Account Name,Closing Balance\n26/03/2026,John Doe,15000\n26/03/2026,Jane Smith,25000';
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
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="asOnDate" 
                                    checked={asOnDate}
                                    onCheckedChange={(checked) => setAsOnDate(checked as boolean)}
                                    className="border-[#64748b] data-[state=checked]:bg-[#009bb0] data-[state=checked]:border-[#009bb0] w-3.5 h-3.5"
                                />
                                <Label htmlFor="asOnDate" className="text-xs font-bold text-[#475569] cursor-pointer whitespace-nowrap">As On Date</Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">From Date:</Label>
                                <div className="relative group w-36">
                                    <Input 
                                        type="date"
                                        defaultValue="2026-03-26" 
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
                                        defaultValue="2026-03-26" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Nature Of Loan:</Label>
                                <div className="w-40">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="pl">Personal Loan</SelectItem>
                                            <SelectItem value="gl">Gold Loan</SelectItem>
                                            <SelectItem value="vl">Vehicle Loan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Render Type:</Label>
                                <div className="w-32">
                                    <Select value={renderType} onValueChange={setRenderType}>
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
                </Card>

            </div>
        </div>
    );
}

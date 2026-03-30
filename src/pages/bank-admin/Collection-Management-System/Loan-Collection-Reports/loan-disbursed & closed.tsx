import { useState } from "react";
import { Calendar as CalendarIcon, Printer, FileSpreadsheet } from "lucide-react";
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

export function LoanDisbursedAndClosed() {
    const [grouping, setGrouping] = useState(false);

    const handlePrint = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Loan Disbursed & Closed Report", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text("Date Range: 26/03/2026 to 26/03/2026", 14, 35);
            doc.text(`Grouping Enabled: ${grouping ? 'Yes' : 'No'}`, 14, 45);
            
            doc.setFontSize(14);
            doc.text("Sample Data:", 14, 60);
            
            doc.setFontSize(12);
            doc.text("1. Loan ID: LN-1001   |    Status: Disbursed   |   Amount: 50000", 14, 75);
            doc.text("2. Loan ID: LN-1002   |    Status: Closed      |   Amount: 35000", 14, 85);
            
            doc.text("---------------------------------------------------------", 14, 100);
            doc.setFontSize(14);
            doc.text("Total Loans Processed: 2", 14, 110);
            
            window.open(doc.output('bloburl'), '_blank');
        });
    };

    const handleExportExcel = () => {
        const content = 'Date,Loan ID,Account Name,Status,Amount\n26/03/2026,LN-1001,John Doe,Disbursed,50000\n26/03/2026,LN-1002,Jane Smith,Closed,35000';
        const fileName = 'loan_disbursed_closed_report.csv';
        const mimeType = 'text/csv';

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 100);
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-4 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-4 space-y-4">
                        {/* Top Row: Dates, Company, Branch */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">From Date:</Label>
                                <div className="relative group w-40">
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
                                <div className="relative group w-40">
                                    <Input 
                                        type="date"
                                        defaultValue="2026-03-26" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Company Name :</Label>
                                <div className="w-48">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="comp1">Company A</SelectItem>
                                            <SelectItem value="comp2">Company B</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Branch :</Label>
                                <div className="w-48">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Branch name" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="main">Main Branch</SelectItem>
                                            <SelectItem value="city">City Branch</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Loan Type, Type, Grouping, Actions */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Loan type :</Label>
                                <div className="w-32">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="-Select-" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="pl">Personal Loan</SelectItem>
                                            <SelectItem value="vl">Vehicle Loan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Type :</Label>
                                <div className="w-32">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium hover:border-[#009bb0]">
                                            <SelectValue placeholder="-Select-" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="disbursed">Disbursed</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 mr-2">
                                <Checkbox 
                                    id="grouping" 
                                    checked={grouping}
                                    onCheckedChange={(checked) => setGrouping(checked as boolean)}
                                    className="border-[#64748b] data-[state=checked]:bg-[#009bb0] data-[state=checked]:border-[#009bb0]"
                                />
                                <Label htmlFor="grouping" className="text-xs font-bold text-[#475569] cursor-pointer">Grouping</Label>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                                <Button 
                                    onClick={handlePrint}
                                    className="bg-[#009bb0] hover:bg-[#334155] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                    <span>Print</span>
                                </Button>

                                <Button 
                                    onClick={handleExportExcel}
                                    className="bg-[#009bb0] hover:bg-[#334155] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                                >
                                    <FileSpreadsheet className="h-3.5 w-3.5" />
                                    <span>Export to excel</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Document/Report Viewer Area */}
                <Card className="flex-1 border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md min-h-[500px]">
                    <div className="h-full w-full flex items-center justify-center text-[#94a3b8]">
                        <div className="text-center">
                            <p className="text-sm font-medium italic">Apply filters and click Print or Export to generate report.</p>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}

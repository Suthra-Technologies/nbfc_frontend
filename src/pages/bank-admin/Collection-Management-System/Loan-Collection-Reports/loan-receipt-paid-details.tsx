import { useState } from "react";
import { Calendar as CalendarIcon, Printer } from "lucide-react";
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

export function LoanReceiptPaidDetails() {
    const [asOnDate, setAsOnDate] = useState(false);
    const [renderType, setRenderType] = useState('pdf');

    const handlePrint = () => {
        if (renderType === 'pdf') {
            import('jspdf').then(({ default: jsPDF }) => {
                const doc = new jsPDF();
                // Add content to the PDF
                doc.setFontSize(18);
                doc.text("Loan Receipt Paid Details Report", 14, 20);
                
                doc.setFontSize(12);
                doc.text("---------------------------------------------------------", 14, 25);
                doc.text("Date Range: 26/03/2026 to 26/03/2026", 14, 35);
                doc.text("Nature of Loan: Personal Loan", 14, 45);
                
                doc.setFontSize(14);
                doc.text("Sample Data:", 14, 60);
                
                doc.setFontSize(12);
                doc.text("1. Receipt No: RCPT-001   |    Account Name: John Doe   |   Amount Paid: 5000", 14, 75);
                doc.text("2. Receipt No: RCPT-002   |    Account Name: Jane Smith |   Amount Paid: 8500", 14, 85);
                
                doc.text("---------------------------------------------------------", 14, 100);
                doc.setFontSize(14);
                doc.text("Total Collections: 13500 INR", 14, 110);
                
                window.open(doc.output('bloburl'), '_blank');
            });
        } else {
            // Simple CSV data for fake Excel file
            const content = 'Date,Receipt No,Account Name,Amount Paid\n26/03/2026,RCPT-001,John Doe,5000\n26/03/2026,RCPT-002,Jane Smith,8500';
            const fileName = 'loan_receipt_paid_details.csv';
            const mimeType = 'text/csv';

            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            setTimeout(() => URL.revokeObjectURL(url), 100);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-4 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-4 space-y-4">
                        {/* Top Row: Dates and Loan Nature */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2 mr-2">
                                <Checkbox 
                                    id="asOnDate" 
                                    checked={asOnDate}
                                    onCheckedChange={(checked) => setAsOnDate(checked as boolean)}
                                    className="border-[#64748b] data-[state=checked]:bg-[#009bb0] data-[state=checked]:border-[#009bb0]"
                                />
                                <Label htmlFor="asOnDate" className="text-xs font-bold text-[#475569] cursor-pointer">As On Date</Label>
                            </div>

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
                                        defaultValue="26/03/2026" 
                                        disabled={asOnDate}
                                        className={`h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium ${asOnDate ? 'opacity-50 cursor-not-allowed bg-[#f1f5f9]' : ''}`} 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Nature of Loan:</Label>
                                <div className="w-56">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Nature Of Loan" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="personal">Personal Loan</SelectItem>
                                            <SelectItem value="gold">Gold Loan</SelectItem>
                                            <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Render Type and Actions */}
                        <div className="flex items-center gap-6">
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

                            <Button 
                                onClick={handlePrint}
                                className="bg-[#009bb0] hover:bg-[#334155] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                            >
                                <Printer className="h-3.5 w-3.5" />
                                <span>Print</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Document/Report Viewer Area */}
                <Card className="flex-1 border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md min-h-[500px]">
                    <div className="h-full w-full flex items-center justify-center text-[#94a3b8]">
                        <div className="text-center">
                            <p className="text-sm font-medium italic">Apply filters and click Print to generate report.</p>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}

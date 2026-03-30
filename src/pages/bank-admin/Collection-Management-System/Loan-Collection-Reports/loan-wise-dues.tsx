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
import { Card, CardContent } from "@/components/ui/card";

export function LoanWiseDues() {

    const handlePrint = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Loan Wise Dues Report", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text("As On Date: 26/03/2026", 14, 35);
            
            doc.setFontSize(14);
            doc.text("Sample Data:", 14, 50);
            
            doc.setFontSize(12);
            doc.text("1. Loan ID: LN-1001   |    Account Name: John Doe   |   Total Dues: 15000", 14, 65);
            doc.text("2. Loan ID: LN-1002   |    Account Name: Jane Smith |   Total Dues: 25000", 14, 75);
            
            doc.text("---------------------------------------------------------", 14, 90);
            doc.setFontSize(14);
            doc.text("Total Dues Amount: 40000 INR", 14, 100);
            
            window.open(doc.output('bloburl'), '_blank');        });
    };

    const handleExportExcel = () => {
        const content = 'Date,Loan ID,Account Name,Total Dues\n26/03/2026,LN-1001,John Doe,15000\n26/03/2026,LN-1002,Jane Smith,25000';
        const fileName = 'loan_wise_dues_report.csv';
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
                        {/* Top Row: As On Date, Loan type */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">As On Date:</Label>
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
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Loan type:</Label>
                                <div className="w-48">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="pl">Personal Loan</SelectItem>
                                            <SelectItem value="vl">Vehicle Loan</SelectItem>
                                            <SelectItem value="gl">Gold Loan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Actions */}
                        <div className="flex items-center gap-3">
                            <Button 
                                onClick={handlePrint}
                                className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                            >
                                <Printer className="h-3.5 w-3.5" />
                                <span>Print</span>
                            </Button>

                            <Button 
                                onClick={handleExportExcel}
                                className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                            >
                                <FileSpreadsheet className="h-3.5 w-3.5" />
                                <span>Export to excel</span>
                            </Button>
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

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
import { Card, CardContent } from "@/components/ui/card";

export function BRSStatementsReport() {
    const [exportType, setExportType] = useState('pdf');

    const handlePrint = () => {
        if (exportType === 'pdf') {
            import('jspdf').then(({ default: jsPDF }) => {
                const doc = new jsPDF();
                doc.setFontSize(18);
                doc.text("Bank Reconciliation Statements Details", 14, 20);
                
                doc.setFontSize(12);
                doc.text("---------------------------------------------------------", 14, 25);
                doc.text("Statement as at: 30/03/2026", 14, 35);
                
                doc.setFontSize(14);
                doc.text("Reconciliation Details:", 14, 50);
                
                doc.setFontSize(10);
                const tableHeader = "Date       | Ref No | Description                  | Debit   | Credit";
                doc.text(tableHeader, 14, 65);
                doc.text("-".repeat(tableHeader.length + 10), 14, 70);
                doc.text("30/03/2026 | CH-001 | Unpresented Cheque 123456    | 0.00    | 5000.00", 14, 78);
                doc.text("30/03/2026 | DP-001 | Uncleared Deposit 987654     | 3000.00 | 0.00", 14, 86);
                
                doc.text("-".repeat(tableHeader.length + 10), 14, 96);
                doc.setFontSize(11);
                doc.text("Summary Statement of Differences:", 14, 106);
                doc.text("Total Unpresented: 5000.00 | Total Uncleared: 3000.00", 14, 114);
                
                window.open(doc.output('bloburl'), '_blank');
            });
        } else {
            // Simple CSV data for Excel file
            const content = 'Date,Ref No,Description,Debit,Credit\n30/03/2026,CH-001,Unpresented Cheque 123456,0.00,5000.00\n30/03/2026,DP-001,Uncleared Deposit 987654,3000.00,0.00';
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
                        
                        {/* Top Row: Date, Bank Name, Print */}
                        <div className="flex flex-wrap items-center gap-6">
                            
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Bank reconciliation statement as at:</Label>
                                <div className="relative group w-40">
                                    <Input 
                                        type="date"
                                        defaultValue="2026-03-30" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-80">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Bank name:</Label>
                                <div className="flex-1">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Bank name" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="sbi">State Bank of India</SelectItem>
                                            <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                            <SelectItem value="axis">Axis Bank</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Button 
                                    onClick={handlePrint}
                                    className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                    <span>Print</span>
                                </Button>
                            </div>
                            
                        </div>

                        {/* Bottom Row: Export Type */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
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
                        </div>

                    </CardContent>
                </Card>

                {/* 2. Document/Report Viewer Area */}
                <Card className="flex-1 border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md min-h-[500px]">
                    
                </Card>

            </div>
        </div>
    );
}

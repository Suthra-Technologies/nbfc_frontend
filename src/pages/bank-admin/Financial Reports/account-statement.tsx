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

export function AccountStatementReport() {
    const [exportType, setExportType] = useState('pdf');
    const [narration, setNarration] = useState(false);

    const handlePrint = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Account Statement Report", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text("Account: Cash Account", 14, 35);
            doc.text("Date Range: 30/03/2026 to 30/03/2026", 14, 42);
            doc.text(`Narration Included: ${narration ? 'Yes' : 'No'}`, 14, 49);
            
            doc.setFontSize(10);
            const tableHeader = "Date       | Particulars                  | Debit    | Credit   | Balance";
            doc.text(tableHeader, 14, 65);
            doc.text("-".repeat(80), 14, 70);
            doc.text("30/03/2026 | Opening Balance             | 0.00     | 0.00     | 25000.00", 14, 78);
            doc.text("30/03/2026 | Loan Repayment - REC-4401   | 0.00     | 1500.00  | 26500.00", 14, 86);
            
            doc.text("-".repeat(80), 14, 96);
            doc.setFontSize(11);
            doc.text("Closing Balance: 26,500.00 INR", 14, 106);
            
            window.open(doc.output('bloburl'), '_blank');
        });
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-4 max-w-[1700px] mx-auto w-full flex-1 flex flex-col">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-[auto_auto_auto] gap-x-8 gap-y-4 items-center">
                            
                            {/* Row 1 */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap w-24">Account head:</Label>
                                <div className="w-56">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Account head" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="cash">Cash Account</SelectItem>
                                            <SelectItem value="bank">Bank Account</SelectItem>
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

                            {/* Row 2 */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap w-24">Subcategory:</Label>
                                <div className="w-56">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Subcategory" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="general">General</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="narration" 
                                        checked={narration}
                                        onCheckedChange={(val) => setNarration(val === true)}
                                        className="border-[#cbd5e0] h-4 w-4 data-[state=checked]:bg-[#009bb0] data-[state=checked]:border-[#009bb0]" 
                                    />
                                    <Label htmlFor="narration" className="text-xs font-bold text-[#475569] cursor-pointer">Narration</Label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Export type:</Label>
                                    <div className="w-40">
                                        <Select value={exportType} onValueChange={setExportType}>
                                            <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
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

                            <div className="flex items-center">
                                <Button 
                                    onClick={handlePrint}
                                    className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-6 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                    <span>Print</span>
                                </Button>
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

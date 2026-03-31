import { Calendar as CalendarIcon, Printer, FileText, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function DayBook() {

    const handlePrint = (type: string) => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text(type === 'main' ? "Day Book Report" : "Cheques In Hand Report", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text("Date: 30/03/2026", 14, 35);
            
            doc.setFontSize(14);
            doc.text("Transaction Details:", 14, 50);
            
            doc.setFontSize(10);
            const tableHeader = "Voucher | Particulars                  | Debit   | Credit";
            doc.text(tableHeader, 14, 65);
            doc.text("-".repeat(tableHeader.length + 10), 14, 70);
            doc.text("V-101   | EMI Receipt - CUST001        | 1500.00 | 0.00", 14, 78);
            doc.text("V-102   | Bank Deposit                 | 0.00    | 5000.00", 14, 86);
            
            doc.text("-".repeat(tableHeader.length + 10), 14, 96);
            doc.setFontSize(11);
            doc.text("Closing Balance: 25,000.00 INR", 14, 106);
            
            window.open(doc.output('bloburl'), '_blank');
        });
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-4 max-w-[1700px] mx-auto w-full flex-1 flex flex-col">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-4">
                        
                        <div className="flex flex-wrap items-center gap-8">
                            
                            {/* Date Field */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Date:</Label>
                                <div className="relative group w-40">
                                    <Input 
                                        type="date"
                                        defaultValue="2026-03-30" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            {/* Main Print Button */}
                            <div className="flex items-center">
                                <Button 
                                    onClick={() => handlePrint('main')}
                                    className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                    <span>Print</span>
                                </Button>
                            </div>

                            {/* Cheques Button */}
                            <div className="flex items-center">
                                <Button 
                                    variant="secondary"
                                    onClick={() => handlePrint('cheques')}
                                    className="bg-[#475569] hover:bg-[#334155] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs border-none"
                                >
                                    <FileText className="h-3.5 w-3.5" />
                                    <span>Cheques in hand print</span>
                                </Button>
                            </div>

                            {/* Denomination Entry Link/Action */}
                            <div className="flex items-center">
                                <button className="text-[#009bb0] hover:text-[#007a8a] hover:underline flex items-center gap-2 text-xs font-bold transition-all decoration-2 underline-offset-4">
                                    <LayoutList className="h-4 w-4" />
                                    <span>Denomination Entry</span>
                                </button>
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

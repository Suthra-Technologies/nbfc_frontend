import { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function DuplicateAdvisesReport() {
    const [jvNo, setJvNo] = useState("");

    const handlePrint = () => {
        if (!jvNo) return;
        
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Duplicate Journal Voucher Advice", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text(`JV Number: ${jvNo}`, 14, 35);
            doc.text("Date: 30/03/2026", 14, 42);
            
            doc.setFontSize(14);
            doc.text("Advice Details:", 14, 60);
            
            doc.setFontSize(10);
            const tableHeader = "Description                  | Account             | Debit   | Credit";
            doc.text(tableHeader, 14, 75);
            doc.text("-".repeat(tableHeader.length + 10), 14, 80);
            doc.text("Monthly Interest Provision   | Interest Payable    | 5000.00 | 0.00", 14, 88);
            doc.text("Monthly Interest Provision   | Interest Expense    | 0.00    | 5000.00", 14, 96);
            
            doc.text("-".repeat(tableHeader.length + 10), 14, 106);
            doc.setFontSize(11);
            doc.text(`Total Amount: 5,000.00 INR`, 14, 116);
            doc.text("Status: DUPLICATE COPY", 14, 126);
            
            window.open(doc.output('bloburl'), '_blank');
        });
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-4 max-w-[1700px] mx-auto w-full flex-1 flex flex-col">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-4">
                        
                        <div className="flex flex-wrap items-center gap-6">
                            
                            {/* JV No Field */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">JV No.:</Label>
                                <div className="w-48">
                                    <Input 
                                        placeholder="Enter JV No." 
                                        value={jvNo}
                                        onChange={(e) => setJvNo(e.target.value)}
                                        className="h-8 border-[#cbd5e0] focus-visible:border-[#009BB0] transition-colors bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium placeholder:text-[#94a3b8] placeholder:italic" 
                                    />
                                </div>
                            </div>

                            {/* Print Button */}
                            <div className="flex items-center">
                                <Button 
                                    onClick={handlePrint}
                                    disabled={!jvNo}
                                    className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs disabled:opacity-50"
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

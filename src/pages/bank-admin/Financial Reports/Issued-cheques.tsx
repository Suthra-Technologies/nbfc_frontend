import { useState } from "react";
import { Printer, Save, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export function IssuedChequesReport() {
    const [pageSize, setPageSize] = useState("18");

    const handlePrint = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Issued Cheques Report", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text("Bank Name: SBI Main Branch", 14, 35);
            doc.text("Date: 30/03/2026", 14, 42);
            
            doc.setFontSize(10);
            const tableHeader = "Cheque No | Amount   | Voucher No | Paid To        | Status";
            doc.text(tableHeader, 14, 60);
            doc.text("-".repeat(80), 14, 65);
            doc.text("123456    | 5000.00  | V-202      | John Doe       | Issued", 14, 73);
            doc.text("123457    | 1200.00  | V-203      | ABC Supplies   | Cleared", 14, 81);
            
            doc.text("-".repeat(80), 14, 91);
            doc.text("Total Amount: 6,200.00 INR", 14, 101);
            
            window.open(doc.output('bloburl'), '_blank');
        });
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans overflow-hidden">
            <div className="p-4 space-y-3 max-w-[1700px] mx-auto w-full flex-1 flex flex-col min-h-0">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-3">
                        <div className="flex flex-wrap items-center gap-6">
                            
                            {/* Bank name Select */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Bank name:</Label>
                                <div className="w-52">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Bank name" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="sbi">State Bank of India</SelectItem>
                                            <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Cheque No Select */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Cheque No.:</Label>
                                <div className="w-52">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Cheque No." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="c1">123456</SelectItem>
                                            <SelectItem value="c2">123457</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Actions Buttons */}
                            <div className="flex items-center gap-2">
                                <Button className="bg-[#475569] hover:bg-[#334155] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm font-bold text-xs">
                                    <Save className="h-3.5 w-3.5" />
                                    <span>Save</span>
                                </Button>
                                <Button 
                                    onClick={handlePrint}
                                    className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm font-bold text-xs"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                    <span>Print</span>
                                </Button>
                            </div>
                            
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Table Section */}
                <Card className="flex-1 border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md flex flex-col min-h-0">
                </Card>

            </div>
        </div>
    );
}

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
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <Table className="border-collapse border-[#e2e8f0]">
                            <TableHeader className="bg-[#f1f5f9] sticky top-0 z-10 shadow-sm">
                                <TableRow className="hover:bg-transparent border-[#e2e8f0]">
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4 border-r border-[#e2e8f0]">Cancelled</TableHead>
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4 border-r border-[#e2e8f0]">Cheque No.</TableHead>
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4 border-r border-[#e2e8f0] text-right">Amount</TableHead>
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4 border-r border-[#e2e8f0]">Voucher No.</TableHead>
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4 border-r border-[#e2e8f0]">Paid to</TableHead>
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4 border-r border-[#e2e8f0]">Cheque Date</TableHead>
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4 border-r border-[#e2e8f0]">Cheque status</TableHead>
                                    <TableHead className="text-xs font-bold text-[#475569] h-8 px-4">Clear Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={8} className="h-[400px] text-center text-[#94a3b8] italic text-xs">
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
                                        <SelectContent>
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

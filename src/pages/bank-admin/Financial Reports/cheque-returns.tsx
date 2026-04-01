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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const mockReturnData = [
    { sno: 1, chequeNo: "201234", bankName: "State Bank of India", accountNo: "1234567890", amount: "12,500.00", returnDate: "28/03/2026", reason: "Insufficient Funds", payTo: "John Doe" },
    { sno: 2, chequeNo: "201235", bankName: "HDFC Bank", accountNo: "9876543210", amount: "4,200.00", returnDate: "29/03/2026", reason: "Signature Mismatch", payTo: "Jane Smith" },
    { sno: 3, chequeNo: "201236", bankName: "ICICI Bank", accountNo: "1122334455", amount: "18,000.00", returnDate: "30/03/2026", reason: "Post Dated Cheque", payTo: "Bob Johnson" },
    { sno: 4, chequeNo: "201237", bankName: "Axis Bank", accountNo: "5566778899", amount: "2,150.00", returnDate: "30/03/2026", reason: "Stopped Payment", payTo: "Alice Brown" },
    { sno: 5, chequeNo: "201238", bankName: "State Bank of India", accountNo: "1234567890", amount: "25,000.00", returnDate: "31/03/2026", reason: "Account Closed", payTo: "Charlie Davis" },
];

export function ChequeReturnsReport() {
    const [exportType, setExportType] = useState("pdf");

    const handlePrint = () => {
        if (exportType === "pdf") {
            import("jspdf").then(({ default: jsPDF }) => {
                const doc = new jsPDF({ orientation: "landscape" });
                doc.setFontSize(16);
                doc.text("Cheque Returns Report", 14, 18);

                doc.setFontSize(10);
                doc.text("Statement as at: 30/03/2026", 14, 28);
                doc.text("──────────────────────────────────────────────────────────────────────────────────────────────────────────────", 14, 33);

                doc.setFontSize(9);
                const headers = "S.No | Cheque No  | Bank Name              | Account No   | Amount    | Return Date | Reason              | Paid To";
                doc.text(headers, 14, 42);
                doc.text("──────────────────────────────────────────────────────────────────────────────────────────────────────────────", 14, 46);

                mockReturnData.forEach((row, i) => {
                    const line = `${row.sno}    | ${row.chequeNo}   | ${row.bankName.padEnd(22)} | ${row.accountNo} | ${row.amount.padStart(9)} | ${row.returnDate}  | ${row.reason.padEnd(20)} | ${row.payTo}`;
                    doc.text(line, 14, 54 + i * 8);
                });

                const totalY = 54 + mockReturnData.length * 8 + 4;
                doc.text("──────────────────────────────────────────────────────────────────────────────────────────────────────────────", 14, totalY);
                doc.setFontSize(10);
                doc.text("Total Returns: 5   |   Total Amount: 61,850.00", 14, totalY + 8);

                window.open(doc.output("bloburl"), "_blank");
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans overflow-hidden">
            <div className="p-4 space-y-3 max-w-[1700px] mx-auto w-full flex-1 flex flex-col min-h-0">

                {/* ── Filter Bar ── */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-3 space-y-3">

                        {/* Row 1: Date | Bank Name | Print */}
                        <div className="flex flex-wrap items-center gap-6">

                            {/* Date Filter */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">
                                    Returns as at:
                                </Label>
                                <div className="relative group w-40">
                                    <Input
                                        type="date"
                                        defaultValue="2026-03-30"
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10"
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            {/* Bank Select */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">
                                    Bank name:
                                </Label>
                                <div className="w-52">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select Bank name" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="sbi">State Bank of India</SelectItem>
                                            <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                            <SelectItem value="icici">ICICI Bank</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Print Button */}
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

                        {/* Row 2: Export Type */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">
                                    Export type:
                                </Label>
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

                {/* ── Data Table ── */}
                <Card className="flex-1 border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md flex flex-col min-h-0">
                </Card>

            </div>
        </div>
    );
}

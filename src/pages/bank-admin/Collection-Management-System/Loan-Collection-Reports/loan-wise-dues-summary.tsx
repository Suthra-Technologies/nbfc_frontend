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

export function LoanWiseDuesSummary() {
    const [addressDetails, setAddressDetails] = useState(false);

    const handlePrint = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Loan Wise Dues Summary Report", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text("As On Date: 26/03/2026", 14, 35);
            doc.text(`Address Details Enabled: ${addressDetails ? 'Yes' : 'No'}`, 14, 45);
            
            doc.setFontSize(14);
            doc.text("Sample Data:", 14, 60);
            
            doc.setFontSize(12);
            doc.text("1. Account: John Doe   | Due Amount: 15000 | EMI Dues: 1", 14, 75);
            if(addressDetails) {
                doc.text("   Address: 123 Main St, Springfield", 14, 82);
            }
            doc.text("2. Account: Jane Smith | Due Amount: 25000 | EMI Dues: 2", 14, addressDetails ? 95 : 85);
            if(addressDetails) {
                doc.text("   Address: 456 Elm St, Shelbyville", 14, 102);
            }
            
            window.open(doc.output('bloburl'), '_blank');        });
    };

    const handleExportExcel = () => {
        const content = 'Date,Account Name,Due Amount,EMI Dues\n26/03/2026,John Doe,15000,1\n26/03/2026,Jane Smith,25000,2';
        const fileName = 'loan_wise_dues_summary.csv';
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
                        {/* Top Row */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">As On Date:</Label>
                                <div className="relative group w-36">
                                    <Input 
                                        defaultValue="26/03/2026" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Loan type:</Label>
                                <div className="w-40">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="-Select-" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="pl">Personal Loan</SelectItem>
                                            <SelectItem value="vl">Vehicle Loan</SelectItem>
                                            <SelectItem value="gl">Gold Loan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">EMI Dues From:</Label>
                                <div className="w-16">
                                    <Input 
                                        placeholder="Enter" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium text-center" 
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">To:</Label>
                                <div className="w-16">
                                    <Input 
                                        placeholder="Enter" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium text-center" 
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="addressDetails" 
                                    checked={addressDetails}
                                    onCheckedChange={(checked) => setAddressDetails(checked as boolean)}
                                    className="border-[#64748b] data-[state=checked]:bg-[#009bb0] data-[state=checked]:border-[#009bb0]"
                                />
                                <Label htmlFor="addressDetails" className="text-xs font-bold text-[#475569] cursor-pointer">Address Details</Label>
                            </div>
                        </div>

                        {/* Middle Row */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Company Name:</Label>
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

                        {/* Bottom Row */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Repayment Type:</Label>
                                <div className="w-48">
                                    <Select>
                                        <SelectTrigger className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] rounded-sm shadow-none text-xs hover:border-[#009bb0] font-medium">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 ml-2">
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

import { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function DuplicateVoucherReport() {
    const [voucherType, setVoucherType] = useState("receipt");
    const [voucherNo, setVoucherNo] = useState("");

    const handlePrint = () => {
        if (!voucherNo) return;
        
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text(`Duplicate ${voucherType.toUpperCase()} Voucher`, 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text(`Voucher No: ${voucherNo}`, 14, 35);
            doc.text("Date: 30/03/2026", 14, 42);
            doc.text(`Voucher Type: ${voucherType}`, 14, 49);
            
            doc.setFontSize(14);
            doc.text("Transaction Summary:", 14, 65);
            
            doc.setFontSize(10);
            doc.text("Account Description          | Particulars             | Amount", 14, 80);
            doc.text("-".repeat(80), 14, 85);
            doc.text("Cash in Hand                 | Being amount received   | 1000.00", 14, 93);
            doc.text("Service Charges Income       | Towards loan processing | 1000.00", 14, 101);
            
            doc.text("-".repeat(80), 14, 111);
            doc.setFontSize(11);
            doc.text(`Total Amount: 1,000.00 INR`, 14, 121);
            doc.text("---------------------------------------------------------", 14, 128);
            doc.text("COPY TYPE: DUPLICATE", 14, 138);
            
            window.open(doc.output('bloburl'), '_blank');
        });
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-4 max-w-[1700px] mx-auto w-full flex-1 flex flex-col">
                
                {/* 1. Report Filters Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-[#e2e8f0]/40 overflow-hidden rounded-md flex-none">
                    <CardContent className="p-4 space-y-4">
                        
                        {/* Radio Options Row */}
                        <div className="flex items-center">
                            <RadioGroup 
                                defaultValue="receipt" 
                                onValueChange={setVoucherType}
                                className="flex flex-wrap items-center gap-8"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="receipt" id="r1" className="border-[#009bb0] text-[#009bb0] focus-visible:ring-[#009bb0]" />
                                    <Label htmlFor="r1" className="text-xs font-bold text-[#475569] cursor-pointer">General receipt</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="payment" id="r2" className="border-[#009bb0] text-[#009bb0] focus-visible:ring-[#009bb0]" />
                                    <Label htmlFor="r2" className="text-xs font-bold text-[#475569] cursor-pointer">Payment Voucher</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bank" id="r3" className="border-[#009bb0] text-[#009bb0] focus-visible:ring-[#009bb0]" />
                                    <Label htmlFor="r3" className="text-xs font-bold text-[#475569] cursor-pointer">Bank entries</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="trno" id="r4" className="border-[#009bb0] text-[#009bb0] focus-visible:ring-[#009bb0]" />
                                    <Label htmlFor="r4" className="text-xs font-bold text-[#475569] cursor-pointer">Tr No</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Input Row */}
                        <div className="flex flex-wrap items-center gap-6">
                            
                            {/* Voucher No Field */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">Voucher No.:</Label>
                                <div className="w-52">
                                    <Input 
                                        placeholder="Enter Voucher No." 
                                        value={voucherNo}
                                        onChange={(e) => setVoucherNo(e.target.value)}
                                        className="h-8 border-[#cbd5e0] focus-visible:border-[#009BB0] transition-colors bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium placeholder:text-[#94a3b8] placeholder:italic" 
                                    />
                                </div>
                            </div>

                            {/* Print Button */}
                            <div className="flex items-center">
                                <Button 
                                    onClick={handlePrint}
                                    disabled={!voucherNo}
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
                    <div className="h-full w-full flex items-center justify-center text-[#94a3b8]">
                        <div className="text-center space-y-2">
                            <p className="text-sm font-medium italic">Select voucher type, enter number and click Print.</p>
                            <p className="text-xs opacity-70 italic">Generate duplicate copies of General Receipts, Payment Vouchers, and Bank Entries.</p>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}

import { Calendar as CalendarIcon, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function VehicleSeizureStatusReport() {

    const handlePrint = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Vehicle Seizure Status Report", 14, 20);
            
            doc.setFontSize(12);
            doc.text("---------------------------------------------------------", 14, 25);
            doc.text("As On Date: 30/03/2026", 14, 35);
            
            doc.setFontSize(14);
            doc.text("Seized Vehicle Details:", 14, 55);
            
            doc.setFontSize(10);
            const tableHeader = "Case ID  | Vehicle No  | Client Name       | Seizure Date | Status      ";
            doc.text(tableHeader, 14, 70);
            doc.text("-".repeat(80), 14, 75);
            doc.text("VSR-101  | KA-05-AB12 | Mahesh Hegde      | 25/03/2026   | Seized      ", 14, 83);
            doc.text("VSR-102  | MH-14-CD34 | Priya Sharma      | 28/03/2026   | Auctioned   ", 14, 91);
            
            doc.text("-".repeat(80), 14, 101);
            doc.setFontSize(11);
            doc.text("Total Seized Records: 2", 14, 111);
            
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
                            
                            {/* AsOn Date */}
                            <div className="flex items-center gap-3">
                                <Label className="text-xs font-bold text-[#475569] whitespace-nowrap">AsOn Date:</Label>
                                <div className="relative group w-36">
                                    <Input 
                                        type="date"
                                        defaultValue="2026-03-30" 
                                        className="h-8 border-[#cbd5e0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none text-xs font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" 
                                    />
                                    <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            {/* Print Button */}
                            <div className="flex items-center ml-2">
                                <Button 
                                    onClick={handlePrint}
                                    className="bg-[#009bb0] hover:bg-[#007a8a] text-white flex items-center gap-2 px-5 h-8 rounded shadow-sm transition-all active:scale-[0.98] font-bold text-xs"
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

import { Save, Calendar as CalendarIcon, Activity, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const EmiDateChange = () => {
    return (
        <div className="flex flex-col h-full bg-white text-[#1e293b] font-sans">
            {/* Toolbar Removed */}

            <div className="p-6 flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto w-full">
                {/* Details Section */}
                <div className="flex-1 lg:max-w-xl">
                    <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 shadow-sm">
                        <div className="absolute top-4 left-6 flex items-center gap-2">
                             <div className="bg-[#009BB0] p-1.5 rounded-sm">
                                <Activity className="h-3 w-3 text-white" />
                             </div>
                             <span className="text-[#004e5a] font-bold text-xs">Details</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="nature" className="w-36 text-[11px] font-bold text-[#64748b] uppercase">Nature of loan:</Label>
                                <Select>
                                    <SelectTrigger id="nature" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Nature of Loan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal Loan</SelectItem>
                                        <SelectItem value="gold">Gold Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="account" className="w-36 text-[11px] font-bold text-[#64748b] uppercase">Loan Account No:</Label>
                                <Select>
                                    <SelectTrigger id="account" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Loan Account No" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acc1">LA-2026-001</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="actual-date" className="w-36 text-[11px] font-bold text-[#64748b] uppercase">Actual EMI Date :</Label>
                                <div className="relative flex-1 group">
                                    <Input id="actual-date" defaultValue="24/03/2026" className="h-10 border-[#e2e8f0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                                    <CalendarIcon className="absolute right-2 top-1.5 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="change-date" className="w-36 text-[11px] font-bold text-[#64748b] uppercase">Change EMI Date :</Label>
                                <div className="relative flex-1 group">
                                    <Input id="change-date" defaultValue="24/03/2026" className="h-10 border-[#e2e8f0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                                    <CalendarIcon className="absolute right-2 top-1.5 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Installment Details Section */}
                <div className="flex-1 lg:max-w-2xl flex flex-col border border-[#cbd5e0] rounded-md overflow-hidden bg-white shadow-sm h-fit">
                    <div className="bg-[#009bb0] px-4 py-2 text-white text-sm font-bold">
                        Installment Details
                    </div>
                    <div className="overflow-x-auto bg-[#e2e8f0]">
                        <Table>
                            <TableHeader className="bg-[#cbd5e0]">
                                <TableRow className="h-8 hover:bg-transparent">
                                    <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-4 text-center border-r border-[#cbd5e0]">Ins No.</TableHead>
                                    <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-4 text-center border-r border-[#cbd5e0]">Inst Date</TableHead>
                                    <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-4 text-center border-r border-[#cbd5e0]">Inst Princ</TableHead>
                                    <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-4 text-center border-r border-[#cbd5e0]">Inst Interest</TableHead>
                                    <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-4 text-center">Inst</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="h-32">
                                    <TableCell colSpan={5} className="text-center bg-white h-48"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    {/* Custom Scrollbar */}
                    <div className="bg-white px-2 py-1.5 flex items-center gap-1 border-t border-[#cbd5e0]">
                         <ChevronLeft className="h-5 w-5 text-[#64748b] cursor-pointer hover:bg-gray-100 rounded" fill="currentColor" />
                         <div className="flex-1 h-[14px] bg-[#e2e8f0] rounded-full relative overflow-hidden">
                             <div className="absolute left-[5%] right-[5%] top-0 bottom-0 bg-[#808080] rounded-full"></div>
                         </div>
                         <ChevronRight className="h-5 w-5 text-[#64748b] cursor-pointer hover:bg-gray-100 rounded" fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 max-w-[1600px] mx-auto w-full flex justify-end gap-4">
                <Button 
                    variant="outline" 
                    className="flex items-center gap-2 bg-[#ff4d52] hover:bg-[#ff4d52] text-white  h-10 px-6 font-semibold shadow-sm"
                >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset Form</span>
                </Button>
                <Button 
                    className="flex items-center gap-2 bg-[#009bb0] hover:bg-[#007a8a] text-white h-10 px-6 font-semibold shadow-sm"
                >
                    <Save className="h-4 w-4" />
                    <span>Save Member Details</span>
                </Button>
            </div>
        </div>
    );
};

export default EmiDateChange;